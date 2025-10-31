import React, { useEffect, useRef } from 'react'; // 1. Importar useRef
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as maptiler from '@maptiler/leaflet-maptilersdk';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";


const miSvgString = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker-svg">
    <circle 
      cx="16" 
      cy="16" 
      r="13" 
      fill="#124465" 
      stroke="#ffffff" 
      stroke-width="3" 
    />
  </svg>
`;

const miSvgIcon = L.divIcon({
  html: miSvgString,
  className: 'mi-svg-icon', 
  iconSize: [30, 30],      
  iconAnchor: [15, 15],    
  popupAnchor: [0, -15]    
});


const Contacto = () => {
   const tl = useRef(),
      tl2 = useRef();
  library.add(fas, far, fab);
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
        
      const map = L.map(mapContainerRef.current).setView([19.504663, -99.146814], 17);
      mapInstanceRef.current = map; 

      new maptiler.maptilerLayer({
        apiKey: "7zXKmDGywk3HoQIE2wf0",
        style: "019a3930-4ec6-7785-938e-8b79940ee1f4",
        zoom: 160,
      }).addTo(map);

      L.marker([19.504663, -99.146814], { icon: miSvgIcon }).addTo(map)
        .bindPopup('ESCOM', { closeButton: false, autoClose: false })
        .openPopup();
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  

  return (
    <section className="bg-gradient-to-b from-white to-escom-100 flex flex-col overflow-hidden h-[105vh] w-full relative" id="contacto">
      <style jsx>{`
        .leaflet-popup-content-wrapper {
          width: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
          background-color: #FFFFF;
          padding: 0;
          font-family: 'Lexend', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #124465;
        }

        
        .leaflet-popup-tip-container {
          display: none;
        }

        .mi-svg-icon {
          background: transparent;
          border: none;
        }
    `}</style>
      <div className="flex flex-col items-center gap-6 w-full p-8">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-escom-700 to-escom-sombra-600 leading-tight">
            Contacto
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-escom-900 font-extralight w-3/5 text-center">
            Estamos aquí para ayudarte. Si tienes alguna pregunta, sugerencia o simplemente quieres ponerte en contacto con nosotros, no dudes en hacerlo a través de los siguientes medios
          </p>
      </div>
      <div className="flex gap-8 w-full h-full justify-center items-center p-16 ">
        <div className="flex flex-col gap-6 w-2/5 h-full p-9 rounded-xl shadow-2xl text-escom-sombra-400 bg-gradient-to-b from-white to-escom-100 hover:shadow-escom-sombra-900/50 transition-all duration-300 hover:scale-[1.03] justify-start">
          <h2 className='font-bold text-2xl'>Dirección <FontAwesomeIcon icon="fa-solid fa-compass" /></h2>
          <p className='font-medium text-xl'>Escuela Superior de Cómputo Av. Juan de Dios Bátiz s/n esq. Av. Miguel Othón de Mendizabal. Colonia Lindavista. Alcaldia: Gustavo A. Madero. C. P. 07738. Ciudad de México.</p>
          <h2 className='font-bold text-2xl'>Teléfono <FontAwesomeIcon icon="fa-solid fa-phone" /></h2>
          <p className='font-medium text-xl'>(55) 1234-5678</p>
          <h2 className='font-bold text-2xl'>Correo Electrónico <FontAwesomeIcon icon="fa-solid fa-envelope" /></h2>
          <p className='font-medium text-xl'>contacto@escuela.edu.mx</p>
          <h2 className='font-bold text-2xl'>Redes Sociales</h2>
          <div className="flex gap-3">
              <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Facebook">
                  <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Twitter">
                  <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
                  <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
              </a>
          </div>
        </div>
        <div className="w-3/5 h-full flex justify-center items-center rounded-xl shadow-2xl overflow-hidden hover:shadow-escom-sombra-900/50 transition-all duration-300 hover:scale-[1.03]">
          <div ref={mapContainerRef} className="w-full h-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;