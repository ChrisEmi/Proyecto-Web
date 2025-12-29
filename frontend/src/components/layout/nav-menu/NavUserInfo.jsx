import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONOS_ROL } from "./navConfig.js";

const NavUserInfo = ({ usuario }) => {
    if (!usuario) return null;

    const { icon, color } = ICONOS_ROL[usuario.nombre_tipo] || ICONOS_ROL.Estudiante;

    return (
        <div className="w-full flex justify-end px-12 md:pl-12 pt-6 md:pt-8 pb-4 border-b border-white/10">
            <div className="flex items-center pr-4">
                <div className="flex flex-col">
                    <span className="text-white font-semibold text-lg md:text-xl text-right">
                        {usuario.nombre?.split(' ')[0]} {usuario.apellido_paterno}
                    </span>
                    <span className={`text-sm md:text-base font-medium text-right ${color}`}>
                        <FontAwesomeIcon icon={icon} className="mr-2" />
                        {usuario.nombre_tipo}
                    </span>
                </div>
            </div>
            {usuario.foto_src ? (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                    <img 
                        src={usuario.foto_src}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ml-4 flex items-center justify-center bg-escom-500">
                    <span className="text-2xl text-white font-bold">
                        {usuario.nombre?.charAt(0).toUpperCase()}{usuario.nombre?.charAt(1).toUpperCase()}
                    </span>
                </div>
            )}
        </div>
    );
};

export default NavUserInfo;
