import { Localidad } from "./localidad";

export interface Domicilio {
    id: string;
    calle: string;
    numero: number;
    localidad: Localidad;
    depto: string | null;
    piso: string | null;
    descripcion?: string | null;
}

export interface DomicilioDto {
    calle: string;
    numero: number;
    descripcion: string | null;
    piso: number | null;
    depto: string | null;
    localidadID: number | null;
}
