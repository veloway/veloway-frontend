import { ContainerFlex } from "@/components/ui";
import dynamic from 'next/dynamic';

const MapTravel = dynamic(() => import('@/components/driver/mapTravel/MapTravel'), {
  ssr: false, // Evita la renderización en el servidor
});

const TravelDetail = dynamic(() => import('@/components/driver/travelDetail/TravelDetail'), {
  ssr: false, // Evita la renderización en el servidor
});

export default function page() {
  return (
    <div>
        <ContainerFlex className="py-40 gap-5">
            <TravelDetail/>
            <MapTravel/> 
        </ContainerFlex>
    </div>
  )
}
