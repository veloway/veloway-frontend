"use client";
import {
	FormControl,
	InputLabel,
	Input,
	Button,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from "@mui/material";
import { DesktopTimePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const enum ShipmentType {
	Now = "ahora",
	Reservation = "reserva",
}

export default function DetailsPage() {
	const [isReservation, setIsReservation] = useState<ShipmentType>(ShipmentType.Now);
	const [timeReservation, setTimeReservation] = useState<boolean>(false);

	const radioHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setIsReservation(e.target.value as ShipmentType);
	};

	useEffect(() => {
		if (isReservation === ShipmentType.Reservation) {
			const date = new Date();
			console.log(date.getHours());
			if (date.getHours() < 8 || date.getHours() >= 18) {
				setTimeReservation(true);
			}
		}
	}, [timeReservation, isReservation]);

	return (
		<div className='flex flex-col'>
			<p className='font-medium text-xl px-10 py-4 rounded-t-md bg-white border-b-2 border-b-gray-300'>
				Detalles del envio
			</p>
			<form className='bg-white shadow-lg rounded-b-md space-y-5 px-8 py-6 flex flex-col gap-4 flex-1'>
				<FormControl>
					<InputLabel htmlFor='calle'>Peso (gramos)</InputLabel>
					<Input id='calle' aria-describedby='Calle' type='number' />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='calle'>Descripción del contenido</InputLabel>
					<Input id='calle' aria-describedby='Calle' />
				</FormControl>
				<FormControl>
					<FormLabel>¿Cuándo quiere realizar el envío?</FormLabel>
					<RadioGroup row onChange={radioHandler}>
						<FormControlLabel value='ahora' control={<Radio />} label='Ahora' />
						<FormControlLabel value='reserva' control={<Radio />} label='Reservar' />
					</RadioGroup>
				</FormControl>

				{isReservation === ShipmentType.Reservation && (
					<div className='flex flex-col gap-3'>
						<FormLabel>
							Solo se pueden programar envíos entre las 8:00 y las 18:00 del mismo día.
						</FormLabel>
						{timeReservation && (
							<p className='text-red-500 mb-2'>
								El envío se pasará para mañana {dayjs().add(1, "day").format("DD/MM/YYYY")}
							</p>
						)}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DesktopTimePicker
								className='max-w-'
								label='Elija un horario'
								ampm={false}
								minTime={dayjs().set("hour", 8)}
								maxTime={dayjs().set("hour", 18)}
							/>
						</LocalizationProvider>
					</div>
				)}
			</form>
			<div className='flex justify-between'>
				<Button
					variant='contained'
					className='mt-4'
					href='/client/shipment-register'
					LinkComponent={Link}>
					Anterior
				</Button>
			</div>
		</div>
	);
}
