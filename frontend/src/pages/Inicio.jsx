import { useAuth } from "../api/Context/AuthContext";
import { useRef } from "react";


import { useEffect } from "react";
import eventos from "../api/Assets/EventosInicio";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

import HeroInicio from "../components/inicio-page/HeroInicio";
import EventosHorizontal from "../components/inicio-page/EventosHorizontal";
import Actividades from "../components/inicio-page/Actividades";
import Contacto from "../components/inicio-page/Contacto";

gsap.registerPlugin(ScrollTrigger, Flip);


const Inicio = () => {
  const scrollTriggersRef = useRef(null);

  // Función para crear ScrollTriggers
  const createScrollTriggers = () => {
    // Limpiar ScrollTriggers existentes
    if (scrollTriggersRef.current) {
      scrollTriggersRef.current.forEach(st => st.kill());
    }

    const sections = gsap.utils.toArray("#section-horizontal .content");
    const horizontalScroll = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#section-horizontal",
        start: "top top",
        end: () => "+=" + (window.innerHeight * sections.length * 2),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    const cards = [
      { id: "#card-1", endTranslateX: "-2000", rotate: "25" },
      { id: "#card-2", endTranslateX: "-3000", rotate: "-20" },
      { id: "#card-3", endTranslateX: "-1500", rotate: "25" },
      { id: "#card-4", endTranslateX: "-1800", rotate: "-10" },
    ];

    const cardTriggers = cards.map((card) => {
      return ScrollTrigger.create({
        trigger: card.id,
        start: "top top",
        end: "+=" + (window.innerHeight * 10),
        scrub: true,
        onUpdate: (self) => {
          gsap.to(card.id, {
            x: `${self.progress * card.endTranslateX}px`,
            rotate: `${self.progress * card.rotate * 2}`,
            duration: 0.5,
            ease: "power1.out",
          });
        }
      });
    });

    // Guardar referencia a todos los ScrollTriggers
    scrollTriggersRef.current = [horizontalScroll.scrollTrigger, ...cardTriggers];

    return horizontalScroll;
  };

  useEffect(() => {
    // Guardar posición actual del scroll
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    // Si no estamos en el top, hacer scroll instantáneo al inicio
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

  

  useGSAP(() => {
    const horizontalScroll = createScrollTriggers();
    const handleMenuToggle = (event) => {
      if (event.detail.isOpen) {
        // Pausar scroll bloqueando el body
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const mainContent = document.querySelector('#inicio');
        const horizontalSection = document.querySelector('#section-horizontal');
        const actividadesSection = document.querySelector('#actividades');
        const contactoSection = document.querySelector('#contacto');
        
        if (mainContent) {
          mainContent.style.visibility = 'hidden';
          mainContent.style.willChange = 'auto';
        }
        if (horizontalSection) {
          horizontalSection.style.visibility = 'hidden';
          horizontalSection.style.willChange = 'auto';
        }
        if (actividadesSection) {
          actividadesSection.style.visibility = 'hidden';
          actividadesSection.style.willChange = 'auto';
        }
        if (contactoSection) {
          contactoSection.style.visibility = 'hidden';
        }
        
        // Destruir ScrollTriggers completamente para liberar GPU
        if (scrollTriggersRef.current) {
          scrollTriggersRef.current.forEach(st => st.kill());
          scrollTriggersRef.current = null;
        }
        
      } else {
        // Reanudar scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Mostrar las secciones
        const mainContent = document.querySelector('#inicio');
        const horizontalSection = document.querySelector('#section-horizontal');
        const actividadesSection = document.querySelector('#actividades');
        const contactoSection = document.querySelector('#contacto');
        
        if (mainContent) {
          mainContent.style.visibility = 'visible';
          mainContent.style.willChange = 'transform';
        }
        if (horizontalSection) {
          horizontalSection.style.visibility = 'visible';
          horizontalSection.style.willChange = 'transform';
        }
        if (actividadesSection) {
          actividadesSection.style.visibility = 'visible';
        }
        if (contactoSection) {
          contactoSection.style.visibility = 'visible';
        }
        
        // Recrear ScrollTriggers
        createScrollTriggers();
      }
    };

    window.addEventListener('menuToggle', handleMenuToggle);

    return () => {
      horizontalScroll.kill();
      window.removeEventListener('menuToggle', handleMenuToggle);
    };
  }, []);


    

  return (
    <div className="overscroll-nonebg-white">
    <style jsx>{`
    #section-horizontal {
      overflow: hidden;
    }
    
    #section-horizontal .content {
      height: 100vh;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    `}</style>

    <HeroInicio />
    <EventosHorizontal eventos={eventos} />
    <Actividades />
    <Contacto />
    </div>
  );
};

export default Inicio;
