import ContainerFlex from "@/components/ui/container-flex/ContainerFlex";
import SinViaje from "@/components/driver/sinViaje/SinViaje"
import Table from "@/components/ui/table/Table";
import { ParsedUrlQuery } from "querystring";

interface driverPageProp {
    params: ParsedUrlQuery
}

export default function DriverHomePage({params}: driverPageProp ) {
    const {id} = params;

  const columns = ["Numero", "Origen", "Destino", "Fecha", "Monto"];
  const data = [
    {
      nro: 1,
      fecha: "28/05/2024 15:33",
      origen: "Plaza Italia",
      destino: "UTN La Plata",
      monto: 500
    },
    {
      nro: 2,
      fecha: "21/09/2024 9:33",
      origen: "Plaza Moreno",
      destino: "UTN La Plata",
      monto: 300
    }
  ]

  return (
    <div className="py-20">
        <ContainerFlex>
            <SinViaje/>
        </ContainerFlex>
        <ContainerFlex>
            <Table title="Historial de viajes" columns={columns}>
                {
                data.map((data) => (
                    <tr>
                        <td className="py-2 px-4 text-center">{data.nro}</td>
                        <td className="py-2 px-4 text-center">{data.origen}</td>
                        <td className="py-2 px-4 text-center">{data.destino}</td>
                        <td className="py-2 px-4 text-center">{data.fecha}</td>
                        <td className="py-2 px-4 text-center">{data.monto}</td>
                    </tr>
                ))
                }
            </Table>
        </ContainerFlex>
    </div>
  )
}