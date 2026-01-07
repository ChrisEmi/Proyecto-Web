import { IconoEscom } from "../assets/decoraciones/ElementosSvg";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useGSAP } from "@gsap/react";
import { useAuth } from "../../api/Context/AuthContext";
import gsap from "gsap";

const linksArreglo = [
        { to: "/organizador/inicio", icon: "home", label: "Inicio" },
        { to: "/organizador/perfil", icon: "user", label: "Perfil" },
        { to: "/organizador/eventos", icon: "calendar", label: "Mis Eventos" },
        { to: "/organizador/crear-evento", icon: "calendar-plus", label: "Crear Evento" },
        { to: "/organizador/ajustes", icon: "cog", label: "Ajustes" },
];
    
const SidebarOrganizador = () => {
    library.add(fas)
    const [esAbierto, setEsAbierto] = useState(false);
    const sidebarRef = useRef(null);
    const logoRef = useRef(null);
    const overlayRef = useRef(null);
    const { cerrarSesion } = useAuth();

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            if (esAbierto) {
                gsap.to(sidebarRef.current, {
                    x: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.3
                });
            } else {
                gsap.to(sidebarRef.current, {
                    x: "-200vw",
                    duration: 0.4,
                    ease: "power2.in"
                });
            }
        } else {
            gsap.to(sidebarRef.current, {
                width: esAbierto ? "21rem" : "5.25rem",
                duration: 0.4,
                ease: "power2.inOut"
            });
        }

        gsap.to(logoRef.current, {
            width: esAbierto ? "7.5rem" : "3.5rem",
            height: esAbierto ? "7.5rem" : "3.5rem",
            duration: 0.3,
            ease: "power2.inOut"
        });

        if (esAbierto) {
            gsap.fromTo(".titulo-sidebar", 
                { opacity: 0, x: -20 }, 
                { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
            );
            gsap.fromTo("#texto-cerrar-boton", 
                { opacity: 0, x: -10 }, 
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.3 }
            );
        }
    }, [esAbierto]);

    const sidebarOpens = () => {
        setEsAbierto(!esAbierto);
    }

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setEsAbierto(false);
        }
    }

    return (
        <>
           

            {esAbierto && (
                <div 
                    ref={overlayRef}
                    className="md:hidden fixed inset-0 bg-black/50 z-10 opacity-0"
                    onClick={sidebarOpens}
                />
            )}
            <div 
                ref={sidebarRef}
                className={`
                    fixed md:relative
                    mt-30 md:mt-0
                    h-[80vh] md:h-auto 
                    flex flex-col
                    
                    bg-white/20 text-white 
                    gap-10 
                    rounded-l-3xl md:rounded-l-3xl
                    shadow-xl
                    z-20
                    backdrop-blur-sm
                    ${esAbierto ? 'w-full md:w-84' : 'md:w-21'}
                    ${!esAbierto && '-translate-x-[200vw] md:translate-x-0'}
                `}
            >
                <button className="hidden md:block absolute top-1/2 -right-4 bg-escom-700 rounded-full py-2 px-2 cursor-pointer" onClick={sidebarOpens}>
                    <FontAwesomeIcon icon={['fas', esAbierto ? 'angle-left' : 'angle-right']} className="text-white"/>
                </button>
            <div className={`flex flex-col items-center border-b border-escom-100 px-10 ${esAbierto ? '' : 'p-3'}`}>
                <IconoEscom 
                    ref={logoRef}
                    className={`rounded-full ${esAbierto ? 'w-28 h-28 md:w-30 md:h-30' : 'bg-white text-escom-800 w-14 h-14 p-1.5 md:w-15 md:h-15'}`} 
                />
                {esAbierto && (
                    <h1 className="text-2xl md:text-2xl font-bold text-center text-white pb-5 titulo-sidebar">
                        Panel de Organizador
                    </h1>
                )}
            </div>
            <div className={`flex flex-col px-5 pr-8 space-y-6 text-lg font-semibold overflow-y-auto overflow-x-hidden ${esAbierto ? '' : 'items-center'}`}>
                {linksArreglo.map(({ to, icon, label }) => (
                    <NavLink 
                        key={label}
                        to={to}
                        onClick={handleLinkClick}
                        className={({ isActive }) => 
                            `flex rounded-full ${esAbierto ? 'px-6' : 'px-3'} py-3 hover:text-escom-200 ${isActive ? 'bg-white text-escom-700' : ''} ${esAbierto ? '' : 'justify-center'}`
                        }
                        title={!esAbierto ? label : ''}
                    >
                        <div className="flex items-center">
                            <div>
                                <FontAwesomeIcon icon={['fas', icon]} className={esAbierto ? "mr-2" : "px-1"} />
                            </div>
                            {esAbierto && <span>{label}</span>}
                        </div>
                    </NavLink>
                ))}
            </div>
            <button onClick={cerrarSesion} className={`cursor-pointer absolute bottom-4 text-left py-3 hover:text-escom-200 font-bold rounded-full ${esAbierto ? 'right-0 px-6' : 'left-1/2 -translate-x-1/2 px-3 md:block hidden'}`}>
                <FontAwesomeIcon icon={['fas', 'sign-out-alt']} className={esAbierto ? "mr-2" : ""} />
                {esAbierto && <span id="texto-cerrar-boton">Cerrar Sesión</span>}
            </button>
            </div>
        </>
    );
}
export default SidebarOrganizador;