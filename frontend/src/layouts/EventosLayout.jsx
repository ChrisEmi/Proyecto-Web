import { Outlet } from "react-router-dom";
import ModalConfirmacion from "../components/assets/ModalConfirmacion";

const EventosLayout = () => {
    return (
        <div className="flex flex-col gap-8 bg-escom-sombra-400 min-h-screen p-10 z-0">
            <main className="flex-1 bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-lg main-scroll overflow-y-auto">
                <Outlet />
            </main>
            <ModalConfirmacion />
        </div>
    );
};

export default EventosLayout;