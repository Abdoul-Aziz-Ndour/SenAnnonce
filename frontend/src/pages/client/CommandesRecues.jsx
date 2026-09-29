import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { imageUrl } from '../../api/imageUrl';

const CommandesRecues = () => {
  const [commandes, setCommandes] = useState([]);
  const [filtre, setFiltre] = useState('toutes');
  const [recherche, setRecherche] = useState('');
  const [chargement, setChargement] = useState(true);

  const charger = async () => {
    try {
      setChargement(true);

      const res = await api.get('/commandes/recues');

      setCommandes(res.data || []);
    } catch (error) {
      console.error('Erreur chargement commandes :', error);
      setCommandes([]);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const changerStatut = async (id, statut) => {
    try {
      await api.patch(`/commandes/${id}/statut`, { statut });
      await charger();
    } catch (error) {
      console.error('Erreur changement statut :', error);
      alert('Impossible de modifier le statut de la commande.');
    }
  };

  const getStatut = (statut) => {
    switch (statut) {
      case 'confirmee':
        return {
          texte: 'Confirmée',
          classe: 'commande-confirmee',
        };

      case 'refusee':
        return {
          texte: 'Refusée',
          classe: 'commande-refusee',
        };

      default:
        return {
          texte: 'En attente',
          classe: 'commande-attente',
        };
    }
  };

  const formaterDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const commandesFiltrees = commandes.filter((commande) => {
    const statutCorrespond =
      filtre === 'toutes' || commande.statut === filtre;

    const texteRecherche = recherche.toLowerCase();

    const rechercheCorrespond =
      commande._id?.toLowerCase().includes(texteRecherche) ||
      commande.annonce?.titre?.toLowerCase().includes(texteRecherche) ||
      commande.client?.nom?.toLowerCase().includes(texteRecherche) ||
      commande.client?.prenom?.toLowerCase().includes(texteRecherche);

    return statutCorrespond && rechercheCorrespond;
  });

  const nombreEnAttente = commandes.filter(
    (c) => c.statut === 'en_attente'
  ).length;

  const nombreConfirmees = commandes.filter(
    (c) => c.statut === 'confirmee'
  ).length;

  const nombreRefusees = commandes.filter(
    (c) => c.statut === 'refusee'
  ).length;

  return (
    <div className="commandes-page">

      {/* HEADER */}
      <div className="commandes-header">
        <div>
          <div className="breadcrumb">
            Accueil <span>›</span> Commandes
          </div>

          <h1>Mes commandes</h1>

          <p>
            Suivez et gérez toutes les commandes de votre boutique.
          </p>
        </div>
      </div>

      {/* STATISTIQUES */}
      <div className="commandes-stats">

        <div className="commande-stat">
          <div className="stat-icon stat-total">🛒</div>
          <div>
            <span>Total commandes</span>
            <strong>{commandes.length}</strong>
          </div>
        </div>

        <div className="commande-stat">
          <div className="stat-icon stat-attente">⏳</div>
          <div>
            <span>En attente</span>
            <strong>{nombreEnAttente}</strong>
          </div>
        </div>

        <div className="commande-stat">
          <div className="stat-icon stat-confirme">✓</div>
          <div>
            <span>Confirmées</span>
            <strong>{nombreConfirmees}</strong>
          </div>
        </div>

        <div className="commande-stat">
          <div className="stat-icon stat-refuse">✕</div>
          <div>
            <span>Refusées</span>
            <strong>{nombreRefusees}</strong>
          </div>
        </div>

      </div>

      {/* FILTRES */}
      <div className="commandes-toolbar">

        <div className="commande-tabs">

          <button
            className={filtre === 'toutes' ? 'active' : ''}
            onClick={() => setFiltre('toutes')}
          >
            Toutes ({commandes.length})
          </button>

          <button
            className={filtre === 'en_attente' ? 'active' : ''}
            onClick={() => setFiltre('en_attente')}
          >
            En attente ({nombreEnAttente})
          </button>

          <button
            className={filtre === 'confirmee' ? 'active' : ''}
            onClick={() => setFiltre('confirmee')}
          >
            Confirmées ({nombreConfirmees})
          </button>

          <button
            className={filtre === 'refusee' ? 'active' : ''}
            onClick={() => setFiltre('refusee')}
          >
            Refusées ({nombreRefusees})
          </button>

        </div>

        <div className="commande-recherche">
          🔍
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

      </div>

      {/* TABLEAU */}
      <div className="commandes-card">

        <div className="commandes-table-wrapper">

          <table className="commandes-table">

            <thead>
              <tr>
                <th>N° Commande</th>
                <th>Produit</th>
                <th>Client</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {chargement ? (

                <tr>
                  <td colSpan="7" className="commande-loading">
                    Chargement des commandes...
                  </td>
                </tr>

              ) : commandesFiltrees.length === 0 ? (

                <tr>
                  <td colSpan="7">
                    <div className="commande-empty">
                      <div className="empty-icon">🛒</div>
                      <h3>Aucune commande</h3>
                      <p>
                        Aucune commande ne correspond à votre recherche.
                      </p>
                    </div>
                  </td>
                </tr>

              ) : (

                commandesFiltrees.map((c) => {

                  const statut = getStatut(c.statut);

                  return (
                    <tr key={c._id}>

                      {/* NUMERO */}
                      <td>
                        <strong className="commande-id">
                          #{c._id?.slice(-8).toUpperCase()}
                        </strong>
                      </td>

                      {/* PRODUIT */}
                      <td>

                        <div className="produit-commande">

                          <img
                            src={imageUrl(c.annonce?.images?.[0])}
                            alt={c.annonce?.titre || 'Produit'}
                            onError={(e) => {
                              e.currentTarget.src =
                                '/placeholder-product.png';
                            }}
                          />

                          <div>
                            <strong>
                              {c.annonce?.titre || 'Produit supprimé'}
                            </strong>

                            <span>
                              Quantité : {c.quantite || 1}
                            </span>
                          </div>

                        </div>

                      </td>

                      {/* CLIENT */}
                      <td>

                        <div className="client-commande">

                          <strong>
                            {c.client?.prenom} {c.client?.nom}
                          </strong>

                          <span>
                            📞 {c.client?.telephone || 'N/A'}
                          </span>

                        </div>

                      </td>

                      {/* DATE */}
                      <td>
                        <div className="date-commande">
                          {formaterDate(
                            c.createdAt || c.dateCommande || c.date
                          )}
                        </div>
                      </td>

                      {/* MONTANT */}
                      <td>

                        <strong className="montant-commande">
                          {Number(
                            c.annonce?.prix || c.montant || 0
                          ).toLocaleString('fr-FR')}{' '}
                          FCFA
                        </strong>

                      </td>

                      {/* STATUT */}
                      <td>

                        <span
                          className={`commande-status ${statut.classe}`}
                        >
                          {statut.texte}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td>

                        <div className="commande-actions">

                          <button
                            className="btn-details"
                            onClick={() =>
                              alert(
                                `Commande #${c._id}\nClient : ${c.client?.prenom} ${c.client?.nom}`
                              )
                            }
                          >
                            👁 Voir détails
                          </button>

                          {c.statut === 'en_attente' && (
                            <>
                              <button
                                className="btn-confirmer"
                                onClick={() =>
                                  changerStatut(
                                    c._id,
                                    'confirmee'
                                  )
                                }
                              >
                                ✓
                              </button>

                              <button
                                className="btn-refuser"
                                onClick={() =>
                                  changerStatut(
                                    c._id,
                                    'refusee'
                                  )
                                }
                              >
                                ✕
                              </button>
                            </>
                          )}

                        </div>

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default CommandesRecues;