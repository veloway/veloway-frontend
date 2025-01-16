import { DomicilioDto } from "@/entities/domicilio";

export class DomiciliosService {
    static async getDomicilioByClienteId(clienteId: string): Promise<DomicilioDto | undefined> {
        try {
            // Simulación de una llamada API
            const data: DomicilioDto = await new Promise<DomicilioDto>((resolve) => {
                setTimeout(() => {
                    resolve({
                        calle: '7',
                        numero: 1223,
                        piso: 1,
                        depto: "A",
                        descripcion: "Domicilio de prueba",
                        localidadID: 5,
                    });
                }, 1000);
            });
            return data;
        } catch (error) {
            return undefined;
        }
    }
}
