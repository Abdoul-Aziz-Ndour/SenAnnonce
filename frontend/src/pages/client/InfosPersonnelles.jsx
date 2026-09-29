import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const InfosPersonnelles = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    telephone: user?.telephone || '',
    photo: user?.photo || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, photo: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profil', form);
      const updated = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setMessage('Informations mises à jour');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="detail-header">
        <button onClick={() => navigate(-1)}>←</button>
      </div>
      <h2>Informations personnelles</h2>

      {message && <div className="alert-success">{message}</div>}

      <div className="profile-photo-edit">
        <img src={form.photo || 'https://via.placeholder.com/90'} alt="profil" />
        <label className="btn-secondary photo-upload-btn">
          Changer la photo
          <input type="file" accept="image/*" onChange={handlePhoto} hidden />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: 20 }}>
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} />
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
};

export default InfosPersonnelles;