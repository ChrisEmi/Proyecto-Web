import { useForm } from "react-hook-form";
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


import { useAuth } from "../../api/Context/AuthContext";
import {IconoEscom} from "../../components/assets/ElementosSvg";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const { iniciarSesion, usuario, authSesion, errors: authErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(false);

  const navigate = useNavigate();

  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (authSesion) {
      startTransition(() => {
        switch (usuario.nombre_tipo) {
          case 'Administrador':
            navigate('/control/admin');
            break;
          case 'Estudiante':
            navigate('/alumno/');
            break;
          case 'Organizador':
            navigate('/organizador/');
            break;
          default:
            navigate('/');
            break;
        }
      });
    }
  }, [authSesion, usuario, navigate]);

  useGSAP(() => {
    const splitTitulo = new SplitText(".texto-titulo", { type: "chars" });
    const tl = gsap.timeline();

    tl.fromTo(" .imagen-login, .imagen-login > div ",
      { opacity: 0, x: -1000 },
      {
        opacity: 1, x: 0, duration: 2.5, ease: "power2.out", delay: 0.5
      }, 
    ).fromTo(".icono-titulo",
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power2.inOut",
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
    ).fromTo(".container-login > div, .boton-login",
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
    await iniciarSesion(data);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-escom-200 via-black/10 to-escom-300 flex flex-col justify-center p-4 md:p-8 lg:p-20">
      <div className="w-full h-full md:h-auto md:min-h-[600px] lg:min-h-[700px] flex flex-col md:flex-row shadow-2xl rounded-2xl md:rounded-4xl bg-white overflow-hidden">
        <div className="imagen-login hidden md:block relative md:w-1/2 lg:w-5/8 h-64 md:h-auto" style={{
          clipPath: window.innerWidth >= 768 ? "url(#wave-clip)" : "none"
        }}>
          <svg width="0" height="0">
            <defs>
              <clipPath id="wave-clip" clipPathUnits="objectBoundingBox" transform="scale(0.00111111, 0.00166667)">
                <path d="M0,0 L786,0 L794.2,25 C802.3,50 818.7,100 819.2,150 C819.7,200 804.3,250 789.8,300 C775.3,350 761.7,400 762,450 C762.3,500 776.7,550 783.8,575 L791,600 L0,600 Z" />
              </clipPath>
            </defs>
          </svg>
          <img src="../../public/assets/escom-login.jpeg" alt="Imagen de inicio de sesión" className="w-full h-[800px] object-cover" />
          <div className="absolute top-0 h-full w-full bg-gradient-to-r from-escom-900/90 via-escom-700/70 to-transparent"></div>

          <div className="texto-imagen absolute top-0 left-0 w-full h-full flex flex-col justify-center p-6 md:p-8 lg:p-12 xl:p-16 text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black mb-2 md:mb-4 leading-tight">
              Bienvenido a<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-escom-200 to-white">
                ESCOMunidad
              </span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-escom-100 max-w-md leading-relaxed">
              Accede a tu cuenta para gestionar eventos, actividades y conectar con la comunidad ESCOM
            </p>
            
          </div>
        </div>

        <form className="relative w-full md:w-1/2 lg:w-3/8 flex flex-col justify-center items-center p-6 md:p-8 lg:p-12 bg-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center w-full mb-6 md:mb-8 lg:mb-0 lg:absolute lg:top-8">
            <IconoEscom className="icono-titulo w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 text-escom-700"/>
            <h1 className="texto-titulo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-escom-900 text-center">
              Iniciar Sesión
            </h1>
            {showError && (
              <div className="relative w-full flex flex-row justify-center">
                <div className="container-error w-full max-w-md border-2 rounded-2xl bg-gradient-to-l from-red-300 to-red-500 text-white font-bold px-4 py-4 my-8 z-20">
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

          
          <div className="container-login w-full max-w-md flex flex-col gap-4 md:gap-5 lg:absolute lg:bottom-16 xl:bottom-20">
            <div>
              <label className="block mb-1 md:mb-2 text-xs md:text-sm font-semibold text-escom-900" htmlFor="correo">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escom-700 text-sm md:text-base">
                  <FontAwesomeIcon icon="fa-solid fa-envelope" />
                </span>
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300"
                  type="email"
                  id="correo"
                  placeholder="Correo Institucional"
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
                  className="w-full pl-9 md:pl-10 pr-11 md:pr-12 py-2 md:py-3 text-sm md:text-base border-2 border-escom-200 rounded-lg md:rounded-xl focus:border-escom-700 focus:outline-none focus:ring-2 focus:ring-escom-300 transition-all text-escom-900 placeholder:text-escom-sombra-300"
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
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-xs md:text-sm text-escom-900 font-semibold">¿Olvidaste tu contraseña?</span>
              <a href="#" className="text-xs md:text-sm text-escom-700 hover:text-escom-900 font-semibold hover:underline transition-colors">
                Recuperar Contraseña
              </a>
            </div>
            
            <button 
              className="boton-login w-full bg-gradient-to-r from-escom-700 to-escom-900 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:scale-101 mt-1 md:mt-2 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
            
            <div className="text-center mt-2 md:mt-4">
              <p className="text-xs md:text-sm text-escom-sombra-400">
                ¿No tienes cuenta? <a href="#" className="text-escom-700 hover:text-escom-900 font-semibold hover:underline">Regístrate aquí</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
