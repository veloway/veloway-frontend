import { TableComponent } from "@/components/ui";
import { ReactNode, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Pagination } from "@mui/material";
import { clientes } from "@/db/usuarios";
import { dataEnviosTabla } from "@/db/envios";
import { useState } from "react";
import { ViajesService } from "@/services/viajes.service";
import { GetAllByConductorID } from "@/entities/viajes/getAllViajeByConductorIdDto";

interface TableProps {
	columns: string[];
	className?: string;
}


export default function ReservationsTable({columns, className}: TableProps) {

	const user = clientes.find((c) => (c.dni = 43897801));
	const envios = dataEnviosTabla.filter((e) => e.dni === user?.dni);
    // const userReservations = envios.filter((e) => e.reserva === true);
    const idConductor = "987f6543-e21c-54d3-b789-426614174001"

    const [userReservations, setUserReservations] = useState<GetAllByConductorID[]>([]);

    useEffect(() => {
        if(!idConductor) return

        ViajesService.getAllViajesByConductorId(idConductor).then((data) => {   
            
            setUserReservations(
                data.filter(
                    (reserva) =>
                        reserva.envio.reserva === true
                ),
            )
            

        });
    })

    const [currentPage, setCurrentPage] = useState<number>(1);
    const rXPage = 3;
    
    const lastReservation = currentPage * rXPage;
    const firstReservation = lastReservation - rXPage;

    const tripsReserved = userReservations.slice(firstReservation, lastReservation);

    const handlePagChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    };


  return (
    <div>
        {/* <TableComponent columns={columnsReservations} styleTableContainer="rounded-none shadow-none">
            {currentReservation.map((r, index) => (
                <tr key={index}>
                    <td className='py-2 px-4 text-center'>{r.origen}</td>
                    <td className='py-2 px-4 text-center'>{r.destino}</td>
                    <td className='py-2 px-4 text-center'>{r.fecha}</td>
                </tr>
            ))}
        </TableComponent> */}
        <TableContainer component={Paper} className={`${className}`}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell key={index} className='text-qaternary font-bold py-2 px-4 text-center'>{column}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
                    {tripsReserved.map((r, index) => (
                        <tr key={index}>
                            <td className='py-2 px-4 text-start'>{`${r.envio.origen.calle} N°${r.envio.origen.numero}, ${r.envio.origen.localidad.nombre}`}</td>
                            <td className='py-2 px-4 text-center'>{`${r.envio.destino.calle} N°${r.envio.origen.numero}, ${r.envio.origen.localidad.nombre}`}</td>
                            <td className='py-2 px-4 text-end'>{r.fechaInicio}</td>
                        </tr>
                    ))}
					</TableBody>
				</Table>
			</TableContainer>
        <div className='flex justify-center'>
            <Pagination 
                count={Math.ceil(userReservations.length / rXPage)} 
                page={currentPage}
                onChange={handlePagChange} 
                color='primary' 
            />
        </div>
    </div>
  )
}





