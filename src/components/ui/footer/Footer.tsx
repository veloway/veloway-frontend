"use client";
import { Box, Container, Link, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from "../logo/Logo";

export default function () {
	return (
		<Box component='footer' className='py-4 text-secondary bg-tertiary'>
			<div className="flex justify-center">
				<Logo />
			</div>
			<div className='mb-5 max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto px-[10%] flex justify-between'>
				<div>
					<Typography variant='h6'>Contacto:</Typography>
					<Typography variant='body1'>Teléfono: 0800-987-6543</Typography>
					<Typography variant='body1'>Email: contacto@veloway.com</Typography>
				</div>
				<div className="items-center">
					<Typography variant='h6'>Redes Sociales</Typography>
					<Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
						<FacebookIcon/>
					</Link>
					<Link href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
						<InstagramIcon/>
					</Link>
				</div>
			</div>
			<Container className="flex justify-center" maxWidth='sm'>
				<Typography variant='body1'>
					© {new Date().getFullYear()} Veloway. Todos los derechos reservados.
				</Typography>
			</Container>
		</Box>
	);
}
