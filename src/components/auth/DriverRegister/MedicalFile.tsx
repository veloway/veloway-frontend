// auth/driverregister/FichaMedica.tsx
import React from 'react';

interface FichaMedicaProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    compartirFichaMedica: boolean;
}

const FichaMedica: React.FC<FichaMedicaProps> = ({ onChange, compartirFichaMedica }) => {
    return (
        <div className="space-y-4">
            <label className="block">
                Adjuntar Ficha Médica:
                <input 
                    type="file" 
                    name="fichaMedica" 
                    onChange={onChange} 
                    required 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </label>
            <label className="flex items-center">
                Compartir Ficha Médica:
                <input 
                    type="checkbox" 
                    name="compartirFichaMedica" 
                    checked={compartirFichaMedica} 
                    onChange={onChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
        </div>
    );
};

export default FichaMedica;
