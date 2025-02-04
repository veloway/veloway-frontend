import axios from "axios";

export const authService = {
	async register(userValues: any, addressValues: any): Promise<void> {
		const formattedData = {
			...userValues,
			dni: Number(userValues.dni),
			domicilio: {
				...addressValues,
				piso: addressValues.piso ? Number(addressValues.piso) : null, // Convertir a número o null
			},
		};
		try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/register`, formattedData);
		} catch (error: any) {
			console.error("Error en el registro:", error.response?.data || error);
			throw error;
		}
	},

	async login(user: any): Promise<any> {
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, user, {
				withCredentials: true,
			});
			return response.data;
		} catch (error: any) {
			console.error("Error en el login:", error.response?.data || error);
			throw error;
		}
	},

	async requestPasswordReset(email: string): Promise<void> {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/password-reset/request`, { email });
		} catch (error: any) {
			console.error("Error al solicitar el reseteo de contraseña:", error.response?.data || error);
			throw error;
		}
	},

	async resetPassword(code: string, newPassword: string): Promise<void> {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/password-reset/reset`, {
				code,
				newPassword,
			});
		} catch (error: any) {
			console.error("Error al restablecer la contraseña:", error.response?.data || error);
			throw error;
		}
	},
};
