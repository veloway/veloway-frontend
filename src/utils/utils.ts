import { GetEnvioDto } from "@/entities/envios/getEnvioDto";
import { PRECIO_CADA_100_GRAMOS } from "@/types/constants";

export const calcularPrecioEnvio = (peso: number) => {
	return (peso * PRECIO_CADA_100_GRAMOS) / 100;
};

export const calculateMonthlyStats = (envios: GetEnvioDto[]) => {
	const stats = [
		{ month: "Ene", shipments: 0 },
		{ month: "Feb", shipments: 0 },
		{ month: "Mar", shipments: 0 },
		{ month: "Abr", shipments: 0 },
		{ month: "May", shipments: 0 },
		{ month: "Jun", shipments: 0 },
		{ month: "Jul", shipments: 0 },
		{ month: "Ago", shipments: 0 },
		{ month: "Sep", shipments: 0 },
		{ month: "Oct", shipments: 0 },
		{ month: "Nov", shipments: 0 },
		{ month: "Dic", shipments: 0 },
	];

	envios.forEach((envio) => {
		const date = parseDate(envio.fecha);
		const month = date.getMonth();
		if (month >= 0 && month < stats.length) {
			stats[month].shipments += 1;
		}
	});

	return stats;
};

const parseDate = (dateString: string): Date => {
	const [day, month, year] = dateString.split("/").map(Number);
	return new Date(year, month - 1, day);
};
