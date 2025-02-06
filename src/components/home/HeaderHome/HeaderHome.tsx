"use client";
import { PiLightning } from "react-icons/pi";
import './HeaderHome.css';
import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button';
import Link from "next/link";
import ToggleMenu from "../ToggleMenu/ToggleMenu";


const HeaderButton = styled(Button)({
    textTransform: 'none',
    fontSize: 16,
    fontFamily: "var(--font-rubik)",
    backgroundColor: "white",
    color: "var(--foreground)",
    '&:hover': { backgroundColor: '#f0f0f0' }
})

export function HeaderHome (){
    return(
        <header className="header-home">
            <nav>
                <ul className="links-header-home">
                    <li className="logo-empresa">Veloway</li>
                    <div className="links-header-1">
                        <li><Link href="#">Inicio</Link></li>
                        <li><Link href="/client/dashboard">Realizar Envio</Link></li>
                        <li><Link href="/driver/dashboard">Conductores</Link></li>
                        <li><Link href="#">API</Link></li>
                    </div>
                    <div className="links-header-2">
                        <li><a href="/auth/login">Iniciar Sesion</a></li>
                        <li>
                            <a href="/auth/clientRegister">
                                <HeaderButton variant="contained">Registrarse</HeaderButton>
                            </a>
                        </li>
                    </div>
                    <div className="menu-hamburguesa">
                        <ToggleMenu></ToggleMenu>
                    </div>
                </ul>
            </nav>
      </header>
    )
}
