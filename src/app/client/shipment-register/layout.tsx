'use client';
import { clientes, domicilios } from "@/db/usuarios";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { IoIosArrowDown } from "react-icons/io";
import { useShipmentRegisterStore } from "@/stores/shipmentRegisterStore";
import { useEffect } from "react";
interface ShipmentRegisterLayoutProps {
	children: React.ReactNode;
}

export default function ShipmentRegisterLayout({ children }: ShipmentRegisterLayoutProps) {
	const user = clientes[0];
    const userDomicilio = domicilios.find(d => d.idDomicilio === user.idDomicilio);
	const shipment = useShipmentRegisterStore((state) => state.shipment);
	const setShipment = useShipmentRegisterStore((state) => state.setShipment);
	
	const handleShipment = () => {
		if (!userDomicilio) return;
		const origenCliente = {
			calle: userDomicilio?.calle,
			numero: userDomicilio?.numero,
			piso: userDomicilio?.piso,
			depto: userDomicilio?.depto,
			descripcion: userDomicilio?.descripcion,
			localidadID: 5
		}	
		setShipment({
			...shipment, 
			cliente: "asdas-asdasd-asdasd-asdasd-asdass",
			origen: origenCliente
		});
	}	

	useEffect(() => {
		handleShipment(); //TODO: ESTO LO HACE POR DEFECTO, IMPLEMENTAR MODFICACION DE ORIGEN EN EL FORMULARIO
	}, [])

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
			shipment.reserva === null
		) {
			return false;
		}
		return true;
	}

	return (
		<div className='py-16 w-full'>
			<h1 className='text-3xl font-semibold mb-8'>
				Realiza tu envio
			</h1>
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
										<Input id='calle' aria-describedby='Calle' defaultValue={userDomicilio?.calle}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='numero'>Número</InputLabel>
										<Input id='numero' aria-describedby='Número' defaultValue={userDomicilio?.numero}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='departamento'>Departamento</InputLabel>
										<Input id='departamento' aria-describedby='Departamento' defaultValue={userDomicilio?.depto}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='piso'>Piso</InputLabel>
										<Input id='piso' aria-describedby='Piso' defaultValue={userDomicilio?.piso}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='descripcion'>Descripción (opcional)</InputLabel>
										<Input id='descripcion' aria-describedby='Descripción (opcional)' defaultValue={userDomicilio?.descripcion}/>
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
                                <span>${250}</span>
                            </div>
						</div>
                        <div className='pt-4 flex justify-end'>
                            <Button variant='contained' disabled={!isFormCompleted()}>Realizar envio</Button>
                        </div>
					</div>

				</div>
			</div>
		</div>
	);
}
