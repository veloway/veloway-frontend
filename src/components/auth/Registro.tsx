import React from "react";
import { useRegistroStore } from "@/stores/userRegisterStore";
import { TextField, Stack } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

interface RegistroProps {
    handleErrorRequireInputs: boolean;
}

const Registro = ({ handleErrorRequireInputs }: RegistroProps) => {
	const { userValues, setUserValues } = useRegistroStore();

    const [phoneInputError, setPhoneInputError] = useState(false);
    const [dniError, setDniError] = useState(false);



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
        if (name === 'dni') {
            // Filtramos para que solo queden dígitos
            const onlyDigits = value.replace(/\D/g, '');
            // Si el valor original es distinto al filtrado, significa que se intentó ingresar letras u otros caracteres
            if (onlyDigits !== value) {
              setDniError(true);
            } else {
              setDniError(false);
            }
            // Actualizamos el estado con el valor filtrado
            setUserValues({ dni: onlyDigits });
          } else {
            setUserValues({ ...userValues, [name]: value });
          }
        // console.log(userValues)
	};

	return (

        <Stack spacing={1.5} sx={{ width: 400 }}>
            <TextField
                label='Email'
                type='email'
                name='email'
                value={userValues.email}
                onChange={handleChange}
                required
                error={handleErrorRequireInputs && userValues.email === "" ? true : false}
            />
            <TextField
                label='Contraseña'
                type='password'
                name='password'
                value={userValues.password}
                onChange={handleChange}
                required
                error={
                    handleErrorRequireInputs && userValues.password === "" ||
                    handleErrorRequireInputs && userValues.password.length < 8
                    ? true 
                    : false
                }
                helperText={handleErrorRequireInputs && userValues.password.length < 8 ? "La contraseña debe tener al menos 8 caracteres" : ""}
            />
            <TextField
                label='DNI'
                type='text'
                name='dni'
                value={userValues.dni}
                onChange={handleChange}
                required
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                error={dniError || (userValues.dni.length > 0 && userValues.dni.length !== 8)}
                helperText={
                  dniError
                    ? "El DNI solo acepta números"
                    : userValues.dni.length > 0 && userValues.dni.length !== 8
                    ? "El DNI debe tener 8 dígitos"
                    : ""
                }
            />
            <TextField
                label='Fecha de Nacimiento'
                type='date'
                name='fechaNacimiento'
                value={userValues.fechaNacimiento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={handleErrorRequireInputs && userValues.fechaNacimiento === "" ? true : false}
            />
            <TextField
                label='Nombre'
                type='text'
                name='nombre'
                value={userValues.nombre}
                onChange={handleChange}
                required
                error={
                    handleErrorRequireInputs && userValues.nombre === "" || 
                    handleErrorRequireInputs && !isNaN(Number(userValues.nombre))
                    ? true 
                    : false
                }
                helperText={
                    handleErrorRequireInputs && userValues.nombre === "" ? "" :
                    handleErrorRequireInputs && !isNaN(Number(userValues.nombre)) ? "El nombre no puede ser un número" : ""
                }
            />
            <TextField
                label='Apellido'
                type='text'
                name='apellido'
                value={userValues.apellido}
                onChange={handleChange}
                required
                error={
                    handleErrorRequireInputs && userValues.apellido === "" || 
                    handleErrorRequireInputs && !isNaN(Number(userValues.apellido))
                    ? true 
                    : false
                }
                helperText={
                    handleErrorRequireInputs && userValues.apellido === "" ? "" :
                    handleErrorRequireInputs && !isNaN(Number(userValues.apellido)) ? "El apellido no puede ser un número" : ""
                }
            />

            <MuiTelInput 
                label='Teléfono'
                name='telefono'
                value={userValues.telefono}
                onChange={(telefono: string) => setUserValues({ telefono: telefono })}
                defaultCountry="AR"
                required
            />
		</Stack>
	);
};
export default Registro;
