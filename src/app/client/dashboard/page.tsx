"use client";
import { ShippingCalculator } from "@/components/client";
import { ParsedUrlQuery } from "querystring";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { GetEnvioDto } from "@/entities/envios/getEnvioDto";
import { useState } from "react";
import { EnviosService } from "@/services/envios.service";
import Link from "next/link";
import { NewShipmentButton } from "@/components/client/new-shipment-button/NewShipmentButton";
import { TrackShipmentButton } from "@/components/client/track-shipment-button/TrackShipmentButton";
import { calculateMonthlyStats } from "@/utils/utils";
import { SearchShipment } from "@/components/client/search-shipment/SearchShipment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/authStore";

// export const metadata = { title: "Client Home" };

interface ClientPageProps {
	params: ParsedUrlQuery;
}

const monthlyStatsInitial = [
	{ month: "Ene", shipments: 0 },
	{ month: "Feb", shipments: 0 },
	{ month: "Mar", shipments: 0 },
	{ month: "Abr", shipments: 0 },
	{ month: "May", shipments: 0 },
	{ month: "Jun", shipments: 0 },
	{ month: "Jul", shipments: 0 },
	{ month: "Ago", shipments: 0 },
	{ month: "Sep", shipments: 0 },
	{ month: "Oct", shipments: 0 },
	{ month: "Nov", shipments: 0 },
	{ month: "Dic", shipments: 0 },
];

