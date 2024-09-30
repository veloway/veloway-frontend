import { ReactElement } from "react";
import '@/components/home/HomeCard/HomeCard.css'

interface Props{
    imagen: ReactElement;
    texto: string;
}

export default function HomeCard ({imagen, texto}: Props){
    return(
        <div className="home-card">
            {imagen}
            <p>{texto}</p>
        </div>
    )
}