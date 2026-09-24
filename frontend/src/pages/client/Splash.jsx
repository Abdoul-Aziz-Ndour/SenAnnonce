import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();
  return (
    <div className="splash-screen">
      <div className="splash-icon">📦</div>
      <h1>Annonces.sn</h1>
      <p>Achetez, vendez simplement.</p>
      <button className="btn-primary" onClick={() => navigate('/connexion')}>
        Commencer
      </button>
    </div>
  );
};

export default Splash;
