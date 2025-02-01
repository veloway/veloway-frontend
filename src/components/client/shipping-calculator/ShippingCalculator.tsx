"use client";

import { calcularPrecioEnvio } from "@/utils/utils";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

export default function ShippingCalculator() {
	const [weight, setWeight] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = (): void => {
		if (inputRef.current && inputRef.current.value) {
			const peso = Number(inputRef.current.value);
			setWeight(calcularPrecioEnvio(peso));
		}
	};

	return (
		<div className='bg-white py-5 px-9 rounded-md text-tertiary flex flex-col gap-5 xl:min-w-[350px] shadow-md w-full xl:w-auto min-h-[300px]'>
			<h3 className='text-xl leading-6 font-medium text-gray-900 flex items-center'>
				<svg
					className='h-5 w-5 mr-2 text-blue-500'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
					/>
				</svg>
				Calculadora de Envíos
			</h3>
			<div className='flex flex-col gap-2'>
				<TextField
					id='outlined-basic'
					inputRef={inputRef}
					label='Peso paquete (gramos)'
					variant='filled'
					className='rounded-t-md bg-secondary'
					type='number'
				/>
			</div>
			<Button variant='contained' onClick={handleClick}>
				Calcular precio
			</Button>
			<p className='text-lg font-medium'> {weight !== 0 && `Precio: $${weight}`}</p>
		</div>
	);
}
