import { Button, Input, Label } from "@/components/ui";
import { clientes } from "@/db/usuarios";

export default function ShipmentRegisterPage() {
	const user = clientes[0];

	return (
		<div className='py-8'>
			<h1 className='text-3xl mb-6 font-semibold'>Realiza tu envio</h1>
			<div className='grid grid-cols-2 gap-3'>
				<section className="flex flex-col justify-between">
					<form action='' className='flex gap-2 flex-1'>
						<fieldset className='bg-white shadow-lg rounded-md text-tertiary flex-1'>
							<p className='font-medium text-gray-50 text-xl px-10 py-4 rounded-t-md bg-primary'>
								Destino
							</p>
							<div className='px-10 py-6 space-y-3'>
								<div>
									<Label>Calle</Label>
									<Input required />
								</div>
								<div>
									<Label>Numero</Label>
									<Input type='number' required />
								</div>
								<div>
									<Label>Departamento</Label>
									<Input type='text' required={false} />
								</div>
								<div>
									<Label>Piso</Label>
									<Input type='number' required={false} />
								</div>
								<div>
									<Label>Descripcion (opcional)</Label>
									<Input type='text' required={false} />
								</div>
							</div>
						</fieldset>
						<fieldset className='bg-white shadow-lg rounded-md flex-1 text-tertiary'>
							<p className='font-medium text-gray-50 text-xl px-10 py-4 rounded-t-md bg-primary'>
								Paquete
							</p>
							<div className='px-10 py-6 space-y-3'>
								<div>
									<Label>Peso (gramos)</Label>
									<Input type='number' required />
								</div>
								<div>
									<Label>Hora</Label>
									<Input type='time' />
								</div>
								<div>
									<Label>Detalles (opcional)</Label>
									<Input type='text' />
								</div>
							</div>
						</fieldset>
					</form>
					<img
						className='max-h-56 pt-5 w-full object-cover rounded-b-lg'
						src='https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2018/05/calcular-distancias-banner-2.jpg'
						alt=''
					/>
				</section>
				{/*Origen*/}
				<section>
					<div className='bg-white shadow-lg rounded-md h-full'>
						<p className='font-medium text-gray-50 text-xl px-10 py-4 rounded-t-md bg-primary'>
							Origen
						</p>
						<div className='px-10 mt-4'>
							<div className='py-3 space-y-3'>
								<div>
									<Label>Calle</Label>
									<Input required />
								</div>
								<div>
									<Label>Numero</Label>
									<Input type='number' required />
								</div>
								<div>
									<Label>Departamento</Label>
									<Input type='text' required={false} />
								</div>
								<div>
									<Label>Piso</Label>
									<Input type='number' required={false} />
								</div>
								<div>
									<Label>Descripcion (opcional)</Label>
									<Input type='text' required={false} />
								</div>
							</div>
						</div>
						<div className='h-[2px] bg-gray-300 mt-4'></div>
						<div className="px-10 flex flex-col gap-3 mt-6">
							<Label className="text-lg">Nombre y apellido</Label>
							<p className='text-gray-500'>
								{user.nombre} {user.apellido}
							</p>
						</div>
						<div className='px-10 flex gap-3 mt-6 items-center text-lg'>
							<p className='font-medium'>Precio: </p>
							<span>${250}</span>
						</div>
						<div className='px-10 py-6'>
							<Button className='w-full bg-primary text-gray-50 py-3'>Realizar envio</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
