import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: brancher l'envoi d'email réel côté backend
    setEnvoye(true);
  };

  return (
    <div className="auth-page">
      <div className="lock-icon">🔒</div>
      <h1>Mot de passe oublié</h1>
      <p className="subtitle">
        Entrez votre email ou téléphone pour réinitialiser votre mot de passe.
      </p>

      {envoye ? (
        <div className="alert-success">Un lien de réinitialisation a été envoyé si ce compte existe.</div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Email ou téléphone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Envoyer le lien</button>
        </form>
      )}

      <p className="auth-footer">
        <Link to="/connexion">Retour à la connexion</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
