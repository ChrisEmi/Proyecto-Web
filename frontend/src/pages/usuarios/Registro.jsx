

const Registro = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <h1 className="text-xl font-semibold p-5 text-center">Registro de Usuario</h1>
        <form className="space-y-4">
            <div>
              <label className="block mb-1" htmlFor="nombre">Nombre:</label>
              <input className="border border-gray-300 p-2 rounded w-full" type="text" id="nombre" name="nombre" required />
            </div>
            <div>
              <label className="block mb-1" htmlFor="email">Email:</label>
              <input className="border border-gray-300 p-2 rounded w-full" type="email" id="email" name="email" required />
            </div>
            <div>
              <label className="block mb-1" htmlFor="password">Contraseña:</label>
              <input className="border border-gray-300 p-2 rounded w-full" type="password" id="password" name="password" required />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">Registrar</button>
        </form>
    </div>
  );
};

export default Registro;
