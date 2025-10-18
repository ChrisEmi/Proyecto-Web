import axios from "./axios.js";

const AuthAPI = {
  login: (formLogin) => axios.post("/auth/login", formLogin),
  registro: (formRegistro) => axios.post("/auth/registro", formRegistro),
  logout: () => axios.post("/auth/logout"),
  verificarTokenCookie: () => axios.get("/auth/verificar-token"),
};

export default AuthAPI;
