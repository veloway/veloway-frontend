import Button from '@mui/material/Button'; 
import './ThirdViewHome.css'

export function ThirdViewHome(){
    return(
        <section className="home-3">
          <div className="text-home-3">
            <img src="/images/8955299.webp" alt="Logo" />
            <h2>Únete a Nuestro Equipo de
            Conductores</h2>
            <p>Sé parte de una red de profesionales en crecimiento. <br /> 
            Flexibilidad, buenas ganancias y oportunidades de <br />
            crecimiento te esperan.</p>
            <a href="">
            <div className='buttonStyles'>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: 'white', 
                    color: 'var(--color-primary)', 
                    '&:hover': { backgroundColor: '#f0f0f0' }, 
                    fontFamily: 'var(--font-rubik)', 
                    textTransform: 'none'
                    }}
                >
                  Registrarse como conductor
              </Button>
            </div>
            </a>
          </div>
          <picture className="picture-home-3">
            <img className="img-home-3" src="/images/repartidor.webp" alt="Repartidor" />
          </picture>
        </section>
    )
}
