import { useAuth } from '../api/Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import LoopCarga from '../components/LoopCarga.jsx';

export const RolGuard = ({ allowedRoles = ['Estudiante', 'Administrador', 'Organizador'] }) => {
  const { usuario, loading } = useAuth();

  if (loading) {
    return <LoopCarga />;
  }
  if (!usuario || !allowedRoles.includes(usuario.rol)) {
    return <Navigate to="/unauthorized" replace />; 
  }

    return <Outlet />;
};