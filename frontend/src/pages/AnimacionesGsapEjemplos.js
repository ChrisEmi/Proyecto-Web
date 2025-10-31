// 🎨 EJEMPLOS DE ANIMACIONES GSAP PARA TU SECCIÓN DE SCROLL HORIZONTAL
// Copia y pega estas funciones en tu useGSAP hook

// ============================================
// 1️⃣ ANIMACIÓN: EFECTO GLITCH/DISTORSIÓN
// ============================================
export const animacionGlitch = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    // Efecto glitch en texto 1
    gsap.to(texto1, {
      textShadow: `
        2px 2px 0px #ff00de,
        -2px -2px 0px #00ffff,
        3px 3px 0px #ff00de,
        -3px -3px 0px #00ffff
      `,
      duration: 0.5,
      repeat: 3,
      yoyo: true,
      scrollTrigger: {
        trigger: ".content-texto-animado",
        containerAnimation: horizontalScroll,
        start: "left 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Animación de entrada con glitch
    gsap.fromTo(
      [texto1, texto2],
      {
        opacity: 0,
        filter: "blur(20px)",
        x: -100,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left 80%",
          end: "left 40%",
          scrub: 1,
        },
      }
    );
  }
};

// ============================================
// 2️⃣ ANIMACIÓN: EFECTO ONDA/WAVE EN LETRAS
// ============================================
export const animacionWave = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    // Dividir en letras
    const letras1 = texto1.textContent
      .split("")
      .map((letra) =>
        letra === " "
          ? `<span class="letra">&nbsp;</span>`
          : `<span class="letra">${letra}</span>`
      )
      .join("");
    const letras2 = texto2.textContent
      .split("")
      .map((letra) =>
        letra === " "
          ? `<span class="letra">&nbsp;</span>`
          : `<span class="letra">${letra}</span>`
      )
      .join("");

    texto1.innerHTML = letras1;
    texto2.innerHTML = letras2;

    const letrasAnimadas1 = texto1.querySelectorAll(".letra");
    const letrasAnimadas2 = texto2.querySelectorAll(".letra");

    // Efecto onda continuo
    letrasAnimadas1.forEach((letra, index) => {
      gsap.to(letra, {
        y: -30,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.03,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left center",
          end: "right center",
          toggleActions: "play pause resume pause",
        },
      });
    });

    letrasAnimadas2.forEach((letra, index) => {
      gsap.to(letra, {
        y: 30,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.03,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left center",
          end: "right center",
          toggleActions: "play pause resume pause",
        },
      });
    });
  }
};

// ============================================
// 3️⃣ ANIMACIÓN: MÁQUINA DE ESCRIBIR
// ============================================
export const animacionTypewriter = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    const contenidoOriginal1 = texto1.textContent;
    const contenidoOriginal2 = texto2.textContent;

    texto1.textContent = "";
    texto2.textContent = "";

    // Timeline para el efecto de escritura
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".content-texto-animado",
        containerAnimation: horizontalScroll,
        start: "left 60%",
        end: "left 20%",
        scrub: 1,
      },
    });

    // Escribir el primer texto
    tl.to(texto1, {
      text: contenidoOriginal1,
      duration: 2,
      ease: "none",
    });

    // Escribir el segundo texto
    tl.to(
      texto2,
      {
        text: contenidoOriginal2,
        duration: 2,
        ease: "none",
      },
      "-=1"
    );
  }
};

// ============================================
// 4️⃣ ANIMACIÓN: REVEAL CON CLIP-PATH
// ============================================
export const animacionClipPath = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    // Revelar desde la izquierda
    gsap.fromTo(
      texto1,
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left 70%",
          end: "left 40%",
          scrub: 1,
        },
      }
    );

    // Revelar desde la derecha
    gsap.fromTo(
      texto2,
      { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left 60%",
          end: "left 30%",
          scrub: 1,
        },
      }
    );
  }
};

// ============================================
// 5️⃣ ANIMACIÓN: EFECTO 3D FLIP
// ============================================
export const animacion3DFlip = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    // Flip 3D para texto 1
    gsap.fromTo(
      texto1,
      {
        rotateY: 90,
        opacity: 0,
        scale: 0.5,
      },
      {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left 70%",
          end: "left 40%",
          scrub: 1,
        },
      }
    );

    // Flip 3D para texto 2
    gsap.fromTo(
      texto2,
      {
        rotateX: -90,
        opacity: 0,
        scale: 0.5,
      },
      {
        rotateX: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left 60%",
          end: "left 30%",
          scrub: 1,
        },
      }
    );
  }
};

// ============================================
// 6️⃣ ANIMACIÓN: ZOOM CON BLUR
// ============================================
export const animacionZoomBlur = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    gsap.fromTo(
      [texto1, texto2],
      {
        scale: 3,
        filter: "blur(30px)",
        opacity: 0,
      },
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-texto-animado",
          containerAnimation: horizontalScroll,
          start: "left 80%",
          end: "left 30%",
          scrub: 1,
        },
      }
    );
  }
};

// ============================================
// 7️⃣ ANIMACIÓN: EFECTO MATRIX/DIGITAL
// ============================================
export const animacionMatrix = (horizontalScroll) => {
  const texto1 = document.querySelector(".texto-animado-1");
  const texto2 = document.querySelector(".texto-animado-2");

  if (texto1 && texto2) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const original1 = texto1.textContent;
    const original2 = texto2.textContent;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".content-texto-animado",
        containerAnimation: horizontalScroll,
        start: "left 70%",
        end: "left 40%",
        scrub: 1,
      },
    });

    // Efecto de caracteres aleatorios
    for (let i = 0; i < 10; i++) {
      tl.to([texto1, texto2], {
        duration: 0.1,
        onUpdate: function () {
          const randomText1 = original1
            .split("")
            .map(
              () => caracteres[Math.floor(Math.random() * caracteres.length)]
            )
            .join("");
          const randomText2 = original2
            .split("")
            .map(
              () => caracteres[Math.floor(Math.random() * caracteres.length)]
            )
            .join("");

          if (this.progress() < 0.9) {
            texto1.textContent = randomText1;
            texto2.textContent = randomText2;
          } else {
            texto1.textContent = original1;
            texto2.textContent = original2;
          }
        },
      });
    }
  }
};

// ============================================
// 🎯 EJEMPLO DE USO EN TU useGSAP:
// ============================================
/*
useGSAP(() => {
  const sections = gsap.utils.toArray("#section-horizontal .content");
  const horizontalScroll = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#section-horizontal",
      start: "top top",
      end: () => "+=" + (window.innerHeight * sections.length * 2),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // 👇 ELIGE LA ANIMACIÓN QUE QUIERAS:
  // animacionGlitch(horizontalScroll);
  // animacionWave(horizontalScroll);
  // animacionTypewriter(horizontalScroll);
  // animacionClipPath(horizontalScroll);
  // animacion3DFlip(horizontalScroll);
  // animacionZoomBlur(horizontalScroll);
  // animacionMatrix(horizontalScroll);

  return () => {
    horizontalScroll.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
*/
