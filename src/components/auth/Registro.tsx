import { useRegistroStore } from "@/stores/userRegisterStore";
import { MAX_LENGTH_PHONE } from "@/types/constants";
import { TextField, Stack } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

interface RegistroProps {
    handleErrorRequireInputs: boolean;
}

const Registro = ({handleErrorRequireInputs}: RegistroProps) => {
	const { userValues, setUserValues } = useRegistroStore();
    const [phoneInputError, setPhoneInputError] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserValues({ [name]: value }); // Actualizando el estado global
	};

    const handlePhoneInput = (telefono: string) => {
        const cleanedTelefono = telefono.replace(/\s/g, '');
        setUserValues({ telefono: cleanedTelefono });

        if (cleanedTelefono.length < MAX_LENGTH_PHONE) {
            setPhoneInputError(true);
        } else {
            setPhoneInputError(false);
        }
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
                error={
                    handleErrorRequireInputs && userValues.dni === "" || 
                    handleErrorRequireInputs && userValues.dni.length < 8
                    ? true 
                    : false
                }
                helperText={handleErrorRequireInputs && userValues.dni.length < 8 ? "El DNI debe tener al menos 8 dígitos" : ""}
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
                onChange={handlePhoneInput}
                defaultCountry="AR"
                required
                error={handleErrorRequireInputs && phoneInputError}
                helperText={handleErrorRequireInputs && phoneInputError ? `El teléfono debe tener al menos ${MAX_LENGTH_PHONE} dígitos` : ""}
                
            />
        </Stack>
	);
};
export default Registro;
