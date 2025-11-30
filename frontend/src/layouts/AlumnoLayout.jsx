import { Outlet } from 'react-router-dom';
import { useAlumno } from '../api/Context/AlumnoContext.jsx';
import SidebarAlumno from '../components/alumno/SidebarAlumno.jsx';
import ModalConfirmacion from '../components/assets/ModalConfirmacion.jsx';

const AlumnoLayout = () => {
  const { mensajeConfirmacion, setMensajeConfirmacion } = useAlumno();
  return (
    <div className="relative flex h-screen md:p-10 bg-gradient-to-tl from-escom-300 to-escom-200">
        <ModalConfirmacion mensaje={mensajeConfirmacion} onCerrar={() => setMensajeConfirmacion(null)}/>
        <SidebarAlumno />
        <main className="relative z-10 flex-1 overflow-y-auto rounded-r-3xl shadow-lg main-scroll bg-white/60 backdrop-blur-md p-6 md:p-10">
          <Outlet />
        </main>
    </div>
  );
}

export default AlumnoLayout;
