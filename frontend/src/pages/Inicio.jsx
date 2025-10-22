import { useAuth } from "../api/Context/AuthContext";
import { useRef, useState } from "react";
import { IconoEscom, IconoMenu } from "../components/assets/ElementosSvg";
import Carrusel from "../components/Carrusel";
import CarruselGsap from "../components/CarruselGsap";
import { useEffect } from "react";
import eventos from "../api/Assets/EventosInicio";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Inicio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const tl = useRef()

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
    tl.current = gsap.timeline({ paused: true })
      .to("#nav-bg", { 
          opacity: 0.7, 
          duration: 0.9,
          blur: '5px',
          ease: 'power1.inOut' 
      })
      .to("#nav-menu", { 
          x: "0%",
          duration: 0.9, 
          ease: 'power1.inOut' 
      }, 0);


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

    return () => {
      horizontalScroll.kill();
    };
  }, []);


    const botonMenu = () => {
      if (menuOpen) {
        tl.current.reverse();
      }else {
        tl.current.play();
      }
      setMenuOpen(!menuOpen);
      
  }
  
  const cerrarMenu = () => {
    if (menuOpen) { 
      tl.current.reverse();
      setMenuOpen(false);
    }
  }

  return (
    <div className="overscroll-none h-[300vh] bg-white">
      
      

      <style jsx global>{`
      #section-horizontal {
        overflow: hidden;
      }
      
      #section-horizontal .content {
        height: 100vh;
        width: 110vw;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
      }
      `}</style>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={botonMenu}
          className="p-2 focus:outline-none transition-all cursor-pointer"
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
        >
          <IconoMenu className="size-8 sm:size-10 lg:size-14 text-white/90 hover:text-white/60 transition-all " />
        </button>
      </div>

      <>
        <div 
          onClick={cerrarMenu}
          className={`
            fixed inset-0 bg-escom-sombra-800 z-40
            opacity-0 ${menuOpen ? '' : 'pointer-events-none'}
          `}
          id="nav-bg"
        >

        </div>
        
        <div 
          id="nav-menu"
          className={`
            fixed top-0 right-0 w-1/2 h-full bg-escom-sombra-900 
            transform opacity-100 z-40
            translate-x-full ${menuOpen ? '' : 'pointer-events-none'}
          `}
        >
          <div className="flex flex-col p-6 space-y-4">
            <a 
              href="#inicio" 
              className="text-white text-2xl font-semibold hover:text-escom-sombra-100 transition-all"
            >
              Inicio
            </a>
            <a 
              href="#eventos" 
              className="text-white text-2xl font-semibold hover:text-escom-sombra-100 transition-all"
            >
              Eventos
            </a>
          </div>
        </div>
      </>

      <section id="inicio" className="inicio bg-gradient-to-b from-escom-sombra-400 to-escom-sombra-700 min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0 z-20">
        <a href="https://www.escom.ipn.mx/" target="_blank" rel="noopener noreferrer">
          <IconoEscom className="size-16 sm:size-20 lg:size-24 text-white flex-shrink-0 absolute top-4 left-4 sm:left-8 lg:left-15" />
        </a>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-8xl">

          <div className="flex flex-col items-start justify-center space-y-6 sm:space-y-8 w-full lg:w-3/4 mx-auto order-2 lg:order-1">
            
            <div className="flex items-center gap-4 sm:gap-6 w-full">
              <h1 className="texto-animado text-left text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight">
                Actividades Culturales y Recreativas de la ESCOMunidad
              </h1>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/90 text-base sm:text-lg lg:text-xl xl:text-2xl text-left leading-relaxed">
                Descubre, participa y conecta. Encuentra todos los eventos, 
                talleres y torneos en un solo lugar.
              </p>
              
              <p className="text-white/70 text-sm sm:text-base lg:text-lg text-left leading-relaxed">
                Únete a nuestra comunidad estudiantil y participa en actividades que 
                enriquecerán tu experiencia universitaria. Desde talleres de tecnología 
                hasta eventos culturales y deportivos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full pt-2 sm:pt-4">
              <button className="bg-white text-escom-sombra-700 px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Ver tus Eventos
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg text-base sm:text-lg hover:bg-white hover:text-escom-sombra-700 transition-all duration-300 transform hover:scale-105">
                Explorar Actividades
              </button>
            </div>
            
          </div>

          <div className="slider w-full h-64 sm:h-80 lg:h-96 xl:h-100 flex justify-center items-center bg-black/20 backdrop-blur-sm rounded-lg text-white/50 border border-white/20 order-1 lg:order-2">
            <Carrusel
              slides={[
                { src: "https://www.ipn.mx/assets/files/ddicyt/img/Principal/slider_principal/banner-munic.webp", alt: "Slide 1" },
                { src: "https://www.ipn.mx/assets/files/ddicyt/img/Principal/slider_principal/banner-noche-de-museos-octubre-copia.webp", alt: "Slide 2" },
                { src: "https://www.ipn.mx/assets/files/ddicyt/assets/uploads/banner_prog_div_ciencia_ok.jpg", alt: "Slide 3" }, 
                { src: "https://www.ipn.mx/assets/files/ddicyt/assets/uploads/banner_prog_div_ciencia_ok.jpg", alt: "Slide 4" }
              ]}
              className=""
            />
          </div>

        </div>
      </section>
      <section className="relative bg-gradient-to-b from-gray-50 to-white flex overflow-hidden" id="section-horizontal">

        <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-escom-sombra-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-escom-sombra-400 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        
        <div id="eventos" className="content relative flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 bg-escom-sombra-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wide">
                {eventos.length} eventos te esperan
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-escom-sombra-600 to-escom-sombra-800 mb-3 sm:mb-4 leading-tight px-4">
              Próximos Eventos
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 font-light max-w-2xl mx-auto px-4">
              Descubre experiencias únicas y conecta con la comunidad ESCOM
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center px-4">
            {['🎵 Música', '🎨 Cultura', '⚽ Deportes', '💻 Tecnología', '🎭 Teatro'].map((categoria, i) => (
              <button 
                key={i}
                className="px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-semibold text-xs sm:text-sm hover:border-escom-sombra-500 hover:text-escom-sombra-700 hover:bg-escom-sombra-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {categoria}
              </button>
            ))}
          </div>

          {/* Carrusel de eventos */}
          <div className="w-full flex-1 flex justify-center items-center relative px-4">
            <CarruselGsap evento={eventos} />
          </div>

          {/* Botón de acción inferior */}
          <div className="mt-6 sm:mt-8 mb-4 sm:mb-0">
            <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-escom-sombra-500 to-escom-sombra-700 text-white rounded-xl font-bold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline">Ver Todos los Eventos</span>
              <span className="sm:hidden">Ver Todos</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="content flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center">Contenedor 2</p>
        </div>
        <div className="content flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 p-4">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center">Contenedor 3</p>
        </div>
        <div className="content flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 p-4">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center">Contenedor 4</p>
        </div>
      </section>

      
    </div>
  );
};

export default Inicio;
