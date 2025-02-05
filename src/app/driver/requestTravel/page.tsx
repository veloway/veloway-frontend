import { ContainerFlex } from "@/components/ui";
import dynamic from "next/dynamic";

const MapTravel = dynamic(() => import("@/components/driver/mapTravel/MapTravel"), {
	ssr: false, // Evita la renderización en el servidor
});

const TravelDetail = dynamic(() => import("@/components/driver/travelDetail/TravelDetail"), {
	ssr: false, // Evita la renderización en el servidor
});

export default function page() {
	return (
		<div>
			<ContainerFlex className='containerMarginResposive gap-5 mt-[80px] h-[calc(100vh-284px)] py-8'>
				<TravelDetail />
				<MapTravel />
			</ContainerFlex>
		</div>
	);
}
