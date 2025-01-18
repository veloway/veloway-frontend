import { EnvioDto } from '@/entities/envio';
import { GetEnvioDto } from '@/entities/envios/getEnvioDto';
import axios, { CancelTokenSource} from 'axios';
import dayjs from 'dayjs';

export class EnviosService {
    static async create(envio: EnvioDto, cancelToken: CancelTokenSource, onIntento: (intentos: number) => void): Promise<any> {
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

                if (res.status === 201) {
                    return res.data;
                } else {
                    if (res.data.message !== 'No hay conductores disponibles') throw new Error(res.data.message);
                    onIntento(intentos + 1);
                    console.log(`Intento ${intentos + 1} de ${intentosMaximos}: ${res.data.message}`);
                }

                intentos++;
                await new Promise((resolve) => setTimeout(resolve, intervalo)); // Esperar antes del siguiente intento
            }

            throw new Error("No se encontraron conductores disponibles, intente volver a realizar el envío");
            
        } catch (error) {
            if (axios.isCancel(error)) {
                onIntento(0);
                throw new Error("Operación cancelada.");
            } else if (axios.isAxiosError(error)) {
                // Controlar errores específicos de Axios
                if (error.response) {
                    throw new Error(error.response.data.message);
                } else if (error.request) {
                    throw new Error(error.request);
                } else {
                    throw new Error(error.message);
                }
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }else{
                throw new Error("Error desconocido");
            }
        }
    }


    static async getAllByClienteId(clienteId: string): Promise<GetEnvioDto[]>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/envios/cliente/${clienteId}`);
            
            if (res.status !== 200) throw new Error(res.data.message);

            return res.data;
        }catch(error){
            throw new Error("No se pudo obtener la lista de envíos");
        }
    }

    static async getByNroSeguimiento(nroSeguimiento: number): Promise<GetEnvioDto>{
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/envios/nro-seguimiento/${nroSeguimiento}`);
            
            if (res.status !== 200) throw new Error(res.data.message);

            return res.data;
        }catch(error){
            throw new Error("No se pudo obtener el envío");
        }
    }
}
