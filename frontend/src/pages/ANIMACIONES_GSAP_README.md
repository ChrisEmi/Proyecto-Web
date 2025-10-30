# 🎨 Guía de Animaciones GSAP para Scroll Horizontal

## 📋 Animaciones Disponibles

### 1️⃣ **Split-Text con Stagger** (✅ ACTUALMENTE ACTIVA)
**Efecto:** Las palabras aparecen una por una con rotación 3D desde abajo

**Características:**
- ✨ Entrada dramática con rotación en eje X
- 🎯 Efecto stagger (cascada)
- 📏 Scale animado
- ⚡ Ease: `back.out(1.7)`

**Mejor para:** Títulos principales, mensajes impactantes

---

### 2️⃣ **Efecto Glitch/Distorsión**
**Efecto:** Texto con glitch digital estilo cyberpunk

**Características:**
- 🌈 Sombras de texto RGB desplazadas
- 💥 Efecto de entrada con blur
- 🔄 Repetición del glitch
- 🎨 Colores: cyan y magenta

**Mejor para:** Estilo futurista, tecnológico

**CSS adicional necesario:**
```css
.letra {
  display: inline-block;
}
```

---

### 3️⃣ **Efecto Onda/Wave**
**Efecto:** Las letras se mueven arriba y abajo como una ola

**Características:**
- 🌊 Movimiento continuo ondulante
- ♾️ Loop infinito
- ⏱️ Delay escalonado por letra
- 🎵 Ease: `sine.inOut`

**Mejor para:** Captar atención, estilo playful

**Ventajas:** Muy llamativo visualmente

---

### 4️⃣ **Máquina de Escribir (Typewriter)**
**Efecto:** El texto aparece letra por letra

**Características:**
- ⌨️ Simula escritura en tiempo real
- 📝 Perfecto para narrativa
- 🎬 Efecto cinemático
- ⚙️ Usa GSAP TextPlugin

**Mejor para:** Introducción de conceptos, storytelling

**Nota:** Requiere `gsap.registerPlugin(TextPlugin);`

---

### 5️⃣ **Reveal con Clip-Path**
**Efecto:** El texto se revela como cortina deslizante

**Características:**
- 🎭 Reveal elegante
- ↔️ Direcciones opuestas
- ✂️ Usa clip-path polygon
- 🎨 Muy moderno

**Mejor para:** Presentaciones elegantes, portfolios

---

### 6️⃣ **Efecto 3D Flip**
**Efecto:** Textos rotan en 3D al aparecer

**Características:**
- 🔄 Rotación en Y y X
- 📐 Perspective 3D
- 💫 Scale animado
- 🚀 Ease: `back.out(1.5)`

**Mejor para:** Efectos dramáticos, presentaciones

**CSS adicional necesario:**
```css
.content-texto-animado {
  perspective: 1200px;
}
.texto-animado-1, .texto-animado-2 {
  transform-style: preserve-3d;
}
```

---

### 7️⃣ **Zoom con Blur**
**Efecto:** Textos hacen zoom desde lejos con desenfoque

**Características:**
- 🔍 Zoom desde escala 3x
- 🌫️ Blur progresivo
- 💨 Entrada dinámica
- ⚡ Ease: `power3.out`

**Mejor para:** Hero sections, anuncios importantes

---

### 8️⃣ **Efecto Matrix/Digital**
**Efecto:** Caracteres aleatorios que se transforman en el texto final

**Características:**
- 🖥️ Estilo Matrix
- 🎲 Caracteres aleatorios
- 🔄 Transformación gradual
- 💚 Perfecto con tema tech

**Mejor para:** Sitios tech, hacking theme, gaming

---

## 🚀 Cómo Cambiar de Animación

