'use client'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useShipmentRegisterStore } from "@/stores/shipmentRegisterStore";
import { Select, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";

export default function ShipmentRegisterPage() {

	const shipment = useShipmentRegisterStore(state => state.shipment);
	const setShipmet = useShipmentRegisterStore(state => state.setShipment);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);
	const [calle, setCalle] = useState(shipment.destino.calle);
	const [numero, setNumero] = useState(shipment.destino.numero);
	const [depto, setDepto] = useState(shipment.destino.depto);
	const [piso, setPiso] = useState(shipment.destino.piso);
	const [descripcion, setDescripcion] = useState(shipment.destino.descripcion);
	const [localidadID, setLocalidadID] = useState(shipment.destino.localidadID);

	useEffect(() => {
		LocalidadesService.getLocalidades().then(
			localidades => setLocalidades(localidades)
		)
		console.log(shipment)
	},[])

	const handleNext = () => {
		const destino = {
			calle: calle,
			numero: numero,
			depto: depto || null,
			piso: piso || null,
			descripcion: descripcion || null,
			localidadID: localidadID
		}
		setShipmet({
			...shipment,
			destino: destino,
			cliente: 'asdas-asdasd-asdasd-asdasd-asdass'
		})
		
	}
	if (localidades.length === 0) return (
		<Stack spacing={2}>
			<Skeleton variant="rectangular" height={70} sx={{borderRadius: '4px'}}/>
			<Skeleton variant="rectangular" height={340} width='100%' sx={{borderRadius: '4px'}}/>
		</Stack>
	)
	return (
		<div className='flex flex-col'>
			<p className='font-medium text-xl px-10 py-4 rounded-t-md bg-white border-b-2 border-b-gray-300'>
				Destino
			</p>
			<form className='bg-white shadow-lg rounded-b-md space-y-5 px-8 py-6 flex flex-col gap-4'>
				<FormControl>
					<InputLabel htmlFor='calle'>Calle</InputLabel>
					<Input id='calle' defaultValue={shipment.destino.calle} aria-describedby='Calle' onChange={(e) => setCalle(e.target.value)} />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='numero'>Número</InputLabel>
					<Input id='numero' defaultValue={shipment.destino.numero} aria-describedby='Número' onChange={(e) => setNumero(parseInt(e.target.value))} />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='departamento'>Departamento</InputLabel>
					<Input id='departamento'defaultValue={shipment.destino.depto} aria-describedby='Departamento' onChange={(e) => setDepto(e.target.value)} />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='piso'>Piso</InputLabel>
					<Input id='piso' defaultValue={shipment.destino.piso} aria-describedby='Piso' onChange={(e) => setPiso(parseInt(e.target.value))} />
				</FormControl>
				<FormControl>
					<InputLabel htmlFor='descripcion'>Descripción (opcional)</InputLabel>
					<Input id='descripcion' defaultValue={shipment.destino.descripcion} aria-describedby='Descripción (opcional)' onChange={(e) => setDescripcion(e.target.value)} />
				</FormControl>
				<FormControl>
					<Select
						native
						value={localidadID}
						placeholder="Localidad"
						title="Localidad"
						onChange={(e) => setLocalidadID(parseInt(e.target.value as string))}
					>
						{
							localidades.map((localidad) => (
								<option key={localidad.id} defaultValue={shipment.destino.localidadID} value={localidad.id}>{localidad.nombre} - {localidad.provincia.nombre}</option>
							))
						}
					</Select>
				</FormControl>
			</form>
			<div className='flex justify-end'>
				<Button
					variant='contained'
					className='mt-4'
					href='/client/shipment-register/details'
					onClick={handleNext}
					LinkComponent={Link}>	
					Siguiente
				</Button>
			</div>
		</div>
	);
}
