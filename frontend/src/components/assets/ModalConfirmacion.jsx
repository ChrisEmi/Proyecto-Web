import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useState, useEffect } from "react";

const ModalConfirmacion = ({ mensaje, onCerrar }) => {
    const [mensajeModal, setMensajeModal] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    useEffect(() => {
        if (mensaje) {
            setMensajeModal(mensaje);
            setMostrar(true);
            gsap.fromTo(".container-modal",
            {
                opacity: 0, y: -20
            },
            {
                opacity: 1, y: 0, duration: 0.3, ease: "power2.out"
            });
        } else if (mostrar) {
        gsap.to(".container-modal", {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => { setMostrar(false);  setMensajeModal(null);}
        });
        }
    }, [mensaje, mostrar]);
    if (!mensajeModal) return null;

    return createPortal(
        mostrar && (<div className="container-modal fixed inset-0 z-[9999] top-3/4 lg:top-1/16 mx-auto w-auto h-1/14 lg:w-1/5 flex items-center justify-center transform bg-green-500/50 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <button 
                onClick={() => { setMostrar(false);  setMensajeModal(null); onCerrar();}} 
                className="absolute top-0 right-0 bg-transparent hover:bg-green-200/30 rounded-full w-8 h-8 flex items-center justify-center transition-all"
            >
                <FontAwesomeIcon 
                    icon={['fas', 'times']} 
                    className="absolute text-green-100 font-semibold hover:text-green-200 transition-all"
                />
            </button>
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={['fas', 'check-circle']} className="text-green-500 text-3xl" />
                <span className="text-green-100 font-semibold text-lg lg:text-xl">{mensajeModal}</span>
            </div>
        </div>),
        document.body
    );
};

export default ModalConfirmacion;
