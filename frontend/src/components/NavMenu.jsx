import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useState, useRef, useContext } from "react";
import { IconoMenu, IconoEscom } from "./assets/ElementosSvg.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from "../api/Context/AuthContext.jsx";

gsap.registerPlugin(SplitText);

export default function NavMenu() {
    const { usuario, cerrarSesion } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [botonInicio, setBotonInicio] = useState(true);
    const [botonEventos, setBotonEventos] = useState(false);
    const [botonCuenta, setBotonCuenta] = useState(false);

    const tl = useRef(),
        tl2 = useRef();
    library.add(fas, far, fab)

    const botonMenu = () => {
        const newMenuState = !menuOpen;
        
        if (menuOpen) {
            tl.current.reverse();
        }else {
            tl.current.play();
            tl2.current.reverse();
        }
        setMenuOpen(newMenuState);
        
        // Emitir evento personalizado para que otras páginas sepan del cambio
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
        setBotonCuenta(false);
        botonesNavAnimacion();
    }

    const manejarBotonEventos = () => {
        setBotonEventos(true);
        setBotonInicio(false);
        setBotonCuenta(false);
        botonesNavAnimacion();
    }

    const manejarBotonCuenta = () => {
        setBotonCuenta(true);
        setBotonInicio(false);
        setBotonEventos(false);
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
            <div className={`nav-container group fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${menuOpen ? '-translate-y-full md:translate-y-0 md:pointer-events-none' : ''}`}>
                <div className="absolute inset-x-0 top-0 h-20 lg:h-24 bg-gradient-to-br from-escom-sombra-700/40 via-escom-sombra-500/60 to-escom-sombra-400/70 border-b border-white/5 shadow-xl shadow-black/20 -translate-y-0 group-hover:translate-y-0 md:translate-y-0 lg:-translate-y-full transition-all duration-500 ease-out">
                    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 h-full flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-3 lg:gap-4 group/logo transform hover:scale-105 transition-all duration-300">
                            <div className="relative">
                                <IconoEscom className="h-10 sm:h-12 lg:h-14 w-auto text-white drop-shadow-lg group-hover/logo:text-escom-200 transition-all duration-300" />
                                <div className="absolute inset-0 bg-escom-200/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-medium text-lg sm:text-xl lg:text-2xl text-white drop-shadow-lg leading-none group-hover/logo:text-escom-200 transition-all duration-300">
                                    <span className="font-black tracking-tight">ESCOM</span><span className="font-light">unidad</span>
                                </span>
                                <span className="text-[10px] sm:text-xs text-white/70 font-light tracking-wider uppercase hidden sm:block">Comunidad ESCOM</span>
                            </div>
                        </Link>

                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                            <button
                                className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                                aria-label="Perfil de usuario"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-circle-user" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 transition-all duration-300" />
                            </button>

                            <button
                                className="relative p-2.5 sm:p-3 focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/15 active:bg-white/25 rounded-full group/btn backdrop-blur-sm border border-white/0 hover:border-white/10"
                                aria-label="Notificaciones"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-bell" className="text-xl sm:text-2xl text-white/90 group-hover/btn:text-escom-200 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                            
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
                    <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full h-auto md:h-2/16 py-6 md:py-14 px-4 md:pl-12 items-start md:items-center">
                        <button onClick={manejarBotonInicio}>
                            <span className={`text-sm md:text-xl font-semibold rounded-4xl px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonInicio ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                Inicio <FontAwesomeIcon icon="fa-regular fa-house" />
                            </span>
                        </button>
                        <button onClick={manejarBotonEventos}>
                            <span className={`text-sm md:text-xl font-semibold rounded-4xl px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonEventos ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                Eventos <FontAwesomeIcon icon="fa-regular fa-calendar" />
                            </span>
                        </button>
                        <button onClick={manejarBotonCuenta}>
                            <span className={`text-sm md:text-xl font-semibold rounded-4xl px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${botonCuenta ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' : 'text-white hover:text-escom-200'}`}>
                                Cuenta <FontAwesomeIcon icon="fa-regular fa-user" />
                            </span>
                        </button>
                        <button
                                onClick={botonMenu}
                                className="relative p-2 md:p-2.5 lg:px-4 lg:py-3 md:ml-20 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn backdrop-blur-smhover:border-white/30 hover:shadow-lg hover:shadow-escom-200/20"
                                aria-label="Cerrar menú"
                            >
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon="fa-solid fa-close" className="text-lg md:text-lg sm:text-2xl !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300" />
                                    <span className="hidden lg:block text-sm font-semibold !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300">Cerrar</span>
                                </div>
                            </button>

                    </div>
                    <div className="flex flex-col w-full h-auto md:h-2/3 px-4 md:p-15 gap-3 md:gap-6 justify-start md:justify-center overflow-y-auto">
                        {botonInicio && (
                            <>
                                <Link to="/#inicio" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Inicio</Link>
                                <Link to="/#section-horizontal" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Presentacion</Link>
                                <Link to="/#actividades" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Actividades</Link>
                                <Link to="/#contacto" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Contacto</Link>
                            </>
                        )}
                        {botonEventos && (
                            <>
                                <Link to="#calendario" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Calendario</Link>
                                <Link to="#eventos-proximos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Eventos Próximos</Link>
                                <Link to="#eventos-anteriores" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Eventos Anteriores</Link>
                                <Link to="#acerca-de" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Acerca de</Link>
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
                                        <Link to="panel-principal" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Panel</Link>
                                        <Link to="#perfil" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Perfil</Link>
                                        <Link to="#mis-eventos" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Mis Eventos</Link>
                                        <Link to="#ajustes" onClick={cerrarMenu} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200">Ajustes</Link>
                                        <a onClick={() => {
                                                cerrarMenu();
                                                cerrarSesion();
                                        }} className="boton-menu-op text-3xl md:text-6xl uppercase font-lexend font-semibold text-white hover:text-escom-200 cursor-pointer">Cerrar Sesión</a>
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