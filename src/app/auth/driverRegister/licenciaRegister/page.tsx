"use client";
import React, { useState } from 'react';
import Licencia from "@/components/auth/DriverRegister/license"
import { useRouter } from 'next/navigation';
import { FaArrowLeft }from 'react-icons/fa';

export default function RegisterLicencia () {
    const [values, setValues] = useState({
        numeroRegistro: '',
        categoria: '',
        vencimiento: ''
    });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
        router.push('/'); // Redirigir a una página después de registro
    };

    const router = useRouter();

    return (
        <>
            <div className="bg-cover " style={{backgroundImage: "url('/images/conductor.webp')" }}>
                <div className="bg-gray-900 bg-opacity-50 h-screen flex flex-col">
                    {/* <button 
                        className="flex w-1/6 text-center items-center space-x-2 m-4 py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-200"
                        onClick={() => router.push('/auth/login')}>
                        <FaArrowLeft/> <span>Inicio de Sesión</span>
                    </button> */}
                    <div className= "h-screen flex justify-center items-center">
                        <div className="max-w-md mx-auto bg-white rounded space-y-6 max-h-[80vh] overflow-y-auto p-6 shadow-md">
                            <form onSubmit={handleSubmit} className="space-y-2">

                                <h1 className="text-2xl font-bold text-center">Registro de Conductor</h1>
                                <h1 className='text-xl text-center'>Datos licencia</h1>
                                
                                <Licencia onChange={handleChange} values={values} />
                            
                            </form>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="submit" 
                                    onClick={() => router.push('/auth/driverRegister')}
                                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                                    <span>Atras</span>
                                </button>
                                <button 
                                    type="submit" 
                                    onClick={() => router.push('/auth/driverRegister/fichaMedicaRegister')}
                                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                                    <span>Siguiente</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}