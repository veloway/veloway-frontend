import axios from "axios";
import { useRegistroStore, useRegistroStoreDto } from "@/stores/userRegisterStore";

const API_URL = process.env.API_URL; // Asegúrate de definir esta variable en tu .env


    


export const authService = {

  async register(userValues: any, addressValues: any): Promise<any> {

    const formattedData = {
      ...userValues,
      dni: Number(userValues.dni),
      domicilio: {
        ...addressValues,
        piso: addressValues.piso ? Number(addressValues.piso) : null, // Convertir a número o null
      },
    };
    try {
      await axios.post(`http://localhost:3001/api/usuarios/register`, formattedData);

    } catch (error: any) {
      console.error("Error en el registro:", error.response?.data || error);
      throw error;
    }
  },

  async login(user: any): Promise<any> {

    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/login`,
        user, { withCredentials: true }
      );
      return response.data

    } catch (error: any) {
      console.error("Error en el login:", error.response?.data || error);
      throw error;
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await axios.post(`http://localhost:3001/api/auth/password-reset/request`, { email });
    } catch (error: any) {
      console.error("Error al solicitar el reseteo de contraseña:", error.response?.data || error);
      throw error;
    }
  },

  async resetPassword(code: string, newPassword: string): Promise<void> {
    try {
        await axios.post(`http://localhost:3001/api/auth/password-reset/reset`, {
        code,
        newPassword,
      });
    } catch (error: any) {
      console.error("Error al restablecer la contraseña:", error.response?.data || error);
      throw error;
    }
  }
  
};
