"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowCircleRight } from "react-icons/fa";
import { CircularProgress } from "@mui/material"; // Spinner de Material UI
import './InputHome.css'

export function InputHome () {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el error
    const [loading, setLoading] = useState(false); // Estado para el loading
    const router = useRouter();

    const validateInput = (value: string) => {
        if (!value.trim()) {
          return "Por favor, ingrese un número de seguimiento.";
        }
        if (!/^\d+$/.test(value)) {
          return "El valor ingresado no es valido.";
        }
        if (value.length !== 8){
            return "El numero de seguimiento debe tener exactamente 8 digitos.";
        }
        return "";
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const error = validateInput(trackingNumber);
    
        if (error) {
          setErrorMessage(error);
          return;
        }

        setTimeout(() => {
          router.push(`/search-shipment/${trackingNumber}`);
          setLoading(false); // Desactiva el loading (en caso de cancelar la navegación)
        }, 1500); // Simula una carga de 1.5s
      };

      
    
      //   setErrorMessage(""); // Limpia el error si todo está bien
      //   setLoading(true); // Activa el loading
      //   router.push(`/shipment/${trackingNumber}`);
      // };

    return(
        <form className="form-contenedor" onSubmit={handleSubmit}>
            <input 
                className={`input-home ${errorMessage ? "input-error" : ""}`} // Agrega clase de error si hay un mensaje
                type="text"
                value={trackingNumber} 
                placeholder="Ingrese numero de seguimiento" 
                onChange={(e) => {
                    setTrackingNumber(e.target.value)
                    setErrorMessage(""); // Borra el mensaje de error si el usuario empieza a escribir
                }}
                disabled={loading}
                style={{ color: "black"}}
            />
            <button className="button-style" type="submit" disabled={!!errorMessage}>
              {loading ? <CircularProgress size={20} color="inherit" /> : <FaArrowCircleRight />}{/* Muestra spinner si está cargando */}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    )
}
