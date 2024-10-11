// auth/driverregister/Licencia.tsx
import React from 'react';

interface LicenciaProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
        numeroRegistro: string;
        categoria: string;
        vencimiento: string;
    };
}

const Licencia: React.FC<LicenciaProps> = ({ onChange, values }) => {
    return (
        <>
        <div className="space-y-4">
            <input 
                type="text" 
                name="numeroRegistro" 
                value={values.numeroRegistro} 
                onChange={onChange} 
                placeholder="Número de Registro" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="categoria" 
                value={values.categoria} 
                onChange={onChange} 
                placeholder="Categoría" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="date" 
                name="vencimiento" 
                value={values.vencimiento} 
                onChange={onChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        </>
    );
};

export default Licencia;
