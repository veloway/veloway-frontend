"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa"; 
import VehiculoForm from "@/components/vehiculo/VehiculoForm"; 

const RegisterVehiculo: React.FC = () => {
    const router = useRouter();
    const [vehiculoData, setVehiculoData] = useState<any>(null); 

    const addVehiculo = (vehiculo: any) => {
        setVehiculoData(vehiculo); 
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(vehiculoData);
    };

    return (
        <StyledContainer>

            <BackButton 
                onClick={() => router.push('/auth/driverRegister')} 
            />

<form 
    onSubmit={handleSubmit} 
    className="w-full max-w-2xl space-y-6" 
>
    <VehiculoForm 
        addVehiculo={addVehiculo} 
        editIndex={null} 
        vehiculos={vehiculoData ? [vehiculoData] : []} 
    />


    <button 
        type="submit" 
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mt-4" 
    >
        Registrar Vehículo
    </button>
</form>

        </StyledContainer>
    );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div className="w-full flex justify-start mb-4"> 
            <button 
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2" 
                onClick={onClick}
            >
                <FaArrowLeft /> <span>Registrar conductor</span>
            </button>
        </div>
    );
};

const StyledContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container
            maxWidth="xl"
            sx={{
                padding: "0", 
                background: "#fff", 
                minHeight: "100vh", 
                display: "flex",
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center", 
            }}
        >
            {children}
        </Container>
    );
};

export default RegisterVehiculo;
