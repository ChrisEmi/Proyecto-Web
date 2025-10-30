/**
 * Fondo Decorativo Optimizado para ESCOM
 * Usa SVG en lugar de múltiples divs para mejor rendimiento
 * - Un solo elemento SVG vs 30+ divs
 * - GPU accelerated
 * - Menos repaints y reflows
 */

const EscomDecorativeBackground = ({ id, className = "" }) => {
  return (
    <svg 
      id={id}
      className={`absolute inset-0 pointer-events-none w-full h-[150vh] ${className}`}
      viewBox="0 0 1400 800" 
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Filtros de blur reutilizables - más eficiente que blur en cada elemento */}
        <filter id="blur-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
        </filter>
        <filter id="blur-medium" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
        </filter>
        <filter id="blur-heavy" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
        </filter>
        
        {/* Patrón de puntos */}
        <pattern id="dot-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#64748b" opacity="0.05"/>
        </pattern>
      </defs>

      {/* Fondo con patrón de puntos */}
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />

      {/* Círculos grandes con blur - Paleta ESCOM - DISTRIBUCIÓN AMPLIADA */}
      <g opacity="0.2" filter="url(#blur-medium)">
        <circle cx="140" cy="80" r="80" fill="#164e63" />
        <circle cx="490" cy="240" r="120" fill="#0e7490" />
        <circle cx="770" cy="160" r="100" fill="#0891b2" />
        <circle cx="1050" cy="400" r="90" fill="#06b6d4" />
        <circle cx="1190" cy="120" r="95" fill="#0891b2" />
        <circle cx="1288" cy="560" r="85" fill="#06b6d4" />
        <circle cx="70" cy="360" r="75" fill="#0e7490" />
        <circle cx="392" cy="680" r="90" fill="#22d3ee" />
      </g>

      {/* Círculos medianos con blur suave - MÁS ELEMENTOS */}
      <g opacity="0.15" filter="url(#blur-soft)">
        <circle cx="210" cy="320" r="70" fill="#155e75" />
        <circle cx="630" cy="560" r="110" fill="#0e7490" />
        <circle cx="980" cy="240" r="80" fill="#0891b2" />
        <circle cx="350" cy="600" r="90" fill="#22d3ee" />
        <circle cx="840" cy="400" r="85" fill="#0891b2" />
        <circle cx="1260" cy="280" r="75" fill="#22d3ee" />
        <circle cx="588" cy="120" r="100" fill="#164e63" />
        <circle cx="112" cy="640" r="80" fill="#0e7490" />
        <circle cx="1120" cy="680" r="70" fill="#06b6d4" />
      </g>

      {/* Formas geométricas - Sin blur (más eficiente) - MÁS DISTRIBUCIÓN */}
      <g opacity="0.3">
        {/* Cuadrados rotados - MÁS ELEMENTOS */}
        <rect x="70" y="160" width="40" height="40" fill="none" stroke="#0891b2" strokeWidth="2" transform="rotate(12, 90, 180)"/>
        <rect x="420" y="640" width="48" height="48" fill="none" stroke="#0e7490" strokeWidth="2" transform="rotate(-15, 444, 664)"/>
        <rect x="700" y="480" width="56" height="56" fill="none" stroke="#155e75" strokeWidth="2" transform="rotate(45, 728, 508)"/>
        <rect x="980" y="200" width="44" height="44" fill="none" stroke="#06b6d4" strokeWidth="2" transform="rotate(20, 1002, 222)"/>
        <rect x="280" y="440" width="36" height="36" fill="none" stroke="#22d3ee" strokeWidth="2" transform="rotate(-25, 298, 458)"/>
        <rect x="840" y="120" width="42" height="42" fill="none" stroke="#0891b2" strokeWidth="2" transform="rotate(30, 861, 141)"/>
        <rect x="1190" y="440" width="38" height="38" fill="none" stroke="#164e63" strokeWidth="2" transform="rotate(-12, 1209, 459)"/>
        <rect x="560" y="340" width="40" height="40" fill="none" stroke="#0e7490" strokeWidth="2" transform="rotate(18, 580, 360)"/>
        
        {/* Círculos con bordes - MÁS ELEMENTOS */}
        <circle cx="420" cy="256" r="48" fill="none" stroke="#0891b2" strokeWidth="2"/>
        <circle cx="252" cy="400" r="36" fill="none" stroke="#155e75" strokeWidth="2"/>
        <circle cx="1260" cy="533" r="40" fill="none" stroke="#22d3ee" strokeWidth="2"/>
        <circle cx="126" cy="520" r="42" fill="none" stroke="#0e7490" strokeWidth="2"/>
        <circle cx="700" cy="240" r="38" fill="none" stroke="#06b6d4" strokeWidth="2"/>
        <circle cx="980" cy="600" r="44" fill="none" stroke="#164e63" strokeWidth="2"/>
        <circle cx="490" cy="520" r="40" fill="none" stroke="#22d3ee" strokeWidth="2"/>
        <circle cx="1120" cy="360" r="36" fill="none" stroke="#0891b2" strokeWidth="2"/>
        
        {/* Rombos (cuadrados rotados 45°) - MÁS ELEMENTOS */}
        <rect x="350" y="200" width="32" height="32" fill="#0891b2" opacity="0.2" transform="rotate(45, 366, 216)"/>
        <rect x="728" y="400" width="44" height="44" fill="#0e7490" opacity="0.15" transform="rotate(45, 750, 422)"/>
        <rect x="1190" y="224" width="36" height="36" fill="#155e75" opacity="0.2" transform="rotate(45, 1208, 242)"/>
        <rect x="182" y="280" width="28" height="28" fill="#22d3ee" opacity="0.2" transform="rotate(45, 196, 294)"/>
        <rect x="630" y="680" width="40" height="40" fill="#06b6d4" opacity="0.18" transform="rotate(45, 650, 700)"/>
        <rect x="910" y="480" width="34" height="34" fill="#164e63" opacity="0.15" transform="rotate(45, 927, 497)"/>
        <rect x="1316" y="320" width="30" height="30" fill="#0891b2" opacity="0.2" transform="rotate(45, 1331, 335)"/>
        <rect x="420" y="80" width="38" height="38" fill="#0e7490" opacity="0.17" transform="rotate(45, 439, 99)"/>
      </g>

      {/* Líneas decorativas horizontales - MÁS LÍNEAS */}
      <g opacity="0.4">
        <line x1="0" y1="200" x2="280" y2="200" stroke="url(#gradient-line-1)" strokeWidth="1"/>
        <line x1="840" y1="533" x2="1400" y2="533" stroke="url(#gradient-line-2)" strokeWidth="1"/>
        <line x1="420" y1="400" x2="630" y2="400" stroke="url(#gradient-line-3)" strokeWidth="1"/>
        <line x1="140" y1="640" x2="420" y2="640" stroke="url(#gradient-line-1)" strokeWidth="1"/>
        <line x1="700" y1="120" x2="980" y2="120" stroke="url(#gradient-line-4)" strokeWidth="1"/>
        <line x1="1050" y1="680" x2="1400" y2="680" stroke="url(#gradient-line-2)" strokeWidth="1"/>
        <line x1="0" y1="480" x2="210" y2="480" stroke="url(#gradient-line-3)" strokeWidth="1"/>
        <line x1="560" y1="280" x2="840" y2="280" stroke="url(#gradient-line-4)" strokeWidth="1"/>
      </g>

      {/* Líneas decorativas verticales - MÁS LÍNEAS */}
      <g opacity="0.3">
        <line x1="350" y1="80" x2="350" y2="200" stroke="url(#gradient-line-v1)" strokeWidth="1"/>
        <line x1="1008" y1="400" x2="1008" y2="560" stroke="url(#gradient-line-v2)" strokeWidth="1"/>
        <line x1="630" y1="200" x2="630" y2="360" stroke="url(#gradient-line-v3)" strokeWidth="1"/>
        <line x1="182" y1="480" x2="182" y2="640" stroke="url(#gradient-line-v1)" strokeWidth="1"/>
        <line x1="910" y1="160" x2="910" y2="280" stroke="url(#gradient-line-v2)" strokeWidth="1"/>
        <line x1="1260" y1="600" x2="1260" y2="760" stroke="url(#gradient-line-v3)" strokeWidth="1"/>
      </g>

      {/* Iconos decorativos - SVG es mucho más eficiente que divs con SVG dentro - MÁS ICONOS */}
      <g opacity="0.1">
        {/* Icono de academia */}
        <path transform="translate(168, 120) scale(2.4)" fill="#0891b2" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
        
        {/* Icono de calendario */}
        <path transform="translate(560, 160) scale(3.2)" fill="#0e7490" fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        
        {/* Icono de comunidad */}
        <path transform="translate(910, 400) scale(2.8)" fill="#155e75" d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        
        {/* Icono de corazón/comunidad */}
        <path transform="translate(392, 304) scale(2)" fill="#164e63" fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
        
        {/* Icono de libro */}
        <path transform="translate(812, 224) scale(2.4)" fill="#0e7490" d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
        
        {/* Icono de estrella */}
        <path transform="translate(210, 496) scale(2.2)" fill="#06b6d4" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        
        {/* Icono de rayos/energía */}
        <path transform="translate(1120, 520) scale(2)" fill="#22d3ee" fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
        
        {/* Icono de badge/insignia */}
        <path transform="translate(60, 100) scale(2.2)" fill="#0891b2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </g>

      {/* Partículas pequeñas - MÁS PARTÍCULAS */}
      <g opacity="0.4">
        <circle cx="252" cy="200" r="4" fill="#0891b2"/>
        <circle cx="462" cy="360" r="6" fill="#0e7490"/>
        <circle cx="672" cy="480" r="4" fill="#155e75"/>
        <circle cx="1092" cy="280" r="6" fill="#22d3ee"/>
        <circle cx="350" cy="320" r="4" fill="#06b6d4"/>
        <circle cx="126" cy="240" r="5" fill="#0891b2"/>
        <circle cx="532" cy="640" r="4" fill="#164e63"/>
        <circle cx="742" cy="560" r="6" fill="#22d3ee"/>
        <circle cx="952" cy="120" r="4" fill="#0e7490"/>
        <circle cx="94" cy="360" r="5" fill="#06b6d4"/>
        <circle cx="8" cy="440" r="4" fill="#155e75"/>
        <circle cx="30" cy="320" r="4" fill="#0891b2"/>
        <circle cx="1176" cy="600" r="4" fill="#164e63"/>
        <circle cx="1008" cy="160" r="2" fill="#22d3ee"/>
        <circle cx="70" cy="680" r="4" fill="#0e7490"/>
        <circle cx="1330" cy="400" r="6" fill="#06b6d4"/>
      </g>

      {/* Gradientes para las líneas */}
      <defs>
        <linearGradient id="gradient-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0891b2" stopOpacity="0"/>
          <stop offset="50%" stopColor="#0891b2" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradient-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0"/>
          <stop offset="50%" stopColor="#0e7490" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradient-line-3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#155e75" stopOpacity="0"/>
          <stop offset="50%" stopColor="#155e75" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#155e75" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradient-line-4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0"/>
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradient-line-v1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0891b2" stopOpacity="0"/>
          <stop offset="50%" stopColor="#0891b2" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradient-line-v2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#155e75" stopOpacity="0"/>
          <stop offset="50%" stopColor="#155e75" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#155e75" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradient-line-v3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EscomDecorativeBackground;
