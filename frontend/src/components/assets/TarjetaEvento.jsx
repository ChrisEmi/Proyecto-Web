import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TarjetaEvento = ({ evento, onClickAbrirDetalles }) => {
  return (
    <div className="bg-white m-2 md:m-5 relative flex flex-col lg:flex-row rounded-2xl shadow-2xl min-h-[200px] evento-card overflow-hidden">
      <div className="evento-imagen relative w-full lg:w-3/10 h-48 lg:h-auto text-sm flex ">
        <div className="absolute w-full h-full bg-gradient-to-r from-escom-sombra-400/70 to-transparent" />
        {evento.imagenes && evento.imagenes.length > 0 ? (
          <img
            src={evento.imagenes[0].src}
            alt={evento.titulo_evento}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-escom-100 flex flex-col gap-3 items-center justify-center">
            <FontAwesomeIcon
              icon={["fas", "image"]}
              className="text-escom-sombra-400 text-7xl"
            />
            <span className="text-escom-sombra-500 font-medium">
              Sin imagenes
            </span>
          </div>
        )}
      </div>
      <div className="evento-detalles w-full lg:w-5/10 p-4 flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-escom-sombra-400 mb-2 uppercase px-2 md:px-4 py-2">
          {evento.titulo_evento}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="bg-escom-300/40 col-span-full rounded-2xl px-4 py-2">
            <h3 className="font-semibold text-sm md:text-base">
              Descripcion{" "}
              <FontAwesomeIcon
                icon={["fas", "info-circle"]}
                className="text-escom-700"
              />
            </h3>
            <p className="text-escom-sombra-800 mb-1 font-light text-sm md:text-base">
              {evento.descripcion}
            </p>
          </div>
          {evento.tags && evento.tags.length > 0 && (
            <div className="col-span-full bg-escom-600/30 rounded-2xl px-4 py-2">
              <h3 className="font-semibold mb-2 text-escom-sombra-900 text-sm md:text-base">
                Etiquetas{" "}
                <FontAwesomeIcon
                  icon={["fas", "tags"]}
                  className="text-escom-900"
                />
              </h3>
              <div className="flex flex-wrap gap-2">
                {evento.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-escom-800/60 text-white text-xs rounded-full font-medium"
                  >
                    <FontAwesomeIcon
                      icon={["fas", "tag"]}
                      className="text-xs"
                    />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
            <h3 className="py-2 text-xs md:text-sm">
              Fecha de Creacion{" "}
              <FontAwesomeIcon
                icon={["fas", "calendar"]}
                className="text-escom-500"
              />
            </h3>
            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
              {new Date(evento.fecha_creacion).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
            <h3 className="py-2 text-xs md:text-sm">
              Fecha{" "}
              <FontAwesomeIcon
                icon={["fas", "calendar-alt"]}
                className="text-escom-500"
              />
            </h3>
            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
              {new Date(evento.fecha).toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              <span className="block sm:inline">
                {new Date(evento.fecha).toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
            <h3 className="py-2 text-xs md:text-sm">
              Ubicacion{" "}
              <FontAwesomeIcon
                icon={["fas", "map-marker-alt"]}
                className="text-escom-500"
              />
            </h3>
            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
              {evento.ubicacion}
            </p>
          </div>
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
            <h3 className="py-2 text-xs md:text-sm">
              Cupo{" "}
              <FontAwesomeIcon
                icon={["fas", "users"]}
                className="text-escom-500"
              />
            </h3>
            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
              {evento.cupo}
            </p>
          </div>
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
            <h3 className="py-2 text-xs md:text-sm">
              Categoria{" "}
              <FontAwesomeIcon
                icon={["fas", "tags"]}
                className="text-escom-500"
              />
            </h3>
            <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
              {evento.nombre_categoria}
            </p>
          </div>
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
            <h3 className="py-2 text-xs md:text-sm">
              Estatus{" "}
              <FontAwesomeIcon
                icon={["fas", "list-check"]}
                className="text-escom-500"
              />
            </h3>
            <p
              className={`px-2 md:px-4 py-2 text-xs md:text-sm mt-2 rounded-full mb-1 font-semibold text-center ${
                evento.estado === "Verificado"
                  ? "bg-escom-200 text-escom-sombra-400"
                  : "bg-escom-800/80 text-white"
              }`}
            >
              {evento.estado}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:flex-1 flex items-center justify-center p-4">
        <button
          className="bg-escom-800 text-white px-4 md:px-18 py-3 md:py-4 rounded-xl hover:bg-escom-800 transition-all duration-300 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg text-sm md:text-base w-full lg:w-auto justify-center"
          onClick={() => onClickAbrirDetalles(evento.id_evento)}
        >
          Ver Detalles
          <FontAwesomeIcon icon={["fas", "arrow-right"]} />
        </button>
      </div>
    </div>
  );
};
