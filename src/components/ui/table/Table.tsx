import Button from "../button/Button";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import ContainerFlex from "../container-flex/ContainerFlex";

interface IData {
  id: number;
  destino: string;
  estado: string;
  fecha: string;
}

interface TableProps { 
  colums: string[];
  tableName: string;
  data: IData[];
}
export default function Table({colums, tableName, data} : TableProps) {

	return (
		<div className="pt-16">
			<ContainerFlex className='justify-between gap-4 pb-3'>
        <h4 className="text-2xl font-medium">{tableName}</h4>
        <ContainerFlex className="gap-4">
          <Button
            variant="secondary"
            className='!rounded-full !p-0 transform border-2'
            icon={<IoIosArrowDropleftCircle className='text-3xl' />}>
            {" "}
          </Button>
          <span>
            Pagina {1} de {4}
          </span>
          <Button
            variant="secondary"
            className='!rounded-full !p-0 transform border-2'
            icon={<IoIosArrowDroprightCircle className='text-3xl' />}>
            {" "}
          </Button>
        </ContainerFlex>
			</ContainerFlex>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <table className="w-full">
          <thead>
            <tr>
              {colums.map((column) => (
                <th key={column} className="text-start py-4">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="py-4 border-t-[1px] border-quaternary">{row.id}</td>
                <td className="py-4 border-t-[1px] border-quaternary">{row.destino}</td>
                <td className="py-4 border-t-[1px] border-quaternary">{row.estado}</td>
                <td className="py-4 border-t-[1px] border-quaternary">{row.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
		</div>
	);
}
