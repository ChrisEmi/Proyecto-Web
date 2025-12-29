import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CarruselImagenes = ({ imagenes, abrirDetalles, isEditando = false, onAgregarImagen, onEliminarImagen }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAgregarImagen = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dqhsgokht',
                uploadPreset: 'eventos-escomunidad',
                sources: ['local', 'url', 'camera'],
                multiple: true,
                folder: 'imagenes_eventos',
                public_id: `evento_img_${Date.now()}`,
            }, 
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Imagen cargada con éxito:", result.info);
                    if (onAgregarImagen) {
                        onAgregarImagen({
                            src: result.info.secure_url,
                            descripcion: result.info.original_filename || 'Imagen del evento'
                        });
                    }
                }
            }
        );
        widget.open();
    };

    const handleEliminarImagen = () => {
        console.log("Eliminando imagen con índice:", currentIndex);
        if (onEliminarImagen) {
            onEliminarImagen(currentIndex);
        }
    };

    useGSAP(() => {
        if (!abrirDetalles || !imagenes || imagenes.length === 0) return;

        const slides = gsap.utils.toArray(".carrusel-slide");
        if (slides.length === 0) return;

        const nextButton = document.querySelector(".carrusel-nav-next");
        const prevButton = document.querySelector(".carrusel-nav-prev");
        const contador = document.querySelector(".carrusel-contador");

        // Asegurar que currentIndex esté dentro del rango válido
        const safeIndex = Math.min(currentIndex, slides.length - 1);
        if (safeIndex !== currentIndex) {
            setCurrentIndex(safeIndex);
            return;
        }

        function posicionarContador() {
            if (safeIndex < 0 || safeIndex >= slides.length) return;
            const slideActual = slides[safeIndex];
            if (!slideActual) return;
            const img = slideActual.querySelector("img");
            if (img && contador) {
                const imgRect = img.getBoundingClientRect();
                const containerRect = slideActual.getBoundingClientRect();
                const offsetTop = imgRect.bottom - containerRect.top;
                gsap.set(contador, { top: `${offsetTop + 16}px`, bottom: 'auto' });
                gsap.to(contador, { opacity: 1, duration: 0.3, y: 0, ease: "power3.Out" });
            }
        }

        function cambiarSlide(direccion) {
            if (safeIndex < 0 || safeIndex >= slides.length) return;
            gsap.to(slides[safeIndex], { opacity: 0, duration: 1, y: 50, ease: "power3.inOut" });
            const newIndex = gsap.utils.wrap(0, slides.length, safeIndex + direccion);
            setCurrentIndex(newIndex);
            gsap.to(slides[newIndex], { opacity: 1, duration: 1, y: 0, ease: "power3.inOut", onComplete: posicionarContador });
            gsap.to(contador, {
                opacity: 0, duration: 1, y: 50, ease: "power3.inOut", onComplete: () => {
                    if (contador) contador.innerText = `${newIndex + 1}/${slides.length}`;
                }
            });
        }

        const handleNext = () => cambiarSlide(1);
        const handlePrev = () => cambiarSlide(-1);

        nextButton?.addEventListener("click", handleNext);
        prevButton?.addEventListener("click", handlePrev);

        gsap.set(".carrusel", { overflow: "hidden" });
        gsap.set(".carrusel-nav", { display: "flex" });

        slides.forEach((slide, index) => {
            slide.classList.add("carrusel-slide-abs");
            gsap.set(slide, { opacity: index === safeIndex ? 1 : 0 });
            const img = slide.querySelector("img");
            if (img && index === safeIndex) {
                img.onload = posicionarContador;
                if (img.complete) posicionarContador();
            }
        });

        if (contador) contador.innerText = `${safeIndex + 1}/${slides.length}`;

        return () => {
            nextButton?.removeEventListener("click", handleNext);
            prevButton?.removeEventListener("click", handlePrev);
        };
    }, { dependencies: [abrirDetalles, imagenes, currentIndex], scope: document.body });

    if (!imagenes || imagenes.length === 0) {
        if (isEditando) {
            return (
                <div className="carrusel relative flex flex-col h-[40vh] lg:h-[80vh] w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-white">
                        <FontAwesomeIcon icon={['fas', 'image']} className="text-6xl" />
                        <p className="text-lg font-medium">No hay imágenes</p>
                        <button 
                            onClick={handleAgregarImagen} 
                            className="bg-escom-700 hover:bg-escom-600 text-white px-6 py-3 rounded-full font-semibold z-20 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" /> Agregar imagen
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="carrusel relative flex flex-col h-[40vh] lg:h-[80vh] w-full items-center justify-center">
            {imagenes.length > 1 && (
                <nav className="carrusel-nav hidden absolute w-full h-full items-center justify-between px-4 pointer-events-none z-20">
                    <button 
                        tabIndex={0} 
                        className="carrusel-nav-prev bg-escom-sombra-600/50 hover:bg-escom-sombra-600/70 hover:scale-110 text-white rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center z-10 pointer-events-auto transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={['fas', 'chevron-left']} className="text-xl lg:text-2xl" />
                    </button>
                    <button 
                        tabIndex={0} 
                        className="carrusel-nav-next bg-escom-sombra-600/50 hover:bg-escom-sombra-600/70 hover:scale-110 text-white rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center z-10 pointer-events-auto transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-xl lg:text-2xl" />
                    </button>
                </nav>
            )}
            <div className="relative flex-1 w-full flex items-center justify-center">
                {imagenes.map((imagen, index) => (
                    <div className="carrusel-slide absolute w-full h-full flex items-center justify-center" key={index}>
                        <img 
                            src={imagen.src} 
                            alt={imagen.descripcion} 
                            className="max-w-full max-h-full object-contain rounded-2xl"
                        />
                    </div>
                ))}
                {isEditando && (
                    <div className="absolute top-30 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
                        <button 
                            onClick={handleAgregarImagen} 
                            className="bg-escom-500 hover:bg-escom-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={['fas', 'plus']} /> Agregar
                        </button>
                        <button 
                            onClick={handleEliminarImagen} 
                            className="bg-escom-800 hover:bg-escom-900 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={['fas', 'trash']} /> Eliminar
                        </button>
                    </div>
                )}
                <div className="carrusel-contador absolute left-1/2 -translate-x-1/2 bg-escom-sombra-600/50 text-white px-4 py-2 rounded-full font-semibold z-20">
                    1/{imagenes.length}
                </div>
            </div>
        </div>
    );
};

export default CarruselImagenes;
