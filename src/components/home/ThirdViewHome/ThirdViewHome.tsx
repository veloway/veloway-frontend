//import Button from "@/components/ui/button/Button"
import Button from '@mui/material/Button'; // Importar botón de Material UI
import './ThirdViewHome.css'

export function ThirdViewHome(){
    return(
        <section className="home-3">
          <div className="text-home-3">
            <img src="/images/8955299.webp" alt="Logo" />
            <h2>Únete a Nuestro Equipo de <br />
            Conductores</h2>
            <p>Sé parte de una red de profesionales en crecimiento. <br /> 
            Flexibilidad, buenas ganancias y oportunidades de <br />
            crecimiento te esperan.</p>
            <a href="">
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: 'white', 
                  color: 'blue', 
                  '&:hover': { backgroundColor: '#f0f0f0' }, 
                  fontFamily: 'Rubik', 
                  textTransform: 'none'
                  }}
              >
                Registrarse como conductor
            </Button>
            </a>
          </div>
          <picture className="picture-home-3">
            <img className="img-home-3" src="/images/repartidor.webp" alt="Repartidor" />
          </picture>
        </section>
    )
}