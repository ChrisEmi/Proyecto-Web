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
            console.log(res);
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
        }, 5150);
        return () => clearTimeout(timer)
        }
    }, [errors]);

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