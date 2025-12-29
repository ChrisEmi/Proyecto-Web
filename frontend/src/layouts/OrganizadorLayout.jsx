import { Outlet } from 'react-router-dom';

import SidebarOrganizador from '../components/organizador/SidebarOrganizador.jsx';
import ModalConfirmacion from '../components/assets/modals/ModalConfirmacion.jsx';
import { useOrganizador } from '../api/Context/OrganizadorContext.jsx';
import { useEventos } from '../api/Context/EventosContext.jsx';

const OrganizadorLayout = () => {
  const { mensajeConfirmacion } = useOrganizador();
  const { mensajeConfirmacion: mensajeEventos } = useEventos();
  
  return (
    <div className="flex h-screen md:p-10 bg-gradient-to-tl from-escom-800 to-escom-700">
      <ModalConfirmacion mensaje={mensajeConfirmacion || mensajeEventos}/>
      <SidebarOrganizador />
      <main className="relative z-10 flex-1 overflow-y-auto rounded-r-3xl shadow-lg main-scroll bg-white/80 backdrop-blur-md p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}

export default OrganizadorLayout;
