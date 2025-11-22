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
};

export default AdminAPI;
