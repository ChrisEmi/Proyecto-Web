import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const InicioAdmin = () => {

	useGSAP(() => {
		gsap.fromTo(".container-inicio > div", 
			{ opacity: 0, x: 50 }, 
			{ opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power4.inOut" }
		);
	}, []);

	return (
		<div className="container-inicio p-6 md:p-10 space-y-8">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold text-escom-sombra-400">
						<FontAwesomeIcon icon={['fas', 'user-tie']} className="mr-2" /> Bienvenido Administrador
					</h1>
				</div>
				<div className="text-sm text-gray-500 uppercase">
					<FontAwesomeIcon icon={['fas', 'calendar']} className="mr-2" />
					{new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
				</div>
			</div>
			<div className="bg-gradient-to-br h-60 flex flex-col justify-center from-escom-sombra-400 to-escom-sombra-600 rounded-2xl shadow-md p-8 text-white">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="flex-1">
						<h2 className="text-2xl md:text-3xl font-bold mb-3">
							Sistema de Gestión ESCOM
						</h2>
						<p className="text-escom-50 mb-4">
							Administra eventos culturales, usuarios y actividades de manera eficiente
						</p>
						<NavLink 
							to="/control/admin/usuarios"
							className="inline-flex items-center gap-2 bg-white text-escom-sombra-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
						>
							Gestionar Usuarios
							<FontAwesomeIcon icon={['fas', 'arrow-right']} />
						</NavLink>
					</div>
					<div className="text-center">
						<div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
							<FontAwesomeIcon icon={['fas', 'chart-line']} className="text-6xl" />
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
				<div className="lg:col-span-2">
					<div className="bg-white rounded-2xl shadow-md p-6 min-h-90 flex flex-col">
						<h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
							<FontAwesomeIcon icon={['fas', 'bolt']} className="mr-3 text-escom-400" />
							Accesos Rápidos
						</h2>
						{/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full items-center justify-center">
							{accesosRapidos.map((acceso, index) => (
								<NavLink
									key={index}
									to={acceso.ruta}
									className="group p-9 rounded-xl border-2 border-gray-100 hover:border-escom-300 hover:shadow-lg transition-all duration-300"
								>
									<div className="flex items-start justify-center gap-4">
										<div className={`${acceso.color} w-12 h-12 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
											<FontAwesomeIcon icon={['fas', acceso.icono]} className="text-xl" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-gray-800 group-hover:text-escom-500 transition-colors">
												{acceso.titulo}
											</h3>
											<p className="text-sm text-gray-600 mt-1">{acceso.descripcion}</p>
										</div>
										<FontAwesomeIcon
											icon={['fas', 'arrow-right']}
											className="text-gray-400 group-hover:text-escom-500 group-hover:translate-x-1 transition-all"
										/>
									</div>
								</NavLink>
							))}
						</div>*/}
					</div>
				</div>

				<div className="lg:col-span-1">
					<div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col">
						<h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
							<FontAwesomeIcon icon={['fas', 'clock']} className="mr-3 text-escom-400" />
							Actividad Reciente
						</h2>
						{/*<div className="space-y-4 overflow-y-auto">
							{actividadReciente.map((actividad, index) => (
								<div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
									<div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${actividad.color}`}>
										<FontAwesomeIcon icon={['fas', actividad.icono]} />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm text-gray-800 font-medium">{actividad.texto}</p>
										<p className="text-xs text-gray-500 mt-1">{actividad.tiempo}</p>
									</div>
								</div>
							))}
						</div>*/}
						<button className="w-full mt-4 py-2 text-sm text-escom-500 hover:bg-escom-50 rounded-lg transition-colors font-medium">
							Ver todo
						</button>
					</div>
				</div>
			</div>


		</div>
	);
};

export default InicioAdmin;
