import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/LoopCarga.jsx';

const Panel = lazy(() => import('../pages/usuarios/alumno/PanelAlumno'));
const Perfil = lazy(() => import('../pages/usuarios/alumno/PerfilAlumno'));
const Eventos = lazy(() => import('../pages/usuarios/alumno/EventosAlumno'));

const AlumnoRoutes = () => {
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

export default AlumnoRoutes;