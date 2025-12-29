import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TABS = [
    { id: 'inicio', label: 'Inicio', icon: 'fa-regular fa-house' },
    { id: 'eventos', label: 'Agenda', icon: 'fa-regular fa-calendar' },
    { id: 'panel', label: 'Panel', icon: 'fa-solid fa-dashboard', requiresAuth: true },
    { id: 'cuenta', label: 'Cuenta', icon: 'fa-regular fa-user' },
];

const NavTabs = ({ tabActiva, onTabChange, usuario, onCerrarMenu }) => {
    return (
        <div className="relative w-full py-6 md:py-10">
            {/* Botón cerrar mobile */}
            <button
                onClick={onCerrarMenu}
                className="absolute right-4 top-4 md:hidden p-2.5 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn hover:shadow-lg"
                aria-label="Cerrar menú"
            >
                <FontAwesomeIcon icon="fa-solid fa-close" className="text-xl !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300" />
            </button>

            <div className="flex flex-wrap gap-3 md:gap-2 w-full px-4 md:px-12 items-center justify-start">
                {TABS.map(tab => {
                    // Si requiere auth y no hay usuario, no mostrar
                    if (tab.requiresAuth && !usuario) return null;

                    const isActive = tabActiva === tab.id;

                    return (
                        <button key={tab.id} onClick={() => onTabChange(tab.id)}>
                            <span className={`text-sm md:text-lg font-semibold rounded-full px-4 md:px-10 py-2 md:py-4 transition-all cursor-pointer ${
                                isActive 
                                    ? 'bg-white !text-escom-sombra-500 cursor-default pointer-events-none' 
                                    : 'text-white hover:text-escom-200'
                            }`}>
                                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                                {tab.label}
                            </span>
                        </button>
                    );
                })}

                {/* Botón cerrar desktop */}
                <button
                    onClick={onCerrarMenu}
                    className="hidden md:flex ml-auto p-2.5 lg:px-4 lg:py-3 focus:outline-none transition-all duration-300 cursor-pointer bg-white hover:bg-white/80 active:bg-white/70 rounded-full group/btn hover:shadow-lg items-center gap-2"
                    aria-label="Cerrar menú"
                >
                    <FontAwesomeIcon icon="fa-solid fa-close" className="text-lg !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300" />
                    <span className="hidden lg:block text-sm font-semibold !text-escom-sombra-500 group-hover/btn:text-escom-200 transition-all duration-300">Cerrar</span>
                </button>
            </div>
        </div>
    );
};

export default NavTabs;