### Opción 1: Reemplazar en useGSAP
```javascript
useGSAP(() => {
  const sections = gsap.utils.toArray("#section-horizontal .content");
  const horizontalScroll = gsap.to(sections, { /* ... */ });

  // Comenta la animación actual y descomenta la que quieras:
  
  // animacionGlitch(horizontalScroll);
  // animacionWave(horizontalScroll);
  // animacionClipPath(horizontalScroll);
  // etc...

  return () => {
    horizontalScroll.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

### Opción 2: Combinar Múltiples Animaciones
```javascript
// ¡Puedes combinar varias!
animacionZoomBlur(horizontalScroll);  // Entrada principal
animacionWave(horizontalScroll);       // Efecto continuo
```

---

## 🎯 Configuración Personalizada

### Velocidad de Animación
Cambia el `duration` en cada animación:
```javascript
duration: 1,    // Rápido
duration: 2,    // Normal
duration: 3,    // Lento
```

### Punto de Inicio
Ajusta `start` en scrollTrigger:
```javascript
start: "left 80%",  // Comienza cuando la sección está al 80% de la pantalla
start: "left 50%",  // Comienza en el centro
start: "left 20%",  // Comienza casi al salir
```

### Suavidad (Scrub)
```javascript
scrub: 1,     // Suave
scrub: 0.5,   // Muy suave
scrub: true,  // Inmediato
```

---

## 💡 Recomendaciones por Contexto

### Para Eventos Culturales (tu caso):
✅ **Recomendado:**
1. Split-Text con Stagger (actual) - ✨ Elegante y profesional
2. Zoom con Blur - 🎯 Impactante
3. Clip-Path Reveal - 🎨 Moderno

❌ **Evitar:**
- Matrix/Digital - Demasiado tech
- Glitch - Demasiado agresivo

### Para Sitios Tech/Gaming:
✅ **Recomendado:**
1. Glitch
2. Matrix
3. 3D Flip

### Para Portfolio/Creativo:
✅ **Recomendado:**
1. Clip-Path
2. 3D Flip
3. Wave

---

## 🔧 CSS Adicional Requerido

Algunas animaciones necesitan CSS extra:

### Para animaciones con letras individuales:
```css
.letra {
  display: inline-block;
  margin: 0 0.05em;
}
```

### Para efectos 3D mejorados:
```css
.content-texto-animado {
  perspective: 1200px;
  transform-style: preserve-3d;
}
```

### Para mejor rendimiento:
```css
.palabra, .letra {
  will-change: transform, opacity;
}
```

---

## 📊 Comparación de Rendimiento

| Animación | Rendimiento | Complejidad | Impacto Visual |
|-----------|-------------|-------------|----------------|
| Split-Text | ⚡⚡⚡ | Media | ⭐⭐⭐⭐ |
| Glitch | ⚡⚡ | Media | ⭐⭐⭐⭐⭐ |
| Wave | ⚡⚡ | Alta | ⭐⭐⭐⭐⭐ |
| Typewriter | ⚡⚡⚡ | Baja | ⭐⭐⭐ |
| Clip-Path | ⚡⚡⚡ | Baja | ⭐⭐⭐⭐ |
| 3D Flip | ⚡⚡ | Media | ⭐⭐⭐⭐ |
| Zoom Blur | ⚡⚡⚡ | Baja | ⭐⭐⭐⭐ |
| Matrix | ⚡ | Alta | ⭐⭐⭐⭐⭐ |

---

## 🎬 Ejemplos de Timing

### Timing Rápido (Dinámico)
```javascript
scrollTrigger: {
  start: "left 90%",
  end: "left 60%",
  scrub: 0.5,
}
```

### Timing Medio (Balanceado) - RECOMENDADO
```javascript
scrollTrigger: {
  start: "left 80%",
  end: "left 40%",
  scrub: 1,
}
```

### Timing Lento (Dramático)
```javascript
scrollTrigger: {
  start: "left 70%",
  end: "left 20%",
  scrub: 2,
}
```

---

## 🐛 Troubleshooting

### El texto no se anima
✅ Verifica que las clases `.texto-animado-1` y `.texto-animado-2` estén presentes
✅ Asegúrate que `horizontalScroll` se pasa como parámetro
✅ Revisa la consola por errores de GSAP

### Animación muy lenta/rápida
✅ Ajusta el valor de `scrub`
✅ Cambia `duration`
✅ Modifica `start` y `end`

### Texto se corta o sale de pantalla
✅ Ajusta `left` en las clases absolute
✅ Reduce tamaño de fuente en móviles
✅ Usa clases responsive de Tailwind

---

## 📱 Responsive

Para hacer las animaciones responsive:

```javascript
const isMobile = window.innerWidth < 768;

gsap.fromTo(palabrasAnimadas1, 
  { /* ... */ },
  {
    /* ... */
    duration: isMobile ? 0.5 : 1,
    stagger: isMobile ? 0.03 : 0.05,
  }
);
```

---

¡Experimenta y encuentra la combinación perfecta para tu sitio! 🎨✨
