"use client";
import { clientes } from "@/db/usuarios";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SearchIcon from '@mui/icons-material/Search';
import { IoIosArrowDown } from "react-icons/io";
import { useShipmentRegisterStore } from "@/stores/shipmentRegisterStore";
import { useEffect, useState } from "react";
import { calcularPrecioEnvio } from "@/utils/utils";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";
import { EnviosService } from "@/services/envios.service";
import axios from 'axios';
import { DomiciliosService } from "@/services/domicilios.service";
import { LoadingFindDriver } from "@/components/client/loading-find-driver/LoadingFindDriver";
import { ConfirmFindDriver } from "@/components/client/confirm-find-driver/ConfirmFindDriver";

import { toast } from 'react-toastify';
import { ShipmentCreatedConfirmation } from "@/components/client/shipment-created-confirmation/ShipmentCreatedConfirmation";

interface ShipmentRegisterLayoutProps {
	children: React.ReactNode;
}

export default function ShipmentRegisterLayout({ children }: ShipmentRegisterLayoutProps) {
	const user = clientes[0];
	const shipment = useShipmentRegisterStore((state) => state.shipment);
	const setShipment = useShipmentRegisterStore((state) => state.setShipment);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);
	const [loading, setLoading] = useState<boolean>(false)
	const [cancelSource, setCancelSource] = useState(axios.CancelToken.source());
	const [isCreated, setIsCreated] = useState(false);
	const [nroSeguimiento, setNroSeguimiento] = useState<number>(0);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [intentos, setIntentos] = useState(0);

	useEffect(() => {
		//TODO: Cambiar el id del cliente por el id del cliente logueado
		DomiciliosService.getDomicilioByClienteId("").then((userDomicilio) => {
			if (!userDomicilio) return;
			const origenCliente = {
				calle: userDomicilio.calle,
				numero: userDomicilio.numero,
				piso: userDomicilio.piso,
				depto: userDomicilio.depto,
				descripcion: userDomicilio.descripcion,
				localidadID: userDomicilio.localidadID,
			};
			setShipment({
				...shipment,
				cliente: "123e4567-e89b-12d3-a456-426614174000",
				origen: origenCliente,
			});
		});
		LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
	}, []);

	const handleChange = (key: string, value: any) => {
		setShipment({
			...shipment,
			origen: {
				...shipment.origen,
				[key]: value ? value : null,
			},
		});
	};

	const isFormCompleted = () => {
		if (
			!shipment.descripcion ||
			!shipment.fecha ||
			!shipment.hora ||
			!shipment.pesoGramos ||
			!shipment.destino.calle ||
			!shipment.destino.numero ||
			!shipment.destino.localidadID ||
			!shipment.cliente ||
			shipment.reserva === null ||
			shipment.hora === "Invalid Date"
		) {
			return false;
		}
		return true;
	};

	const onIntento = (intentos: number) => {
		setIntentos(intentos);
		if (intentos === 10){
			setIntentos(0);
		}
	}

	const handleSaveShipment = () => {
		setLoading(true);
		EnviosService.create(shipment, cancelSource, onIntento)
		.then((data) => {
			if (data.nroSeguimiento){
				setLoading(false);
				setIsConfirmed(true);
				setNroSeguimiento(data.nroSeguimiento);
				// Delay para mostrar la pantalla de éxito, mientras se ejecuta la animación
				setTimeout(() => {
					setIsCreated(true); 
					setIsConfirmed(false);
				}, 3000);
			}
		})
		.catch((error) => {
			toast.error(error.message);
		})
		.finally(() => {
			setLoading(false);
		})
	}

	const handleCancelar = () => {
        cancelSource.cancel(); // Cancela la operación
        setCancelSource(axios.CancelToken.source()); // Reinicia el token de cancelación para futuras solicitudes
		setLoading(false);
    };

	const handleGoBack = () => {
		setIsCreated(false);
		setNroSeguimiento(0);
		// Se reinician los valores del formulario
		setShipment({
			...shipment,
			descripcion: "",
			pesoGramos: 0,
			destino: {
				calle: "",
				numero: 0,
				piso: null,
				depto: null,
				descripcion: null,
				localidadID: 0,
			},
			reserva: null,
			fecha: "",
			hora: "",
		});
	}	

	if (loading) return <LoadingFindDriver handleCancelar={handleCancelar} intentos={intentos} />;

	if (isConfirmed) return <ConfirmFindDriver/>;

	if (isCreated) return <ShipmentCreatedConfirmation nroSeguimiento={nroSeguimiento} handleGoBack={handleGoBack} />;
	
	return (
		<div className='py-10 max-w-screen-xl 2xl:max-w-screen-2xl px-4 md:px-10 flex flex-col justify-center w-full m-auto'>
			<h1 className='text-3xl font-semibold mb-8 max-w-screen-2xl'>Realiza tu envio</h1>
			<div className='grid md:grid-cols-2 gap-6 max-w-screen-2xl'>
				{children}
				<div>
					<div className='rounded-md h-full flex flex-col'>
						<p className='font-medium text-gray-50 text-xl px-8 py-4 rounded-t-md bg-primary'>
							Resumen
						</p>
						<div className='bg-white shadow-lg space-y-10 px-8 py-6 flex-1 rounded-b-md'>
							<Accordion>
								<AccordionSummary
									expandIcon={<IoIosArrowDown className='text-xl' />}
									aria-controls='panel1-content'
									id='panel1-header'
									className='font-medium'>
									Origen
								</AccordionSummary>
								<AccordionDetails className='flex flex-col gap-8'>
									<FormControl>
										<InputLabel htmlFor='calle' shrink={true}>Calle</InputLabel>
										<Input
											id='calle'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Calle'
											defaultValue={shipment.origen.calle}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='numero' shrink={true}>Número</InputLabel>
										<Input
											id='numero'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Número'
											defaultValue={shipment.origen.numero}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='depto' shrink={true}>Departamento (opcional)</InputLabel>
										<Input
											id='depto'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='depto'
											defaultValue={shipment.origen.depto}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='piso' shrink={true}>Piso (opcional)</InputLabel>
										<Input
											id='piso'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Piso'
											defaultValue={shipment.origen.piso}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='descripcion' shrink={true}>Descripción (opcional)</InputLabel>
										<Input
											id='descripcion'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Descripción (opcional)'
											defaultValue={shipment.origen.descripcion}
										/>
									</FormControl>
									<FormControl>
										<Stack spacing={2} sx={{ width: 300 }}>
											<Autocomplete
												freeSolo
												options={localidades.map(
													(option) => `${option.nombre} - ${option.provincia.nombre}`
												)} // Identificador unico
												onChange={(e, value) => {
													const localidad = localidades.find(
														(l) => `${l.nombre} - ${l.provincia.nombre}` === value
													) as Localidad;
													const valueVerification = localidad ? localidad.id : null;

													handleChange("localidadID", valueVerification);
												}}
												value={
													(localidades.find((l) => l.id === shipment.origen.localidadID)?.nombre ||
														"") +
													(localidades.find((l) => l.id === shipment.origen.localidadID)?.provincia
														.nombre
														? " - " +
															localidades.find((l) => l.id === shipment.origen.localidadID)
																?.provincia.nombre
														: "")
												}
												defaultValue={
													(localidades.find((l) => l.id === shipment.origen.localidadID)?.nombre ||
														"") +
													(localidades.find((l) => l.id === shipment.origen.localidadID)?.provincia
														.nombre
														? " - " +
															localidades.find((l) => l.id === shipment.origen.localidadID)
																?.provincia.nombre
														: "")
												}
												renderInput={(params) => (
													<TextField
														key={shipment.origen.localidadID}
														{...params}
														label='Buscar localidad'
														slotProps={{
															input: {
																...params.InputProps,
																type: "search",
																endAdornment: <SearchIcon />,
															},
														}}
													/>
												)}
											/>
										</Stack>
									</FormControl>
								</AccordionDetails>
							</Accordion>
							<div className='flex flex-col gap-3 mt-6'>
								<p className='text-lg font-medium'>Nombre y apellido</p>
								<p className='text-gray-500'>
									{user.nombre} {user.apellido}
								</p>
							</div>
							<div className='flex flex-col gap-3'>
								<p className='text-lg font-medium'>Email</p>
								<p className='text-gray-500'>{user.email}</p>
							</div>
							<div className='flex gap-3 mt-6 items-center text-lg'>
								<p className='font-medium'>Precio: </p>
								<span>${calcularPrecioEnvio(shipment.pesoGramos) || null}</span>
							</div>
						</div>
						<div className='pt-4 flex justify-end'>
							<Button onClick={handleSaveShipment} variant='contained' disabled={!isFormCompleted()}>
								Realizar envio
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
