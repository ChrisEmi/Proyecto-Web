import { useEffect, createContext, useContext, useState } from "react";
import EventosAPI from "../Routes/Eventos.js";

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

    const obtenerEventosPorUsuario = async (ordenar_por = 'nombre', direccion = 'ASC') => {
        try {
            const res = await EventosAPI.obtenerEventosPorUsuario(ordenar_por, direccion);
            setEventosInscritos(res.data.eventos);
        } catch (error) {
            console.error("Error al obtener los eventos del usuario:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const inscribirseEvento = async (id_evento) => {
        try {
            const res = await EventosAPI.inscribirseEvento(id_evento);
            return res.data.message;
        } catch (error) {
            console.error("Error al inscribirse al evento:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const desinscribirseEvento = async (id_evento) => {
        try {
            const res = await EventosAPI.desinscribirseEvento(id_evento);
            return res.data.message;
        } catch (error) {
            console.error("Error al desinscribirse del evento:", error);
            setErrors(error.response?.data?.message);
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

    return (
        <AlumnoContext.Provider value={{
            obtenerEventosPorUsuario,
            inscribirseEvento,
            desinscribirseEvento,
            eventosInscritos,
            errors,
        }}>
            {children}
        </AlumnoContext.Provider>
    );
}