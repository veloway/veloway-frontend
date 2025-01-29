import { PRECIO_CADA_100_GRAMOS } from "@/types/constants"

export const calcularPrecioEnvio = (peso: number) => {
    return peso * PRECIO_CADA_100_GRAMOS / 100; 
}