import CustomSelect from "../../../components/assets/cutoms-campos/CustomSelect";
import { useAlumno } from "../../../api/Context/AlumnoContext.jsx";
import { useEventos } from "../../../api/Context/EventosContext.jsx";
import { useEffect, useState } from "react";
import ModalDetallesEvento from "../../../components/assets/modals/ModalDetallesEvento.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAnimacionesEventos } from "../../../hooks/useAnimacionesEventos.js";
import { TarjetaEvento } from "../../../components/assets/TarjetaEvento.jsx";

const Eventos = () => {
    const { obtenerEventoPorId } = useEventos();
    const { obtenerEventosPorUsuario, eventosInscritos, errors: errores, loading, verificarInscripcion, desinscribirseEvento } = useAlumno();
    const [ordenarPor, setOrdenarPor] = useState('fecha');
    const [direccion, setDireccion] = useState('DESC');
    const [isLoading, setIsLoading] = useState(false);
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [estaInscrito, setEstaInscrito] = useState(false);

    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);

    useGSAP(() => {
        gsap.fromTo(".container > div", 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut"});;
    }, []);

    const manejarOrdenarPor = (value) => {
        setOrdenarPor(value);
    }

    const manejarDireccion = (value) => {
        setDireccion(value);
    };

    const abrirDetallesModal = async (id_evento) => {
        const evento = await obtenerEventoPorId(id_evento);
        setEventoSeleccionado(evento[0]);
        const inscrito = await verificarInscripcion(id_evento);
        setEstaInscrito(inscrito);
        setAbrirDetalles(true);
    }

    const actualizarLista = async () => {
        setIsLoading(true);
        await obtenerEventosPorUsuario(ordenarPor, direccion);
        setIsLoading(false);
    }

    const manejarCerrarModal = () => {
        cerrarModalAnimacion(() => {
            setAbrirDetalles(false);
            setEventoSeleccionado(null);
        });
    }

    const desinscribirseYActualizar = async (id_evento) => {
        await desinscribirseEvento(id_evento);
        manejarCerrarModal();
        await obtenerEventosPorUsuario(ordenarPor, direccion);
    }

    useEffect(() => {
        obtenerEventosPorUsuario(ordenarPor, direccion);
    }, [ordenarPor, direccion]);

    return (
        <>
            {abrirDetalles && eventoSeleccionado && (
                <ModalDetallesEvento
                    abrirDetalles={abrirDetalles}
                    eventoSeleccionado={eventoSeleccionado}
                    onCerrar={manejarCerrarModal}
                    errores={errores}
                    isLoading={isLoading}
                    isInscrito={estaInscrito}
                    onDesinscribirse={() => {
                        desinscribirseYActualizar(eventoSeleccionado.id_evento);
                    }}
                    esAlumno={true}
                    paginaAlumno={true}
                />
            )}
            
            <div className="container min-w-full rounded-2xl shadow-2xl bg-white/40 flex flex-col gap-4 p-2 md:p-4">
                <div className="sticky top-0 flex flex-col lg:flex-row items-center justify-between p-12 bg-white/40 rounded-xl gap-4 backdrop-blur-2xl z-10">
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-escom-sombra-400"><FontAwesomeIcon icon={['fas', 'calendar-alt']} /> Mis Eventos</h1>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <CustomSelect
                            label="Ordenar por:"
                            options={[
                                { value: 'fecha', label: 'Fecha', icon: 'calendar' },
                                { value: 'titulo', label: 'Título', icon: 'list-ol' },
                                { value: 'ubicacion', label: 'Ubicación', icon: 'map-marker-alt' },
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
                <div className="bg-white/100 rounded-2xl flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4  shadow-2xl overflow-y-auto">
                    {errores && errores.length > 0 && (
                        <div className="p-4">
                            {errores.map((error, index) => (
                                <p key={index} className="text-red-600">{error}</p>
                            ))}
                        </div>
                )}
                {loading ? (
                    <div className="flex flex-1 flex-col items-center justify-center h-[60vh] w-full p-18">
                        <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-escom-sombra-400 text-9xl mx-auto my-10 animate-spin" />
                        <p className="p-4 text-3xl font-semibold text-escom-900">Cargando tus eventos...</p>
                    </div>
                ) : !eventosInscritos || eventosInscritos.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center h-[60vh] w-full p-18">
                        <FontAwesomeIcon icon={['fas', 'calendar-times']} className="text-escom-sombra-400 text-9xl mx-auto my-10" />
                        <p className="p-4 text-3xl font-semibold text-escom-900">No tienes eventos inscritos.</p>
                    </div>
                ) : (
                    eventosInscritos.map((evento) => (
                        <TarjetaEvento 
                            key={evento.id_evento}
                            evento={evento}
                            onClickAbrirDetalles={abrirDetallesModal}
                        />
                    ))
                )}
                </div>
            </div>
        </>
    );
}

export default Eventos;