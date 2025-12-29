import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const BotonesAccion = ({
    tipoUsuario = 'default', // 'admin' | 'alumno' | 'organizador' | 'default'
    estaEditando,
    setEstaEditando,
    isLoading,
    isInscrito,
    paginaAlumno,
    eventoSeleccionado,
    onVerificar,
    onEliminar,
    setModalInscribir,
    setModalCancelar,
    setModalEliminar
}) => {
    const esAdmin = tipoUsuario === 'admin';
    const esAlumno = tipoUsuario === 'alumno';
    const esOrganizador = tipoUsuario === 'organizador';
    const esDefault = tipoUsuario === 'default';

    return (
        <div className="col-span-full flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {/* Botones para usuarios no autenticados (default) */}
            {esDefault && (
                <>
                    <Link 
                        to="/login"
                        className="flex items-center justify-center gap-2 bg-escom-600 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                    >
                        <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
                        Iniciar Sesión
                    </Link>
                    <Link 
                        to="/actividades-eventos/explorar"
                        className="flex items-center justify-center gap-2 bg-escom-900 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                    >
                        <FontAwesomeIcon icon={['fas', 'compass']} />
                        Ver más eventos
                    </Link>
                </>
            )}

            {/* Botón Verificar (Admin) */}
            {esAdmin && onVerificar && (
                <button 
                    type="button"
                    onClick={onVerificar}
                    disabled={eventoSeleccionado.estado === 'Verificado'}
                    className={`flex items-center justify-center gap-2 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
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

            {/* Botón Editar (Solo organizador, no editando) */}
            {esOrganizador && !estaEditando && (
                <button 
                    type="button"
                    onClick={() => setEstaEditando(true)}
                    className="flex items-center justify-center gap-2 bg-escom-600 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                >
                    <FontAwesomeIcon icon={['fas', 'edit']} />
                    Editar
                </button>
            )}

            {/* Botones Guardar/Cancelar (Solo organizador, editando) */}
            {esOrganizador && estaEditando && (
                <>
                    <button 
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-escom-600 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                    >
                        <FontAwesomeIcon icon={['fas', 'save']} />
                        Guardar Cambios
                    </button>
                    <button 
                        type="button"
                        onClick={() => setEstaEditando(false)}
                        className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                    >
                        <FontAwesomeIcon icon={['fas', 'times']} />
                        Cancelar
                    </button>
                </>
            )}

            {/* Botón Eliminar (Admin y Organizador) */}
            {(onEliminar && (esAdmin || esOrganizador)) && (
                <button 
                    type="button"
                    onClick={() => setModalEliminar(true)}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-escom-900 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
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

            {/* Botón Inscribirse (Alumno, no inscrito) */}
            {esAlumno && !isInscrito && (
                <button 
                    type="button"
                    onClick={() => setModalInscribir(true)}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-escom-900 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base w-full"
                >
                    <FontAwesomeIcon icon={['fas', 'check-circle']} />
                    Inscribirse
                </button>
            )}

            {/* Botón Administrar Inscripción (Alumno, inscrito, no página alumno) */}
            {esAlumno && isInscrito && !paginaAlumno && (
                <Link 
                    to={`/alumno/mis-eventos`}
                    className="flex items-center justify-center gap-2 bg-escom-900 hover:bg-escom-700 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base w-full"
                > 
                    <FontAwesomeIcon icon={['fas', 'cog']} />
                    Administrar Inscripción
                </Link>
            )}

            {/* Botón Desinscribirse (Alumno, inscrito, página alumno) */}
            {esAlumno && isInscrito && paginaAlumno && (
                <button 
                    type="button"
                    onClick={() => setModalCancelar(true)}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-escom-600 hover:bg-escom-400 hover:shadow-lg text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base w-full"
                >
                    <FontAwesomeIcon icon={['fas', 'close']} />
                    Desinscribirse
                </button>
            )}
        </div>
    );
};

export default BotonesAccion;
