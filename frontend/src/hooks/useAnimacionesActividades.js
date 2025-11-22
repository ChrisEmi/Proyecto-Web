import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, ScrollTrigger);

export const useAnimacionesActividades = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const stateRef = useRef();
  const containerRef = useRef();
  const isOpening = useRef(false);
  const containerTituloRef = useRef();

  const getCardContent = (id) => {
    const card = document.querySelector(`[data-flip-id="${id}-card"]`);
    if (!card) return [];
    return card.querySelectorAll(".card-content-item");
  };

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
          setActiveCardId(newActiveId);
        },
      });
    }
  };

  useLayoutEffect(() => {
    if (stateRef.current) {
      Flip.from(stateRef.current, {
        duration: 0.7,
        ease: "power3.inOut",
        scale: true,
        simple: true,
        onComplete: () => {
          if (isOpening.current) {
            const contentItems = getCardContent(activeCardId);
            gsap.set(contentItems, { y: 20 });

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

  return {
    activeCardId,
    containerRef,
    containerTituloRef,
    handleClick
  };
};
