import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Inicio from "../pages/base/Inicio.jsx";
import Login from "../pages/usuarios/usuario/Login.jsx";
import Registro from "../pages/usuarios/usuario/Registro.jsx";
import SinPermiso from "../pages/base/SinPermiso.jsx";

import { AuthGuard } from "../guards/AuthGuard.jsx";
import { RolGuard } from "../guards/RolGuard.jsx";
import LoopCarga from "../components/layout/LoopCarga.jsx";
import { EventosProvider } from "../api/Context/EventosContext.jsx";

const AdminRoutes = lazy(() => import('./AdminRoutes'));
const OrganizadorRoutes = lazy(() => import('./OrganizadorRoutes'));
const AlumnoRoutes = lazy(() => import('./AlumnoRoutes'));

const Router = () => {
  return (
    <Suspense fallback={<LoopCarga />}>
      <Routes>
        <Route path="/" element={
          <EventosProvider>
            <Inicio />
          </EventosProvider>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route element={<AuthGuard />}>
          <Route element={<RolGuard allowedRoles={['Administrador']} />}>
            <Route path="/control/admin/*" element={<AdminRoutes />} />
          </Route>
          <Route element={<RolGuard allowedRoles={['Organizador']} />}>
            <Route path="/organizador/*" element={<OrganizadorRoutes />} />
          </Route>
          <Route element={<RolGuard allowedRoles={['Estudiante']} />}>
            <Route path="/alumno/*" element={<AlumnoRoutes />} />
          </Route>
        </Route>

        <Route path="/sin-permiso" element={<SinPermiso />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
