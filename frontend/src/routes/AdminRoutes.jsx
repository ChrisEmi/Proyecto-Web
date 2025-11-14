import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/layout/LoopCarga.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import { AdminProvider } from '../api/Context/AdminContext.jsx';
import { EventosProvider } from '../api/Context/EventosContext.jsx';

const Inicio = lazy(() => import('../pages/usuarios/admin/InicioAdmin.jsx'));
const Usuarios = lazy(() => import('../pages/usuarios/admin/UsuarioAdmin.jsx'));
const Perfil = lazy(() => import('../pages/usuarios/admin/PerfilAdmin'));

const AdminRoutes = () => {
  return (
    <AdminProvider>
      <EventosProvider>
          <Suspense fallback={<LoopCarga />}>
            <Routes>
              <Route element={<AdminLayout />}>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/eventos" element={<Perfil />} />
                <Route path="/crear-usuario" element={<Perfil />} />
                <Route path="/ajustes" element={<Perfil />} />
                <Route path="*" element={<Navigate to="/control/admin/inicio" />} />
              </Route>
            </Routes>
          </Suspense>
      </EventosProvider>
    </AdminProvider>
  );
};

export default AdminRoutes;