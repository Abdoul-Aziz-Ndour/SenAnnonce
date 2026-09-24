import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Conversation = () => {
  const { contactId } = useParams();
  const [searchParams] = useSearchParams();
  const annonceId = searchParams.get('annonce');
  const [messages, setMessages] = useState([]);
  const [texte, setTexte] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const charger = () => {
    api.get(`/messages/${contactId}`).then((res) => setMessages(res.data));
  };

  useEffect(() => {
    charger();
    const interval = setInterval(charger, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const envoyer = async (e) => {
    e.preventDefault();
    if (!texte.trim()) return;
    await api.post('/messages', { recepteur: contactId, contenu: texte, annonce: annonceId });
    setTexte('');
    charger();
  };

  return (
    <div className="page conversation-page">
      <div className="conversation-header">
        <button onClick={() => navigate(-1)}>←</button>
        <span>Conversation</span>
      </div>

      <div className="conversation-body">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`bulle ${m.expediteur === user._id ? 'bulle-moi' : 'bulle-autre'}`}
          >
            {m.contenu}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="conversation-input" onSubmit={envoyer}>
        <input
          placeholder="Écrire un message..."
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
        />
        <button type="submit">➤</button>
      </form>
    </div>
  );
};

export default Conversation;
