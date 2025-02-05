"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowCircleRight } from "react-icons/fa";
import { TextField } from "@mui/material";
import './InputHome.css'

export function InputHome () {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el error
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
    
        setErrorMessage(""); // Limpia el error si todo está bien
        router.push(`/shipment/${trackingNumber}`);
      };

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
                style={{ color: "black"}}
            />
            <button className="button-style" type="submit" disabled={!!errorMessage}><FaArrowCircleRight/></button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    )
}