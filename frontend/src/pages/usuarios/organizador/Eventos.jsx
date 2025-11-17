import CustomSelect from "../../../components/assets/CustomSelect";
import { useOrganizador } from "../../../api/Context/OrganizadorContext.jsx";
import { useEventos } from "../../../api/Context/EventosContext.jsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Eventos = () => {
    const { obtenerEventoPorId } = useEventos();
    const { eventosOrganizados, obtenerEventosPorOrganizador, errors: errores } = useOrganizador();
    const [ordenarPor, setOrdenarPor] = useState('fecha_creacion');
    const [direccion, setDireccion] = useState('DESC');
    const [isLoading, setIsLoading] = useState(false);
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [estaEditando, setEstaEditando] = useState(false);
    const [categoria, setCategoria] = useState(null);

    useGSAP(() => {
        gsap.fromTo(".container > div", 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut"});;
    })

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
            ;
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

    const manejarOrdenarPor = (value) => {
        setOrdenarPor(value);
    }

    const manejarDireccion = (value) => {
        setDireccion(value);
    };

    const actualizarLista = async () => {
        setIsLoading(true);
        await obtenerEventosPorOrganizador(ordenarPor, direccion);
        setIsLoading(false);
    }

    const cerrarModal = () => {
        gsap.to(".modal-evento > div", {
            opacity: 0, y: 50, duration: 0.3, stagger: 0.1, ease: "power1.out", onComplete: () => {
                gsap.to(".modal-evento", {
                    opacity: 0, duration: 0.2, onComplete: () => {
                        setAbrirDetalles(false);
                        setEventoSeleccionado(null);
                    }
                });
            }
        });
    }

    const onClickAbrirDetalles = async (evento) => {
        const eventoData = await obtenerEventoPorId(evento);
        setEventoSeleccionado(eventoData[0]);
        console.log(eventoSeleccionado);
        setAbrirDetalles(true);
    }

    useEffect(() => {
        obtenerEventosPorOrganizador(ordenarPor, direccion);
    }, [ordenarPor, direccion]);

    


    return (
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

            {abrirDetalles && createPortal(
                <div className="modal-evento fixed inset-0 z-[9999] grid grid-cols-1 lg:grid-cols-2 items-center justify-center bg-black/50 backdrop-blur-sm p-4 lg:p-20 gap-4 lg:gap-10 overflow-auto">
                    <button 
                        onClick={cerrarModal}
                        className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-all"
                    >
                        <FontAwesomeIcon icon={['fas', 'times']} className="text-xl" />
                    </button>
                    
                    {eventoSeleccionado.imagenes.length > 0 && (
                        <div className="carrusel relative flex flex-col h-[40vh] lg:h-[80vh] w-full items-center justify-center">
                            {(eventoSeleccionado.imagenes.length > 1) && (
                                <nav className="carrusel-nav hidden absolute w-full h-full items-center justify-between px-4 pointer-events-none z-20">
                                    <button 
                                        tabIndex={0} 
                                        className="carrusel-nav-prev bg-escom-sombra-600/50 hover:bg-escom-sombra-600/70 text-white rounded-full w-12 h-12 flex items-center justify-center z-10 pointer-events-auto transition-all"
                                    >
                                        <FontAwesomeIcon icon={['fas', 'chevron-left']} className="text-xl" />
                                    </button>
                                    <button 
                                        tabIndex={0} 
                                        className="carrusel-nav-next bg-escom-sombra-600/50 hover:bg-escom-sombra-600/70 text-white rounded-full w-12 h-12 flex items-center justify-center z-10 pointer-events-auto transition-all"
                                    >
                                        <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-xl" />
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
                    
                    <div className={`${eventoSeleccionado.imagenes.length > 0 ? "lg:col-span-1" : "lg:col-span-2 items-center w-full"} bg-white rounded-2xl shadow-2xl w-full mx-auto max-w-5xl max-h-[50vh] lg:max-h-[80vh] overflow-y-auto p-4 md:p-6`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                            <div className="col-span-2">
                                <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                    Título del Evento <FontAwesomeIcon icon={['fas', 'heading']} className="text-escom-500"/>
                                </label>
                                <input 
                                    type="text" 
                                    defaultValue={eventoSeleccionado.titulo_evento}
                                    disabled={!estaEditando}
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700  focus:outline-none text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
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
                                    rows="2"
                                    disabled={!estaEditando}
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
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
                                        className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
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
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
                                    } font-lg`}
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
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
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
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
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
                                    className={`w-full px-3 md:px-4 py-2 rounded-xl text-sm md:text-base ${
                                    estaEditando 
                                        ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                        : 'text-escom-sombra-300 cursor-not-allowed'
                                    } font-lg`}
                                />
                            </div>
                            
                            <div className="col-span-full md:col-span-1">
                                <label className="block text-xs md:text-sm font-semibold text-escom-900 mb-2">
                                    Categoría <FontAwesomeIcon icon={['fas', 'tags']} className="text-escom-500"/>
                                </label>
                                <div className={`w-full rounded-xl text-sm md:text-base ${
                                        estaEditando 
                                            ? 'border-escom-300 border-2 focus:border-escom-700 focus:outline-none font-medium text-escom-900' 
                                            : 'text-escom-sombra-300 cursor-not-allowed'
                                        } font-lg`}>
                                    <CustomSelect
                                    label="Dirección:"
                                    options={[
                                        { value: '1', label: 'Cultural', icon: 'arrow-up' },
                                        { value: '2', label: 'Académica', icon: 'arrow-down' },
                                        { value: '3', label: 'Deportiva', icon: 'arrow-down' },
                                    ]}
                                    value={categoria}
                                    onChange={() => {}}
                                    disabled={!estaEditando}
                                    defaultValue={eventoSeleccionado.id_categoria}
                                    />
                                </div>
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
                            <div className="col-span-full flex flex-col sm:flex-row gap-3 justify-center">
                                <button 
                                    onClick={() => setEstaEditando(!estaEditando)}
                                    className="flex items-center justify-center gap-2 bg-escom-700 hover:bg-escom-800 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold transition-all text-sm md:text-base"
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
                                <button className="flex items-center justify-center gap-2 bg-escom-900 hover:bg-escom-950 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold transition-all text-sm md:text-base">
                                    <FontAwesomeIcon icon={['fas', 'trash']} />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
            <div className="container min-w-full rounded-2xl shadow-2xl bg-white/40 flex flex-col gap-4 p-2 md:p-4">
                <div className="sticky top-0 flex flex-col lg:flex-row items-center justify-between p-4 bg-white/40 rounded-xl gap-4 backdrop-blur-2xl z-10">
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-escom-sombra-400"><FontAwesomeIcon icon={['fas', 'calendar-alt']} /> Eventos Organizados</h1>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <CustomSelect
                            label="Ordenar por:"
                            options={[
                                { value: 'fecha', label: 'Fecha', icon: 'calendar' },
                                { value: 'fecha_creacion', label: 'Fecha de Creación', icon: 'clock' },
                                { value: 'titulo', label: 'Título', icon: 'list-ol' },
                                { value: 'ubicacion', label: 'Ubicación', icon: 'map-marker-alt' },
                                { value: 'organizador', label: 'Organizador', icon: 'user ' },
                                { value: 'categoria', label: 'Categoría', icon: 'tags' },

                            ]}
                            value={ordenarPor}
                            onChange={manejarOrdenarPor}
                            color="escom-900"
                        />
                        <CustomSelect
                            label="Dirección:"
                            options={[
                                { value: 'ASC', label: 'Ascendente', icon: 'arrow-up' },
                                { value: 'DESC', label: 'Descendente', icon: 'arrow-down' },
                            ]}
                            value={direccion}
                            onChange={manejarDireccion}
                            color="escom-900"
                        />
                        <button
                            onClick={actualizarLista}
                            disabled={isLoading}
                            className="bg-white text-escom-sombra-400 px-4 py-2 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <FontAwesomeIcon 
                                icon={['fas', 'arrows-rotate']} 
                                className={isLoading ? 'animate-spin' : ''}
                            />
                        </button>
                    </div>
                </div>
                <div className="bg-white/100 rounded-2xl">
                    {errores && errores.length > 0 && (
                        <div className="p-4">
                            {errores.map((error, index) => (
                                <p key={index} className="text-red-600">{error}</p>
                            ))}
                        </div>
                    )}
                    {eventosOrganizados.length === 0 ? (
                        <p className="p-4">No hay eventos organizados.</p>
                    ) : (
                        eventosOrganizados.map((evento) => (
                            <div key={evento.id_evento} className="bg-white m-2 md:m-5 relative flex flex-col lg:flex-row rounded-2xl shadow-2xl min-h-[200px] evento-card overflow-hidden">
                                <div className="evento-imagen relative w-full lg:w-3/10 h-48 lg:h-auto text-sm flex ">
                                    <div className="absolute w-full h-full bg-gradient-to-r from-escom-sombra-400/70 to-transparent"/>
                                    {evento.imagenes && evento.imagenes.length > 0 ? (
                                        <img 
                                            src={evento.imagenes[0].src}
                                            alt={evento.titulo_evento}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-escom-100 flex flex-col gap-3 items-center justify-center">
                                            <FontAwesomeIcon icon={['fas', 'image']} className="text-escom-sombra-400 text-7xl" />
                                            <span className="text-escom-sombra-500 font-medium">Sin imagenes</span>
                                        </div>
                                    )}
                                </div>
                                <div className="evento-detalles w-full lg:w-5/10 p-4 flex flex-col">
                                    <h2 className="text-xl md:text-2xl font-bold text-escom-sombra-400 mb-2 uppercase px-2 md:px-4 py-2">{evento.titulo_evento}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        <div className="bg-escom-300/40 col-span-full rounded-2xl px-4 py-2">
                                            <h3 className="font-semibold text-sm md:text-base">Descripcion <FontAwesomeIcon icon={['fas', 'info-circle']} className="text-escom-700"/></h3>
                                            <p className="text-escom-sombra-800 mb-1 font-light text-sm md:text-base">{evento.descripcion}</p>
                                        </div>
                                        {evento.tags && evento.tags.length > 0 && (
                                            <div className="col-span-full bg-escom-600/30 rounded-2xl px-4 py-2">
                                                <h3 className="font-semibold mb-2 text-escom-sombra-900 text-sm md:text-base">Etiquetas <FontAwesomeIcon icon={['fas', 'tags']} className="text-escom-900"/></h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {evento.tags.map((tag, index) => (
                                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-escom-800/60 text-white text-xs rounded-full font-medium">
                                                            <FontAwesomeIcon icon={['fas', 'tag']} className="text-xs" />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
                                            <h3 className="py-2 text-xs md:text-sm">Fecha de Creacion <FontAwesomeIcon icon={['fas', 'calendar']} className="text-escom-500"/></h3>
                                            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">{new Date(evento.fecha_creacion).toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                                        </div>
                                        <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
                                            <h3 className="py-2 text-xs md:text-sm">Fecha <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="text-escom-500"/></h3>
                                            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
                                                {new Date(evento.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })}{' '}
                                                <span className="block sm:inline">{new Date(evento.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </p>
                                        </div>
                                        <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
                                            <h3 className="py-2 text-xs md:text-sm">Ubicacion <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="text-escom-500"/></h3>
                                            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">{evento.ubicacion}</p>
                                        </div>
                                        <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
                                            <h3 className="py-2 text-xs md:text-sm">Cupo <FontAwesomeIcon icon={['fas', 'users']} className="text-escom-500"/></h3>
                                            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">{evento.cupo}</p>
                                        </div>
                                        <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
                                            <h3 className="py-2 text-xs md:text-sm">Categoria <FontAwesomeIcon icon={['fas', 'tags']} className="text-escom-500"/></h3>
                                            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">{evento.nombre_categoria}</p>
                                        </div>
                                        <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
                                            <h3 className="py-2 text-xs md:text-sm">Estatus <FontAwesomeIcon icon={['fas', 'list-check']} className="text-escom-500"/></h3>
                                            <p className={`px-2 md:px-4 py-2 text-xs md:text-sm mt-2 rounded-full mb-1 font-semibold text-center ${evento.estado === 'Verificado' ? 'bg-escom-200 text-escom-sombra-400' : 'bg-escom-800/80 text-white'}`}>{evento.estado}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:flex-1 flex items-center justify-center p-4">
                                    <button className="bg-escom-800 text-white px-4 md:px-18 py-3 md:py-4 rounded-xl hover:bg-escom-800 transition-all duration-300 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg text-sm md:text-base w-full lg:w-auto justify-center" onClick={() => onClickAbrirDetalles(evento.id_evento)}>
                                        Ver Detalles
                                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Eventos;