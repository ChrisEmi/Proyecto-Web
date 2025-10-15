import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Login from "./pages/usuarios/Login.jsx";
import Registro from "./pages/usuarios/Registro.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
