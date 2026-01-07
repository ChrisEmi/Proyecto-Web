import { useAuth } from "../../api/Context/AuthContext.jsx";
import { useEventos } from "../../api/Context/EventosContext.jsx";
import { useEffect, useState, useMemo } from "react";
import CustomSelect from "../../components/assets/cutoms-campos/CustomSelect.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalDetallesEvento from "../../components/assets/modals/ModalDetallesEvento.jsx";
import { useAnimacionesEventos } from "../../hooks/useAnimacionesEventos.js";
import { useAlumno } from "../../api/Context/AlumnoContext.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { VistaCarga } from "../../components/layout/LoopCarga.jsx";

gsap.registerPlugin(ScrollTrigger);

const Eventos = () => {
    const { usuario } = useAuth();
    const { eventos, obtenerEventos, obtenerEventoPorId, loading } = useEventos();
    const { inscribirseEvento, verificarInscripcion, errors: errores } = useAlumno();
    const [categoria, setCategoria] = useState('todos');
    const [ordenar_por, setOrdenar_por] = useState('fecha');
    const [direccion, setDireccion] = useState('DESC');
    const [busqueda, setBusqueda] = useState('');
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [estaInscrito, setEstaInscrito] = useState(false);

    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);

    useEffect(() => {
        obtenerEventos(ordenar_por, direccion, categoria);
         console.log("Eventos obtenidos:", eventos);       
    }, [ordenar_por, direccion, categoria]);

    useGSAP(() => {
        gsap.fromTo(".section-container > div",
            { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power4.inOut" }
        )
    }, [])

    useGSAP(() => {
        gsap.set(".card-evento", { opacity: 0, y: 100 });
        
        ScrollTrigger.batch(".card-evento", {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15 , overwrite:true }),
            onLeave: (batch) => gsap.to(batch, { opacity: 0, y: -100, overwrite: true }),
            onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, overwrite: true }),
            onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 100, overwrite: true }),
            start: "10px bottom",
            end: "top top",
        })

        const tituloEventos = document.querySelector('.titulo-h1');
        const tituloNav = document.querySelector('.titulo-nav');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-container",
                start: "top top",
                end: "+=200",
                scrub: 1,
            }
        });

        tl.to(tituloEventos, {
            opacity: 0,
            y: -20,
            height: 0,
            margin: 0,
            scale: 0.8,
            ease: "none",
            duration: 0.5,
        }, 0);

        tl.to(tituloNav, {
            gap: "gap-0",
            scale: 0.8,
            duration: 1,
            y: 40,

        }, 0);

        ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".card-evento", { opacity: 0, y: 0 }));
        
    }, [eventos])



    const ordenarPorSelect = (e) => {
        setOrdenar_por(e);
    }
    const direccionSelect = (e) => {
        setDireccion(e);
    }
    const categoriaSelect = (e) => {
        setCategoria(e);
    }
    const cerrarModal = () => {
        cerrarModalAnimacion(() => {
            setAbrirDetalles(false);
            setEventoSeleccionado(null);
        });
    }

    const abrirDetallesModal = async (id_evento) => {
        const evento = await obtenerEventoPorId(id_evento);
        setEventoSeleccionado(evento[0]);
        if(usuario?.nombre_tipo === 'Estudiante'){
            const inscrito = await verificarInscripcion(id_evento);
            setEstaInscrito(inscrito);
        }
        setAbrirDetalles(true);
    }

    const buscarEventos = useMemo(() => {
        busqueda === '' && []; 
        const eventosFiltrados = eventos.filter((eventos) => eventos.titulo_evento.toLowerCase().includes(busqueda.toLowerCase()));
        return eventosFiltrados.slice(0,3);
    }, [eventos, busqueda]);

    if (loading) return <VistaCarga />;

    let usuarioTipoModal = 'default';
    switch (usuario?.nombre_tipo) {
        case 'Estudiante':
            usuarioTipoModal = 'alumno';
            break;
        case 'Organizador':
            usuarioTipoModal = 'organizador';
            break;
        case 'Administrador':
            usuarioTipoModal = 'administrador';
            break;
    }

    return (
        <>
            {abrirDetalles && eventoSeleccionado && (
                <ModalDetallesEvento
                    abrirDetalles={abrirDetalles}
                    eventoSeleccionado={eventoSeleccionado}
                    onCerrar={cerrarModal}
                    categoria={categoria}
                    isInscrito={estaInscrito}
                    errores={errores}
                    onInscribirse={async () => {
                        await inscribirseEvento(eventoSeleccionado.id_evento);
                    }}
                    tipoUsuario={usuarioTipoModal}
                />
            )}
            <div className="section-container flex flex-col min-h-screen gap-4 p-12">
                <div className="titulo-nav z-50 flex flex-col gap-4 bg-escom-sombra-200/70 p-4 md:p-8 rounded-2xl backdrop-blur-sm text-center md:sticky md:top-0 md:z-10 shadow-lg">
                    <h1 className="text-5xl font-bold text-white titulo-h1">Eventos</h1>
                    <div className="flex flex-col md:flex-row items-center md:justify-between">
                        <div className="flex items-center relative z-10 text-escom-sombra-100">
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className={`bg-white p-2 rounded-t-2xl placeholder:text-escom-sombra-100/60 w-xs md:w-sm lg:w-xl ${busqueda.length > 0 ? '' : 'rounded-b-2xl'} focus:outline-none focus:ring-2 focus:ring-escom-900/5 border border-escom-900/20`}
                            />
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="text-escom-sombra-100 absolute right-3" />
                            {busqueda.length > 0 && buscarEventos.length > 0 && (
                                <div className="absolute top-10 left-0 w-full max-h-[100px] overflow-y-auto bg-white rounded-b-2xl z-0 py-2 flex flex-col gap-1 border border-escom-900/20 border-t-0 main-scroll ">
                                    {buscarEventos.map((evento) => (
                                        <div onClick={() => abrirDetallesModal(evento.id_evento)} className="flex items-center relative gap-4 px-4 py-2 cursor-pointer hover:bg-escom-900/10">
                                            <p>{evento.titulo_evento}</p>
                                        </div>
                                    ))},
                                </div>
                            )}
                            {busqueda.length > 0 && buscarEventos.length === 0 && (
                                <div className="absolute top-10 left-0 w-full h-[100px] overflow-y-auto bg-white rounded-b-2xl z-0 py-2 flex items-center justify-center ">
                                    <p className="text-escom-sombra-100/60">No se encontraron eventos</p>
                                </div>
                            )}     
                        </div>
                        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 gap-4">
                            <CustomSelect
                                label="Ordenar por"
                                options={[
                                    { value: "fecha", label: "Fecha" , icon: "calendar"},
                                    { value: "titulo", label: "Titulo" , icon: "book"},
                                    { value: "categoria", label: "Categoria" , icon: "music"},
                                ]}
                                value={ordenar_por}
                                onChange={ordenarPorSelect}
                            />
                            <CustomSelect
                                label="Direccion"
                                options={[
                                    { value: "ASC", label: "Ascendente", icon: "arrow-up" },
                                    { value: "DESC", label: "Descendente", icon: "arrow-down" },
                                ]}
                                value={direccion}
                                onChange={direccionSelect}
                            />
                            <CustomSelect
                                label="Categoria"
                                options={[
                                    { value: "todos", label: "Todos", icon: "users" },
                                    { value: "Academico", label: "Academico", icon: "book" },
                                    { value: "Cultural", label: "Cultural", icon: "music" },
                                    { value: "Deportivo", label: "Deportivo", icon: "football" },
                                ]}
                                value={categoria}
                                onChange={categoriaSelect}
                            />
                        </div>
                    </div>
                </div>
                <div className="eventos-container  flex flex-col gap-4 p-8 rounded-2xl text-escom-sombra-700 backdrop-blur-sm flex-1 shadow-lg">
                    {eventos?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {eventos.map((evento) => (
                                <div key={evento.id_evento} className="card-evento flex flex-col rounded-xl bg-white h-[490px] w-full overflow-hidden shadow-md">
                                    <div className="relative min-h-52">
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-escom-900/50 via-transparent to-transparent z-10"></div>
                                        <span className={`uppercase absolute top-3 right-3 z-20 font-medium opacity-90 text-xs px-4 py-1.5 rounded-full text-white shadow-lg ${evento.nombre_categoria === 'Academico' ? 'bg-escom-900' : evento.nombre_categoria === 'Cultural' ? 'bg-escom-600' : evento.nombre_categoria === 'Deportivo' ? 'bg-escom-400' : 'bg-escom-600'}`}>{evento.nombre_categoria}</span>
                                        {evento.imagenes && evento.imagenes.length > 0 ? (
                                            <img 
                                                src={evento.imagenes[0].src}
                                                alt={evento.titulo_evento} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-escom-100 to-escom-200 flex flex-col gap-3 items-center justify-center">
                                                <FontAwesomeIcon icon={['fas', 'image']} className="text-escom-500 text-5xl" />
                                                <span className="text-escom-600 font-medium text-sm">Sin imagen</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 p-5 gap-3 ">
                                        <h2 className="text-xl font-bold text-escom-900 line-clamp-2 min-h-[3.5rem] text-center px-12 mb-3">{evento.titulo_evento}</h2>
                                        
                                        {evento.tags && evento.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {evento.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className="text-xs px-2.5 py-1 bg-escom-100 text-escom-700 rounded-full font-medium uppercase tracking-wide">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {evento.tags.length > 2 && (
                                                    <span className="text-[10px] px-2.5 py-1 bg-escom-800 text-white rounded-full font-medium">
                                                        +{evento.tags.length - 2}
                                                </span>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-2 text-sm mt-auto">
                                            <div className="flex items-start gap-2 text-escom-sombra-700">
                                                <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="text-escom-600 mt-0.5 flex-shrink-0"/>
                                                <span className="font-medium text-sm line-clamp-1">{evento.ubicacion}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-escom-sombra-700">
                                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="text-escom-600 flex-shrink-0"/>
                                                <div className="flex gap-1 text-sm font-medium">
                                                    <span>{new Date(evento.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                    <span className="text-escom-sombra-500 font-bold">{new Date(evento.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <button onClick={() => abrirDetallesModal(evento.id_evento)} className="bg-escom-100 px-6 py-2 text-escom-900 font-medium rounded-full max-w-lg my-4 gap-2 mx-auto text-sm cursor-pointer">
                                        Ver detalles <FontAwesomeIcon icon={['fas', 'arrow-right']}/>
                                    </button>
                                </div>
                            ))}
                            
                        </div>
                    )}
                    {eventos?.length === 0 && eventos === null && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400 gap-4">
                            <FontAwesomeIcon icon="fa-solid fa-calendar-xmark" className="text-6xl opacity-50" />
                            <p className="text-xl font-medium">No hay eventos disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Eventos;