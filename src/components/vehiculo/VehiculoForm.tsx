import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
  marginBottom: '20px',
}));

const VehiculoForm: React.FC<Props> = ({ addVehiculo, editIndex, vehiculos }) => {
  const [anio, setAnio] = useState<string | number>(''); 
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
    } else {
      delete errorMessages.documentoTitular;
    }

    if (!/^[a-zA-Z\s]+$/.test(titular)) {
      errors.titular = "El nombre del titular solo debe contener caracteres alfabéticos.";
    } else {
      delete errorMessages.titular; 
    }

    if (!anio || !color || !descripcion || !nomSeguro || !patente || !tipoVehiculo || !modeloNombre || !marcaNombre) {
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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600, margin: 'auto', mt: 4 }}>
      <StyledTitle> Registro de Vehículo </StyledTitle> 

      {errorMessages.generic && <div style={{ color: 'red' }}>{errorMessages.generic}</div>}

      <TextField
        label="Titular del Vehículo"
        value={titular}
        onChange={(e) => setTitular(e.target.value)}
        error={!!errorMessages.titular}
        helperText={errorMessages.titular}
        fullWidth
      />

      <TextField
        label="Documento del Titular"
        value={documentoTitular}
        onChange={(e) => setDocumentoTitular(e.target.value)}
        error={!!errorMessages.documentoTitular}
        helperText={errorMessages.documentoTitular}
        fullWidth
      />

      <TextField
        label=""
        select
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
        fullWidth
        SelectProps={{
          native: true,
        }}
      >
        <option value="">Seleccione un año</option>
        {[...Array(31)].map((_, index) => {
          const year = new Date().getFullYear() - index;
          return <option key={year} value={year}>{year}</option>;
        })}
      </TextField>

      <TextField
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        error={!!errorMessages.color}
        helperText={errorMessages.color}
        fullWidth
      />

      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        multiline
        rows={4}
      />

      <TextField
        label="Nombre del Seguro"
        value={nomSeguro}
        onChange={(e) => setNomSeguro(e.target.value)}
        fullWidth
      />

      <TextField
        label="Patente"
        value={patente}
        onChange={(e) => setPatente(e.target.value)}
        fullWidth
      />

      <TextField
        label="Tipo de Vehículo"
        value={tipoVehiculo}
        onChange={(e) => setTipoVehiculo(e.target.value)}
        fullWidth
      />

      <TextField
        label="Modelo"
        value={modeloNombre}
        onChange={(e) => setModeloNombre(e.target.value)}
        fullWidth
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Guardar Vehículo
        </Button>
      </Box>

    </Box>
  );
};

export default VehiculoForm;
