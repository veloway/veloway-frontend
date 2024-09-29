"use client";

import { useRef, useState } from "react";

export default function ShippingCalculator() {
	const [weight, setWeight] = useState<number>();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = (): void => {
		if (inputRef.current && inputRef.current.value) {
			setWeight(Number(inputRef.current.value) * 100);
		}
	};
	return (
		<div className='bg-primary py-5 px-9 rounded-md text-secondary flex flex-col gap-5 min-w-[350px] shadow-md shadow-neutral-400'>
			<h2 className='text-2xl'>Calculadora de envíos</h2>
			<div className='flex flex-col gap-2'>
				<label htmlFor='' className='text-xs'>
					Peso paquete (kg)
				</label>
				<input ref={inputRef} className='p-1 rounded-md text-tertiary' type='number' />
			</div>
			<button onClick={handleClick} className='bg-secondary text-tertiary rounded-md p-1'>
				Calcular precio
			</button>
			<p>Precio: {weight}</p>
		</div>
	);
}
