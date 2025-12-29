import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

import { useEffect, useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);


import { useAuth } from "../../../api/Context/AuthContext";
import { IconoEscom, SvgRegistro } from "../../../components/assets/decoraciones/ElementosSvg";
import { CampoTexto } from "../../../components/assets/cutoms-campos/CampoTexto";
import { CampoContrasena } from "../../../components/assets/cutoms-campos/CampoContrasena";


const Registro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registrarUsuario, usuario, authSesion, errors: authErrors } = useAuth();
  const [showError, setShowError] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(false);

  const navigate = useNavigate();

  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (authSesion) {
      startTransition(() => {
        navigate("/alumno/");
      });
    }
  }, [authSesion, usuario, navigate]);

  useGSAP(() => {
    const splitTitulo = new SplitText(".texto-titulo", { type: "chars" });
    const tl = gsap.timeline();

    tl.fromTo(" .imagen-registro, .imagen-registro > div ",
      { opacity: 0, x: 1000 },
      {
        opacity: 1, x: 0, duration: 2.5, ease: "power2.out", delay: 0.5
      }, 
    ).fromTo(".icono-titulo",
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power2.inOut",
        scale: 1.2,
      }, "-=1.25"
    ).fromTo(splitTitulo.chars,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.inOut",
      },"<"
    ).fromTo(".container-registro > div, .boton-registro",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.inOut",
      },"<"
    )

    
  }, []);


  useEffect(() => {
    if (authErrors) {
      setErrorMensaje(authErrors);
      setShowError(true);
      gsap.fromTo(".container-error",
        {
          opacity: 0, y: -20, filter: "blur(4px)"
        },
        {
          opacity: 1, y: 0, duration: 0.3, ease: "power2.out", filter: "blur(0px)",
        });
    } else if (showError) {
      gsap.to(".container-error", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => { setShowError(false);  setErrorMensaje(null);}
      });
    }
  }, [authErrors, showError]);
  const isLoading = isPending;

  const onSubmit = async (data) => {
    await registrarUsuario(data);

  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-escom-200 via-black/10 to-escom-300 flex flex-col justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full h-full md:h-auto flex flex-col md:flex-row shadow-2xl rounded-2xl md:rounded-4xl bg-white overflow-hidden">
        <form className="relative w-full md:w-7/9 lg:w-2/3 flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 bg-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center w-full max-w-2xl mb-4 md:mb-6">
            <IconoEscom className="icono-titulo w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 text-escom-700"/>
            <h1 className="texto-titulo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-escom-900 text-center mb-4 md:mb-6">
              Registrarse
            </h1>
            {showError && (
              <div className="relative w-full flex flex-row justify-center">
                <div className="container-error w-full border-2 rounded-2xl bg-gradient-to-l from-red-300 to-red-500 text-white font-bold mt-6 px-4 py-4 z-20">
                  <p><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" /> {errorMensaje}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="container-registro w-full max-w-2xl grid grid-cols-2 gap-4 md:gap-5 items-center justify-center">
            <CampoTexto
              label="Nombre Completo"
              id="nombre"
              placeholder="Ej. Juan Carlos"
              required="El nombre es obligatorio"
              register={register}
              icon="fa-regular fa-user"
              error={errors.nombre}
            />
          
            <CampoTexto
              label="Boleta"
              id="boleta"
              placeholder="Ej. 2025011012"
              required="La boleta es obligatoria"
              register={register}
              icon="fa-solid fa-id-card"
              error={errors.boleta}
            />

            <CampoTexto
              label="Apellido Paterno"
              id="apellido_paterno"
              placeholder="Ej. Lopez"
              required="El apellido paterno es obligatorio"
              register={register}
              icon="fa-solid fa-user"
              error={errors.apellido_paterno}
            />

            <CampoTexto
              label="Apellido Materno (Opcional)"
              id="apellido_materno"
              placeholder="Ej. Perez"
              register={register}
              required={false}
              icon="fa-solid fa-user"
              error={errors.apellido_materno}
            />

            <CampoTexto
              label="Correo Electrónico"
              id="correo"
              type="email"
              placeholder="Ej. lopezp2000@alumno.ipn.mx"
              register={register}
              required="El correo electrónico es obligatorio"
              icon="fa-solid fa-envelope"
              error={errors.correo}
              className="col-span-2"
            />
            
            <CampoContrasena
              label="Contraseña"
              id="contrasena"
              placeholder="••••••••"
              required="La contraseña es obligatoria"
              register={register}
              error={errors.contrasena}
            />

            <CampoContrasena
              label="Confirmar Contraseña"
              id="confirmar_contrasena"
              placeholder="••••••••"
              required="La confirmación de contraseña es obligatoria"
              register={register}
              error={errors.confirmar_contrasena}
            />
            
            <button 
              className="boton-registro col-span-2 w-full bg-gradient-to-r from-escom-700 to-escom-900 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:scale-101 mt-1 md:mt-2 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Registrarse"}
            </button>
            
            <div className="col-span-2 text-center mt-2">
              <p className="text-xs md:text-sm text-escom-sombra-400">
                ¿Ya tienes cuenta? <Link to="/login" className="text-escom-700 hover:text-escom-900 font-semibold hover:underline">Inicia sesión aqui</Link>
              </p>
            </div>
          </div>
        </form>
        <div className="imagen-registro hidden md:block relative md:w-1/2 lg:w-5/8 h-64 md:h-auto" style={{
          clipPath: window.innerWidth >= 768 ? "url(#wave-clip)" : "none"
        }}>
          <SvgRegistro />
          <img src="../../public/assets/escom-registro.jpg" alt="Imagen de inicio de sesión" className="w-full h-full object-cover" />
          <div className="absolute top-0 h-full w-full bg-gradient-to-l from-escom-900/90 via-escom-700/70 to-transparent"></div>

          <div className="texto-imagen text-right absolute top-0 right-0 w-full h-full flex flex-col justify-center items-end p-4 text-white">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black mb-2 md:mb-4 leading-tight">
              Crea tu cuenta en<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-escom-200 to-white">
                ESCOMunidad
              </span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-escom-100 max-w-md leading-relaxed">
              Únete a nuestra plataforma para gestionar eventos, actividades y conectar con la comunidad ESCOM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
