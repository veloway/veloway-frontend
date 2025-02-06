"use client";

import { useEffect, useState } from "react";
import { useRegistroStoreDto } from "@/stores/userRegisterStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Paper, Stack, Typography, TextField, Button, Divider, Tabs, Tab } from "@mui/material";
import { authService } from "@/services/auth.service";
import DomicilioForm from "@/components/auth/DomicilioForm";
import { LocalidadesService } from "@/services/localidades.service";
import { Localidad } from "@/entities/localidad";

const DriverProfile = () => {
    const router = useRouter();
    const { userData, setUserData, addressData, setAddressData } = useRegistroStoreDto();
    const [tab, setTab] = useState(0);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);


    useEffect(() => {
        LocalidadesService.getLocalidades().then((localidades) => setLocalidades(localidades));
    }, []);

    // Manejador de cambios en tabs
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    // Manejo de cambios en los campos
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const updateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await authService.updateUser(userData)

        } catch (error) {
            toast.error("Error al actualizar usuario");
        }
    };

    const updateAddres = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await authService.updateAddress(addressData)
        } catch (error) {
            toast.error("Error al actualizar usuario");
        }
    }

    // Dar de baja la cuenta
    const cancelAccount = async () => {
        try {
            await authService.cancelAccount()
            toast.success("Cuenta eliminada, se eliminará la sesion");
            router.push("/auth/login");
        } catch {
            toast.error("Error al eliminar la cuenta");
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", my: 4 }}>
            <Typography variant="h4" gutterBottom className="text-center">
                Perfil de Conductor
            </Typography>

            {/* Menú de Opciones */}
            <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Informacion de Usuario" />
                <Tab label="Actualizar Usuario" />
                <Tab label="Actualizar Domicilio" />
                <Tab label="Eliminar cuenta"></Tab>
            </Tabs>

            <Divider sx={{ my: 2 }} />

            {/* Contenido de cada Tab */}
            {tab === 1 && (
                <Stack spacing={2} className="text-center">
                    <Typography variant="h6">Modificar Usuario</Typography>
                    <TextField label="Nombre" name="nombre" value={userData.nombre} onChange={handleUserChange} fullWidth />
                    <TextField label="Email" name="email" value={userData.email} onChange={handleUserChange} fullWidth />
                    <TextField label="Apellido" name="apellido" value={userData.apellido} onChange={handleUserChange} fullWidth />
                    <TextField label="Telefono" name="telefono" value={userData.telefono} onChange={handleUserChange} fullWidth />

                    <Button variant="contained" onClick={updateUser}>Actualizar Usuario</Button>
                </Stack>
            )}

            {tab === 2 && (
                <Stack spacing={2} className="text-center">
                    <Typography variant="h6">Modificar domicilio</Typography>
                    <div className="flex justify-center">
                        <DomicilioForm localidades={localidades} />
                    </div>

                    <Button variant="contained" onClick={updateAddres}>Actualizar Domicilio</Button>
                </Stack>
            )}


            {tab === 3 && (
                <Stack spacing={2} className="text-center">
                    <Typography variant="h6" color="error">
                        Dar de baja la cuenta
                    </Typography>
                    <Button variant="outlined" color="error" onClick={cancelAccount}>
                        Eliminar Cuenta
                    </Button>
                </Stack>
            )}

            {tab === 0 && (
                <Stack spacing={2} className="text-center">
                    <Typography variant="h6">Informacion de Usuario</Typography>
                    <Typography variant="h6">Nombre: {`${userData?.nombre ?? ""} ${userData?.apellido ?? ""}`}</Typography>
                    {userData.dni != 0 ? <Typography variant="h6">Dni: {`${userData?.dni ?? ""}`}</Typography>
                        : null}                    
                    <Typography variant="h6">Email: {`${userData?.email ?? ""}`}</Typography>
                    {userData.telefono ? <Typography variant="h6">Telefono: {`${userData?.telefono ?? ""}`}</Typography>
                        : null}
                </Stack>
            )}
        </Paper>
    );
};

export default DriverProfile;
