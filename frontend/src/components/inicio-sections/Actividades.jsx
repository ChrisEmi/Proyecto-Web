import React from "react";
import { useAuth } from "../../api/Context/AuthContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useAnimacionesActividades } from "../../hooks/useAnimacionesActividades";
import { datosActividades } from "../../data/datosActividades";
import { TarjetaActividad } from "./Components/TarjetaActividad";

export function Actividades() {
  library.add(fas, far, fab);
  
  const { 
    activeCardId, 
    containerRef, 
    containerTituloRef, 
    handleClick 
  } = useAnimacionesActividades();

  const { user } = useAuth();

  return (
    <>
      <section
        className="relative overflow-hidden min-h-[120vh] flex justify-center items-center w-full bg-gradient-to-b from-escom-200 via-white to-escom-300 py-12 md:py-16 lg:py-20"
        id="actividades" ref={containerRef}
      >
        <div className={`w-full h-full px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col gap-8 md:gap-10 font-lexend justify-center items-center`}>
          <div ref={containerTituloRef} className="flex flex-col items-center gap-3 md:gap-4 w-full mb-4 md:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-escom-900 via-escom-700 to-escom-sombra-500 text-center">
              Actividades ESCOMunidad
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 w-full">
            <TarjetaActividad 
              data={datosActividades.deportivas}
              isActive={activeCardId === "deportivas"}
              isHidden={activeCardId !== null && activeCardId !== "deportivas"}
              onClick={handleClick}
              user={user}
            />
            <TarjetaActividad 
              data={datosActividades.culturales}
              isActive={activeCardId === "culturales"}
              isHidden={activeCardId !== null && activeCardId !== "culturales"}
              onClick={handleClick}
              user={user}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Actividades;

