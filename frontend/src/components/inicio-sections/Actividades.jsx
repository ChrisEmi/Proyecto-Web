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
        className="relative overflow-hidden min-h-[120vh] flex justify-center items-center w-full bg-gradient-to-b from-escom-200 via-white to-escom-300 py-12 md:py-16 lg:py-20"
        id="actividades" ref={containerRef}
      >
        <div
          
          className={`w-full h-full px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col gap-8 md:gap-10 font-lexend justify-center items-center`}
        >
        <div ref={containerTituloRef} className="flex flex-col items-center gap-3 md:gap-4 w-full mb-4 md:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-escom-900 via-escom-700 to-escom-sombra-500 text-center">
            Actividades ESCOMunidad
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-escom-sombra-400 font-normal max-w-3xl text-center px-4">
            Explora las diversas actividades que ofrece la ESCOMunidad para enriquecer tu experiencia educativa.
          </p>
        </div>
          <div ref={containerContenidoRef} className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 w-full">
            <div
              data-flip-id="deportivas-card"
              className={`card-container-deportivas
                bg-gradient-to-tl from-escom-300 to-escom-100 flex rounded-2xl shadow-2xl
                ${activeCardId === "deportivas"
                  ? "w-full h-[700px] md:h-full p-3 md:p-5"
                  : activeCardId
                  ? "w-0 h-0 p-0 opacity-0"
                  : "w-full md:w-1/2 h-[400px] md:h-[700px]"
              }
              `}
            >
              
              <div
                className={`card-presentacion card-presentacion-deportivas group rounded-2xl flex flex-col md:flex-row overflow-hidden ${
                  activeCardId === "deportivas" ? "hidden" : "h-full w-full"
                }`}
              >
                <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden">
                  <img
                    src="../../../assets/actividades-deportivas.jpg"
                    alt="Actividades Deportivas"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-escom-900/30 via-transparent to-escom-sombra-700/40"></div>
                </div>
                <div className="w-full md:w-3/5 h-auto md:h-full flex flex-col justify-center items-start p-6 md:p-8 lg:p-10 gap-3 md:gap-4 lg:gap-5 bg-gradient-to-br from-escom-200 to-escom-100 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-2 md:gap-3 lg:gap-4">
                    <span className="text-escom-700 font-semibold text-xs md:text-sm uppercase tracking-wider">Deporte</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-escom-900 leading-tight">Actividades Deportivas</h2>
                    <p className="text-escom-sombra-400 text-sm md:text-base leading-relaxed">
                      Forma parte de nuestros equipos representativos y compite en torneos inter-politécnicos
                    </p>
                    <button
                      className="mt-2 md:mt-4 px-6 md:px-8 py-2 md:py-3 bg-escom-700 text-white hover:bg-escom-900 font-semibold rounded-full w-fit cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                      onClick={() => handleClick("deportivas")}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`h-full w-full flex flex-col gap-2 items-center text-escom-sombra-500 overflow-y-auto
              ${activeCardId === "deportivas" ? "relative p-4" : "hidden"}
             card-content-item`}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold p-3 md:p-5 sticky top-0 rounded-2xl backdrop-blur-sm z-10 w-full text-center">
                  Actividades Deportivas
                </h2>
                <div className="flex flex-col md:flex-row w-full h-auto gap-3 px-2">
                  <div className="bg-gradient-to-r from-escom-100 to-escom-200 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex items-center flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[300px]">
                    <span className="text-4xl md:text-5xl">
                      <FontAwesomeIcon icon="fa-regular fa-futbol" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Fútbol</h3>
                    <p className="text-justify text-sm md:text-base">
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
                    <button className="mt-auto px-4 py-2 bg-escom-900 text-white rounded-full w-full md:w-3/4 cursor-pointer text-sm md:text-base">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-escom-200 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex items-center flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[300px]">
                    <span className="text-4xl md:text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-volleyball" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Voleibol</h3>
                    <p className="text-justify text-sm md:text-base">
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
                    <button className="mt-auto px-4 py-2 bg-escom-900 text-white rounded-full w-full md:w-3/4 cursor-pointer text-sm md:text-base">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-gradient-to-l from-escom-100 to-escom-200 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[300px]">
                    <span className="text-4xl md:text-5xl text-center">
                      <FontAwesomeIcon icon="fa-solid fa-users" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Clubes</h3>
                    <p className="text-justify text-sm md:text-base">
                      Los clubes son espacios de convivencia y aprendizaje donde
                      puedes desarrollar tus habilidades y conocer a personas
                      con intereses similares.
                    </p>
                    <ul className="list-disc list-inside text-sm md:text-base">
                      <li>Club de Ajedrez</li>
                      <li>Club de Robótica</li>
                      <li>Club de Programación</li>
                      <li>Club de Fotografía</li>
                      <li>Club de Música</li>
                    </ul>
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-3 text-escom-100 mt-4">
                  <div className="w-full md:w-1/2 bg-escom-sombra-400 rounded-4xl p-4 md:p-5">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Informes</h2>
                    <div className="flex flex-col text-sm md:text-base">
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
                  <div className="w-full md:w-1/2 bg-escom-sombra-400 rounded-4xl p-4 md:p-5 md:text-right">
                    <h2 className="text-lg md:text-xl lg:text-2xl">Documentos</h2>
                    <div className="flex flex-col text-sm md:text-base">
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
                  className="absolute top-0 right-0 px-4 py-2  bg-escom-700 text-white rounded-lg card-content-item cursor-pointer z-50"
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
              bg-gradient-to-tl from-escom-sombra-300 to-escom-700 flex rounded-2xl shadow-2xl
              ${activeCardId === "culturales"
                  ? "w-full h-[700px] md:h-full p-3 md:p-5"
                  : activeCardId
                  ? "w-0 h-0 p-0 opacity-0"
                  : "w-full md:w-1/2 h-[400px] md:h-[700px]"
                }`}

            >
              <div
                className={`card-presentacion card-presentacion-culturales group flex flex-col-reverse md:flex-row rounded-2xl overflow-hidden ${
                  activeCardId === "culturales" ? "hidden" : "h-full w-full"
                }`}
              >
                <div className="w-full md:w-3/5 h-auto md:h-full flex flex-col justify-center items-start p-6 md:p-8 lg:p-10 gap-3 md:gap-4 lg:gap-5 bg-gradient-to-bl from-escom-700 via-escom-sombra-50 to-escom-800 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-2 md:gap-3 lg:gap-4">
                    <span className="text-escom-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Cultura</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">Actividades Culturales</h2>
                    <p className="text-escom-100 text-sm md:text-base leading-relaxed">
                      Desarrolla tu creatividad y talento artístico en nuestros talleres culturales
                    </p>
                    <button
                      className="mt-2 md:mt-4 px-6 md:px-8 py-2 md:py-3 bg-white text-escom-900 hover:bg-escom-300 font-semibold rounded-full w-fit cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                      onClick={() => handleClick("culturales")}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden">
                  <img
                    src="../../../assets/actividades-culturales.jpg"
                    alt="Actividades Culturales"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90"
                  />
                </div>
              </div>
              <div
                className={`h-full w-full flex flex-col gap-2 items-center text-escom-200 overflow-y-auto
                  ${activeCardId === "culturales" ? "relative p-4" : "hidden"}
                card-content-item`}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold p-3 md:p-5 sticky top-0 rounded-2xl backdrop-blur-sm z-10 w-full text-center">
                  Actividades Deportivas
                </h2>
                <div className="flex flex-col md:flex-row w-full h-auto gap-3 px-2">
                  <div className="bg-gradient-to-r from-escom-sombra-300 to-escom-700 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex items-center flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[400px]">
                    <span className="text-3xl md:text-4xl lg:text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-palette" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Artes Plasticas</h3>
                    <p className="text-justify text-sm md:text-base">
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
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-300 text-escom-900 rounded-full w-3/4 cursor-pointer text-sm md:text-base">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>

                  <div className="bg-escom-700 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex items-center flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[400px]">
                    <span className="text-3xl md:text-4xl lg:text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-feather-pointed" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Creacion Literaria</h3>
                    <p className="text-justify text-sm md:text-base">
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
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-300 text-escom-900 rounded-full w-3/4 cursor-pointer text-sm md:text-base">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-escom-700 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex items-center flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[400px]">
                    <span className="text-3xl md:text-4xl lg:text-5xl">
                      <FontAwesomeIcon icon="fa-solid fa-masks-theater" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Teatro</h3>
                    <p className="text-justify text-sm md:text-base">
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
                    <button className="absolute bottom-4 px-4 py-2 bg-escom-300 text-escom-900 rounded-full w-3/4 cursor-pointer text-sm md:text-base">
                      {user != null ? "Gestionar Actividad" : "Unirme"}
                    </button>
                  </div>
                  <div className="bg-gradient-to-l from-escom-sombra-300 to-escom-700 rounded-4xl p-4 md:p-5 w-full md:w-1/3 flex flex-col gap-2 md:gap-3 relative shadow-2xl min-h-[400px]">
                    <span className="text-3xl md:text-4xl lg:text-5xl text-center">
                      <FontAwesomeIcon icon="fa-solid fa-users" />
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Clubes</h3>
                    <p className="text-justify text-sm md:text-base">
                      Los clubes son espacios de convivencia y aprendizaje donde
                      puedes desarrollar tus habilidades y conocer a personas
                      con intereses similares.
                    </p>
                    <ul className="list-disc list-inside text-sm md:text-base">
                      <li>Tuna ESCOM</li>
                      <li>Algoritmo de baile</li>
                      <li>Anime</li>
                    </ul>
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-3 text-escom-sombra-100 mt-4">
                  <div className="w-full md:w-1/2 bg-escom-400 rounded-4xl p-4 md:p-5">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Informes</h2>
                    <div className="flex flex-col text-sm md:text-base">
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
                  <div className="w-full md:w-1/2 bg-escom-400 rounded-4xl p-4 md:p-5 md:text-right">
                    <h2 className="text-lg md:text-xl lg:text-2xl">Documentos</h2>
                    <div className="flex flex-col text-sm md:text-base">
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
