import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/layout/LoopCarga.jsx';
import OrganizadorLayout from '../layouts/OrganizadorLayout.jsx';
import { OrganizadorProvider } from '../api/Context/OrganizadorContext.jsx';
import { EventosProvider } from '../api/Context/EventosContext.jsx';

const Inicio = lazy(() => import('../pages/usuarios/organizador/InicioOrganizador.jsx'));
const Calendario = lazy(() => import('../pages/usuarios/organizador/CalendarioOrganizador.jsx'));
const OrganizadorRoutes = () => {
  return (
    <OrganizadorProvider>
      <EventosProvider>
          <Suspense fallback={<LoopCarga />}>
            <Routes>
              <Route element={<OrganizadorLayout />}>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Inicio />} />
                <Route path="/mis-actividades" element={<Inicio />} />
                <Route path="/mis-eventos" element={<Inicio />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/ajustes" element={<Inicio />} />
                <Route path="*" element={<Navigate to="/organizador/inicio" />} />
              </Route>
            </Routes>
          </Suspense>
      </EventosProvider>
    </OrganizadorProvider>
  );
};

export default OrganizadorRoutes;