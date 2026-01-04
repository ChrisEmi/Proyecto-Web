import axios from "./axios.js";

const AuthAPI = {
  login: (formLogin) => axios.post("/auth/login", formLogin),
  registro: (formRegistro) => axios.post("/auth/registro", formRegistro),
  logout: () => axios.post("/auth/logout"),
  verificarTokenCookie: () => axios.get("/auth/verificar-token"),
  generarTokenContrasena: (correo) =>
    axios.post("/auth/generar-token-contrasena", { correo }),
  restablecerContrasena: (data) =>
    axios.post("/auth/restablecer-contrasena", data),
};

export default AuthAPI;
