"use client"

import { FaLocationDot } from "react-icons/fa6";
import { useCarAdvance } from '@/utils/driver/carAdvance'; // Usa el custom hook
import Button from "@mui/material/Button";
import VerticalLinearStepper from "@/components/ui/verticalStepper/VerticalStepper";

export default function TravelDetail() {
    //TODO: CORREGIR PORQUE TIRA ERROR EN EL BUILD
    const { currentCheckpoint, moveCarToNextCheckpoint } = useCarAdvance();  // Usamos el hook para gestionar el avance

    return (
        <div className=" flex flex-col bg-primary p-6 h-[450px] rounded-md justify-around">
            {/* h-[450px] */}
            <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
                <FaLocationDot />
                <p> Plaza Moreno, La Plata</p>
            </div>
            <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
                <FaLocationDot />
                <p> UTN FRLP, La Plata</p>
            </div>
    
            <div className="flex flex-col gap-2 bg-secondary p-2 rounded-lg w-[300px]">
                <VerticalLinearStepper />
            </div>
            
            <div className="flex justify-center mt-3 bottom-0">
                <Button onClick={moveCarToNextCheckpoint} variant="contained" color="secondary" style={{ fontWeight: 'bold' }}   className="flex w-full">
                    Siguiente Checkpoint
                </Button>
            </div>
        </div>
    );
}

