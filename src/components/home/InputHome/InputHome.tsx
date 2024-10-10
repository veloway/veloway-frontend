"use client";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import './InputHome.css'

export function InputHome () {
    /*const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Codigo de seguimiento recibido: ", inputValue);
      };*/

    return(
        <form className="form-contenedor" /*onSubmit={handleSubmit}*/>
            <input 
                className="input-home"
                type="text" 
                placeholder="Ingrese numero de seguimiento" 
                style={{ color: "black"}}
            />
            <button className="button-style" type="submit"><FaArrowCircleRight/></button>
        </form>
    )
}