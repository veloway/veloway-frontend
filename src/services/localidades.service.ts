
export class LocalidadesService {

    static async getLocalidades(){
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/localidades`);
            const data = await response.json();
            return data
        }catch(error){
            if (error instanceof Error) {
                console.error(error.message);
            }
            return []
        }
   }
}