import React from 'react';
import EscomDecorativeBackground from '../EscomDecorativeBackground';
import CarruselGsap from '../CarruselGsap';

const EventosHorizontal = ({ eventos }) => {
  return (
    <section className="relative bg-gradient-to-b from-white via-escom-50 to-escom-200 flex overflow-hidden" id="section-horizontal">
      <div id="eventos" className="content w-[105vw] relative flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 sm:p-6 lg:p-8">
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
        
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-1/4 left-[22%] z-20 hover:shadow-escom-sombra-300/50 transition-shadow duration-300 " id="card-1">
          <img src="https://www.escom.ipn.mx/nuevoingreso26_1/media/escomExplanada.jpeg" alt="Escom Explanada" />
        </div>
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-2/3 left-[42%] z-20 hover:shadow-escom-sombra-500/50 transition-shadow duration-300" id="card-2">
          <img src="https://scontent.fmex12-1.fna.fbcdn.net/v/t39.30808-6/559364536_1321470329770181_7959511031863689881_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=x36_H28r-XQQ7kNvwFMKmA0&_nc_oc=AdlX9F9AlxswxcghmdGgq0wfLxFAWXR5iY68SGV4C1-tolmYgBZz4qFW6_eauEZn7I32bCiCObofyYbrHrc1tNja&_nc_zt=23&_nc_ht=scontent.fmex12-1.fna&_nc_gid=XF931Y6bEfwbJdjVdETJsA&oh=00_Afc-KwCtoXAHtX0LgrhMDgoSdJJSxCCqUGUq26b-QCSUuw&oe=6904F9CA" alt="Esccom Auditorio" className="size-full object-cover"/>
        </div>
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-1/3 left-[62%] hover:shadow-escom-sombra-700/50 transition-shadow duration-300" id="card-3">  
          <img src="https://scontent.fmex12-1.fna.fbcdn.net/v/t39.30808-6/502484684_1229017662348782_7532268406260301056_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=lEnq9fWYghoQ7kNvwH26Iu2&_nc_oc=AdnLte47a9-QU5o_VMqGmDMJRDXUC8Bzt2c5EhK5efllnTlHOM5Ik_pwmRVIMMfPdKDH9C5Gb6mQ01mrZaqxZSlv&_nc_zt=23&_nc_ht=scontent.fmex12-1.fna&_nc_gid=1YWzXAri2m6CKc5D7k8I4w&oh=00_Afcx8WSN9bkBlnCbY_8x4TreqHkFGrl-oj7xEvwvEn04VQ&oe=6904E4EA" alt="Escom Letras" />
        </div>
        <div className="card absolute w-[400px] h-auto rounded-3xl overflow-hidden top-10/16 left-[85%] z-20 hover:shadow-escom-sombra-800/50 transition-shadow duration-300" id="card-4">  
          <img src="https://static.where-e.com/Mexico/State_Of_Mexico_City/Patera_Vallejo_I_Seccion/Escom-Escuela-Superior-De-Computo-Ipn_0249fce7050e8241d3221d044f034e62.jpg" alt="Escom Letras" />
        </div>
      </div>
    </section>
  );
};

export default EventosHorizontal;
