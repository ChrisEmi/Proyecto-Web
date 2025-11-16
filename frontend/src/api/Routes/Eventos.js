import axios from "./axios.js";

const EventosAPI = {
  obtenerEventos: (ordenar_por, direccion) => {
    return axios.get(`/eventos/obtener-eventos/${ordenar_por}/${direccion}`);
  },
  obtenerEventoPorId: (id) => {
    return axios.get(`/eventos/obtener-evento/${id}`);
  },
  obtenerEventosPorUsuario: (ordenar_por, direccion) => {
    return axios.get(
      `/eventos/obtener-por-usuario/${ordenar_por}/${direccion}`
    );
  },
  obtenerEventosPorOrganizador: (ordenar_por, direccion) => {
    return axios.get(
      `/evento/obtener-por-organizador/${ordenar_por}/${direccion}`
    );
  },
  crearEvento: (formData) => axios.post("/evento/crear", formData),
  actualizarEvento: (id_evento, formData) =>
    axios.put(`/eventos/actualizar/${id_evento}`, formData),
  inscribirseEvento: (id_evento) =>
    axios.post(`/eventos/inscribirse/${id_evento}`),
  desinscribirseEvento: (id_evento) =>
    axios.post(`/eventos/desinscribirse/${id_evento}`),
  inscripcionesPorEvento: (id_evento) =>
    axios.get(`/eventos/inscripciones-por-evento/${id_evento}`),
};

export default EventosAPI;
