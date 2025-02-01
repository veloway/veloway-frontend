import { ShippingCalculator } from "@/components/client";
import ClientButtons from "@/components/client/client-buttons/ClientButtons";
import { ParsedUrlQuery } from "querystring";
import { dataEnviosTabla } from "@/db/envios";
import Pagination from "@mui/material/Pagination";
import { TableComponent } from "@/components/ui";

export const metadata = { title: "Client Home" };

interface ClientPageProps {
	params: ParsedUrlQuery;
}

export default function ClientHomePage({ params }: ClientPageProps) {
	//TODO: RECUPERAR ID DEL CLIENTE DEL TOKEN DE AUTENTICACION, POR AHORA SE USARA UN ID HARDCODEADO

	//TODO: Una vez recuperado el id del cliente, ya podemos hacer una peticion a la bbdd para
	//obtener mas informacion del cliente.

	const clietId = 12312312313;

	const dataClient = {
		name: "Jose Francisco Arce",
		numero: clietId,
	};

	const colums: string[] = ["N° de Envío", "Destino", "Estado", "Fecha y hora estimada"];

	return (
		<div className='py-12 w-full'>
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
				<TableComponent columns={colums} title='Registro de envios' className="mb-2 mt-20">
					{dataEnviosTabla.map((envio) => (
						<tr key={envio.id}>
							<td className='text-center'>{envio.id}</td>
							<td className='text-center'>{envio.destino}</td>
							<td className='text-center'>{envio.estado}</td>
							<td className='text-center'>{envio.fecha}</td>
						</tr>
					))}
				</TableComponent>'
				<div className='flex justify-center'>
					<Pagination count={8} color="primary"/>
				</div>
			</section>
		</div>
	);
}
