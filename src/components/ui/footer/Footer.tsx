"use client";

import { theme } from "@/config/MUI.config";
import { Box, Container, Link, Typography } from "@mui/material";
import Logo from "../logo/Logo";

export default function () {
	return (
		<Box component='footer' className='py-4 text-secondary bg-tertiary'>
			<div className='mb-5 max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-10 flex justify-between'>
				<Logo />
				<div>
					<Typography variant='h6'>Contacto</Typography>
					<Typography variant='body1'>Teléfono: 1234567890</Typography>
					<Typography variant='body1'>Email:</Typography>
					<Typography variant='body1'>Email:</Typography>
					<Typography variant='body1'>Email:</Typography>
				</div>
				<div>
					<Typography variant='h6'>Redes Sociales</Typography>
					<Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
						Facebook
					</Link>
					<Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
						Instagram
					</Link>
				</div>
			</div>
			<Container maxWidth='sm'>
				<Typography variant='body1'>
					© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
				</Typography>
			</Container>
		</Box>
	);
}
