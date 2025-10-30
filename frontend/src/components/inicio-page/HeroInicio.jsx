import React from 'react';
import Carrusel from '../Carrusel';

const HeroInicio = () => {
  return (
    <section 
      id="inicio" 
      className="inicio bg-gradient-to-br from-escom-sombra-300 via-escom-sombra-700 to-escom-sombra-900 min-h-screen w-full flex items-center justify-center 
                px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-300 mb-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
            Comunidad ESCOM
          </span>
          
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight drop-shadow-2xl mb-6 px-4">
            Actividades Culturales y Recreativas
            <span className="block text-escom-200 mt-2">de la ESCOMunidad</span>
          </h1>

          <p className="text-white/90 text-lg sm:text-xl lg:text-2xl text-center leading-relaxed max-w-4xl mx-auto px-4">
            Descubre, participa y conecta. Encuentra todos los eventos, 
            talleres y torneos en un solo lugar.
          </p>
        </div>

        <div 
          className="slider w-full h-110 
                    bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 
                    shadow-2xl overflow-hidden mb-8 lg:mb-12
                    transform transition-all duration-500 hover:shadow-cyan-500/20 hover:scale-[1.01]"
        >
          <Carrusel
            slides={[
              { 
                id: "01", 
                title: "MUNIC", 
                imageSrc: "https://www.ipn.mx/assets/files/ddicyt/img/Principal/slider_principal/banner-munic.webp" 
              },
              { 
                id: "02", 
                title: "Noche de Museos", 
                imageSrc: "https://www.ipn.mx/assets/files/ddicyt/img/Principal/slider_principal/banner-noche-de-museos-octubre-copia.webp" 
              },
              { 
                id: "03", 
                title: "Divulgación Científica", 
                imageSrc: "https://www.ipn.mx/assets/files/ddicyt/assets/uploads/banner_prog_div_ciencia_ok.jpg" 
              },
              { 
                id: "04", 
                title: "Planetario", 
                imageSrc: "https://www.ipn.mx/assets/files/ddicyt/assets/uploads/banner_prog_div_ciencia_ok.jpg" 
              }
            ]}
          />
        </div>

        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <p className="text-white/80 text-base sm:text-lg leading-relaxed px-4">
            Únete a nuestra comunidad estudiantil y participa en actividades que 
            enriquecerán tu experiencia universitaria. Explora talleres, conferencias, 
            competencias y eventos culturales diseñados para ti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              className="group relative bg-white text-escom-sombra-700 px-8 py-4 font-bold rounded-xl text-base sm:text-lg 
                        hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 shadow-2xl 
                        hover:shadow-cyan-300/50
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white 
                        focus-visible:ring-offset-2 focus-visible:ring-offset-escom-sombra-700
                        overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Ver tus Eventos
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              className="group border-2 border-white/50 text-white px-8 py-4 font-bold rounded-xl text-base sm:text-lg 
                        backdrop-blur-sm hover:bg-white hover:text-escom-sombra-700 
                        transition-all duration-300 transform hover:scale-105 hover:border-white
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                        w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Explorar Actividades
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </button>
          </div>


          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-8 px-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-white text-sm font-semibold">+500 Participantes</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span className="text-white text-sm font-semibold">20+ Eventos Mensuales</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span className="text-white text-sm font-semibold">Comunidad Activa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroInicio;
