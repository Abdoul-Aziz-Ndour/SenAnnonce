import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Accueil', icon: '🏠' },
  { to: '/recherche', label: 'Catégories', icon: '📂' },
  { to: '/favoris', label: 'Favoris', icon: '❤️' },
  { to: '/messages', label: 'Messages', icon: '💬' },
  { to: '/profil', label: 'Profil', icon: '👤' },
];

const ClientLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  return (
    <div className="app-shell">
      <div className="top-bar">
        <span className="top-bar-logo">Annonces.sn</span>
        <button onClick={handleLogout} className="top-bar-logout" title="Déconnexion">🚪</button>
      </div>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;