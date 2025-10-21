import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(Flip, Draggable);

export default function CarruselGsap({ evento = [] }) {
    let wheelRef = useRef(null),
        wheelCardsRefs = useRef([]),
        headerRef = useRef(null),
        currentCard; 
    
    // Tu función setup está perfecta
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
            rotation: "-=360",
            ease: "none",
            duration: wheelCardsRefs.current.length * 6,
            repeat: -1 
        });

        Draggable.create(wheelRef.current, {
            allowContextMenu: true,
            type: "rotation",
            trigger: wheelRef.current,
            inertia: true,
            snap: {
                rotation: gsap.utils.snap(360 / wheelCardsRefs.current.length) 
            },
            onDragStart: () => {
                rotationTween.pause();
            },
        });

    
        
        function closeCurrentCard() {
            if (currentCard) {

                let contentDiv = headerRef.current.querySelector('.card-content');
                if (!contentDiv) return; 
                
                let state = Flip.getState(contentDiv);
                currentCard.appendChild(contentDiv); // Devuelve el div
                Flip.from(state, {
                    scale: true,
                    ease: "power1.inOut",
                });
                currentCard = null;
                rotationTween.resume(); 
            }
        }

        function onCardClick(e) {
            let card = e.currentTarget,
                contentDiv = card.querySelector('.card-content'); 
            
            if (card !== currentCard) {
                closeCurrentCard(); 
                currentCard = card; 
                
                let state = Flip.getState(contentDiv);
                headerRef.current.appendChild(contentDiv); // Mueve el div
                Flip.from(state, {
                    duration: 0.6,
                    scale: true,
                    ease: "power1.inOut"
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
                className="header fixed top-1/16 text-2xl w-xl mx-auto z-50" 
                ref={headerRef}
            >
            </div>

            <section className="slider-section h-[2800px] w-[3200px]">
                <div
                    className="wheel absolute top-full left-1/2 -translate-x-1/2 -translate-y-7/16 h-full aspect-square"
                    ref={wheelRef} 
                >
                    {evento.map((item, index) => (
                        <div 
                                className="wheel-card absolute top-0 left-0 w-72 h-86 cursor-pointer" 
                                key={index}
                                ref={(el) => (wheelCardsRefs.current[index] = el)}
                            >
                            
                            <div className="card-content w-full h-full bg-gradient-to-b from-white to-gray-300 rounded-lg shadow-2xl border-2 border-gray-200 z-10 cursor-pointer will-change-transform overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300">
                                {/* Badge de fecha en la esquina superior */}
                                <div className="absolute top-3 right-3 z-20 bg-gradient-to-br from-escom-sombra-400 to-escom-sombra-700 text-white rounded-lg shadow-lg overflow-hidden w-16 h-16 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black leading-none">
                                        {item.fecha?.dia?.split(' ')[0] || '00'}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider mt-0.5">
                                        {item.fecha?.mes?.substring(0, 3) || item.fecha?.dia?.split(' ')[2]?.substring(0, 3)?.toUpperCase() || 'MES'}
                                    </span>
                                </div>
                                
                                {/* Imagen como fondo */}
                                <div className="relative w-full h-2/3 overflow-hidden">
                                    <img 
                                        src={item.imagen.src} 
                                        alt={item.imagen.alt} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    
                                    {/* Título sobre la imagen */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <h1 className='text-white text-2xl font-bold drop-shadow-lg line-clamp-2'>
                                            {item.titulo}
                                        </h1>
                                    </div>
                                </div>
                                
                                {/* Contenido inferior */}
                                <div className="flex flex-col justify-between p-3 h-1/3 bg-white">
                                    <div>
                                        <p className='text-gray-700 text-sm line-clamp-3'>
                                            {item.descripcion}
                                        </p>

                                        {/* Etiquetas: tipo de evento y relacionado */}
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {item.tipo && (
                                                <span className="px-2 py-1 bg-escom-sombra-200 text-white text-xs font-semibold rounded-full">
                                                    {item.tipo}
                                                </span>
                                            )}

                                            {/* 'relacionado' puede ser string o array con múltiples colores */}
                                            {item.relacionado && (Array.isArray(item.relacionado) ? (
                                                item.relacionado.slice(0, 3).map((r, i) => {
                                                    const colores = [
                                                        'bg-escom-sombra-400 text-white',
                                                        'bg-escom-800 text-white',
                                                        'bg-escom-sombra-100 text-white',
                                                    ];
                                                    return (
                                                        <span 
                                                            key={i} 
                                                            className={`px-2 py-1 text-xs rounded-full ${colores[i % colores.length]}`}
                                                        >
                                                            {r}
                                                        </span>
                                                    );
                                                })
                                            ) : (
                                                <span className="px-2 py-1 bg-escom-sombra-400 text-white text-xs rounded-full">
                                                    {item.relacionado}
                                                </span>
                                            ))}
                                        </div>
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