import { Button } from '@/components/ui'
import { PiLightning } from "react-icons/pi";
import './HeaderHome.css'

export function HeaderHome (){
    return(
        <header className="header-home">
            <nav>
            <ul className="links-header-home">
                <li className="logo-empresa"><PiLightning style={{color: "blue"}}/>Veloway</li>
                <div className="links-header-1">
                    <li><a href="">Inicio</a></li>
                    <li><a href="">Realizar Envio</a></li>
                    <li><a href="">Conductores</a></li>
                    <li><a href="">API</a></li>
                </div>
                <div className="links-header-2">
                    <li><a href="">Iniciar Sesion</a></li>
                    <li><a href=""><Button bgColor='white' textColor='black'>Registrarse</Button></a></li>
                </div>
            </ul>
            </nav>
      </header>
    )
}