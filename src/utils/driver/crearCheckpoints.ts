import { checkpoints } from "@/components/driver/mapTravel/Routing";
import { CheckpointDto } from "@/entities/checkpoint";
import { CheckpointsService } from "@/services/checkpoint.service";


export async function crearCheckpoints(idViaje: number) {
    for (let i = 0; i < checkpoints.length; i++) {
        const [latitud, longitud] = checkpoints[i];

        const nuevoCheckpoint: CheckpointDto = {
            numero: i + 1,
            idViaje: idViaje,
            latitud: latitud,
            longitud: longitud
        }

        console.log(nuevoCheckpoint);
        
        try {
            console.log("Creando checkpoint", );
            await CheckpointsService.create(nuevoCheckpoint)
        } catch (error) {
            console.error("No se pudo crear el checkpoint", nuevoCheckpoint, error);
        }
    }
}
