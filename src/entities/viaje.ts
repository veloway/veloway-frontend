import { Coordenada, CoordenadaDto } from "./coordenada"
import { Envio, EnvioDto } from "./envio"

export interface Viaje{
    idViaje: number,
    checkpointActual: number,
    fechaInicio: Date | null,
    fechaFin: Date | null,
    idConductor: string,
    envio: Envio,
    origenCord: Coordenada,
    destinoCord: Coordenada
}

export interface ViajeDto {
    idViaje: number
    checkpointActual: number
    fechaInicio: Date | null
    fechaFin: Date | null
    idConductor: string
    envio: EnvioDto
    origenCord: CoordenadaDto
    destinoCord:CoordenadaDto
}