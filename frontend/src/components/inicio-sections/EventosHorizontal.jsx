import React from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EscomDecorativeBackground from '../EscomDecorativeBackground';
import CarruselGsap from '../CarruselGsap';

gsap.registerPlugin(ScrollTrigger);

const EventosHorizontal = ({ eventos }) => {
  const sectionRef = useRef(null);
  const scrollTriggersRef = useRef([]);

  const createScrollTriggers = (selector) => {
    if (scrollTriggersRef.current) {
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = []; // Reiniciar el array
    }
    const sections = selector(".content"); 
    if (sections.length === 0) {
      console.warn("GSAP: No se encontraron secciones '.content' en EventosHorizontal.");
      return null;
    }

    const horizontalScroll = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current, 
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
      const cardElement = selector(card.id)[0]; // [0] porque selector devuelve un array
      if (!cardElement) {
        console.warn(`GSAP: Card ${card.id} no encontrada.`);
        return null;
      }

      return ScrollTrigger.create({
        trigger: cardElement, // Usar el elemento encontrado
        start: "top top",
        end: "+=" + (window.innerHeight * 10),
        scrub: true,
        onUpdate: (self) => {
          
          gsap.to(cardElement, { 
            x: `${self.progress * card.endTranslateX}px`,
            rotate: `${self.progress * card.rotate * 2}`,
            duration: 0.5,
            ease: "power1.out",
          });
        }
      });
    }).filter(Boolean); 
    scrollTriggersRef.current = [horizontalScroll.scrollTrigger, ...cardTriggers];
    return horizontalScroll;
  };
  
  useGSAP((context) => {
    const { selector } = context; 
    const handleMenuToggle = (event) => {
      const horizontalSection = sectionRef.current; // Usar el ref
      
      if (event.detail.isOpen) {
        if (horizontalSection) {
          horizontalSection.style.visibility = 'hidden';
          horizontalSection.style.willChange = 'auto';
        }
        
        if (scrollTriggersRef.current) {
          scrollTriggersRef.current.forEach(st => st.kill());
          scrollTriggersRef.current = [];
        }
      } else {
        if (horizontalSection) {
          horizontalSection.style.visibility = 'visible';
          horizontalSection.style.willChange = 'transform';
        }
        createScrollTriggers(selector); // Pasamos el selector
      }
    };

    // Crear triggers en la carga inicial
    createScrollTriggers(selector); 

    window.addEventListener('menuToggle', handleMenuToggle);

    // Función de limpieza correcta
    return () => {
      window.removeEventListener('menuToggle', handleMenuToggle);
      if (scrollTriggersRef.current) {
        scrollTriggersRef.current.forEach(st => st.kill());
        scrollTriggersRef.current = [];
      }
    };
  }, { scope: sectionRef });


  return (
    <>
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
    <section ref={sectionRef} className="relative bg-gradient-to-b from-white via-escom-50 to-escom-200 flex overflow-hidden" id="section-horizontal">
      <div id="eventos" className="content w-[105vw] h-[110vh] relative flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 sm:p-6 lg:p-8 sm:w-[100vw]">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-b from-escom-900 to-escom-sombra-700 opacity-90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wide">
              {eventos.length} eventos te esperan
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-escom-800 to-escom-sombra-800 mb-3 sm:mb-4 leading-tight px-4">
            Explora Eventos
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 font-light max-w-2xl mx-auto px-4">
            Descubre y comparte experiencias únicas con nosotros, sé parte y conecta con la comunidad ESCOM
          </p>
        </div>
        
        <div className="w-full flex-1 flex justify-center items-center relative px-4">
          <CarruselGsap evento={eventos} />
        </div>

        <div className="mt-6 sm:mt-8 mb-4 sm:mb-0">
          <button 
            className="group relative bg-gradient-to-b from-escom-100 to-escom-200 text-escom-sombra-300 px-8 py-4 font-bold rounded-xl text-base sm:text-lg 
                    hover:text-escom-sombra-700 transition-all duration-300 transform hover:scale-105 shadow-2xl 
                      hover:shadow-escom-sombra-900/50
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white 
                      focus-visible:ring-offset-2 focus-visible:ring-offset-escom-sombra-700
                      overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver todos los Eventos
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-escom-200 to-escom-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <div id="escomunidad" className="content opacity-0 lg:opacity-100 lg:w-[395vw] bg-gradient-to-br from-gray-100 to-gray-200 p-4 shadow-2xl will-change-transform relative overflow-hidden ">
        <EscomDecorativeBackground id="escom-background" />
        
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-30 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-escom-sombra-700/90 px-6 py-3 rounded-full border border-escom-sombra-500/30 shadow-2xl">
            <span className="w-2.5 h-2.5 bg-escom-300 rounded-full animate-pulse"></span>
            <span className="text-white font-bold text-sm uppercase tracking-widest">
              Plataforma PARA LA ESCOMunidad
            </span>
          </div>
          <h2 className="text-6xl font-bold text-escom-sombra-700 drop-shadow-lg">
            Conecta con la Comunidad de ESCOM
          </h2>
          <p className="text-2xl text-escom-sombra-600 font-medium max-w-3xl text-center mx-auto">
            Portal gestor de eventos, actividades y recursos para estudiantes de la Escuela Superior de Cómputo.
          </p>
        </div>
      
        <h1 className="w-full text-escom-sombra-200 text-[42vw] font-lexend font-bold text-center margin-0 z-20 relative drop-shadow-escom-sombra-300 drop-shadow-xl" >ESCOMunidad</h1>
        
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-1/4 left-[22%] z-20" id="card-1">
          <img src="https://www.escom.ipn.mx/nuevoingreso26_1/media/escomExplanada.jpeg" alt="Escom Explanada" />
        </div>
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-2/3 left-[42%] z-20" id="card-2">
          <img src="../../../assets/escom-auditorio.jpg" alt="Esccom Auditorio" className="size-full object-cover"/>
        </div>
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-1/3 left-[62%]" id="card-3">  
          <img src="../../../assets/escom-letras.jpg" alt="Escom Letras" />
        </div>
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-10/16 left-[85%] z-20" id="card-4">  
          <img src="https://static.where-e.com/Mexico/State_Of_Mexico_City/Patera_Vallejo_I_Seccion/Escom-Escuela-Superior-De-Computo-Ipn_0249fce7050e8241d3221d044f034e62.jpg" alt="Escom Letras" />
        </div>
      </div>
      </section>
    </>
  );
  
};

export default EventosHorizontal;
