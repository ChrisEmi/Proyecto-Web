import { useAdmin } from "../../../api/Context/AdminContext";
import { useState, useMemo } from "react";
import CustomSelect from "../../../components/assets/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const UsuariosAdmin = () => { 
    const { usuarios, obtnerUsuarios } = useAdmin();
    const [filtroTipoUsuario, setFiltroTipoUsuario] = useState("");
    const [ordenarNombre, setOrdenarNombre] = useState("nombre");
    const [direccionOrdenamiento, setDireccionOrdenamiento] = useState("ASC");
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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

    const stats = useMemo(() => {
        if (!usuarios) return { total: 0, admin: 0, org: 0, est: 0, activos: 0 };
        return {
            total: usuarios.length,
            admin: usuarios.filter(u => u.nombre_tipo === 'Administrador').length,
            org: usuarios.filter(u => u.nombre_tipo === 'Organizador').length,
            est: usuarios.filter(u => u.nombre_tipo === 'Estudiante').length,
            activos: usuarios.filter(u => u.estado === 'Activo').length,
            desactivados: usuarios.filter(u => u.estado === 'Desactivado').length
        };
    }, [usuarios]);

    useState(() => { 
        actualizarLista();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-6 container-usuarios">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-escom-sombra-400">Administración de Usuarios</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-escom-sombra-100 to-escom-600/50 rounded-xl p-4 text-escom-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Total</p>
                            <p className="text-3xl font-bold">{stats.total}</p>
                        </div>
                        <FontAwesomeIcon icon={['fas', 'users']} className="text-3xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-gray-300 to-escom-600/50 rounded-xl p-4 text-escom-sombra-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Admins</p>
                            <p className="text-3xl font-bold">{stats.admin}</p>
                        </div>
                        <FontAwesomeIcon icon={['fas', 'user-shield']} className="text-3xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-300 to-escom-600/50 rounded-xl p-4 text-escom-sombra-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Organizadores</p>
                            <p className="text-3xl font-bold">{stats.org}</p>
                        </div>
                        <FontAwesomeIcon icon={['fas', 'user-tie']} className="text-3xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-300 to-escom-600/50 rounded-xl p-4 text-escom-sombra-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Estudiantes</p>
                            <p className="text-3xl font-bold">{stats.est}</p>
                        </div>
                        <FontAwesomeIcon icon={['fas', 'user-graduate']} className="text-3xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-300 to-escom-600/50 rounded-xl p-4 text-escom-sombra-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Activos</p>
                            <p className="text-3xl font-bold">{stats.activos}</p>
                        </div>
                        <FontAwesomeIcon icon={['fas', 'check-circle']} className="text-3xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-red-300 to-escom-600/50 rounded-xl p-4 text-escom-sombra-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Desactivados</p>
                            <p className="text-3xl font-bold">{stats.desactivados}</p>
                        </div>
                        <FontAwesomeIcon icon={['fas', 'times-circle']} className="text-3xl opacity-50" />
                    </div>
                </div>
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
                            <th className="p-4 font-medium text-sm">Tipo Usuario</th>
                            <th className="p-4 font-medium text-sm">Nombre</th>
                            <th className="p-4 font-medium text-sm">Apellido Paterno</th>
                            <th className="p-4 font-medium text-sm">Apellido Materno</th>
                            <th className="p-4 font-medium text-sm">Correo</th>
                            <th className="p-4 font-medium text-sm">Estado</th>
                            <th className="p-4 font-medium text-sm">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="p-50 text-center">
                                    <FontAwesomeIcon icon={['fas', 'spinner']} className="text-4xl text-escom-sombra-400 animate-spin" />
                                    <p className="mt-4 text-gray-600">Cargando usuarios...</p>
                                </td>
                            </tr>
                        ) : usuariosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-20 text-center">
                                    <FontAwesomeIcon icon={['fas', 'users-slash']} className="text-6xl text-gray-300 mb-4" />
                                    <p className="text-gray-600 text-xl">No se encontraron usuarios</p>
                                </td>
                            </tr>
                        ) : usuariosFiltrados.map((usuario, index) => (
                            <tr key={usuario.id_usuario} className={`${index % 2 === 0 ? 'bg-white' : ''} hover:bg-escom-50 transition-colors`}>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${usuario.nombre_tipo === 'Administrador' ? 'bg-blue-100 text-blue-700' : usuario.nombre_tipo === 'Organizador' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-purple-700'}`}>
                                        {usuario.nombre_tipo}
                                    </span>
                                </td>
                                <td className="p-4 font-medium text-gray-800">{usuario.nombre}</td>
                                <td className="p-4 text-gray-600">{usuario.apellido_paterno}</td>
                                <td className="p-4 text-gray-600">{usuario.apellido_materno}</td>
                                <td className="p-4 text-gray-600">{usuario.correo}</td>

                                <td className="p-4 text-center">
                                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${usuario.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <span className={`w-2 h-2 rounded-full ${usuario.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2 justify-center">
                                        <button 
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Editar usuario"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'pen-to-square']} />
                                        </button>
                                        <button 
                                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                            title="Ver detalles"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                        </button>
                                        <button 
                                            className={`p-2 rounded-lg transition-colors ${
                                                usuario.estado === 'Activo' 
                                                ? 'text-red-600 hover:bg-red-50' 
                                                : 'text-green-600 hover:bg-green-50'
                                            }`}
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
