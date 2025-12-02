import { useAdmin } from "../../../api/Context/AdminContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CampoTexto } from "../../../components/assets/CampoTexto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Perfil = () => {
    const { perfil, obtenerDatosPerfil, actualizarDatosPerfil, loading: loadingContext } = useAdmin();
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [editando, setEditando] = useState(false);

    const fotoSrc = watch("foto_src");
    
    useGSAP(() => {
        if (!loadingContext && perfil) {
            gsap.fromTo(".perfil-form > div, .perfil-form > form > div",
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1, ease: "power4.inOut" }
            );
        }
    }, [loadingContext, perfil]);

    useEffect(() => {
        obtenerDatosPerfil();
    }, []);

    useEffect(() => {
        if (perfil) {
            reset({
                nombre: perfil.nombre || '',
                apellido_paterno: perfil.apellido_paterno || '',
                apellido_materno: perfil.apellido_materno || '',
                correo: perfil.correo || '',
                telefono: perfil.telefono || '',
                foto_src: perfil.foto_src || '',
            });
        }
    }, [perfil, reset]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await actualizarDatosPerfil(data);
        } finally {
            setLoading(false);
            setEditando(false);
            await obtenerDatosPerfil();
        }
    };

    const onCargarImagen = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dqhsgokht',
                uploadPreset: 'eventos-escomunidad',
                sources: ['local', 'url', 'camera'],
                multiple: false,
                folder: 'fotos_perfil',
                public_id: `perfil_${perfil.id_usuario}_${Date.now()}`,

            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Imagen cargada con éxito:", result.info);
                    setValue('foto_src', result.info.secure_url, { shouldValidate: true });
                }
            }
        );
        widget.open()
    };

    return(
        <>
            <div className="container-section p-6 flex flex-col gap-6 min-w-full min-h-screen items-center justify-center">
                
                {loadingContext && (
                    <div className="flex flex-col w-3xl h-2xl shadow-2xl font-semibold justify-center items-center">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
                        <span className="ml-4 self-center text-gray-600">Cargando datos del perfil...</span>
                    </div>
                )}  
                {!loadingContext && perfil && (
                    <form onSubmit={handleSubmit(onSubmit)} className="perfil-form flex flex-col gap-24 items-center w-6xl bg-white p-6 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-4 text-escom-900 w-full ml-12 mt-4">
                            <FontAwesomeIcon icon={`fa-solid fa-user`} className="text-2xl md:text-3xl" />
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Datos del Alumno</h1>
                        </div>
                        <div className="mx-auto">
                            <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full relative group/foto flex items-center justify-center text-white font-bold text-4xl md:text-6xl shadow-lg bg-escom-700 transition-all duration-300 hover:scale-105 overflow-hidden`}>
                                {fotoSrc ? (
                                    <img src={fotoSrc} alt="Imagen de perfil" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <span>{perfil.nombre?.charAt(0).toUpperCase()}{perfil.nombre?.charAt(1).toUpperCase()}</span>
                                )}
                                {editando && (
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/foto:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-full flex-col gap-2">
                                    <button type="button" onClick={onCargarImagen} className="bg-escom-400 hover:bg-escom-500 px-3 py-1 rounded-full text-white font-semibold text-lg cursor-pointer transition-colors">
                                        Cambiar
                                    </button>
                                    {fotoSrc && (
                                        <button type="button" onClick={() => setValue('foto_src', '', { shouldValidate: true })} className="bg-escom-900 hover:bg-escom-950 px-3 py-1 rounded-full text-white font-semibold text-sm cursor-pointer transition-colors">
                                        Eliminar
                                        </button>
                                    )}
                                    </div>
                                )}
                            </div>
                            
                        </div>
                        <div className="flex w-full max-w-3xl gap-32 flex-col">
                            <div className="w-full flex flex-col gap-6 items-center">
                                <span className="flex items-center text-escom-900 font-semibold text-lg border-b-2 pb-2 w-full">
                                    <FontAwesomeIcon icon="info-circle" className="text-escom-700 mr-2" />
                                    <span className="text-escom-900 font-medium">Informacion General</span>
                                </span>
                                <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2">
                                    <CampoTexto
                                        label="Nombre"
                                        id="nombre"
                                        register={register}
                                        required="El nombre es obligatorio"
                                        error={errors.nombre}
                                        icon={"fa-solid fa-user"}
                                        disabled={!editando}
                                        className="col-span-2"
                                    />
                                    <CampoTexto
                                        label="Apellido Paterno"
                                        id="apellido_paterno"
                                        register={register}
                                        required="El apellido paterno es obligatorio"
                                        error={errors.apellido_paterno}
                                        icon={"fa-solid fa-user"}
                                        disabled={!editando}
                                    />
                                    <CampoTexto
                                        label="Apellido Materno"
                                        id="apellido_materno"
                                        register={register}
                                        required={false}
                                        error={errors.apellido_materno}
                                        icon={"fa-solid fa-user"}
                                        disabled={!editando}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-6 items-center">
                                <span className="flex items-center text-escom-900 font-semibold text-lg border-b-2 border-escom-900/70 pb-2 w-full">
                                    <FontAwesomeIcon icon="fa-solid fa-address-book" className="text-escom-700 mr-2" />
                                    <span className="text-escom-900 font-medium">Informacion de Contacto</span>
                                </span>
                                <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2">
                                    <CampoTexto
                                        label="Correo Electrónico"
                                        id="correo"
                                        register={register}
                                        required="El correo es obligatorio"
                                        error={errors.correo}
                                        icon={"fa-solid fa-envelope"}
                                        disabled={true}
                                    />
                                    <CampoTexto
                                        label="Teléfono"
                                        id="telefono"
                                        register={register}
                                        required="El teléfono es obligatorio"
                                        error={errors.telefono}
                                        icon={"fa-solid fa-phone"}
                                        disabled={!editando}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {!editando ? (
                                <button 
                                    type="button" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setEditando(true);
                                    }} 
                                    className="bg-escom-700 hover:bg-escom-800 text-lg text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    <FontAwesomeIcon icon="pen-to-square" className="mr-2" /> Editar Perfil
                                </button>
                            ) : (
                            <>
                                <button type="submit" disabled={loading} className="bg-escom-700 hover:bg-escom-800 text-lg text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50">
                                        <FontAwesomeIcon icon="floppy-disk" className="mr-2" />{loading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setEditando(false);
                                        reset();
                                    }} 
                                    className="bg-gray-500 hover:bg-gray-600 text-lg text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    <FontAwesomeIcon icon="xmark" className="mr-2" />Cancelar
                                </button>
                            </>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
export default Perfil;