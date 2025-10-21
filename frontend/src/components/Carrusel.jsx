import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default function Carrusel({ slides, className }) {
    const [modalData, setModalData] = useState(null); // null o { src, index }
    const imageRefs = useRef([]); // Un array para las imágenes del carrusel
    const modalImageRef = useRef(null); // Una ref para la imagen GRANDE del modal
    const modalBgRef = useRef(null); // Una ref para el FONDO del modal

    const openModal = (image, index) => {
        const clickedImg = imageRefs.current[index];
        if (!clickedImg) return;

        const state = Flip.getState(clickedImg);
    
        setModalData({ src: image.src, index: index, state: state, caption: image.caption });
    };

    const closeModal = () => {
        if (!modalData || !modalImageRef.current) return;

        // Obtiene el elemento DOM de la imagen PEQUEÑA a la que volveremos
        const targetImg = imageRefs.current[modalData.index];
        if (!targetImg) {
            setModalData(null); // Salida segura si la ref no existe
            return;
        }

        // Anima la imagen GRANDE para que "vuelva" a la posición de la PEQUEÑA
        Flip.to(modalData.state, {
            targets: modalImageRef.current,
            duration: 0.7,
            ease: 'power4.inOut',
            // Cuando la animación termine, oculta el modal
            onComplete: () => {
                setModalData(null);
            }
        });

        // Anima la opacidad del fondo
        gsap.to(modalBgRef.current, { 
            opacity: 0, 
            duration: 1
        });
    };
    useEffect(() => {
        if (modalData && modalImageRef.current && modalBgRef.current) {
            
            Flip.from(modalData.state, {
                targets: modalImageRef.current,
                duration: 3,
                ease: 'power1.inOut',
            });

            // Anima la opacidad del fondo
            gsap.to(modalBgRef.current, { 
                opacity: 1, 
                duration: 0.2
            });
        }
    }, [modalData]);

    return (
        <div className={`carrusel relative ${className}`}>
            
            <style jsx global>{`
                .modal-bg {
                    opacity: 0; /* Inicia transparente para GSAP */
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(5px);
                }

                img {
                    border-radius: 12px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .carrusel {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .swiper {
                    width: 100%;
                    padding: 50px 0;
                }
                .swiper-slide {
                    position: relative;
                    width: 60%;
                    height: 250px;
                    border-radius: 12px;
                    overflow: hidden;
                    user-select: none;
                    transition: width 1s ease;
                }
                .swiper-slide-active {
                    transform: translateY(20px);
                    width: 600px;
                }
                .swiper-slide::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    background: rgba(0, 0, 0, 1);
                    filter: blur(100px);
                    mix-blend-mode: multiply;
                    z-index: 1;
                    transition: background 1s ease;
                }
                .swiper-slide-active::after {
                    background: rgba(0, 0, 0, 0);
                }
                .swiper-slide img {
                    width: 100%;
                    object-fit: cover;
                    transition: transform 1s ease; /* Transición al zoom */
                }
                .swiper-pagination-bullet{
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    opacity: 0.4;
                    transition: all 0.3s ease-in-out;
                }
                .swiper-pagination-bullet-active{
                    width: 36px;
                    height: 16px;
                    border-radius: 12px;
                    background: white;
                    opacity: 1;
                    transition: all 0.3s ease-in-out;
                }
            `}</style>
            
            <Swiper
                modules={[Mousewheel, Pagination, Navigation, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                initialSlide={2}
                centeredSlides={true}
                loop={true}
                slidesPerView="auto"
                spaceBetween={20}
                speed={1000}
                slideToClickedSlide={true}
                mousewheel={{ forceToAxis: true, sensitivity: 1 }}
                pagination={{ clickable: true }}
            >
                {slides.map((image, index) => (
                    <SwiperSlide 
                        key={index} 
                        className='cursor-pointer' 
                        onClick={() => openModal(image, index)}
                    >
                        <img 
                            src={image.src} 
                            alt={`Imagen ${index + 1}`} 
                            ref={(el) => (imageRefs.current[index] = el)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {modalData && (
                <div 
                    className="modal-bg fixed inset-0 flex items-center justify-center z-50 py-17 px-5"
                    onClick={closeModal}
                    ref={modalBgRef}
                >
                    <img 
                        src={modalData.src} 
                        alt="Vista completa"
                        className="rounded-3xl max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()} 
                        ref={modalImageRef}
                    />
                    
                </div>
            )}
        </div>
    )
}