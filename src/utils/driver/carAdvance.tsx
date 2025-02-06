import { useState, useEffect } from 'react';
import { carMarker, checkpoints, destino } from '@/components/driver/mapTravel/Routing';
import { CheckpointsService } from '@/services/checkpoint.service';

export const useCarAdvance = () => {
    const [currentCheckpoint, setCurrentCheckpoint] = useState(0);

    useEffect(() => {
        if (checkpoints.length > 0) {
            carMarker?.setLatLng(checkpoints[0]);
        }
    }, []);

    const moveCarToNextCheckpoint = () => {
        if (currentCheckpoint < checkpoints.length) {
            // Mueve el marcador del auto al checkpoint actual
            carMarker?.setLatLng(checkpoints[currentCheckpoint]);
            carMarker?.setOpacity(1);
            // Avanza al siguiente checkpoint
            setCurrentCheckpoint(currentCheckpoint + 1);
        } else {
            // Mueve el coche al destino al terminar todos los checkpoints
            carMarker?.setLatLng(destino);
        }
    };

    return { currentCheckpoint, moveCarToNextCheckpoint };
};


