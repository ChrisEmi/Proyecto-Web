import axios from "./axios.js";

const AdminAPI = {
  obtenerUsuarios: (params) =>
    axios.get("/administrador/obtener-usuarios", { params }),
  obtenerUsuariosConFiltros: (rol, ordenar_por, direccion) => {
    if (rol) {
      return axios.get(
        `/administrador/obtener-usuarios/${rol}/${ordenar_por}/${direccion}`
      );
    } else {
      return axios.get(
        `/administrador/obtener-usuarios/todos/${ordenar_por}/${direccion}`
      );
    }
  },
  crearOrganizador: (formData) =>
    axios.post("/administrador/crear-organizador", formData),
  crearAdministrador: (formData) =>
    axios.post("/administrador/crear-administrador", formData),
  verificarEvento: (id_evento) =>
    axios.post(`/administrador/verificar-evento/${id_evento}`),
  eliminarEvento: (id_evento) =>
    axios.post(`/administrador/eliminar-evento/${id_evento}`),
  obtenerEventosAdmin: (ordenar_por, direccion, estado) => {
    if (!estado) {
      return axios.get(
        `/administrador/obtener-eventos/${ordenar_por}/${direccion}/todos`
      );
    } else {
      return axios.get(
        `/administrador/obtener-eventos/${ordenar_por}/${direccion}/${estado}`
      );
    }
  },
  banearUsuario: (id_usuario, nuevo_estado) =>
    axios.post(`/administrador/banear-usuario/${id_usuario}`, { nuevo_estado }),
  obtenerPerfilUsuario: (id_usuario) =>
    axios.get(`/administrador/perfil-usuario/${id_usuario}`),
  obtenerEventosPorUsuario: (id_usuario) =>
    axios.get(`/administrador/eventos-usuario/${id_usuario}`),
  obtenerEventosOrganizador: (id_usuario) =>
    axios.get(`/administrador/eventos-organizador/${id_usuario}`),
};

export default AdminAPI;
