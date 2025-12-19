import axios from "./axios.js";

const ActividadesAPI = {
  obtenerActividades: (ordenar_por, direccion, categoria) => {
    if (categoria) {
      return axios.get(
        `/actividades/obtener-todas/${ordenar_por}/${direccion}/${categoria}`
      );
    } else {
      return axios.get(
        `/actividades/obtener-todas/${ordenar_por}/${direccion}/todos`
      );
    }
  },
  obtenerActividadPorId: (id) => {
    return axios.get(`/actividades/obtener/${id}`);
  },
  obtenerActividadesPorUsuario: (ordenar_por, direccion) => {
    return axios.get(
      `/actividades/obtener-por-usuario/${ordenar_por}/${direccion}`
    );
  },
  crearActividadDeportiva: (formData) =>
    axios.post("/actividades/crear/deportiva", formData),
  crearActividadCultural: (formData) =>
    axios.post("/actividades/crear/cultural", formData),
  actualizarActividadDeportiva: (id_actividad, formData) =>
    axios.put(`/actividades/actualizar/deportiva/${id_actividad}`, formData),
  actualizarActividadCultural: (id_actividad, formData) =>
    axios.put(`/actividades/actualizar/cultural/${id_actividad}`, formData),
  inscribirseActividad: (id_actividad) =>
    axios.post(`/actividades/inscripcion-usuario/${id_actividad}`),
  desinscribirseActividad: (id_actividad) =>
    axios.post(`/actividades/cancelar-inscripcion/${id_actividad}`),
  inscripcionesPorActividad: (id_actividad) =>
    axios.get(`/actividades/inscripciones-por-actividad/${id_actividad}`),
  verificarInscripcion: (id_actividad) =>
    axios.get(`/actividades/verificar-inscripcion/${id_actividad}`),
  eliminarActividad: (id_actividad) =>
    axios.post(`/actividades/eliminar-actividad/${id_actividad}`),
};

export default ActividadesAPI;
