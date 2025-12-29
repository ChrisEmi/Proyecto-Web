import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ModalConfirmacion, CarruselImagenes, FormularioEvento } from "../modal-evento";

// Estilos del carrusel
const carruselStyles = `
    .carrusel-slide-abs {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 80px;
    }
    .carrusel-slide-abs img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
`;

// Función utilitaria para redondear fechas
const redondearFecha = (fechaString) => {
    if (!fechaString) return fechaString;
    
    const fecha = new Date(fechaString);
    const minutos = fecha.getMinutes();
    if (minutos < 15) {
        fecha.setMinutes(0);
    } else if (minutos < 45) {
        fecha.setMinutes(30);
    } else {
        fecha.setMinutes(0);
        fecha.setHours(fecha.getHours() + 1);
    }
    
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);
    
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    
    return `${año}-${mes}-${dia}T${hora}:${minuto}`;
};

const ModalDetallesEvento = ({ 
    abrirDetalles, 
    eventoSeleccionado, 
    onCerrar, 
    errores,
    estaEditando,
    setEstaEditando,
    categoria,
    isLoading,
    onGuardar,
    onEliminar,
    onVerificar,
    onInscribirse,
    isInscrito,
    onDesinscribirse,
    tipoUsuario = 'default', // 'admin' | 'alumno' | 'organizador' | 'default'
    paginaAlumno = false
}) => {
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalInscribir, setModalInscribir] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [eliminarImagen, setEliminarImagen] = useState(null);
    const [modalGuardar, setModalGuardar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(null);
    const [datosForm, setDatosForm] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();

    // Sincronizar imágenes cuando cambie el evento seleccionado
    useEffect(() => {
        if (eventoSeleccionado && eventoSeleccionado.imagenes) {
            setImagenes(eventoSeleccionado.imagenes);
        } else {
            setImagenes([]);
        }
    }, [eventoSeleccionado]);

    const manejarSubmitForm = (formData) => {
        // Incluir las imágenes actualizadas en los datos del formulario
        const datosConImagenes = {
            ...formData,
            imagenes: imagenes
        };
        console.log("Datos completos a guardar:", datosConImagenes);
        setDatosForm(datosConImagenes);
        setModalGuardar(true);
    };

    useGSAP(() => { 
        if (!abrirDetalles || !eventoSeleccionado) return;
        gsap.set(".modal-evento > div", { opacity: 0 });

        if (abrirDetalles) {
            gsap.fromTo(".modal-evento", { opacity: 0 }, {
                opacity: 1, duration: 0.3, onComplete: () => {
                    gsap.fromTo(".modal-evento > div", {
                        opacity: 0, y: 50
                    }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power1.in" })
                }
            });
        }
    }, { dependencies: [abrirDetalles, eventoSeleccionado], scope: document.body });

    if (!abrirDetalles || !eventoSeleccionado) return null;

    return createPortal(
        <>
            <ModalConfirmacion
                isOpen={modalCancelar}
                onClose={() => setModalCancelar(false)}
                onConfirm={() => {
                    onDesinscribirse();
                    navigate('/alumno/mis-eventos');
                }}
                titulo="Confirmar Cancelación"
                mensaje="¿Estás seguro de que deseas cancelar tu inscripción en este evento?"
                icono="fa-solid fa-circle-exclamation"
            />

            <ModalConfirmacion
                isOpen={modalEliminar}
                onClose={() => setModalEliminar(false)}
                onConfirm={() => {
                    onEliminar();
                }}
                titulo="Confirmar Cancelación"
                mensaje="¿Estás seguro de que deseas cancelar este evento?"
                icono="fa-solid fa-circle-exclamation"
            />

            <ModalConfirmacion
                isOpen={modalInscribir}
                onClose={() => setModalInscribir(false)}
                onConfirm={() => {
                    onInscribirse();
                    navigate('/alumno/mis-eventos');
                }}
                titulo="Confirmar Inscripción"
                mensaje="¿Estás seguro de que deseas inscribirte en este evento?"
                icono="fa-solid fa-circle-check"
            />

            <ModalConfirmacion
                isOpen={modalGuardar}
                onClose={() => setModalGuardar(false)}
                onConfirm={() => {
                    if (datosForm) {
                        onGuardar(datosForm);
                    }
                    setModalGuardar(false);
                }}
                titulo="Confirmar Cambios"
                mensaje="¿Estás seguro de que deseas guardar los cambios realizados en este evento?"
                icono="fa-solid fa-floppy-disk"
            />

            <ModalConfirmacion
                isOpen={modalGuardar}
                onClose={() => setModalGuardar(false)}
                onConfirm={() => {
                    if (datosForm) {
                        onGuardar(datosForm);
                    }
                    setModalGuardar(false);
                }}
                titulo="Confirmar Cambios"
                mensaje="¿Estás seguro de que deseas guardar los cambios realizados en este evento?"
                icono="fa-solid fa-floppy-disk"
            />

            <ModalConfirmacion
                isOpen={eliminarImagen !== null}
                onClose={() => setEliminarImagen(null)}
                onConfirm={() => {
                    console.log("Índice a eliminar:", eliminarImagen);
                    console.log("Imágenes antes:", imagenes);
                    const indiceAEliminar = eliminarImagen;
                    const nuevasImagenes = imagenes.filter((_, index) => index !== indiceAEliminar);
                    console.log("Imágenes después:", nuevasImagenes);
                    setImagenes(nuevasImagenes);
                    setEliminarImagen(null);
                }}
                titulo="Confirmar Eliminación"
                mensaje="¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer."
                icono="fa-solid fa-ban"
            />

            <style>{carruselStyles}</style>

            <div className={`modal-evento fixed inset-0 z-[300] grid items-center justify-center bg-black/50 backdrop-blur-sm p-4 lg:p-20 gap-4 lg:gap-10 overflow-auto ${
                (imagenes && imagenes.length > 0) || estaEditando ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 place-items-center'
            }`}>
                {errores && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                        {errores}
                    </div>
                )}

                <button 
                    onClick={onCerrar}
                    className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-all"
                >
                    <FontAwesomeIcon icon={['fas', 'times']} className="text-xl" />
                </button>
                
                <CarruselImagenes 
                    imagenes={imagenes} 
                    abrirDetalles={abrirDetalles}
                    isEditando={estaEditando}
                    onAgregarImagen={(nuevaImagen) => { 
                        setImagenes([...imagenes, nuevaImagen]);
                    }}
                    onEliminarImagen={(index) => {
                        setEliminarImagen(index);
                    }}

                />
                
                {/* Formulario de detalles */}
                <FormularioEvento
                    eventoSeleccionado={eventoSeleccionado}
                    estaEditando={estaEditando}
                    setEstaEditando={setEstaEditando}
                    categoria={categoria}
                    isLoading={isLoading}
                    tipoUsuario={tipoUsuario}
                    paginaAlumno={paginaAlumno}
                    isInscrito={isInscrito}
                    register={register}
                    handleSubmit={handleSubmit}
                    formErrors={formErrors}
                    redondearFecha={redondearFecha}
                    onVerificar={onVerificar}
                    onSubmitForm={manejarSubmitForm}
                    setModalInscribir={setModalInscribir}
                    setModalCancelar={setModalCancelar}
                    setModalEliminar={setModalEliminar}
                    onEliminar={onEliminar}
                />
            </div>
        </>,
        document.body
    );
};

export default ModalDetallesEvento;
