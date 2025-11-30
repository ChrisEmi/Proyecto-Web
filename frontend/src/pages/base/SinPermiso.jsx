import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const SinPermiso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-escom-200 via-white to-escom-300 flex items-center justify-center px-4 py-8 font-lexend overflow-hidden relative">
      <div className="bg-white/60 backdrop-blur-2xl rounded-2xl flex max-w-xl max-h-xl">
        <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10">
          <div className="text-escom-800 flex flex-col items-center gap-2">
            <div className="relative text-escom-900 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
              <div className="bg-escom-600/20 rounded-full absolute w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32"></div>
              <FontAwesomeIcon icon="fa-solid fa-lock" className="text-3xl md:text-4xl lg:text-6xl "/>
            </div>
            <h1 className="text-3xl font-semibold text-center">No puedes acceder a esta página</h1>
          </div>
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            <button
              onClick={() => navigate(-1)}
              className="bg-escom-700 hover:bg-escom-800 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-escom-500 focus:ring-offset-2"
            >
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="mr-2" />
              Volver
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-escom-800 hover:bg-escom-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-escom-500 focus:ring-offset-2"
            >
              <FontAwesomeIcon icon="fa-solid fa-home" className="mr-2" />
              Inicio
            </button>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default SinPermiso;
