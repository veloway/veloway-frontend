interface FichaMedicaProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
        altura: number | null,
        peso: number | null,
        enfermedadCardiaca: string | null,
        enfermedadRespiratoria: string | null,
        alergias: string | null,
        epilepsia: boolean,
        diabetes: boolean,
        compartirFichaMedica: boolean;
    }
    
}

const FichaMedica: React.FC<FichaMedicaProps> = ({ onChange, values }) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file); 
    };
    
    return (
        <div className="space-y-4">
            <input 
                type="text" 
                name="altura" 
                value={values.altura || ''} 
                onChange={onChange} 
                placeholder="Altura (cm)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="peso" 
                value={values.peso || ''} 
                onChange={onChange} 
                placeholder="Peso (kg)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="enfermedadCardiaca" 
                value={values.enfermedadCardiaca || ''} 
                onChange={onChange} 
                placeholder="Enfermedad Cardiaca (opcional)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="enfermedadRespiratoria" 
                value={values.enfermedadRespiratoria || ''} 
                onChange={onChange} 
                placeholder="Enfermedad Respiratorio (opcional)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="alergias" 
                value={values.alergias || ''} 
                onChange={onChange} 
                placeholder="Alergias (opcional)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="flex items-center">
                Epilepsia:
                <input 
                    type="checkbox" 
                    name="epilepsia" 
                    checked={values.epilepsia} 
                    onChange={onChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
            <label className="flex items-center">
                Diabetes:
                <input 
                    type="checkbox" 
                    name="diabetes" 
                    checked={values.diabetes} 
                    onChange={onChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
            <label className="block">
                Adjuntar Ficha Médica:
                <input 
                    type="file" 
                    name="fichaMedica" 
                    onChange={handleFileChange} 
                    required 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </label>
            <label className="flex items-center">
                Compartir Ficha Médica:
                <input 
                    type="checkbox" 
                    name="compartirFichaMedica" 
                    checked={values.compartirFichaMedica} 
                    onChange={onChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
        </div>
    );
};

export default FichaMedica;
