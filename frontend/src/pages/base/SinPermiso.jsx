import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const SinPermiso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-escom-200 via-white to-escom-300 flex items-center justify-center px-4 py-8 font-lexend overflow-hidden relative">
      

      <div className="max-w-4xl w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-escom-200/50">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-900 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-orange-300 text-white rounded-full p-8 md:p-10 shadow-xl">
                <FontAwesomeIcon 
                  icon="fa-solid fa-shield-halved" 
                  className="text-6xl md:text-7xl lg:text-8xl"
                />
              </div>
            </div>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 p-3 text-transparent bg-clip-text bg-gradient-to-r from-escom-900 via-escom-700 to-red-600">
            Acceso Denegado
          </h1>

          {/* Descripción */}
          <p className="text-center text-escom-sombra-400 text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Lo sentimos, no tienes los permisos necesarios para acceder a esta página. 
            Esta sección está restringida y requiere privilegios especiales.
          </p>

          {/* Información adicional */}
          <div className="bg-gradient-to-r from-escom-100 to-escom-200 rounded-2xl p-6 mb-8">
            <h2 className="text-lg md:text-xl font-bold text-escom-900 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="fa-solid fa-circle-info" className="text-escom-700" />
              ¿Por qué estoy viendo esto?
            </h2>
            <ul className="space-y-3 text-escom-sombra-500 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon="fa-solid fa-user-lock" className="text-escom-700 mt-1 flex-shrink-0" />
                <span>Tu cuenta no tiene los permisos de <strong>administrador</strong> o <strong>organizador</strong> requeridos</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon="fa-solid fa-key" className="text-escom-700 mt-1 flex-shrink-0" />
                <span>Es posible que estés intentando acceder a una sección administrativa</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon="fa-solid fa-shield-alt" className="text-escom-700 mt-1 flex-shrink-0" />
                <span>Esta página está protegida por medidas de seguridad</span>
              </li>
            </ul>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="group px-8 py-4 bg-gradient-to-r from-escom-700 to-escom-900 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FontAwesomeIcon 
                icon="fa-solid fa-arrow-left" 
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              Volver Atrás
            </button>
            <button
              onClick={() => navigate("/#contacto")}
              className="group px-8 py-4 bg-white text-escom-900 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-escom-300 hover:border-escom-700 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FontAwesomeIcon 
                icon="fa-solid fa-home" 
                className="group-hover:scale-110 transition-transform duration-300"
              />
              Ir al Inicio
            </button>
          </div>

          {/* Contacto/Ayuda */}
          <div className="mt-8 pt-8 border-t border-escom-300">
            <p className="text-center text-escom-sombra-400 text-sm md:text-base">
              ¿Crees que esto es un error? {" "}
              <a 
                href="mailto:soporte@escom.ipn.mx" 
                className="text-escom-700 hover:text-escom-900 font-semibold hover:underline transition-colors"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinPermiso;
