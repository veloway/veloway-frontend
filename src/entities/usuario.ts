export interface Usuario{
    id: string,
    dni: string,
    email: string,
    password: string,
    fechaNac: string,
    nombre: string,
    apellido: string,
    esConductor: boolean,
    telefono?: string | null,
}

export interface UsuarioDto{
    dni: number,
    email: string,
    fechaNac: Date,
    nombre: string,
    apellido: string,
    esConductor: boolean,
    telefono?: string | null,
    apiKey: string
}