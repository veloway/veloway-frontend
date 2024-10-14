
import MapTravel from "@/components/driver/mapTravel/MapTravel";
import TravelDetail from "@/components/driver/travelDetail/TravelDetail";
import { ContainerFlex } from "@/components/ui";

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
