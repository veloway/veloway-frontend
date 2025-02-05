
import { GetViajeDto } from "@/entities/viajes/getViajeDto";
import axios from "axios";
import { create } from "zustand";

interface ViajeActualStore {
    viajeActual: GetViajeDto | null;
    setViajeActual: (viajeActual: GetViajeDto) => void;
}

export const useViajeActualStore = create<ViajeActualStore>((set) => ({
    viajeActual: null,
    getViajeActual: async (idConductor: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/idConductor/${idConductor}`);
    
            if (res.status !== 200) throw new Error(res.data.message);
    
            set({ viajeActual: res.data, });
        } catch (error) {
            console.error("No se pudo obtener un viaje actual de ese conductor");
        };
    },
    setViajeActual: (nuevoViaje) => set({ viajeActual: nuevoViaje }),
}));