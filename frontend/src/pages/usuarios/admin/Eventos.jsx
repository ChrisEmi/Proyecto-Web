import CustomSelect from "../../../components/assets/CustomSelect";
import ModalDetallesEvento from "../../../components/assets/ModalDetallesEvento.jsx";
import { VistaCarga } from "../../../components/layout/LoopCarga.jsx";
import { useEventos } from "../../../api/Context/EventosContext.jsx";
import { useAdmin } from "../../../api/Context/AdminContext.jsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAnimacionesEventos } from "../../../hooks/useAnimacionesEventos.js";
import { TarjetaEvento } from "../../../components/assets/TarjetaEvento.jsx";

const Eventos = () => {
    const { obtenerEventoPorId } = useEventos();
    const { obtenerEventos, eventos, verificarEvento, errors: errores, eliminarEvento, loading } = useAdmin();
    const [ordenarPor, setOrdenarPor] = useState('fecha_creacion');
    const [direccion, setDireccion] = useState('DESC');
    const [isLoading, setIsLoading] = useState(false);
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState([]);
    const [estaEditando, setEstaEditando] = useState(false);
    const [estado, setEstado] = useState('');

    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);

    const manejarOrdenarPor = (value) => {
        setOrdenarPor(value);
    }

    const manejarDireccion = (value) => {
        setDireccion(value);
    };

    const manejarEstado = (value) => {
        setEstado(value);
    }    

    const actualizarLista = async () => {
        setIsLoading(true);
        await obtenerEventos(ordenarPor, direccion);
        setIsLoading(false);
    }

    const eliminarEventoSeleccionado = async () => {
        setIsLoading(true);
        const resultado = await eliminarEvento(eventoSeleccionado.id_evento);
        if (resultado && resultado.status === 'success') {
            await obtenerEventos(ordenarPor, direccion);
            cerrarModal();
        }
        setIsLoading(false);
    };

    const guardarCambios = () => {
        setEstaEditando(false);
    };

    const cerrarModal = () => {
        cerrarModalAnimacion(() => {
            setAbrirDetalles(false);
            setEventoSeleccionado(null);
            setEstaEditando(false);
        });
    }

    const onClickAbrirDetalles = async (evento) => {
        const eventoData = await obtenerEventoPorId(evento);
        setEventoSeleccionado(eventoData[0]);
        setAbrirDetalles(true);
    }

    useEffect(() => {
        obtenerEventos(ordenarPor, direccion, estado);
    }, [ordenarPor, direccion, estado]);

    
    const onClickVerificarEvento = async () => { 
        if (!eventoSeleccionado) return;
        setIsLoading(true);
        await verificarEvento(eventoSeleccionado.id_evento);
        await obtenerEventos(ordenarPor, direccion);
        setAbrirDetalles(false);
        setIsLoading(false);
    }

    return (
        <>
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
                onVerificar={onClickVerificarEvento}
                esAdmin={true}
            />

            <div className="container min-w-full min-h-screen rounded-2xl shadow-2xl bg-white/40 flex flex-col gap-4 p-2 md:p-4 relative">
                
                <div className="md:sticky top-0 flex flex-col lg:flex-row items-center justify-between p-12 bg-white/40 rounded-xl gap-4 backdrop-blur-2xl z-10">
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-escom-sombra-400"><FontAwesomeIcon icon={['fas', 'calendar-alt']} /> Eventos Organizados</h1>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <CustomSelect
                            label="Ordenar por:"
                            options={[
                                { value: 'fecha', label: 'Fecha', icon: 'calendar' },
                                { value: 'fecha_creacion', label: 'Fecha de Creación', icon: 'clock' },
                                { value: 'titulo', label: 'Título', icon: 'list-ol' },
                                { value: 'ubicacion', label: 'Ubicación', icon: 'map-marker-alt' },
                                { value: 'organizador', label: 'Organizador', icon: 'user' },
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
                        <CustomSelect
                            label="Estado:"
                            options={[
                                { value: '', label: 'Todos', icon: 'list' },
                                { value: 'Verificado', label: 'Verificado', icon: 'check' },
                                { value: 'Pendiente de revision', label: 'No Verificado', icon: 'times' },
                                { value: 'Pasado', label: 'Pasado', icon: 'calendar-minus' },
                            ]}
                            value={estado}
                            onChange={manejarEstado}
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
                <div className="bg-white/100 rounded-2xl flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4 min-h-[80vh] shadow-2xl overflow-y-auto">
                    {errores && errores.length > 0 && (
                        <div className="p-4">
                            <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">{errores}</div>
                        </div>
                    )}
                    {loading ? (
                        <div className="flex flex-1 flex-col items-center justify-center h-[80vh] w-full shadow-2xl rounded-2xl p-10">
                            <FontAwesomeIcon icon={['fas', 'circle-notch']} className="text-escom-sombra-400 text-9xl mx-auto my-10 animate-spin" />
                            <p className="p-4 text-3xl font-semibold text-escom-900">Cargando tus eventos...</p>
                        </div>
                    ) : !eventos || eventos?.length === 0 ? (
                        <div className="flex flex-1 flex-col items-center justify-center h-[80vh] w-full shadow-2xl rounded-2xl p-10">
                            <FontAwesomeIcon icon={['fas', 'calendar-times']} className="text-escom-sombra-400 text-9xl mx-auto my-10" />
                            <p className="p-4 text-3xl font-semibold text-escom-900">No hay eventos.</p>
                        </div>
                    ) : (
                        eventos.map((evento) => (
                            <TarjetaEvento 
                                key={evento.id_evento}
                                evento={evento}
                                onClickAbrirDetalles={onClickAbrirDetalles}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Eventos;