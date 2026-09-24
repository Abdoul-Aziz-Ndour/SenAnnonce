import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', motDePasse: '' });
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    setLoading(true);
    try {
      await register({ ...form, role: 'client' });
      navigate('/');
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Créer un compte client</h1>
      <p className="subtitle">Rejoignez notre communauté</p>

      {erreur && <div className="alert-error">{erreur}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} />
        <input
          name="motDePasse"
          type="password"
          placeholder="Mot de passe"
          value={form.motDePasse}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>

      <p className="auth-footer">
        Vous êtes vendeur ? <Link to="/inscription-prestataire">Créer un compte vendeur</Link>
      </p>
      <p className="auth-footer">
        Déjà un compte ? <Link to="/connexion">Se connecter</Link>
      </p>
    </div>
  );
};

export default Register;