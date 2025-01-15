import { EnvioDto } from '@/entities/envio';
import axios, { CancelTokenSource} from 'axios';
import dayjs from 'dayjs';

export class EnviosService {
    static async create(envio: EnvioDto, cancelToken: CancelTokenSource): Promise<any> {
        const maxTiempo = 20000; // 20 segundos
        const intervalo = 2000; // 2 segundos entre solicitudes
        const intentosMaximos = Math.floor(maxTiempo / intervalo);
        let intentos = 0;

        if (!envio.reserva) {
            envio.hora = dayjs().format("HH:mm");
        }

        try {
            while (intentos < intentosMaximos) {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/envios/create`,
                    envio,
                    {
                        validateStatus: (status) => status < 500, // Permite retornar códigos de estado < a 500
                        cancelToken: cancelToken.token, // Agregar token de cancelación
                    }
                );

                if (res.status === 200) {
                    return res.data;
                } else {
                    if (res.data.message !== 'No hay conductores disponibles') return res.data;
                    console.log(`Intento ${intentos + 1} de ${intentosMaximos}: ${res.data.message}`);
                }

                intentos++;
                await new Promise((resolve) => setTimeout(resolve, intervalo)); // Esperar antes del siguiente intento
            }

            throw new Error("No se encontraron conductores disponibles, intente volver a realizar el envío");
            
        } catch (error) {
            if (axios.isCancel(error)) {
                throw new Error("Operación cancelada.");
            } else if (axios.isAxiosError(error)) {
                // Controlar errores específicos de Axios
                if (error.response) {
                    console.error("Error en la respuesta de la API:");
                    console.error("Código de estado:", error.response.status);
                    console.error("Datos:", error.response.data);
                    throw new Error(error.response.data.message);
                } else if (error.request) {
                    console.error("No se recibió respuesta del servidor:", error.request);
                    throw new Error(error.request);
                } else {
                    console.error("Error en la configuración de la solicitud:", error.message);
                    throw new Error(error.message);
                }
            } else {
                console.error("Error desconocido:", error);
            }
            throw error;
        }
    }
}
