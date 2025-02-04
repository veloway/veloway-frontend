import { useDriverRegistroStore } from "@/stores/userDriverRegisterStore";

const FichaMedica: React.FC = () => {

    const { medicalFileValues, setMedicalFileValues } = useDriverRegistroStore((state) => ({
        medicalFileValues: state.medicalFileValues,
        setMedicalFileValues: state.setMedicalFileValues,
      }));
    
      const handleFichaMedicaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
    
        setMedicalFileValues({
          [name]: type === "checkbox" ? checked : value,
        });
      };

    return (
        <div className="space-y-4">
            <input 
                type="text" 
                name="altura" 
                value={medicalFileValues.altura || ''} 
                onChange={handleFichaMedicaChange} 
                placeholder="Altura (cm)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="peso" 
                value={medicalFileValues.peso || ''} 
                onChange={handleFichaMedicaChange} 
                placeholder="Peso (kg)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="enfermedadCardiaca" 
                value={medicalFileValues.enfermedadCardiaca || ''} 
                onChange={handleFichaMedicaChange} 
                placeholder="Enfermedad Cardiaca (opcional)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="enfermedadRespiratoria" 
                value={medicalFileValues.enfermedadRespiratoria || ''} 
                onChange={handleFichaMedicaChange} 
                placeholder="Enfermedad Respiratorio (opcional)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="text" 
                name="alergias" 
                value={medicalFileValues.alergias || ''} 
                onChange={handleFichaMedicaChange} 
                placeholder="Alergias (opcional)" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="flex items-center">
                Epilepsia:
                <input 
                    type="checkbox" 
                    name="epilepsia" 
                    checked={medicalFileValues.epilepsia} 
                    onChange={handleFichaMedicaChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
            <label className="flex items-center">
                Diabetes:
                <input 
                    type="checkbox" 
                    name="diabetes" 
                    checked={medicalFileValues.diabetes} 
                    onChange={handleFichaMedicaChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
            <label className="flex items-center">
                Compartir Ficha Médica:
                <input 
                    type="checkbox" 
                    name="compartirFichaMedica" 
                    checked={medicalFileValues.compartirFichaMedica} 
                    onChange={handleFichaMedicaChange} 
                    className="ml-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </label>
        </div>
    );
};

export default FichaMedica;
