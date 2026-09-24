const notificationsMock = [
  { id: 1, icone: '💬', texte: 'Vous avez reçu un message concernant votre annonce', temps: '2j' },
  { id: 2, icone: '✅', texte: 'Votre annonce est en ligne', temps: '3j' },
  { id: 3, icone: '❤️', texte: 'Quelqu\'un a ajouté votre annonce à ses favoris', temps: '4j' },
  { id: 4, icone: '📦', texte: 'Nouvelle annonce disponible dans une catégorie suivie', temps: '5j' },
  { id: 5, icone: '✔️', texte: 'Votre compte a été vérifié avec succès', temps: '1sem' },
];

const Notifications = () => {
  return (
    <div className="page">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notificationsMock.map((n) => (
          <div key={n.id} className="notification-item">
            <span className="notification-icon">{n.icone}</span>
            <div>
              <p>{n.texte}</p>
              <span className="notification-temps">{n.temps}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
