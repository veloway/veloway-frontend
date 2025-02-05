"use client";
import React, { useState, useEffect } from "react";
import Registro from "../../../components/auth/Registro";
import DomicilioForm from "../../../components/auth/DomicilioForm";
import VehiculoForm from "@/components/auth/DriverRegister/Vehicle";
import FichaMedica from "@/components/auth/DriverRegister/MedicalFile";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa"; 
import { authService } from "@/services/auth.service";
import { useRegistroStore } from "@/stores/userRegisterStore";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { MAX_LENGTH_PHONE } from "@/types/constants";
import { useDriverRegistroStore } from "@/stores/driverRegisterStore";
import { Marca } from "@/entities/marcas";
import { MarcasService } from "@/services/marca.service";
import { Modelo } from "@/entities/modelo";
import { TiposService } from "@/services/tipoVehiculo";
import { TipoVehiculo } from "@/entities/tipoVehiculo";
import LicenciaForm from "@/components/auth/DriverRegister/license";

const RegisterCliente = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { userValues, setUserValues, addressValues, setAddressValues } = useRegistroStore();
    const { carnetValues, setCarnetValues, licenseValues, setLicenseValues, vehicleValues, setVehicleValues } = useDriverRegistroStore();

    const [handleErrorRequireInputs, setHandleErrorRequireInputs] = useState(false);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos] = useState<Modelo[]>([]);
    const [tipos, setTipos] = useState<TipoVehiculo[]>([]);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    
    
    useEffect(() => {
        LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
        MarcasService.getMarcas().then((marcas) => setMarcas(marcas))
        TiposService.getTipos().then((tipos) => setTipos(tipos))
    }, []);

    const handleNext = () => {
        // Validamos según el paso actual
        switch (step) {
          case 1: {
            // Registro (ya definido)
            if (
              Object.values(userValues).some((value) => value === "") ||
              userValues.telefono.length < MAX_LENGTH_PHONE ||
              !isNaN(Number(userValues.nombre)) ||
              !isNaN(Number(userValues.apellido)) ||
              userValues.password.length < 8 ||
              userValues.dni.length < 8
            ) {
              setHandleErrorRequireInputs(true);
              return;
            }
            break;
          }
          case 2: {
            // Domicilio:
            // - calle: obligatorio
            // - numero: obligatorio, solo números (asumimos que se guarda como número y debe ser > 0)
            // - localidad: obligatorio (localidadID no nulo)
            if (
              addressValues.calle.trim() === "" ||
              !addressValues.numero || addressValues.numero <= 0 ||
              addressValues.localidadID === null
            ) {
              setHandleErrorRequireInputs(true);
              return;
            }
            break;
          }
          case 3: {
            // Licencia:
            // - numero: obligatorio, solo números (> 0)
            // - categoria: obligatorio (no vacío)
            // - fecha vencimiento: obligatorio, debe ser posterior a la fecha actual
            const fechaVencimiento = new Date(licenseValues.fechavencimiento);
            const hoy = new Date();
            if (
              licenseValues.numero <= 0 ||
              licenseValues.categoria.trim() === "" ||
              fechaVencimiento <= hoy
            ) {
              setHandleErrorRequireInputs(true);
              return;
            }
            break;
          }
          case 4: {
            // Ficha Médica:
            // - altura: obligatorio, debe ser un número de 3 dígitos (entre 100 y 999)
            // - peso: obligatorio, 2 o 3 dígitos (entre 10 y 999)
            if (
              carnetValues.altura < 100 || carnetValues.altura > 999 ||
              carnetValues.peso < 10 || carnetValues.peso > 999
            ) {
              setHandleErrorRequireInputs(true);
              return;
            }
            break;
          }
          default:
            break;
        }
      
        // Si pasa todas las validaciones, se quitan los errores y se pasa al siguiente paso
        console.log(userValues, addressValues, licenseValues, carnetValues, vehicleValues)
        setHandleErrorRequireInputs(false);
        setStep((prevStep) => prevStep + 1);
      };
      


    const handleBack = () => {
        if (step > 1) {
            setStep((prevStep) => prevStep - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userValues, addressValues, licenseValues, carnetValues, vehicleValues)

        if (
            vehicleValues.anio < 1970 || vehicleValues.anio > new Date().getFullYear() ||
            vehicleValues.color.trim() === "" || !/^[A-Za-z]+$/.test(vehicleValues.color) ||
            vehicleValues.patente.trim() === "" ||
            vehicleValues.tipoVehiculoId === 0 ||
            vehicleValues.marcaId === 0 ||
            vehicleValues.modeloId === 0
          ) {
            setHandleErrorRequireInputs(true);
            return;
          }
        setLoading(true);

        try {
            await authService.driverRegister(userValues, addressValues, carnetValues , licenseValues , vehicleValues );
            toast.success("Registrado correctamente. Inicia sesión para continuar.");
            setUserValues({ 
                email: "", 
                password: "", 
                dni: "", 
                fechaNacimiento: "", 
                nombre: "", 
                apellido: "", 
                telefono: "", 
                esCondutor: false });
            setAddressValues({ calle: "", 
                numero: 0, 
                descripcion: "", 
                piso: null, 
                depto: "", 
                localidadID: null });
            setCarnetValues({
                altura: 0,
                peso: 0,
                enfermedadCardiaca: "",
                enfermedadRespiratoria: "",
                alergias: "",
                epilepsia: false,
                diabetes: false,
                compartir: false
            });
            setLicenseValues({
                numero: 0,
                categoria: "",
                fechavencimiento: ""
            });
            setVehicleValues({
                anio: 0,
                color: "",
                descripcion: "",
                patente: "",
                tipoVehiculoId: 0,
                modeloId: 0,
                marcaId: 0
            });
            router.push(`/auth/login`);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "Error al registrar el conductor");
            }
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return <Registro handleErrorRequireInputs={handleErrorRequireInputs} />;
            case 2:
                return <DomicilioForm localidades={localidades} />;
            case 3:
                return <LicenciaForm/>;
            case 4:
                return <FichaMedica />;
            case 5:
                return <VehiculoForm marcas={marcas} modelos={modelos} tiposVehiculo={tipos} />;
            default:
                return null;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white rounded space-y-6 text-tertiary'>
                <button
                    className='text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4'
                    onClick={() => (step === 1 ? router.push("/auth/login") : handleBack())}
                    type='button'
                >
                    <FaArrowLeft />
                    <span>{step === 1 ? "Inicio de Sesión" : "Volver"}</span>
                </button>

                <h2 className='text-2xl font-bold text-center'>
                    {step === 1 && !loading ? "Registro de Conductor" :
                        step === 2 ? "Datos de Domicilio" :
                            step === 3 ? "Licencia" :
                                step === 4 ? "Ficha Médica" :
                                    "Datos del Vehículo"}
                </h2>

                {!loading && renderForm()}

                <div className='flex justify-between'>
                    {step < 5 && <Button onClick={handleNext} variant='contained'>Siguiente</Button>}
                    {step === 5 && <Button type='submit' className='w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200' variant='contained' disabled={loading}>{loading ? "Registrando..." : "Registrar"}</Button>}
                </div>
            </form>
        </>
    );
};

export default RegisterCliente;
