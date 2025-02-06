import { EnvioDto } from "@/entities/envio";
import { GetEnvioDto } from "@/entities/envios/getEnvioDto";
import { EnvioFilters } from "@/types/types";
import axios, { CancelTokenSource } from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface GetEnvioDtoPagination {
	totalEnvios: number;
	lastPage: number;
	previusPage: number;
	nextPage: number;
	envios: GetEnvioDto[];
}

export class EnviosService {
	static async create(
		envio: EnvioDto,
		cancelToken: CancelTokenSource,
		onIntento: (intentos: number) => void
	): Promise<any> {
		const maxTiempo = 20000; // 20 segundos
		const intervalo = 2000; // 2 segundos entre solicitudes
		const intentosMaximos = Math.floor(maxTiempo / intervalo);
		let intentos = 0;

		if (!envio.reserva) {
			envio.hora = dayjs().format("HH:mm");
		}

		try {
			while (intentos < intentosMaximos) {
				const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/envios/create`, envio, {
					validateStatus: (status) => status < 500, // Permite retornar códigos de estado < a 500
					cancelToken: cancelToken.token, // Agregar token de cancelación
					withCredentials: true, // Enviar cookies
				});

				if (res.status === 201) {
					return res.data;
				} else {
					if (res.data.message !== "No hay conductores disponibles")
						throw new Error(res.data.message);
					onIntento(intentos + 1);
					console.log(`Intento ${intentos + 1} de ${intentosMaximos}: ${res.data.message}`);
				}

				intentos++;
				await new Promise((resolve) => setTimeout(resolve, intervalo)); // Esperar antes del siguiente intento
			}

			throw new Error(
				"No se encontraron conductores disponibles, intente volver a realizar el envío"
			);
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
			} else {
				throw new Error("Error desconocido");
			}
		}
	}

	static async getAllByClienteId(clienteId: string): Promise<GetEnvioDtoPagination> {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/envios/cliente/${clienteId}`,
				{ withCredentials: true }
			);

			if (res.status !== 200) throw new Error(res.data.message);
        
			return res.data;
		} catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error("No se pudo obtener los envíos");
		}
	}

	static async getAllByClienteIdPagination(
		clienteId: string,
		page: number,
		filters?: EnvioFilters
	): Promise<GetEnvioDtoPagination> {
		try {
			const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/envios/cliente/${clienteId}`);

			// Parámetros fijos
			url.searchParams.append("limit", "5");
			url.searchParams.append("page", page.toString());

			// filtros
			if (filters) {
				const { estado, fechaDesde, fechaHasta, descripcion } = filters;

				if (estado) url.searchParams.append("estado", estado.toString());
				if (fechaDesde) url.searchParams.append("fechaDesde", fechaDesde);
				if (fechaHasta) url.searchParams.append("fechaHasta", fechaHasta);
				if (descripcion) url.searchParams.append("descripcion", descripcion);
			}

			const res = await axios.get(url.toString(), { withCredentials: true });

			if (res.status !== 200) {
				throw new Error(res.data.message || "Error al obtener los envíos");
			}

			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage = error.response?.data?.message || error.message;
				throw new Error(`Error en la solicitud: ${errorMessage}`);
			} else {
				throw new Error("Error desconocido al obtener los envíos");
			}
		}
	}

	static async getByNroSeguimiento(nroSeguimiento: number): Promise<GetEnvioDto> {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/envios/nro-seguimiento/${nroSeguimiento}`,
				{ withCredentials: true }
			);

			if (res.status !== 200) throw new Error(res.data.message);

			return res.data;
		} catch (error) {
			throw new Error("No se pudo obtener el envío");
		}
	}

	static async cancelarEnvio(nroSeguimiento: number): Promise<any> {
		try {
			const res = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/envios/cancelar/nro-seguimiento/${nroSeguimiento}`,
				{ withCredentials: true }
			);

			if (res.status !== 200) throw new Error(res.data.message);

			return res.data;
		} catch (error) {
			throw new Error("No se pudo cancelar el envío");
		}
	}

	static async updateEstadoEnvio(numeroSeguimiento: number, estadoEnvioID: number): Promise<void> {
		try {
			const res = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/envios/update-estado/nro-seguimiento/${numeroSeguimiento}`,
				{ estadoEnvioID },
				{ withCredentials: true }
			);

			if (res.status !== 200) throw new Error(res.data.message);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}
}
