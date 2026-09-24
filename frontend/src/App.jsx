import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import RoleLayout from './layouts/RoleLayout';
import AdminLayout from './layouts/AdminLayout';

import ChooseRole from './pages/client/ChooseRole';
import Splash from './pages/client/Splash';
import HomeGate from './pages/client/HomeGate';
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import RegisterVendeur from './pages/client/RegisterVendeur';
import ForgotPassword from './pages/client/ForgotPassword';
import Search from './pages/client/Search';
import AnnonceDetail from './pages/client/AnnonceDetail';
import PublishAnnonce from './pages/client/PublishAnnonce';
import MyAnnonces from './pages/client/MyAnnonces';
import Messages from './pages/client/Messages';
import Conversation from './pages/client/Conversation';
import Profile from './pages/client/Profile';
import Notifications from './pages/client/Notifications';
import Favoris from './pages/client/Favoris';

import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import AnnoncesAdmin from './pages/admin/AnnoncesAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/demarrage" element={<Splash />} />
          <Route path="/rejoindre" element={<ChooseRole />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/inscription-prestataire" element={<RegisterVendeur />} />
          <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
          <Route path="/conversation/:contactId" element={<PrivateRoute><Conversation /></PrivateRoute>} />

          <Route element={<RoleLayout />}>
            <Route path="/" element={<HomeGate />} />
            <Route path="/recherche" element={<Search />} />
            <Route path="/annonce/:id" element={<AnnonceDetail />} />
            <Route path="/favoris" element={<PrivateRoute roles={['client', 'prestataire', 'admin']}><Favoris /></PrivateRoute>} />
            <Route path="/publier" element={<PrivateRoute roles={['prestataire', 'admin']}><PublishAnnonce /></PrivateRoute>} />
            <Route path="/mes-annonces" element={<PrivateRoute roles={['prestataire', 'admin']}><MyAnnonces /></PrivateRoute>} />
            <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/profil" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          </Route>

          <Route element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/utilisateurs" element={<Users />} />
            <Route path="/admin/annonces" element={<AnnoncesAdmin />} />
            <Route path="/admin/categories" element={<CategoriesAdmin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;