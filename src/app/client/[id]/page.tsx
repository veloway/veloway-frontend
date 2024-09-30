import { ShippingCalculator } from "@/components/client";
import ClientButtons from "@/components/client/client-buttons/ClientButtons";
import { ParsedUrlQuery } from "querystring";

export const metadata = { title: "Client Home" };

interface ClientPageProps {
  params: ParsedUrlQuery
}

export default function ClientHomePage({params} : ClientPageProps) {
  const { id } = params;

	const dataClient = {
		name: "Jose Francisco Arce",
		numero: id,
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
				<div className='flex flex-col gap-6 justify-between w-full xl:w-auto'>
					<div className='flex flex-col gap-2 after:content-[""] after:h-[2px] after:bg-quaternary after:mt-5'>
						<h1 className='text-[35px] font-semibold'>{dataClient.name}</h1>
						<h3 className='text-[20px] font-normal'>N°Cliente: {dataClient.numero}</h3>
					</div>
					<ClientButtons />
				</div>
				<ShippingCalculator />
			</section>
			<section>
			</section>
		</div>
	);
}