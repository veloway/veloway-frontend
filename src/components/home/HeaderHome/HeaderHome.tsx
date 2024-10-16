//import { Button } from '@/components/ui'
import { PiLightning } from "react-icons/pi";
import './HeaderHome.css';
import Button from '@mui/material/Button'; // Importar botón de Material UI
export function HeaderHome (){
    return(
        <header className="header-home">
            <nav>
            <ul className="links-header-home">
                <li className="logo-empresa"><PiLightning style={{color: "blue"}}/>Veloway</li>
                <div className="links-header-1">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="/client/dashboard">Realizar Envio</a></li>
                    <li><a href="/driver/dashboard">Conductores</a></li>
                    <li><a href="#">API</a></li>
                </div>
                <div className="links-header-2">
                    <li><a href="/auth/login">Iniciar Sesion</a></li>
                    <li><a href="#">
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
                    </a></li>
                </div>
            </ul>
            </nav>
      </header>
    )
}