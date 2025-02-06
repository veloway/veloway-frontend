// store.ts
import { create } from "zustand";
import { Licencia } from "@/entities/licencia";
import  { FichaMedica } from "@/entities/fichaMedica"
import { Vehiculo } from "@/entities/vehiculo";


interface DriverRegistroStore {
  carnetValues: FichaMedica  
  setCarnetValues: (values: Partial<FichaMedica>) => void;
  licenseValues: Licencia
  setLicenseValues: (values: Partial<Licencia>)  => void;
  vehicleValues: Vehiculo
  setVehicleValues: (values: Partial<Vehiculo>)  => void;
}


export const useDriverRegistroStore = create<DriverRegistroStore>((set) => ({
    carnetValues: {
        altura: 0,
        peso: 0,
        enfermedadCardiaca: "",
        enfermedadRespiratoria: "",
        alergias: "",
        epilepsia: false,
        diabetes: false,
        compartir: false    
    },


    setCarnetValues: (values) =>
    set((state) => ({ carnetValues: { ...state.carnetValues, ...values } })),


    licenseValues: {
        numero: 0,
        categoria: "",
        fechavencimiento: ""
    },

    setLicenseValues: (values) =>
    set((state) => ({ licenseValues: { ...state.licenseValues, ...values } })),


    vehicleValues: {
        anio: 0,
        color: "",
        descripcion: "",
        patente: "",
        tipoVehiculoId: 0,
        modeloId: 0,
        marcaId: 0 
    },

    setVehicleValues: (values) =>
    set((state) => ({ vehicleValues: { ...state.vehicleValues, ...values } })),
    


}))

