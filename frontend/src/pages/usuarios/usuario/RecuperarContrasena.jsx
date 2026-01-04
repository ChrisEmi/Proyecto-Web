import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, Link } from "react-router-dom";
import { CampoContrasena } from "../../../components/assets/cutoms-campos/CampoContrasena";
import { useAuth } from "../../../api/Context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IconoEscom } from "../../../components/assets/decoraciones/ElementosSvg";
import {CampoTexto} from "../../../components/assets/cutoms-campos/CampoTexto";

const RecuperarContrasena = () => {

    const { register, handleSubmit } = useForm();
    const [searchParams] = useSearchParams();
    const { recuperarContrasena, setErrorRecuperacion, errorRecuperacion } = useAuth();
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

    const token = searchParams.get("token");
    const correo = searchParams.get("id");



    const onSubmitForm = async (data) => { 
        try {
            console.log("Token:", token, "Correo:", correo);
            if (!token || !correo) setErrorRecuperacion("Parámetros inválidos para restablecer la contraseña.");
            const formData = {
                correo: correo,
                token: token,
                nueva_contrasena: data.nueva_contrasena,
                confirmar_contrasena: data.confirmar_contrasena
            };
            
            const res = await recuperarContrasena(formData);
            if (res.data.status === "success") {
                setMensajeConfirmacion("Contraseña restablecida con éxito. Ahora puedes iniciar sesión con tu nueva contraseña.");
            } else {
                setErrorRecuperacion(res.data.message || "Error al restablecer la contraseña.");
            }
        } catch (error) {
            setErrorRecuperacion("Error al restablecer la contraseña:" + error.data.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-escom-900 p-4 relative">
            {mensajeConfirmacion && (
                <div className="z-[999999] fixed inset-0 flex items-center justify-center p-4">
                    <div className="bg-black/60 backdrop-blur-sm absolute inset-0" />
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col items-center p-8 relative animate-fade-in">
                        <div className="w-20 h-20 bg-escom-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <FontAwesomeIcon icon="check" className="text-white text-3xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-escom-900 mb-3">¡Contraseña Actualizada!</h2>
                        <p className="text-gray-600 text-center mb-8 leading-relaxed">
                            Tu contraseña ha sido restablecida correctamente. Ya puedes acceder a tu cuenta con tu nueva contraseña.
                        </p>
                        <Link 
                            to="/login" 
                            className="w-full text-white bg-escom-800 py-3 px-6 rounded-xl font-semibold text-center hover:bg-escom-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            )}
            <div className="bg-white md:h-auto lg:w-2/4 w-full rounded-2xl shadow-2xl flex flex-col items-center gap-8 p-8 relative z-10 border border-gray-100">
                {/* Encabezado */}
                <div className="flex flex-col items-center">
                    <IconoEscom className="w-40 h-24 mx-auto mb-2 text-escom-900" />
                    <h1 className="font-bold text-escom-900 text-3xl md:text-4xl text-center">Recuperar Contraseña</h1>
                    <p className="text-gray-500 mt-2 text-center">Recupera la contraseña de tu cuenta, crea una nueva y segura para proteger tu información.</p>
                </div>

                {/* Caja de instrucciones */}
                <div className="flex flex-col gap-3 w-full p-5 bg-escom-100 rounded-2xl">
                    <span className="font-bold text-escom-sombra-400 text-xl">
                        <FontAwesomeIcon icon="fa-solid fa-info-circle" />{" "}Instrucciones 
                    </span>
                    <ol className="space-y-2 text-escom-sombra-400 font-medium px-8">
                        <li className="flex items-start gap-3">
                            <FontAwesomeIcon icon="fa-solid fa-check-circle" className="text-escom-700 mt-1" />
                            <span>Debe ser segura y contener al menos 8 caracteres.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FontAwesomeIcon icon="fa-solid fa-check-circle" className="text-escom-700 mt-1" />
                            <span>Incluye una combinación de letras mayúsculas, minúsculas, números y símbolos.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FontAwesomeIcon icon="fa-solid fa-check-circle" className="text-escom-700 mt-1" />
                            <span>No utilices información personal obvia como nombres o fechas de nacimiento.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FontAwesomeIcon icon="fa-solid fa-check-circle" className="text-escom-700 mt-1" />
                            <span>Evita reutilizar contraseñas que hayas usado en otros sitios.</span>
                        </li>
                    </ol>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="correo">
                            Correo Electrónico
                        </label>
                        <div className="relative text-escom-900">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm md:text-base ">
                                <FontAwesomeIcon icon="fa-solid fa-envelope" />
                            </span>
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm md:text-base text-escom-900/60">
                                <FontAwesomeIcon icon="fa-solid fa-lock" />
                            </span>
                            <input
                                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl bg-escom-100/30 text-escom-900/60 border-2 border-escom-900/50 cursor-not-allowed"
                                type="email"
                                id="correo"
                                value={correo || ""}
                                disabled
                                readOnly
                            />

                        </div>
                    </div>
                    <CampoContrasena
                        label="Nueva Contraseña"
                        id="nueva_contrasena"
                        placeholder="Ingresa tu nueva contraseña"
                        className="mt-2"
                        register={register}
                    />
                    <CampoContrasena
                        label="Confirmar Contraseña"
                        id="confirmar_contrasena"
                        placeholder="Confirma tu nueva contraseña"
                        className="mt-2"
                        register={register}
                    />
                    {errorRecuperacion && (
                        <div className="col-span-1 md:col-span-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                            <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" className="text-red-500" />
                            <p className="text-red-600 text-sm">{errorRecuperacion}</p>
                        </div>
                    )}
                    <button 
                        type="submit" 
                        className="mt-4 bg-gradient-to-r from-escom-800 to-escom-900 text-white py-3 px-6 rounded-xl font-semibold hover:from-escom-700 hover:to-escom-800 transition-all duration-300 col-span-1 md:col-span-2 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-key" className="group-hover:rotate-12 transition-transform" />
                        Cambiar Contraseña
                    </button>
                </form>

                {/* Link de regreso */}
                <Link 
                    to="/login" 
                    className="text-escom-700 hover:text-escom-900 font-medium flex items-center gap-2 transition-colors"
                >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    Volver al inicio de sesión
                </Link>
            </div>
        </div>
    )
}

export default RecuperarContrasena;
