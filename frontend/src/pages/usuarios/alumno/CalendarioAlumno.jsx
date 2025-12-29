import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'
import 'dayjs/locale/es';
import { useMemo, useState } from 'react';
import { useAlumno } from '../../../api/Context/AlumnoContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/Calendario.css';
import { useEffect } from 'react';
import ModalDetallesEvento from '../../../components/assets/modals/ModalDetallesEvento.jsx';
import { useEventos } from '../../../api/Context/EventosContext.jsx';
import { useAnimacionesEventos } from '../../../hooks/useAnimacionesEventos.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


const CalendarioAlumno = () => {
    const { eventosInscritos, obtenerEventosPorUsuario, verificarInscripcion, desinscribirseEvento, errors: errores } = useAlumno();
    const { obtenerEventoPorId } = useEventos();
    const [abrirDetalles, setAbrirDetalles] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [estaInscrito, setEstaInscrito] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { cerrarModalAnimacion } = useAnimacionesEventos(abrirDetalles, eventoSeleccionado);

    const localizer = useMemo(() => {
        dayjs.locale('es');
        return dayjsLocalizer(dayjs);
    }, []);

    useEffect(() => {
        obtenerEventosPorUsuario('fecha', 'ASC');
    }, []);

    

    const eventosCalendario = useMemo(() => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        return eventosInscritos.map(evento => {
            const fechaEvento = new Date(evento.fecha);
            const esPasado = fechaEvento < hoy;
            
            return {
                id: evento.id_evento,
                title: evento.titulo_evento,
                start: new Date(evento.fecha),
                end: evento.fecha_final ? new Date(evento.fecha_final) : new Date(evento.fecha),
                allDay: false,
                resource: { ...evento, esPasado }
            };
        });
    }, [eventosInscritos]);

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.resource.esPasado ? '#9ca3af' : '#004E75',
            opacity: event.resource.esPasado ? 0.5 : 1,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            pointerEvents: event.resource.esPasado ? 'none' : 'auto',
            cursor: event.resource.esPasado ? 'not-allowed' : 'pointer'
        };
        return { style };
    };

    const dayStyleGetter = (date) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaDia = new Date(date);
        fechaDia.setHours(0, 0, 0, 0);
        
        if (fechaDia < hoy) {
            return {
                className: 'dia-pasado',
                style: {
                    backgroundColor: '#f3f4f6',
                    opacity: 0.6,
                    pointerEvents: 'none'
                }
            };
        }
        return {};
    };

    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());

    const handleSelectEvent = async (event) => {
        if (event.resource.esPasado) {
            return;
        }
        const eventoData = await obtenerEventoPorId(event.id);
        setEventoSeleccionado(eventoData[0]);
        const inscrito = await verificarInscripcion(event.id);
        setEstaInscrito(inscrito);
        setAbrirDetalles(true);
    };

    const manejarCerrarModal = () => {
        cerrarModalAnimacion(() => {
            setAbrirDetalles(false);
            setEventoSeleccionado(null);
        });
    };

    useGSAP(() => {
        gsap.fromTo(".container-section > div", 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut"});;
    }, []);

    const desinscribirseYActualizar = async (id_evento) => {
        await desinscribirseEvento(id_evento);
        manejarCerrarModal();
        await obtenerEventosPorUsuario('fecha', 'ASC');
    };

    const messages = {
        allDay: 'Todo el día',
        previous: <><FontAwesomeIcon icon={faChevronLeft} /></>,
        next: <><FontAwesomeIcon icon={faChevronRight} /></>,
        today: <><FontAwesomeIcon icon={faCalendarDay} /></>,
        month: 'Mes',
        week: 'Semana',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: (total) => `+ Ver más (${total})`
    };

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
                />
            )}
            <div className="flex flex-col gap-8 text-escom-sombra-400 container-section min-w-full rounded-2xl shadow-2xl bg-white/40 p-4 md:p-8">
                <div className="flex items-center gap-4 text-escom-900">
                    <FontAwesomeIcon icon={`fa-solid fa-calendar`} className="text-2xl md:text-3xl" />
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Calendario de Eventos</h1>
                </div>
                <div className="h-[70vh] rounded-4xl shadow-2xl overflow-hidden">
                    <Calendar
                        events={eventosCalendario}
                        localizer={localizer}
                        messages={messages}
                        view={view}
                        onView={setView}
                        date={date}
                        onNavigate={setDate}
                        onSelectEvent={handleSelectEvent}
                        min={new Date(new Date().setHours(7, 0, 0))}
                        views={['month', 'week']}
                        style={{ height: '100%' }}
                        eventPropGetter={eventStyleGetter}
                        dayPropGetter={dayStyleGetter}
                    />
                </div>
            </div>
        </>
    )

}
export default CalendarioAlumno;