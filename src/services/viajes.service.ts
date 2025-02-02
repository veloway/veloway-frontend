import { Viaje } from "@/entities/viaje";
import axios from "axios";

export class ViajesService {
    static async getAllViajesByConductorId(idConductor: string): Promise<Viaje[]> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/all/conductor/${idConductor}`);

            if (res.status !== 200) throw new Error(res.data.message);

            return res.data
        } catch (error) {
            throw new Error("No se pudo obtener la lista de viajes del conductor");
        }
    }
}