import HomeCard from "../HomeCard/HomeCard"
import { IoLockClosedOutline } from "react-icons/io5";
import { BsGear } from "react-icons/bs";
import { FiTool, FiTruck } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import './SecondViewHome.css'


export function SecondViewHome(){
    return(
        <section className="home-2">
          <div className="title-home-2">
            <h2>Nuestros servicios</h2>
          </div>
          <div className="line-home"></div>
          <div className="servicios-home-2">
            <HomeCard texto="Seguridad" imagen={<IoLockClosedOutline className="button-icon"/>}/>
            <HomeCard texto="Seguimiento en tiempo real" imagen={<BiMap className="button-icon"/>}/>
            <HomeCard texto="Entrega rapida" imagen={<FiTruck className="button-icon"/>}/>
            <HomeCard texto="Integración fácil con tu negocio" imagen={<BsGear className="button-icon"/>}/>
            <HomeCard texto="Gestión personalizada" imagen={<FiTool className="button-icon"/>}/>
          </div>
        </section>
    )
}