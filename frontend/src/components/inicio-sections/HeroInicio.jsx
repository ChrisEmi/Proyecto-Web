import React from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Carrusel from './Components/Carrusel';
import { IconoEscom } from '../assets/decoraciones/ElementosSvg';

const HeroInicio = () => {
  useGSAP(() => {
    const splitTitulo = new SplitText(".titulo-hero", { type: "words" });
    const splitESCOMunidad = new SplitText(".escomunidad-hero", { type: "chars" });
    const tl = gsap.timeline();
    
    tl.fromTo(splitTitulo.words,
      { opacity: 0, y: 30, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        filter: "blur(0px)",
        delay: 0.5
      }
    ).fromTo(splitESCOMunidad.chars,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        filter: "blur(0px)",
        stagger: 0.03
      },
      "-=0.3"
    ).fromTo(".parrafo-hero",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        filter: "blur(0px)",
      },
      "-=0.2"
    ).fromTo(".carrusel",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out"
      },
      "-=0.4"
    );
    // Zoom del contenedor fijo completo (más gradual y visible)
    gsap.to(".escom-hero-fixed", {
      scrollTrigger: {
        trigger: ".escom-section",
        start: "top top",
        end: "bottom+=300px top",
        scrub: 1,
      },
      scale: 24,
      ease: "power1.out",
      transformOrigin: "center center",
    });

    // Desvanecimiento rápido antes de llegar al siguiente section
    gsap.to(".escom-hero-fixed", {
      scrollTrigger: {
        trigger: ".escom-section",
        start: "bottom-=150px top",
        end: "center top",
        scrub: 2.5,
      },
      opacity: 0,
      ease: "power2.inOut",
    });

    // Pulso vertical continuo de la flecha + desvanecimiento con scroll
    gsap.to(".down-arrow", {
      y: -12,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".down-arrow", {
      scrollTrigger: {
        trigger: ".escom-section",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
      opacity: 0,
      y: -40,
      ease: "none",
    });

    // Parallax de imagen con ScrollTrigger
    gsap.to(".hero-image", {
      scrollTrigger: {
        trigger: ".titulo-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -100,
      scale: 1.1,
      ease: "none",
    });

    // Reveal del contenido lateral
    gsap.fromTo(".content-card",
      { opacity: 0, x: -50, filter: "blur(10px)" },
      {
        scrollTrigger: {
          trigger: ".titulo-section",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        ease: "power2.out",
      }
    );

    // Animación de decoración circular
    gsap.to(".circle-decoration", {
      scrollTrigger: {
        trigger: ".titulo-section",
        start: "top center",
        end: "bottom top",
        scrub: 2,
      },
      rotation: 180,
      scale: 1.2,
      ease: "none",
    });
  }, [])
  return (
    <div
      id='inicio'
      className='inicio bg-escom-900 h-[450vh] w-full flex flex-col relative overflow-hidden'>
      <section className='h-[300vh] w-full relative escom-section'>
        <div className="escom-hero-fixed flex items-center gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white">
          <IconoEscom className="w-48 escom-logo" />
            <div className="flex flex-col">  
                <h1 className="escom-title origin-center text-2xl md:text-7xl font-bold">ESCOM</h1>
                <h2 className="text-lg md:text-4xl font-light">Escuela Superior de Cómputo</h2>
            </div>
        </div>
        <div className='fixed top-[93%] w-full flex justify-center'>
          <FontAwesomeIcon icon="fa-solid fa-angles-down" className="down-arrow text-white text-3xl"/>
        </div>
      </section>
      <section className='h-[150vh] w-full relative overflow-hidden titulo-section'>
        
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-12 lg:py-20">
          {/* Columna izquierda: Título y contenido */}
          <div className="w-full lg:w-1/2 z-10 space-y-8">
            <h1 className="titulo-hero text-left text-white text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-black leading-tight drop-shadow-2xl max-w-2xl">
              Eventos Culturales y Recreativos
              <span className="escomunidad-hero block text-escom-200 mt-2">de la ESCOMunidad</span>
            </h1>
            
            {/* Card de contenido */}
            <div className="content-card bg-white/100 rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl">
              <p className="text-escom-900 text-light md:text-lg leading-relaxed mb-6">
                Descubre, participa y conecta con la comunidad ESCOM a través de eventos culturales, deportivos y académicos diseñados para ti.
              </p>
              
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="group flex-1 bg-escom-200 px-6 py-3 rounded-xl font-bold text-sm md:text-base hover:shadow-lg hover:shadow-escom-200/50 transition-all duration-300 transform hover:scale-[1.02]">
                  <span className="flex items-center justify-center gap-2">
                    Explorar Ahora
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button className="group flex-1 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold text-sm md:text-base bg-escom-900 hover:bg-escom-900/70 transition-all duration-300 transform hover:scale-[1.02]">
                  Saber Más
                </button>
              </div>
            </div>
          </div>
          
          {/* Columna derecha: Imagen con efecto */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-[90vh] relative mt-8 lg:mt-0">
            <div className="hero-image absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="/assets/escom-login.jpeg" 
                alt="Eventos Culturales y Recreativos" 
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-escom-900/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroInicio;
