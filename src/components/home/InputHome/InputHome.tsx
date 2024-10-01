"use client";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import './InputHome.css'

export function InputHome () {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue (e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        console.log("Codigo de seguimiento recibido: ", inputValue);
        // Lógica adicional para manejar la sumisión del formulario
      };

    return(
        <form className="form-contenedor" onSubmit={handleSubmit}>
            <input 
                className="input-home"
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Ingrese numero de seguimiento" 
                style={{ color: "black"}}
            />
            <button className="button-style" type="submit"><FaArrowCircleRight/></button>
        </form>
    )
}