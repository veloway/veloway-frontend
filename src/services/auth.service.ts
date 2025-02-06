import axios from "axios";

export const authService = {
	async register(userValues: any, addressValues: any): Promise<void> {
		const formattedData = {
			...userValues,
			dni: Number(userValues.dni),
			esConductor: false,
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
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/password-reset/request`, { email }, { withCredentials: true });
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
			}, { withCredentials: true });
		} catch (error: any) {
			console.error("Error al restablecer la contraseña:", error.response?.data || error);
			throw error;
		}
	},

	async driverRegister(userValues: any, addressValues: any, carnetValues: any, licenseValues: any, vehicleValues: any): Promise<void> {

		console.log(userValues, addressValues, licenseValues, carnetValues, vehicleValues)

		const formattedData = {
			...userValues,
			dni: Number(userValues.dni),
			esConductor: true,
			domicilio: {
				...addressValues,
				piso: addressValues.piso ? Number(addressValues.piso) : null, // Convertir a número o null
			},
		};


		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/conductores/register`, formattedData);

			const id_conductor = response.data.conductorId
			const formattedCarnet = {
				...carnetValues,
				peso: Number(carnetValues.peso),
				altura: Number(carnetValues.altura),
				id_conductor
			}
			const formattedLicense = {
				...licenseValues,
				id_conductor
			}
			const formattedVehicle = { ...vehicleValues, id_conductor }

			console.log(formattedVehicle)

			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/fichasMedicas/create`, formattedCarnet, { withCredentials: true });
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/licencias/create`, formattedLicense, { withCredentials: true });
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/vehiculos/create`, formattedVehicle, { withCredentials: true });
		} catch (error: any) {
			console.error("Error en el registro:", error.response?.data || error);
			throw error;
		}
	},

	async logout(): Promise<void> {
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { withCredentials: true });
		} catch (error: any) {
			console.error("Error al restablecer la contraseña:", error.response?.data || error);
			throw error;
		}
	},

	async updateUser(userValues: any): Promise<any> {
		try {
			await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/update-user`, userValues, { withCredentials: true })

		} catch (error: any) {
			console.error("Error al actualizar el usuario:", error.response?.data || error);
			throw error;
		}
	},

	async updateAddress(addressValues: any): Promise<any> {
		try {

			await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/update-address`, addressValues, { withCredentials: true })

		} catch (error: any) {
			console.error("Error al actualizar el domicilio:", error.response?.data || error);
			throw error;
		}
	},

	// Regenerar API Key
	async regenerateApiKey(): Promise<string> {
		try {
			const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/regenerate-api-key`, {}, { withCredentials: true });

			return res.data

		} catch (error: any) {
			console.error("Error al regenerar la API Key", error.response?.data || error);
			throw error;

		}
	},

	async cancelAccount(): Promise<void> {
		try {
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete-account`, { withCredentials: true });
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { withCredentials: true });
		} catch (error: any) {
			console.error("Error al regenerar la API Key", error.response?.data || error);
			throw error;
		}
	}

};
