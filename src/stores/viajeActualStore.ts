import { GetViajeDto } from "@/entities/viajes/getViajeDto";
import axios from "axios";
import { create } from "zustand";

interface ViajeActualStore {
    viajeActual: GetViajeDto | null;
    loading: boolean;
    setViajeActual: (viajeActual: GetViajeDto) => void;
    getViajeActual: (idConductor: string) => Promise<void>;
}

export const useViajeActualStore = create<ViajeActualStore>((set) => ({
    viajeActual: null,
    loading: true,
    getViajeActual: async (idConductor: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/idConductor/${idConductor}`);
            
            if (res.status !== 200) throw new Error(res.data.message);
            set({
                viajeActual: res.data, 
                loading: false 
            });
        } catch (error) {
            console.error("Error al obtener el viaje actual:", error);
        }
    },

    setViajeActual: (nuevoViaje) => {
        set((state) => {
            console.log("Actualizando viajeActual manualmente con:", nuevoViaje);
            return { viajeActual: nuevoViaje };
        });
    },
}));