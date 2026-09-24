import { useAuth } from '../context/AuthContext';
import ClientLayout from './ClientLayout';
import VendeurLayout from './VendeurLayout';

const RoleLayout = () => {
  const { user } = useAuth();
  if (user?.role === 'prestataire' || user?.role === 'admin') {
    return <VendeurLayout />;
  }
  return <ClientLayout />;
};

export default RoleLayout;