// auth/Registro.tsx
import React from 'react';
import { useRegistroStore } from '@/stores/userRegisterStore';



const Registro  = () => {

    const  { userValues , setUserValues } = useRegistroStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserValues({ [name]: value });  // Actualizando el estado global
      };

    return (
        <div className="space-y-4"> {/* Espacio entre los inputs */}
            <input 
                type="email" 
                name="email" 
                value={userValues.email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="password" 
                name="password" 
                value={userValues.password} 
                onChange={handleChange} 
                placeholder="Contraseña" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="dni" 
                value={userValues.dni} 
                onChange={handleChange} 
                placeholder="DNI" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="date" 
                name="fechaNacimiento" 
                value={userValues.fechaNacimiento} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="nombre" 
                value={userValues.nombre} 
                onChange={handleChange} 
                placeholder="Nombre" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="apellido" 
                value={userValues.apellido} 
                onChange={handleChange} 
                placeholder="Apellido" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="tel" 
                name="telefono" 
                value={userValues.telefono} 
                onChange={handleChange} 
                placeholder="Teléfono" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Registro;
