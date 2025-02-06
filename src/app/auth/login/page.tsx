"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import { useAuthStore } from "@/stores/authStore";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const router = useRouter();
	const setUserPayload = useAuthStore((state) => state.setUserPayload);
	const [errorLogin, setErrorLogin] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const payload = await authService.login(formData);
			setUserPayload(payload.user);
			setErrorLogin("");
		
			router.push(`/client/dashboard`);
			setLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				setLoading(false);
				setErrorLogin("Usuario o contraseña incorrectos");
			}
		}
	};

	return (
		<>
			<h2 className='text-3xl font-bold text-center mb-6'>¡Bienvenido de vuelta!</h2>

			<form onSubmit={handleSubmit} className='flex flex-col text-tertiary'>
				<label className='mb-1 font-medium' htmlFor='email'>
					Mail
				</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='Correo electrónico'
					required
					value={formData.email}
					onChange={handleChange}
					className='mb-4 p-2 border rounded'
				/>

				<label className='mb-1 font-medium' htmlFor='password'>
					Contraseña
				</label>
				<input
					type='password'
					id='password'
					name='password'
					placeholder='Contraseña'
					required
					value={formData.password}
					onChange={handleChange}
					className='mb-4 p-2 border rounded'
				/>

				{errorLogin && (
					<div className='bg-red-100 border text-red-700 px-3 py-2 rounded-sm mb-4'>
						<p>{errorLogin}</p>
					</div>
				)}

				{loading ? (
					<div className='flex justify-center mb-4'>
						<CircularProgress className='w-6' />
					</div>
				) : (
					<Button className='mb-4' type='submit' variant='contained'>
						Iniciar Sesión
					</Button>
				)}
			</form>

			{/* Enlace para recuperar contraseña */}
			<div className='text-center mb-6'>
				<a href='/auth/resetPassword' className='text-sm text-blue-600 hover:underline'>
					¿Olvidaste tu contraseña?
				</a>
			</div>

			{/* Sección de registro */}
			<div className='text-center'>
				<p className='mb-2'>¿No tienes cuenta? ¡Regístrate!</p>

				<div className='flex justify-center gap-4 mb-4'>
					<Button LinkComponent={Link} href='/auth/clientRegister' variant='contained'>
						Como Cliente
					</Button>
					<Button LinkComponent={Link} href='/auth/driverRegister' variant='contained'>
						Como Conductor
					</Button>
				</div>
			</div>
		</>
	);
};
export default Login;