export default function ClientHomePage({ params }: ClientPageProps) {
	//TODO: RECUPERAR ID DEL CLIENTE DEL TOKEN DE AUTENTICACION, POR AHORA SE USARA UN ID HARDCODEADO

	//TODO: Una vez recuperado el id del cliente, ya podemos hacer una peticion a la bbdd para
	//obtener mas informacion del cliente.
	const [shipments, setShipments] = useState<GetEnvioDto[]>([]);
	const [cantEnvios, setCantEnvios] = useState(0);
	const [cantiEnviosEnTransito, setCantiEnviosEnTransito] = useState(0);
	const [monthlyStats, setMonthlyStats] = useState(monthlyStatsInitial);
	const [searchDialogOpen, setSearchDialogOpen] = useState(false);
	const navigation = useRouter();
	const userPayload = useAuthStore((state) => state.userPayload);
	const loadingUserPayload = useAuthStore((state) => state.loadingUserPayload);
	const [loadingShipments, setLoadingShipments] = useState(true);

	const handleSearchShipment = (trackingNumber: string) => {
		toast.loading("Buscando envío...");
		EnviosService.getByNroSeguimiento(Number(trackingNumber))
			.then((data) => {
				if (data) {
					toast.dismiss();
					toast.success("Envío encontrado");
					navigation.push(`track-shipment/${trackingNumber}`);
				}
			})
			.catch((error) => {
				toast.dismiss();
				toast.error("No se encontró ningun envío");
			});
	};

	useEffect(() => {
		if (!userPayload.id) return;
		EnviosService.getAllByClienteId(userPayload.id)
			.then((data) => {
				setShipments(data.envios);
				setCantEnvios(data.totalEnvios);
				setCantiEnviosEnTransito(
					data.envios.filter(
						(envio) =>
							envio.estado === "En proceso de retiro" || envio.estado === "En traslado a destino"
					).length
				);
				setMonthlyStats(calculateMonthlyStats(data.envios));
			})
			.finally(() => {
				setLoadingShipments(false);
			});
	}, [userPayload]);

	return (
		<div className='w-full flex flex-col'>
			<div className='bg-secondary'>
				<header className='bg-primary shadow'>
					<div className='max-w-screen-xl 2xl:max-w-screen-2xl mx-auto py-6 px-4 md:px-10'>
						<div className='flex flex-col gap-2 text-white'>
							{
								loadingUserPayload ? (
									<div className='h-10 bg-gray-300 rounded w-96 animate-pulse'></div>
								) : (
									<h1 className='text-[25px] md:text-[30px] font-semibold'>Bienvenido {userPayload.nombre}!</h1>
								)
							}
						</div>
					</div>
				</header>

				<div className='max-w-screen-xl 2xl:max-w-screen-2xl mx-auto py-6 px-4 md:px-10'>
					<div className='py-6 sm:px-0'>
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
							<div className='bg-white overflow-hidden shadow rounded-lg flex flex-col'>
								<div className='p-5 h-2/3 flex items-center gap-4'>
									{/* <ClientButtons /> */}
									<div className='flex-shrink-0 bg-primary rounded-md p-3'>
										<svg
											className='h-6 w-6 text-white'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
											/>
										</svg>
									</div>
									<NewShipmentButton />
								</div>
								<div className='bg-gray-50 px-5 py-3 h-1/3'>
									<div className='text-sm'>
										<span className='font-medium text-primary'>Iniciar nuevo envío</span>
									</div>
								</div>
							</div>

							<div className='bg-white overflow-hidden shadow rounded-lg'>
								<div className='p-5'>
									<div className='flex items-center gap-4'>
										<div className='flex-shrink-0 bg-green-500 rounded-md p-3'>
											<svg
												className='h-6 w-6 text-white'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
												/>
											</svg>
										</div>
										<TrackShipmentButton onClick={() => setSearchDialogOpen(true)} />
									</div>
								</div>
								<div className='bg-gray-50 px-5 py-3'>
									<div className='text-sm font-medium text-green-500'>
										<span>Seguir envío</span>
									</div>
								</div>
							</div>

							<div className='bg-white overflow-hidden shadow rounded-lg flex flex-col'>
								<div className='p-5 h-2/3'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 bg-yellow-500 rounded-md p-3'>
											<svg
												className='h-6 w-6 text-white'
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
										</div>
										<div className='ml-5 w-0 flex-1'>
											<dl>
												<dt className='text-sm font-medium text-gray-500 truncate'>Total Envíos</dt>
												<dd>
													{loadingShipments && loadingUserPayload ? (
														<div className='h-6 bg-gray-300 rounded w-16 animate-pulse'></div>
													) : (
														<div className='text-lg font-medium text-gray-900'>
															{shipments.length === 0 ? 0 : cantEnvios}
														</div>
													)}
												</dd>
											</dl>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-5 py-3 flex-1 h-1/3'>
									<div className='text-sm'>
										<span className='font-medium text-yellow-600'>Envíos realizados </span>
									</div>
								</div>
							</div>

							<div className='bg-white overflow-hidden shadow rounded-lg flex flex-col'>
								<div className='p-5 h-2/3'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 bg-red-500 rounded-md p-3'>
											<svg
												className='h-6 w-6 text-white'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path d='M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' />
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
												/>
											</svg>
										</div>
										<div className='ml-5 w-0 flex-1'>
											<dl>
												<dt className='text-sm font-medium text-gray-500 truncate'>En Tránsito</dt>
												<dd>
													{loadingShipments && loadingUserPayload ? (
														<div className='h-6 bg-gray-300 rounded w-16 animate-pulse'></div>
													) : (
														<div className='text-lg font-medium text-gray-900'>
															{shipments.length === 0 ? 0 : cantiEnviosEnTransito}
														</div>
													)}
												</dd>
											</dl>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-5 py-3 flex-1 h-1/3'>
									<div className='text-sm'>
										<span className='font-medium text-red-600'>Envíos en camino</span>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
							<ShippingCalculator />

							<div className='bg-white shadow rounded-lg'>
								<div className='px-4 py-5 sm:p-6'>
									<h3 className='text-lg leading-6 font-medium text-gray-900 flex items-center'>
										<svg
											className='h-5 w-5 mr-2 text-green-500'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
											/>
										</svg>
										Últimos Envíos
									</h3>
									<div className='mt-5 flow-root min-h-[200px]'>
										<ul className='-my-4 divide-y divide-gray-200'>
											{loadingShipments && loadingUserPayload ? (
												Array(3)
													.fill(0)
													.map((_, index) => (
														<li key={index} className='py-4'>
															<div className='flex items-center space-x-4'>
																<div className='flex-1 min-w-0'>
																	<div className='h-4 bg-gray-300 rounded w-32 animate-pulse mb-2'></div>
																	<div className='h-4 bg-gray-300 rounded w-48 animate-pulse'></div>
																</div>
																<div className='h-6 bg-gray-300 rounded w-16 animate-pulse'></div>
																<div className='h-8 bg-gray-300 rounded w-24 animate-pulse'></div>
															</div>
														</li>
													))
											) : shipments.length === 0 ? (
												<li className='py-4'>
													<div className='flex items-center space-x-4'>
														<div className='flex-1 min-w-0'>
															<p className='text-sm font-medium text-gray-900 truncate'>
																No hay envíos recientes
															</p>
														</div>
													</div>
												</li>
											) : (
												shipments.slice(0, 3).map((shipment, index) => (
													<li key={shipment.nroSeguimiento} className='py-4'>
														<div className='flex items-center space-x-4'>
															<div className='flex-1 min-w-0'>
																<p className='text-sm font-medium text-gray-900 truncate'>
																	{shipment.descripcion.length > 50
																		? shipment.descripcion.substring(0, 50) + "..."
																		: shipment.descripcion}
																</p>
																<p className='text-sm text-gray-500 truncate'>
																	{shipment.destino.calle} {shipment.destino.numero}{" "}
																	{shipment.destino.localidad.nombre}{" "}
																	{shipment.destino.localidad.provincia.nombre}
																</p>
															</div>
															<div>
																<span
																	className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
																		shipment.estado === "Entregado"
																			? "bg-green-100 text-green-800"
																			: shipment.estado === "En traslado a destino"
																				? "bg-yellow-100 text-yellow-800"
																				: shipment.estado === "En proceso de retiro"
																					? "bg-blue-100 text-blue-800"
																					: shipment.estado === "Confirmado"
																						? "bg-purple-100 text-purple-800"
																						: "bg-red-100 text-red-800"
																	}`}>
																	{shipment.estado}
																</span>
															</div>
															<Button
																variant='outlined'
																color='primary'
																LinkComponent={Link}
																href={`/client/shipment/${shipment.nroSeguimiento}`}>
																Ver
															</Button>
														</div>
													</li>
												))
											)}
										</ul>
									</div>
									<div className='mt-6'>
										<Button
											variant='contained'
											color='primary'
											className='w-full'
											LinkComponent={Link}
											href='/client/all-shipments'>
											Ver Todos los Envíos
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-8'>
							<div className='bg-white shadow rounded-lg'>
								<div className='px-4 py-5 sm:p-6'>
									<h3 className='text-lg leading-6 font-medium text-gray-900 flex items-center'>
										<svg
											className='h-5 w-5 mr-2 text-blue-500'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
											/>
										</svg>
										Estadísticas Mensuales
									</h3>
									<div className='mt-5'>
										<div className='flex items-end'>
											{loadingShipments && loadingUserPayload ? (
												Array(12)
													.fill(0)
													.map((_, index) => (
														<div key={index} className='flex-1 text-center'>
															<div className='relative'>
																<div className='absolute inset-0 flex items-center justify-center'>
																	<div className='h-4 bg-gray-300 rounded w-8 animate-pulse'></div>
																</div>
																<div
																	className='bg-gray-300 rounded-t animate-pulse'
																	style={{ height: "50px" }}></div>
															</div>
															<span className='text-sm text-gray-500'>
																{monthlyStatsInitial[index].month}
															</span>
														</div>
													))
											) : shipments.length === 0 ? (
												monthlyStatsInitial.map((stat, index) => (
													<div key={index} className='flex-1 text-center'>
														<div className='relative'>
															<div className='absolute inset-0 flex items-center justify-center'>
																<span className='text-sm font-medium text-gray-600'>
																	0
																</span>
															</div>
															<div
																className='bg-blue-500 rounded-t'
																style={{ height: `0px` }}></div>
														</div>
														<span className='text-sm text-gray-500'>{stat.month}</span>
													</div>
												))
											) : (
												monthlyStats.map((stat, index) => (
													<div key={index} className='flex-1 text-center'>
														<div className='relative'>
															<div className='absolute inset-0 flex items-center justify-center'>
																<span className='text-sm font-medium text-gray-600'>
																	{stat.shipments}
																</span>
															</div>
															<div
																className='bg-blue-500 rounded-t'
																style={{ height: `${stat.shipments * 2}px` }}></div>
														</div>
														<span className='text-sm text-gray-500'>{stat.month}</span>
													</div>
												))
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<SearchShipment
				open={searchDialogOpen}
				onClose={() => setSearchDialogOpen(false)}
				onSearch={handleSearchShipment}
			/>
		</div>
	);
}
