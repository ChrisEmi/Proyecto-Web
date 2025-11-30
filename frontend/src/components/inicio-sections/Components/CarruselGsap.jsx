import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


gsap.registerPlugin(Flip, Draggable);
export default function CarruselGsap({ evento }) {
    let ruedaRef = useRef(null),
        tarjetasRuedaRefs = useRef([]),
        encabezadoRef = useRef(null),
        tarjetaActual; 
    
    function setup() {
        if (!ruedaRef.current || !tarjetasRuedaRefs.current.length || !evento || evento.length === 0) return; 

        let radio = ruedaRef.current.offsetWidth / 2 ,
            centro = radio,
            angulo = 360 / evento.length, 
            DEG2RAD = Math.PI / 180;
        
        // Filtrar refs que no son null
        const refsValidos = tarjetasRuedaRefs.current.filter(ref => ref !== null);
        
        gsap.set(refsValidos, { 
            x: i => centro + radio * Math.sin(i * angulo * DEG2RAD),
            y: i => centro - radio * Math.cos(i * angulo * DEG2RAD),
            rotation: i => i * angulo,
            xPercent: -50,
            yPercent: -50
        })
    }
    
    useGSAP(() => {
        if (!evento || evento.length === 0) return;
        
        // Asegurarse de que todos los refs estén poblados
        setTimeout(() => {
            setup();
        }, 100);

        const animacionRotacion = gsap.to(ruedaRef.current, {
            rotation: -360,
            ease: "none",
            duration: evento.length * 6,
            repeat: -1
        });

        
    
        
        function cerrarTarjetaActual() {
            if (tarjetaActual) {

                let divContenido = encabezadoRef.current.querySelector('.card-content');
                if (!divContenido) return;
                
                // Ocultar botón X
                const botonCerrar = divContenido.querySelector('.card-close-btn');
                if (botonCerrar) {
                    gsap.to(botonCerrar, { opacity: 0, pointerEvents: 'none', duration: 0.2 });
                }
                
                let estado = Flip.getState(divContenido);
                tarjetaActual.appendChild(divContenido); // Devuelve el div
                Flip.from(estado, {
                    duration: 1.0,
                    ease: "power3.inOut",
                    scale: true,
                    absolute: true,
                    simple: true,
                    prune: false,
                    onComplete: () => {
                        animacionRotacion.resume();
                    }
                });
                tarjetaActual = null;
            }
        }

        function alClickearTarjeta(e) {
            let tarjeta = e.currentTarget,
                divContenido = tarjeta.querySelector('.card-content'); 
            
            if (tarjeta !== tarjetaActual) {
                cerrarTarjetaActual(); 
                tarjetaActual = tarjeta; 
                
                animacionRotacion.pause();
                
                let estado = Flip.getState(divContenido);
                encabezadoRef.current.appendChild(divContenido); // Mueve el div
                
                // Mostrar botón X cuando está abierta
                const botonCerrar = divContenido.querySelector('.card-close-btn');
                
                Flip.from(estado, {
                    duration: 1.0,
                    ease: "power3.inOut",
                    scale: true,
                    absolute: true,
                    simple: true,
                    prune: false,
                    onComplete: () => {
                        if (botonCerrar) {
                            gsap.to(botonCerrar, { opacity: 0.60, pointerEvents: 'auto', duration: 0.3 });
                        }
                    }
                });
                
            } else {
                cerrarTarjetaActual();
            }
        }

        tarjetasRuedaRefs.current.forEach(tarjeta => {
            tarjeta.addEventListener("click", alClickearTarjeta);
        });

        // Click en el header cierra la card
        const manejarClickEncabezado = (e) => {
            // Solo cerrar si se hace click en el fondo o en el botón X
            if (e.target === encabezadoRef.current || e.target.closest('.card-close-btn')) {
                cerrarTarjetaActual();
            }
        };
        
        encabezadoRef.current.addEventListener("click", manejarClickEncabezado);

        const manejarCambioMenu = (evento) => {
            if (evento.detail.isOpen) {
                animacionRotacion.pause();
            } else {
                if (!tarjetaActual) {
                    animacionRotacion.resume();
                }
            }
        };

        window.addEventListener('menuToggle', manejarCambioMenu);

        return () => {
            tarjetasRuedaRefs.current.forEach(tarjeta => {
                if (tarjeta) {
                    tarjeta.removeEventListener("click", alClickearTarjeta);
                }
            });
            if (encabezadoRef.current) {
                encabezadoRef.current.removeEventListener("click", manejarClickEncabezado);
            }
            window.removeEventListener('menuToggle', manejarCambioMenu);
        };
        
    }, { dependencies: [evento] });

    
    useEffect(() => {
        window.addEventListener("resize", setup);
        return () => {
            window.removeEventListener("resize", setup);
        };
    }, []); 


    return (
        <div className="w-[3200px] h-full flex justify-center items-center absolute">
            <div 
                className="header fixed w-[480px] h-[640px] sm:w-[520px] sm:h-[680px] lg:w-[560px] lg:h-[720px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex z-50 pointer-events-none cursor-pointer" 
                ref={encabezadoRef}
            >
            </div>

            <section className="slider-section h-[22vh] w-full">
                <div
                    className="wheel absolute left-1/2 -translate-x-1/2 -translate-y-1/8 w-[300vw] h-[300vw] max-w-[2000px] max-h-[2000px] top-full"
                    ref={ruedaRef} 
                >
                    {evento.map((item, index) => (
                        <div 
                                className="wheel-card absolute top-0 left-0 w-80 h-[450px] sm:w-[360px] sm:h-[480px] lg:w-[400px] lg:h-[450px] cursor-pointer" 
                                key={index}
                                ref={(el) => (tarjetasRuedaRefs.current[index] = el)}
                            >
                            
                            <div className="card-content group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
                                <img 
                                    src={item.imagenes && item.imagenes.length > 0 ? item.imagenes[0].src : '/placeholder.jpg'} 
                                    alt={item.titulo_evento || 'Evento'} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/95"></div>
                                <button 
                                    className="card-close-btn absolute top-4 left-4 bg-escom-sombra-400 hover:bg-escom-sombra-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 z-20 opacity-0 pointer-events-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        
                                    }}
                                >
                                    <FontAwesomeIcon icon={['fas', 'times']} className="text-lg" />
                                </button>

                                {item.fecha && (
                                    <div className="absolute top-4 right-4 rounded-xl shadow-lg px-3 bg-escom-300/30 py-2 text-center backdrop-blur-md">
                                        <div className="text-4xl bg-clip-text bg-gradient-to-b font-black text-transparent from-escom-100 to-escom-200 leading-none">
                                            {new Date(item.fecha).toLocaleDateString('es-MX', { day: '2-digit' })}
                                        </div>
                                        <div className="text-xl font-bold text-escom-100 uppercase">
                                            {new Date(item.fecha).toLocaleDateString('es-MX', { month: 'short' })}
                                        </div>
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                                    {item.nombre_categoria && (
                                        <span className="inline-block px-3 py-1 bg-escom-900/90 text-white text-xs font-bold uppercase tracking-wide rounded-full">
                                            {item.nombre_categoria}
                                        </span>
                                    )}
                                    <h1 className='text-xl sm:text-5xl bg-clip-text bg-gradient-to-b font-black text-transparent from-escom-100 to-escom-200 line-clamp-2'>
                                        {item.titulo_evento}
                                    </h1>
                                    <div className="flex flex-wrap gap-2">
                                        {item.fecha && (
                                            <span className="flex items-center gap-1 bg-escom-400/60 px-2 py-1 rounded-xl">
                                                <FontAwesomeIcon icon={['fas', 'clock']} className="text-escom-200 text-xs" />
                                                <span className="text-white/90 text-xs font-medium">
                                                    {new Date(item.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </span>
                                        )}
                                        {item.ubicacion && (
                                            <span className="flex items-center gap-1 bg-escom-200/60 px-2 py-1 rounded-xl">
                                                <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="text-escom-300 text-xs" />
                                                <span className="text-white/90 text-xs font-semibold truncate max-w-[120px]">{item.ubicacion}</span>
                                            </span>
                                        )}
                                        {item.cupo > 20 && (
                                            <span className="flex items-center gap-1 bg-escom-300/60 px-2 py-1 rounded-xl">
                                                <FontAwesomeIcon icon={['fas', 'users']} className="text-escom-400 text-xs" />
                                                <span className="text-white/90 text-xs font-semibold">{item.cupo}</span>
                                            </span>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>  
    )
}