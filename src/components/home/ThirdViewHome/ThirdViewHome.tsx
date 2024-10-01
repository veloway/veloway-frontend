import Button from "@/components/ui/button/Button"
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
            <a href="" style={{color: 'var(--color-primary)'}}><Button className="whiteButton" bgColor="white">Registrarse como conductor</Button></a>
          </div>
          <picture className="picture-home-3">
            <img className="img-home-3" src="/images/repartidor.webp" alt="Repartidor" />
          </picture>
        </section>
    )
}