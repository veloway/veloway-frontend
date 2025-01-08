import { create } from 'zustand';

interface DomicilioRegister {
    calle: string
    numero: number
    piso: number | null
    depto: string | null
    descripcion: string | null
    localidadID: number
}

interface ShipmentRegister {
    descripcion: string
    fecha: string
    hora: string
    pesoGramos: number
    origen: DomicilioRegister
    destino: DomicilioRegister
    cliente: string 
    reserva: boolean | null
}

interface ShipmentStore {
    shipment: ShipmentRegister;
    setShipment: (shipment: ShipmentRegister) => void;
}


export const useShipmentRegisterStore = create<ShipmentStore>((set) => ({
    shipment: {
        descripcion: '',
        fecha: '',
        hora: '',
        pesoGramos: 0,
        origen: {
            calle: '',
            numero: 0,
            piso: null,
            depto: null,
            descripcion: null,
            localidadID: 0
        },
        destino: {
            calle: '',
            numero: 0,
            piso: null,
            depto: null,
            descripcion: null,
            localidadID: 0
        },
        cliente: '',
        reserva: null
    },

    setShipment: (shipment: ShipmentRegister) => set({ shipment })
}));