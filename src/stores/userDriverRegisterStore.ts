import { create } from "zustand";
import { LicenciaDto } from "@/entities/licencia";
import { VehiculoDto } from "@/entities/vehiculo/vehiculo";
import { FichaMedicaDto } from "@/entities/fichaMedica";


interface DriverRegistroStore{
    licenseValues: LicenciaDto,
    medicalFileValues: FichaMedicaDto,
    vehicleValues: VehiculoDto
    setLicenseValues: (values: Partial<LicenciaDto>) => void;
    setMedicalFileValues: (values: Partial<FichaMedicaDto>) => void;
    setVehicleValues: (values: Partial<VehiculoDto>) => void;
}

export const useDriverRegistroStore = create<DriverRegistroStore>((set)=> ({
    licenseValues:{
        numero: 0,
        categoria: "",
        fechavencimiento: ""
    },
    medicalFileValues:{
        altura: 0,
        peso: 0,
        enfermedadCardiaca: "",
        enfermedadRespiratoria: "",
        alergias: "",
        epilepsia: false,
        diabetes: false,
        compartirFichaMedica: false
    },
    vehicleValues:{
        patente: "",
        modelo: "",
        tipoVehiculo: "",
        anio: "",
        estado: "",
        titular: { nombre: "", documento: "" },
        color: "",
        descripcion: "",
        nomSeguro: ""
    },
    setLicenseValues: (values) =>
        set((state) => ({ licenseValues: { ...state.licenseValues, ...values} })),
    setMedicalFileValues: (values) =>
        set((state) => ({ medicalFileValues: { ...state.medicalFileValues, ...values} })),
    setVehicleValues: (values) =>
        set((state) => ({ vehicleValues: { ...state.vehicleValues, ...values} })),
}));
