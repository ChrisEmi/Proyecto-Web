import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const ModalPregunta = ({ 
    abierto, 
    titulo = "¿Estás seguro?", 
    mensaje, 
    icono = "question-circle",
    colorIcono = "text-escom-500",
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    colorConfirmar = "bg-escom-600 hover:bg-escom-700",
    onConfirmar, 
    onCancelar,
    isLoading = false
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (abierto && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [abierto]);

    const cerrarConAnimacion = (callback) => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                ease: "power2.in",
                onComplete: callback
            });
        } else {
            callback();
        }
    };

    const handleConfirmar = () => {
        cerrarConAnimacion(() => {
            onConfirmar && onConfirmar();
        });
    };

    const handleCancelar = () => {
        cerrarConAnimacion(() => {
            onCancelar && onCancelar();
        });
    };

    if (!abierto) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <div 
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
                <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full bg-escom-50 flex items-center justify-center mb-4`}>
                        <FontAwesomeIcon 
                            icon={['fas', icono]} 
                            className={`text-3xl ${colorIcono}`} 
                        />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {titulo}
                    </h3>
                    
                    {mensaje && (
                        <p className="text-gray-600 mb-6">
                            {mensaje}
                        </p>
                    )}
                    
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handleCancelar}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {textoCancelar}
                        </button>
                        <button
                            onClick={handleConfirmar}
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-white ${colorConfirmar} transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
                        >
                            {isLoading ? (
                                <FontAwesomeIcon icon={['fas', 'spinner']} className="animate-spin" />
                            ) : (
                                textoConfirmar
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalPregunta;
