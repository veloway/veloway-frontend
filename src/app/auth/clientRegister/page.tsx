"use client";

import React, { useState, useEffect } from "react";
import Registro from "../../../components/auth/Registro";
import DomicilioForm from "../../../components/auth/DomicilioForm";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { authService } from "@/services/auth.service";
import { useRegistroStore } from "@/stores/userRegisterStore";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";


const RegisterCliente = () => {
  const API_URL = process.env.API_URL;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userValues, setUserValues , addressValues, setAddressValues } = useRegistroStore();

  // Si necesitas cargar las localidades desde un API, puedes hacerlo con useEffect.
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
    useEffect(() => {
        LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
    }, []);

  const handleNext = () => {
    if (Object.values(userValues).some((value) => value === "")) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await authService.register(userValues, addressValues);
      alert("Registro exitoso");
      setUserValues({})
      setAddressValues({})
      router.push(`http://localhost:3000/auth/login`);
    } catch (error) {
      alert("Error en el registro. Revisa los datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded space-y-6">
      <button
        className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4"
        onClick={() => (step === 1 ? router.push("/auth/login") : setStep(1))}
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
          <Registro />
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
          <DomicilioForm  // Para el Autocomplete (localidad)
            localidades={localidades}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </form>
    </>
  );
};

export default RegisterCliente;
