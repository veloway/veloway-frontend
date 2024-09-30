
import ContainerFlex from "@/components/ui/container-flex/ContainerFlex";
import Header from "@/components/ui/header/Header";
import SinViaje from "@/components/driver/sinViaje/SinViaje"
import Table from "@/components/ui/table/Table";

export default function DriverHomePage() {

  const columns = ["Numero", "Fecha y hora", "Origen", "Destino", "Monto"];
  const data = [
    {
      nro: 2,
      fecha: "28/05/2024 15:33",
      origen: "Plaza Italia",
      destino: "UTN La Plata",
      monto: 500
    },
    {
      nro: 2,
      fecha: "21/09/2024",
      origen: "Plaza Moreno",
      destino: "UTN La Plata",
      monto: 300
    }
  ]

  return (
    <div>
      <Header/>
      <ContainerFlex>
          <SinViaje/>
      </ContainerFlex>
      <ContainerFlex>
          <Table title="Historial de viajes" columns={columns} data={data}/>
      </ContainerFlex>
    </div>
  )
}
