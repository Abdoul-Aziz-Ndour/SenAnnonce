import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { imageUrl } from '../../api/imageUrl';
import { categoryIcon } from '../../api/categoryIcon';

// Mets ici le même chemin que l'ancien bouton "Commencer"
const LIEN_COMMENCER = '/rejoindre';

const Splash = () => {
  const [annonces, setAnnonces] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/annonces').then((r) => setAnnonces(r.data)).catch(() => {});
api.get('/categories').then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [annonces, categories]);

  return (
    <div className="lp">
      <header className="lp-nav">
        <span className="lp-logo">Annonces<b>+</b></span>
        <nav>
          <Link to="/recherche">Annonces</Link>
          <Link to={LIEN_COMMENCER} className="lp-btn-small">Commencer</Link>
        </nav>
      </header>

      <section className="lp-hero">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <span className="lp-float lp-f1">🛍️</span>
        <span className="lp-float lp-f2">📱</span>
        <span className="lp-float lp-f3">🏠</span>
        <span className="lp-float lp-f4">👕</span>

        <div className="lp-hero-content">
          <span className="lp-pill">📍 Dakar, Sénégal</span>
          <h1>Achetez, vendez <span>simplement.</span></h1>
          <p>Des milliers d'annonces près de chez vous. Publiez en 2 minutes, discutez directement avec les acheteurs.</p>
          <div className="lp-buttons">
            <Link to={LIEN_COMMENCER} className="lp-btn lp-btn-main">Commencer</Link>
            <Link to="/recherche" className="lp-btn lp-btn-ghost">Voir les annonces</Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="lp-section reveal">
          <h2>Catégories</h2>
          <div className="lp-cats">
            {categories.map((c, i) => (
              <Link
                to={`/recherche?categorie=${c._id}`}
                key={c._id}
                className="lp-cat"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <span>{categoryIcon(c.nom)}</span>
                {c.nom}
              </Link>
            ))}
          </div>
        </section>
      )}

      {annonces.length > 0 && (
        <section className="lp-section">
          <div className="lp-head reveal">
            <h2>Annonces récentes</h2>
            <Link to="/recherche">Voir tout</Link>
          </div>
          <div className="lp-grid">
            {annonces.map((a, i) => (
              <Link
                to={`/annonce/${a._id}`}
                key={a._id}
                className="lp-card reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <img src={imageUrl(a.images?.[0])} alt={a.titre} />
                <div className="lp-card-body">
                  <p className="lp-card-titre">{a.titre}</p>
                  <p className="lp-card-prix">{a.prix.toLocaleString()} FCFA</p>
                  <p className="lp-card-cat">{a.categorie?.nom}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="lp-section reveal">
        <h2>Comment ça marche</h2>
        <div className="lp-steps">
          <div className="lp-step"><b>1</b><h3>Créez un compte</h3><p>Client ou vendeur, c'est gratuit.</p></div>
          <div className="lp-step"><b>2</b><h3>Publiez ou cherchez</h3><p>Ajoutez vos photos ou trouvez la bonne affaire.</p></div>
          <div className="lp-step"><b>3</b><h3>Discutez et concluez</h3><p>Échangez par message, directement.</p></div>
        </div>
      </section>

      <section className="lp-cta reveal">
        <h2>Prêt à commencer ?</h2>
        <Link to={LIEN_COMMENCER} className="lp-btn lp-btn-main">Créer mon compte</Link>
      </section>
    </div>
  );
};

export default Splash;
