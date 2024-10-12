"use client";

import ContainerFlex from "@/components/ui/container-flex/ContainerFlex";
import SinViaje from "@/components/driver/sinViaje/SinViaje";
import { ParsedUrlQuery } from "querystring";
import { Button, Pagination } from "@mui/material";
import { TableComponent } from "@/components/ui";
import { dataViajes } from "@/db/viajes";
import { clientes } from "@/db/usuarios";
import { dataEnviosTabla } from "@/db/envios";
import { useEffect, useState } from "react";
import ReservationsTable from "@/components/driver/reservationsTable/ReservationsTable";
import Link from "next/link";

interface driverPageProp {
	params: ParsedUrlQuery;
}
interface Viaje {
	id: number;
	origen: string;
	destino: string;
	estado: string;
	fecha: string;
	reserva: boolean;
	dni: number;
}

export default function DriverHomePage({ params }: driverPageProp) {
	const [viajeActual, setViajeActual] = useState<Viaje | null>(null);
	const columns = ["Numero", "Origen", "Destino", "Fecha", "Monto"];
    const columnsReservations = ["Origen", "Destino", "Fecha"] 

	const user = clientes.find((c) => (c.dni = 43897801));
	const envios = dataEnviosTabla.filter((e) => e.dni === user?.dni);
    const userReservations = envios.filter((e) => e.reserva === true); 

	useEffect(() => {
		const currentTravel = envios.find((e) => e.reserva === false);
		if (currentTravel) {
			setViajeActual(currentTravel);
		}
	});

	return (
		<div className='py-20'>
			<section className="flex justify-center gap-14 mt-16">
				{viajeActual ? (
					<ContainerFlex>
						<div className='rounded-md h-full flex flex-col w-[500px]'>
							<p className='font-medium text-gray-50 text-xl px-8 py-4 rounded-t-md bg-primary'>
								Viaje Actual
							</p>
							<div className='bg-white shadow-lg space-y-5 px-8 py-6 flex-1 rounded-b-md'>
								<div className='flex flex-col gap-1'>
									<p className='text-lg font-medium'>Origen</p>
									<p className='text-gray-500'>{viajeActual.origen}</p>
								</div>
								<div className='flex flex-col gap-1'>
									<p className='text-lg font-medium'>Destino</p>
									<p className='text-gray-500'>{viajeActual.destino}</p>
								</div>
								<Button variant='contained' LinkComponent={Link} href="/driver/requestTravel" >ver viaje actual</Button>
							</div>
						</div>
					</ContainerFlex>
				) : (
					<SinViaje />
				)}

                <div className='rounded-md h-full flex flex-col w-[500px]'>
                    <p className='font-medium text-gray-50 text-xl px-8 py-4 rounded-t-md bg-primary'>
                        Reservas
                    </p>
                    <div className='bg-white shadow-lg space-y-5 pb-6 flex-1 rounded-b-md'>
						<ReservationsTable columns={columnsReservations} className="rounded-none shadow-none"/>
                    </div>
                </div>
            </section>
			<section>
				<TableComponent columns={columns} title='Historial de Viajes' className=' mr-28 ml-28'>
					{dataViajes.map((data) => (
						<tr key={data.nro}>
							<td className='py-2 px-4 text-center'>{data.nro}</td>
							<td className='py-2 px-4 text-center'>{data.origen}</td>
							<td className='py-2 px-4 text-center'>{data.destino}</td>
							<td className='py-2 px-4 text-center'>{data.fecha}</td>
							<td className='py-2 px-4 text-center'>{data.monto}</td>
						</tr>
					))}
				</TableComponent>
				<div className='flex justify-center'>
					<Pagination count={8} color='primary' />
				</div>
			</section>
		</div>
	);
}
