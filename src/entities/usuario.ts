export interface Usuario{
    id: string,
    dni: number,
    email: string,
    password: string,
    fechaNac: Date,
    nombre: string,
    apellido: string,
    esConductor: boolean,
    telefono?: string | null,
}