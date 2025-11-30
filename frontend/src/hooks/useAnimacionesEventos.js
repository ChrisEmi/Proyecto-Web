import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useAnimacionesEventos = (abrirDetalles, eventoSeleccionado) => {
  useGSAP(() => {
    gsap.fromTo(
      ".container > div",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut" }
    );
  });

  useGSAP(
    () => {
      if (!abrirDetalles || !eventoSeleccionado) return;
      gsap.set(".modal-evento > div", { opacity: 0 });

      if (abrirDetalles) {
        gsap.fromTo(
          ".modal-evento",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              gsap.fromTo(
                ".modal-evento > div",
                {
                  opacity: 0,
                  y: 50,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "power1.in",
                }
              );
            },
          }
        );
      }

      const slides = gsap.utils.toArray(".carrusel-slide");
      if (slides.length === 0) return;

      const nextButton = document.querySelector(".carrusel-nav-next");
      const prevButton = document.querySelector(".carrusel-nav-prev");
      const contador = document.querySelector(".carrusel-contador");

      let currentIndex = 0;

      function posicionarContador() {
        const slideActual = slides[currentIndex];
        const img = slideActual.querySelector("img");
        if (img && contador) {
          const imgRect = img.getBoundingClientRect();
          const containerRect = slideActual.getBoundingClientRect();
          const offsetTop = imgRect.bottom - containerRect.top;
          gsap.set(contador, { top: `${offsetTop + 16}px`, bottom: "auto" });
          gsap.to(contador, {
            opacity: 1,
            duration: 0.3,
            y: 0,
            ease: "power3.Out",
          });
        }
      }

      function cambiarSlide(direccion) {
        gsap.to(slides[currentIndex], {
          opacity: 0,
          duration: 1,
          y: 50,
          ease: "power3.inOut",
        });
        currentIndex = gsap.utils.wrap(
          0,
          slides.length,
          currentIndex + direccion
        );
        gsap.to(slides[currentIndex], {
          opacity: 1,
          duration: 1,
          y: 0,
          ease: "power3.inOut",
          onComplete: posicionarContador,
        });
        gsap.to(contador, {
          opacity: 0,
          duration: 1,
          y: 50,
          ease: "power3.inOut",
          onComplete: () => {
            if (contador)
              contador.innerText = `${currentIndex + 1}/${slides.length}`;
          },
        });
      }

      const handleNext = () => cambiarSlide(1);
      const handlePrev = () => cambiarSlide(-1);

      nextButton?.addEventListener("click", handleNext);
      prevButton?.addEventListener("click", handlePrev);

      gsap.set(".carrusel", { overflow: "hidden" });
      gsap.set(".carrusel-nav", { display: "flex" });

      slides.forEach((slide, index) => {
        slide.classList.add("carrusel-slide-abs");
        gsap.set(slide, { opacity: index === 0 ? 1 : 0 });
        const img = slide.querySelector("img");
        if (img && index === 0) {
          img.onload = posicionarContador;
          if (img.complete) posicionarContador();
        }
      });

      if (contador) contador.innerText = `1/${slides.length}`;

      return () => {
        nextButton?.removeEventListener("click", handleNext);
        prevButton?.removeEventListener("click", handlePrev);
      };
    },
    { dependencies: [abrirDetalles, eventoSeleccionado], scope: document.body }
  );

  const cerrarModalAnimacion = (callback) => {
    gsap.to(".modal-evento > div", {
      opacity: 0,
      y: 50,
      duration: 0.3,
      stagger: 0.1,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(".modal-evento", {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            if (callback && typeof callback === "function") {
              callback();
            }
          },
        });
      },
    });
  };

  return { cerrarModalAnimacion };
};
