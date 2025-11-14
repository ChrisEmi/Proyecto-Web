import { Outlet } from 'react-router-dom';
import EscomDecorativeBackground from '../components/assets/EscomDecorativeBackground.jsx';

import SidebarAdmin from '../components/admin/SidebarAdmin.jsx';

const AdminLayout = () => {
  return (
    <div className="relative flex h-screen md:p-10">
        <EscomDecorativeBackground className="h-full" />
        <SidebarAdmin />
        <main className="relative z-10 flex-1 overflow-y-auto rounded-r-3xl shadow-lg main-scroll bg-white/30 backdrop-blur-md p-6 md:p-10">
          <Outlet />
        </main>
    </div>
  );
}

export default AdminLayout;

