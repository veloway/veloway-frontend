"use client";

import React, { useState } from "react";
import NavBar from "@/components/ui/navbar/Navbar";
import VehiculoForm from "@/components/vehiculo/VehiculoForm";
import {
  Container,
  Box,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
} from "@mui/material";
import { CheckCircle, DriveEta, Home } from "@mui/icons-material";

interface Vehiculo {
  anio: string;
  color: string;
  descripcion: string;
  nomSeguro: string;
  patente: string;
  tipoVehiculo: {
    nombre: string;
    modelo: { nombre: string; marca: string };
  };
  titular: { nombre: string; documento: string };
}

const steps = [
  { label: "Registro del Conductor", icon: <Home /> },
  { label: "Registro del Vehículo", icon: <DriveEta /> },
  { label: "Fin del Registro", icon: <CheckCircle /> },
];

const VehiculoPage: React.FC = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const addVehiculo = (vehiculo: Vehiculo) => {
    setVehiculos((prev) => 
      editIndex !== null 
        ? prev.map((v, i) => (i === editIndex ? vehiculo : v)) 
        : [...prev, vehiculo]
    );
    setEditIndex(null);
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const deleteVehiculo = (index: number) => {
    setVehiculos((prev) => prev.filter((_, i) => i !== index));
  };

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Vehículos", href: "/vehiculos" },
    { name: "Contactar", href: "/contacto" },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <NavBar links={links} />
      </div>
      <Container maxWidth="lg" sx={{ padding: "2rem", background: "linear-gradient(to right, #42a5f5, #478ed1)" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: 3, textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>Seguimiento del Registro</Typography>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {step.icon}
                        <Typography sx={{ marginLeft: 1 }}>{step.label}</Typography>
                      </Box>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <LinearProgress
                variant="determinate"
                value={(activeStep / (steps.length - 1)) * 100}
                sx={{ marginTop: 2, backgroundColor: "#e0e0e0", "& .MuiLinearProgress-bar": { backgroundColor: "#42a5f5" }}}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: 3 }}>
              <VehiculoForm addVehiculo={addVehiculo} editIndex={editIndex} vehiculos={vehiculos} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VehiculoPage;
