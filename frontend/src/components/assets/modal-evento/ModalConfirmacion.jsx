import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";

const ModalConfirmacion = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    titulo, 
    mensaje, 
    icono = "fa-solid fa-circle-exclamation",
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar"
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-cancelar fixed inset-0 z-[600] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl min-h-50 p-6 flex items-center justify-center flex-col">
                <div className="flex flex-col items-center text-center gap-5">
                    <FontAwesomeIcon icon={icono} className="text-7xl text-escom-sombra-50/60" />
                    <h2 className="text-2xl font-bold text-escom-900">{titulo}</h2>
                    <p className="text-escom-900 mb-6 px-12">{mensaje}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="rounded-full bg-escom-sombra-50 px-4 py-2 text-white cursor-pointer"
                    >
                        {textoConfirmar}
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-escom-sombra-500 px-4 py-2 text-white cursor-pointer"
                    >
                        {textoCancelar}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalConfirmacion;
