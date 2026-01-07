import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoopCarga from '../components/layout/LoopCarga.jsx';
import OrganizadorLayout from '../layouts/OrganizadorLayout.jsx';
import { OrganizadorProvider } from '../api/Context/OrganizadorContext.jsx';
import { EventosProvider } from '../api/Context/EventosContext.jsx';

const Inicio = lazy(() => import('../pages/usuarios/organizador/InicioOrganizador.jsx'));
const Calendario = lazy(() => import('../pages/usuarios/organizador/CalendarioOrganizador.jsx'));
const CrearEvento = lazy(() => import('../pages/usuarios/organizador/CrearEvento.jsx'));
const Eventos = lazy(() => import('../pages/usuarios/organizador/Eventos.jsx'));
const Perfil = lazy(() => import('../pages/usuarios/organizador/Perfil.jsx'));
const Configuracion = lazy(() => import('../pages/usuarios/organizador/Configuracion.jsx'));


const OrganizadorRoutes = () => {
  return (
    <OrganizadorProvider>
      <EventosProvider>
          <Suspense fallback={<LoopCarga />}>
            <Routes>
              <Route element={<OrganizadorLayout />}>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/crear-evento" element={<CrearEvento />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/ajustes" element={<Configuracion />} />
                <Route path="*" element={<Navigate to="/organizador/inicio" />} />
              </Route>
            </Routes>
          </Suspense>
      </EventosProvider>
    </OrganizadorProvider>
  );
};

export default OrganizadorRoutes;