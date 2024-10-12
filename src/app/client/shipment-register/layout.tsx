import { clientes, domicilios } from "@/db/usuarios";
import {
	Input,
	FormControl,
	InputLabel,
	Button,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";

import { IoIosArrowDown } from "react-icons/io";
interface ShipmentRegisterLayoutProps {
	children: React.ReactNode;
}

export default function ShipmentRegisterLayout({ children }: ShipmentRegisterLayoutProps) {
	const user = clientes[0];
    const userDomicilio = domicilios.find(d => d.idDomicilio === user.idDomicilio);
    
	return (
		<div className='py-16 w-full'>
			<Typography variant='h1' className='text-3xl font-semibold mb-8'>
				Realiza tu envio
			</Typography>
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
										<Input id='calle' aria-describedby='Calle' value={userDomicilio?.calle}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='numero'>Número</InputLabel>
										<Input id='numero' aria-describedby='Número' value={userDomicilio?.numero}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='departamento'>Departamento</InputLabel>
										<Input id='departamento' aria-describedby='Departamento' value={userDomicilio?.depto}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='piso'>Piso</InputLabel>
										<Input id='piso' aria-describedby='Piso' value={userDomicilio?.piso}/>
									</FormControl>
									<FormControl>
										<InputLabel htmlFor='descripcion'>Descripción (opcional)</InputLabel>
										<Input id='descripcion' aria-describedby='Descripción (opcional)' value={userDomicilio?.descripcion}/>
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
                            <Button variant='contained' disabled={true}>Realizar envio</Button>
                        </div>
					</div>

				</div>
			</div>
		</div>
	);
}
