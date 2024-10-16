import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface Props {
  addVehiculo: (vehiculo: any) => void;
  editIndex: number | null;
  vehiculos: any[];
}

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: '25px',
}));

const VehiculoForm: React.FC<Props> = ({ addVehiculo, editIndex, vehiculos }) => {
  const [anio, setAnio] = useState<string>('');
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

    if (!/^\d{4}$/.test(anio)) {
      errors.anio = "El año debe ser un número de 4 dígitos.";
    }

    if (!marcaNombre) {
      errors.marcaNombre = "La marca es obligatoria.";
    }

    if (!color || !descripcion || !nomSeguro || !patente || !tipoVehiculo || !modeloNombre) {
      errors.generic = "Todos los campos son obligatorios.";
    }

    setErrorMessages((prev) => ({ ...prev, ...errors }));

    if (Object.keys(errors).length > 0) {
      return;
    }

    const vehiculo = {
      anio: String(anio),
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
    setErrorMessages({});
  };

  return (
    <div onSubmit={handleSubmit} style={{ maxWidth: 900, margin: 'auto', marginTop: '24px' }}>
      <h2 className="text-2xl font-bold text-center mb-6">Registro del Vehículo</h2>

      {errorMessages.generic && <div style={{ color: 'red' }}>{errorMessages.generic}</div>}
      {errorMessages.anio && <div style={{ color: 'red' }}>{errorMessages.anio}</div>}
      {errorMessages.marcaNombre && <div style={{ color: 'red' }}>{errorMessages.marcaNombre}</div>}

      <div className="space-y-4">
        <input
          type="text"
          name="titular"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          placeholder="Titular del Vehículo"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {errorMessages.titular && <div style={{ color: 'red' }}>{errorMessages.titular}</div>}

        <input
          type="text"
          name="documentoTitular"
          value={documentoTitular}
          onChange={(e) => setDocumentoTitular(e.target.value)}
          placeholder="Documento del Titular"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessages.documentoTitular && <div style={{ color: 'red' }}>{errorMessages.documentoTitular}</div>}

        <input
          type="text"
          name="anio"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          placeholder="Año"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2} 
        />

        <input
          type="text"
          name="nomSeguro"
          value={nomSeguro}
          onChange={(e) => setNomSeguro(e.target.value)}
          placeholder="Nombre del Seguro"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="patente"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
          placeholder="Patente"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input          type="text"
          name="tipoVehiculo"
          value={tipoVehiculo}
          onChange={(e) => setTipoVehiculo(e.target.value)}
          placeholder="Tipo de Vehículo"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="modeloNombre"
          value={modeloNombre}
          onChange={(e) => setModeloNombre(e.target.value)}
          placeholder="Modelo"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="marcaNombre"
          value={marcaNombre}
          onChange={(e) => setMarcaNombre(e.target.value)}
          placeholder="Marca"
          required
          className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    </div>
  );
};

export default VehiculoForm;
