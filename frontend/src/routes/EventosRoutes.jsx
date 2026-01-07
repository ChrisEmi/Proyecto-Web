import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { VistaCarga } from '../components/layout/LoopCarga.jsx';
import { EventosProvider } from '../api/Context/EventosContext.jsx';
import EventosLayout from '../layouts/EventosLayout.jsx';
import { AlumnoProvider } from '../api/Context/AlumnoContext.jsx';

const Inicio = lazy(() => import('../pages/agenda/Inicio.jsx'));
const Calendario = lazy(() => import('../pages/agenda/CalendarioEventos.jsx'));
const Eventos = lazy(() => import('../pages/agenda/Eventos.jsx'));

const EventosRoutes = () => {
  return (
    <EventosProvider>
      <AlumnoProvider>
        <Suspense fallback={<VistaCarga />}>
          <Routes>
            <Route element={<EventosLayout />}>
              <Route path="/explorar" element={<Inicio />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="*" element={<Navigate to="/eventos/explorar" />} />
            </Route>
          </Routes>
        </Suspense>
      </AlumnoProvider>
    </EventosProvider>
  );
};

export default EventosRoutes;