"use client";
import { useShipmentRegisterStore } from "@/stores/shipmentRegisterStore";
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
import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const enum ShipmentType {
	Now = "ahora",
	Reservation = "reserva",
}

export default function DetailsPage() {
	const [isReservation, setIsReservation] = useState<ShipmentType>();
	const [timeReservation, setTimeReservation] = useState<boolean>(false);
	const shipment = useShipmentRegisterStore((state) => state.shipment);
	const setShipment = useShipmentRegisterStore((state) => state.setShipment);
	const [fechaActual] = useState(dayjs().format("DD-MM-YYYY"));
	const [horarioActual] = useState(dayjs().format("HH:mm"));

	const isInTime = (hora: number): boolean => {
		if (hora < 8 || hora >= 18) {
			return false;
		}
		return true;
	};

	const radioHandler = (shipmentType: ShipmentType) => {
		setIsReservation(shipmentType);

		if (shipmentType === ShipmentType.Reservation) {
			setShipment({ ...shipment, reserva: true, fecha: fechaActual });
			const hora = Number(shipment.hora.split(":")[0]);
			if (hora < 8 || hora > 18) {
				setShipment({ ...shipment, hora: "", reserva: true, fecha: fechaActual });
			}
			return;
		}
		setShipment({ ...shipment, fecha: fechaActual, hora: horarioActual, reserva: false });
	};

	useEffect(() => {
		if (isReservation === ShipmentType.Reservation) {
			const date = new Date();
			if (date.getHours() < 8 || date.getHours() >= 18) {
				setTimeReservation(true);
			}
		}
		setIsReservation(shipment.reserva ? ShipmentType.Reservation : ShipmentType.Now);
	}, [timeReservation, isReservation]);

	const handleHorario = (horario: dayjs.Dayjs | null) => {
		if (horario) {
			if (!isInTime(horario.hour())) {
				setShipment({ ...shipment, reserva: true, hora: "" });
				return;
			}
			setShipment({ ...shipment, reserva: true, hora: horario.format("HH:mm") });
		}
	};

	return (
		<div className='flex flex-col'>
			<p className='font-medium text-xl px-10 py-4 rounded-t-md bg-white border-b-2 border-b-gray-300'>
				Detalles del envio
			</p>
			<form className='bg-white shadow-lg rounded-b-md space-y-5 px-8 py-6 flex flex-col gap-4 flex-1'>
				<FormControl>
					<InputLabel htmlFor='peso'>Peso (gramos)</InputLabel>
					<Input
						id='peso'
						aria-describedby='peso'
						type='number'
						onChange={(e) => setShipment({ ...shipment, pesoGramos: parseInt(e.target.value) })}
						defaultValue={shipment.pesoGramos === 0 ? null : shipment.pesoGramos}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='descripcion'>Descripción del contenido</InputLabel>
					<Input
						id='descripcion'
						aria-describedby='descripcion'
						onChange={(e) => setShipment({ ...shipment, descripcion: e.target.value })}
						defaultValue={shipment.descripcion}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>¿Cuándo quiere realizar el envío?</FormLabel>
					{!isInTime(dayjs().hour()) ? (
						<p className='text-red-500 mb-2 mt-2 '>No se puede realizar un envío en este horario</p>
					) : null}
					<RadioGroup
						row
						onChange={(e) => radioHandler(e.target.value as ShipmentType)}
						defaultValue={() => {
							if (shipment.reserva === true) {
								return ShipmentType.Reservation;
							}
							if (shipment.reserva === false) {
								return ShipmentType.Now;
							}
						}}
						className="text-gray-800"
						>
						<FormControlLabel
							value='ahora'
							control={<Radio />}
							disabled={!isInTime(dayjs().hour())}
							label='Ahora'
						/>
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
								className='max-w-full'
								label='Elija un horario'
								ampm={false}
								minTime={dayjs().set("hour", 8).set("minute", 0)}
								maxTime={dayjs().set("hour", 17).set("minute", 59)}
								onChange={(e) => handleHorario(e)}
								defaultValue={dayjs(shipment.hora, "HH:mm")}
								slotProps={{
									textField:{
										error: false,
									}
								}}
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
