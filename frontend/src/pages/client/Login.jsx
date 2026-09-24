import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    setLoading(true);
    try {
      const data = await login(email, motDePasse);
      navigate(data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Bienvenue !</h1>
      <p className="subtitle">Connectez-vous à votre compte</p>

      {erreur && <div className="alert-error">{erreur}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email ou téléphone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <Link to="/mot-de-passe-oublie" className="link-right">Mot de passe oublié ?</Link>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <p className="auth-footer">
        Pas de compte ? <Link to="/rejoindre">S'inscrire</Link>
      </p>
    </div>
  );
};

export default Login;