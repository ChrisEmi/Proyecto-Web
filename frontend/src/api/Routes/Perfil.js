import axios from "./axios.js";

const PerfilAPI = {
  obtenerPerfilAlumno: () => {
    return axios.get("/perfil/alumno/obtener");
  },
  actualizarPerfilAlumno: (formData) => {
    return axios.put("/perfil/alumno/actualizar", formData);
  },
  obtenerPerfilOrganizador: () => {
    return axios.get("/perfil/organizador/obtener");
  },
  actualizarPerfilOrganizador: (formData) => {
    return axios.put("/perfil/organizador/actualizar", formData);
  },
  obtenerPerfilAdmin: () => {
    return axios.get("/perfil/admin/obtener");
  },
  actualizarPerfilAdmin: (formData) => {
    return axios.put("/perfil/admin/actualizar", formData);
  },
  cambiarPreferenciasNotificacionesOrganizador: (preferencias) => {
    return axios.put(
      `/perfil/cambiar-preferencias-organizador/${preferencias}`
    );
  },
  cambiarPreferenciasNotificacionesAlumno: (preferencias) => {
    return axios.put(`/perfil/cambiar-preferencias-alumno/${preferencias}`);
  },
  cambiarPreferenciasNotificacionesAdmin: (preferencias) => {
    return axios.put(`/perfil/cambiar-preferencias-admin/${preferencias}`);
  },
};
export default PerfilAPI;
