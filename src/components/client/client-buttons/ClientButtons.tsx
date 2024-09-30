"use client";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { GoPlusCircle } from "react-icons/go";
import "./ClientButtons.css";

export default function ClientButtons() {
	const router = useRouter();
	const handleClick = (): void => {
		router.push("/client/shipment-register");
	};
	return (
		<div className='flex gap-6'>
			{/* <Button
				onClick={handleClick}
				variant='primary'
				className='py-3 px-9'
				icon={<GoPlusCircle className='text-2xl' />}>
				Nuevo envío
			</Button> */}
            <button className='animated-button !bg-primary !text-secondary'>
                <GoPlusCircle className='text-2xl arr-2' />
				<span className='text'>Nuevo envío</span>
				<span className='circle bg'></span>
				<GoPlusCircle className='text-2xl arr-1' />
			</button>
			<button className='animated-button'>
				<svg viewBox='0 0 24 24' className='arr-2' xmlns='http://www.w3.org/2000/svg'>
					<path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'></path>
				</svg>
				<span className='text'>Seguir envío</span>
				<span className='circle'></span>
				<svg viewBox='0 0 24 24' className='arr-1' xmlns='http://www.w3.org/2000/svg'>
					<path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'></path>
				</svg>
			</button>
		</div>
	);
}
