import React, { useState, useRef, useLayoutEffect } from "react";
import { useAuth } from "../../api/Context/AuthContext";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, ScrollTrigger);

const getCardContent = (id) => {
  const card = document.querySelector(`[data-flip-id="${id}-card"]`);
  if (!card) return [];
  return card.querySelectorAll(".card-content-item");
};

export function Actividades() {
  const tl = useRef(),
    tl2 = useRef();
  library.add(fas, far, fab);

  const [activeCardId, setActiveCardId] = useState(null);
  const stateRef = useRef();
  const containerRef = useRef();
  const isOpening = useRef(false);
  const containerTituloRef = useRef();
  const containerContenidoRef = useRef();

  useLayoutEffect(() => {
    const allContent = document.querySelectorAll(".card-content-item");
    gsap.set(allContent, { opacity: 0 });
  }, []);

  const handleClick = (id) => {
    if (gsap.isTweening(containerRef.current)) return;

    const newActiveId = id === activeCardId ? null : id;
    isOpening.current = newActiveId !== null;

    stateRef.current = Flip.getState(
      containerRef.current.querySelectorAll("[data-flip-id]"),
      { props: "opacity, transform" }
    );

    if (isOpening.current) {
      gsap.to(".card-presentacion", {
        opacity: 0,
        duration: 0.25,
        x: -10,
        onComplete: () => {
          setActiveCardId(newActiveId);
        },
      });
    } else {
      // SI CIERRA: Oculta el contenido Y el título de la tarjeta activa
      const contentItems = getCardContent(activeCardId);
      gsap.to(contentItems, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.25,
      });

      gsap.to(`.card-title-${activeCardId}`, {
        opacity: 0,
        duration: 0.25,
        delay: 0.1,
        onComplete: () => {
          setActiveCardId(newActiveId); // Dispara el Flip
        },
      });
    }
  };

  
  useLayoutEffect(() => {
    if (stateRef.current) {
      // 3. Ejecuta el Flip (solo de las tarjetas)
      Flip.from(stateRef.current, {
        duration: 0.7,
        ease: "power3.inOut",
        scale: true,
        simple: true,
        onComplete: () => {
          if (isOpening.current) {
            const contentItems = getCardContent(activeCardId);
            gsap.set(contentItems, { y: 20 });

            // Muestra el título
            gsap.to(`.card-title-${activeCardId}`, {
              opacity: 1,
              duration: 0.3,
              delay: 0.1,
            });

            gsap.to(contentItems, {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.3,
              delay: 0.2,
            });
          } else {
            gsap.to(".card-presentacion", {
              opacity: 1,
              x: 0,
            });
          }
          stateRef.current = null;
        },
      });
    }
  }, [activeCardId]);

  useGSAP(() => {
    const elements = containerTituloRef.current.children;

    gsap.from(elements, {
      y: 100,
      opacity: 0,
      filter: "blur(5px)",
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerTituloRef.current,
        start: "top center",
        end: "bottom bottom",
      },
    });

    gsap.from(".card-container-deportivas", {
      x: -200,
      opacity: 0,
      filter: "blur(5px)",
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
      },
    });

    gsap.from(".card-container-culturales", {
      x: 200,
      opacity: 0,
      filter: "blur(5px)",
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        
      },
    });

  }, { scope: containerRef });

  const { user } = useAuth();

  return (
    <>
      <section
        className="relative overflow-hidden h-[110vh] w-full"
        id="actividades" ref={containerRef}
      >
        <div
          
          className={`w-full h-full p-20 bg-gradient-to-tl from-escom-900 to-escom-sombra-700 flex flex-col gap-10 font-lexend justify-center items-center`}
        >
        <div ref={containerTituloRef} className="flex flex-col items-center gap-6 w-full p-8">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white">
            Actividades ESCOMunidad
          </h1>
          <p  className="text-base sm:text-lg lg:text-xl xl:text-2xl text-escom-100 font-light ">
            Explora las diversas actividades que ofrece la ESCOMunidad para enriquecer tu experiencia educativa.
          </p>
        </div>
          <div ref={containerContenidoRef} className="flex gap-10 h-full">
            <div
              data-flip-id="deportivas-card"
              className={`card-container-deportivas
                bg-gradient-to-tl from-escom-300 to-white flex rounded-2xl shadow-2x
                ${activeCardId === "deportivas"
                  ? "w-full h-full p-5"
                  : activeCardId
                  ? "w-0 h-0 p-0 opacity-0"
                  : "w-1/2"
              }
              `}
            >
              
              <div
                className={`card-presentacion card-presentacion-deportivas flex overflow-hidden ${
                  activeCardId === "deportivas" ? "hidden" : "h-full w-full"
                }`}
              >
                <div className="w-2/5 h-full relative overflow-hidden rounded-l-2xl">
                  <img
                    src="https://scontent.fmex12-1.fna.fbcdn.net/v/t39.30808-6/558495827_1320564696527411_7563966663239096144_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=0b6BXErUGkEQ7kNvwFuNSYJ&_nc_oc=AdnvtiHUzVzprRMyvP3GQKTKM38ycRtSIFkxMVCr4mLDX_u-AVj9PHrzTik9I-n_ZSe9dNifjE11yZeiN398bO9A&_nc_zt=23&_nc_ht=scontent.fmex12-1.fna&_nc_gid=tW-sRX1Op2vKrGM_BqmDzA&oh=00_AffvgUjHp1wOQfO-IkqiQ5nQVMylAD4k0NaPRx-DjxoaNw&oe=6908F224"
                    alt="Equipo de ESCOM Futbol"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent transition-opacity duration-300 group-hover:bg-black/10"></div>
                </div>
                <div className="w-3/5 h-full flex flex-col justify-center items-center p-6 gap-6 text-escom-sombra-400">
                  <h2 className="text-4xl font-bold">Actividades Deportivas</h2>
                  <button
                    className="mt-6 px-4 py-2 bg-gradient-to-r from-escom-900 to-escom-600 text-white hover:shadow-xl rounded-full w-1/2 cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => handleClick("deportivas")}
                  >
                    Ver más
                  </button>
                </div>
              </div>
              <div
                className={`h-full flex flex-col gap-2 items-center text-escom-sombra-500
              ${activeCardId === "deportivas" ? "relative" : "hidden"}
             card-content-item`}
              >
                <h2 className="text-4xl font-bold p-5">
                  Actividades Deportivas
                </h2>
                <div className=" flex w-full h-full gap-3">
                  <div className="bg-gradient-to-r from-escom-100 to-escom-200 rounded-4xl p-5 w-full flex items-center flex-col gap-3  relative shadow-2xl">
                    <span className="text-5xl">
                      <FontAwesomeIcon icon="fa-regular fa-futbol" />
                    </span>
                    <h3 className="text-3xl font-bold">Fútbol</h3>
                    <p className="text-justify">
                      Se parte experiencias unicas con nosotros en el equipo de
                      fútbol oficial de la ESCOM, y representa los colores de
                      nuestra institución.
                    </p>
                    <div className="w-full flex flex-wrap items-center gap-2">
                      <span className="bg-escom-200 border-2 border-escom-sombra-50 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Martes
                        16:00 - 19:00
                      </span>
                      <span className="bg-escom-300/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Miercoles
                        10:00 - 18:00
                      </span>
                      <span className="bg-escom-200 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Viernes
                        12:00 - 20:00
                      </span>
                      <span className="bg-escom-800/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-user" /> Prof.
                        Diego Espinosa Gómez
                      </span>
                      <span className="bg-white/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-900/90">
                        <FontAwesomeIcon icon="fa-solid fa-venus-mars" />{" "}
                        Masculino/Femenino
                      </span>
                    </div>
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-900 text-white rounded-full w-3/4 cursor-pointer">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-escom-200 rounded-4xl p-5 w-full flex items-center flex-col gap-3 relative shadow-2xl">
                    <span className="text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-volleyball" />
                    </span>
                    <h3 className="text-3xl font-bold">Voleibol</h3>
                    <p className="text-justify">
                      Se parte experiencias unicas con nosotros en el equipo de
                      voleibol oficial de la ESCOM, y representa los colores de
                      nuestra institución.
                    </p>
                    <div className="w-full flex flex-wrap items-center gap-2">
                      <span className="bg-escom-200 border-2 border-escom-sombra-50 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Martes
                        12:00 - 19:00
                      </span>
                      <span className="bg-escom-300/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Jueves
                        12:00 - 18:00
                      </span>
                      <span className="bg-escom-800/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-user" /> Prof. Hugo
                        Hernández Vera
                      </span>
                      <span className="bg-white/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-900/90">
                        <FontAwesomeIcon icon="fa-solid fa-venus-mars" />{" "}
                        Masculino/Femenino
                      </span>
                    </div>
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-900 text-white rounded-full w-3/4 cursor-pointer">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-gradient-to-l from-escom-100 to-escom-200 rounded-4xl p-5 w-full flex flex-col gap-3  relative shadow-2xl">
                    <span className="text-5xl text-center">
                      <FontAwesomeIcon icon="fa-solid fa-users" />
                    </span>
                    <h3 className="text-3xl font-bold text-center">Clubes</h3>
                    <p className="text-justify">
                      Los clubes son espacios de convivencia y aprendizaje donde
                      puedes desarrollar tus habilidades y conocer a personas
                      con intereses similares.
                    </p>
                    <ul className="list-disc list-inside">
                      <li>Club de Ajedrez</li>
                      <li>Club de Robótica</li>
                      <li>Club de Programación</li>
                      <li>Club de Fotografía</li>
                      <li>Club de Música</li>
                    </ul>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-3 text-escom-100">
                  <div className="w-full bg-escom-sombra-400 rounded-4xl p-5">
                    <h2 className="text-2xl font-semibold">Informes</h2>
                    <div className="flex flex-col">
                      <span>
                        <FontAwesomeIcon icon="fa-solid fa-phone" /> Tel
                        57296000 Ext. 52063
                      </span>
                      <span>
                        <FontAwesomeIcon icon="fa-solid fa-envelope" />{" "}
                        cultura_y_deportes_escom@ipn.mx
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-escom-sombra-400 rounded-4xl p-5 text-right">
                    <h2 className="text-2xl">Documentos</h2>
                    <div className="flex flex-col">
                      <span>
                        Documento A:{" "}
                        <FontAwesomeIcon icon="fa-solid fa-file-pdf" />
                        <a
                          href="https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/SSEIS_ProcedimientoClubes_2022.pdf"
                          className="hover:underline"
                        >
                          Procedimiento de registro y gestion de clubes
                        </a>
                      </span>
                      <span>
                        Documento B:{" "}
                        <FontAwesomeIcon icon="fa-solid fa-file-excel" />
                        <a
                          href="https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/FormatoSolicitudMateriales.xlsx"
                          className="hover:underline"
                        >
                          Formato para solicitud de material de clubes
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="absolute top-0 right-0 px-4 py-2 bg-escom-700 text-white rounded-lg card-content-item cursor-pointer z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(null);
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>

            {/* --- TARJETA CULTURALES --- */}
            <div
              data-flip-id="culturales-card"
              className={`card-container-culturales
              bg-gradient-to-tl from-escom-sombra-300 to-escom-700 flex rounded-2xl
              ${activeCardId === "culturales"
                  ? "w-full h-full p-5"
                  : activeCardId
                    ? "w-0 h-0 p-0 opacity-0 pointer-events-none"
                    : "w-1/2"
                }`}

            >
              <div
                className={`card-presentacion card-presentacion-culturales flex overflow-hidden ${
                  activeCardId === "culturales" ? "hidden" : "h-full w-full"
                }`}
              >
                <div className="w-3/5 h-full flex flex-col justify-center items-center p-6 gap-6 text-white">
                  <h2 className="text-4xl font-bold">Actividades Culturales</h2>
                  
                  <button
                    className="mt-6 px-4 py-2 bg-gradient-to-r from-escom-300 to-escom-100 text-escom-900 hover:shadow-xl rounded-full w-1/2 cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => handleClick("culturales")}
                  >
                    Ver más
                  </button>
                </div>
                <div className="w-2/5 h-full relative overflow-hidden rounded-r-2xl">
                  <img
                    src="https://scontent.fmex12-1.fna.fbcdn.net/v/t39.30808-6/560468497_1320564196527461_7451893167480850825_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=0ESi43w5e-IQ7kNvwHc9qj5&_nc_oc=AdkvC1Z_WBUjnOZBhiRVrcBy7e7rG4rwvEoElR8lBM5aQYrhxOnb0gP-dfuqFyglFoNtmEq0TRGWj3440IyFa62i&_nc_zt=23&_nc_ht=scontent.fmex12-1.fna&_nc_gid=W9QvpIiF9xYdFuV8AAFNTA&oh=00_AffUzpo7YMNute4qTHyMOOwjBmfTRKX__13Xa9vGhSLs1g&oe=6908EA27"
                    alt="Equipo de ESCOM Futbol"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent transition-opacity duration-300 group-hover:bg-black/10"></div>
                </div>
              </div>
              <div
                className={`h-full flex flex-col gap-2 items-center text-escom-200
              ${activeCardId === "culturales" ? "relative" : "hidden"}
             card-content-item`}
              >
                <h2 className="text-4xl font-bold p-5">
                  Actividades Culturales
                </h2>
                <div className=" flex w-full h-full gap-3">
                  <div className="bg-gradient-to-r from-escom-sombra-300 to-escom-700 rounded-4xl p-5 w-full flex items-center flex-col gap-3  relative shadow-2xl">
                    <span className="text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-palette" />
                    </span>
                    <h3 className="text-3xl font-bold">Artes Plasticas</h3>
                    <p className="text-justify">
                      Aprende a expresar tus emociones y sentimientos por medio
                      de la pintura y el dibujo.
                    </p>
                    <div className="w-full flex flex-wrap items-center gap-2">
                      <span className="bg-escom-200 border-2 border-escom-sombra-50 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Martes
                        13:00 - 18:00
                      </span>
                      <span className="bg-escom-200 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Viernes
                        13:00 - 18:00
                      </span>
                      <span className="bg-escom-800/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-user" /> Prof.
                        Martha Aurora Torres Hernández
                      </span>
                    </div>
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-300 text-escom-900 rounded-full w-3/4 cursor-pointer">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>

                  <div className="bg-escom-700 rounded-4xl p-5 w-full flex items-center flex-col gap-3 relative shadow-2xl">
                    <span className="text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-feather-pointed" />
                    </span>
                    <h3 className="text-3xl font-bold">Creacion Literaria</h3>
                    <p className="text-justify">
                      Podrás adquirir técnicas y métodos para formar hábitos de
                      lectura y escritura. Además prepara a los alumnos para
                      participar en concursos de poesía, cuento, lectura en
                      atril y declamación.
                    </p>
                    <div className="w-full flex flex-wrap items-center gap-2">
                      <span className="bg-escom-200 border-2 border-escom-sombra-50 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Jueves
                        12:00 - 19:00
                      </span>
                      <span className="bg-escom-800/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-user" /> Prof. Hugo
                        Hernández Vera
                      </span>
                    </div>
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-300 text-escom-900 rounded-full w-3/4 cursor-pointer">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-escom-700 rounded-4xl p-5 w-full flex items-center flex-col gap-3 relative shadow-2xl">
                    <span className="text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-masks-theater" />
                    </span>
                    <h3 className="text-3xl font-bold">Teatro</h3>
                    <p className="text-justify">
                      Aprende a expresarte en público a través de diversas
                      técnicas teatrales, contribuyendo así a un mejor
                      desarrollo integral.
                    </p>
                    <div className="w-full flex flex-wrap items-center gap-2">
                      <span className="bg-escom-200 border-2 border-escom-sombra-50 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Martes
                        12:00 - 15:00
                      </span>
                      <span className="bg-escom-300/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-sombra-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-clock" /> Jueves
                        15:30 - 18:30
                      </span>
                      <span className="bg-escom-800/60 border-2 border-escom-sombra-300 rounded-full text-xs px-3 py-1 text-escom-100/90">
                        <FontAwesomeIcon icon="fa-regular fa-user" /> Prof.
                        Verónica Hernández
                      </span>
                    </div>
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-300 text-escom-900 rounded-full w-3/4 cursor-pointer">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-gradient-to-l from-escom-sombra-300 to-escom-700 rounded-4xl p-5 w-full flex flex-col gap-3  relative shadow-2xl">
                    <span className="text-5xl text-center">
                      <FontAwesomeIcon icon="fa-solid fa-users" />
                    </span>
                    <h3 className="text-3xl font-bold text-center">Clubes</h3>
                    <p className="text-justify">
                      Los clubes son espacios de convivencia y aprendizaje donde
                      puedes desarrollar tus habilidades y conocer a personas
                      con intereses similares.
                    </p>
                    <ul className="list-disc list-inside">
                      <li>Tuna ESCOM</li>
                      <li>Algoritmo de baile</li>
                      <li>Anime</li>
                    </ul>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-3 text-escom-sombra-100">
                  <div className="w-full bg-escom-400 rounded-4xl p-5">
                    <h2 className="text-2xl font-semibold">Informes</h2>
                    <div className="flex flex-col">
                      <span>
                        <FontAwesomeIcon icon="fa-solid fa-phone" /> Tel
                        57296000 Ext. 52063
                      </span>
                      <span>
                        <FontAwesomeIcon icon="fa-solid fa-envelope" />{" "}
                        cultura_y_deportes_escom@ipn.mx
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-escom-400 rounded-4xl p-5 text-right">
                    <h2 className="text-2xl">Documentos</h2>
                    <div className="flex flex-col">
                      <span>
                        Documento A:{" "}
                        <FontAwesomeIcon icon="fa-solid fa-file-pdf" />
                        <a
                          href="https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/SSEIS_ProcedimientoClubes_2022.pdf"
                          className="hover:underline"
                        >
                          Procedimiento de registro y gestion de clubes
                        </a>
                      </span>
                      <span>
                        Documento B:{" "}
                        <FontAwesomeIcon icon="fa-solid fa-file-excel" />
                        <a
                          href="https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/FormatoSolicitudMateriales.xlsx"
                          className="hover:underline"
                        >
                          Formato para solicitud de material de clubes
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="absolute top-0 right-0 px-4 py-2 bg-escom-700 text-white rounded-lg card-content-item cursor-pointer z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(null);
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Actividades;
