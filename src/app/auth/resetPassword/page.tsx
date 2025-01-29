import react from 'react';

const resetPassword = () => {
    return (
        <>
            <h2 className="text-3xl font-bold text-center mb-6">Recuperar contraseña</h2>
            <h4 className="text-xl text-center mb-6"> Ingrese un correo electronico, le enviaremos un codigo para que pueda reestablecer su contraseña</h4>
            <form className="flex flex-col">
        <label className="mb-1 font-semibold" htmlFor="email">Mail</label>
        <input
          type="email"
          id="email"
          placeholder="Correo electrónico"
          required
          className="mb-4 p-2 border rounded"
          
        />
        </form>
        <a href="/auth/getNewPassword" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Enviar codigo de recuperacion
          </a>
        </>
    );
};

export default resetPassword;
