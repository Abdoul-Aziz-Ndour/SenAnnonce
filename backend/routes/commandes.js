const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');
const Annonce = require('../models/Annonce');
const { protect, vendeur } = require('../middleware/auth');

// POST passer une commande
router.post('/', protect, async (req, res) => {
  try {
    const { annonceId } = req.body;
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) return res.status(404).json({ message: 'Annonce introuvable' });

    if (annonce.utilisateur.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Vous ne pouvez pas commander votre propre annonce' });
    }

    const existe = await Commande.findOne({
      annonce: annonceId,
      client: req.user._id,
      statut: 'en_attente',
    });
    if (existe) {
      return res.status(400).json({ message: 'Vous avez déjà commandé cet article (en attente)' });
    }

    const commande = await Commande.create({
      annonce: annonceId,
      client: req.user._id,
      vendeur: annonce.utilisateur,
    });

    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET commandes reçues (vendeur)
router.get('/recues', protect, vendeur, async (req, res) => {
  try {
    const commandes = await Commande.find({ vendeur: req.user._id })
      .populate('annonce', 'titre prix images')
      .populate('client', 'nom prenom telephone email photo')
      .sort('-createdAt');
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET mes commandes (client)
router.get('/mes-commandes', protect, async (req, res) => {
  try {
    const commandes = await Commande.find({ client: req.user._id })
      .populate('annonce', 'titre prix images')
      .populate('vendeur', 'nom prenom telephone')
      .sort('-createdAt');
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PATCH changer le statut (vendeur)
router.patch('/:id/statut', protect, vendeur, async (req, res) => {
  try {
    const { statut } = req.body;
    if (!['confirmee', 'refusee'].includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }
    const commande = await Commande.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande introuvable' });
    if (commande.vendeur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    commande.statut = statut;
    await commande.save();
    res.json(commande);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;