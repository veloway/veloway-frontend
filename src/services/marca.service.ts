import axios from 'axios'

export class MarcasService {
    static async getMarcas(){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/marcas`);
            console.log(res)
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