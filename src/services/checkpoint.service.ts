import { CheckpointDto } from "@/entities/checkpoint";
import axios from "axios";

export class CheckpointsService {
    static async create(checkpoint: CheckpointDto): Promise<any> {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/checkpoints/create`,
                checkpoint,
            );

            if (res.status !== 200) throw new Error(res.data.message);
        } catch (error) {
            console.error();           
        }
    }
}