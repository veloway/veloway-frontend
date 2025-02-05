import axios from 'axios'

export class ModelosService {
    static async getModelos(marcaId:number){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/modelos/marcaId/${marcaId}`);
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