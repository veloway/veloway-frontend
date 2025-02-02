// auth/Registro.tsx
import React from 'react';

interface RegistroProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
        email: string;
        password: string;
        dni: string;
        fechaNacimiento: string;
        nombre: string;
        apellido: string;
        telefono: string;
    };
}

const Registro: React.FC<RegistroProps> = ({ onChange, values }) => {
    return (
        <div className="space-y-3"> {/* Espacio entre los inputs */}
            <input 
                type="email" 
                name="email" 
                value={values.email} 
                onChange={onChange} 
                placeholder="Email" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="password" 
                name="password" 
                value={values.password} 
                onChange={onChange} 
                placeholder="Contraseña" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="dni" 
                value={values.dni} 
                onChange={onChange} 
                placeholder="DNI" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="date" 
                name="fechaNacimiento" 
                value={values.fechaNacimiento} 
                onChange={onChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="nombre" 
                value={values.nombre} 
                onChange={onChange} 
                placeholder="Nombre" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="apellido" 
                value={values.apellido} 
                onChange={onChange} 
                placeholder="Apellido" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="tel" 
                name="telefono" 
                value={values.telefono} 
                onChange={onChange} 
                placeholder="Teléfono" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Registro;
