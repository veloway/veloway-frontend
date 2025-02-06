"use client"

import { ContainerFlex } from "@/components/ui";
import { ViajesService } from "@/services/viajes.service";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const MapTravel = dynamic(() => import("@/components/driver/mapTravel/MapTravel"), {
	ssr: false, // Evita la renderización en el servidor
});

const TravelDetail = dynamic(() => import("@/components/driver/travelDetail/TravelDetail"), {
	ssr: false, // Evita la renderización en el servidor
});

const idViaje = 3;

export default function page() {

	const handleSolicitarAmbulancia = async () => {
		try {
			await ViajesService.solicitarAmbulancia(idViaje);
			
			toast.success("Ambulancia solicitada exitosamente.");
			
		} catch (error) {
			console.error("Error al solicitar la ambulancia", error);
			toast.error("Hubo un error al solicitar la ambulancia.");
		}
	};

	return (
		<div>
			<ContainerFlex className='containerMarginResposive gap-x-5 mt-[80px] h-[calc(100vh-100px)] py-8'>
				<TravelDetail />
				<MapTravel />
			</ContainerFlex>
			<div className="flex justify-center mb-3 bottom-0 containerMarginResposive">
                <Button onClick={handleSolicitarAmbulancia} variant="contained" color="warning" style={{ fontWeight: 'bold' }} className="flex w-full">
                        SOLICITAR AMBULANCIA
                </Button>
            </div>
		</div>
	);
}
