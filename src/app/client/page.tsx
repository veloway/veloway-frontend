import { ShippingCalculator } from "@/components/client";

export const metadata = { title: "Client Home" };

export default function ClientHome() {
	const dataClient = {
		name: "Jose Francisco Arce",
		numero: 1123124513,
	};
	return (
		<div>
			<section className='flex justify-between py-4 gap-4'>
				<div className='flex flex-col gap-6 justify-between'>
					<div className='flex flex-col gap-2'>
						<h1 className='text-[35px] font-semibold'>{dataClient.name}</h1>
						<h3 className='text-[20px] font-normal'>Número de cliente: #{dataClient.numero}</h3>
					</div>
					<div className='h-[2px] bg-[var(--color-quaternary)]'></div>
					<div className='flex gap-4'>
						<button>Nuevo Envio</button>
						<button>Seguir Envio</button>
					</div>
				</div>
				<ShippingCalculator />
			</section>
		</div>
	);
}
