import axios from "./axios.js";

const EventosAPI = {
  obtenerEventos: (ordenar_por, direccion, categoria) => {
    if (categoria) {
      return axios.get(
        `/evento/obtener-todos/${ordenar_por}/${direccion}/${categoria}`
      );
    } else {
      return axios.get(
        `/evento/obtener-todos/${ordenar_por}/${direccion}/todos`
      );
    }
  },
  obtenerEventoPorId: (id) => {
    return axios.get(`/evento/obtener/${id}`);
  },
  obtenerEventosPorUsuario: (ordenar_por, direccion) => {
    return axios.get(`/evento/obtener-por-usuario/${ordenar_por}/${direccion}`);
  },
  obtenerEventosPorOrganizador: (ordenar_por, direccion) => {
    return axios.get(
      `/evento/obtener-por-organizador/${ordenar_por}/${direccion}`
    );
  },
  crearEvento: (formData) => axios.post("/evento/crear", formData),
  actualizarEvento: (id_evento, formData) =>
    axios.put(`/evento/actualizar/${id_evento}`, formData),
  inscribirseEvento: (id_evento) =>
    axios.post(`/evento/inscripcion-usuario/${id_evento}`),
  desinscribirseEvento: (id_evento) =>
    axios.post(`/evento/cancelar-inscripcion/${id_evento}`),
  inscripcionesPorEvento: (id_evento) =>
    axios.get(`/evento/inscripciones-por-evento/${id_evento}`),
  verificarInscripcion: (id_evento) =>
    axios.get(`/evento/verificar-inscripcion/${id_evento}`),
  eliminarEvento: (id_evento) =>
    axios.post(`/evento/eliminar-evento/${id_evento}`),
  inscripcionesOrganizador: () =>
    axios.get(`/evento/inscripciones-organizador`),
  resumenInscripcionesOrganizador: () =>
    axios.get(`/evento/resumen-inscripciones-organizador`),
  enviarAvisosProximosEventos: (id_evento) =>
    axios.post(`/evento/enviar-avisos/${id_evento}`),
  marcarEventoComoPasado: (id_evento) =>
    axios.post(`/evento/marcar-como-pasado/${id_evento}`),
};

export default EventosAPI;
