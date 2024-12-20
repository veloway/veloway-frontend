//import { Button } from '@/components/ui'
import { PiLightning } from "react-icons/pi";
import './HeaderHome.css';
import Button from '@mui/material/Button'; // Importar botón de Material UI
import Link from "next/link";
export function HeaderHome (){
    return(
        <header className="header-home">
            <nav>
            <ul className="links-header-home">
                <li className="logo-empresa"><PiLightning style={{color: "blue"}}/>Veloway</li>
                <div className="links-header-1">
                    <li><Link href="#">Inicio</Link></li>
                    <li><Link href="/client/dashboard">Realizar Envio</Link></li>
                    <li><Link href="/driver/dashboard">Conductores</Link></li>
                    <li><Link href="#">API</Link></li>
                </div>
                <div className="links-header-2">
                    <li><Link href="/auth/login">Iniciar Sesion</Link></li>
                    <li><Link href="#">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: 'white', 
                                color: 'black', 
                                '&:hover': { backgroundColor: '#f0f0f0' }, 
                                fontFamily: 'Rubik', 
                                textTransform: 'none'
                              }}
                        >
                        Registrarse
                        </Button>
                    </Link></li>
                </div>
            </ul>
            </nav>
      </header>
    )
}