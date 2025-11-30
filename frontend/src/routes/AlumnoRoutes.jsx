import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/layout/LoopCarga.jsx';
import AlumnoLayout from '../layouts/AlumnoLayout.jsx';
import { AlumnoProvider } from '../api/Context/AlumnoContext.jsx';
import { EventosProvider } from '../api/Context/EventosContext.jsx';

const Inicio = lazy(() => import('../pages/usuarios/alumno/InicioAlumno.jsx'));
const Calendario = lazy(() => import('../pages/usuarios/alumno/CalendarioAlumno.jsx'));
const Eventos = lazy(() => import('../pages/usuarios/alumno/Eventos.jsx'));

const AlumnoRoutes = () => {
  return (
    <AlumnoProvider>
      <EventosProvider>
          <Suspense fallback={<LoopCarga />}>
            <Routes>
              <Route element={<AlumnoLayout />}>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Inicio />} />
                <Route path="/mis-actividades" element={<Inicio />} />
                <Route path="/mis-eventos" element={<Eventos />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/ajustes" element={<Inicio />} />
                <Route path="*" element={<Navigate to="/alumno/inicio" />} />
              </Route>
            </Routes>
          </Suspense>
      </EventosProvider>
    </AlumnoProvider>
  );
};

export default AlumnoRoutes;