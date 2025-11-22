import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/layout/LoopCarga.jsx';
import { EventosProvider } from '../api/Context/EventosContext.jsx';
import EventosLayout from '../layouts/EventosLayout.jsx';

const Inicio = lazy(() => import('../pages/evento/Inicio.jsx'));
const Calendario = lazy(() => import('../pages/evento/CalendarioEventos.jsx'));

const EventosRoutes = () => {
  return (
    <EventosProvider>
        <Suspense fallback={<LoopCarga />}>
          <Routes>
            <Route element={<EventosLayout />}>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/proximos-eventos" element={<Calendario />} />
              <Route path="/historial" element={<Calendario />} />
              <Route path="*" element={<Navigate to="/actividades-eventos/inicio" />} />
            </Route>
          </Routes>
        </Suspense>
    </EventosProvider>
  );
};

export default EventosRoutes;