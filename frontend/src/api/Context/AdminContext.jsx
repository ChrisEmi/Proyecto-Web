import { useEffect, createContext, useContext, useState } from "react";
import AdminAPI from "../Routes/Admin.js";
import EventosAPI from "../Routes/Eventos.js";

export const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin debe ser usado dentro de un AdminProvider");
    }
    return context;
}
export const AdminProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([])
    const [eventos, setEventos] = useState([])
    const [errors, setErrors] = useState(null)
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState(null);
    
    const obtnerUsuarios = async (rol, ordenar_por = 'nombre', direccion = 'ASC') => {
        try {
            const res = await AdminAPI.obtenerUsuariosConFiltros(rol, ordenar_por, direccion);
            console.log(res.data);
            setUsuarios(res.data.usuarios);
        } catch (error) {
            console.error("Error en el registro:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const obtenerEventos = async (ordenar_por = 'fecha_creacion', direccion = 'DESC') => {
        try {
            const res = await EventosAPI.obtenerEventos(ordenar_por, direccion);
            setEventos(res.data.eventos);
            console.log("Eventos obtenidos:", res);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const verificarEvento = async (id_evento) => {
        try {
            const res = await AdminAPI.verificarEvento(id_evento);
            setMensajeConfirmacion(res.data.message);
        } catch (error) {
            console.error("Error al verificar el evento:", error);
            setErrors(error.response?.data?.message);
        }
    };

    const eliminarEvento = async (id_evento) => {
        try {
            const res = await AdminAPI.eliminarEvento(id_evento);
            setMensajeConfirmacion(res.data.message);
            console.log(res.data.message);
            return res.data;
        } catch (error) {
            console.error("Error al eliminar el evento:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };



    useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
        const timer = setTimeout(() => {
            setErrors(null);
        }, 5150);
        return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
    if (mensajeConfirmacion) {
        const timer = setTimeout(() => {
            setMensajeConfirmacion(null);
        }, 5150);
        return () => clearTimeout(timer)
        }
    }, [mensajeConfirmacion]);
    return (
        <AdminContext.Provider value={{
            obtnerUsuarios,
            usuarios,
            obtenerEventos,
            eventos,
            mensajeConfirmacion,
            verificarEvento,
            eliminarEvento,
            errors,
        }}>
            {children}
        </AdminContext.Provider>
    )
}