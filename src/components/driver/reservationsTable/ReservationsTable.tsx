import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState } from "react";
import { GetAllByConductorIDDto } from "@/entities/viajes/getAllViajeByConductorIdDto";

interface TableProps {
	columns: string[];
	className?: string;
  userReservations: GetAllByConductorIDDto[];
  loading: boolean;
}

export default function ReservationsTable({ columns, className, userReservations, loading }: TableProps) {
	const idConductor = "987f6543-e21c-54d3-b789-426614174001";

	const [currentPage, setCurrentPage] = useState<number>(1);
	const rXPage = 5;

	const lastReservation = currentPage * rXPage;
	const firstReservation = lastReservation - rXPage;

	const tripsReserved = userReservations.slice(firstReservation, lastReservation);

	const handlePagChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	return (
		<div className='bg-white rounded-md shadow-lg'>
			<div className='bg-primary px-6 py-4 rounded-t-md'>
				<h2 className='text-2xl font-semibold text-white flex items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 mr-2'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
					Próximas Reservas
				</h2>
			</div>
      <div className="flex flex-col justify-between">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Origen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className='h-4 bg-gray-300 rounded w-32 animate-pulse'></div>
                    </TableCell>
                    <TableCell>
                      <div className='h-4 bg-gray-300 rounded w-24 animate-pulse'></div>
                    </TableCell>
                    <TableCell>
                      <div className='h-4 bg-gray-300 rounded w-48 animate-pulse'></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                tripsReserved.map((r) => (
                  <TableRow key={r.idViaje}>
                    <TableCell>{r.envio.cliente.nombre} {r.envio.cliente.apellido}</TableCell>
                    <TableCell>{r.fechaInicio}</TableCell>
                    <TableCell>{r.envio.origen.calle} {r.envio.origen.numero} {r.envio.origen.localidad.nombre} {r.envio.origen.localidad.provincia.nombre}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex justify-center mt-3'>
          <Pagination
            count={Math.ceil(userReservations.length / rXPage)}
            page={currentPage}
            onChange={handlePagChange}
            color='primary'
          />
        </div>
      </div>
		</div>
	);
}
