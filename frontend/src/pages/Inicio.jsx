import { useAuth } from "../api/Context/AuthContext";

const Inicio = () => {
  const { cerrarSesion } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={cerrarSesion} className="mb-4 px-4 py-2 bg-red-500 text-white rounded">Cerrar Sesión</button>
      <h1 className="text-2xl font-bold text-center">Bienvenido a la página de inicio de las <br /> Actividades Culturales y Recreativas en la <br /> ESCOMunidad</h1>
      <img src="../../public/assets/logoESCOM.png" alt="Descripción de la imagen" />
    </div>
  );
};

export default Inicio;
