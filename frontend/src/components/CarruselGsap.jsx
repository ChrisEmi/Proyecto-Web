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
                className="header fixed w-96 h-96 top-1/4 flex z-50 pointer-events-none cursor-pointer" 
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
                                className="wheel-card absolute top-0 left-0 w-78 h-92 cursor-pointer" 
                                key={index}
                                ref={(el) => (wheelCardsRefs.current[index] = el)}
                            >
                            
                            <div className="card-content group w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer will-change-transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                
                                <div className="relative w-full h-[55%] overflow-hidden">
                                    <img 
                                        src={item.imagen.src} 
                                        alt={item.imagen.alt} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay gradiente más suave */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    
                                    {/* Badge de fecha - diseño circular minimalista */}
                                    <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden w-16 h-20 flex flex-col">
                                        <div className="bg-escom-sombra-600 h-6 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                                                {item.fecha?.mes?.substring(0, 3) || 'MES'}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex items-center justify-center bg-white">
                                            <span className="text-escom-sombra-800 text-3xl font-black leading-none">
                                                {item.fecha?.dia?.split(' ')[0] || '00'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Título sobre la imagen - mejor posicionamiento */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 pb-5">
                                        <h1 className='text-white text-lg font-extrabold drop-shadow-2xl line-clamp-2 leading-snug'>
                                            {item.titulo}
                                        </h1>
                                    </div>
                                </div>
                                
                                {/* Contenido inferior - ajustado a 45% */}
                                <div className="flex flex-col h-[45%] p-4 bg-white">
                                    
                                    {/* Categoría y tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {item.tipo && (
                                            <span className="px-3 py-1 bg-escom-sombra-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
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
                                                        className={`px-2.5 py-1 text-[10px] font-semibold rounded-md ${estilos[i % estilos.length]}`}
                                                    >
                                                        {r}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-semibold rounded-md">
                                                {item.relacionado}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Descripción */}
                                    <p className='text-gray-600 text-xs line-clamp-3 mb-3 leading-relaxed flex-1'>
                                        {item.descripcion}
                                    </p>

                                    {/* Botón de acción - siempre visible pero cambia en hover */}
                                    <button className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold text-xs hover:bg-gradient-to-r hover:from-escom-sombra-500 hover:to-escom-sombra-700 hover:text-white transition-all duration-300 transform group-hover:scale-[1.02]">
                                        Ver detalles →
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