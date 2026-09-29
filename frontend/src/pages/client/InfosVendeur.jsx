import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Champ = ({ label, requis, children }) => (
  <label className="sv-champ">
    <span>{label}{requis && <em> *</em>}</span>
    {children}
  </label>
);

const vide = {
  nom: '', prenom: '', email: '', telephone: '', naissance: '', adresse: '',
  pieceType: 'Carte nationale d\'identité (CNI)', pieceNumero: '',
  boutique: '', categorie: '', adresseEntreprise: '', telPro: '', emailPro: '', ninea: '',
  typeVendeur: 'Particulier', paiement: 'Compte bancaire', livraison: '',
};

const InfosVendeur = () => {
  const [f, setF] = useState(vide);
  const [categories, setCategories] = useState([]);
  const [apercu, setApercu] = useState('');

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  const maj = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const choisirPhoto = (e) => {
    const file = e.target.files[0];
    if (file) setApercu(URL.createObjectURL(file));
  };

  const envoyer = (e) => {
    e.preventDefault();
    alert('Design OK ✅ La sauvegarde sera branchée à l\'étape suivante.');
  };

  const nomComplet = `${f.prenom} ${f.nom}`.trim() || 'Votre nom';

  return (
    <div className="sv-page">
      <div className="sv-titre">
        <h1>Inscription / Informations du vendeur</h1>
        <p>Veuillez fournir les informations ci-dessous pour finaliser votre inscription en tant que vendeur.</p>
      </div>

      <div className="sv-layout">
        <form className="sv-form" onSubmit={envoyer}>
          <section className="sv-carte">
            <h2><span className="sv-icone">👤</span> 1. Informations personnelles</h2>
            <div className="sv-grille">
              <Champ label="Nom" requis><input value={f.nom} onChange={maj('nom')} placeholder="Ndour" /></Champ>
              <Champ label="Prénom" requis><input value={f.prenom} onChange={maj('prenom')} placeholder="Abdoul Aziz" /></Champ>
              <Champ label="E-mail" requis><input type="email" value={f.email} onChange={maj('email')} placeholder="exemple@email.com" /></Champ>
              <Champ label="Numéro de téléphone" requis><input value={f.telephone} onChange={maj('telephone')} placeholder="+221 77 123 45 67" /></Champ>
              <Champ label="Date de naissance (optionnel)"><input type="date" value={f.naissance} onChange={maj('naissance')} /></Champ>
              <Champ label="Adresse" requis><input value={f.adresse} onChange={maj('adresse')} placeholder="Thiès, Sénégal" /></Champ>
              <Champ label="Pièce d'identité" requis>
                <select value={f.pieceType} onChange={maj('pieceType')}>
                  <option>Carte nationale d'identité (CNI)</option>
                  <option>Passeport</option>
                  <option>Permis de conduire</option>
                </select>
              </Champ>
              <Champ label="Numéro de pièce d'identité" requis><input value={f.pieceNumero} onChange={maj('pieceNumero')} /></Champ>
            </div>

            <Champ label="Photo de profil" requis>
              <div className="sv-photo">
                <div className="sv-avatar">{apercu ? <img src={apercu} alt="" /> : '👤'}</div>
                <label className="sv-upload">
                  <span>☁️ Choisir une photo</span>
                  <small>JPG, PNG (max 2 Mo)</small>
                  <input type="file" accept="image/png,image/jpeg" onChange={choisirPhoto} hidden />
                </label>
              </div>
            </Champ>
          </section>

          <section className="sv-carte">
            <h2><span className="sv-icone">🏪</span> 2. Informations professionnelles de la boutique</h2>
            <div className="sv-grille">
              <Champ label="Nom de la boutique" requis><input value={f.boutique} onChange={maj('boutique')} placeholder="Aziz Store" /></Champ>
              <Champ label="Catégorie principale" requis>
                <select value={f.categorie} onChange={maj('categorie')}>
                  <option value="">Choisir...</option>
                  {categories.map((c) => <option key={c._id} value={c.nom}>{c.nom}</option>)}
                </select>
              </Champ>
              <Champ label="Adresse de l'entreprise" requis><input value={f.adresseEntreprise} onChange={maj('adresseEntreprise')} /></Champ>
              <Champ label="Téléphone professionnel" requis><input value={f.telPro} onChange={maj('telPro')} /></Champ>
              <Champ label="E-mail professionnel" requis><input type="email" value={f.emailPro} onChange={maj('emailPro')} /></Champ>
              <Champ label="Numéro d'entreprise (NINEA/SN)" requis><input value={f.ninea} onChange={maj('ninea')} /></Champ>
              <Champ label="Type de vendeur" requis>
                <select value={f.typeVendeur} onChange={maj('typeVendeur')}>
                  <option>Particulier</option>
                  <option>Professionnel</option>
                </select>
              </Champ>
              <Champ label="Mode de paiement" requis>
                <select value={f.paiement} onChange={maj('paiement')}>
                  <option>Compte bancaire</option>
                  <option>Wave</option>
                  <option>Orange Money</option>
                  <option>Espèces</option>
                </select>
              </Champ>
            </div>
            <Champ label="Adresse de livraison / retour" requis>
              <textarea rows="3" value={f.livraison} onChange={maj('livraison')} />
            </Champ>
            <button type="submit" className="sv-bouton">Enregistrer et continuer →</button>
          </section>
        </form>

        <aside className="sv-cote">
          <div className="sv-verifie">
            <span>🛡️</span>
            <div>
              <b>Vendeur vérifié</b>
              <p>Vos informations seront vérifiées pour garantir la sécurité de la plateforme.</p>
            </div>
          </div>

          <div className="sv-apercu">
            <h3>Aperçu du profil</h3>
            <div className="sv-avatar sv-avatar-grand">{apercu ? <img src={apercu} alt="" /> : '👤'}</div>
            <p className="sv-apercu-nom">{nomComplet}</p>
            <p className="sv-apercu-boutique">{f.boutique || 'Nom de la boutique'}</p>
            <p className="sv-apercu-type">🏪 Vendeur {f.typeVendeur.toLowerCase()}</p>
            <ul>
              <li>✉️ {f.email || 'E-mail'}</li>
              <li>📞 {f.telephone || 'Téléphone'}</li>
              <li>📍 {f.adresse || 'Adresse'}</li>
            </ul>
            {f.categorie && <span className="sv-tag">{f.categorie}</span>}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default InfosVendeur;