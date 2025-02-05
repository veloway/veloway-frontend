import { useDriverRegistroStore } from "@/stores/driverRegisterStore";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

const LicenciaForm: React.FC = () => {
  const { licenseValues, setLicenseValues } = useDriverRegistroStore();
  const [errors, setErrors] = useState({
    numero: false,
    categoria: false,
    fecha_vencimiento: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "numero") {
      const num = Number(value);
      if (!num) {
        setErrors((prev) => ({ ...prev, numero: true }));
      } else {
        setErrors((prev) => ({ ...prev, numero: false }));
      }
      setLicenseValues({ [name]: num });
      // console.log(licenseValues)

    } else {
      if (value.trim() === "") {
        setErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: false }));
      }
      setLicenseValues({ [name]: value });
      // console.log(licenseValues)
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const date = new Date(value);
    const hoy = new Date();
    if (isNaN(date.getTime()) || date <= hoy) {
      setErrors((prev) => ({ ...prev, fecha_vencimiento: true }));
    } else {
      setErrors((prev) => ({ ...prev, fecha_vencimiento: false }));
    }
    setLicenseValues({ [name]: date });
    // console.log(licenseValues)

  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Número de Licencia"
        name="numero"
        type="number"
        value={licenseValues.numero === 0 ? "" : licenseValues.numero}
        onChange={handleChange}
        required
        error={errors.numero}
        helperText={errors.numero ? "Debe ingresar un número válido" : ""}
        fullWidth
      />
      <TextField
        label="Categoría"
        name="categoria"
        value={licenseValues.categoria}
        onChange={handleChange}
        required
        error={errors.categoria}
        helperText={errors.categoria ? "La categoría es obligatoria" : ""}
        fullWidth
      />
      <TextField
        label="Fecha de Vencimiento"
        name="fecha_vencimiento"
        type="date"
        onChange={handleDateChange}
        required
        error={errors.fecha_vencimiento}
        helperText={errors.fecha_vencimiento ? "La fecha debe ser posterior a hoy" : ""}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Stack>
  );
};

export default LicenciaForm;
