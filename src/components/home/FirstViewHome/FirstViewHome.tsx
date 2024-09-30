import { GiPathDistance } from "react-icons/gi";
import './FirstViewHome.css'

export function FirstViewHome(){
    return(
        <section className="home-1">
          <img src="/images/hero_image.webp" className="background-home-1"/>
          <div className="text-home-1">
            <h1><strong>Envios rápidos y seguros <br />a cualquier destino</strong></h1>
          </div>
          <div className="text-img-home-1">
              <GiPathDistance className="envio-icon"/>
              <h3><strong>Seguí tu envio</strong></h3>
            </div>
          <form>
            <div className="input-conteiner">
              <input type="text" id="cod-seg" name="cod-seg" value="" placeholder="Ingrese su numero de seguimiento"/>
              <button className="button-seguim" type="submit"></button>
            </div>
          </form>
        </section>
    )
}