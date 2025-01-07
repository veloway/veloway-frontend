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