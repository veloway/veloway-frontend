export interface Licencia{
    numero: number,
    categoria: string,
    fechavencimiento: Date,
    id_conductor: string
}

export interface LicenciaDto{
    numero: number,
    categoria: string,
    fechavencimiento: string
}