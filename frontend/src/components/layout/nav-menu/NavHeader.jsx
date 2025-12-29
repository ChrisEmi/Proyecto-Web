import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconoEscom } from "../../assets/decoraciones/ElementosSvg.jsx";
import { RUTAS_INICIO_POR_ROL, RUTAS_PERFIL_POR_ROL } from "./navConfig.js";

const NavHeader = ({ usuario, onMenuClick }) => {
    const rutaInicio = usuario 
        ? RUTAS_INICIO_POR_ROL[usuario.nombre_tipo] || RUTAS_INICIO_POR_ROL.default 
        : RUTAS_INICIO_POR_ROL.default;

    const rutaPerfil = usuario 
        ? RUTAS_PERFIL_POR_ROL[usuario.nombre_tipo] 
        : '/login';

    return (
        <div className="absolute inset-x-0 top-0 h-20 lg:h-24 bg-gradient-to-br from-escom-sombra-700/40 via-escom-sombra-500/60 to-escom-sombra-400/70 border-b hidden lg:block border-white/5 shadow-xl shadow-black/20 -translate-y-0 group-hover:translate-y-0 md:translate-y-0 lg:-translate-y-full transition-all duration-500 ease-out">
            <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 h-full flex justify-between items-center">
                {/* Logo */}
                <Link 
                    to={rutaInicio}
                    className="flex items-center gap-3 lg:gap-4 group/logo transform hover:scale-105 transition-all duration-300"
                >
                    <div className="relative">
                        <IconoEscom className="h-10 sm:h-12 lg:h-14 w-auto text-white drop-shadow-lg group-hover/logo:text-escom-200 transition-all duration-300" />
                        <div className="absolute inset-0 bg-escom-200/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-medium text-lg sm:text-xl lg:text-2xl text-white drop-shadow-lg leading-none group-hover/logo:text-escom-200 transition-all duration-300">
                            <span className="font-black tracking-tight">ESCOM</span><span className="font-light">unidad</span>
                        </span>
                        <span className="text-[10px] sm:text-xs text-white/70 font-light tracking-wider uppercase hidden sm:block">
                            {usuario ? `Panel ${usuario.nombre_tipo}` : 'Comunidad ESCOM'}
                        </span>
                    </div>
                </Link>

                {/* Botones de acción */}
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                    {/* Perfil / Login */}
                    <Link
                        to={rutaPerfil}
                        className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                        aria-label={usuario ? "Perfil de usuario" : "Iniciar sesión"}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-circle-user" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 transition-all duration-300" />
                    </Link>

                    {/* Notificaciones */}
                    <button
                        className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                        aria-label="Notificaciones"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-bell" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                    </button>

                    <div className="hidden sm:block w-px h-8 bg-white/20"></div>

                    {/* Botón Menú */}
                    <button
                        onClick={onMenuClick}
                        className="relative p-2.5 sm:p-3 lg:px-6 lg:py-3 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn backdrop-blur-sm hover:border-white/30 hover:shadow-lg hover:shadow-escom-200/20"
                        aria-label="Abrir menú"
                    >
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon="fa-solid fa-bars" className="text-xl sm:text-2xl !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300" />
                            <span className="hidden lg:block text-sm font-semibold !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300">Menú</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavHeader;
