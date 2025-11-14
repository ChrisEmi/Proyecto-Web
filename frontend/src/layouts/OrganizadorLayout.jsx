import { Outlet } from 'react-router-dom';

import SidebarOrganizador from '../components/organizador/SidebarOrganizador.jsx';

const OrganizadorLayout = () => {
  return (
    <div className="relative flex h-screen md:p-10 bg-gradient-to-tl from-escom-sombra-300 to-escom-sombra-200">
        <SidebarOrganizador />
        <main className="relative z-10 flex-1 overflow-y-auto rounded-r-3xl shadow-lg main-scroll bg-white/60 backdrop-blur-md p-6 md:p-10">
          <Outlet />
        </main>
    </div>
  );
}

export default OrganizadorLayout;
