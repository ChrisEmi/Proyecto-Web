import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useState, useRef } from "react";
import { IconoMenu, IconoEscom } from "../assets/ElementosSvg.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from "../../api/Context/AuthContext.jsx";

gsap.registerPlugin(SplitText);

export default function NavMenu() {
    const { usuario, cerrarSesion } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [botonInicio, setBotonInicio] = useState(true);
    const [botonEventos, setBotonEventos] = useState(false);
    const [botonPanel, setBotonPanel] = useState(false);
    const [botonCuenta, setBotonCuenta] = useState(false);

    const tl = useRef(),
        tl2 = useRef();
    library.add(fas, far, fab);

    const botonMenu = () => {
        const newMenuState = !menuOpen;
        
        if (menuOpen) {
            tl.current.reverse();
        }else {
            tl.current.play();
            tl2.current.reverse();
        }
        setMenuOpen(newMenuState);
        window.dispatchEvent(new CustomEvent('menuToggle', { 
            detail: { isOpen: newMenuState } 
        }));
    }
  
    const cerrarMenu = () => {
        if (menuOpen) { 
        tl.current.reverse();
        setMenuOpen(false);
        
        // Emitir evento de menú cerrado
        window.dispatchEvent(new CustomEvent('menuToggle', { 
            detail: { isOpen: false } 
        }));
        }
    }

    const botonesNavAnimacion = () => {
        requestAnimationFrame(() => {
            const elementos = document.querySelectorAll('.boton-menu-op');
            if (elementos.length > 0) {
                const splitText = new SplitText(elementos, { type: "lines" });
                gsap.from(splitText.lines, {
                    y: 50,
                    filter: 'blur(5px)',
                    autoAlpha: 0,
                    duration: 0.3,
                    stagger: 0.15,
                    ease: "power1.Out"
                });
            }
        });
    }

    const manejarBotonInicio = () => {
        setBotonInicio(true);
        setBotonEventos(false);
        setBotonPanel(false);
        setBotonCuenta(false);
        botonesNavAnimacion();
    }

    const manejarBotonEventos = () => {
        setBotonEventos(true);
        setBotonInicio(false);
        setBotonPanel(false);
        setBotonCuenta(false);
        botonesNavAnimacion();
    }

    const manejarBotonPanel = () => {
        setBotonPanel(true);
        setBotonInicio(false);
        setBotonEventos(false);
        setBotonCuenta(false);
        botonesNavAnimacion();
    }

    const manejarBotonCuenta = () => {
        setBotonCuenta(true);
        setBotonInicio(false);
        setBotonEventos(false);
        setBotonPanel(false);
        botonesNavAnimacion();
    }

    useGSAP(() => {

        tl.current = gsap.timeline({ paused: true })
            .to("#bg-logo", {
                autoAlpha: 1,
                duration: 0.5,
                
                ease: 'power1.inOut'
            }, 0)
            .to("#nav-menu", {
                x: "0%",
                duration: 0.5,
                ease: 'power1.inOut'
            }, 0)
            .to("#logo-nav", {
                opacity: 0,
                duration: 0.5,
                ease: 'power1.inOut'
            }, 0)
            ;
        tl2.current = gsap.timeline({ paused: true })
            .to(".nav-bg", {
                y: "0%",
                duration: 0.5,
                ease: 'power1.inOut'
            }, 0)
            .to(".nav-abajo", {
                y: "-50%",
                autoAlpha: 0,
                duration: 0.3,
                ease: 'power1.inOut'
            }, 0)
        ;
        
        
        
    }, []);

    return (
        <>
            <div className={`nav-container group relative md:fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${menuOpen ? '-translate-y-full md:translate-y-0 md:pointer-events-none' : ''}`}>
                <div className="absolute inset-x-0 top-0 h-20 lg:h-24 bg-gradient-to-br from-escom-sombra-700/40 via-escom-sombra-500/60 to-escom-sombra-400/70 border-b border-white/5 shadow-xl shadow-black/20 -translate-y-0 group-hover:translate-y-0 md:translate-y-0 lg:-translate-y-full transition-all duration-500 ease-out">
                    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 h-full flex justify-between items-center">
                        <Link 
                            to={
                                usuario && usuario.nombre_tipo === 'Administrador' ? '/control/admin/inicio' :
                                usuario && usuario.nombre_tipo === 'Organizador' ? '/organizador' :
                                usuario && usuario.nombre_tipo === 'Estudiante' ? '/alumno' :
                                '/'
                            }
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

                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                            {usuario ? (
                                <Link
                                    to={
                                        usuario.nombre_tipo === 'Administrador' ? '/control/admin/perfil' :
                                        usuario.nombre_tipo === 'Organizador' ? '/organizador/perfil' :
                                        '/alumno/perfil'
                                    }
                                    className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                                    aria-label="Perfil de usuario"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-circle-user" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 transition-all duration-300" />
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                                    aria-label="Iniciar sesión"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-circle-user" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 transition-all duration-300" />
                                </Link>
                            )}

                            <button
                                className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                                aria-label="Notificaciones"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-bell" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                                {usuario && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                                    </span>
                                )}
                            </button>

                            <div className="hidden sm:block w-px h-8 bg-white/20"></div>

                            <button
                                onClick={botonMenu}
                                className="relative p-2.5 sm:p-3 lg:px-6 lg:py-3 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn backdrop-blur-smhover:border-white/30 hover:shadow-lg hover:shadow-escom-200/20"
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
                <div className="h-20 lg:h-24 w-full"></div>
            </div>
            <>

                <div 
                    onClick={cerrarMenu}
                    className={`
                    fixed inset-0 bg-gradient-to-b from-escom-sombra-300/95 to-escom-sombra-800/95 z-40
                    opacity-0 w-0 lg:w-full ${menuOpen ? '' : 'pointer-events-none'}
                    `}
                    id="bg-logo"
                    >
                        <IconoEscom className="fixed inset-0 size-1/6 object-cover text-white left-1/6 top-3/8 " />
                        
                </div>
                <div 
                    id="nav-menu"
                    style={{ backdropFilter: 'blur(0px)' }}
                    className={`
                    fixed top-0 right-0 w-full md:w-3/4 lg:w-1/2 h-full bg-gradient-to-br from-escom-sombra-600/50 to-escom-sombra-800
                    transform opacity-100 z-40
                    translate-x-full ${menuOpen ? '' : 'pointer-events-none'}
                    `}
                >
                    {usuario && (
                        <div className="w-full flex justify-end px-12 md:pl-12 pt-6 md:pt-8 pb-4 border-b border-white/10">
                            <div className="flex items-center pr-4">
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-lg md:text-xl text-right">
                                        {usuario.nombre?.split(' ')[0]} {usuario.apellido_paterno}
                                    </span>
                                    <span className={`text-sm md:text-base font-medium text-right ${
                                        usuario.nombre_tipo === 'Administrador' ? 'text-blue-400' :
                                        usuario.nombre_tipo === 'Organizador' ? 'text-yellow-400' :
                                        'text-purple-400'
                                    }`}>
                                        <FontAwesomeIcon icon={
                                            usuario.nombre_tipo === 'Administrador' ? 'fa-solid fa-user-shield' :
                                            usuario.nombre_tipo === 'Organizador' ? 'fa-solid fa-user-tie' :
                                            'fa-solid fa-user-graduate'
                                        } className="mr-2" />
                                        {usuario.nombre_tipo}
                                    </span>
                                </div>
                            </div>
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full  flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg ${usuario.nombre_tipo === 'Administrador' ? 'bg-blue-300/80' :
                                        usuario.nombre_tipo === 'Organizador' ? 'bg-yellow-300/80' :
                                'bg-purple-300/80'
                            }`}>
                                    {usuario.nombre?.charAt(0).toUpperCase()}{usuario.nombre?.charAt(1).toUpperCase()} 
                            </div>
                        </div>
                    )}

                    <div className="relative w-full py-6 md:py-10">
                        <button
                            onClick={botonMenu}
                            className="absolute right-4 top-4 md:hidden p-2.5 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn hover:shadow-lg"
                            aria-label="Cerrar menú"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-close" className="text-xl !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300" />
                        </button>
                        <div className="flex flex-wrap gap-3 md:gap-2 w-full px-4 md:px-12 items-center justify-start">
                            <button onClick={manejarBotonInicio}>
                                <span className={`text-sm md:text-lg font-semibold rounded-full px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonInicio ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                    <FontAwesomeIcon icon="fa-regular fa-house" className="mr-2" />
                                    Inicio
                                </span>
                            </button>
                            <button onClick={manejarBotonEventos}>
                                <span className={`text-sm md:text-lg font-semibold rounded-full px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonEventos ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                    <FontAwesomeIcon icon="fa-regular fa-calendar" className="mr-2" />
                                    Eventos
                                </span>
                            </button>
                            {usuario && (
                                <button onClick={manejarBotonPanel}>
                                    <span className={`text-sm md:text-lg font-semibold rounded-full px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonPanel ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                        <FontAwesomeIcon icon="fa-solid fa-dashboard" className="mr-2" />
                                        Panel
                                    </span>
                                </button>
                            )}
                            <button onClick={manejarBotonCuenta}>
                                <span className={`text-sm md:text-lg font-semibold rounded-full px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonCuenta ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                    <FontAwesomeIcon icon="fa-regular fa-user" className="mr-2" />
                                    Cuenta
                                </span>
                            </button>

                            <button
                                onClick={botonMenu}
                                className="hidden md:flex ml-auto p-2.5 lg:px-4 lg:py-3 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn hover:shadow-lg items-center gap-2"
                                aria-label="Cerrar menú"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-close" className="text-lg !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300" />
                                <span className="hidden lg:block text-sm font-semibold !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300">Cerrar</span>
                            </button>
                        </div>
                    </div>
                    <div className={`flex flex-col w-full px-4 md:p-15 gap-3 md:gap-10  md:justify-center ${botonCuenta && !usuario ? 'mt-50' : 'mt-5'} overflow-y-auto`}>
                        {botonInicio && (
                            <>
                                <a href="/#inicio" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Inicio</a>
                                <a href="/#section-horizontal" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Presentacion</a>
                                <a href="/#actividades" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Actividades</a>
                                <a href="/#contacto" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Contacto</a>
                            </>
                        )}
                        {botonEventos && (
                            <>
                                <a href="#calendario" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Calendario</a>
                                <a href="#eventos-proximos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Eventos Próximos</a>
                                <a href="#eventos-anteriores" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Eventos Anteriores</a>
                                <a href="#acerca-de" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Acerca de</a>
                            </>
                        )}
                        {botonPanel && usuario && (
                            <>
                                {usuario.nombre_tipo === 'Administrador' && (
                                    <>
                                        <Link to="/control/admin/usuarios" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Usuarios</Link>
                                        <Link to="/control/admin/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Eventos</Link>
                                        <Link to="/control/admin/ajustes" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Actividades</Link>
                                        <Link to="/control/admin/ajustes" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Personalizacion</Link>
                                        <Link to="/control/admin/crear-usuario" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Crear Usuario</Link>
                                    </>
                                )}
                                
                                {usuario.nombre_tipo === 'Organizador' && (
                                    <>
                                        <Link to="/organizador/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Calendario</Link>
                                        <Link to="/organizador/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Mis Eventos</Link>
                                        <Link to="/organizador/inscritos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Inscritos</Link>
                                        <Link to="/organizador/crear-evento" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Crear Evento</Link>
                                    </>
                                )}
                                
                                {usuario.nombre_tipo === 'Estudiante' && (
                                    <>
                                        <Link to="/alumno/calendario" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Calendario</Link>
                                        <Link to="/alumno/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Eventos</Link>
                                        <Link to="/alumno/actividades" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Actividades</Link>
                                        <Link to="/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Explorar Eventos</Link>
                                    </>
                                )}
                            </>
                        )}
                        {botonCuenta && (
                            <>
                                {!usuario ? (
                                    <>
                                        <Link to="/login" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Iniciar Sesión</Link>
                                        <Link to="/registro" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Registrarse</Link>
                                    </>
                                ) : (
                                    <>
                                        {usuario.nombre_tipo === 'Administrador' && (
                                            <>
                                                <Link to="/control/admin/inicio" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Inicio</Link>
                                                <Link to="/control/admin/perfil" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Perfil</Link>
                                                <Link to="/control/admin/ajustes" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Ajustes</Link>
                                            </>
                                        )}
                                        
                                        {usuario.nombre_tipo === 'Organizador' && (
                                            <>
                                                <Link to="/organizador" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Panel</Link>
                                                <Link to="/organizador/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Notificaciones</Link>
                                                <Link to="/organizador/eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Perfil</Link>
                                                <Link to="/organizador/perfil" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Ajustes</Link>
                                            </>
                                        )}
                                        
                                        {usuario.nombre_tipo === 'Estudiante' && (
                                            <>
                                                <Link to="/alumno" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Panel</Link>
                                                <Link to="/alumno/ajustes" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Ajustes</Link>
                                                <Link to="/alumno/perfil" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Perfil</Link>
                                            </>
                                        )}
                                        <a onClick={() => {
                                                cerrarMenu();
                                                cerrarSesion();
                                        }} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white cursor-pointer hover:text-escom-200">Cerrar Sesión</a>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    

                </div>
            </>
        
                
        </>
    );
}