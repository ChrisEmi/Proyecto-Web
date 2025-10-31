import { useEffect, createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import AuthAPI from "../Routes/Auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState()
    const [authSesion, setAuthSesion] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState()
    // const [perfil, setPerfil] = useState(null)

    const registrarUsuario = async (user) => {
        try {
            const res = await AuthAPI.registro(user);
            console.log(res.data);
            setUsuario(res.data.usuario);
            setAuthSesion(true);
        } catch (error) {
            console.error("Error en el registro:", error);
            setErrors(error.response?.data?.message);
            setAuthSesion(false);
        }
    };

    const iniciarSesion = async (user) => { 
        try { 
            const res = await AuthAPI.login(user);
            console.log("Usuario en setUsuario:", res.data.usuario);
            setUsuario(res.data.usuario);
            setAuthSesion(true);
        }
        catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setAuthSesion(false);
            setErrors(error.response?.data?.message);
        }
    }

    const cerrarSesion = async () => { 
        try { 
            const res = await AuthAPI.logout();
            console.log("Sesión cerrada correctamente", res.data);
            setUsuario(null);
            setAuthSesion(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    useEffect(() => {
        let isMounted = true;

        async function checkLogin() {
            try {
                const res = await AuthAPI.verificarTokenCookie();
                if (isMounted) {
                    if (res.data && res.data.usuario) {

                        
                        setAuthSesion(true);
                        setUsuario(res.data.usuario);
                    } else {
                        setAuthSesion(false);
                        setUsuario(null);
                    }
                }
            } catch (e) {
                if (isMounted) {
                    console.error("Error al verificar token:", e);
                    setAuthSesion(false);
                    setUsuario(null);
                }
            } finally {
            if (isMounted) {
                setLoading(false);
            }
            }
        }
        checkLogin();
        return () => {
            isMounted = false;
        };

        }, []);

    useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
        const timer = setTimeout(() => {
            setErrors(null);
        }, 4000);
        return () => clearTimeout(timer)
        }
    }, [errors]);

   /* const paginaPerfil = async () => {

        try {
            const res = await obtenerPerfil();
            console.log("Perfil obtenido:", res.data.usuario);
            setPerfil(res.data.usuario);
            setLoading(false);
        } catch (error) {
            if (error.response?.data?.errores) {
                setErrors(errorPorCampo(error.response.data.errores));
                console.log("Errores al obtener perfil:", error.response.data.errores);
            } else {
                setErrors({
                    general: ["Ocurrió un error inesperado. Por favor, inténtalo de nuevo."]
                });
            }
            setPerfil(null);
        }
    }

    const actualizarPerfilPagina = async (user) => {
        try {
            // Limpia campos vacíos o convierte a null para evitar problemas en el backend
            const datos = { ...user };
            Object.keys(datos).forEach(key => {
                if (datos[key] === "" || datos[key] === undefined) {
                    datos[key] = null;
                }
            });
            // Convierte a número los campos que deben serlo
            if (datos.edad) datos.edad = Number(datos.edad);
            if (datos.peso) datos.peso = Number(datos.peso);
            if (datos.estatura) datos.estatura = Number(datos.estatura);

            const res = await actualizarPerfil(datos);
            // Si el backend retorna el usuario actualizado, actualiza el estado
            if (res.data && res.data.usuario) {
                setPerfil(res.data.usuario);
            }
            setErrors([]);
            // Refresca el perfil desde el backend para asegurar datos actualizados
            await paginaPerfil();
            return null;
        } catch (error) {
            if (error.response?.data?.errores) {
                setErrors(errorPorCampo(error.response.data.errores));
                return error.response.data;
            } else {
                setErrors({
                    general: ["Ocurrió un error inesperado. Por favor, inténtalo de nuevo."]
                });
            }
        }
    }
     */

    return (
        <AuthContext.Provider value={{
            registrarUsuario,
            iniciarSesion,
            cerrarSesion,
            usuario,
            errors,
            loading,
            authSesion,
        }}>
            {children}
        </AuthContext.Provider>
    )
}