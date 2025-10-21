import { useAuth } from "../api/Context/AuthContext";
import { IconoEscom } from "../components/assets/IconoEscom";
import Carrusel from "../components/Carrusel";
import CarruselGsap from "../components/CarruselGsap";
import { useEffect } from "react";

const Inicio = () => {

  return (
    <div className="overflow-x-hidden overscroll-none h-[300vh] bg-white">
      <section className="inicio bg-gradient-to-b from-escom-sombra-400 to-escom-sombra-700 h-screen w-full flex items-center justify-center px-8">
        <a href="https://www.escom.ipn.mx/" target="_blank" rel="noopener noreferrer">
          <IconoEscom className="size-24 text-white flex-shrink-0 absolute top-0 left-15" />
        </a>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full">

          <div className="flex flex-col items-start justify-center space-y-8 w-3/4 mx-auto">
            
            <div className="flex items-center gap-6 w-full">
              <h1 className="texto-animado text-left text-white text-4xl lg:text-5xl font-extrabold leading-tight">
                Actividades Culturales y Recreativas de la ESCOMunidad
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-white/90 text-xl lg:text-2xl text-left leading-relaxed">
                Descubre, participa y conecta. Encuentra todos los eventos, 
                talleres y torneos en un solo lugar.
              </p>
              
              <p className="text-white/70 text-lg text-left leading-relaxed">
                Únete a nuestra comunidad estudiantil y participa en actividades que 
                enriquecerán tu experiencia universitaria. Desde talleres de tecnología 
                hasta eventos culturales y deportivos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
              <button className="bg-white text-escom-sombra-700 px-8 py-4 font-bold rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Ver tus Eventos
              </button>
              <button className="border-2 border-white text-white px-8 py-4 font-bold rounded-lg text-lg hover:bg-white hover:text-escom-sombra-700 transition-all duration-300 transform hover:scale-105">
                Explorar Actividades
              </button>
            </div>
            
          </div>

          <div className="slider w-full h-100 flex justify-center items-center bg-black/20 backdrop-blur-sm rounded-lg text-white/50 
                          border border-white/20">
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
      <section className="eventos-proximos bg-gradient-to-b from-white to-gray-300 h-screen w-full flex overflow-hidden">
        <div className="container h-full mx-auto relative">
          <h2 className="text-8xl font-extrabold text-escom-sombra-400 flex justify-center pt-15 pb-10">Próximos Eventos</h2>
          <p className="text-center text-3xl font-normal text-escom-sombra-400">No te pierdas nuestras próximas actividades y eventos culturales.</p>
          <div className="w-full h-full flex justify-center items-center absolute bottom-0">
            <CarruselGsap evento={[{
              titulo: "Concierto de Rock",
              descripcion: "Únete a nosotros para una noche inolvidable de música en vivo con bandas locales e internacionales.",
              imagen: {
                src: "https://www.record.com.mx/sites/default/files/articulos/2024/10/16/muerto_1-16.jpg",
                alt: "Concierto de Rock"
              },
              fecha: { dia: "25 de Noviembre" },
              relacionado: ["Concierto de Rock", "Música", "En Vivo"]
            },{
              titulo: "Concierto de Rock",
              descripcion: "Únete a nosotros para una noche inolvidable de música en vivo con bandas locales e internacionales.",
              imagen: {
                src: "https://www.rea.dfie.ipn.mx/archivosEventos/801logoEvento.jpeg",
                alt: "Concierto de Rock"
              },
              fecha: { dia: "25 de Noviembre" },
              relacionado: ["Concierto de Rock", "Música", "En Vivo"]
            },{
              titulo: "Concierto de Rock",
              descripcion: "Únete a nosotros para una noche inolvidable de música en vivo con bandas locales e internacionales.",
              imagen: {
                src: "https://ipn.mx/assets/files/investigacion/img/apoyos/promocion/2024/aee24.jpg",
                alt: "Concierto de Rock"
              },
              fecha: { dia: "25 de Noviembre" },
              relacionado: ["Concierto de Rock", "Música", "En Vivo"]
            },{
              titulo: "Concierto de Rock",
              descripcion: "Únete a nosotros para una noche inolvidable de música en vivo con bandas locales e internacionales.",
              imagen: {
                src: "https://www.ipn.mx/assets/files/cultura/img/2025-cart-octubre-027-2-01",
                alt: "Concierto de Rock"
              },
              fecha: { dia: "25 de Noviembre" },
              relacionado: ["Concierto de Rock", "Música", "En Vivo"]
            },{
              titulo: "Concierto de Rock",
              descripcion: "Únete a nosotros para una noche inolvidable de música en vivo con bandas locales e internacionales.",
              imagen: {
                src: "https://www.ipn.mx/assets/files/cultura/img/2025-cart-octubre-027-2-01",
                alt: "Concierto de Rock"
              },
              fecha: { dia: "25 de Noviembre" },
              relacionado: ["Concierto de Rock", "Música", "En Vivo"]
            },{
              titulo: "Concierto de Rock",
              descripcion: "Únete a nosotros para una noche inolvidable de música en vivo con bandas locales e internacionales.",
              imagen: {
                src: "https://www.ipn.mx/assets/files/cultura/img/2025-cart-octubre-027-2-01",
                alt: "Concierto de Rock"
              },
              fecha: { dia: "25 de Noviembre" },
              relacionado: ["Concierto de Rock", "Música", "En Vivo"]
            }

          ]} />
          </div>
        </div>
      </section>
      <section className="bg-escom-500 h-screen">

      </section>
    </div>
  );
};

export default Inicio;
