"use client"

import { FaLocationDot } from "react-icons/fa6";
import { useCarAdvance } from '@/utils/driver/carAdvance'; // Usa el custom hook
import Button from "@mui/material/Button";
import VerticalLinearStepper from "@/components/ui/verticalStepper/VerticalStepper";
import { GetViajeDto } from "@/entities/viajes/getViajeDto";
import { useEffect, useState } from "react";
import { ViajesService } from "@/services/viajes.service";
import { EnviosService } from "@/services/envios.service";
import { EstadoEnvioEnum } from "@/types/enums";
import { Skeleton } from "@mui/material";

export default function TravelDetail() {
    const numeroSeguimiento = 46280958 
    const idViaje = 1

    const [viajeActual, setViajeActual] = useState<GetViajeDto | null>(null)
    
    const { currentCheckpoint, moveCarToNextCheckpoint } = useCarAdvance();  // Usamos el hook para gestionar el avance
    
    useEffect(() => {
        if (!idViaje) return
        
        ViajesService.getViaje(idViaje).then((data) => {
            if (data) setViajeActual(data)
            }).catch(error => {
        console.error(error);
    })}, [idViaje]);

    //handleUpdateCheckpointActual de mover el checkpoint
    const handleUpdateCheckpointActual = async () => {
        let checkpointActual = currentCheckpoint;
        let nuevoCheckpointActual = checkpointActual + 2;
        
        try {
            await ViajesService.updateCheckpointActual(idViaje, nuevoCheckpointActual)
            console.log("Checkpoint actual actualizado correctamente");
            
        } catch (error) {
            console.error("Error al actualizar el checkpoint")
        }
    }

    const handleUpdateEstadoEnvio = async () => {
        const nuevoEstado = EstadoEnvioEnum.EnProcesoDeRetiro;      

        try {
          await EnviosService.updateEstadoEnvio(numeroSeguimiento, nuevoEstado);
          console.log("Estado del envío actualizado correctamente.");
        } catch (error) {
          console.error("Error al actualizar el estado del envío:", error);
        }
    };

    return (
        <>
        {!viajeActual ? (
            <div className="flex flex-col bg-primary p-6 h-full w-[450px] rounded-md justify-around">
                <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
                    <Skeleton variant="rectangular" width={300} height={40} />
                </div>
                <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
                    <Skeleton variant="rectangular" width={300} height={40} />
                </div>
                <div className="flex flex-col gap-2 bg-secondary p-2 rounded-lg">
                    <div className="flex justify-center mt-3 mb-3 bottom-0">
                        <Skeleton variant="rectangular" width="100%" height={40} />
                    </div>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                </div>
                <div className="flex justify-center mt-3 bottom-0">
                    <Skeleton variant="rectangular" width="100%" height={40} />
                </div>
            </div>
        ) : (
            <div className="flex flex-col bg-primary p-6 h-full w-[450px] rounded-md justify-around">
                <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
                    <FaLocationDot />
                    <p>{`${viajeActual?.envio.origen.calle} N°${viajeActual?.envio.origen.numero}, ${viajeActual?.envio.origen.localidad.nombre} ${viajeActual?.envio.origen.localidad.provincia.nombre}`}</p>
                </div>
                <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
                    <FaLocationDot />
                    <p>{`${viajeActual?.envio.destino.calle} N°${viajeActual?.envio.destino.numero}, ${viajeActual?.envio.destino.localidad.nombre} ${viajeActual?.envio.destino.localidad.provincia.nombre}`}</p>
                </div>
        
                <div className="flex flex-col gap-2 bg-secondary p-2 rounded-lg">
                    <div className="flex justify-center mt-3 mb-3 bottom-0">
                        <Button onClick={handleUpdateEstadoEnvio} variant="contained" color="primary" style={{ fontWeight: 'bold' }} className="flex w-full">
                            Comenzar viaje
                        </Button>
                    </div>
                    <VerticalLinearStepper />
                </div>
        
                <div className="flex justify-center mt-3 bottom-0">
                    <Button
                        onClick={() => { 
                            moveCarToNextCheckpoint();
                            handleUpdateCheckpointActual();
                          }}
                        variant="contained" 
                        color="secondary" 
                        style={{ fontWeight: 'bold' }} 
                        className="flex w-full">
                        Siguiente Checkpoint
                    </Button>
                </div>
            </div>
        )}
        </>
    );
}