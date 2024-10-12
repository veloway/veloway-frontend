import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Link from "next/link";

export default function ShipmentRegisterPage() {
	return (
		<div className='flex flex-col'>
			<p className='font-medium text-xl px-10 py-4 rounded-t-md bg-white border-b-2 border-b-gray-300'>
				Destino
			</p>
			<form className='bg-white shadow-lg rounded-b-md space-y-5 px-8 py-6 flex flex-col gap-4'>
				<FormControl>
					<InputLabel htmlFor='calle'>Calle</InputLabel>
					<Input id='calle' aria-describedby='Calle' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='numero'>Número</InputLabel>
					<Input id='numero' aria-describedby='Número' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='departamento'>Departamento</InputLabel>
					<Input id='departamento' aria-describedby='Departamento' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='piso'>Piso</InputLabel>
					<Input id='piso' aria-describedby='Piso' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='descripcion'>Descripción (opcional)</InputLabel>
					<Input id='descripcion' aria-describedby='Descripción (opcional)' />
				</FormControl>
			</form>
			<div className='flex justify-end'>
				<Button
					variant='contained'
					className='mt-4'
					href='/client/shipment-register/details'
					LinkComponent={Link}>
					Siguiente
				</Button>
			</div>
		</div>
	);
}
