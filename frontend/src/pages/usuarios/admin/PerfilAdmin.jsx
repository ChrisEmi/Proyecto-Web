const PerfilAdmin = () => {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
			<div className="max-w-xl w-full bg-white shadow-md rounded-lg p-10 text-center space-y-6">
				<h1 className="text-3xl font-semibold text-slate-800">Perfil de Alumno</h1>
				<p className="text-slate-600">
					Esta es una página de prueba sin funcionalidades. Úsala para validar estilos,
					rutas o cualquier ajuste visual antes de integrar lógica real.
				</p>
				<div className="grid gap-4 sm:grid-cols-3">
					<span className="rounded border border-dashed border-slate-300 p-4 text-sm text-slate-500">
						Tarjeta de ejemplo 1
					</span>
					<span className="rounded border border-dashed border-slate-300 p-4 text-sm text-slate-500">
						Tarjeta de ejemplo 2
					</span>
					<span className="rounded border border-dashed border-slate-300 p-4 text-sm text-slate-500">
						Tarjeta de ejemplo 3
					</span>
				</div>
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-700"
				>
					Botón decorativo
				</button>
			</div>
		</main>
	);
};

export default PerfilAdmin;