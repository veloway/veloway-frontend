import { Marca } from "./marcas";

export interface Modelo {
    id: number,
    nombre: string,
    marca: Marca
}