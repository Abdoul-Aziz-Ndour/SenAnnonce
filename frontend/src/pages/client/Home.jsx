import { categoryIcon } from '../../api/categoryIcon';
import { imageUrl } from '../../api/imageUrl';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
    api.get('/annonces').then((res) => setAnnonces(res.data.slice(0, 6)));
  }, []);

  return (
    <div className="page">
      <div className="home-header">
        <span>📍 Dakar, Sénégal</span>
        <span>🔔</span>
      </div>

      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = `/recherche?q=${recherche}`;
        }}
      >
        <input
          placeholder="Rechercher une annonce..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="section-header">
        <h3>Catégories</h3>
        <Link to="/categories">Voir tout</Link>
      </div>
      <div className="categories-grid">
        {categories.slice(0, 6).map((cat) => (
          <Link to={`/recherche?categorie=${cat._id}`} key={cat._id} className="category-item">
            <div className="category-icon">{categoryIcon(cat.nom)}</div>
            <span>{cat.nom}</span>
          </Link>
        ))}
      </div>

      <div className="section-header">
        <h3>Annonces récentes</h3>
        <Link to="/recherche">Voir tout</Link>
      </div>
      <div className="annonces-grid">
        {annonces.map((a) => (
          <Link to={`/annonce/${a._id}`} key={a._id} className="annonce-card">
            <img src={imageUrl(a.images?.[0])} alt={a.titre} />
            <div className="annonce-info">
              <p className="annonce-titre">{a.titre}</p>
              <p className="annonce-prix">{a.prix.toLocaleString()} FCFA</p>
              <p className="annonce-ville">{a.ville}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;