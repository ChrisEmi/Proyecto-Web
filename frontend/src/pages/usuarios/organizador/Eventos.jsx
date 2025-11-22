import CustomSelect from "../../../components/assets/CustomSelect";
import { useOrganizador } from "../../../api/Context/OrganizadorContext.jsx";
import { useEventos } from "../../../api/Context/EventosContext.jsx";
import { useEffect, useState } from "react";
import ModalDetallesEvento from "../../../components/assets/ModalDetallesEvento.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Eventos = () => {
    const { obtenerEventoPorId } = useEventos();
    const { eventosOrganizados, obtenerEventosPorOrganizador, errors: errores } = useOrganizador();
    const { eliminarEvento } = useEventos();
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

    const eliminarEventoSeleccionado = async () => {
        setIsLoading(true);
        const resultado = await eliminarEvento(eventoSeleccionado.id_evento);
        if (resultado && resultado.status === 'success') {
            await obtenerEventosPorOrganizador(ordenarPor, direccion);
            cerrarModal();
        }
        setIsLoading(false);
    };

    const onClickAbrirDetalles = async (evento) => {
        const eventoData = await obtenerEventoPorId(evento);
        setEventoSeleccionado(eventoData[0]);
        console.log(eventoSeleccionado);
        setAbrirDetalles(true);
    }

    const guardarCambios = () => {
        setEstaEditando(false);
    };

    useEffect(() => {
        obtenerEventosPorOrganizador(ordenarPor, direccion);
    }, [ordenarPor, direccion]);

    


    return (
        <>
            {abrirDetalles && eventoSeleccionado && (
                <ModalDetallesEvento
                    abrirDetalles={abrirDetalles}
                    eventoSeleccionado={eventoSeleccionado}
                    onCerrar={cerrarModal}
                    errores={errores}
                    estaEditando={estaEditando}
                    setEstaEditando={setEstaEditando}
                    categoria={categoria}
                    isLoading={isLoading}
                    onGuardar={guardarCambios}
                    onEliminar={eliminarEventoSeleccionado}
                />
            )}
            
            <div className="container min-w-full min-h-screen rounded-2xl shadow-2xl bg-white/40 flex flex-col gap-4 p-2 md:p-4">
                <div className="sticky top-0 flex flex-col lg:flex-row items-center justify-between p-12 bg-white/40 rounded-xl gap-4 backdrop-blur-2xl z-10">
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
                    <div className="flex flex-col items-center justify-center h-full w-full shadow-2xl rounded-2xl p-10">
                        <FontAwesomeIcon icon={['fas', 'calendar-times']} className="text-escom-sombra-400 text-9xl mx-auto my-10" />
                        <p className="p-4">No hay eventos organizados.</p>
                    </div>
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