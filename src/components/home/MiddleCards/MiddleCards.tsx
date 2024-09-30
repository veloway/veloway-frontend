import HomeCard from "../HomeCard/HomeCard"
import { BiPackage } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import './MiddleCards.css'

export function MiddleCards(){
    return(
        <div className="middle-cards">
          <a href="" className="blue-button"><HomeCard texto="Hacer un envio" imagen={<BiPackage className="button-icon"/>}/></a>
          <a href="" className="blue-button"><HomeCard texto="Seguir mis envios" imagen={<BiMap className="button-icon"/>} /></a>
          <a href="" className="blue-button"><HomeCard texto="Portal de conductores" imagen={<FiTruck className="button-icon"/>} /></a>
        </div>
    )
}