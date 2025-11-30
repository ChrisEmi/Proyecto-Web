import { useOrganizador } from "../../../api/Context/OrganizadorContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CrearEvento = () => {
    useGSAP(() => { 
        gsap.fromTo(".container-crear-usuario > div, .container-crear-usuario > form",
			{ opacity: 0, x: 50 }, 
			{ opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut" }
        );

    }, []);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { crearEvento, errors: apiErrors } = useOrganizador();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [imagenSrc, setImagenSrc] = useState('');
    const [imagenDesc, setImagenDesc] = useState('');
    const [fechaMinima, setFechaMinima] = useState('');

    useEffect(() => {
        const ahora = new Date();
        const año = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, '0');
        const dia = String(ahora.getDate()).padStart(2, '0');
        const hora = String(ahora.getHours()).padStart(2, '0');
        setFechaMinima(`${año}-${mes}-${dia}T${hora}:00`);
    }, []);

    const onSubmit = async (data) => {
        const eventoData = {
            ...data,
            id_categoria: parseInt(data.id_categoria) || 0,
            cupo: parseInt(data.cupo) || 0,
            fecha: data.fecha ? data.fecha.replace('T', ' ') + ':00' : null,
            fecha_final: data.fecha_final ? data.fecha_final.replace('T', ' ') + ':00' : null,
            tags: tags,
            imagenes: imagenes
        };
        
        const res = await crearEvento(eventoData);
        
        if (res) {
            reset();
            setTags([]);
            setImagenes([]);
            navigate('/organizador/eventos');
        }
    };

    const agregarTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const eliminarTag = (tagAEliminar) => {
        setTags(tags.filter(tag => tag !== tagAEliminar));
    };

    const agregarImagen = () => {
        if (imagenSrc.trim()) {
            setImagenes([...imagenes, {
                src: imagenSrc.trim(),
                descripcion: imagenDesc.trim() || 'Imagen del evento'
            }]);
            setImagenSrc('');
            setImagenDesc('');
        }
    };

    const eliminarImagen = (index) => {
        setImagenes(imagenes.filter((_, i) => i !== index));
    };

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
        
        // Formatear como datetime-local
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const hora = String(fecha.getHours()).padStart(2, '0');
        const minuto = String(fecha.getMinutes()).padStart(2, '0');
        
        return `${año}-${mes}-${dia}T${hora}:${minuto}`;
    };

    const inputs = [
        {
            label: "Nombre del Evento",
            id: "nombre",
            request: "titulo_evento",
            type: "text",
            placeholder: "Ej. Conferencia de Tecnología",
            icon: "calendar-check",
            fullWidth: true
        },
        {
            label: "Descripción",
            id: "descripcion",
            request: "descripcion",
            type: "textarea",
            placeholder: "Describe tu evento...",
            icon: "align-left",
            fullWidth: true
        },
        {
            label: "Fecha y Hora de Inicio",
            id: "fecha",
            request: "fecha",
            type: "datetime-local",
            icon: "clock",
            step: 3600
        },
        {
            label: "Fecha y Hora de Fin",
            id: "fecha_final",
            request: "fecha_final",
            type: "datetime-local",
            icon: "clock",
            step: 3600
        },
        {
            label: "Ubicación",
            id: "ubicacion",
            request: "ubicacion",
            type: "text",
            placeholder: "Ej. Auditorio ESCOM",
            icon: "location-dot"
        },
        {
            label: "Cupo Máximo",
            id: "cupo_maximo",
            request: "cupo",
            type: "number",
            placeholder: "Ej. 100",
            icon: "users",
            min: 0
        },
        {
            label: "Categoría",
            id: "categoria",
            request: "id_categoria",
            type: "select",
            icon: "tag",
            options: [
                { value: "", label: "Selecciona una categoría" },
                { value: 1, label: "Académico" },
                { value: 2, label: "Cultural" },
                { value: 3, label: "Deportivo" },
                { value: 4, label: "Social" },
                { value: 5, label: "Taller" }
            ]
        }
    ];

    return (
        <div className="container-crear-usuario max-w-7xl mx-auto p-6 bg-escom-100 rounded-2xl shadow-lg">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-escom-800 mb-2">
                    <FontAwesomeIcon icon={['fas', 'calendar-plus']} className="mr-3" />
                    Crear Nuevo Evento
                </h1>
                <p className="text-gray-600">Completa la información para crear un nuevo evento</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {apiErrors && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={['fas', 'exclamation-circle']} className="text-red-500 mr-3" />
                            <p className="text-red-700 font-semibold">{apiErrors}</p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {inputs.map(({ label, id, request, type, placeholder, icon, fullWidth, options, min }) => (
                            <div key={id} className={fullWidth ? "md:col-span-2" : ""}>
                                <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={['fas', icon]} className="mr-2 text-escom-700" />
                                    {label}
                                </label>
                                
                                {type === 'textarea' ? (
                                    <textarea
                                        id={id}
                                        rows="4"
                                        placeholder={placeholder}
                                        {...register(request, { required: `${label} es obligatorio` })}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-escom-500 focus:border-escom-500 transition-all ${
                                            errors[request] ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                ) : type === 'select' ? (
                                    <select
                                        id={id}
                                        {...register(request, { required: `${label} es obligatorio` })}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-escom-500 focus:border-escom-500 transition-all ${
                                            errors[request] ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    >
                                        {options.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={id}
                                        type={type}
                                        placeholder={placeholder}
                                        min={type === 'datetime-local' ? fechaMinima : min}
                                        step={type === 'datetime-local' ? 1800 : undefined}
                                        {...register(request, { 
                                            required: `${label} es obligatorio`,
                                            ...(type === 'datetime-local' && {
                                                onChange: (e) => {
                                                    const redondeado = redondearFecha(e.target.value);
                                                    e.target.value = redondeado;
                                                }
                                            })
                                        })}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-escom-500 focus:border-escom-500 transition-all ${
                                            errors[request] ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                )}
                                
                                {errors[request] && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <FontAwesomeIcon icon={['fas', 'exclamation-circle']} className="mr-1" />
                                        {errors[request].message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        <FontAwesomeIcon icon={['fas', 'tags']} className="mr-2 text-escom-700" />
                        Etiquetas (Tags)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Agrega palabras clave para poder identificar tu evento</p>
                    
                    <div className="flex gap-3 mb-4">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarTag())}
                            placeholder="Ej. Tecnología, Innovación..."
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-escom-500 focus:border-escom-500"
                        />
                        <button
                            type="button"
                            onClick={agregarTag}
                            className="px-6 py-3 bg-escom-700 text-white rounded-xl font-semibold hover:bg-escom-800 transition-all"
                        >
                            <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                            Agregar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.length === 0 ? (
                            <p className="text-gray-400 italic">No hay tags agregados</p>
                        ) : (
                            tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-escom-100 text-escom-800 rounded-full font-medium"
                                >
                                    <FontAwesomeIcon icon={['fas', 'tag']} className="text-xs" />
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => eliminarTag(tag)}
                                        className="ml-1 text-escom-700 hover:text-escom-300 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={['fas', 'times']} />
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        <FontAwesomeIcon icon={['fas', 'images']} className="mr-2 text-escom-700" />
                        Imágenes del Evento
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Agrega imágenes para hacer más atractivo tu evento</p>
                    
                    <div className="space-y-3 mb-4">
                        <input
                            type="url"
                            value={imagenSrc}
                            onChange={(e) => setImagenSrc(e.target.value)}
                            placeholder="URL de la imagen"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-escom-500 focus:border-escom-500"
                        />
                        <input
                            type="text"
                            value={imagenDesc}
                            onChange={(e) => setImagenDesc(e.target.value)}
                            rows="2"
                            placeholder="Descripción de la imagen (opcional)"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-escom-500 focus:border-escom-500"
                        />
                        <div className="flex justify-end">
                            <button
                                    type="button"
                                    onClick={agregarImagen}
                                    className="px-6 py-3 bg-escom-700 text-white flex items-end rounded-xl font-semibold hover:bg-escom-800 transition-all"
                                >
                                    <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                                    Agregar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {imagenes.length === 0 ? (
                            <p className="text-gray-400 italic col-span-full">No hay imágenes agregadas</p>
                        ) : (
                            imagenes.map((imagen, index) => (
                                <div key={index} className="relative w-full group border-2 border-gray-200 rounded-xl overflow-hidden hover:border-escom-500 transition-all">
                                    <img
                                        src={imagen.src}
                                        alt={imagen.descripcion}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=Error+al+cargar+imagen';
                                        }}
                                    />
                                    <div className="p-3 bg-white">
                                        <p className="text-sm text-gray-600 line-clamp-2">{imagen.descripcion}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => eliminarImagen(index)}
                                        className="absolute top-2 right-2 bg-escom-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-escom-700"
                                    >
                                        <FontAwesomeIcon icon={['fas', 'trash']} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            <FontAwesomeIcon icon={['fas', 'times']} className="mr-2" />
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-escom-700 text-white rounded-xl font-semibold hover:bg-escom-800 hover:shadow-lg transition-all"
                        >
                            <FontAwesomeIcon icon={['fas', 'check']} className="mr-2" />
                            Crear Evento
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CrearEvento;