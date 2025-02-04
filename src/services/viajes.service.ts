import { GetAllByConductorID } from "@/entities/viajes/getAllViajeByConductorIdDto";
import { GetViajeDto } from "@/entities/viajes/getViajeDto";
import axios from "axios";

export class ViajesService {
    static async getViajeActual(idConductor: string): Promise<GetViajeDto> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/idConductor/${idConductor}`);
            
            if (res.status !== 200) throw new Error(res.data.message);

            return res.data
        } catch (error) {
            throw new Error("No se pudo obtener un viaje actual de ese conductor");
        }
    }

    

    static async getAllViajesByConductorId(idConductor: string): Promise<GetAllByConductorID[]> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/all/conductor/${idConductor}`);

            if (res.status !== 200) throw new Error(res.data.message);

            return res.data
        } catch (error) {
            throw new Error("No se pudo obtener la lista de viajes del conductor");
        }
    }

    static async getViaje(idViaje: number): Promise<GetViajeDto> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/viajes/idViaje/${idViaje}`);
            
            if(res.status !== 200) throw new Error(res.data.message);

            return res.data
        } catch (error) {
            throw new Error(`No se pudo obtener el viaje de id ${idViaje}`);
        }
    }
}