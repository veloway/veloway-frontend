import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import { EstadoEnvioEnum } from '@/types/enums';
import { EnviosService } from '@/services/envios.service';
import { useRouter } from 'next/navigation';

const steps = [
  {
    label: 'En proceso de retiro',
    description: ``,
  },
  {
    label: 'En translado a destino',
    description: ``,
  },
  {
    label: 'Entregado',
    description: ``,
  },
];

export default function VerticalLinearStepper() {
  const numeroSeguimiento = 11539095
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter()

  const handleUpdateEstadoEnvio = async () => {
  
    let nuevoEstado;

    if(activeStep === 0){
      nuevoEstado = EstadoEnvioEnum.EnTrasladoADestino
      console.log("ahora esta en", nuevoEstado);
      
    }else if (activeStep === 1) {
      nuevoEstado = EstadoEnvioEnum.Entregado
      console.log("ahora esta en", nuevoEstado);
    }else{
      console.log("ahora esta en", nuevoEstado);
      router.push("/driver/dashboard")
      return
    }
  
    try {
      await EnviosService.updateEstadoEnvio(numeroSeguimiento, nuevoEstado);
      console.log("Estado del envío actualizado correctamente.");
  
    } catch (error) {
       console.error("Error al actualizar el estado del envío:", error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => { 
                    handleNext()
                    handleUpdateEstadoEnvio()
                  }}
                  sx={{ mt: 1, mr: 1, }}
                >
                  {index === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}