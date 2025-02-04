export interface FichaMedica {
    id: number,
    altura: number,
    peso: number,
    enfermedadCardiaca: string | null,
    enfermedadRespiratoria: string | null,
    alergias: string | null,
    epilepsia: boolean,
    diabetes: boolean,
    compartirFichaMedica: boolean,
    id_conductor: string
}

export interface FichaMedicaDto{
    altura: number,
    peso: number,
    enfermedadCardiaca: string | null,
    enfermedadRespiratoria: string | null,
    alergias: string | null,
    epilepsia: boolean,
    diabetes: boolean,
    compartirFichaMedica: boolean,
}