import { useAdmin } from "../../../api/Context/AdminContext";
import { FormOrganizador } from "./Assets/FormOrganizador";
import { FormAdmin } from "./Assets/FormAdmin";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const CrearUsuario = () => {
    const { crearOrganizador, crearAdmin, usuarioCreado, setUsuarioCreado } = useAdmin();
    const [formDesplegado, setFormDesplegado] = useState('organizador');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.fromTo(
            ".container > div",
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut" }
        );
    });

    const onSubmitForm = async (data) => {
        if (formDesplegado === 'organizador') {
            await crearOrganizador(data);
        } else if (formDesplegado === 'administrador') {
            await crearAdmin(data);
        }
    };

    return (
        <>
            {usuarioCreado && createPortal(
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-12 w-11/12 md:w-2/5 lg:w-1/3 mx-auto flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4 text-center text-escom-900">El usuario ha sido creado exitosamente</h2>
                        <div className="my-4 p-4 bg-escom-100 border-l-4 border-escom-500 text-escom-700 w-full rounded-lg">
                            <h2 className="text-xl mb-3 font-bold"><FontAwesomeIcon icon="fa-solid fa-user" /> Usuario Creado</h2>
                            <ul className="list-inside w-5/6 mx-auto ">
                                <li className="font-medium py-2"><strong>Identificador:</strong> {usuarioCreado.id_usuario}</li>
                                <li className="font-medium py-2"><strong>Contraseña Temporal:</strong> {usuarioCreado.contrasena_temporal}</li>
                            </ul>
                        </div>
                        <div className="my-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 w-full rounded-lg">
                            <h2 className="text-xl mb-3 font-bold"><FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" /> Importante</h2>
                            <ul className="list-disc list-inside w-3/4 mx-auto ">
                                <li className="font-semibold py-2">Guarde la contraseña temporal de manera segura.</li>
                                <li className="font-semibold py-2">El usuario debe cambiar su contraseña temporal en el primer inicio de sesión.</li>
                            </ul>
                        </div>
                        <button 
                            className="bg-escom-600 text-white mt-4 px-4 py-2 rounded-full w-full hover:bg-escom-700 transition-all"
                            onClick={() => {
                                setUsuarioCreado(null);
                                navigate('/control/admin/usuarios');
                            }}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>,
                document.body
            )}
            <div className="container bg-white min-h-screen rounded-2xl shadow-lg md:p-10 flex flex-col gap-12 p-12">
                <div className="w-12/16 flex flex-col mx-auto justify-center">
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className={`w-1/2 shadow-2xl bg-escom-100 p-4 rounded-2xl text-escom-800 min-h-[250px] min-w-[250px] relative cursor-pointer  transition-all duration-300 ${formDesplegado === 'organizador' ? 'ring-4 ring-escom-600 scale-100' : 'hover:bg-escom-100/75 scale-90'}`} onClick={() => setFormDesplegado('organizador')}>
                            {formDesplegado === 'organizador' && (
                                <FontAwesomeIcon icon="fa-solid fa-check" className="text-3xl absolute top-8 right-8 text-escom-600" />)
                            }
                            <FontAwesomeIcon icon="fa-solid fa-user-gear" className="text-3xl absolute top-8 left-8"/>
                            <div className="absolute bottom-8 right-8 text-right flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold">Crear Organizador</h1>
                                <p className="text-escom-700 font-medium">Crea un nuevo organizador para gestionar eventos.</p>
                            </div>
                        </div>
                        <div className={`w-1/2 shadow-2xl bg-escom-800 p-4 rounded-2xl text-white relative min-h-[250px] min-w-[250px] cursor-pointer transition-all duration-300 ${formDesplegado === 'administrador' ? 'ring-4 ring-escom-600 scale-100' : 'hover:bg-escom-800/75 scale-90'}`} onClick={() => setFormDesplegado('administrador')}>
                            {formDesplegado === 'administrador' && (
                                <FontAwesomeIcon icon="fa-solid fa-check" className="text-3xl absolute top-8 left-8 text-escom-600"/>)}
                            <FontAwesomeIcon icon="fa-solid fa-user-shield" className="text-3xl absolute top-8 right-8"/>
                            <div className="absolute bottom-8 left-8 text-left flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold">Crear Administrador</h1>
                                <p className="text-escom-100 font-medium">Crea un nuevo administrador para gestionar el sistema.</p>
                            </div>
                        </div>
                    </div>
                    {formDesplegado === 'organizador' && <FormOrganizador register={register} errors={errors} onSubmit={handleSubmit(onSubmitForm)} />}
                    {formDesplegado === 'administrador' && <FormAdmin register={register} errors={errors} onSubmit={handleSubmit(onSubmitForm)} />}
                </div>
            </div>
        </>
    )
}

export default CrearUsuario