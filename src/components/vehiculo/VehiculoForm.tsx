import React, { useState, useEffect } from 'react';

interface Props {
  addVehiculo: (vehiculo: any) => void;
  editIndex: number | null;
  vehiculos: any[];
}

const VehiculoForm: React.FC<Props> = ({ addVehiculo, editIndex, vehiculos }) => {
  const [anio, setAnio] = useState('');
  const [color, setColor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nomSeguro, setNomSeguro] = useState('');
  const [patente, setPatente] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [modeloNombre, setModeloNombre] = useState('');
  const [marcaNombre, setMarcaNombre] = useState('');
  const [titular, setTitular] = useState('');
  const [documentoTitular, setDocumentoTitular] = useState('');
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editIndex !== null) {
      const vehiculoToEdit = vehiculos[editIndex];
      setAnio(vehiculoToEdit.anio);
      setColor(vehiculoToEdit.color);
      setDescripcion(vehiculoToEdit.descripcion);
      setNomSeguro(vehiculoToEdit.nomSeguro);
      setPatente(vehiculoToEdit.patente);
      setTipoVehiculo(vehiculoToEdit.tipoVehiculo.nombre);
      setModeloNombre(vehiculoToEdit.tipoVehiculo.modelo.nombre);
      setMarcaNombre(vehiculoToEdit.tipoVehiculo.modelo.marca);
      setTitular(vehiculoToEdit.titular.nombre);
      setDocumentoTitular(vehiculoToEdit.titular.documento);
    }
  }, [editIndex, vehiculos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors: { [key: string]: string } = {};
  
    if (documentoTitular.length < 6 || documentoTitular.length > 10 || isNaN(Number(documentoTitular))) {
      errors.documentoTitular = "El documento debe ser un número entre 6 y 10 dígitos.";
    }
    if (!/^[a-zA-Z\s]+$/.test(titular)) {
      errors.titular = "El nombre del titular solo debe contener caracteres alfabéticos.";
    }
    if (!anio || !color || !descripcion || !nomSeguro || !patente || !tipoVehiculo || !modeloNombre || !marcaNombre) {
      errors.generic = "Todos los campos son obligatorios.";
    }
  
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    setErrorMessages({});
    const vehiculo = {
      anio,
      color,
      descripcion,
      nomSeguro,
      patente,
      tipoVehiculo: {
        nombre: tipoVehiculo,
        modelo: {
          nombre: modeloNombre,
          marca: marcaNombre,
        },
      },
      titular: {
        nombre: titular,
        documento: documentoTitular,
      },
    };
    addVehiculo(vehiculo);
    
    // Resetear campos del formulario
    setAnio('');
    setColor('');
    setDescripcion('');
    setNomSeguro('');
    setPatente('');
    setTipoVehiculo('');
    setModeloNombre('');
    setMarcaNombre('');
    setTitular('');
    setDocumentoTitular('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg rounded-lg p-8 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Registro de Vehículo</h2>

      {errorMessages.generic && (
        <div className="mb-4 text-red-500 text-center">
          {errorMessages.generic}
        </div>
      )}

      {/* Titular */}
      <div className="field">
        <label className="block text-white font-semibold">Titular del Vehículo</label>
        <input
          type="text"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          placeholder="Nombre del titular"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.titular && <p className="text-red-500 text-sm">{errorMessages.titular}</p>}
      </div>

      {/* Documento del Titular */}
      <div className="field">
        <label className="block text-white font-semibold">Documento del Titular</label>
        <input
          type="text"
          value={documentoTitular}
          onChange={(e) => setDocumentoTitular(e.target.value)}
          placeholder="Número de documento"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.documentoTitular && <p className="text-red-500 text-sm">{errorMessages.documentoTitular}</p>}
      </div>

      {/* Año */}
      <div className="field">
        <label className="block text-white font-semibold">Año</label>
        <select
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        >
          <option value="">Seleccione un año</option>
          {[...Array(31)].map((_, index) => {
            const year = new Date().getFullYear() - index;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        {errorMessages.anio && <p className="text-red-500 text-sm">{errorMessages.anio}</p>}
      </div>

      {/* Color */}
      <div className="field">
        <label className="block text-white font-semibold">Color</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Ej. Rojo"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.color && <p className="text-red-500 text-sm">{errorMessages.color}</p>}
      </div>

      {/* Descripción */}
      <div className="field">
        <label className="block text-white font-semibold">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del vehículo"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          rows={3}
          required
        />
        {errorMessages.descripcion && <p className="text-red-500 text-sm">{errorMessages.descripcion}</p>}
      </div>

      {/* Nombre del Seguro */}
      <div className="field">
        <label className="block text-white font-semibold">Nombre de la Compañía de Seguro</label>
        <input
          type="text"
          value={nomSeguro}
          onChange={(e) => setNomSeguro(e.target.value)}
          placeholder="Nombre de la compañía"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.nomSeguro && <p className="text-red-500 text-sm">{errorMessages.nomSeguro}</p>}
      </div>

      {/* Patente */}
      <div className="field">
        <label className="block text-white font-semibold">Patente</label>
        <input
          type="text"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
          placeholder="Ej. ABC123"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.patente && <p className="text-red-500 text-sm">{errorMessages.patente}</p>}
      </div>

      {/* Tipo de Vehículo */}
      <div className="field">
        <label className="block text-white font-semibold">Tipo de Vehículo</label>
        <input
          type="text"
          value={tipoVehiculo}
          onChange={(e) => setTipoVehiculo(e.target.value)}
          placeholder="Ej. Sedan"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.tipoVehiculo && <p className="text-red-500 text-sm">{errorMessages.tipoVehiculo}</p>}
      </div>

      {/* Modelo */}
      <div className="field">
        <label className="block text-white font-semibold">Modelo</label>
        <input
          type="text"
          value={modeloNombre}
          onChange={(e) => setModeloNombre(e.target.value)}
          placeholder="Ej. Corolla"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.modeloNombre && <p className="text-red-500 text-sm">{errorMessages.modeloNombre}</p>}
      </div>

      {/* Marca */}
      <div className="field">
        <label className="block text-white font-semibold">Marca</label>
        <input
          type="text"
          value={marcaNombre}
          onChange={(e) => setMarcaNombre(e.target.value)}
          placeholder="Ej. Toyota"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-white transition duration-200"
          required
        />
        {errorMessages.marcaNombre && <p className="text-red-500 text-sm">{errorMessages.marcaNombre}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-white text-blue-500 font-semibold py-2 rounded-lg hover:bg-gray-100 transition duration-200"
      >
        {editIndex !== null ? 'Actualizar Vehículo' : 'Registrar Vehículo'}
      </button>
    </form>
  );
};

export default VehiculoForm;
