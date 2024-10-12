import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Link from "next/link";

export default function PackagePage() {
	return (
		<div className='flex flex-col'>
			<p className='font-medium text-xl px-10 py-4 rounded-t-md bg-white border-b-2 border-b-gray-300'>
				Paquete
			</p>
			<form className='bg-white shadow-lg rounded-b-md space-y-5 px-8 py-6 flex flex-col gap-4 flex-1'>
				<FormControl>
					<InputLabel htmlFor='calle'>Peso (gramos)</InputLabel>
					<Input id='calle' aria-describedby='Calle' type="number" />
				</FormControl>
        <FormControl>
					<InputLabel htmlFor='calle'>Detalles del contenido</InputLabel>
					<Input id='calle' aria-describedby='Calle' />
				</FormControl>
			</form>
			<div className='flex justify-between'>
      <Button variant='contained' className='mt-4' href="/client/shipment-register" LinkComponent={Link}>
					Anterior
				</Button>
				<Button variant='contained' className='mt-4' href="/client/shipment-register/package" LinkComponent={Link}>
					Siguiente
				</Button>
			</div>
		</div>
	);
}
