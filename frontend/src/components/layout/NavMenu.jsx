import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useState, useRef, useCallback } from "react";
import { IconoEscom } from "../assets/decoraciones/ElementosSvg.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from "../../api/Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import { NavHeader, NavUserInfo, NavTabs, NavMenuLinks } from "./nav-menu";

gsap.registerPlugin(SplitText);
library.add(fas, far, fab);

export default function NavMenu() {
    const { usuario, cerrarSesion } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [tabActiva, setTabActiva] = useState('inicio');

    const tl = useRef();
    const tl2 = useRef();

    // Animación de texto al cambiar de tab
    const animarTextoTab = useCallback(() => {
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
    }, []);

    // Toggle del menú principal
    const toggleMenu = useCallback(() => {
        const newMenuState = !menuOpen;
        
        if (menuOpen) {
            tl.current.reverse();
            gsap.to(".boton-menu-mobile", {
                autoAlpha: 1, 
                x: 0,
                duration: 0.3,
                ease: 'power1.inOut',
                overwrite: true
            });
        } else {
            tl.current.play();
            tl2.current.reverse();
        }
        
        setMenuOpen(newMenuState);
        window.dispatchEvent(new CustomEvent('menuToggle', { detail: { isOpen: newMenuState } }));
    }, [menuOpen]);

    // Cerrar menú
    const cerrarMenu = useCallback(() => {
        if (menuOpen) { 
            tl.current.reverse();
            setMenuOpen(false);
            window.dispatchEvent(new CustomEvent('menuToggle', { detail: { isOpen: false } }));
        }

        gsap.to(".boton-menu-mobile", {
            autoAlpha: 1, 
            x: 0,
            duration: 0.3,
            ease: 'power1.inOut',
            overwrite: true
        });
    }, [menuOpen]);

    // Botón menú mobile
    const onMenuMobileClick = useCallback(() => {
        gsap.to(".boton-menu-mobile", {
            autoAlpha: 0,
            x: -20,
            duration: 0.3,
            ease: 'power1.inOut'
        });
        toggleMenu();
    }, [toggleMenu]);

    // Cambiar tab activa
    const cambiarTab = useCallback((tab) => {
        setTabActiva(tab);
        animarTextoTab();
    }, [animarTextoTab]);

    // Cerrar sesión
    const handleCerrarSesion = useCallback(() => {
        cerrarMenu();
        cerrarSesion();
        navigate('/');
    }, [cerrarMenu, cerrarSesion, navigate]);

    // Configurar animaciones GSAP
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
            }, 0);

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
            }, 0);
    }, []);

    return (
        <>
            {/* Botón menú mobile */}
            <button 
                onClick={onMenuMobileClick} 
                className="boton-menu-mobile bg-escom-sombra-500/80 backdrop-blur-sm rounded-full fixed top-4 right-4 z-50 md:hidden block"
            >
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-white p-3"/>
            </button>

            {/* Container del nav */}
            <div className={`nav-container group relative md:fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${menuOpen ? '-translate-y-full md:pointer-events-none' : ''}`}>
                <NavHeader usuario={usuario} onMenuClick={toggleMenu} />
                <div className="h-0 lg:h-24 w-full"></div>
            </div>

            {/* Overlay y panel del menú */}
            <>
                {/* Background con logo */}
                <div 
                    onClick={cerrarMenu}
                    className={`fixed inset-0 bg-gradient-to-b from-escom-sombra-300/95 to-escom-sombra-800/95 z-40 opacity-0 w-0 lg:w-full ${menuOpen ? 'hidden lg:block' : 'pointer-events-none'}`}
                    id="bg-logo"
                >
                    <IconoEscom className="fixed inset-0 size-1/6 object-cover text-white left-1/6 top-3/8" />
                </div>

                {/* Panel del menú */}
                <div 
                    id="nav-menu"
                    className={`fixed top-0 right-0 w-full md:w-3/4 lg:w-1/2 h-full bg-gradient-to-br from-escom-sombra-600/90 to-escom-sombra-800/90 transform opacity-100 z-40 translate-x-full ${menuOpen ? '' : 'pointer-events-none'}`}
                >
                    <NavUserInfo usuario={usuario} />
                    
                    <NavTabs 
                        tabActiva={tabActiva} 
                        onTabChange={cambiarTab} 
                        usuario={usuario}
                        onCerrarMenu={toggleMenu}
                    />
                    
                    <NavMenuLinks 
                        tabActiva={tabActiva}
                        usuario={usuario}
                        cerrarMenu={cerrarMenu}
                        onCerrarSesion={handleCerrarSesion}
                    />
                </div>
            </>
        </>
    );
}