// auth/DomicilioForm.tsx
import React from 'react';

interface DomicilioFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
      calle: string;
      numero: string;
      descripcion: string;
      piso: string;
      depto: string;
      localidadID: string;
  };
  onBack: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DomicilioForm = ({ onChange, values, onSubmit }: DomicilioFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(e); // Pasamos el evento al manejador externo
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
          <input
              type="text"
              name="calle"
              placeholder="Calle"
              value={values.calle}
              onChange={onChange}
              className="w-full border rounded-md p-2"
          />
          <input
              type="text"
              name="numero"
              placeholder="Número"
              value={values.numero}
              onChange={onChange}
              className="w-full border rounded-md p-2"
          />
          <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={values.descripcion}
              onChange={onChange}
              className="w-full border rounded-md p-2"
          />
          <input
              type="text"
              name="piso"
              placeholder="Piso"
              value={values.piso}
              onChange={onChange}
              className="w-full border rounded-md p-2"
          />
          <input
              type="text"
              name="depto"
              placeholder="Departamento"
              value={values.depto}
              onChange={onChange}
              className="w-full border rounded-md p-2"
          />
          <input
              type="text"
              name="localidadID"
              placeholder=" Localidad"
              value={values.localidadID}
              onChange={onChange}
              className="w-full border rounded-md p-2"
          />
          <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
              Finalizar Registro
          </button>
      </form>
  );
};

export default DomicilioForm;
