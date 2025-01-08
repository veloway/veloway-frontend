import { Domicilio } from "./domicilio";
import { EstadoEnvio } from "./envio-estado";
import { Usuario } from "./usuario";

export interface Envio{
    nroSeguimiento: number,
    descripcion: string, 
    fecha: string,
    hora: string, 
    pesoGramos: number,
    monto: number,
    reserva: boolean
    estado: EstadoEnvio,
    origen: Domicilio,
    destino: Domicilio
    cliente: Usuario
}