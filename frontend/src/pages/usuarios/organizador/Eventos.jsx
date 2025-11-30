import CustomSelect from "../../../components/assets/CustomSelect";
import { useOrganizador } from "../../../api/Context/OrganizadorContext.jsx";
import { useEventos } from "../../../api/Context/EventosContext.jsx";
import { useEffect, useState } from "react";
import ModalDetallesEvento from "../../../components/assets/ModalDetallesEvento.jsx";
import { VistaCarga } from "../../../components/layout/LoopCarga.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TarjetaEvento } from "../../../components/assets/TarjetaEvento.jsx";
import { useForm } from "react-hook-form";
import { useAnimacionesEventos } from "../../../hooks/useAnimacionesEventos.js";

const Eventos = () => {
    const { obtenerEventoPorId } = useEventos();
    const { eventosOrganizados, obtenerEventosPorOrganizador, errors: errores, loading, actualizarEvento } = useOrganizador();
    const { eliminarEvento } = useEventos();
    const [ordenarPor, setOrdenarPor] = useState('fecha_creacion');
    const [direccion, setDireccion] = useState('DESC');
    const [isLoading, setIsLoading] = useState(false);
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [estaEditando, setEstaEditando] = useState(false);
    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);

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

    const guardarCambios = async (formData) => {
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
                {eventosOrganizados.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full w-full shadow-2xl rounded-2xl p-10">
                        <FontAwesomeIcon icon={['fas', 'calendar-times']} className="text-escom-sombra-400 text-9xl mx-auto my-10" />
                        <p className="p-4">No hay eventos organizados.</p>
                    </div>
                ) : (
                    eventosOrganizados.map((evento) => (
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