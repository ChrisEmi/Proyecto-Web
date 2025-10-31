import { useForm } from "react-hook-form";

import { useAuth } from "../../api/Context/AuthContext";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const { iniciarSesion, errors: authErrors } = useAuth();

  const onSubmit = async (data) => {
    await iniciarSesion(data);
  };

  return (
    <>
      {authErrors && (
        <div className="max-w-md mx-auto mt-4 p-4 border border-red-500 rounded bg-red-100 text-red-700">
          {Array.isArray(authErrors) ? (
            <ul className="list-disc list-inside">
              {authErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          ) : (
            <p>{authErrors}</p>
          )}
        </div>
      )}
      <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
        <h1 className="text-xl font-semibold p-5 text-center">Login de Usuario</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1" htmlFor="correo">Email:</label>
            <input
              className="border border-gray-300 p-2 rounded w-full"
              type="email"
              id="correo"
              {...register("correo")}
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="contrasena">Contraseña:</label>
            <input
              className="border border-gray-300 p-2 rounded w-full"
              type="password"
              id="contrasena"
              {...register("contrasena")}
              required
            />
          </div>
          <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
