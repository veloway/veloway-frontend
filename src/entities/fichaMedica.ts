export interface FichaMedica {
    altura: number,
    peso: number,
    enfermedadCardiaca: string | null,
    enfermedadRespiratoria: string | null,
    alergias: string | null,
    epilepsia: boolean,
    diabetes: boolean,
    compartir: boolean
}