import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../api/Context/AuthContext";

export const TarjetaActividad = ({ 
  data, 
  isActive, 
  isHidden,
  onClick, 
  user 
}) => {
  const { 
    id, 
    titulo, 
    descripcion, 
    imagen, 
    subtitulo, 
    items, 
    informes, 
    documentos, 
    estilos 
  } = data;

  return (
    <div
      data-flip-id={`${id}-card`}
      className={`card-container-${id}
        ${estilos.contenedor} flex rounded-3xl shadow-xl
        ${isActive
          ? "w-full h-[700px] md:h-full p-3 md:p-5"
          : isHidden
          ? "w-0 h-0 p-0 opacity-0"
          : "w-full md:w-1/2 h-[400px] md:h-[700px]"
      }
      `}
    >
      <div
        className={`card-presentacion card-presentacion-${id} group rounded-3xl flex flex-col md:flex-row overflow-hidden ${
          isActive ? "hidden" : "h-full w-full"
        }`}
      >
        <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden">
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-95" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-escom-800/20 via-transparent to-escom-sombra-500/30"></div>
        </div>
        <div className={`w-full md:w-3/5 h-auto md:h-full flex flex-col justify-center items-start p-6 md:p-8 lg:p-10 gap-3 md:gap-4 lg:gap-5 ${estilos.presentacion} relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col gap-2 md:gap-3 lg:gap-4">
            <span className={`${estilos.textoSubtitulo} font-semibold text-xs md:text-sm uppercase tracking-wider`}>{subtitulo}</span>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ${estilos.textoTitulo} leading-tight`}>{titulo}</h2>
            <p className={`${estilos.textoDescripcion} text-sm md:text-base leading-relaxed`}>
              {descripcion}
            </p>
            <button
              className={`mt-2 md:mt-4 px-6 md:px-8 py-2 md:py-3 ${estilos.boton} font-semibold rounded-full w-fit cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base`}
              onClick={() => onClick(id)}
            >
              Ver más
            </button>
          </div>
        </div>
      </div>

      <div
        className={`h-full w-full flex flex-col gap-2 items-center overflow-y-auto
      ${isActive ? "relative p-4" : "hidden"}
     card-content-item`}
      >
        <h2 className={`card-title-${id} text-2xl md:text-3xl lg:text-4xl font-bold p-3 md:p-5 sticky top-0 rounded-3xl backdrop-blur-sm z-10 w-full text-center ${estilos.textoTitulo} `}>
          {titulo}
        </h2>
        <div className="flex flex-col md:flex-row w-full h-auto gap-3 px-2">
          {items.map((item, index) => (
            <div key={index} className={`${item.colorFondo} rounded-3xl p-4 md:p-5 w-full md:w-1/3 flex items-center flex-col gap-2 md:gap-3 relative shadow-lg min-h-[300px]`}>
              <span className={`text-4xl md:text-5xl text-center ${item.colorTexto || ''}`}>
                <FontAwesomeIcon icon={item.icono} />
              </span>
              <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold text-center ${item.colorTexto || ''}`}>{item.titulo}</h3>
              <p className={`text-justify text-sm md:text-base ${item.colorTexto || ''}`}>
                {item.descripcion}
              </p>
              
              {item.horarios && (
                <div className="w-full flex flex-wrap items-center gap-2">
                  {item.horarios.map((horario, idx) => (
                    <span key={idx} className="bg-escom-100 border-2 border-escom-300 rounded-full text-xs px-3 py-1 text-escom-800">
                      <FontAwesomeIcon icon="fa-regular fa-clock" /> {horario.dia} {horario.hora}
                    </span>
                  ))}
                  {item.profesor && (
                    <span className="bg-escom-700 border-2 border-escom-500 rounded-full text-xs px-3 py-1 text-white">
                      <FontAwesomeIcon icon="fa-regular fa-user" /> {item.profesor}
                    </span>
                  )}
                  {item.genero && (
                    <span className="bg-white border-2 border-escom-400 rounded-full text-xs px-3 py-1 text-escom-800">
                      <FontAwesomeIcon icon="fa-solid fa-venus-mars" /> {item.genero}
                    </span>
                  )}
                </div>
              )}

              {item.lista && (
                <ul className={`list-disc list-inside text-sm md:text-base ${item.colorTexto || ''}`}>
                  {item.lista.map((li, idx) => (
                    <li key={idx}>{li}</li>
                  ))}
                </ul>
              )}

              {!item.lista && (
                 <button className="mt-auto px-4 py-2 bg-escom-700 hover:bg-escom-800 text-white rounded-full w-full cursor-pointer text-sm md:text-base transition-colors duration-300">
                 {user != null ? "Gestionar Actividad" : "Unirme"}
               </button>
              )}
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-3 text-white mt-4">
          <div className="w-full md:w-1/2 bg-escom-600 rounded-3xl p-4 md:p-5 shadow-md">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Informes</h2>
            <div className="flex flex-col text-sm md:text-base">
              <span>
                <FontAwesomeIcon icon="fa-solid fa-phone" /> Tel {informes.telefono}
              </span>
              <span>
                <FontAwesomeIcon icon="fa-solid fa-envelope" /> {informes.correo}
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-escom-600 rounded-3xl p-4 md:p-5 md:text-right shadow-md">
            <h2 className="text-lg md:text-xl lg:text-2xl">Documentos</h2>
            <div className="flex flex-col text-sm md:text-base">
              {documentos.map((doc, index) => (
                <span key={index}>
                  Documento {String.fromCharCode(65 + index)}:{" "}
                  <FontAwesomeIcon icon={`fa-solid fa-file-${doc.tipo === 'pdf' ? 'pdf' : 'excel'}`} />
                  <a href={doc.url} className="hover:underline"> {doc.nombre}</a>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button
          className="absolute top-0 right-0 px-4 py-4 bg-escom-100/80 text-escom-700 transition-all duration-300 rounded-full card-content-item cursor-pointer z-50 hover:text-escom-900 hover:bg-escom-200"
          onClick={(e) => {
            e.stopPropagation();
            onClick(null);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-close" className="text-lg md:text-lg sm:text-2xl " />
        </button>
      </div>
    </div>
  );
};
