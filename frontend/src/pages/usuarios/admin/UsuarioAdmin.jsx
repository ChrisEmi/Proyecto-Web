import { useAdmin } from "../../../api/Context/AdminContext";
import { useEventos } from "../../../api/Context/EventosContext";
import { useState, useMemo } from "react";
import CustomSelect from "../../../components/assets/cutoms-campos/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { createPortal } from "react-dom";
import ModalDetallesEvento from "../../../components/assets/modals/ModalDetallesEvento";
import { useAnimacionesEventos } from "../../../hooks/useAnimacionesEventos";

const UsuariosAdmin = () => { 
    const { usuarios, obtnerUsuarios, banearUsuario, perfilUsuario, obtenerEventosPorUsuario, obtenerEventosOrganizador } = useAdmin();
    const { obtenerEventoPorId } = useEventos();
    const [filtroTipoUsuario, setFiltroTipoUsuario] = useState("");
    const [ordenarNombre, setOrdenarNombre] = useState("nombre");
    const [direccionOrdenamiento, setDireccionOrdenamiento] = useState("ASC");
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [eventosUsuario, setEventosUsuario] = useState(null);
    
    const [modalUsuario, setModalUsuario] = useState(false);
    
    // Estado para el modal de detalles del evento
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);

    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const opciones = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-MX', opciones);
    };

    useGSAP(() => {
        gsap.fromTo(".container-usuarios > div, .container-usuarios table",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut"});
    }, []);

    const manejarFiltroTipoUsuario = async (valor) => {
        setIsLoading(true);
        setFiltroTipoUsuario(valor);
        await obtnerUsuarios(valor, ordenarNombre, direccionOrdenamiento);
        setIsLoading(false);
    };

    const botonUsuario = async (idUsuario) => {
        const datosUsuario = await perfilUsuario(idUsuario);
        setUsuario(datosUsuario);
        setEventosUsuario(null);
        setModalUsuario(true);
        console.log(datosUsuario);
    };

    const botonBanear = async (idUsuario, estadoActual) => {
        const nuevoEstado = estadoActual === 'Activo' ? 'Desactivado' : 'Activo';
        setIsLoading(true);
        await banearUsuario(idUsuario, nuevoEstado);
        await actualizarLista();
        setIsLoading(false);
    };

    const botonEventos = async (idUsuario) => {
        setUsuario(null);
        
        switch (usuarios.find(u => u.id_usuario === idUsuario).nombre_tipo) {
            case 'Organizador': {
                const eventosOrg = await obtenerEventosOrganizador(idUsuario);
                setEventosUsuario(eventosOrg || []);
                break;
            }
            case 'Estudiante': {
                const eventos = await obtenerEventosPorUsuario(idUsuario);
                setEventosUsuario(eventos || []);
                break;
            }
            default:
                setEventosUsuario([]);
                console.log("El usuario no tiene eventos asociados.");
        }
        setModalUsuario(true);
    };


    const manejarOrdenamiento = async (valor) => {
        setIsLoading(true);
        setOrdenarNombre(valor);
        await obtnerUsuarios(filtroTipoUsuario, valor, direccionOrdenamiento);
        setIsLoading(false);
    };

    const manejarDireccion = async (valor) => {
        setIsLoading(true);
        setDireccionOrdenamiento(valor);
        await obtnerUsuarios(filtroTipoUsuario, ordenarNombre, valor);
        setIsLoading(false);
    };

    const actualizarLista = async () => {
        setIsLoading(true);
        await obtnerUsuarios(filtroTipoUsuario, ordenarNombre, direccionOrdenamiento);
        setIsLoading(false);
    };

    const usuariosFiltrados = useMemo(() => {
        if (!usuarios) return [];
        if (!busqueda.trim()) return usuarios;
        
        return usuarios.filter(usuario => 
            usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.apellido_paterno.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.apellido_materno?.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.correo.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [usuarios, busqueda]);

    // Funciones para el modal de detalles del evento
    const onClickAbrirDetalles = async (idEvento) => {
        const eventoData = await obtenerEventoPorId(idEvento);
        setEventoSeleccionado(eventoData[0]);
        setAbrirDetalles(true);
    };

    const cerrarModalDetalles = () => {
        cerrarModalAnimacion(() => {
            setAbrirDetalles(false);
            setEventoSeleccionado(null);
        });
    };

    useState(() => { 
        actualizarLista();
    }, []);
    
    return (
        <div className="flex flex-col gap-6 p-6 container-usuarios">
            {/* Modal de detalles del evento */}
            <ModalDetallesEvento
                abrirDetalles={abrirDetalles}
                eventoSeleccionado={eventoSeleccionado}
                onCerrar={cerrarModalDetalles}
                tipoUsuario="admin"
            />

            {modalUsuario && usuario && createPortal(
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
                        <div className={`px-6 py-4 `}>
                            <h2 className="text-2xl font-bold flex items-center text-escom-900">
                                <FontAwesomeIcon icon={['fas', 'user-circle']} className="mr-3 text-3xl" />
                                Perfil de Usuario
                            </h2>
                        </div>
                        
                        <div className="p-6">
                            {/* Avatar y nombre */}
                            <div className="flex flex-col items-center mb-6">
                                {usuario.foto_src ? (
                                    <img src={usuario.foto_src} alt="Foto de usuario" className={`rounded-full w-28 h-28 object-cover border-4 ${
                                        usuario.nombre_tipo === 'Organizador' ? 'border-yellow-200' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'border-purple-200' :
                                        'border-blue-200'
                                    }`} />
                                ) : (
                                    <div className={`w-28 h-28 rounded-full flex items-center justify-center ${
                                        usuario.nombre_tipo === 'Organizador' ? 'bg-yellow-100' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'bg-purple-100' :
                                        'bg-blue-100'
                                    }`}>
                                        <FontAwesomeIcon icon={['fas', 'user']} className={`text-5xl ${
                                            usuario.nombre_tipo === 'Organizador' ? 'text-yellow-400' :
                                            usuario.nombre_tipo === 'Estudiante' ? 'text-purple-400' :
                                            'text-blue-400'
                                        }`} />
                                    </div>
                                )}
                                <h3 className="font-bold text-2xl text-gray-800 mt-3">{usuario.nombre}</h3>
                                <p className="text-gray-500 font-medium">{usuario.apellido_paterno} {usuario.apellido_materno}</p>
                            </div>

                            {/* Información en grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className={`font-semibold text-sm flex items-center mb-1 ${
                                        usuario.nombre_tipo === 'Organizador' ? 'text-yellow-600' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'text-purple-600' :
                                        'text-blue-600'
                                    }`}>
                                        <FontAwesomeIcon icon={['fas', 'envelope']} className="mr-2" />
                                        Correo Electrónico
                                    </p>
                                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium truncate">{usuario.correo}</p>
                                </div>
                                <div>
                                    <p className={`font-semibold text-sm flex items-center mb-1 ${
                                        usuario.nombre_tipo === 'Organizador' ? 'text-yellow-600' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'text-purple-600' :
                                        'text-blue-600'
                                    }`}>
                                        <FontAwesomeIcon icon={['fas', 'phone']} className="mr-2" />
                                        Teléfono
                                    </p>
                                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium">{usuario.telefono || 'No disponible'}</p>
                                </div>
                                <div>
                                    <p className={`font-semibold text-sm flex items-center mb-1 ${
                                        usuario.nombre_tipo === 'Organizador' ? 'text-yellow-600' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'text-purple-600' :
                                        'text-blue-600'
                                    }`}>
                                        <FontAwesomeIcon icon={['fas', 'id-badge']} className="mr-2" />
                                        Tipo de Usuario
                                    </p>
                                    <p className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                                        usuario.nombre_tipo === 'Organizador' ? 'bg-yellow-100 text-yellow-700' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'bg-purple-100 text-purple-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>{usuario.nombre_tipo || 'No disponible'}</p>
                                </div>
                                <div>
                                    <p className={`font-semibold text-sm flex items-center mb-1 ${
                                        usuario.nombre_tipo === 'Organizador' ? 'text-yellow-600' :
                                        usuario.nombre_tipo === 'Estudiante' ? 'text-purple-600' :
                                        'text-blue-600'
                                    }`}>
                                        <FontAwesomeIcon icon={['fas', 'circle-check']} className="mr-2" />
                                        Estado
                                    </p>
                                    <p className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                                        usuario.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>{usuario.estado || 'No disponible'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 flex justify-end">
                            <button
                                className={`text-white px-5 py-2 rounded-lg font-medium transition-colors bg-escom-900 hover:bg-escom-700`}
                                onClick={() => setModalUsuario(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
            {modalUsuario && eventosUsuario !== null && !usuario && createPortal(
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden max-h-[80vh] overflow-y-auto p-6">
                        <div className={`px-6 py-6 `}>
                            <h2 className="text-2xl font-bold flex items-center text-escom-900">
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="mr-3 text-3xl" />
                                Evento del Usuario
                            </h2>
                        </div>
                        {eventosUsuario?.length > 0 ? (
                            <div className="space-y-3">
                                {eventosUsuario.map(evento => (
                                    <div key={evento.id_evento} className="bg-escom-50 rounded-xl p-4 border border-escom-100 relative">
                                        <p className="font-semibold text-escom-900 max-w-[160px] truncate md:max-w-[320px] md:truncate-none mb-1 text-lg">{evento.titulo_evento}</p>
                                        <p className="text-md text-escom-600 font-medium">
                                            <FontAwesomeIcon icon={['fas', 'tag']} className="mr-1" />
                                            {evento.nombre_categoria}
                                        </p>
                                        {evento.fecha_inscripcion && (
                                            <p className="text-sm text-escom-500 mt-1 font-light">
                                                <FontAwesomeIcon icon={['fas', 'calendar-check']} className="mr-1" />
                                                Inscrito: <span className="uppercase">{new Date(evento.fecha_inscripcion).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            </p>
                                        )}
                                        <button 
                                            className="absolute top-1/2 -translate-y-1/2 right-6 bg-escom-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-escom-600 transition-colors"
                                            onClick={() => {
                                                setModalUsuario(false);
                                                onClickAbrirDetalles(evento.id_evento);
                                            }}
                                        >Ver Evento</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-escom-500">
                                <FontAwesomeIcon icon={['fas', 'calendar-xmark']} className="text-4xl mb-2" />
                                <p>No hay eventos asociados</p>
                            </div>
                        )}
                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-escom-500 text-white px-4 py-2 rounded-xl hover:bg-escom-600 transition-colors"
                                onClick={() => { setModalUsuario(false); setEventosUsuario(null); }}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-escom-sombra-400">Administración de Usuarios</h1>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-lg ">
                <table className="w-full table-auto max-h-[700px] min-h-[300px] text-center">
                    <thead className="text-escom-sombra-600">
                        <tr>
                            <th colSpan="7" className="p-4">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="relative flex-1 max-w-md bg-white rounded-xl shadow-md">
                                        <FontAwesomeIcon 
                                            icon={['fas', 'search']} 
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-sombra-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Buscar por nombre, apellido o correo..."
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-transparent focus:border-escom-sombra-200 focus:outline-none text-gray-800 font-semibold"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <CustomSelect
                                            value={filtroTipoUsuario}
                                            onChange={manejarFiltroTipoUsuario}
                                            options={[
                                                { value: "", label: "Todos", icon: "users" },
                                                { value: "Administrador", label: "Administrador", icon: "user-shield" },
                                                { value: "Organizador", label: "Organizador", icon: "user-tie" },
                                                { value: "Estudiante", label: "Estudiante", icon: "user-graduate" }
                                            ]}
                                            placeholder="Tipo de Usuario"
                                            color="escom-900"
                                        />
                                        
                                        <CustomSelect
                                            value={ordenarNombre}
                                            onChange={manejarOrdenamiento}
                                            options={[
                                                { value: "nombre", label: "Nombre", icon: "user" },
                                                { value: "apellido_paterno", label: "Apellido", icon: "user"}
                                            ]}
                                            placeholder="Ordenar por"
                                            color="escom-900"
                                        />
                                        
                                        <CustomSelect
                                            value={direccionOrdenamiento}
                                            onChange={manejarDireccion}
                                            options={[
                                                { value: "ASC", label: "Ascendente", icon: "arrow-up-wide-short" },
                                                { value: "DESC", label: "Descendente", icon: "arrow-down-wide-short" }
                                            ]}
                                            placeholder="Dirección"
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
                            </th>
                        </tr>
                        <tr className="">
                            <th className="p-4 font-medium text-sm">
                                <FontAwesomeIcon icon={['fas', 'user']} className="mr-2 text-escom-500" />
                                Usuario
                            </th>
                            <th className="p-4 font-medium text-sm">
                                <FontAwesomeIcon icon={['fas', 'user-tag']} className="mr-2 text-escom-500" />
                                Tipo Usuario
                            </th>
                            <th className="p-4 font-medium text-sm text-left">
                                <FontAwesomeIcon icon={['fas', 'user']} className="mr-2 text-escom-500" />
                                Nombre Completo
                            </th>
                            <th className="p-4 font-medium text-sm text-left">
                                <FontAwesomeIcon icon={['fas', 'envelope']} className="mr-2 text-escom-500" />
                                Correo
                            </th>
                            <th className="p-4 font-medium text-sm">
                                <FontAwesomeIcon icon={['fas', 'user-tag']} className="mr-2 text-escom-500" />
                                Fecha de Registro
                            </th>
                            <th className="p-4 font-medium text-sm">
                                <FontAwesomeIcon icon={['fas', 'circle-check']} className="mr-2 text-escom-500" />
                                Estado
                            </th>
                            <th className="p-4 font-medium text-sm">
                                <FontAwesomeIcon icon={['fas', 'gear']} className="mr-2 text-escom-500" />
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="p-50 text-center">
                                    <FontAwesomeIcon icon={['fas', 'spinner']} className="text-4xl text-escom-sombra-400 animate-spin" />
                                    <p className="mt-4 text-gray-600">Cargando usuarios...</p>
                                </td>
                            </tr>
                        ) : usuariosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-20 text-center">
                                    <FontAwesomeIcon icon={['fas', 'users-slash']} className="text-6xl text-gray-300 mb-4" />
                                    <p className="text-gray-600 text-xl">No se encontraron usuarios</p>
                                </td>
                            </tr>
                        ) : usuariosFiltrados.map((usuario, index) => (
                            <tr key={usuario.id_usuario} className={`${index % 2 === 0 ? 'bg-white' : ''} hover:bg-escom-50 transition-colors text-left`}>
                                <td className="p-4 text-center">
                                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold bg-escom-100 text-escom-700`}>
                                        {usuario.id_usuario}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${usuario.nombre_tipo === 'Administrador' ? 'bg-blue-100 text-blue-700' : usuario.nombre_tipo === 'Organizador' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-purple-700'}`}>
                                        <FontAwesomeIcon icon={['fas', usuario.nombre_tipo === 'Administrador' ? 'user-shield' : usuario.nombre_tipo === 'Organizador' ? 'user-tie' : 'user-graduate']} />
                                        {usuario.nombre_tipo}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${usuario.nombre_tipo === 'Administrador' ? 'bg-blue-500 ' : usuario.nombre_tipo === 'Organizador' ? 'bg-yellow-500' : 'bg-purple-500'}`}>
                                            {usuario.nombre?.charAt(0)}{usuario.apellido_paterno?.charAt(0)}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-escom-900">{usuario.nombre}</p>
                                            <p className="text-escom-500 text-sm">{usuario.apellido_paterno} {usuario.apellido_materno}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 text-left">
                                    <a href={`mailto:${usuario.correo}`} className="hover:text-escom-600 hover:underline transition-colors">
                                        {usuario.correo}
                                    </a>
                                </td>
                                <td className="text-center uppercase">
                                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold bg-escom-600/80 text-escom-100">
                                        <FontAwesomeIcon icon={['far', 'calendar']} />
                                        {formatearFecha(usuario.fecha_creacion)}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${usuario.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <span className={`w-2 h-2 rounded-full ${usuario.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2 justify-center">
                                        <button 
                                            className="p-2 text-escom-sombra-100 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Usuario"
                                            onClick={() => botonUsuario(usuario.id_usuario)}
                                        >
                                            <FontAwesomeIcon icon={['far', 'user']} />
                                        </button>
                                        {usuario.nombre_tipo !== 'Administrador' &&
                                            <button 
                                                className="p-2 text-escom-700 hover:bg-gray-50 rounded-lg transition-colors"
                                                title="Ver eventos"
                                                onClick={() => botonEventos(usuario.id_usuario)}
                                            >
                                                <FontAwesomeIcon icon={['far', 'calendar']} />
                                            </button>
                                        }
                                        <button 
                                            className={`p-2 rounded-lg transition-colors ${
                                                usuario.estado === 'Activo' 
                                                ? 'text-escom-600 hover:bg-red-50' 
                                                : 'text-escom-300 hover:bg-green-50'
                                                }`}
                                            onClick={() => botonBanear(usuario.id_usuario, usuario.estado)}
                                            title={usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                                        >
                                            <FontAwesomeIcon icon={['fas', usuario.estado === 'Activo' ? 'ban' : 'check']} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}
export default UsuariosAdmin;
