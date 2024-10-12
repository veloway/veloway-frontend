"use client";


import { Button, Input, InputLabel, TextField } from "@mui/material";
import { useRef, useState } from "react";

const PRECIO_POR_PESO = 100;

export default function ShippingCalculator() {
	const [weight, setWeight] = useState<number>();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = (): void => {
	
		//
		if (inputRef.current && inputRef.current.value) {
			console.log(inputRef.current.value);
			setWeight(Number(inputRef.current.value) * PRECIO_POR_PESO);
		}
	};
	return (
		<div className='bg-white py-5 px-9 rounded-md text-tertiary flex flex-col gap-5 xl:min-w-[350px] shadow-md w-full xl:w-auto'>
			<h2 className='text-xl font-medium'>Calculadora de envíos</h2>
			<div className='flex flex-col gap-2'>
				{/* <label htmlFor='' className='text-sm'>
					Peso paquete (kg)
				</label>
				<input ref={inputRef} className='px-3 py-2 rounded-md text-tertiary' type='number' /> */}
				<TextField id="outlined-basic" ref={inputRef} label="Peso paquete (kg)" variant="filled" className="rounded-t-md bg-secondary"/>
			</div>
			<Button variant='contained' onClick={handleClick}>Calcular precio</Button>
			<p className="text-lg">Precio: ${weight}</p>
		</div>
	);
}
