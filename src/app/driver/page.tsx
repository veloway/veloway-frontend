
import ContainerFlex from "@/components/ui/container-flex/ContainerFlex";
import Header from "@/components/ui/header/Header";
import SinViaje from "@/components/driver/sinViaje/SinViaje"

export default function DriverHomePage() {
  return (
    <div>
      <Header/>
      <ContainerFlex>
          <SinViaje/>
          
      </ContainerFlex>
    </div>
  )
}
