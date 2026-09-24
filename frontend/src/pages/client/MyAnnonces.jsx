import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { imageUrl } from '../../api/imageUrl';

const MyAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [filtre, setFiltre] = useState('toutes');

  const charger = () => {
    api.get('/annonces/mes-annonces').then((res) => setAnnonces(res.data));
  };

  useEffect(() => { charger(); }, []);

  const toggleStatut = async (id) => {
    await api.patch(`/annonces/${id}/statut`);
    charger();
  };

  const supprimer = async (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return;
    await api.delete(`/annonces/${id}`);
    charger();
  };

  const statutBadge = (a) => {
    if (a.statut === 'en_attente') return <span className="badge badge-pending">En attente de validation</span>;
    if (a.statut === 'refusee') return <span className="badge badge-off">Refusée</span>;
    return (
      <span className={`badge ${a.actif ? 'badge-online' : 'badge-off'}`}>
        {a.actif ? 'En ligne' : 'Désactivée'}
      </span>
    );
  };

  const annoncesFiltrees = annonces.filter((a) => {
    if (filtre === 'actives') return a.actif && a.statut === 'validee';
    if (filtre === 'inactives') return !a.actif && a.statut === 'validee';
    return true;
  });

  return (
    <div className="page">
      <h2>Mes annonces</h2>
      <div className="tabs">
        <button className={filtre === 'toutes' ? 'active' : ''} onClick={() => setFiltre('toutes')}>Toutes</button>
        <button className={filtre === 'actives' ? 'active' : ''} onClick={() => setFiltre('actives')}>En ligne</button>
        <button className={filtre === 'inactives' ? 'active' : ''} onClick={() => setFiltre('inactives')}>Désactivées</button>
      </div>

      <div className="mes-annonces-list">
        {annoncesFiltrees.map((a) => (
          <div key={a._id} className="mes-annonce-item">
            <img src={imageUrl(a.images?.[0])} alt={a.titre} />
            <div className="mes-annonce-info">
              <p className="annonce-titre">{a.titre}</p>
              <p className="annonce-prix">{a.prix.toLocaleString()} FCFA</p>
              {statutBadge(a)}
            </div>
            <div className="mes-annonce-actions">
              <Link to={`/annonce/${a._id}`}>Voir</Link>
              {a.statut === 'validee' && (
                <button onClick={() => toggleStatut(a._id)}>{a.actif ? 'Désactiver' : 'Activer'}</button>
              )}
              <button onClick={() => supprimer(a._id)} className="text-danger">Supprimer</button>
            </div>
          </div>
        ))}
        {annoncesFiltrees.length === 0 && <p className="empty-state">Aucune annonce</p>}
      </div>

      <Link to="/publier" className="btn-primary fab-button">Publier une nouvelle annonce</Link>
    </div>
  );
};

export default MyAnnonces;