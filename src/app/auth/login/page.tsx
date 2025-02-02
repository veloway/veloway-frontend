import React from 'react';


const Login = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">¡Bienvenido de vuelta!</h2>

      <form className="flex flex-col">
        <label className="mb-1 font-semibold" htmlFor="email">Correo Electronico</label>
        <input
          type="email"
          id="email"
          placeholder="Ingrese correo electrónico"
          required
          className="mb-4 p-2 border rounded"
        />

        <label className="mb-1 font-semibold" htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Ingrese contraseña"
          required
          className="mb-4 p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>

      {/* Enlace para recuperar contraseña */}
      <div className="text-center mb-6">
        <a href="/auth/resetPassword" className="text-sm text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Sección de registro */}
      <div className="text-center">
        <p className="mb-2">¿No tienes cuenta? ¡Regístrate!</p>

        <div className="flex justify-center gap-4 mb-4">
          <a href="/auth/clientRegister" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            como Cliente
          </a>
          <a href="/auth/driverRegister" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            como Conductor
          </a>
        </div>
      </div>
    </>

  );
};

export default Login;
