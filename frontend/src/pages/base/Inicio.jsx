import { useAuth } from "../../api/Context/AuthContext";
import { useRef } from "react";


import { useEffect } from "react";
import eventos from "../../api/Assets/EventosInicio";

import HeroInicio from "../../components/inicio-sections/HeroInicio";
import EventosHorizontal from "../../components/inicio-sections/EventosHorizontal";
import Actividades from "../../components/inicio-sections/Actividades";
import Contacto from "../../components/inicio-sections/Contacto";


const Inicio = () => {
  const mainContainerRef = useRef();
  


  useEffect(() => {
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 0) {
      window.scrollTo(0, 0);
      window.history.scrollRestoration = 'manual';
    }

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    
    return () => {
      window.onbeforeunload = null;
    };
  }, []);




    

  return (
    <div ref={mainContainerRef} className="overscroll-nonebg-white">
    <HeroInicio />
    <EventosHorizontal eventos={eventos} />
    <Actividades />
    <Contacto />
    </div>
  );
};

export default Inicio;
