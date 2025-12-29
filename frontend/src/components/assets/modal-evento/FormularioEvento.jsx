import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../cutoms-campos/CustomSelect";
import CampoFormulario from "./CampoFormulario";
import BotonesAccion from "./BotonesAccion";

const FormularioEvento = ({
    eventoSeleccionado,
    estaEditando,
    setEstaEditando,
    categoria,
    isLoading,
    tipoUsuario = 'default', // 'admin' | 'alumno' | 'organizador' | 'default'
    paginaAlumno,
    isInscrito,
    register,
    handleSubmit,
    formErrors,
    redondearFecha,
    onVerificar,
    onSubmitForm,
    setModalInscribir,
    setModalCancelar,
    setModalEliminar,
    onEliminar
}) => {
    const tieneImagenes = eventoSeleccionado.imagenes && eventoSeleccionado.imagenes.length > 0;

    return (
        <div className={`${tieneImagenes ? "lg:col-span-1" : "lg:col-span-2 items-center w-full"} bg-white rounded-2xl shadow-2xl w-full mx-auto max-w-5xl max-h-[50vh] lg:max-h-[85vh] overflow-y-auto p-4 md:p-6`}>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full" onSubmit={handleSubmit(onSubmitForm)}>
                {/* Título del formulario */}
                <div className="col-span-full flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-escom-900">
                        {paginaAlumno ? 'Detalles del Evento' : (estaEditando ? 'Editar Evento' : 'Detalles del Evento')}
                    </h2>
                </div>

                {/* Título del Evento */}
                <CampoFormulario
                    label="Título del Evento"
                    icon="heading"
                    colSpan="col-span-2"
                >
                    <input 
                        type="text" 
                        {...register("titulo_evento")}
                        defaultValue={eventoSeleccionado.titulo_evento}
                        disabled={!estaEditando}
                        className={`w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                            estaEditando 
                                ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none text-escom-900 bg-blue-50/30' 
                                : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                        } font-bold`}
                    />
                </CampoFormulario>

                {/* ID del Evento */}
                <CampoFormulario
                    label="Id del Evento"
                    icon="id-badge"
                    colSpan="col-span-1"
                    extraLabelClass="mb-4"
                >
                    <span className="bg-escom-300 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-escom-sombra-700 text-xs md:text-sm font-semibold">
                        {eventoSeleccionado.id_evento}
                    </span>
                </CampoFormulario>

                {/* Descripción */}
                <CampoFormulario
                    label="Descripción"
                    icon="info-circle"
                    colSpan="col-span-full"
                >
                    <textarea 
                        {...register("descripcion")}
                        defaultValue={eventoSeleccionado.descripcion}
                        rows="4"
                        disabled={!estaEditando}
                        className={`w-full px-3 md:px-4 py-2 rounded-3xl text-sm md:text-base transition-all duration-200 ${
                            estaEditando 
                                ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                        } font-lg`}
                    />
                </CampoFormulario>

                {/* Etiquetas */}
                {eventoSeleccionado.tags && eventoSeleccionado.tags.length > 0 && (
                    <CampoFormulario
                        label="Etiquetas"
                        icon="tags"
                        colSpan="col-span-full"
                    >
                        <input 
                            type="text" 
                            {...register("tags")}
                            defaultValue={eventoSeleccionado.tags.join(', ')}
                            disabled={!estaEditando}
                            className={`w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                                estaEditando 
                                    ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                    : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                            } font-lg`}
                            placeholder="Separar por comas"
                        />
                    </CampoFormulario>
                )}

                {/* Fecha de Creación */}
                <CampoFormulario
                    label="Fecha de Creación"
                    icon="calendar"
                    colSpan="col-span-full md:col-span-1"
                >
                    <input 
                        type="text" 
                        defaultValue={new Date(eventoSeleccionado.fecha_creacion).toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        disabled
                        className="w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent font-lg"
                    />
                </CampoFormulario>

                {/* Fecha de Inicio */}
                <CampoFormulario
                    label="Fecha de Inicio"
                    icon="calendar-alt"
                    colSpan="col-span-full md:col-span-1"
                >
                    <input 
                        type="datetime-local" 
                        {...register("fecha", {
                            onChange: (e) => {
                                if (estaEditando) {
                                    const redondeado = redondearFecha(e.target.value);
                                    e.target.value = redondeado;
                                }
                            }
                        })}
                        defaultValue={eventoSeleccionado.fecha}
                        disabled={!estaEditando}
                        step="1800"
                        className={`w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                            estaEditando 
                                ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                        } font-lg`}
                    />
                    {formErrors.fecha && (
                        <p className="mt-1 text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
                            <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
                            Ingresa un valor válido.
                        </p>
                    )}
                </CampoFormulario>

                {/* Fecha de Fin */}
                <CampoFormulario
                    label="Fecha de Fin"
                    icon="calendar-check"
                    colSpan="col-span-full md:col-span-1"
                >
                    <input 
                        type="datetime-local" 
                        {...register("fecha_final", {
                            onChange: (e) => {
                                if (estaEditando) {
                                    const redondeado = redondearFecha(e.target.value);
                                    e.target.value = redondeado;
                                }
                            }
                        })}
                        defaultValue={eventoSeleccionado.fecha_final}
                        disabled={!estaEditando}
                        step="1800"
                        className={`w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                            estaEditando 
                                ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                        } font-lg`}
                    />
                </CampoFormulario>

                {/* Ubicación */}
                <CampoFormulario
                    label="Ubicación"
                    icon="map-marker-alt"
                    colSpan="col-span-full md:col-span-1"
                >
                    <input 
                        type="text" 
                        {...register("ubicacion")}
                        defaultValue={eventoSeleccionado.ubicacion}
                        disabled={!estaEditando}
                        className={`w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                            estaEditando 
                                ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                        } font-lg`}
                    />
                </CampoFormulario>

                {/* Cupo */}
                <CampoFormulario
                    label="Cupo"
                    icon="users"
                    colSpan="col-span-full md:col-span-1"
                >
                    <input 
                        type="number" 
                        {...register("cupo", { min: 1 })}
                        defaultValue={eventoSeleccionado.cupo}
                        disabled={!estaEditando}
                        className={`w-full px-3 md:px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                            estaEditando 
                                ? 'border-blue-400 border-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none font-medium text-escom-900 bg-blue-50/30' 
                                : 'border-transparent text-escom-sombra-300 cursor-not-allowed bg-transparent'
                        } font-lg`}
                    />
                </CampoFormulario>

                {/* Categoría */}
                <CampoFormulario
                    label="Categoría"
                    icon="tags"
                    colSpan="col-span-full md:col-span-1"
                >
                    <CustomSelect
                        label="Categoría:"
                        {...register("categoria")}
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
                </CampoFormulario>

                {/* Panel de Estado */}
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

                {/* Botones de Acción */}
                <BotonesAccion
                    tipoUsuario={tipoUsuario}
                    estaEditando={estaEditando}
                    setEstaEditando={setEstaEditando}
                    isLoading={isLoading}
                    isInscrito={isInscrito}
                    paginaAlumno={paginaAlumno}
                    eventoSeleccionado={eventoSeleccionado}
                    onVerificar={onVerificar}
                    onEliminar={onEliminar}
                    setModalInscribir={setModalInscribir}
                    setModalCancelar={setModalCancelar}
                    setModalEliminar={setModalEliminar}
                />
            </form>
        </div>
    );
};

export default FormularioEvento;
