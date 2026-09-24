import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isVendeur = user?.role === 'prestataire' || user?.role === 'admin';

  const menu = [
    { to: '/profil/infos', label: 'Informations personnelles', icon: '👤' },
    ...(isVendeur ? [{ to: '/mes-annonces', label: 'Mes annonces', icon: '📋' }] : []),
    { to: '/favoris', label: 'Favoris', icon: '❤️' },
    { to: '/messages', label: 'Messages', icon: '💬' },
    { to: '/notifications', label: 'Notifications', icon: '🔔' },
    { to: '/parametres', label: 'Paramètres', icon: '⚙️' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  return (
    <div className="page">
      <div className="profile-header">
        <img src={user?.photo || 'https://via.placeholder.com/80'} alt="profil" />
        <h2>{user?.prenom} {user?.nom}</h2>
        <p>
          {isVendeur ? 'Compte vendeur' : 'Compte client'} · Membre depuis{' '}
          {new Date(user?.createdAt || Date.now()).getFullYear()}
        </p>
      </div>

      <div className="profile-menu">
        {menu.map((item) => (
          <Link to={item.to} key={item.to} className="profile-menu-item">
            <span>{item.icon}</span> {item.label} <span className="chevron">›</span>
          </Link>
        ))}
        <button onClick={handleLogout} className="profile-menu-item text-danger">
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Profile;