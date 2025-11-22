import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomSelect from "./CustomSelect";

const ModalDetallesEvento = ({ 
    abrirDetalles, 
    eventoSeleccionado, 
    onCerrar, 
    errores,
    estaEditando,
    setEstaEditando,
    categoria,
    isLoading,
    onGuardar,
    onEliminar,
    onVerificar,
    esAdmin = false,
    esAlumno = false
}) => {
    useGSAP(() => { 
        if (!abrirDetalles || !eventoSeleccionado) return;
        gsap.set(".modal-evento > div", { opacity: 0 });

        if (abrirDetalles) {
            gsap.fromTo(".modal-evento", { opacity: 0 }, {
                opacity: 1, duration: 0.3, onComplete: () => {
                    gsap.fromTo(".modal-evento > div", {
                        opacity: 0, y: 50
                    }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power1.in" })
                }
            });
        }

        const slides = gsap.utils.toArray(".carrusel-slide");
        if (slides.length === 0) return;

        const nextButton = document.querySelector(".carrusel-nav-next");
        const prevButton = document.querySelector(".carrusel-nav-prev");
        const contador = document.querySelector(".carrusel-contador");

        let currentIndex = 0;

        function posicionarContador() {
            const slideActual = slides[currentIndex];
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
            gsap.to(slides[currentIndex], { opacity: 0, duration: 1, y: 50, ease: "power3.inOut" });
            currentIndex = gsap.utils.wrap(0, slides.length, currentIndex + direccion);
            gsap.to(slides[currentIndex], { opacity: 1, duration: 1, y: 0, ease: "power3.inOut", onComplete: posicionarContador });
            gsap.to(contador, {
                opacity: 0, duration: 1, y: 50, ease: "power3.inOut", onComplete: () => {
                if (contador) contador.innerText = `${currentIndex + 1}/${slides.length}`
            } });
        }

        const handleNext = () => cambiarSlide(1);
        const handlePrev = () => cambiarSlide(-1);

        nextButton?.addEventListener("click", handleNext);
        prevButton?.addEventListener("click", handlePrev);

        gsap.set(".carrusel", { overflow: "hidden" });
        gsap.set(".carrusel-nav", { display: "flex" });

        slides.forEach((slide, index) => {
            slide.classList.add("carrusel-slide-abs");
            gsap.set(slide, { opacity: index === 0 ? 1 : 0 });
            const img = slide.querySelector("img");
            if (img && index === 0) {
                img.onload = posicionarContador;
                if (img.complete) posicionarContador();
            }
        });

        if (contador) contador.innerText = `1/${slides.length}`;

        return () => {
            nextButton?.removeEventListener("click", handleNext);
            prevButton?.removeEventListener("click", handlePrev);
        };
    }, { dependencies: [abrirDetalles, eventoSeleccionado], scope: document.body });

    if (!abrirDetalles || !eventoSeleccionado) return null;

    return createPortal(
        <>
            <style>{`
                .carrusel-slide-abs {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px;
                }
                .carrusel-slide-abs img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }
            `}</style>
            <div className="modal-evento fixed inset-0 z-[9999] grid grid-cols-1 lg:grid-cols-2 items-center justify-center bg-black/50 backdrop-blur-sm p-4 lg:p-20 gap-4 lg:gap-10 overflow-auto">
                {errores && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">{errores}</div>
                )}
                <button 
                    onClick={onCerrar}
                    className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-all"
                >
                    <FontAwesomeIcon icon={['fas', 'times']} className="text-xl" />
                </button>
                
                {eventoSeleccionado.imagenes && eventoSeleccionado.imagenes.length > 0 && (
                    <div className="carrusel relative flex flex-col h-[40vh] lg:h-[80vh] w-full items-center justify-center">
                        {(eventoSeleccionado.imagenes.length > 1) && (
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
                            {eventoSeleccionado.imagenes.map((imagen, index) => (
                                <div className="carrusel-slide absolute w-full h-full flex items-center justify-center" key={index}>
                                    <img 
                                        src={imagen.src} 
                                        alt={imagen.descripcion} 
                                        className="max-w-full max-h-full object-contain rounded-2xl"
                                    />
                                </div>
                            ))}
                            <div className="carrusel-contador absolute left-1/2 -translate-x-1/2 bg-escom-sombra-600/50 text-white px-4 py-2 rounded-full font-semibold z-20">
                                1/{eventoSeleccionado.imagenes.length}
                            </div>
                        </div>
                    </div>
                )}
                
                <div className={`${eventoSeleccionado.imagenes && eventoSeleccionado.imagenes.length > 0 ? "lg:col-span-1" : "lg:col-span-2 items-center w-full"} bg-white rounded-2xl shadow-2xl w-full mx-auto max-w-5xl max-h-[50vh] lg:max-h-[85vh] overflow-y-auto p-4 md:p-6`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                        <div className="col-span-2">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Título del Evento <FontAwesomeIcon icon={['fas', 'heading']} className="text-escom-500"/>
                            </label>
                            <input 
                                type="text" 
                                defaultValue={eventoSeleccionado.titulo_evento}
                                disabled={!estaEditando}
                                className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-200 ${
                                    estaEditando 
                                        ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none text-escom-900 bg-blue-50/30' 
                                        : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                                } font-bold`}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-4">
                                Id del Evento <FontAwesomeIcon icon={['fas', 'id-badge']} className="text-escom-500"/>
                            </label>
                            <span className="bg-escom-300 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-escom-sombra-700 text-xs md:text-sm font-semibold">{eventoSeleccionado.id_evento}</span>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Descripción <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-escom-500"/>
                            </label>
                            <textarea 
                                defaultValue={eventoSeleccionado.descripcion}
                                rows="4"
                                disabled={!estaEditando}
                                className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-200 ${
                                    estaEditando 
                                        ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                        : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                                } font-lg`}
                            />
                        </div>
                        
                        {eventoSeleccionado.tags && eventoSeleccionado.tags.length > 0 && (
                            <div className="col-span-full">
                                <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                    Etiquetas <FontAwesomeIcon icon={['fas', 'tags']} className="text-escom-500"/>
                                </label>
                                <input 
                                    type="text" 
                                    defaultValue={eventoSeleccionado.tags.join(', ')}
                                    disabled={!estaEditando}
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-200 ${
                                    estaEditando 
                                        ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                        : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                                    } font-lg`}
                                    placeholder="Separar por comas"
                                />
                            </div>
                        )}
                        
                        <div className="col-span-full md:col-span-1">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Fecha de Creación <FontAwesomeIcon icon={['fas', 'calendar']} className="text-escom-500"/>
                            </label>
                            <input 
                                type="text" 
                                defaultValue={new Date(eventoSeleccionado.fecha_creacion).toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                disabled
                                className="w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent font-lg"
                            />
                        </div>
                        
                        <div className="col-span-full md:col-span-1">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Fecha del Evento <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="text-escom-500"/>
                            </label>
                            <input 
                                type="datetime-local" 
                                defaultValue={new Date(eventoSeleccionado.fecha).toISOString().slice(0, 16)}
                                disabled={!estaEditando}
                                className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-200 ${
                                    estaEditando 
                                        ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                        : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                                    } font-lg`}
                            />
                        </div>
                        
                        <div className="col-span-full md:col-span-1">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Ubicación <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="text-escom-500"/>
                            </label>
                            <input 
                                type="text" 
                                defaultValue={eventoSeleccionado.ubicacion}
                                disabled={!estaEditando}
                                className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-200 ${
                                    estaEditando 
                                        ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                        : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                                    } font-lg`}
                            />
                        </div>
                        
                        <div className="col-span-full md:col-span-1">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Cupo <FontAwesomeIcon icon={['fas', 'users']} className="text-escom-500"/>
                            </label>
                            <input 
                                type="number" 
                                defaultValue={eventoSeleccionado.cupo}
                                disabled={!estaEditando}
                                className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-200 ${
                                estaEditando 
                                    ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                    : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                                } font-lg`}
                            />
                        </div>
                        
                        <div className="col-span-full md:col-span-1">
                            <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                Categoría <FontAwesomeIcon icon={['fas', 'tags']} className="text-escom-500"/>
                            </label>
                            <CustomSelect
                                label="Categoría:"
                                options={[
                                    { value: '1', label: 'Cultural', icon: 'palette' },
                                    { value: '2', label: 'Académica', icon: 'graduation-cap' },
                                    { value: '3', label: 'Deportiva', icon: 'futbol' },
                                ]}
                                value={categoria}
                                onChange={() => {}}
                                disabled={!estaEditando}
                                defaultValue={eventoSeleccionado.id_categoria}
                            />
                        </div>
                        
                        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl py-4 md:py-6 px-3 md:px-4 gap-3 md:gap-4 shadow-2xl text-center">
                            <div>
                                <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-3 md:mb-6">
                                    Estado <FontAwesomeIcon icon={['fas', 'list-check']} className="text-escom-500"/>
                                </label>
                                {eventoSeleccionado.estado === 'Verificado' ? (
                                    <span className="bg-green-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-green-900 text-xs md:text-sm font-semibold">Verificado</span>
                                ) : <span className="bg-yellow-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-yellow-900 text-xs md:text-sm font-semibold">{eventoSeleccionado.estado}</span>}
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-3 md:mb-6">
                                    Administrador <FontAwesomeIcon icon={['fas', 'user']} className="text-escom-500"/>
                                </label>
                                {eventoSeleccionado.id_admin === null ? (
                                    <span className="bg-red-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-red-900 text-xs md:text-sm font-semibold">No verificado</span>
                                ) : (<span className="bg-blue-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-blue-900 text-xs md:text-sm font-semibold">{eventoSeleccionado.id_admin}</span>)}
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-3 md:mb-6">
                                    Empresa <FontAwesomeIcon icon={['fas', 'building']} className="text-escom-500"/>
                                </label>
                                <span className="bg-purple-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-purple-900 text-xs md:text-sm font-semibold">{eventoSeleccionado.empresa}</span>
                            </div>
                        </div>
                        
                        <div className="col-span-full flex flex-col sm:flex-row gap-3 justify-center pt-2">
                            {esAdmin && onVerificar && (
                                <button 
                                    onClick={onVerificar}
                                    disabled={eventoSeleccionado.estado === 'Verificado'}
                                    className={`flex items-center justify-center gap-2 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                                        eventoSeleccionado.estado === 'Verificado' 
                                            ? 'bg-escom-600/80 cursor-not-allowed' 
                                            : 'bg-escom-600 hover:bg-escom-800 hover:shadow-lg'
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'spinner']} className="animate-spin" />
                                            Verificando...
                                        </>
                                    ) : (
                                        eventoSeleccionado.estado === 'Verificado' ? (
                                            <>
                                                <FontAwesomeIcon icon={['fas', 'check-double']} />
                                                Verificado
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={['fas', 'check']} />
                                                Verificar Evento
                                            </>
                                        )
                                    )}
                                </button>
                            )}
                            
                            {(eventoSeleccionado.estado !== 'Verificado' && !esAlumno) && (
                                <button 
                                    onClick={() => estaEditando ? onGuardar() : setEstaEditando(true)}
                                    className="flex items-center justify-center gap-2 bg-escom-600 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base"
                                >
                                    {estaEditando ? (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'save']} />
                                            Guardar Cambios
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'edit']} />
                                            Editar
                                        </>
                                    )}
                                </button>
                            )}
                            
                            {(onEliminar && !esAlumno) && (
                                <button 
                                    onClick={onEliminar}
                                    disabled={isLoading}
                                    className="flex items-center justify-center gap-2 bg-escom-900 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base"
                                >
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'spinner']} className="animate-spin" />
                                            Eliminando...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'trash']} />
                                            Eliminar
                                        </>
                                    )}
                                </button>
                            )}

                            {esAlumno && (
                                <button 
                                    onClick={onInscribir}
                                    disabled={isLoading}
                                    className="flex items-center justify-center gap-2 bg-escom-100 hover:bg-escom-200 hover:shadow-lg text-escom-sombra-200 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base"
                                >
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'spinner']} className="animate-spin" />
                                            Inscribiendo...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={['fas', 'check-circle']} />
                                            Inscribir
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default ModalDetallesEvento;
