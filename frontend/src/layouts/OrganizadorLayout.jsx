import { Outlet } from 'react-router-dom';

import SidebarOrganizador from '../components/organizador/SidebarOrganizador.jsx';

const OrganizadorLayout = () => {
  return (
    <div className="flex h-screen md:p-10 bg-gradient-to-tl from-escom-800 to-escom-700">
        <SidebarOrganizador />
        <main className="relative z-10 flex-1 overflow-y-auto rounded-r-3xl shadow-lg main-scroll bg-white/80 backdrop-blur-md p-6 md:p-10">
          <Outlet />
        </main>
    </div>
  );
}

export default OrganizadorLayout;
