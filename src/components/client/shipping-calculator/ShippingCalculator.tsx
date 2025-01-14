"use client";

import { calcularPrecioEnvio } from "@/utils/utils";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

export default function ShippingCalculator() {
	const [weight, setWeight] = useState<number>();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = (): void => {
		if (inputRef.current && inputRef.current.value) {
			const peso = Number(inputRef.current.value);
			setWeight(calcularPrecioEnvio(peso));
		}
	};

	return (
		<div className='bg-white py-5 px-9 rounded-md text-tertiary flex flex-col gap-5 xl:min-w-[350px] shadow-md w-full xl:w-auto'>
			<h2 className='text-xl font-medium'>Calculadora de envíos</h2>
			<div className='flex flex-col gap-2'>
				<TextField
					id="outlined-basic"
					inputRef={inputRef}
					label="Peso paquete (kg)"
					variant="filled"
					className="rounded-t-md bg-secondary"
					type="number"
				/>
			</div>
			<Button variant='contained' onClick={handleClick}>Calcular precio</Button>
			<p className="text-lg">Precio: ${weight}</p>
		</div>
	);
}
