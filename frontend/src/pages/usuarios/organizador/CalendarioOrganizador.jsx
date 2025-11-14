import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarioOrganizador.css'; 
import dayjs from 'dayjs'
import 'dayjs/locale/es';
import { useMemo, useState } from 'react';
import { useOrganizador } from '../../../api/Context/OrganizadorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const CalendarioOrganizador = () => {
    const { eventosInscritos } = useOrganizador();

    const localizer = useMemo(() => {
        dayjs.locale('es');
        return dayjsLocalizer(dayjs);
    }, []);

    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());

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
            <div className="flex flex-col gap-8 text-escom-sombra-400">
                <h1 className="text-3xl font-bold">Calendario del Organizador</h1>
                <div className="h-[75vh] w-full shadow-md">
                    <Calendar
                        localizer={localizer}
                        messages={messages}
                        view={view}
                        onView={setView}
                        date={date}
                        onNavigate={setDate}
                        views={['month', 'week']}
                        style={{ height: '100%' }}
                    />
                </div>
            </div>
        </>
    )

}
export default CalendarioOrganizador;