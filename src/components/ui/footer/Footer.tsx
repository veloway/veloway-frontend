"use client";

import { theme } from "@/config/MUI.config";
import { Box, Container, Link, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function () {
	return (
		<Box component='footer' className='py-4 text-secondary bg-tertiary'>
			<div className="flex justify-center pb-[10px]">
				<Logo />
			</div>
			
			
			<div className='mb-5 max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-10 flex justify-between pl-[10%] pr-[10%]'>
				
				<div className="grid justify-center item-center pb-[10px] ">
						<Typography variant='h6'>Contacto:</Typography>
						<br />
						<Typography variant='body1'>Teléfono: +54 9 11 3456-7890</Typography>
						<Typography variant='body1'>Email: contacto@veloway.com</Typography>
				</div>
				<div className="items-center">
					<Typography variant='h6'>Redes Sociales</Typography>
					<br />
					<div className="flex justify-center gap-[5px] z-3">
						<Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
							<FacebookIcon></FacebookIcon>
						</Link>
						<Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
							<InstagramIcon></InstagramIcon>
						</Link>
					</div>
				</div>
			</div>
			<Container className="flex justify-center" maxWidth='sm'>
				<Typography variant='body1'>
					© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
				</Typography>
			</Container>
		</Box>
	);
}
