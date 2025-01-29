import { Provincia } from "./provincia";

export interface Localidad {
    id: number;
    codigoPostal: string;
    nombre: string;
    provincia: Provincia
}