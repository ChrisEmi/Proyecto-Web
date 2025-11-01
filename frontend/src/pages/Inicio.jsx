import { useAuth } from "../api/Context/AuthContext";
import { useRef } from "react";


import { useEffect } from "react";
import eventos from "../api/Assets/EventosInicio";
import { useGSAP } from "@gsap/react";

import HeroInicio from "../components/inicio-sections/HeroInicio";
import EventosHorizontal from "../components/inicio-sections/EventosHorizontal";
import Actividades from "../components/inicio-sections/Actividades";
import Contacto from "../components/inicio-sections/Contacto";


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


  useGSAP((context) => {
    const { selector } = context; 

    const handleMenuToggle = (event) => {
      const mainContent = selector('#inicio')[0]; 
      const actividadesSection = selector('#actividades')[0];
      const contactoSection = selector('#contacto')[0];

      if (event.detail.isOpen) {
        if (mainContent) mainContent.style.visibility = 'hidden';
        if (actividadesSection) actividadesSection.style.visibility = 'hidden';
        if (contactoSection) contactoSection.style.visibility = 'hidden';
      } else {
        if (mainContent) mainContent.style.visibility = 'visible';
        if (actividadesSection) actividadesSection.style.visibility = 'visible';
        if (contactoSection) contactoSection.style.visibility = 'visible';
      }
    };

    window.addEventListener('menuToggle', handleMenuToggle);

    return () => {
      window.removeEventListener('menuToggle', handleMenuToggle);
    };

  }, { scope: mainContainerRef });

    

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
