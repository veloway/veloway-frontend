"use client";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useShipmentRegisterStore } from "@/stores/shipmentRegisterStore";
import { Autocomplete, Select, Skeleton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";
import SearchIcon from '@mui/icons-material/Search';

export default function ShipmentRegisterPage() {
	const shipment = useShipmentRegisterStore((state) => state.shipment);
	const setShipment = useShipmentRegisterStore((state) => state.setShipment);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);

	useEffect(() => {
		LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
	}, []);

	const handleChange = (key: string, value: any) =>{
		setShipment({
			...shipment,
			destino: {
				...shipment.destino,
				[key]: value ? value : null
			}
		})
	}

	if (localidades.length === 0)
		return (
			<Stack spacing={2}>
				<Skeleton variant='rectangular' height={70} sx={{ borderRadius: "4px" }} />
				<Skeleton variant='rectangular' height={340} width='100%' sx={{ borderRadius: "4px" }} />
			</Stack>
		);
	return (
		<div className='flex flex-col'>
			<p className='font-medium text-xl px-10 py-4 rounded-t-md bg-white border-b-2 border-b-gray-300'>
				Destino
			</p>
			<form className='bg-white shadow-lg rounded-b-md space-y-5 px-8 py-6 flex flex-col gap-4'>
				<FormControl>
					<InputLabel htmlFor='calle'>Calle</InputLabel>
					<Input
						id='calle'
						defaultValue={shipment.destino.calle}
						aria-describedby='Calle'
						onChange={(e) => handleChange(e.target.id, e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='numero'>Número</InputLabel>
					<Input
						id='numero'
						type='number'
						defaultValue={shipment.destino.numero === 0 ? null : shipment.destino.numero}
						aria-describedby='Número'
						onChange={(e) => handleChange(e.target.id, parseInt(e.target.value))}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='departamento'>Departamento</InputLabel>
					<Input
						id='departamento'
						defaultValue={shipment.destino.depto}
						aria-describedby='Departamento'
						onChange={(e) => handleChange(e.target.id, e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='piso'>Piso</InputLabel>
					<Input
						id='piso'
						type='number'
						defaultValue={shipment.destino.piso}
						aria-describedby='Piso'
						onChange={(e) => handleChange(e.target.id, parseInt(e.target.value))}
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='descripcion'>Descripción (opcional)</InputLabel>
					<Input
						id='descripcion'
						defaultValue={shipment.destino.descripcion}
						aria-describedby='Descripción (opcional)'
						onChange={(e) => handleChange(e.target.id, e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<Stack spacing={2} sx={{ width: 300 }}>
						<Autocomplete
							freeSolo
							options={localidades.map((option) => `${option.nombre} - ${option.provincia.nombre}`)} // Identificador unico
							onChange={(e, value) => {
								const localidad = localidades.find(
									(l) => `${l.nombre} - ${l.provincia.nombre}` === value
								) as Localidad;
								const valueVerification = localidad ? localidad.id : null;

								handleChange('localidadID', valueVerification);
							}}
							value={
								(localidades.find((l) => l.id === shipment.destino.localidadID)?.nombre || "") +
								(localidades.find((l) => l.id === shipment.destino.localidadID)?.provincia.nombre
									? " - " +
										localidades.find((l) => l.id === shipment.destino.localidadID)?.provincia.nombre
									: "")
							}
							renderInput={(params) => (
								<TextField
									key={shipment.destino.localidadID}
									{...params}
									label="Buscar localidad"
									slotProps={{
										input: {
											...params.InputProps,
											type: "search",
											endAdornment: (
												<SearchIcon />
											)
										},
										
									}}
								/>
							)}
						/>
					</Stack>
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
