import axios from 'axios'

export class LocalidadesService {
    static async getLocalidades(){
        try{
            const res = await axios.get(`http://localhost:3001/api/localidades`);
            if (res.status !== 200) throw new Error(res.data.message);
            
            return res.data;
        }catch(error){
            if (error instanceof Error) {
                console.error(error.message);
            }
            return []
        }
   }
}