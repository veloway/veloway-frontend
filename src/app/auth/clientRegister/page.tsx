"use client";

import React, { useState } from "react";
import Registro from "../../../components/auth/Registro";
import DomicilioForm from "../../../components/auth/DomicilioForm";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const RegisterCliente = () => {
    const [step, setStep] = useState(1);
    const [userValues, setUserValues] = useState({
        email: "",
        password: "",
        dni: "",
        fechaNacimiento: "",
        nombre: "",
        apellido: "",
        telefono: "",
    });
    const [addressValues, setAddressValues] = useState({
        calle: "",
        numero: "",
        descripcion: "",
        piso: "",
        depto: "",
        localidadID: "",
    });

    const router = useRouter();

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserValues({ ...userValues, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressValues({ ...addressValues, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (Object.values(userValues).some(value => value === "")) {
            alert("Por favor, completa todos los campos antes de continuar.");
            return;
        }
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(addressValues).some(value => value === "")) {
            alert("Por favor, completa todos los campos del domicilio.");
            return;
        }
        console.log({ user: userValues, address: addressValues });
        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded space-y-6">
            <button
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4"
                onClick={() => step === 1 ? router.push("/auth/login") : setStep(1)} // Cambio en el onClick
                type="button"
            >
                <FaArrowLeft />
                <span>{step === 1 ? "Inicio de Sesión" : "Volver al Formulario de Usuario"}</span>
            </button>

            <h2 className="text-2xl font-bold text-center">
                {step === 1 ? "Registro de Cliente" : "Datos de Domicilio"}
            </h2>

            {step === 1 ? (
                <>
                    <Registro onChange={handleUserChange} values={userValues} />
                    <button
                        type="button"
                        onClick={handleNext}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Siguiente
                    </button>
                </>
            ) : (
                <>
                    <DomicilioForm
                        onChange={handleAddressChange}
                        values={addressValues}
                        onBack={() => setStep(1)}
                        onSubmit={handleSubmit} // Se envía directamente
                    />
                </>
            )}
        </form>
    );
};

export default RegisterCliente;
