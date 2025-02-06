"use client";

import ContainerFlex from "@/components/ui/container-flex/ContainerFlex";
import SinViaje from "@/components/driver/sinViaje/SinViaje";
import { ParsedUrlQuery } from "querystring";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { TableComponent } from "@/components/ui";
import { useEffect, useState } from "react";
import ReservationsTable from "@/components/driver/reservationsTable/ReservationsTable";
import Link from "next/link";
import { ViajesService } from "@/services/viajes.service";
import { GetViajeDto } from "@/entities/viajes/getViajeDto";
import { GetAllByConductorIDDto } from "@/entities/viajes/getAllViajeByConductorIdDto";

interface driverPageProp {
	params: ParsedUrlQuery;
}

export default function DriverHomePage({ params }: driverPageProp) {
	const idConductor = "987f6543-e21c-54d3-b789-426614174001";

	const columns = ["ID", "Fecha", "Origen", "Destino", "Estado"];
	const columnsReservations = ["Origen", "Destino", "Fecha"];
	const [viajeActual, setViajeActual] = useState<GetViajeDto | null>(null);
	const [allViajesByConductor, setAllViajesByConductor] = useState<GetAllByConductorIDDto[]>([]);
	const [userReservations, setUserReservations] = useState<GetAllByConductorIDDto[]>([]);
	const [loading, setLoading] = useState(true);

	const dataConductor = {
		name: "Botteri Joaquin",
		numero: idConductor,
	};

	useEffect(() => {
		if (!idConductor) return;
		Promise.all([
			ViajesService.getViajeActual(idConductor),
			ViajesService.getAllViajesByConductorId(idConductor),
		])
			.then(([viajeActual, allViajesByConductor]) => {
				if (viajeActual) {
					setViajeActual(viajeActual);
				} else {
					setViajeActual(null);
				}

				if (allViajesByConductor) {
					setAllViajesByConductor(allViajesByConductor);
					setUserReservations(allViajesByConductor.filter((viaje) => viaje.envio.reserva === true));
				} else {
					setAllViajesByConductor([]);
				}
			})
			.catch((error) => {
				console.error(error);
				setViajeActual(null);
				setAllViajesByConductor([]);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [idConductor]);

	return (
		<div className='min-h-screen mt-20'>
			<header className=' bg-primary text-white py-6 !m-0 min-w-full !mb-6'>
				<h1 className='containerMarginResposive text-3xl font-bold flex items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-8 w-8 mr-2'
						viewBox='0 0 20 20'
						fill='currentColor'>
						<path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
						<path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z' />
					</svg>
					Panel del Conductor
				</h1>
			</header>

			<div className='grid gap-6 md:grid-cols-2 mb-6 containerMarginResposive'>
				{loading && !viajeActual ? (
					<p>Cargando...</p>
				) : viajeActual && !loading ? (
					<div className='bg-white rounded-md shadow-lg'>
						<div className='bg-primary px-6 py-4 rounded-t-md'>
							<h2 className='text-2xl font-semibold text-white flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6 mr-2'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
									/>
								</svg>
								Viaje Actual
							</h2>
						</div>
						<div className='p-6 space-y-4'>
							<div className='flex items-center space-x-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-10 w-10 text-[#1565c0]'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
										clipRule='evenodd'
									/>
								</svg>
								<div>
									<h3 className='text-lg font-semibold text-gray-800'>Cliente</h3>
									<p className='text-gray-600'>
										{viajeActual?.envio.cliente.nombre} {viajeActual?.envio.cliente.apellido}
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-10 w-10 text-[#1565c0]'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
										clipRule='evenodd'
									/>
								</svg>
								<div>
									<h3 className='text-lg font-semibold text-gray-800'>Origen</h3>
									<p className='text-gray-600'>{`${viajeActual?.envio.origen.calle} ${viajeActual?.envio.origen.numero}, ${viajeActual?.envio.origen.localidad.nombre} ${viajeActual?.envio.origen.localidad.provincia.nombre}}`}</p>
								</div>
							</div>
							<div className='flex items-center space-x-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-10 w-10 text-[#1565c0]'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
										clipRule='evenodd'
									/>
								</svg>
								<div>
									<h3 className='text-lg font-semibold text-gray-800'>Destino</h3>
									<p className='text-gray-600'>{`${viajeActual?.envio.destino.calle} ${viajeActual?.envio.destino.numero}, ${viajeActual?.envio.destino.localidad.nombre} ${viajeActual?.envio.destino.localidad.provincia.nombre}}`}</p>
								</div>
							</div>
							<Button variant='contained' LinkComponent={Link} href='/driver/requestTravel'>
								ver viaje actual
							</Button>
						</div>
					</div>
				) : (
					<SinViaje />
				)}
				<ReservationsTable
					columns={columnsReservations}
					userReservations={userReservations}
					loading={loading}
				/>
			</div>
			
			<div className='grid gap-6 md:grid-cols-3 mb-6 containerMarginResposive'>
				<div className='bg-blue-100 rounded-lg shadow-lg p-6'>
					<h3 className='text-lg font-semibold text-[#1565c0] mb-4'>Total de Viajes</h3>
					<p className='text-3xl font-bold'>1250</p>
				</div>
				<div className='bg-green-100 rounded-lg shadow-lg p-6'>
					<h3 className='text-lg font-semibold text-green-700 mb-4'>Calificación Promedio</h3>
					<div className='flex items-center'>
						<span className='text-3xl font-bold mr-2'>4.8</span>
						<span className='text-yellow-500'>★</span>
					</div>
				</div>
				<div className='bg-yellow-100 rounded-lg shadow-lg p-6'>
					<h3 className='text-lg font-semibold text-yellow-700 mb-4'>Ganancias del Mes</h3>
					<p className='text-3xl font-bold'>$3,750.00</p>
				</div>
			</div>
			<div className='containerMarginResposive mb-8'>
				<div className='bg-white rounded-md shadow-lg overflow-hidden'>
					<div className='bg-[#1565c0] px-6 py-4'>
						<h2 className='text-2xl font-semibold text-white flex items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 mr-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							Historial de Viajes
						</h2>
					</div>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Cliente
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Fecha Inicio
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Origen
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Destino
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Tarifa
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{allViajesByConductor.map((viaje) => (
									<tr key={viaje.idViaje} className='hover:bg-gray-50'>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{viaje.envio.cliente.nombre} {viaje.envio.cliente.apellido}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{viaje.fechaInicio}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{viaje.envio.origen.calle} {viaje.envio.origen.numero}{" "}
											{viaje.envio.origen.localidad.nombre}{" "}
											{viaje.envio.origen.localidad.provincia.nombre}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{viaje.envio.destino.calle} {viaje.envio.destino.numero}{" "}
											{viaje.envio.destino.localidad.nombre}{" "}
											{viaje.envio.destino.localidad.provincia.nombre}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{viaje.envio.monto}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className='py-20 flex flex-col justify-center items-center'>
	// 		<header className='bg-primary shadow w-full'>
	// 				<div className='max-w-screen-xl 2xl:max-w-screen-2xl mx-auto py-6 px-4 md:px-10'>
	// 					<div className='flex flex-col gap-2 text-white'>
	// 						<h1 className='text-[25px] md:text-[23px] font-semibold'>{dataConductor.name}</h1>
	// 						<h3 className='text-[18px] md:text-[13px] font-normal'>N°Conductor: {dataConductor.numero}</h3>
	// 					</div>
	// 				</div>
	// 			</header>
	// 		<section className="flex justify-between w-[80%] h-[450px] mt-12 mb-16">
	// 		{loading ? (
	// 				<ContainerFlex>
	// 				<div className="rounded-md flex flex-col w-[500px] h-full">
	// 					<p className="font-medium text-gray-50 text-xl px-8 py-4 rounded-t-md bg-primary">
	// 					Cargando viaje...
	// 					</p>
	// 					<div className="bg-white shadow-lg space-y-5 px-8 py-9 flex-1 rounded-b-md animate-pulse">
	// 					<div className="h-6 bg-gray-300 rounded w-3/4" />
	// 					<div className="h-6 bg-gray-300 rounded w-2/3" />
	// 					<div className="h-6 bg-gray-300 rounded w-2/3" />
	// 					<div className="h-10 bg-gray-300 rounded w-1/2" />
	// 					</div>
	// 				</div>
	// 				</ContainerFlex>
	// 			) : viajeActual ? (
	// 				<ContainerFlex>
	// 				<div className="rounded-md flex flex-col w-[500px] h-full">
	// 					<p className="font-medium text-gray-50 text-xl px-8 py-4 rounded-t-md bg-primary">
	// 					Viaje Actual
	// 					</p>
	// 					<div className="bg-white shadow-lg space-y-5 px-8 py-9 flex-1 rounded-b-md">
	// 					<div className="flex flex-col gap-1">
	// 						<p className="text-lg font-medium">Cliente</p>
	// 						<p className="text-gray-500">{`${viajeActual.envio.cliente.nombre} ${viajeActual.envio.cliente.apellido}`}</p>
	// 					</div>
	// 					<div className="flex flex-col gap-1">
	// 						<p className="text-lg font-medium">Origen</p>
	// 						<p className="text-gray-500">{`${viajeActual.envio.origen.calle} N°${viajeActual.envio.origen.numero}, ${viajeActual.envio.origen.localidad.nombre}, ${viajeActual.envio.origen.localidad.provincia.nombre}`}</p>
	// 					</div>
	// 					<div className="flex flex-col gap-1">
	// 						<p className="text-lg font-medium">Destino</p>
	// 						<p className="text-gray-500">{`${viajeActual.envio.destino.calle} N°${viajeActual.envio.destino.numero}, ${viajeActual.envio.destino.localidad.nombre}, ${viajeActual.envio.destino.localidad.provincia.nombre}`}</p>
	// 					</div>
	// 					<Button variant="contained" LinkComponent={Link} href="/driver/requestTravel">
	// 						ver viaje actual
	// 					</Button>
	// 					</div>
	// 				</div>
	// 				</ContainerFlex>
	// 			) : (
	// 				<SinViaje />
	// 			)}
	//             <div className='rounded-md flex flex-col w-[500px] h-full'>
	// 				<p className='font-medium text-gray-50 text-xl px-8 py-4 rounded-t-md bg-primary'>
	// 					Reservas
	// 				</p>
	// 				<div className='bg-white shadow-lg space-y-5 flex justify-center h-full'>
	// 						<ReservationsTable columns={columnsReservations} className="rounded-none shadow-none"/>
	// 				</div>
	// 			</div>
	//         </section>
	// 		<section className="w-[80%]">
	// 			<TableComponent columns={columns} title='Historial de Viajes' >
	// 			{!allViajesByConductor ? (
	// 				<p>No hay viajes disponibles</p>  // Si no hay viajes, muestra un mensaje
	// 			) : (
	// 				allViajesByConductor.map((data) => (
	// 					<tr key={data.idViaje}>
	// 						<td className='py-2 px-4 text-center'>{data.idViaje}</td>
	// 						<td className='py-2 px-4 text-center'>{data.fechaInicio}</td>
	// 						<td className='py-2 px-4 text-center'>{`${data.envio.origen.calle} ${data.envio.origen.numero}, ${data.envio.origen.localidad.nombre}`}</td>
	// 						<td className='py-2 px-4 text-center'>{`${data.envio.destino.calle} ${data.envio.destino.numero}, ${data.envio.destino.localidad.nombre}`}</td>
	// 						<td className='py-2 px-4 text-center'>{data.envio.estado}</td>
	// 					</tr>
	// 				))
	// 			)}
	// 			</TableComponent>
	// 			<div className='flex justify-center'>
	// 				<Pagination count={8} color='primary' />
	// 			</div>
	// 		</section>
	// 	</div>
	// );
}
