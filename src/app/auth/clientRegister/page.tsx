// auth/clientregister/page.tsx
"use client";

import React, { useState } from 'react';
import Registro from '../../../components/auth/Registro';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // Icono de flecha para el botón de regreso

const RegisterCliente = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        dni: '',
        fechaNacimiento: '',
        nombre: '',
        apellido: '',
        telefono: '',
    });
    
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Manejar envío de formulario
        console.log(values);
        router.push('/'); // Redirigir a una página después de registro
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded space-y-6">
            {/* Botón de regreso */}
            <button 
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4"
                onClick={() => router.push('/auth/login')}
            >
                <FaArrowLeft /> <span>Inicio de Sesión</span>
            </button>

            <h2 className="text-2xl font-bold text-center">Registro de Cliente</h2>
            <Registro onChange={handleChange} values={values} />
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                Registrarse como Cliente
            </button>
        </form>
    );
};

export default RegisterCliente;
