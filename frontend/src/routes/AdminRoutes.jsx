import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/LoopCarga.jsx';

const Panel = lazy(() => import('../pages/usuarios/admin/PanelAdmin'));
const Perfil = lazy(() => import('../pages/usuarios/admin/PerfilAdmin'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoopCarga />}>
      <Routes>

        <Route path="/" element={<Panel />} />
        <Route path="perfil" element={<Perfil />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;