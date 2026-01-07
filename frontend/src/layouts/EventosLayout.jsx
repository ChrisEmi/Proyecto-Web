import { Outlet } from "react-router-dom";
import { useEventos } from "../api/Context/EventosContext.jsx";
import ModalConfirmacion from "../components/assets/modals/ModalConfirmacion";

const EventosLayout = () => {
    const { mensajeConfirmacion, setMensajeConfirmacion } = useEventos();
    return (
        <div className="flex flex-col min-h-screen z-0">
            <ModalConfirmacion mensaje={mensajeConfirmacion} onCerrar={() => setMensajeConfirmacion(null)}/>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default EventosLayout;