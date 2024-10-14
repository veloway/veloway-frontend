import { TableComponent } from "@/components/ui";
import { ReactNode } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Pagination } from "@mui/material";
import { clientes } from "@/db/usuarios";
import { dataEnviosTabla } from "@/db/envios";
import { useState } from "react";

interface TableProps {
	columns: string[];
	className?: string;
}


export default function ReservationsTable({columns, className}: TableProps) {

	const user = clientes.find((c) => (c.dni = 43897801));
	const envios = dataEnviosTabla.filter((e) => e.dni === user?.dni);
    const userReservations = envios.filter((e) => e.reserva === true);
    

    const [currentPage, setCurrentPage] = useState<number>(1);
    const rXPage = 3;
    
    const lastReservation = currentPage * rXPage;
    const firstReservation = lastReservation - rXPage;

    const currentReservation = userReservations.slice(firstReservation, lastReservation);

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
                    {currentReservation.map((r, index) => (
                        <tr key={index}>
                            <td className='py-2 px-4 text-start'>{r.origen}</td>
                            <td className='py-2 px-4 text-center'>{r.destino}</td>
                            <td className='py-2 px-4 text-end'>{r.fecha}</td>
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





