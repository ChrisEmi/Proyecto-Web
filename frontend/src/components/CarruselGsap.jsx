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
                
                let state = Flip.getState(contentDiv);
                currentCard.appendChild(contentDiv); // Devuelve el div
                Flip.from(state, {
                    duration: 0.8,
                    ease: "power2.inOut",
                    scale: true,
                    absolute: true,
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
                Flip.from(state, {
                    duration: 0.8,
                    ease: "power2.inOut",
                    scale: true,
                    absolute: true,
                    nested: true
                });
                
            } else {
                closeCurrentCard();
            }
        }

        wheelCardsRefs.current.forEach(card => {
            card.addEventListener("click", onCardClick);
        });

        headerRef.current.addEventListener("click", closeCurrentCard);

        return () => {
            wheelCardsRefs.current.forEach(card => {
                if (card) {
                    card.removeEventListener("click", onCardClick);
                }
            });
            if (headerRef.current) {
                headerRef.current.removeEventListener("click", closeCurrentCard);
            }
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
                className="header fixed w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem] top-1/4 sm:top-1/5 lg:top-1/4 flex z-50 pointer-events-none cursor-pointer" 
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
                                className="wheel-card absolute top-0 left-0 w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-78 lg:h-[28rem] cursor-pointer" 
                                key={index}
                                ref={(el) => (wheelCardsRefs.current[index] = el)}
                            >
                            
                            <div className="card-content group w-full h-full bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden cursor-pointer will-change-transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                
                                {/* Imagen */}
                                <div className="relative w-full h-[70%] sm:h-[72%] lg:h-[75%] overflow-hidden">
                                    <img 
                                        src={item.imagen.src} 
                                        alt={item.imagen.alt} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    
                                    {/* Badge de fecha */}
                                    {item.fecha && (
                                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px]">
                                            <div className="text-2xl sm:text-3xl font-black text-escom-sombra-700 leading-none">
                                                {item.fecha.dia}
                                            </div>
                                            <div className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase mt-0.5 sm:mt-1">
                                                {item.fecha.mes}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Título */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 pb-4 sm:pb-5">
                                        <h1 className='text-white text-lg sm:text-xl lg:text-2xl font-extrabold drop-shadow-4xl line-clamp-2 leading-snug'>
                                            {item.titulo}
                                        </h1>
                                    </div>
                                </div>
                                
                                {/* Tags y contenido */}
                                <div className="flex flex-col h-[30%] sm:h-[28%] lg:h-[25%] p-3 sm:p-4 bg-white justify-between">
                                    
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {item.tipo && (
                                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-escom-sombra-600 text-white text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-wider rounded-md">
                                                {item.tipo}
                                            </span>
                                        )}
                                        {item.relacionado && (Array.isArray(item.relacionado) ? (
                                            item.relacionado.slice(0, 2).map((r, i) => {
                                                const estilos = [
                                                    'bg-blue-50 text-blue-600 border border-blue-200',
                                                    'bg-purple-50 text-purple-600 border border-purple-200',
                                                ];
                                                return (
                                                    <span 
                                                        key={i} 
                                                        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] lg:text-xs font-semibold rounded-md ${estilos[i % estilos.length]}`}
                                                    >
                                                        {r}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-blue-50 text-blue-600 border border-blue-200 text-[9px] sm:text-[10px] lg:text-xs font-semibold rounded-md">
                                                {item.relacionado}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Botón Ver Evento */}
                                    <button 
                                        className="w-full bg-gradient-to-r from-escom-sombra-600 to-escom-sombra-800 text-white py-2 sm:py-2.5 lg:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:from-escom-sombra-700 hover:to-escom-sombra-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Ver evento:', item.id);
                                        }}
                                    >
                                        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                                            <span className="hidden sm:inline">Ver Evento Completo</span>
                                            <span className="sm:hidden">Ver Evento</span>
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>  
    )
}