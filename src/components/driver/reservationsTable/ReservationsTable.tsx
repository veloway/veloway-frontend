import { ReactNode, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Pagination } from "@mui/material";
import { useState } from "react";
import { ViajesService } from "@/services/viajes.service";
import { GetAllByConductorIDDto } from "@/entities/viajes/getAllViajeByConductorIdDto";

interface TableProps {
	columns: string[];
	className?: string;
}


export default function ReservationsTable({columns, className}: TableProps) {

    const idConductor = "987f6543-e21c-54d3-b789-426614174001"

    const [userReservations, setUserReservations] = useState<GetAllByConductorIDDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!idConductor) return

        setLoading(true)

        ViajesService.getAllViajesByConductorId(idConductor).then((data) => {   
            
            setUserReservations(
                data.filter(
                    (reserva) =>
                        reserva.envio.reserva === true
                ),
            )
        }).catch((error) => {
			console.error(error); 
		  })
		  .finally(() => {
			setLoading(false);
		  });
    }, [idConductor])

    const [currentPage, setCurrentPage] = useState<number>(1);
    const rXPage = 5;
    
    const lastReservation = currentPage * rXPage;
    const firstReservation = lastReservation - rXPage;

    const tripsReserved = userReservations.slice(firstReservation, lastReservation);

    const handlePagChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    };

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#1565c0] px-6 py-4">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Próximas Reservas
        </h2>
      </div>
      <div className="overflow-x-auto flex flex-col justify-between items-center">
      {loading ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Origen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tripsReserved.map((r) => (
              <tr key={r.idViaje} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.envio.cliente.nombre} {r.envio.cliente.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.fechaInicio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.envio.origen.calle} {r.envio.origen.numero} {r.envio.origen.localidad.nombre} {r.envio.origen.localidad.provincia.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        <div className=''>
             <Pagination 
                 count={Math.ceil(userReservations.length / rXPage)} 
                 page={currentPage}
                 onChange={handlePagChange} 
                 color='primary' 
             />
        </div>
      </div>
    </div>
    )

//   return (
//     <div className="flex justify-between items-center flex-col w-full px-8 py-9">
//       <TableContainer component={Paper} className={`${className}`}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((column, index) => (
//                 <TableCell key={index} className="text-qaternary font-bold py-2 px-4 text-center">
//                   {column}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               // Skeleton loading rows
//               <tr>
//                 <td colSpan={columns.length} className="py-2 px-4">
//                   <div className="flex flex-col gap-3">
//                     <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
//                     <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
//                     <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               // Show actual rows once loading is done
//               tripsReserved.map((r, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-4 text-start">
//                     {`${r.envio.origen.calle} N°${r.envio.origen.numero}, ${r.envio.origen.localidad.nombre}`}
//                   </td>
//                   <td className="py-2 px-4 text-center">
//                     {`${r.envio.destino.calle} N°${r.envio.origen.numero}, ${r.envio.origen.localidad.nombre}`}
//                   </td>
//                   <td className="py-2 px-4 text-end">{r.fechaInicio}</td>
//                 </tr>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//         <div className='flex justify-center mt-3'>
//             <Pagination 
//                 count={Math.ceil(userReservations.length / rXPage)} 
//                 page={currentPage}
//                 onChange={handlePagChange} 
//                 color='primary' 
//             />
//         </div>
//     </div>
//   )
}