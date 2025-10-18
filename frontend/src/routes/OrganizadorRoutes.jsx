import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/LoopCarga.jsx';


const OrganizadorRoutes = () => {
  return (
    <Suspense fallback={<LoopCarga />}>
      <Routes>

        <Route path="/" element={<Panel />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="eventos" element={<Eventos />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default OrganizadorRoutes;
