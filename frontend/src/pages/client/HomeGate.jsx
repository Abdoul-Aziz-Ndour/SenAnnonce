import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Home from './Home';

const HomeGate = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/demarrage" replace />;
  return <Home />;
};

export default HomeGate;