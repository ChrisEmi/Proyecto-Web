import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TarjetaEvento = ({ evento, onClickAbrirDetalles, tipoUsuario = "default", onClickAbrirInscritos }) => {
  return (
    <div className="bg-white m-2 md:m-5 relative flex flex-col lg:flex-row rounded-2xl shadow-lg min-h-[300px] max-h-[650px] w-full evento-card xl:overflow-hidden overflow-auto md:hover:scale-101 hover:shadow-2xl transition-all duration-400">
      <div className="evento-imagen relative w-full lg:w-3/10 h-48 lg:h-auto max-h-[600px] text-sm flex shrink-0">
        <div className="absolute w-full h-full bg-gradient-to-r from-escom-sombra-400/70 to-transparent" />
        {evento.imagenes && evento.imagenes.length > 0 ? (
          <img
            src={evento.imagenes[0].src}
            alt={evento.titulo_evento}
            className="w-full h-auto  object-cover"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="bg-escom-300/40 col-span-2 lg:col-span-3 rounded-2xl px-4 py-2 max-h-28 overflow-y-hidden">
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
            <div className="col-span-2 lg:col-span-3 bg-escom-600/30 rounded-2xl px-4 py-2">
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
              Fecha de Inicio{" "}
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
          {evento.fecha_final && (
            <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2">
              <h3 className="py-2 text-xs md:text-sm">
                Fecha de Fin{" "}
                <FontAwesomeIcon
                  icon={["fas", "calendar-check"]}
                  className="text-escom-500"
                />
              </h3>
              <p className="text-escom-sombra-500 mb-1 font-medium text-xs md:text-sm">
                {new Date(evento.fecha_final).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                <span className="block sm:inline">
                  {new Date(evento.fecha_final).toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>
          )}
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
          <div className="font-bold text-escom-sombra-900 mb-2 px-2 md:px-4 py-2 col-span-2 xl:col-span-1">
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
      <div className="w-full lg:flex-1 flex flex-col gap-4 items-center justify-center p-4 shrink-0">
        <button
          className="bg-escom-800 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl hover:bg-escom-900 transition-all duration-300 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg text-sm md:text-base w-full lg:w-auto justify-center"
          onClick={() => onClickAbrirDetalles(evento.id_evento)}
        >
          Ver Detalles
          <FontAwesomeIcon icon={["fas", "arrow-right"]} />
        </button>
        {tipoUsuario === "organizador" && (
          <button
          className="bg-escom-700 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl hover:bg-escom-900 transition-all duration-300 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg text-sm md:text-base w-full lg:w-auto justify-center"
          onClick={() => onClickAbrirInscritos(evento.id_evento)}
          >
            Ver Inscritos
            <FontAwesomeIcon icon={["fas", "users"]} />
          </button>
        )}
      </div>
    </div>
  );
};
