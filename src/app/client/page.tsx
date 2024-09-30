import { ShippingCalculator } from "@/components/client";
import ClientButtons from "@/components/client/client-buttons/ClientButtons";
import { Table } from "@/components/ui";
export const metadata = { title: "Client Home" };

export default function ClientHome() {
	const dataClient = {
		name: "Jose Francisco Arce",
		numero: 1123124513,
	};

	const colums: string[] = ["N° de Envío", "Destino", "Estado", "Fecha y hora estimada"];
	const data = [
		{
			id: 1,
			destino: "7 1569 e/ 63 y 64",
			estado: "En camino",
			fecha: "12/12/2021 12:00",
		},
		{
			id: 2,
			destino: "7 1569 e/ 63 y 64",
			estado: "Entregado",
			fecha: "12/12/2021 12:00",
		},
		{
			id: 3,
			destino: "7 1569 e/ 63 y 64",
			estado: "En camino",
			fecha: "12/12/2021 12:00",
		},
	];

	
	return (
		<div className='py-12'>
			<section className='flex justify-between gap-4 flex-wrap'>
				<div className='flex flex-col gap-6 justify-between'>
					<div className='flex flex-col gap-2 after:content-[""] after:h-[2px] after:bg-quaternary after:mt-5 after:w-[600px]'>
						<h1 className='text-[35px] font-semibold'>{dataClient.name}</h1>
						<h3 className='text-[20px] font-normal'>N°Cliente: {dataClient.numero}</h3>
					</div>
					<ClientButtons />
				</div>
				<ShippingCalculator />
			</section>
			<section>
				<Table colums={colums} data={data} tableName='Envios activos o pendientes'/>
			</section>
		</div>
	);
}
