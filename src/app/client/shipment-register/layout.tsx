"use client";
import { clientes, domicilios } from "@/db/usuarios";
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
import { Autocomplete, CircularProgress, Stack, TextField } from "@mui/material";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";
import { EnviosService } from "@/services/envios.service";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

interface ShipmentRegisterLayoutProps {
	children: React.ReactNode;
}

export default function ShipmentRegisterLayout({ children }: ShipmentRegisterLayoutProps) {
	const user = clientes[0];
	const userDomicilio = domicilios.find((d) => d.idDomicilio === user.idDomicilio);
	const shipment = useShipmentRegisterStore((state) => state.shipment);
	const setShipment = useShipmentRegisterStore((state) => state.setShipment);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);
	const [loading, setLoading] = useState<boolean>(false)
	const [cancelSource, setCancelSource] = useState(axios.CancelToken.source());
	const [isCreated, setIsCreated] = useState(false);
	const [nroSeguimiento, setNroSeguimiento] = useState<number>(0);
	const [isConfirmed, setIsConfirmed] = useState(false);

	const handleShipment = () => {
		if (!userDomicilio) return;
		const origenCliente = {
			calle: userDomicilio?.calle,
			numero: userDomicilio?.numero,
			piso: userDomicilio?.piso,
			depto: userDomicilio?.depto,
			descripcion: userDomicilio?.descripcion,
			localidadID: 5,
		};
		setShipment({
			...shipment,
			cliente: "123e4567-e89b-12d3-a456-426614174000",
			origen: origenCliente,
		});
	};

	useEffect(() => {
		handleShipment();
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

	const handleSaveShipment = () => {
		setLoading(true);
		toast.promise(
			EnviosService.create(shipment, cancelSource)
			.then((data) => {
				if (data.message) {
					toast.error(data.message);
				}
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
			.finally(() => {
				setLoading(false);
			}),{ 
				loading: 'Realizando envío...',
			}
		)
		
	}

	const handleCancelar = () => {
        cancelSource.cancel(); // Cancela la operación
        setCancelSource(axios.CancelToken.source()); // Reinicia el token de cancelación para futuras solicitudes
		setLoading(false);
    };

	const handleGoBack = () => {
		setIsCreated(false);
		setNroSeguimiento(0);
	}	

	if (loading){
		return (
		  <div className="flex justify-center items-center h-full w-full">
			<div className="flex flex-col gap-10">
				<picture className="flex justify-center">
					<img src="/gifs/buscar-conductor.gif" className={`rounded-md w-[50%] ${loading ? "opacity-100" : "opacity-0 transition-opacity delay-500 ease-linear"}`} alt="" />
				</picture>
				<div className="flex flex-col items-center gap-4">
					<p className="text-xl font-semibold">Buscando conductores disponibles...</p>
					<CircularProgress />
				</div>
				<div className="flex justify-center">
					<Button
					onClick={handleCancelar}
					variant="contained"
					color="primary"
					>
					Cancelar
					</Button>
				</div>
			</div>
		  </div>
		);
	}


	if (isConfirmed) {
		return (
			<div className="relative flex justify-center items-center h-screen w-full overflow-hidden">
				<div className="flex flex-col items-center gap-4 z-10">
					<div className={`relative w-16 h-16 rounded-full bg-green-500 transition-transform duration-500`}>
						<svg
							className={`absolute inset-0 w-10 h-10 m-auto text-white transition-opacity duration-500`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={3}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<p className={"text-xl font-semibold"}>
						Conductor encontrado
					</p>
				</div>
		  	</div>
		);
	}

	if (isCreated) {
		return (
			<div className="flex justify-center items-center h-full w-full">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col items-center gap-4">
						<p className="text-xl font-semibold">Envío realizado con éxito</p>
						<p>Nro. de seguimiento: {nroSeguimiento}</p>
						<Button variant="contained" LinkComponent={Link} href="/client/dashboard" onClick={handleGoBack}>
							Volver al Inicio
						</Button>
					</div>
				</div>
			</div>
		);
	}
	

	return (
		<div className='py-16 w-full'>
			<h1 className='text-3xl font-semibold mb-8'>Realiza tu envio</h1>
			<div className='grid md:grid-cols-2 gap-6'>
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
										<InputLabel htmlFor='calle'>Calle</InputLabel>
										<Input
											id='calle'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Calle'
											defaultValue={userDomicilio?.calle}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='numero'>Número</InputLabel>
										<Input
											id='numero'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Número'
											defaultValue={userDomicilio?.numero}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='depto'>Departamento</InputLabel>
										<Input
											id='depto'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='depto'
											defaultValue={userDomicilio?.depto}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='piso'>Piso</InputLabel>
										<Input
											id='piso'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Piso'
											defaultValue={userDomicilio?.piso}
										/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='descripcion'>Descripción (opcional)</InputLabel>
										<Input
											id='descripcion'
											onChange={(e) => handleChange(e.target.id, e.target.value)}
											aria-describedby='Descripción (opcional)'
											defaultValue={userDomicilio?.descripcion}
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
			<Toaster containerStyle={{zIndex: 99999999}} toastOptions={{
				style: {
					borderRadius: '4px',
				},
				duration: 5000,
				removeDelay: 400,
			}}/>
		</div>
	)
}
