// auth/Registro.tsx
import React from "react";
import { useRegistroStore } from "@/stores/userRegisterStore";
import { TextField, Stack } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const Registro = () => {
	const { userValues, setUserValues } = useRegistroStore();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserValues({ [name]: value }); // Actualizando el estado global
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
			/>
			<TextField
				label='Contraseña'
				type='password'
				name='password'
				value={userValues.password}
				onChange={handleChange}
				required
			/>
			<TextField
				label='DNI'
				type='text'
				name='dni'
				value={userValues.dni}
				onChange={handleChange}
				required
			/>
			<TextField
				label='Fecha de Nacimiento'
				type='date'
				name='fechaNacimiento'
				value={userValues.fechaNacimiento}
				onChange={handleChange}
				InputLabelProps={{ shrink: true }}
				required
			/>
			<TextField
				label='Nombre'
				type='text'
				name='nombre'
				value={userValues.nombre}
				onChange={handleChange}
				required
			/>
			<TextField
				label='Apellido'
				type='text'
				name='apellido'
				value={userValues.apellido}
				onChange={handleChange}
				required
			/>
			{/* <TextField
				label='Teléfono'
				type='tel'
				placeholder='+542214563465'
				name='telefono'
				value={userValues.telefono}
				onChange={handleChange}
				required
			/> */}
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
