import { useEffect, createContext, useContext, useState } from "react";
import EventosAPI from "../Routes/Eventos.js";
import PerfilAPI from "../Routes/Perfil.js";
export const AlumnoContext = createContext();

export const useAlumno = () => {
    const context = useContext(AlumnoContext);
    if (!context) {
        throw new Error("useAlumno debe ser usado dentro de un AlumnoProvider");
    }
    return context;
}

export const AlumnoProvider = ({ children }) => {
    const [eventosInscritos, setEventosInscritos] = useState([]);
    const [errors, setErrors] = useState();
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState(null);

    const obtenerEventosPorUsuario = async (ordenar_por = 'titulo', direccion = 'ASC') => {
        try {
            setLoading(true);
            const res = await EventosAPI.obtenerEventosPorUsuario(ordenar_por, direccion);
            setEventosInscritos(res.data.eventos);
        } catch (error) {
            console.error("Error al obtener los eventos del usuario:", error);
            setErrors(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const inscribirseEvento = async (id_evento) => {
        try {
            console.log("Inscribiéndose al evento:", id_evento);
            const res = await EventosAPI.inscribirseEvento(id_evento);
            setMensajeConfirmacion(res.data.message);
            console.log(res.data);

        } catch (error) {
            console.error("Error al inscribirse al evento:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const desinscribirseEvento = async (id_evento) => {
        try {
            const res = await EventosAPI.desinscribirseEvento(id_evento);
            setMensajeConfirmacion(res.data.message);
        } catch (error) {
            console.error("Error al desinscribirse del evento:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const verificarInscripcion = async (id_evento) => {
        try {
            const resEventos = await obtenerEventosPorUsuario();
            console.log(resEventos);
            const res = await EventosAPI.verificarInscripcion(id_evento);

            console.log(res.data);
            return res.data.inscrito;

        } catch (error) {
            console.error("Error al verificar la inscripción:", error);
            setErrors(error.response?.data?.message);
            return false;
        }
    };

    const obtenerDatosPerfil = async () => {
        try {
            setLoading(true);
            const res = await PerfilAPI.obtenerPerfilAlumno();
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
            const res = await PerfilAPI.actualizarPerfilAlumno(formData);
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
        if (errors && Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 5150);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (mensajeConfirmacion) {
            const timer = setTimeout(() => {
                setMensajeConfirmacion(null);
            }, 5150);
            return () => clearTimeout(timer);
        }
    }, [mensajeConfirmacion]);

    return (
        <AlumnoContext.Provider value={{
            obtenerEventosPorUsuario,
            inscribirseEvento,
            mensajeConfirmacion,
            setMensajeConfirmacion,
            verificarInscripcion,
            desinscribirseEvento,
            eventosInscritos,
            perfil,
            obtenerDatosPerfil,
            errors,
            actualizarDatosPerfil,
            loading,
        }}>
            {children}
        </AlumnoContext.Provider>
    );
}