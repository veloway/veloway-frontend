// auth/driverregister/page.tsx
"use client";

import React, { useState } from 'react';
import Registro from '../../../components/auth/Registro';
import { useRouter } from 'next/navigation';
import { FaArrowLeft }from 'react-icons/fa'; // Iconos

const RegisterConductor = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        dni: '',
        fechaNacimiento: '',
        nombre: '',
        apellido: '',
        telefono: ''
    });

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
        
        <>
            <div className="bg-cover " style={{backgroundImage: "url('/images/conductor.webp')" }}>
                <div className="bg-gray-900 bg-opacity-50 h-screen flex flex-col">
                    {/* <button 
                        className="flex w-1/6 items-center space-x-2 ml-4 mt-4 py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-200"
                        onClick={() => router.push('/auth/login')}>
                        <FaArrowLeft/> <span>Inicio de Sesión</span>
                    </button> */}
                    <div className= "h-screen flex justify-center items-center">
                        <div className="max-w-md mx-auto bg-white rounded space-y-6 max-h-[80vh] overflow-y-auto p-6 shadow-md ">
                            <form onSubmit={handleSubmit} className="space-y-2 ">

                                <h1 className="text-2xl font-bold text-center">Registro de Conductor</h1>
                                <h2 className="text-xl text-center">Datos personales</h2>
                                
                                <Registro onChange={handleChange} values={values} />
                            
                            </form>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="submit" 
                                    onClick={() => router.push('/auth/login')}
                                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                                    <span>Volver a Login</span>
                                </button>
                                <button 
                                    type="submit" 
                                    onClick={() => router.push('/auth/driverRegister/licenciaRegister')}
                                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                                    <span>Siguiente</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default RegisterConductor;
