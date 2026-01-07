import { useAuth } from "../../api/Context/AuthContext";
import { useEventos } from "../../api/Context/EventosContext";
import { useRef } from "react";
import { VistaCarga } from "../../components/layout/LoopCarga.jsx";


import { useEffect } from "react";

import HeroInicio from "../../components/inicio-sections/HeroInicio";
import EventosHorizontal from "../../components/inicio-sections/EventosHorizontal";
import Contacto from "../../components/inicio-sections/Contacto";


const Inicio = () => {
  const mainContainerRef = useRef();
  
  const { eventos, obtenerEventos, loading } = useEventos();

  useEffect(() => {
    const scrollPosition = window.scrollY || window.pageYOffset;

    obtenerEventos('fecha', 'DESC', 'todos');

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

  if (loading) return <VistaCarga />;

  return (
    <div ref={mainContainerRef} className="overscroll-nonebg-white">
    <HeroInicio />
    <EventosHorizontal eventos={eventos} />
    <Contacto />
    </div>
  );
};

export default Inicio;
