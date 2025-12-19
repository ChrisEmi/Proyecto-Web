import { useEffect, createContext, useContext, useState } from "react";
import EventosAPI from "../Routes/Eventos.js";
import ActividadesAPI from "../Routes/Actividades.js";

export const EventosContext = createContext();

export const useEventos = () => {
    const context = useContext(EventosContext);
    if (!context) {
        throw new Error("useEventos debe ser usado dentro de un EventosProvider");
    }
    return context;
}

export const EventosProvider = ({ children }) => {
    const [eventos, setEventos] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [errors, setErrors] = useState();
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(null);
    const [loading, setLoading] = useState(true);

    const obtenerEventos = async (ordenar_por = 'fecha', direccion = 'DESC', categoria) => {
        try {
            setLoading(true);
            const res = await EventosAPI.obtenerEventos(ordenar_por, direccion, categoria);
            setEventos(res.data.eventos)
            console.log(res.data.eventos)
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            setErrors(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const obtenerEventoPorId = async (id) => {
        try {
            const res = await EventosAPI.obtenerEventoPorId(id);
            return res.data.evento;
        } catch (error) {
            console.error("Error al obtener el evento:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    const eliminarEvento = async (id_evento) => {
        try {
            const res = await EventosAPI.eliminarEvento(id_evento);
            setMensajeConfirmacion(res.data.message);
            console.log(res.data.message);
            return res.data;
        } catch (error) {
            console.error("Error al eliminar el evento:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    const obtenerActividades = async () => { 
        try {
            setLoading(true);
            const res = await ActividadesAPI.obtenerActividades();
            setActividades(res.data.actividades);
        } catch (error) {
            console.error("Error al obtener las actividades:", error);
            setErrors(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

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
        <EventosContext.Provider value={{
            obtenerEventos,
            obtenerEventoPorId,
            mensajeConfirmacion,
            obtenerActividades,
            actividades,
            setMensajeConfirmacion,
            eliminarEvento,
            eventos,
            errors,
            loading,
        }}>
            {children}
        </EventosContext.Provider>
    );
}