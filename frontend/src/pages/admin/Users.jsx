import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  const charger = () => api.get('/admin/utilisateurs').then((res) => setUsers(res.data));

  useEffect(() => { charger(); }, []);

  const toggleBloquer = async (id) => {
    await api.patch(`/admin/utilisateurs/${id}/bloquer`);
    charger();
  };

  return (
    <div className="page">
      <h2>Utilisateurs</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.prenom} {u.nom}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={`badge ${u.isBlocked ? 'badge-off' : 'badge-online'}`}>
                  {u.isBlocked ? 'Bloqué' : 'Actif'}
                </span>
              </td>
              <td>
                <button onClick={() => toggleBloquer(u._id)}>
                  {u.isBlocked ? 'Débloquer' : 'Bloquer'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
