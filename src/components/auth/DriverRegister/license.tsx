import { useDriverRegistroStore } from "@/stores/driverRegisterStore";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

const LicenciaForm: React.FC = () => {
  const { licenseValues, setLicenseValues } = useDriverRegistroStore();
  const [errors, setErrors] = useState({
    numero: false,
    categoria: false,
    fechavencimiento: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "numero") {
      // Filtrar para que solo queden dígitos (en caso de que se ingresen otros caracteres)
      const numericStr = value.replace(/\D/g, '');
      const numLength = numericStr.length;

      if (numLength < 8 || numLength > 10) {
        setErrors((prev) => ({ ...prev, numero: true }));
      } else {
        setErrors((prev) => ({ ...prev, numero: false }));
      }
      // Actualizamos el valor convertido a número
      setLicenseValues({ numero: Number(numericStr) });
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
    if (date <= hoy) {
      setErrors((prev) => ({ ...prev, fecha_vencimiento: true }));
    } else {
      setErrors((prev) => ({ ...prev, fecha_vencimiento: false }));
    }

    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
    const dia = String(date.getDate()).padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia}`;
    setLicenseValues({ [name]: fechaFormateada });
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
        helperText={errors.numero ? "Debe ingresar entre 8 y 10 dígitos" : ""}
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
        name="fechavencimiento"
        type="date"
        onChange={handleDateChange}
        required
        error={errors.fechavencimiento}
        helperText={errors.fechavencimiento ? "La fecha debe ser posterior a hoy" : ""}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Stack>
  );
};

export default LicenciaForm;
