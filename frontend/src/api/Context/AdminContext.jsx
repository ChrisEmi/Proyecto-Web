import { useEffect, createContext, useContext, useState } from "react";
import AdminAPI from "../Routes/Admin.js";

export const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin debe ser usado dentro de un AdminProvider");
    }
    return context;
}
export const AdminProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState()
    const [errors, setErrors] = useState()
    
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

    useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
        const timer = setTimeout(() => {
            setErrors(null);
        }, 5150);
        return () => clearTimeout(timer)
        }
    }, [errors]);

    return (
        <AdminContext.Provider value={{
            obtnerUsuarios,
            usuarios,
            errors,
        }}>
            {children}
        </AdminContext.Provider>
    )
}