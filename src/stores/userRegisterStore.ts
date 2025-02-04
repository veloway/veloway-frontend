// store.ts
import { create } from "zustand";
import { DomicilioDto } from "@/entities/domicilio";
import { UsuarioDto } from "@/entities/usuario";

interface Usuario {
  email: string;
  password: string;
  dni: string;
  fechaNacimiento: string;
  nombre: string;
  apellido: string;
  telefono: string;
  esCondutor: boolean;
}

interface RegistroStore {
  userValues: Usuario;
  addressValues: DomicilioDto;
  setUserValues: (values: Partial<Usuario>) => void;
  setAddressValues: (values: Partial<DomicilioDto>) => void;
}

interface RegistroStoreDTO {
  userData: UsuarioDto;
  addressData: DomicilioDto;
  setUserData: (values: Partial<UsuarioDto>) => void;
  setAddressData: (values: Partial<DomicilioDto>) => void;
}

export const useRegistroStore = create<RegistroStore>((set) => ({
  userValues: {
    email: "",
    password: "",
    dni: "",
    fechaNacimiento: "",
    nombre: "",
    apellido: "",
    telefono: "",
    esCondutor: false
  },
  addressValues: {
    calle: "",
    numero: 0,
    descripcion: "",
    piso: null,
    depto: "",
    localidadID: null,
  },
  setUserValues: (values) =>
    set((state) => ({ userValues: { ...state.userValues, ...values } })),
  setAddressValues: (values) =>
    set((state) => ({ addressValues: { ...state.addressValues, ...values } })),
}))

export const useRegistroStoreDto = create <RegistroStoreDTO>((set) => ({
  userData: {
    dni: 0,
    email: "",
    fechaNac: new Date(0),
    nombre: "",
    apellido: "",
    esConductor: false,
    telefono: "",
    apiKey: ""
  },
  addressData: {
    calle: "",
    numero: 0,
    descripcion: null,
    piso: null,
    depto: null,
    localidadID: null,
  },
  setUserData: (values) =>
    set((state) => ({ userData: { ...state.userData, ...values } })),
  setAddressData: (values) =>
    set((state) => ({ addressData: { ...state.addressData, ...values } })),
}));