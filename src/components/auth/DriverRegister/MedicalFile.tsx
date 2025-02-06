import React, { useState } from "react";
import { useDriverRegistroStore } from "@/stores/driverRegisterStore";
import { Stack, TextField, FormControlLabel, Checkbox } from "@mui/material";

const FichaMedica: React.FC = () => {
  const {
    carnetValues,
    setCarnetValues,
  } = useDriverRegistroStore();

  const [errors, setErrors] = useState({
    altura: false,
    peso: false,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCarnetValues({ [name]: checked });
    } else {
      if (name === "altura") {
        const numericValue = value.replace(/\D/g, '');
        const num = Number(numericValue);
        if (num < 100 || num > 999) {
          setErrors((prev) => ({ ...prev, altura: true }));
        } else {
          setErrors((prev) => ({ ...prev, altura: false }));
        }
      }
      if (name === "peso") {
        const numericValue = value.replace(/\D/g, '');
        const num = Number(numericValue);
        if (num < 10 || num > 999) {
          setErrors((prev) => ({ ...prev, peso: true }));
        } else {
          setErrors((prev) => ({ ...prev, peso: false }));
        }
      }
      setCarnetValues({ [name]: value });
    }
  };

  return (
    <Stack spacing={1}>
      <TextField
        label="Altura (cm)"
        name="altura"
        value={carnetValues.altura || ""}
        onChange={handleChange}
        required
        error={errors.altura}
        helperText={errors.altura ? "Debe ser un número de 3 dígitos (entre 100 y 999)" : ""}
        fullWidth
      />
      <TextField
        label="Peso (kg)"
        name="peso"
        value={carnetValues.peso || ""}
        onChange={handleChange}
        required
        error={errors.peso}
        helperText={errors.peso ? "Debe ser un número de 2 o 3 dígitos (entre 10 y 999)" : ""}
        fullWidth
      />
      <TextField
        label="Enfermedad Cardiaca (opcional)"
        name="enfermedadCardiaca"
        value={carnetValues.enfermedadCardiaca || ""}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Enfermedad Respiratoria (opcional)"
        name="enfermedadRespiratoria"
        value={carnetValues.enfermedadRespiratoria || ""}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Alergias (opcional)"
        name="alergias"
        value={carnetValues.alergias || ""}
        onChange={handleChange}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            name="epilepsia"
            checked={carnetValues.epilepsia || false}
            onChange={handleChange}
          />
        }
        label="Epilepsia"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="diabetes"
            checked={carnetValues.diabetes || false}
            onChange={handleChange}
          />
        }
        label="Diabetes"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="compartir"
            checked={carnetValues.compartir || false}
            onChange={handleChange}
          />
        }
        label="Compartir Ficha Médica"
      />
    </Stack>
  );
};

export default FichaMedica;