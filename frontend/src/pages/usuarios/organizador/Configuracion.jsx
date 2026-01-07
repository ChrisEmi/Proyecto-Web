import { useOrganizador } from "../../../api/Context/OrganizadorContext";
import { useAuth } from "../../../api/Context/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const Configuracion = () => { 
    const { perfil, cambiarPreferenciasNotificaciones, obtenerDatosPerfil } = useOrganizador();
    const { generarTokenContrasena, cerrarSesion } = useAuth();
    const [enviandoCorreo, setEnviandoCorreo] = useState(false);
    const [mensajeExito, setMensajeExito] = useState(null);

    useEffect(() => {
        obtenerDatosPerfil();
    }, []);

    const handleCambioNotificaciones = async () => {
        const valorActual = Number(perfil?.config_notificacion);
        const nuevoValor = valorActual === 1 ? 0 : 1;
        await cambiarPreferenciasNotificaciones(nuevoValor);
        await obtenerDatosPerfil();
    };

    const handleCambiarContrasena = async () => {
        setEnviandoCorreo(true);
        setMensajeExito(null);
        console.log("Enviando correo a:", perfil.correo);
        try {
            await generarTokenContrasena(perfil.correo);
            setMensajeExito("Se ha enviado un correo con las instrucciones para cambiar tu contraseña");
        } catch (error) {
            console.error("Error al enviar correo:", error);
        } finally {
            setEnviandoCorreo(false);
            cerrarSesion();
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col items-center md:items-start gap-2">
                <h2 className="font-semibold text-escom-900 text-4xl">
                    <FontAwesomeIcon icon={['fas', 'cog']} className="mr-3 text-escom-900" />
                    Configuración
                </h2>
                <p className="text-escom-700 font-light text-lg">Cambia tus preferencias y ajustes de cuenta aquí.</p>
            </div>
            
            {/* Notificaciones */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-escom-sombra-400 mb-3 p-6">
                    <FontAwesomeIcon icon={['fas', 'bell']} className="mr-3 text-escom-900" />
                    Notificaciones</h3>
                <div className="flex items-center justify-between bg-escom-100 px-12 py-6 rounded-2xl hover:shadow-lg transition-shadow cursor-pointer"
                     onClick={handleCambioNotificaciones}>
                    <div className="max-w-xl flex flex-col gap-2">
                        <span className="font-semibold text-escom-900 text-2xl">Recibir notificaciones de la plataforma</span>
                        <p className="font-base text-escom-800 text-xs">Si deseas recibir notificaciones, activa esta opción. Solo afectará a las notificaciones de la plataforma las cuales tengan que ver con los eventos que organizas.</p>
                    </div>
                    <div className={`text-3xl transition-colors ${Number(perfil?.config_notificacion) === 1 ? 'text-escom-600' : 'text-escom-600'}`}>
                        <FontAwesomeIcon icon={['fas', Number(perfil?.config_notificacion) === 1 ? 'toggle-on' : 'toggle-off']} />
                    </div>
                </div>
            </div>

            {/* Seguridad */}
            <div className="mb-6 border-t-2 border-escom-200 pt-6">
                <h3 className="text-2xl font-bold text-escom-sombra-400 mb-3 p-6">
                    <FontAwesomeIcon icon={['fas', 'lock']} className="mr-3 text-escom-900" />
                    Seguridad</h3>
                <div className="flex items-center justify-between bg-escom-100 px-12 py-6 rounded-2xl hover:shadow-lg transition-shadow"
                     >
                    <div className="max-w-xl flex flex-col gap-2">
                        <span className="font-semibold text-escom-900 text-2xl">Cambiar contraseña</span>
                        <p className="font-base text-escom-800 text-xs">Si deseas cambiar tu contraseña, haz clic en el botón a la derecha para recibir un correo con las instrucciones. Hará que te llegue un correo con un enlace para restablecerla. Se cerrará tu sesión actual por seguridad.</p>
                    </div>
                    <button
                        onClick={handleCambiarContrasena}
                        disabled={enviandoCorreo}
                        className="flex items-center gap-2 bg-escom-600 hover:bg-escom-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {enviandoCorreo ? (
                            <>
                                <FontAwesomeIcon icon={['fas', 'spinner']} className="animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={['fas', 'key']} />
                                Cambiar contraseña
                            </>
                        )}
                    </button>

                </div>
            </div>

            {mensajeExito && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg relative">
                    {mensajeExito}
                    <button className="absolute right-6 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="ml-4 cursor-pointer" 
                            onClick={() => setMensajeExito(null)} 
                        />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Configuracion;