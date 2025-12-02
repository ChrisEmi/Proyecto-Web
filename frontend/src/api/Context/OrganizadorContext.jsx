import { useEffect, createContext, useContext, useState } from "react";
import EventosAPI from "../Routes/Eventos.js";
import PerfilAPI from "../Routes/Perfil.js";

export const OrganizadorContext = createContext();

export const useOrganizador = () => {
    const context = useContext(OrganizadorContext);
    if (!context) {
        throw new Error("useOrganizador debe ser usado dentro de un OrganizadorProvider");
    }
    return context;
}

export const OrganizadorProvider = ({ children }) => {
    const [eventosOrganizados, setEventosOrganizados] = useState([]);
    const [inscripciones, setInscripciones] = useState([]);
    const [errors, setErrors] = useState()
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState(null);

    const crearEvento = async (formData) => {
        try {
            const res = await EventosAPI.crearEvento(formData);
            setMensajeConfirmacion(res.data.message);
            return res.data.eventoCreado;
        } catch (error) {
            console.error("Error al crear el evento:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const actualizarEvento = async (id_evento, formData) => {
        try {
            const res = await EventosAPI.actualizarEvento(id_evento, formData);
            setMensajeConfirmacion(res.data.message);
            console.log(res.data);
            return res.data.message;
        } catch (error) {
            console.error("Error al actualizar el evento:", error);
            console.error("Respuesta del servidor:", error.response?.data);
            setErrors(error.response?.data?.message || "Error al actualizar el evento");
        }
    };

    const obtenerEventosPorOrganizador = async (ordenar_por = 'nombre', direccion = 'ASC') => {
        try {
            setLoading(true);
            const res = await EventosAPI.obtenerEventosPorOrganizador(ordenar_por, direccion);
            setEventosOrganizados(res.data.eventos);
            console.log("Eventos obtenidos:", res.data);
        } catch (error) {
            console.error("Error al obtener los eventos del organizador:", error);
            setErrors(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const obtenerInscripcionesPorEvento = async (id_evento) => {
        try {
            const res = await EventosAPI.inscripcionesPorEvento(id_evento);
            setInscripciones(res.data.inscripciones);
        } catch (error) {
            console.error("Error al obtener las inscripciones del evento:", error);
            setErrors(error.response?.data?.message);
            return [];
        }
    };

    const obtenerDatosPerfil = async () => {
        try {
            setLoading(true);
            const res = await PerfilAPI.obtenerPerfilOrganizador();
            console.log("Datos del perfil obtenidos:", res);
            setPerfil(res.data.perfil);
        } catch (error) {
            console.error("Error al obtener los datos del perfil:", error);
            setPerfil(null);
            setErrors(error.response?.data?.message);
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    const actualizarDatosPerfil = async (formData) => {
        try {
            const res = await PerfilAPI.actualizarPerfilOrganizador(formData);
            setMensajeConfirmacion(res.data.message);
            console.log("Perfil actualizado:", res.data);
            return res.data.perfilActualizado;
        } catch (error) {
            console.error("Error al actualizar los datos del perfil:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    useEffect(() => {
        if ((errors && Object.keys(errors).length > 0) || mensajeConfirmacion) {
            const timer = setTimeout(() => {
                setErrors(null);
                setMensajeConfirmacion(null);
            }, 5150);
            return () => clearTimeout(timer);
        }
    }, [errors, mensajeConfirmacion]);
    
    return (
        <OrganizadorContext.Provider value={{
            crearEvento,
            actualizarEvento,
            obtenerEventosPorOrganizador,
            obtenerInscripcionesPorEvento,
            eventosOrganizados,
            inscripciones,
            perfil,
            obtenerDatosPerfil,
            actualizarDatosPerfil,
            errors,
            mensajeConfirmacion,
            setMensajeConfirmacion,
            loading,
        }}>
            {children}
        </OrganizadorContext.Provider>
    );
}