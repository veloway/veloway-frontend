import { EnvioDto } from '@/entities/envio';
import { create } from 'zustand';

interface ShipmentStore {
    shipment: EnvioDto;
    setShipment: (shipment: EnvioDto) => void;
}

export const useShipmentRegisterStore = create<ShipmentStore>((set, get) => ({
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

    setShipment: (shipment: EnvioDto) => set({ shipment }),
}));