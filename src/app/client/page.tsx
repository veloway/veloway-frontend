import { ShippingCalculator } from "@/components/client";
import { Button } from "@/components/ui";
import { GoPlusCircle } from "react-icons/go";

export const metadata = { title: "Client Home" };

export default function ClientHome() {
	const dataClient = {
		name: "Jose Francisco Arce",
		numero: 1123124513,
	};
	return (
		<div className="py-12">
			<section className='flex justify-between gap-4 flex-wrap'>
				<div className='flex flex-col gap-6 justify-between'>
					<div className='flex flex-col gap-2'>
						<h1 className='text-[35px] font-semibold'>{dataClient.name}</h1>
						<h3 className='text-[20px] font-normal'>Número de cliente: #{dataClient.numero}</h3>
					</div>
					<div className='h-[2px] bg-[var(--color-quaternary)]'></div>
					<div className='flex gap-4'>
						<Button variant='secondary' icon={<GoPlusCircle className='text-2xl' />}>
							Nuevo envío
						</Button>
						<Button variant="secondary">Seguir envío</Button>
					</div>
				</div>
				<ShippingCalculator />
			</section>
		</div>
	);
}
