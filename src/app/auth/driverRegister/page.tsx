// auth/driverregister/page.tsx
"use client";

import React, { useState } from 'react';
import Registro from '../../../components/auth/Registro';
import Licencia from '../../../components/auth/DriverRegister/license';
import FichaMedica from '../../../components/auth/DriverRegister/MedicalFile';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Iconos

const RegisterConductor = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        dni: '',
        fechaNacimiento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        numeroRegistro: '',
        categoria: '',
        vencimiento: '',
        compartirFichaMedica: false,
    });

    const [showLicense, setShowLicense] = useState(true); // Estado para plegar/desplegar Licencia
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
        router.push('/'); // Redirigir a una página después de registro
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded space-y-6">
            {/* Botón de regreso */}
            <button 
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4"
                onClick={() => router.push('/auth/login')}
            >
                <FaArrowLeft /> <span>Inicio de Sesión</span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-0">
                <h2 className="text-2xl font-bold text-center mb-6">Registro de Conductor</h2>
                <Registro onChange={handleChange} values={values} />

                {/* Plegar/Desplegar Licencia */}
                <div className="space-y-4">
                    <button 
                        type="button" 
                        className="w-full py-2 px-4 bg-gray-100 rounded-md flex justify-between items-center mt-4"
                        onClick={() => setShowLicense(!showLicense)}
                    >
                        <span>Registro de Licencia</span>
                        {showLicense ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {showLicense && (
                        <Licencia onChange={handleChange} values={values} />
                    )}
                </div>
                    <div className='mt-4'><FichaMedica onChange={handleChange} compartirFichaMedica={values.compartirFichaMedica}/></div>
                

                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                    Registrarse como Conductor
                </button>
            </form>
        </div>
    );
};

export default RegisterConductor;
