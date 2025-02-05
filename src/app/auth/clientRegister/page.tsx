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
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { MAX_LENGTH_PHONE } from "@/types/constants";

const RegisterCliente = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { userValues, setUserValues, addressValues, setAddressValues } = useRegistroStore();
    const [handleErrorRequireInputs, setHandleErrorRequireInputs] = useState(false);

    // Si necesitas cargar las localidades desde un API, puedes hacerlo con useEffect.
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    useEffect(() => {
        LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
    }, []);

    const handleNext = () => {
        if (Object.values(userValues).some((value) =>
            value === "") ||
            userValues.telefono.length < MAX_LENGTH_PHONE ||
            !isNaN(Number(userValues.nombre)) ||
            !isNaN(Number(userValues.apellido)) ||
            userValues.password.length < 8 ||
            userValues.dni.length < 8
        ) {
            setHandleErrorRequireInputs(true);
            return;
        }
        setHandleErrorRequireInputs(false);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.register(userValues, addressValues);
            toast.success("Registrado correctamente. Inicia sesión para continuar.");
            setUserValues({
                email: "",
                password: "",
                dni: "",
                fechaNacimiento: "",
                nombre: "",
                apellido: "",
                telefono: "",
                esCondutor: false
            });
            setAddressValues({
                calle: "",
                numero: 0,
                descripcion: "",
                piso: null,
                depto: "",
                localidadID: null,
            });
            router.push(`/auth/login`);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "Error al registrar el usuario");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='max-w-md mx-auto bg-white rounded space-y-6 text-tertiary'>
                <button
                    className='text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4'
                    onClick={() => (step === 1 ? router.push("/auth/login") : setStep(1))}
                    type='button'>
                    <FaArrowLeft />
                    <span>{step === 1 ? "Inicio de Sesión" : "Volver al Formulario de Usuario"}</span>
                </button>

                <h2 className='text-2xl font-bold text-center'>
                    {step === 1 && !loading ? "Registro de Cliente" : "Datos de Domicilio"}
                </h2>

                {step === 1 && !loading ? (
                    <>
                        <Registro handleErrorRequireInputs={handleErrorRequireInputs} />
                        <Button onClick={handleNext} variant='contained' className='w-full'>
                            Siguiente
                        </Button>
                    </>
                ) : (
                    <>
                        <DomicilioForm // Para el Autocomplete (localidad)
                            localidades={localidades}
                        />
                    </>
                )}
                {step === 2 && !loading ?

                    (
                        <button
                            type='submit'
                            className='w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200'>
                            Finalizar Registro
                        </button>
                    ) : (
                        null
                    )}

                {loading ?
                    <div className="flex justify-center">
                        <CircularProgress />
                    </div>
                    : null}

            </form>
        </>
    );
};

export default RegisterCliente;
