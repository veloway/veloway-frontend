import { TextField, CircularProgress, Stack, Autocomplete, FormControl } from "@mui/material";
import { Localidad } from "@/entities/localidad";
import { useRegistroStore } from "@/stores/userRegisterStore";

interface DomicilioFormProps {
	localidades: Localidad[];
	loading: boolean;
	onBack: () => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DomicilioForm = ({ localidades, loading }: DomicilioFormProps) => {
	const { addressValues, setAddressValues } = useRegistroStore();

	// Función para manejar cambios en campos de texto
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "numero" || name === "piso") {
			setAddressValues({ [name]: Number(value) });
			return;
		}
		setAddressValues({ [name]: value });
	};

	// Función para manejar el cambio de la localidad
	const handleLocalidadChange = (event: any, value: string | null) => {
		const localidadSeleccionada = localidades.find(
			(localidad) => `${localidad.nombre} - ${localidad.provincia.nombre}` === value
		);
		setAddressValues({ localidadID: localidadSeleccionada ? localidadSeleccionada.id : null });
	};

	return (
		<Stack spacing={2} sx={{ width: 400 }}>
			<TextField
				label='Calle'
				name='calle'
				defaultValue={addressValues.calle}
				onChange={handleInputChange}
				required
			/>
			<TextField
				label='Número'
				name='numero'
				type='number'
				defaultValue={addressValues.numero === 0 ? "" : addressValues.numero}
				onChange={handleInputChange}
				required
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
			/>
			<TextField
				label='Depto'
				name='depto'
				defaultValue={addressValues.depto || ""}
				onChange={handleInputChange}
			/>

			<FormControl>
				<Autocomplete
					freeSolo
					options={localidades.map((option) => `${option.nombre} - ${option.provincia.nombre}`)}
					onChange={handleLocalidadChange}
					value={
						localidades.find((l) => l.id === addressValues.localidadID)
							? `${localidades.find((l) => l.id === addressValues.localidadID)?.nombre} - ${
									localidades.find((l) => l.id === addressValues.localidadID)?.provincia.nombre
								}`
							: ""
					}
					renderInput={(params) => <TextField {...params} label='Localidad' />}
				/>
			</FormControl>

			{loading ? (
                <div className="flex justify-center">
                    <CircularProgress/>
                </div>
			) : (
				<button
					type='submit'
					className='w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200'>
					Finalizar Registro
				</button>
			)}
		</Stack>
	);
};

export default DomicilioForm;
