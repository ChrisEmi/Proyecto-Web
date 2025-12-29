import { Outlet } from "react-router-dom";
import { useEventos } from "../api/Context/EventosContext.jsx";
import ModalConfirmacion from "../components/assets/modals/ModalConfirmacion";

const EventosLayout = () => {
    const { mensajeConfirmacion, setMensajeConfirmacion } = useEventos();
    return (
        <div className="flex flex-col gap-8 bg-escom-100 min-h-screen z-0 ">
            <ModalConfirmacion mensaje={mensajeConfirmacion} onCerrar={() => setMensajeConfirmacion(null)}/>
            <main className="flex-1 bg-white rounded-3xl p-4 md:p-10 shadow-2xl">
                <Outlet />
            </main>
        </div>
    );
};

export default EventosLayout;