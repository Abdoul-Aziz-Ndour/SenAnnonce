import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { imageUrl } from '../../api/imageUrl';
import { useAuth } from '../../context/AuthContext';

const AnnonceDetail = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [signale, setSignale] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/annonces/${id}`).then((res) => setAnnonce(res.data));
  }, [id]);

  const envoyerMessage = () => {
    if (!user) return navigate('/connexion');
    navigate(`/conversation/${annonce.utilisateur._id}?annonce=${annonce._id}`);
  };

  const toggleFavori = async () => {
    if (!user) return navigate('/connexion');
    await api.post(`/annonces/${id}/favori`);
  };

  const signaler = async () => {
    if (!user) return navigate('/connexion');
    if (!window.confirm('Signaler cette annonce comme inappropriée ?')) return;
    await api.post(`/annonces/${id}/signaler`);
    setSignale(true);
  };

  if (!annonce) return <div className="page">Chargement...</div>;

  return (
    <div className="page">
      <div className="detail-header">
        <button onClick={() => navigate(-1)}>←</button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggleFavori}>♡</button>
          <button onClick={signaler} title="Signaler" disabled={signale}>
            {signale ? '✅' : '🚩'}
          </button>
        </div>
      </div>

      <img
        src={imageUrl(annonce.images?.[0])}
        alt={annonce.titre}
        className="detail-image"
      />

      <h2>{annonce.titre}</h2>
      <p className="annonce-prix-large">{annonce.prix.toLocaleString()} FCFA</p>
      <p className="annonce-ville">📍 {annonce.ville} · {new Date(annonce.createdAt).toLocaleDateString()}</p>

      <h4>Description</h4>
      <p>{annonce.description}</p>

      <div className="vendeur-card">
        <img src={annonce.utilisateur?.photo || 'https://via.placeholder.com/50'} alt="vendeur" />
        <div>
          <p>{annonce.utilisateur?.prenom} {annonce.utilisateur?.nom}</p>
          <span>Membre depuis {new Date(annonce.utilisateur?.createdAt).getFullYear()}</span>
        </div>
      </div>

      <div className="detail-actions">
        {annonce.utilisateur?.telephone && (
          <a href={`tel:${annonce.utilisateur.telephone}`} className="btn-secondary">Appeler</a>
        )}
        <button className="btn-primary" onClick={envoyerMessage}>Envoyer un message</button>
      </div>
    </div>
  );
};

export default AnnonceDetail;