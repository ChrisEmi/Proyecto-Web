import CustomSelect from "../../../components/assets/cutoms-campos/CustomSelect";
import { useOrganizador } from "../../../api/Context/OrganizadorContext.jsx";
import { Link } from "react-router-dom";
import { useEventos } from "../../../api/Context/EventosContext.jsx";
import { useEffect, useState } from "react";
import ModalDetallesEvento from "../../../components/assets/modals/ModalDetallesEvento.jsx";
import ModalConfirmacion from "../../../components/assets/modal-evento/ModalConfirmacion.jsx";
import { VistaCarga } from "../../../components/layout/LoopCarga.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TarjetaEvento } from "../../../components/assets/decoraciones/TarjetaEvento.jsx";
import { useAnimacionesEventos } from "../../../hooks/useAnimacionesEventos.js";
import { createPortal } from "react-dom";

const Eventos = () => {
    const { obtenerEventoPorId } = useEventos();
    const { eventosOrganizados, obtenerEventosPorOrganizador, errors: errores, actualizarEvento, inscripciones, obtenerInscripcionesPorEvento, enviarAvisosProximosEventos, marcarEventoComoPasado } = useOrganizador();
    const { eliminarEvento } = useEventos();
    const [ordenarPor, setOrdenarPor] = useState('fecha_creacion');
    const [direccion, setDireccion] = useState('DESC');
    const [isLoading, setIsLoading] = useState(false);
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [estaEditando, setEstaEditando] = useState(false);
    const [modalInscritos, setModalInscritos] = useState(false);
    const [modalConfirmacionNotificacion, setModalConfirmacionNotificacion] = useState(false);
    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);
    const [eventoInscripcionado, setEventoInscripcionado] = useState(null);
    const [modalMarcarComoPasado, setModalMarcarComoPasado] = useState(false);

    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const opciones = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-MX', opciones);
    };

    const formatearFechaHora = (fecha) => {
        if (!fecha) return '';
        const opciones = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(fecha).toLocaleDateString('es-MX', opciones);
    };

    useGSAP(() => {
        gsap.fromTo(".container > div", 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut"});;
    })

    const cerrarModal = () => {
        cerrarModalAnimacion(() => {
            setAbrirDetalles(false);
            setEventoSeleccionado(null);
            setEstaEditando(false);
        });
    }

    

    const manejarOrdenarPor = (value) => {
        setOrdenarPor(value);
    }
    const manejarDireccion = (value) => {
        setDireccion(value);
    }
    const actualizarLista = async () => {
        setIsLoading(true);
        await obtenerEventosPorOrganizador(ordenarPor, direccion);
        setIsLoading(false);
    }

    const enviarAvisos = async () => {
        setIsLoading(true);
        await enviarAvisosProximosEventos(eventoSeleccionado.id_evento);
        setIsLoading(false);
        setModalConfirmacionNotificacion(false);
    }

    const actualizarEventoComoPasado = async () => {
        setIsLoading(true);
        const resultado = await marcarEventoComoPasado(eventoSeleccionado.id_evento);
        setIsLoading(false);
        if(resultado && resultado.status === 'success') {
            await obtenerEventosPorOrganizador(ordenarPor, direccion);
            cerrarModal();
        }
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

    const onClickAbrirInscritos = async (id_evento) => {
        await obtenerInscripcionesPorEvento(id_evento);
        const evento = await obtenerEventoPorId(id_evento);
        setEventoSeleccionado(evento[0]);
        setEventoInscripcionado(evento[0]);
        setModalInscritos(true);
    }

    const guardarCambios = async (formData) => {
        console.log("formData recibido en guardarCambios:", formData);
        const formatearFecha = (fechaInput) => {
            if (!fechaInput) return null;
            if (fechaInput.includes('.')) {
                return fechaInput.split('.')[0];
            }
            return fechaInput.replace('T', ' ') + ':00';
        };
        const datosParaEnviar = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
            fecha: formatearFecha(formData.fecha),
            fecha_final: formatearFecha(formData.fecha_final)
        };
        console.log("datosParaEnviar:", datosParaEnviar);
        
        setIsLoading(true);
        const actualizado = await actualizarEvento(eventoSeleccionado.id_evento, datosParaEnviar);
        if (actualizado) {
            await obtenerEventosPorOrganizador(ordenarPor, direccion);
            cerrarModal();
        }
        setIsLoading(false);
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
                    isLoading={isLoading}
                    onGuardar={guardarCambios}
                    onEliminar={eliminarEventoSeleccionado}
                    actualizarEventoComoPasado={actualizarEventoComoPasado}
                    tipoUsuario="organizador"
                />
            )}

            {modalConfirmacionNotificacion && (
                <ModalConfirmacion
                    isOpen={modalConfirmacionNotificacion}
                    onClose={() => setModalConfirmacionNotificacion(false)}
                    onConfirm={enviarAvisos}
                    titulo="Enviar notificaciones"
                    mensaje={`¿Estás seguro de que deseas enviar notificaciones a todos los inscritos del evento "${eventoSeleccionado?.titulo_evento}"?`}
                    icono="fa-solid fa-envelope"
                    textoConfirmar="Enviar"
                    textoCancelar="Cancelar"
                />
            )}

            {modalInscritos && createPortal(
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className=" p-6 md:p-8">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-escom-900">
                                    <div className="">
                                        <FontAwesomeIcon icon={['fas', 'users']} className=" text-4xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold ">
                                            Inscritos al Evento
                                        </h2>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setModalInscritos(false)}
                                    className="text-escom-900/80 hover:text-white p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                                >
                                    <FontAwesomeIcon icon={['fas', 'times']} size="xl" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1">
                            {inscripciones.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="bg-escom-100 p-6 rounded-full mb-4">
                                        <FontAwesomeIcon icon={['fas', 'user-slash']} className="text-escom-400 text-4xl" />
                                    </div>
                                    <p className="text-escom-sombra-400 text-xl font-semibold">No hay inscritos</p>
                                    <p className="text-escom-400 text-sm mt-2">Los participantes aparecerán aquí cuando se registren</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Info Cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-escom-900 to-escom-800 p-5 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-escom-200 text-sm font-medium">Evento</p>
                                                    <p className="text-white font-bold text-lg mt-1 truncate max-w-[180px]">{eventoSeleccionado?.titulo_evento}</p>
                                                </div>
                                                <div className="p-3">
                                                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="text-escom-300 text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-escom-300 to-escom-200 p-5 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-escom-700 text-sm font-medium">Fecha</p>
                                                    <p className="text-escom-900 font-bold text-lg mt-1">{formatearFecha(eventoSeleccionado?.fecha)}</p>
                                                </div>
                                                <div className="p-3">
                                                    <FontAwesomeIcon icon={['fas', 'clock']} className="text-escom-700 text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-escom-sombra-300 p-5 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-escom-200 text-sm font-medium">Ubicación</p>
                                                    <p className="text-white font-bold text-lg mt-1 truncate max-w-[180px]">{eventoSeleccionado?.ubicacion}</p>
                                                </div>
                                                <div className="p-3">
                                                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="text-escom-200 text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-escom-600 p-5 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-escom-200 text-sm font-medium">Total Inscritos</p>
                                                    <p className="text-white font-bold text-3xl mt-1">{inscripciones.length}</p>
                                                </div>
                                                <div className="p-3">
                                                    <FontAwesomeIcon icon={['fas', 'users']} className="text-white text-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="bg-white rounded-2xl shadow-lg border border-escom-100 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full table-auto text-sm md:text-base">
                                                <thead>
                                                    <tr className="bg-escom-100">
                                                        <th className="px-4 py-4 text-left font-semibold text-escom-900">
                                                            <FontAwesomeIcon icon={['fas', 'id-badge']} className="mr-2 text-escom-500" />
                                                            Usuario
                                                        </th>
                                                        <th className="px-4 py-4 text-left font-semibold text-escom-900">
                                                            <FontAwesomeIcon icon={['fas', 'user']} className="mr-2 text-escom-500" />
                                                            Nombre Completo
                                                        </th>
                                                        <th className="px-4 py-4 text-left font-semibold text-escom-900">
                                                            <FontAwesomeIcon icon={['fas', 'envelope']} className="mr-2 text-escom-500" />
                                                            Correo
                                                        </th>
                                                        <th className="px-4 py-4 text-left font-semibold text-escom-900">
                                                            <FontAwesomeIcon icon={['fas', 'calendar-check']} className="mr-2 text-escom-500" />
                                                            Fecha Inscripción
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-escom-100">
                                                    {inscripciones.map((inscrito) => (
                                                        <tr key={inscrito.id_usuario} className="hover:bg-escom-50/50 transition-colors">
                                                            <td className="px-4 py-4">
                                                                <span className="inline-flex items-center px-3 py-1.5 bg-escom-200 rounded-full text-escom-800 text-xs font-mono font-medium">
                                                                    {inscrito.id_usuario}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-gradient-to-br from-escom-500 to-escom-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                                        {inscrito.nombre?.charAt(0)}{inscrito.apellido_paterno?.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-escom-900">{inscrito.nombre}</p>
                                                                        <p className="text-escom-500 text-sm">{inscrito.apellido_paterno} {inscrito.apellido_materno}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <a href={`mailto:${inscrito.correo}`} className="text-escom-900 hover:text-escom-800 hover:underline transition-colors">
                                                                    {inscrito.correo}
                                                                </a>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <span className="inline-flex items-center gap-2 text-escom-900 uppercase bg-escom-100 px-3 py-1.5 rounded-full text-xs font-medium">
                                                                    <FontAwesomeIcon icon={['fas', 'clock']} className="text-escom-400 text-xs" />
                                                                    {formatearFechaHora(inscrito.fecha_inscripcion)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {(eventoInscripcionado?.estado === 'Verificado') && (
                                        <div className="flex justify-center">
                                                <button className="bg-escom-700 px-4 py-2 rounded-full text-white font-semibold" onClick={() => setModalConfirmacionNotificacion(true)}>
                                                <FontAwesomeIcon icon={['far', 'envelope']} className="mr-2" />
                                                Enviar Notificaciones
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.getElementById('root')
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
                <div className="bg-white/100 rounded-2xl flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4  shadow-2xl overflow-y-auto">
                    {errores && (
                        <div className="p-4 bg-red-100 rounded-lg">
                            {Array.isArray(errores) ? (
                                errores.map((error, index) => (
                                    <p key={index} className="text-red-600">{error}</p>
                                ))
                            ) : (
                                <p className="text-red-600">{errores}</p>
                            )}
                        </div>
                )}
                {eventosOrganizados?.length === 0 || !eventosOrganizados ? (
                    <div className="flex flex-col items-center justify-center min-h-[38rem] w-full shadow-2xl rounded-2xl p-10 text-escom-sombra-400 ">
                        <FontAwesomeIcon icon={['fas', 'calendar-times']} className="text-9xl mx-auto " />
                        <p className="p-4 font-bold text-3xl">No tienes eventos</p>
                        <Link 
                            to="/organizador/crear-evento" 
                                className="mt-4 inline-block bg-escom-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-escom-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                            Crear evento
                        </Link>
                        
                    </div>
                ) : (
                    eventosOrganizados?.map((evento) => (
                        <TarjetaEvento 
                            key={evento.id_evento}
                            evento={evento}
                            onClickAbrirDetalles={onClickAbrirDetalles}
                            tipoUsuario="organizador"
                            onClickAbrirInscritos={() => onClickAbrirInscritos(evento.id_evento)}
                        />
                    ))
                )}
                </div>
            </div>
        </>
    );
}

export default Eventos;