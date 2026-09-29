import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import api from '../../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div className="page">Chargement...</div>;

  const data = [
    { nom: 'Utilisateurs', valeur: stats.totalUsers, couleur: '#2563eb' },
    { nom: 'Annonces', valeur: stats.totalAnnonces, couleur: '#16a34a' },
    { nom: 'En attente', valeur: stats.enAttente, couleur: '#d97706' },
    { nom: 'Signalements', valeur: stats.signalements, couleur: '#dc2626' },
  ];

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

      <div className="chart-card">
        <h3>Vue d'ensemble</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="nom" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="valeur" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.couleur} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;