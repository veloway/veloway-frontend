"use client";
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Skeleton, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        estado: '',
        fechaDesde: '',
        fechaHasta: '',
        horaDesde: '',
        horaHasta: '',
        descripcion: '',
    });

    useEffect(() => {
        setLoading(true);
        EnviosService.getAllByClienteIdPagination('123e4567-e89b-12d3-a456-426614174000', page, filters).then((data) => {
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
    }, [page, filters]);

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name as string]: value,
        });
    };

    return (
        <div className='w-full'>
            <header className='bg-primary shadow py-4'>
                <div className='containerMarginResposive'>
                    <div className='flex flex-col gap-2 text-white'>
                        <h1 className='text-[30px] font-semibold'>Historial de envíos</h1>
                    </div>
                </div>
            </header>
            <div className='containerMarginResposive mt-4'>
                <div className='flex gap-4 mb-4 bg-white p-4 rounded shadow'>
                    <FormControl variant="outlined" className='w-1/4'>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            name="estado"
                            value={filters.estado}
                            onChange={handleFilterChange}
                            label="Estado"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Entregado">Entregado</MenuItem>
                            <MenuItem value="En traslado a destino">En traslado a destino</MenuItem>
                            <MenuItem value="En proceso de retiro">En proceso de retiro</MenuItem>
                            <MenuItem value="Confirmado">Confirmado</MenuItem>
                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="fechaDesde"
                        label="Fecha Desde"
                        type="date"
                        value={filters.fechaDesde}
                        onChange={handleFilterChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='w-1/4'
                    />
                    <TextField
                        name="fechaHasta"
                        label="Fecha Hasta"
                        type="date"
                        value={filters.fechaHasta}
                        onChange={handleFilterChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='w-1/4'
                    />
                    <TextField
                        name="horaDesde"
                        label="Hora Desde"
                        type="time"
                        value={filters.horaDesde}
                        onChange={handleFilterChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='w-1/4'
                    />
                    <TextField
                        name="horaHasta"
                        label="Hora Hasta"
                        type="time"
                        value={filters.horaHasta}
                        onChange={handleFilterChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='w-1/4'
                    />
                    <TextField
                        name="descripcion"
                        label="Descripción"
                        value={filters.descripcion}
                        onChange={handleFilterChange}
                        className='w-1/4'
                    />
                </div>
            </div>
            <div className='containerMarginResposive mt-4'>
                <TableContainer component={Paper} className=''>
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
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
                                        <TableCell><Skeleton variant="text" className='h-9'/></TableCell>
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
                                                                    : shipment.estado === "Cancelado"
                                                                        ? "bg-gray-100 text-gray-800"
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
            </div>
        
            <Pagination 
                count={pagination.lastPage}
                page={page} 
                color="primary" 
                className='containerMarginResposive my-8 flex justify-center items-center'
                shape='rounded'
                showFirstButton
                showLastButton
                onChange={(event, value) => handlePageChange(value)}
            />
        </div>
    );
};

export default AllShipmentsPage;
