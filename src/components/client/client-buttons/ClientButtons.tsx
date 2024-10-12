"use client";

import AddIcon from '@mui/icons-material/Add';
import "./ClientButtons.css";
import { Button } from "@mui/material";
import Link from "next/link";

export default function ClientButtons() {

	return (
		<div className='flex gap-6'>
			<Button 
				variant="contained" 
				color="primary"
				startIcon={<AddIcon className='!text-2xl lg:text-3xl' /> }
				LinkComponent={Link}
				className="rounded-md flex"
				href="/client/shipment-register"
			>
				Nuevo envío
			</Button>
			<button className='animated-button '>
				<svg viewBox='0 0 24 24' className='arr-2' xmlns='http://www.w3.org/2000/svg'>
					<path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'></path>
				</svg>
				<span className="text">Seguir envío</span>
				<span className='circle'></span>
				<svg viewBox='0 0 24 24' className='arr-1' xmlns='http://www.w3.org/2000/svg'>
					<path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'></path>
				</svg>
			</button>
		</div>
	);
}
