import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menu = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: '👥' },
  { to: '/admin/annonces', label: 'Annonces', icon: '📋' },
  { to: '/admin/categories', label: 'Catégories', icon: '📂' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">Admin Dashboard</div>
        <nav>
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span>{user?.prenom} {user?.nom}</span>
          <button onClick={logout} className="btn-logout">Déconnexion</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
