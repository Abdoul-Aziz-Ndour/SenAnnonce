const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema(
  {
    annonce: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    statut: { type: String, enum: ['en_attente', 'confirmee', 'refusee'], default: 'en_attente' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Commande', commandeSchema);