import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Notifications.css';

const notificationsMock = [
  { id: 1, icone: '💬', texte: 'Vous avez reçu un message concernant votre annonce', temps: '2j', lu: false },
  { id: 2, icone: '✅', texte: 'Votre annonce est en ligne', temps: '3j', lu: false },
  { id: 3, icone: '❤️', texte: "Quelqu'un a ajouté votre annonce à ses favoris", temps: '4j', lu: false },
  { id: 4, icone: '📦', texte: 'Nouvelle annonce disponible dans une catégorie suivie', temps: '5j', lu: true },
  { id: 5, icone: '✔️', texte: 'Votre compte a été vérifié avec succès', temps: '1sem', lu: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsMock);
  const [filtre, setFiltre] = useState('toutes');
  const [recherche, setRecherche] = useState('');

  const nonLues = notifications.filter((n) => !n.lu).length;

  const filtres = [
    { cle: 'toutes', label: `Toutes (${notifications.length})` },
    { cle: 'non-lues', label: `Non lues (${nonLues})` },
    { cle: 'lues', label: `Lues (${notifications.length - nonLues})` },
  ];

  const visibles = useMemo(() => {
    return notifications.filter((n) => {
      if (filtre === 'non-lues' && n.lu) return false;
      if (filtre === 'lues' && !n.lu) return false;
      return n.texte.toLowerCase().includes(recherche.trim().toLowerCase());
    });
  }, [notifications, filtre, recherche]);

  const marquerLue = (id) =>
    setNotifications((liste) => liste.map((n) => (n.id === id ? { ...n, lu: true } : n)));

  const toutMarquerLu = () =>
    setNotifications((liste) => liste.map((n) => ({ ...n, lu: true })));

  return (
    <div className="notif-page">
      <nav className="notif-breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span>&gt;</span>
        <span>Notifications</span>
      </nav>

      <header className="notif-header">
        <div>
          <h1>Notifications</h1>
          <p>Suivez toutes les activités de votre compte.</p>
        </div>
        <button
          type="button"
          className="notif-btn notif-btn-primary"
          onClick={toutMarquerLu}
          disabled={nonLues === 0}
        >
          Tout marquer comme lu
        </button>
      </header>

      <div className="notif-toolbar">
        <div className="notif-filtres">
          {filtres.map((f) => (
            <button
              key={f.cle}
              type="button"
              className={`notif-pill ${filtre === f.cle ? 'actif' : ''}`}
              onClick={() => setFiltre(f.cle)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="notif-recherche"
          placeholder="Rechercher une notification..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      <div className="notif-card">
        {visibles.length === 0 ? (
          <p className="notif-vide">Aucune notification à afficher.</p>
        ) : (
          visibles.map((n) => (
            <div key={n.id} className={`notif-item ${n.lu ? '' : 'non-lue'}`}>
              <span className="notif-icone">{n.icone}</span>
              <div className="notif-contenu">
                <p>{n.texte}</p>
                <span className="notif-temps">Il y a {n.temps}</span>
              </div>
              {!n.lu && <span className="notif-point" aria-label="Non lue" />}
              <button
                type="button"
                className="notif-btn notif-btn-outline"
                onClick={() => marquerLue(n.id)}
                disabled={n.lu}
              >
                {n.lu ? 'Lue' : 'Marquer comme lue'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;