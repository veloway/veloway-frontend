"use client";

import React, { useState, useEffect } from "react";
import Registro from "../../../components/auth/Registro";
import DomicilioForm from "../../../components/auth/DomicilioForm";
import FichaMedicaForm from "../../../components/auth/DriverRegister/MedicalFile";
import VehiculoForm from "../../../components/vehiculo/VehiculoForm";
import LicenciaForm from "../../../components/auth/DriverRegister/license";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { authService } from "@/services/auth.service";
import { useRegistroStore } from "@/stores/userRegisterStore";
import { useDriverRegistroStore } from "@/stores/userDriverRegisterStore";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";
import { toast } from "react-toastify";

const RegisterConductor = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [handleErrorRequireInputs, setHandleErrorRequireInputs] = useState(false);
  const router = useRouter();

  const {
    userValues,
    setUserValues,
    addressValues,
    setAddressValues,
    
  } = useRegistroStore();

  const {
    medicalFileValues,
    setMedicalFileValues,
    vehicleValues,
    setVehicleValues,
    licenseValues,
    setLicenseValues,
  } = useDriverRegistroStore();

  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  useEffect(() => {
    LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
  }, []);

  useEffect(() => {
    // Obtener los datos iniciales para la ficha médica (simulando con un servicio)
    // FichaMedicaService.getFichaMedica().then((data) => { setMedicalFileValues(data); }); // Asignar los valores obtenidos
  }, []); // El useEffect solo se ejecuta al montar el componente

  const handleNext = () => {
    let isStepValid = false;
    switch (step) {
      case 1:
        isStepValid = !Object.values(userValues).some((value) => value === "");
        break;
      case 2:
        isStepValid = !Object.values(addressValues).some((value) => value === "");
        break;
      case 3:
        isStepValid = !Object.values(medicalFileValues).some((value) => value === "");
        break;
      case 4:
        isStepValid = !Object.values(vehicleValues).some((value) => value === "");
        break;
      case 5:
        isStepValid = !Object.values(licenseValues).some((value) => value === "");
        break;
      default:
        isStepValid = false;
    }

    if (!isStepValid) {
      setHandleErrorRequireInputs(true);  // Activar la validación de campos
      toast("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    setStep(step + 1);
    setHandleErrorRequireInputs(false);  // Desactivar la validación una vez el paso es válido
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // setLoading(true);

    // try {
    //   await authService.register({
    //     userValues,
    //     addressValues,
    //     medicalFileValues,
    //     vehicleValues,
    //     licenseValues,
    //   });

    //   toast("Registro exitoso");
    //   setUserValues({});
    //   setAddressValues({});
    //   setMedicalFileValues({});
    //   setVehicleValues({});
    //   setLicenseValues({});
    //   router.push('/auth/login');
    // } catch (error) {
    //   toast("Error en el registro. Revisa los datos e intenta nuevamente.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/auth/login");
    } else {
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="bg-cover " style={{backgroundImage: "url('/images/conductor.webp')" }}>
          <div className="flex justify-center bg-gray-900 bg-opacity-50 h-screen flex flex-col">
                <form className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 mb-4"
                      onClick={handleBack}
                      type="button"
                    >
                    <FaArrowLeft />
                    <span>{step === 1 ? "Inicio de Sesión" : "Volver al paso anterior"}</span>
                    </button>

                  <h2 className="text-3xl font-bold text-center text-gray-800">
                    {step === 1 && "Registro de Conductor"}
                    {step === 2 && "Datos de Domicilio"}
                    {step === 3 && "Ficha Médica"}
                    {step === 4 && "Datos del Vehículo"}
                    {step === 5 && "Licencia de Conducción"}
                  </h2>

                    {step === 1 && <Registro handleErrorRequireInputs={handleErrorRequireInputs}/>} 
                    {step === 2 && <DomicilioForm localidades={localidades} loading={loading} onBack={handleBack}/>} 
                    {step === 3 && <FichaMedicaForm />} 
                    {/* {step === 4 && <VehiculoForm />} 
                    {step === 5 && <LicenciaForm />}  */}

                    <div className="flex justify-between">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 mr-2"
                        >
                          Volver
                        </button>
                      )}

                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                        >
                          Siguiente
                        </button>
                          ) : (
                        <button
                          type="submit"
                          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                          disabled={loading}
                        >
                          {loading ? "Registrando..." : "Finalizar Registro"}
                        </button>
                      )}
                    </div>
                </form>
          </div>
        </div>
      
    </>
    
  );
};

export default RegisterConductor;
