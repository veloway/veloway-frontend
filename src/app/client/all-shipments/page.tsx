"use client";
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Skeleton } from '@mui/material';
import { EnviosService } from '@/services/envios.service';
import { GetEnvioDto } from '@/entities/envios/getEnvioDto';
import Link from 'next/link';

const AllShipmentsPage = () => {
    const [shipments, setShipments] = useState<GetEnvioDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        totalEnvios: 0,
        lastPage: 0,
        previusPage: 0,
        nextPage: 0,
    });

    useEffect(() => {
        EnviosService.getAllByClienteId('123e4567-e89b-12d3-a456-426614174000').then((data) => {
            const { envios, totalEnvios, lastPage, previusPage, nextPage } = data;
            setShipments(envios);
            setPagination({
                totalEnvios,
                lastPage,
                previusPage,
                nextPage,
            });
            setLoading(false);
        });
    }, []);

    return (
        <div className='w-full'>
            <header className='bg-primary shadow'>
                <div className='containerMarginResposive'>
                    <div className='flex flex-col gap-2 text-white'>
                        <h1 className='text-[30px] font-semibold'>Todos los envíos</h1>
                    </div>
                </div>
            </header>
            <TableContainer component={Paper} className='containerMarginResposive'>
                <Table>
                    <TableHead className='w-full'>
                        <TableRow>
                            <TableCell className='font-bold'>#</TableCell>
                            <TableCell className='font-bold'>Nro de seguimiento</TableCell>
                            <TableCell className='font-bold'>Fecha y Hora</TableCell>
                            <TableCell className='font-bold'>Destino</TableCell>
                            <TableCell className='font-bold'>Origen</TableCell>
                            <TableCell className='font-bold'>Descripción</TableCell>
                            <TableCell className='font-bold'>Estado</TableCell>
                            <TableCell className='font-bold'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            shipments.map((shipment, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className='font-bold'>{shipment.nroSeguimiento}</TableCell>
                                    <TableCell>{shipment.fecha} {shipment.hora}</TableCell>
                                    <TableCell>{shipment.destino.calle} {shipment.destino.numero} {shipment.destino.piso && `, Piso ${shipment.destino.piso}`} {shipment.destino.depto && `Dto ${shipment.destino.depto }`} , {shipment.destino.localidad.nombre} - {shipment.destino.localidad.provincia.nombre}</TableCell>
                                    <TableCell>
                                        {shipment.origen.calle} {shipment.origen.numero} {shipment.origen.piso && `, Piso ${shipment.origen.piso}`} {shipment.origen.depto && `Dto ${shipment.origen.depto }`} , {shipment.origen.localidad.nombre} - {shipment.origen.localidad.provincia.nombre}
                                    </TableCell>
                                    <TableCell>{shipment.descripcion}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                shipment.estado === "Entregado"
                                                    ? "bg-green-100 text-green-800"
                                                    : shipment.estado === "En traslado a destino"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : shipment.estado === "En proceso de retiro"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : shipment.estado === "Confirmado"
                                                                ? "bg-purple-100 text-purple-800"
                                                                : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {shipment.estado}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            LinkComponent={Link}
                                            href={`/client/shipment/${shipment.nroSeguimiento}`}
                                        >
                                            Ver
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        
            <Pagination 
                count={pagination.lastPage}
                defaultPage={1} 
                color="primary" 
                className='containerMarginResposive mt-4 flex justify-center items-center'
                shape='rounded'
                showFirstButton
                showLastButton
            />
        </div>
    );
};

export default AllShipmentsPage;
