import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';


export default function Carrusel({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTweeningRef = useRef(false);
  
  const slideRefs = useRef([]);
  const navItemRefs = useRef([]);
  const textRef = useRef(null);
  
  const touchStartXRef = useRef(0);


  const updateNav = (activeIndex) => {
    navItemRefs.current.forEach((item, index) => {
      if (!item) return;
      const text = item.querySelector("span");
      const bar = item.querySelector(".nav-bar");

      if (index === activeIndex) {
        item.classList.add("active");
        gsap.to(text, { opacity: 1, duration: 0.4 });
        gsap.to(bar, { opacity: 1, duration: 0.4 });
      } else {
        item.classList.remove("active");
        gsap.to(text, { opacity: 0.5, duration: 0.4 });
        gsap.to(bar, { opacity: 0.3, duration: 0.4 });
      }
    });
  };

  const animateText = (nextIndex) => {
    if (!slides[nextIndex]) return;
    const nextText = `${slides[nextIndex].title}`;
    const tl = gsap.timeline();

    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.in',
    })
    .set(textRef.current, {
      innerHTML: nextText,
      y: 50,
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out',
    }, 1.5); 
    };
    
  const gotoSlide = (direction) => {
    if (isTweeningRef.current) return;
    
    const totalSlides = slides.length;
    let nextIndex = currentIndex + direction;

    if (nextIndex >= totalSlides) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = totalSlides - 1;

    animateSlideTransition(nextIndex);
  };

  const gotoSlideDirect = (index) => {
    if (isTweeningRef.current || currentIndex === index) return;
    animateSlideTransition(index);
  };

  const animateSlideTransition = (nextIndex) => {
    if (isTweeningRef.current) return;
    isTweeningRef.current = true;

    const currentSlide = slideRefs.current[currentIndex];
    const nextSlide = slideRefs.current[nextIndex];

    if (!currentSlide || !nextSlide) {
      isTweeningRef.current = false;
      return;
    }

    updateNav(nextIndex);
    animateText(nextIndex);

    gsap.set(nextSlide, { zIndex: 2, xPercent: 100 });
    gsap.set(currentSlide, { zIndex: 1 });

    gsap.to(nextSlide, {
      xPercent: 0,
      duration: 2.0, 
      ease: 'power2.easeOut',
      onComplete: () => {
        gsap.set(currentSlide, { zIndex: 0 });
        isTweeningRef.current = false;
        setCurrentIndex(nextIndex);
      },
    });
  };


  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches ? e.touches[0].screenX : e.clientX;
  };

  const handleTouchEnd = (e) => {
    if (isTweeningRef.current) return;
    const touchEndX = e.changedTouches ? e.changedTouches[0].screenX : e.clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    if (deltaX < -50) gotoSlide(1); // Swiped left
    else if (deltaX > 50) gotoSlide(-1); // Swiped right
  };


  useEffect(() => {
    if (!slides || slides.length === 0 || !textRef.current) return;

    gsap.set(slideRefs.current[0], { xPercent: 0, zIndex: 2 });
    gsap.set(slideRefs.current.slice(1), { xPercent: 100, zIndex: 1 });

    updateNav(0);
    
    textRef.current.innerHTML = `${slides[0].title}`;
    gsap.set(textRef.current, { opacity: 1, y: 0 });

    slideRefs.current = slideRefs.current.slice(0, slides.length);
    navItemRefs.current = navItemRefs.current.slice(0, slides.length);

  }, [slides]);


  return (
    <div
      id="wrapper"
      className="relative w-full h-full overflow-hidden text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-full"
            ref={(el) => (slideRefs.current[index] = el)}
          >
            <img 
              src={slide.imageSrc} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <nav className="absolute z-10 top-6 left-6 sm:top-8 sm:left-8 flex gap-4 sm:gap-5 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="nav-item cursor-pointer flex items-center gap-2"
            ref={(el) => (navItemRefs.current[index] = el)}
            onClick={() => gotoSlideDirect(index)}
          >
            <span className="text-xs sm:text-sm font-medium text-white transition-opacity duration-400">
              {slide.id}
            </span>
            <div className="nav-bar w-8 sm:w-10 h-0.5 bg-white transition-opacity duration-400"></div>
          </div>
        ))}
      </nav>

      <h2
        id="text"
        ref={textRef}
        className="absolute z-10 bottom-10 left-6 sm:bottom-10 sm:left-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-[60%] sm:max-w-[50%] leading-tight"
      >
      </h2>

      <button
        id="next"
        onClick={() => gotoSlide(1)}
        className="absolute z-10 bottom-10 right-6 sm:bottom-10 sm:right-8 flex justify-center text-white 
                   w-12 h-12 sm:w-14 sm:h-14 bg-black/30 backdrop-blur-md rounded-full
                   text-2xl transition-all duration-300 items-center hover:bg-white/20 hover:scale-110"
        aria-label="Siguiente"
      >
        &rarr;
      </button>
    </div>
  );
}