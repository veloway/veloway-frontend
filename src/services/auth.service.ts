import axios from "axios";
import { useRegistroStore, useRegistroStoreDto } from "@/stores/userRegisterStore";

const API_URL = process.env.API_URL; // Asegúrate de definir esta variable en tu .env



export const authService = {

  async register(): Promise<any> {
    const { userValues, setUserValues , addressValues, setAddressValues } = useRegistroStore();
    
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
      
      setUserValues({})
      setAddressValues({})

    } catch (error: any) {
      console.error("Error en el registro:", error.response?.data || error);
      throw error;
    }
  },

  async login(user: any): Promise<any> {

    const {setAddressData, addressData , setUserData, userData} = useRegistroStoreDto()

    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/login`,
        user, { withCredentials: true }
      );
      const { domicilioDto , usuarioDto } =  response.data;

      setAddressData({
        calle: domicilioDto.calle,
        numero: domicilioDto.numero,
        descripcion: domicilioDto.descripcion,
        piso: domicilioDto.piso,
        depto: domicilioDto.depto,
        localidadID: domicilioDto.localidadID,
      });
      setUserData({
      dni: usuarioDto.dni,
      email: usuarioDto.email,
      fechaNac: usuarioDto.fechaNac,
      nombre: usuarioDto.nombre,
      apellido: usuarioDto.apellido,
      esConductor: usuarioDto.esConductor,
      telefono: usuarioDto.telefono,
      apiKey: usuarioDto.apiKey
      })

      console.log(userData, addressData)
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
