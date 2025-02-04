import { Modelo } from './modelo';
import { TipoVehiculo } from './tipoVehiculo';
import { EstadoVehiculo } from './estadoVehiculo';

export interface Vehiculo{
    idVehiculo: number,
    patente: string,
    modelo: Modelo,
    tipoVehiculo: TipoVehiculo,
    anio: string,
    estado: EstadoVehiculo,
    titular: { nombre: string, documento: string },
    color: string,
    descripcion: string,
    nomSeguro: string
}

export interface VehiculoDto{
    patente: string,
    modelo: string,
    tipoVehiculo: string,
    anio: string,
    estado: string,
    titular: { nombre: string, documento: string },
    color: string,
    descripcion: string,
    nomSeguro: string
}