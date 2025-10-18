import { useAuth } from '../api/Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import LoopCarga from '../components/LoopCarga.jsx';

export const AuthGuard = () => {
  const { loading, authSesion } = useAuth();

  if (loading) {
    return <LoopCarga />;
  }
  if (!authSesion) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};