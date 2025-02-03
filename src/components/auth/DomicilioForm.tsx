import React, { Fragment } from 'react';
import { TextField, Button, Stack, Autocomplete, FormControl } from '@mui/material';
import { Localidad } from '@/entities/localidad';
import { useRegistroStore } from '@/stores/userRegisterStore';

interface DomicilioFormProps {

    localidades: Localidad[];
    onBack: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DomicilioForm = ({ localidades }: DomicilioFormProps) => {

    const { addressValues, setAddressValues } = useRegistroStore();

    // Función para manejar cambios en campos de texto
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressValues({ [name]: value });
    };

    // Función para manejar el cambio de la localidad
    const handleLocalidadChange = (event: any, value: string | null) => {
        const localidadSeleccionada = localidades.find(
            (l) => `${l.nombre} - ${l.provincia.nombre}` === value
        );
        setAddressValues({ localidadID: localidadSeleccionada ? localidadSeleccionada.id : null });
    };

    return (

        <Stack spacing={2} sx={{ width: 400 }}>
            <TextField label="Calle" name="calle" value={addressValues.calle} onChange={handleInputChange} required />
            <TextField label="Número" name="numero" value={addressValues.numero} onChange={handleInputChange} required />
            <TextField label="Descripción" name="descripcion" value={addressValues.descripcion} onChange={handleInputChange} />
            <TextField label="Piso" name="piso" type="number" value={addressValues.piso || ''} onChange={handleInputChange} />
            <TextField label="Depto" name="depto" value={addressValues.depto} onChange={handleInputChange} />

            <FormControl>
                <Autocomplete
                    freeSolo
                    options={localidades.map((option) => `${option.nombre} - ${option.provincia.nombre}`)}
                    onChange= {handleLocalidadChange}
                    value={localidades.find((l) => l.id === addressValues.localidadID)
                        ? `${localidades.find((l) => l.id === addressValues.localidadID)?.nombre} - ${
                            localidades.find((l) => l.id === addressValues.localidadID)?.provincia.nombre
                          }`
                        : '' 
                    }
                    renderInput={(params) => <TextField {...params} label="Localidad" />}
                />
            </FormControl>

            <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
                Finalizar Registro
            </button>
        </Stack>

    );
};

export default DomicilioForm;
