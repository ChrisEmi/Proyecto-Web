import { useAuth } from '../api/Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import LoopCarga from '../components/layout/LoopCarga.jsx';

export const RolGuard = ({ allowedRoles = ['Estudiante', 'Administrador', 'Organizador'] }) => {
  const { usuario, loading } = useAuth();

  if (loading) {
    return <LoopCarga />;
  }
  if (!usuario || !allowedRoles.includes(usuario.nombre_tipo)) {
    return <Navigate to="/sin-permiso" replace />;
  }

    return <Outlet />;
};