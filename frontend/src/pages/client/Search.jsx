import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../api/axios';
import { imageUrl } from '../../api/imageUrl';
import { categoryIcon } from '../../api/categoryIcon';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [filtres, setFiltres] = useState({
    q: searchParams.get('q') || '',
    categorie: searchParams.get('categorie') || '',
    ville: '',
    prixMin: '',
    prixMax: '',
    tri: '',
  });

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const rechercher = async () => {
    const params = Object.fromEntries(Object.entries(filtres).filter(([, v]) => v));
    const { data } = await api.get('/annonces', { params });
    setAnnonces(data);
  };

  useEffect(() => {
    rechercher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="search-header">
        <input
          placeholder="Rechercher une annonce..."
          value={filtres.q}
          onChange={(e) => setFiltres({ ...filtres, q: e.target.value })}
        />
        <button onClick={rechercher}>🔍</button>
      </div>

      <div className="filters-panel">
        <label>Catégorie</label>
        <select
          value={filtres.categorie}
          onChange={(e) => setFiltres({ ...filtres, categorie: e.target.value })}
        >
          <option value="">Toutes</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {categoryIcon(c.nom)} {c.nom}
            </option>
          ))}
        </select>

        <label>Prix (FCFA)</label>
        <div className="filter-row">
          <input
            placeholder="Min"
            type="number"
            value={filtres.prixMin}
            onChange={(e) => setFiltres({ ...filtres, prixMin: e.target.value })}
          />
          <input
            placeholder="Max"
            type="number"
            value={filtres.prixMax}
            onChange={(e) => setFiltres({ ...filtres, prixMax: e.target.value })}
          />
        </div>

        <label>Localisation</label>
        <input
          placeholder="Ville"
          value={filtres.ville}
          onChange={(e) => setFiltres({ ...filtres, ville: e.target.value })}
        />

        <label>Trier par</label>
        <select value={filtres.tri} onChange={(e) => setFiltres({ ...filtres, tri: e.target.value })}>
          <option value="">Plus récent</option>
          <option value="popularite">Popularité</option>
          <option value="prix_asc">Prix croissant</option>
          <option value="prix_desc">Prix décroissant</option>
        </select>

        <button className="btn-primary" onClick={rechercher}>Voir les résultats</button>
      </div>

      <div className="annonces-list">
        {annonces.map((a) => (
          <Link to={`/annonce/${a._id}`} key={a._id} className="annonce-row">
            <img src={imageUrl(a.images?.[0])} alt={a.titre} />
            <div>
              <p className="annonce-titre">{a.titre}</p>
              <p className="annonce-prix">{a.prix.toLocaleString()} FCFA</p>
              <p className="annonce-ville">{a.ville}</p>
            </div>
          </Link>
        ))}
        {annonces.length === 0 && <p className="empty-state">Aucune annonce trouvée</p>}
      </div>
    </div>
  );
};

export default Search;