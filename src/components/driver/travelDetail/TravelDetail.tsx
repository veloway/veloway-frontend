import { Button } from "@/components/ui";
import { FaLocationDot } from "react-icons/fa6";


export default function TravelDetail() {
  return (
    <div className="bg-primary p-6 h-[450px]">
        <div className=" flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
            <FaLocationDot />
            <p> Calle 7 N° 3695</p>
        </div>
        <div className="flex gap-2 bg-secondary items-center p-2 rounded-lg mb-3">
            <FaLocationDot />
            <p> Calle 7 N° 3695</p>
        </div>
        <div className="flex flex-col gap-2 bg-secondary p-2 rounded-lg">
            {/* Primer paso */}
            <div className="flex gap-8 justify-between w-full p-2">
                <p>En proceso <br/> de retiro</p>
                <Button>CONFIRMAR</Button>
            </div>
            {/* Segundo paso */}
            <div className="flex gap-8 justify-between w-full p-2">
                <p>En translado <br/> a destino</p>
                <Button>CONFIRMAR</Button>
            </div>
            {/* Tercer paso */}
            <div className="flex gap-8 justify-between w-full p-2">
                <p>Entregado</p>
                <Button>CONFIRMAR</Button>
            </div>
        </div>
        <div className="flex justify-center mt-8">
            <Button className="flex bg-secondary w-full !text-primary" >Siguiente Checkpoint</Button>
        </div>
    </div>
  )
}
