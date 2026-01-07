import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEventos } from "../../api/Context/EventosContext";
import { useAuth } from "../../api/Context/AuthContext";
import Carrusel from "../../components/inicio-sections/Components/Carrusel";
import { VistaCarga } from "../../components/layout/LoopCarga";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const InicioEventos = () => {
    const { eventos, obtenerEventos, loading } = useEventos();
    const { user } = useAuth();

    useEffect(() => {
        obtenerEventos('fecha', 'DESC', 'todos');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useGSAP(() => {
        if (loading) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(".hero-label",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5 }
        )
        .fromTo(".hero-titulo",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.2"
        )
        .fromTo(".hero-descripcion",
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "-=0.3"
        )
        .fromTo(".hero-cta",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            "-=0.2"
        )
        .fromTo(".hero-carrusel",
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.8 },
            "-=0.4"
        )
        .fromTo(".feature-item",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
            "-=0.3"
        );

    }, [loading]);

    if (loading) return <VistaCarga />;

    const slidesEventos = eventos && eventos.length >= 3 
        ? eventos.slice(0, 4).map((evento, index) => ({
            id: String(index + 1).padStart(2, '0'),
            title: evento.titulo_evento,
            imageSrc: evento.imagenes?.[0]?.src || `https://picsum.photos/1200/800?random=${index}`
        }))
        : [
            { id: "01", title: "Descubre Eventos Increíbles", imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200" },
            { id: "02", title: "Conecta con la Comunidad", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200" },
            { id: "03", title: "Vive Experiencias Únicas", imageSrc: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200" },
        ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            
            {/* Hero Section */}
            <section className="relative min-h-screen">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                    
                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh]">
                        
                        {/* Columna Izquierda - Contenido */}
                        <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
                            
                            {/* Label */}
                            <div className="hero-label inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                <span className="text-emerald-300 text-sm font-medium">
                                    {eventos?.length || 0} eventos disponibles
                                </span>
                            </div>

                            {/* Título */}
                            <div className="hero-titulo space-y-2">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                                    Encuentra tu próximo
                                </h1>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 leading-[1.1]">
                                    evento favorito
                                </h1>
                            </div>

                            {/* Descripción */}
                            <p className="hero-descripcion text-slate-300 text-lg lg:text-xl leading-relaxed max-w-lg">
                                Conferencias, talleres, torneos y más. Todo lo que necesitas para aprovechar tu vida universitaria en ESCOM.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                {user ? (
                                    <>
                                        <Link
                                            to="/eventos/eventos"
                                            className="hero-cta flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'compass']} />
                                            Explorar Eventos
                                        </Link>
                                        <Link
                                            to="/eventos/calendario"
                                            className="hero-cta flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                            Calendario
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/registro"
                                            className="hero-cta flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'user-plus']} />
                                            Crear Cuenta Gratis
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="hero-cta flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
                                            Iniciar Sesión
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Features inline */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
                                <div className="feature-item text-center">
                                    <div className="text-2xl lg:text-3xl font-black text-emerald-400">{eventos?.length || 0}</div>
                                    <div className="text-slate-400 text-sm">Eventos</div>
                                </div>
                                <div className="feature-item text-center">
                                    <div className="text-2xl lg:text-3xl font-black text-cyan-400">
                                        {[...new Set(eventos?.map(e => e.nombre_categoria))].length || 0}
                                    </div>
                                    <div className="text-slate-400 text-sm">Categorías</div>
                                </div>
                                <div className="feature-item text-center">
                                    <div className="text-2xl lg:text-3xl font-black text-violet-400">
                                        {eventos?.filter(e => new Date(e.fecha) > new Date()).length || 0}
                                    </div>
                                    <div className="text-slate-400 text-sm">Próximos</div>
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha - Carrusel */}
                        <div className="order-1 lg:order-2">
                            <div className="hero-carrusel w-full aspect-[4/3] lg:aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                                <Carrusel slides={slidesEventos} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
                <div className="max-w-5xl mx-auto">
                    
                    <div className="text-center mb-14">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Todo en un solo lugar
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Regístrate y accede a todas las funcionalidades
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <div className="feature-item group bg-slate-800/80 rounded-2xl p-6 hover:bg-slate-700/80 transition-all duration-300">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FontAwesomeIcon icon={['fas', 'bolt']} className="text-emerald-400 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Inscripción rápida</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Un clic y listo. Sin formularios largos ni complicaciones.
                            </p>
                        </div>

                        <div className="feature-item group bg-slate-800/80 rounded-2xl p-6 hover:bg-slate-700/80 transition-all duration-300">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FontAwesomeIcon icon={['fas', 'bell']} className="text-cyan-400 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Recordatorios</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Te avisamos antes de cada evento para que no te lo pierdas.
                            </p>
                        </div>

                        <div className="feature-item group bg-slate-800/80 rounded-2xl p-6 hover:bg-slate-700/80 transition-all duration-300">
                            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FontAwesomeIcon icon={['fas', 'calendar-check']} className="text-violet-400 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Tu calendario</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Organiza tus eventos y lleva el control de tu agenda.
                            </p>
                        </div>
                    </div>

                    {!user && (
                        <div className="text-center mt-12">
                            <Link
                                to="/registro"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
                            >
                                Empezar ahora
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default InicioEventos;