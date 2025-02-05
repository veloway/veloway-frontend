
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
            console.log("Llamando a la API...");
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/idConductor/${idConductor}`);
            
            if (res.status !== 200) throw new Error(res.data.message);
            set((state) => {
                console.log("✅ Estado antes de actualizar:", state.viajeActual);
                console.log("🆕 Nuevos datos recibidos:", res.data);
                return { viajeActual: res.data, loading: false };
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


// export const useViajeActualStore = create<ViajeActualStore>((set) => ({
//     viajeActual: null,
//     getViajeActual: async (idConductor: string) => {
//         try {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/idConductor/${idConductor}`);
            
//             if (res.status !== 200) throw new Error(res.data.message);
    
//             set({ viajeActual: res.data, });
//         } catch (error) {
//             console.error("No se pudo obtener un viaje actual de ese conductor");
//         };
//     },
//     setViajeActual: (nuevoViaje) => set({ viajeActual: nuevoViaje }),
// }));

