import { API_URL } from "@/config/envs";

export class LocalidadesService {
    static async getLocalidades(){
        console.log(API_URL)    
        const response = await fetch(`http://localhost:3001/api/localidades`);
        const data = await response.json();

        return data
    }
}