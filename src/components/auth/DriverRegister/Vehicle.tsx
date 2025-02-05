import { Stack, TextField, FormControl, Autocomplete } from "@mui/material";
import { useDriverRegistroStore } from "@/stores/driverRegisterStore";
import { TipoVehiculo } from "@/entities/tipoVehiculo";
import { Modelo } from "@/entities/modelo";
import { Marca } from "@/entities/marcas";
import { useEffect, useState } from "react";
import { ModelosService } from "@/services/modelo.service";

interface VehiculoFormProps {
  tiposVehiculo: TipoVehiculo[];
  modelos: Modelo[];
  marcas: Marca[];
}


const VehiculoForm = ({ tiposVehiculo = [], modelos = [], marcas = [] }: VehiculoFormProps) => {
  const { vehicleValues, setVehicleValues } = useDriverRegistroStore();
  const [modelosFiltrados, setModelosFiltrados] = useState<Modelo[]>([]);
  const [errors, setErrors] = useState({
    anio: false,
    color: false,
    patente: false,
    tipoVehiculoId: false,
    marcaId: false,
    modeloId: false,
  });

  useEffect(() => {
    const fetchModelos = async () => {
    if (vehicleValues.marcaId) {
     const modeloData =  await ModelosService.getModelos(vehicleValues.marcaId);
     setModelosFiltrados(modeloData)
    }
  }
  fetchModelos()
  }, [vehicleValues.marcaId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "anio") {
      const num = Number(value);
      if (num < 1970 || num > new Date().getFullYear()) {
        setErrors((prev) => ({ ...prev, anio: true }));
      } else {
        setErrors((prev) => ({ ...prev, anio: false }));
      }
      setVehicleValues({ [name]: num });
    } else if (name === "color") {
      if (value.trim() === "" || !/^[A-Za-z]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, color: true }));
      } else {
        setErrors((prev) => ({ ...prev, color: false }));
      }
      setVehicleValues({ [name]: value });
    } else {
      if (value.trim() === "") {
        setErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: false }));
      }
      setVehicleValues({ [name]: value });
    }
  };

  const handleSelectChange = (
    event: any,
    value: string | null,
    field: "tipoVehiculoId" | "modeloId" | "marcaId",
    options: { id: number; nombre: string }[]
  ) => {
    const selectedOption = options.find(option => option.nombre === value);
    const newValue = selectedOption ? selectedOption.id : 0;
  
    setVehicleValues({ [field]: newValue });
  
    if (field === "marcaId") {
      // Reseteamos el modelo si se cambia la marca
      setVehicleValues({ modeloId: 0, marcaId: newValue });
    }
  };
  


  return (
    <Stack spacing={1} sx={{ width: 400 }}>
      <TextField
        label="Año"
        name="anio"
        type="number"
        value={vehicleValues.anio === 0 ? "" : vehicleValues.anio}
        onChange={handleInputChange}
        error={errors.anio}
        helperText={errors.anio ? "El año debe ser un número entre 1970 y 2025" : ""}
        required
      />
      <TextField
        label="Color"
        name="color"
        value={vehicleValues.color}
        onChange={handleInputChange}
        error={errors.color}
        helperText={errors.color ? "El color es obligatorio y debe contener solo letras" : ""}
        required
      />
      <TextField
        label="Descripción"
        name="descripcion"
        value={vehicleValues.descripcion || ""}
        onChange={handleInputChange}
      />
      <TextField
        label="Patente"
        name="patente"
        value={vehicleValues.patente}
        onChange={handleInputChange}
        error={errors.patente}
        helperText={errors.patente ? "La patente es obligatoria" : ""}
        required
      />

      <FormControl>
        <Autocomplete
          options={(tiposVehiculo ?? []).map((option) => `${option.nombre}`)}
          onChange={(event, value) => handleSelectChange(event, value, "tipoVehiculoId", tiposVehiculo)}
          value={
            tiposVehiculo.find(t => t.id === vehicleValues.tipoVehiculoId)?.nombre || ""
          }
          renderInput={(params) => <TextField {...params} label="Tipo de Vehículo" 
          required
          error={errors.tipoVehiculoId}
          helperText={errors.tipoVehiculoId ? "Debe seleccionar un tipo de vehículo" : ""}/>}
        />
      </FormControl>

      <FormControl>
        <Autocomplete
          options={(marcas ?? []).map((option) => `${option.nombre}`)}
          onChange={(event, value) => handleSelectChange(event, value, "marcaId", marcas)}
          value={
            marcas.find(m => m.id === vehicleValues.marcaId)?.nombre || ""
          }
          renderInput={(params) => <TextField {...params} label="Marca"
          required
          error={errors.marcaId}
          helperText={errors.marcaId ? "Debe seleccionar una marca" : ""}
           />}
        />
      </FormControl>

      <FormControl>
        <Autocomplete
          options={(modelosFiltrados ?? []).map((option) => `${option.nombre}`)}
          onChange={(event, value) => handleSelectChange(event, value, "modeloId", modelosFiltrados)}
          value={
            modelosFiltrados.find(m => m.id === vehicleValues.modeloId)?.nombre || ""
          }
          renderInput={(params) => <TextField {...params} 
          label="Modelo"
          required
          error={errors.modeloId}
          helperText={errors.modeloId ? "Debe seleccionar un modelo" : ""}
          />}
          disabled={vehicleValues.marcaId === 0}
        />
      </FormControl>
    </Stack>
  );
};

export default VehiculoForm;
