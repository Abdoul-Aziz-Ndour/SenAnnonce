import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div className="page">Chargement...</div>;

  return (
    <div className="page">
      <h2>Dashboard Admin</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Utilisateurs</p>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Annonces</p>
          <p className="stat-value stat-green">{stats.totalAnnonces}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">En attente</p>
          <p className="stat-value">{stats.enAttente}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Signalements</p>
          <p className="stat-value stat-red">{stats.signalements}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
