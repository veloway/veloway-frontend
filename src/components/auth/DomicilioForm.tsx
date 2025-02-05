import { TextField, CircularProgress, Stack, Autocomplete, FormControl } from "@mui/material";
import { Localidad } from "@/entities/localidad";
import { useRegistroStore } from "@/stores/userRegisterStore";
import { useState } from "react";

interface DomicilioFormProps {
	localidades: Localidad[];
}

const DomicilioForm = ({ localidades }: DomicilioFormProps) => {
	const { addressValues, setAddressValues } = useRegistroStore();
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({
		calle: false,
		numero: false,
		localidadID: false,
	});

	// Función para manejar cambios en campos de texto
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "calle" && value.trim() === "") {
			setErrors((prev) => ({ ...prev, calle: true }));
		} else if (name === "numero" && value.trim() === "") {
			setErrors((prev) => ({ ...prev, numero: true }));
		} else {
			setErrors((prev) => ({ ...prev, [name]: false }));
		}

		setAddressValues({ [name]: name === "numero" ? Number(value) : value });
		// console.log( addressValues)
	};

	// Función para manejar el cambio de la localidad
	const handleLocalidadChange = (event: any, value: string | null) => {
		const localidadSeleccionada = localidades.find(
			(localidad) => `${localidad.nombre} - ${localidad.provincia.nombre}` === value
		);
		setAddressValues({ localidadID: localidadSeleccionada ? localidadSeleccionada.id : null });
		// console.log(addressValues)

		if (!localidadSeleccionada) {
			setErrors((prev) => ({ ...prev, localidadID: true }));
		} else {
			setErrors((prev) => ({ ...prev, localidadID: false }));
		}
	};

	return (
		<Stack spacing={2} sx={{ width: 400 }}>
			<TextField
				label='Calle'
				name='calle'
				defaultValue={addressValues.calle}
				onChange={handleInputChange}
				required
				error={errors.calle}
				helperText={errors.calle ? "La calle es requerida" : ""}
			/>
			<TextField
				label='Número'
				name='numero'
				type='number'
				defaultValue={addressValues.numero === 0 ? "" : addressValues.numero}
				onChange={handleInputChange}
				required
				error={errors.numero}
				helperText={errors.numero ? "El número es requerido" : ""}
			/>
			<TextField
				label='Descripción'
				name='descripcion'
				defaultValue={addressValues.descripcion || ""}
				onChange={handleInputChange}
			/>
			<TextField
				label='Piso'
				name='piso'
				type='number'
				defaultValue={addressValues.piso === 0 ? "" : addressValues.piso}
				onChange={handleInputChange}
				helperText="Opcional, solo números"
			/>
			<TextField
				label='Depto'
				name='depto'
				defaultValue={addressValues.depto || ""}
				onChange={handleInputChange}
			/>

			<FormControl>
				<Autocomplete
					options={localidades.map((option) => `${option.nombre} - ${option.provincia.nombre}`)}
					onChange={handleLocalidadChange}
					value={
						localidades.find((l) => l.id === addressValues.localidadID)
							? `${localidades.find((l) => l.id === addressValues.localidadID)?.nombre} - ${localidades.find((l) => l.id === addressValues.localidadID)?.provincia.nombre
							}`
							: ""
					}
					renderInput={(params) => <TextField {...params} label='Localidad'
						error={errors.localidadID}
						helperText={errors.localidadID ? "Debe seleccionar una localidad" : ""} />}
				/>
			</FormControl>
		</Stack>
	);
};

export default DomicilioForm;
