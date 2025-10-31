import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';


gsap.registerPlugin(Flip, Draggable);
export default function CarruselGsap({ evento }) {
    let wheelRef = useRef(null),
        wheelCardsRefs = useRef([]),
        headerRef = useRef(null),
        currentCard; 
    
    function setup() {
        if (!wheelRef.current || !wheelCardsRefs.current.length) return; 

        let radio = wheelRef.current.offsetWidth / 2 ,
            centro = radio,
            slice = 360 / wheelCardsRefs.current.length, 
            DEG2RAD = Math.PI / 180;
        
        gsap.set(wheelCardsRefs.current, { 
            x: i => centro + radio * Math.sin(i * slice * DEG2RAD),
            y: i => centro - radio * Math.cos(i * slice * DEG2RAD),
            rotation: i => i * slice,
            xPercent: -50,
            yPercent: -50
        })
    }
    
    useGSAP(() => {
        setup();

        const rotationTween = gsap.to(wheelRef.current, {
            rotation: -360,
            ease: "none",
            duration: wheelCardsRefs.current.length * 6,
            repeat: -1
        });

        
    
        
        function closeCurrentCard() {
            if (currentCard) {

                let contentDiv = headerRef.current.querySelector('.card-content');
                if (!contentDiv) return;
                
                // Ocultar botón X
                const closeBtn = contentDiv.querySelector('.card-close-btn');
                if (closeBtn) {
                    gsap.to(closeBtn, { opacity: 0, pointerEvents: 'none', duration: 0.2 });
                }
                
                let state = Flip.getState(contentDiv);
                currentCard.appendChild(contentDiv); // Devuelve el div
                Flip.from(state, {
                    duration: 1.0,
                    ease: "power3.inOut",
                    scale: true,
                    absolute: true,
                    simple: true,
                    prune: false,
                    onComplete: () => {
                        rotationTween.resume();
                    }
                });
                currentCard = null;
            }
        }

        function onCardClick(e) {
            let card = e.currentTarget,
                contentDiv = card.querySelector('.card-content'); 
            
            if (card !== currentCard) {
                closeCurrentCard(); 
                currentCard = card; 
                
                rotationTween.pause();
                
                let state = Flip.getState(contentDiv);
                headerRef.current.appendChild(contentDiv); // Mueve el div
                
                // Mostrar botón X cuando está abierta
                const closeBtn = contentDiv.querySelector('.card-close-btn');
                
                Flip.from(state, {
                    duration: 1.0,
                    ease: "power3.inOut",
                    scale: true,
                    absolute: true,
                    simple: true,
                    prune: false,
                    onComplete: () => {
                        if (closeBtn) {
                            gsap.to(closeBtn, { opacity: 0.60, pointerEvents: 'auto', duration: 0.3 });
                        }
                    }
                });
                
            } else {
                closeCurrentCard();
            }
        }

        wheelCardsRefs.current.forEach(card => {
            card.addEventListener("click", onCardClick);
        });

        // Click en el header cierra la card
        const handleHeaderClick = (e) => {
            // Solo cerrar si se hace click en el fondo o en el botón X
            if (e.target === headerRef.current || e.target.closest('.card-close-btn')) {
                closeCurrentCard();
            }
        };
        
        headerRef.current.addEventListener("click", handleHeaderClick);

        const handleMenuToggle = (event) => {
            if (event.detail.isOpen) {
                rotationTween.pause();
            } else {
                if (!currentCard) {
                    rotationTween.resume();
                }
            }
        };

        window.addEventListener('menuToggle', handleMenuToggle);

        return () => {
            wheelCardsRefs.current.forEach(card => {
                if (card) {
                    card.removeEventListener("click", onCardClick);
                }
            });
            if (headerRef.current) {
                headerRef.current.removeEventListener("click", handleHeaderClick);
            }
            window.removeEventListener('menuToggle', handleMenuToggle);
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
                ref={headerRef}
            >
            </div>

            <section className="slider-section h-[22vh] w-full">
                <div
                    className="wheel absolute left-1/2 -translate-x-1/2 -translate-y-1/8 w-[300vw] h-[300vw] max-w-[2000px] max-h-[2000px] top-full"
                    ref={wheelRef} 
                >
                    {evento.map((item, index) => (
                        <div 
                                className="wheel-card absolute top-0 left-0 w-80 h-[450px] sm:w-[360px] sm:h-[480px] lg:w-[400px] lg:h-[450px] cursor-pointer" 
                                key={index}
                                ref={(el) => (wheelCardsRefs.current[index] = el)}
                            >
                            
                            <div className="card-content font-lexend group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-2xl">
                                
                                {/* Imagen de fondo */}
                                <img 
                                    src={item.imagen.src} 
                                    alt={item.imagen.alt} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                
                                {/* Gradiente simple */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/95"></div>
                                <button 
                                    className="card-close-btn absolute top-4 left-4 bg-escom-sombra-400 hover:bg-escom-sombra-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 z-20 opacity-0 pointer-events-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {item.fecha && (
                                    <div className="absolute top-4 right-4 rounded-xl shadow-lg px-3 bg-escom-300/30 py-2 text-center backdrop-blur-md">
                                        <div className="text-4xl bg-clip-text bg-gradient-to-b font-black text-transparent from-escom-100 to-escom-200 leading-none">
                                            {item.fecha.dia}
                                        </div>
                                        <div className="text-xl font-bold text-escom-100 uppercase">
                                            {item.fecha.mes}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Contenido inferior */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                                    
                                    {/* Tipo de evento */}
                                    {item.tipo && (
                                        <span className="inline-block px-3 py-1 bg-escom-400/90 text-escom-sombra-900 text-xs font-bold uppercase tracking-wide rounded-lg">
                                            {item.tipo}
                                        </span>
                                    )}

                                    {/* Título */}
                                    <h1 className='text-xl sm:text-3xl bg-clip-text bg-gradient-to-b font-black text-transparent from-escom-100 to-escom-200'>
                                        {item.titulo}
                                    </h1>

                                    {/* Info del evento: Horario, Ubicación, Cupo - Compacto */}
                                    <div className="flex flex-wrap gap-2">
                                        {/* Horario */}
                                        {item.horario && (
                                            <span className="flex items-center gap-1 bg-escom-400/60 px-2 py-1 rounded-xl">
                                                <svg className="w-3 h-3 text-escom-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-white/90 text-xs font-medium">{item.horario}</span>
                                            </span>
                                        )}

                                        {/* Ubicación */}
                                        {item.ubicacion && (
                                            <span className="flex items-center gap-1 bg-escom-200/60 px-2 py-1 rounded-xl">
                                                <svg className="w-3 h-3 text-escom-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-white/90 text-xs font-semibold truncate max-w-[120px]">{item.ubicacion}</span>
                                            </span>
                                        )}

                                        {/* Cupo */}
                                        {item.cupo && (
                                            <span className="flex items-center gap-1 bg-escom-300/60 px-2 py-1 rounded-xl">
                                                <svg className="w-3 h-3 text-escom-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
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