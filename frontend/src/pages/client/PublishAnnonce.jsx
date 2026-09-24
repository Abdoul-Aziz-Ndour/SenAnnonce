import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const PublishAnnonce = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ titre: '', prix: '', categorie: '', ville: '', description: '' });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      images.forEach((img) => data.append('images', img));

      await api.post('/annonces', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/mes-annonces');
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur lors de la publication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Publier une annonce</h2>
      {erreur && <div className="alert-error">{erreur}</div>}

      <form onSubmit={handleSubmit} className="publish-form">
        <label>Photos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
        />

        <label>Titre de l'annonce</label>
        <input name="titre" placeholder="Ex: iPhone 13 Pro" value={form.titre} onChange={handleChange} required />

        <label>Catégorie</label>
        <select name="categorie" value={form.categorie} onChange={handleChange} required>
          <option value="">Sélectionner</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.nom}</option>
          ))}
        </select>

        <label>Prix (FCFA)</label>
        <input name="prix" type="number" placeholder="Ex: 350000" value={form.prix} onChange={handleChange} required />

        <label>Localisation</label>
        <input name="ville" placeholder="Dakar" value={form.ville} onChange={handleChange} required />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Décrivez votre produit..."
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Publication...' : "Publier l'annonce"}
        </button>
      </form>
    </div>
  );
};

export default PublishAnnonce;
