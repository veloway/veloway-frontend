import react from 'react';

const resetPassword = () => {
    return (
        <>
            <h2 className="text-3xl font-bold text-center mb-6">Recuperar contraseña</h2>
            <form className="flex flex-col">
                <label className="mb-1 font-semibold" htmlFor="email">Codigo de recuperacion</label>
                <input
                    id="number"
                    placeholder="Codigo de recuperacion"
                    required
                    className="mb-4 p-2 border rounded"

                />

                <label className="mb-1 font-semibold" htmlFor="email">Nueva contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    required
                    className="mb-4 p-2 border rounded"

                />

                <label className="mb-1 font-semibold" htmlFor="email">Repetir nueva contraseña</label>
                <input
                   type="password"
                   id="password"
                   placeholder="Contraseña"
                    required
                    className="mb-4 p-2 border rounded"

                />


            </form>
            <a href="/auth/login" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Reestablecer contraseña
            </a>
        </>
    );
};

export default resetPassword;
