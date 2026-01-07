import { useEffect, createContext, useContext, useState } from "react";
import AdminAPI from "../Routes/Admin.js";
import PerfilAPI from "../Routes/Perfil.js";

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
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState(null);
    const [usuarioCreado, setUsuarioCreado] = useState(null);
    
    const obtnerUsuarios = async (rol, ordenar_por = 'nombre', direccion = 'ASC') => {
        try {
            setLoading(true);
            const res = await AdminAPI.obtenerUsuariosConFiltros(rol, ordenar_por, direccion);
            console.log(res.data);
            setUsuarios(res.data.usuarios);
        } catch (error) {
            console.error("Error en el registro:", error);
            setErrors(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const obtenerEventos = async (ordenar_por = 'fecha_creacion', direccion = 'DESC', estado = '') => {
        try {
            setLoading(true);
            const res = await AdminAPI.obtenerEventosAdmin(ordenar_por, direccion, estado);
            setEventos(res.data.eventos);
            console.log("Eventos obtenidos:", res);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
            setErrors(error.response?.data?.message);
        } finally {
            setLoading(false);
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

    const crearOrganizador = async (formData) => {
        try {
            const res = await AdminAPI.crearOrganizador(formData);
            setMensajeConfirmacion(res.data.message);
            setUsuarioCreado(res.data);
            return res.data.organizadorCreado;
        } catch (error) {
            console.error("Error al crear el organizador:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    const crearAdmin = async (formData) => {
        try {
            const res = await AdminAPI.crearAdministrador(formData);
            setMensajeConfirmacion(res.data.message);
            setUsuarioCreado(res.data);
            return res.data.adminCreado;
        } catch (error) {
            console.error("Error al crear el organizador:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    const obtenerDatosPerfil = async () => {
        try {
            setLoading(true);
            const res = await PerfilAPI.obtenerPerfilAdmin();
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
            const res = await PerfilAPI.actualizarPerfilAdmin(formData);
            setMensajeConfirmacion(res.data.message);
            console.log("Perfil actualizado:", res.data);
            return res.data.perfilActualizado;
        } catch (error) {
            console.error("Error al actualizar los datos del perfil:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    const perfilUsuario = async (id_usuario) => {
        try {
            setLoading(true);
            const res = await AdminAPI.obtenerPerfilUsuario(id_usuario);
            console.log("Datos del perfil obtenidos:", res);
            return res.data.perfil;
        }
        catch (error) {
            console.error("Error al obtener los datos del perfil:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    const banearUsuario = async (id_usuario, nuevo_estado) => {
        try {
            const res = await AdminAPI.banearUsuario(id_usuario, nuevo_estado);
            setMensajeConfirmacion(res.data.message);
            return res.data;
        } catch (error) {
            console.error("Error al cambiar el estado del usuario:", error);
            setErrors(error.response?.data?.message);
            return null;
        }
    };

    const obtenerEventosPorUsuario = async (id_usuario) => {
        try {
            setLoading(true);
            const res = await AdminAPI.obtenerEventosPorUsuario(id_usuario);
            console.log("Eventos del usuario obtenidos:", res);
            return res.data.inscripciones;
        } catch (error) {
            console.error("Error al obtener los eventos del usuario:", error);
            setErrors(error.response?.data?.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const obtenerEventosOrganizador = async (id_usuario) => {
        try {
            setLoading(true);
            const res = await AdminAPI.obtenerEventosOrganizador(id_usuario);
            console.log("Eventos del organizador obtenidos:", res);
            return res.data.eventos;
        } catch (error) {
            console.error("Error al obtener los eventos del organizador:", error);
            setErrors(error.response?.data?.message);
            return null;
        } finally {
            setLoading(false);
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
            crearAdmin,
            crearOrganizador,
            setUsuarioCreado,
            usuarioCreado,
            usuarios,
            obtenerEventos,
            obtenerEventosPorUsuario,
            obtenerEventosOrganizador,

            eventos,
            banearUsuario,
            perfilUsuario,
            mensajeConfirmacion,
            obtenerDatosPerfil,
            perfil,
            actualizarDatosPerfil,
            verificarEvento,
            eliminarEvento,
            errors,
            loading,
        }}>
            {children}
        </AdminContext.Provider>
    )
}