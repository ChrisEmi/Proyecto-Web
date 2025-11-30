import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import {IconoEscom} from "../../../components/assets/ElementosSvg";


const Registro = () => {
  const { register, handleSubmit } = useForm();
  const { registrarUsuario, usuario, authSesion, errors: authErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-escom-200 via-black/10 to-escom-300 flex flex-col justify-center p-4 md:p-8 lg:p-20">
      <div className="w-full h-full md:h-auto md:min-h-[600px] lg:min-h-[920px] flex flex-col md:flex-row shadow-2xl rounded-2xl md:rounded-4xl bg-white overflow-hidden">
        <form className="relative w-full md:w-7/9 lg:w-2/3 flex flex-col justify-center items-center p-20 bg-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center w-full max-w-2xl mb-6 md:mb-8 lg:mb-10 lg:absolute lg:top-1">
            <IconoEscom className="icono-titulo w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 text-escom-700"/>
            <h1 className="texto-titulo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-escom-900 text-center">
              Registrarse
            </h1>
            {showError && (
              <div className="relative w-full flex flex-row justify-center">
                <div className="container-error w-full border-2 rounded-2xl bg-gradient-to-l from-red-300 to-red-500 text-white font-bold px-4 py-4 my-6 z-20">
                {Array.isArray(errorMensaje) ? (
                  <ul className="list-disc list-inside text-xs md:text-sm">
                    {errorMensaje.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                ) : (
                  <p><span className="rounded-full bg-red-100 p-1 mr-2"><FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="text-red-600 text-xl"/></span>{errorMensaje}</p>
                )}
                </div>
              </div>
            )}
          </div>
          
          <div className="container-registro w-full max-w-2xl grid grid-cols-2 gap-4 md:gap-5 lg:absolute lg:bottom-16 xl:bottom-20 items-center justify-center">
            <div className="relative">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="nombre">
                Nombre(s)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-regular fa-user" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type="text"
                  id="nombre"
                  placeholder="Ej. Juan Carlos"
                  {...register("nombre")}
                  required
                />
              </div>
            </div>
          
            <div className="relative">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="boleta">
                Boleta
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-id-card" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type="text"
                  id="boleta"
                  placeholder="Ej. 2025011012"
                  {...register("boleta")}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="apellido_paterno">
                Apellido Paterno
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type="text"
                  id="apellido_paterno"
                  placeholder="Ej. Lopez"
                  {...register("apellido_paterno")}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="apellido_paterno">
                Apellido Materno (Opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type="text"
                  id="apellido_materno"
                  placeholder="Ej. Perez"
                  {...register("apellido_materno")}
                  required
                />
              </div>
            </div>

            <div className="relative col-span-2">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="correo">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-envelope" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type="email"
                  id="correo"
                  placeholder="Ej. lopezp2000@alumno.ipn.mx"
                  {...register("correo")}
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="contrasena">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-lock" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-11 md:pr-12 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type={showPassword ? "text" : "password"}
                  id="contrasena"
                  placeholder="••••••••"
                  {...register("contrasena")}
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-escom-100 rounded-full p-1.5 md:p-2 transition-all text-escom-700 hover:text-escom-900 text-sm md:text-base"
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onTouchStart={() => setShowPassword(true)}
                  onTouchEnd={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? 
                    <FontAwesomeIcon icon="fa-solid fa-eye" /> : 
                    <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                  }
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="contrasena">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-lock" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-11 md:pr-12 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300/40"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmar_contrasena"
                  placeholder="••••••••"
                  {...register("confirmar_contrasena")}
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-escom-100 rounded-full p-1.5 md:p-2 transition-all text-escom-700 hover:text-escom-900 text-sm md:text-base"
                  onMouseDown={() => setShowConfirmPassword(true)}
                  onMouseUp={() => setShowConfirmPassword(false)}
                  onTouchStart={() => setShowConfirmPassword(true)}
                  onTouchEnd={() => setShowConfirmPassword(false)}
                  onMouseLeave={() => setShowConfirmPassword(false)}
                >
                  {showConfirmPassword ? 
                    <FontAwesomeIcon icon="fa-solid fa-eye" /> : 
                    <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                  }
                </button>
              </div>
            </div>
            
            <button 
              className="boton-registro col-span-2 w-full bg-gradient-to-r from-escom-700 to-escom-900 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:scale-101 mt-1 md:mt-2 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Registrarse"}
            </button>
            
            <div className="col-span-2 text-center mt-2">
              <p className="text-xs md:text-sm text-escom-sombra-400">
                ¿Ya tienes cuenta? <a href="#" className="text-escom-700 hover:text-escom-900 font-semibold hover:underline">Inicia Sesión</a>
              </p>
            </div>
          </div>
        </form>
        <div className="imagen-registro hidden md:block relative md:w-1/2 lg:w-5/8 h-64 md:h-auto" style={{
          clipPath: window.innerWidth >= 768 ? "url(#wave-clip)" : "none"
        }}>
          <svg width="0" height="0">
            <defs>
              <clipPath id="wave-clip" clipPathUnits="objectBoundingBox" transform="scale(0.00104167, 0.00185185)">
                <path xmlns="http://www.w3.org/2000/svg" d="M177 540L192.5 527.2C208 514.3 239 488.7 256.3 463C273.7 437.3 277.3 411.7 264.7 386C252 360.3 223 334.7 199.3 308.8C175.7 283 157.3 257 148.3 231.2C139.3 205.3 139.7 179.7 154.8 154C170 128.3 200 102.7 218 77C236 51.3 242 25.7 245 12.8L248 0L960 0L960 540Z"/>
              </clipPath>
            </defs>
          </svg>
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
