import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import { IconoMenu, IconoEscom } from "./assets/ElementosSvg.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


export default function NavMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [botonInicio, setBotonInicio] = useState(true);
    const [botonEventos, setBotonEventos] = useState(false);
    const [botonCuenta, setBotonCuenta] = useState(false);

    const tl = useRef(),
        tl2 = useRef();
    library.add(fas, far, fab)

    const botonMenu = () => {
        if (menuOpen) {
            tl.current.reverse();
        }else {
            tl.current.play();
            tl2.current.reverse();
        }
        setMenuOpen(!menuOpen);
    }
  
    const cerrarMenu = () => {
        if (menuOpen) { 
        tl.current.reverse();
        setMenuOpen(false);
        }
    }

    const manejarBotonInicio = () => {
        setBotonInicio(!botonInicio);
        setBotonEventos(false);
        setBotonCuenta(false);
    }

    const manejarBotonEventos = () => {
        setBotonEventos(!botonEventos);
        setBotonInicio(false);
        setBotonCuenta(false);
    }

    const manejarBotonCuenta = () => {
        setBotonCuenta(!botonCuenta);
        setBotonInicio(false);
        setBotonEventos(false);
    }

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })
            .to("#bg-logo", {
                autoAlpha: 1,
                duration: 0.5,
                backdropFilter: 'blur(34px)',
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
            <div className={`nav-container group fixed top-0 left-0 right-0 z-50 ${menuOpen ? 'pointer-events-none' : ''}`}>
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-escom-sombra-300/0 via-escom-sombra-400/50 to-escom-sombra-500/75 backdrop-blur-lg border-b border-white/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                        <Link to="/" className="flex items-center">
                            <IconoEscom className="h-12 sm:h-14 lg:h-16 w-auto text-white/90 hover:text-white transition-all" />
                        </Link>
                        <div className="flex items-center gap-5">
                        <button
                            className="p-3 focus:outline-none transition-all cursor-pointer hover:bg-white/10 rounded-full"
                            aria-label="Abrir menú"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-circle-user" className="text-3xl text-white/90 hover:text-white transition-all" />
                        </button>
                        <button
                            className="p-3 focus:outline-none transition-all cursor-pointer hover:bg-white/10 rounded-full"
                            aria-label="Abrir menú"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-bell" className="text-3xl text-white/90 hover:text-white transition-all" />
                        </button>
                        <button
                            onClick={botonMenu}
                            className="p-3 focus:outline-none transition-all cursor-pointer hover:bg-white/10 rounded-full"
                            aria-label="Abrir menú"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-bars" className="text-3xl text-white/90 hover:text-white transition-all" />
                        </button>
                
                        </div>
                    </div>
                </div>
                <div className="h-10 w-full"></div>
            </div>
            <>

                <div 
                    onClick={cerrarMenu}
                    className={`
                    fixed inset-0 bg-gradient-to-b from-escom-sombra-300/95 to-escom-sombra-800/95 z-40
                    opacity-0 ${menuOpen ? '' : 'pointer-events-none'}
                    `}
                    id="bg-logo"
                    >
                        <IconoEscom className="fixed inset-0 size-1/6 object-cover text-white left-1/6 top-3/8 " />
                        
                </div>
                <div 
                    id="nav-menu"
                    style={{ backdropFilter: 'blur(0px)' }}
                    className={`
                    fixed top-0 right-0 w-1/2 h-full bg-gradient-to-br from-escom-sombra-600/50 to-escom-sombra-800
                    transform opacity-100 z-40
                    translate-x-full ${menuOpen ? '' : 'pointer-events-none'}
                    `}
                >
                    <div className="flex flex-row gap-12 w-full h-2/16 py-14 pl-12 items-center">
                        <button onClick={manejarBotonInicio}>
                            <span className={`text-xl font-semibold rounded-4xl px-10 py-4 transition-all cursor-pointer ${botonInicio ? 'bg-white !text-escom-sombra-500 cursor-default' : 'text-white hover:text-escom-200'}`}>Inicio    <FontAwesomeIcon icon="fa-regular fa-house" /></span>
                        </button>
                        <button onClick={manejarBotonEventos}>
                            <span className={`text-xl font-semibold rounded-4xl px-10 py-4 transition-all cursor-pointer ${botonEventos ? 'bg-white !text-escom-sombra-500 cursor-default' : 'text-white hover:text-escom-200'}`}>Eventos    <FontAwesomeIcon icon="fa-regular fa-calendar" /></span>
                        </button>
                        <button onClick={manejarBotonCuenta}>
                            <span className={`text-xl font-semibold rounded-4xl px-10 py-4 transition-all cursor-pointer ${botonCuenta ? 'bg-white !text-escom-sombra-500 cursor-default' : 'text-white hover:text-escom-200'}`}>Cuenta    <FontAwesomeIcon icon="fa-regular fa-user" /></span>
                        </button>
                        <button onClick={cerrarMenu}>
                           <span className="text-white text-2xl font-extrabold rounded-full ml-30 px-3 py-3 transition-all bg-white/10 cursor-pointer hover:text-escom-200 hover:scale-200">  <FontAwesomeIcon icon="fa-solid fa-xmark" /></span>
                        </button>
                        
                        
                    </div>
                </div>
            </>
        
                
        </>
    );
}