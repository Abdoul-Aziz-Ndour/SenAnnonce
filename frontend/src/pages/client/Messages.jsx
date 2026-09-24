import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Messages = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    api.get('/messages/conversations').then((res) => setConversations(res.data));
  }, []);

  return (
    <div className="page">
      <h2>Messages</h2>
      <div className="conversations-list">
        {conversations.map((conv) => (
          <Link
            to={`/conversation/${conv.contact._id}`}
            key={conv.contact._id}
            className="conversation-item"
          >
            <img src={conv.contact.photo || 'https://via.placeholder.com/50'} alt={conv.contact.nom} />
            <div className="conversation-info">
              <p className="conversation-nom">{conv.contact.prenom} {conv.contact.nom}</p>
              <p className="conversation-preview">{conv.dernierMessage.contenu}</p>
            </div>
            {conv.nonLus > 0 && <span className="badge-count">{conv.nonLus}</span>}
          </Link>
        ))}
        {conversations.length === 0 && <p className="empty-state">Aucune conversation</p>}
      </div>
    </div>
  );
};

export default Messages;
