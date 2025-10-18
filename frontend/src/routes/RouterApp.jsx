import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Inicio from "../pages/Inicio.jsx";
import Login from "../pages/usuarios/Login.jsx";
import Registro from "../pages/usuarios/Registro.jsx";

import { AuthGuard } from "../guards/AuthGuard.jsx";
import { RolGuard } from "../guards/RolGuard.jsx";
import LoopCarga from "../components/LoopCarga.jsx";

const AdminRoutes = lazy(() => import('./AdminRoutes'));
const OrganizadorRoutes = lazy(() => import('./OrganizadorRoutes'));
const AlumnoRoutes = lazy(() => import('./AlumnoRoutes'));

const Router = () => {
  return (
    <Suspense fallback={<LoopCarga />}>
      <Routes>
        <Route path="/" element={<Inicio />} />
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
