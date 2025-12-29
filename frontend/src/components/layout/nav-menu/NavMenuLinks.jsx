import { Link } from "react-router-dom";
import { RUTAS_HOME, RUTAS_AGENDA, RUTAS_PANEL, RUTAS_CUENTA } from "./navConfig.js";

const linkClasses = "boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200";

const NavMenuLinks = ({ tabActiva, usuario, cerrarMenu, onCerrarSesion }) => {
    const renderLinks = (rutas, esAnchor = false) => {
        return rutas.map((ruta, index) => {
            if (esAnchor) {
                return (
                    <a 
                        key={index} 
                        href={ruta.href} 
                        onClick={ruta.onClick} 
                        className={linkClasses}
                    >
                        {ruta.label}
                    </a>
                );
            }
            return (
                <Link 
                    key={index} 
                    to={ruta.to} 
                    onClick={ruta.onClick} 
                    className={linkClasses}
                >
                    {ruta.label}
                </Link>
            );
        });
    };

    const obtenerRutasPanel = () => {
        if (!usuario) return [];
        return RUTAS_PANEL[usuario.nombre_tipo]?.(cerrarMenu) || [];
    };

    const obtenerRutasCuenta = () => {
        if (!usuario) return RUTAS_CUENTA.sinSesion(cerrarMenu);
        return RUTAS_CUENTA[usuario.nombre_tipo]?.(cerrarMenu) || [];
    };

    return (
        <div className={`flex flex-col w-full px-4 md:p-15 gap-3 md:gap-10 md:justify-center ${tabActiva === 'cuenta' && !usuario ? 'mt-50' : 'mt-5'} overflow-y-auto`}>
            {tabActiva === 'inicio' && renderLinks(RUTAS_HOME(cerrarMenu), true)}
            
            {tabActiva === 'eventos' && renderLinks(RUTAS_AGENDA(cerrarMenu))}
            
            {tabActiva === 'panel' && usuario && renderLinks(obtenerRutasPanel())}
            
            {tabActiva === 'cuenta' && (
                <>
                    {renderLinks(obtenerRutasCuenta())}
                    {usuario && (
                        <a 
                            onClick={onCerrarSesion} 
                            className={`${linkClasses} cursor-pointer`}
                        >
                            Cerrar Sesión
                        </a>
                    )}
                </>
            )}
        </div>
    );
};

export default NavMenuLinks;
