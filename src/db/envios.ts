import { origen } from "@/components/driver/mapTravel/Routing";

export const dataEnviosTabla = [
    {
        id: 1,
        destino: "Calle 25 e/ 32 y 33",
        origen: "Calle 8 y 60",
        estado: "En camino",
        fecha: "13/12/2021 14:30",
        reserva: true,
        dni: 43897801
      },
      {
        id: 2,
        destino: "Avenida 44 e/ 7 y 8",
        origen: "Calle 7 y 50",
        estado: "Entregado",
        fecha: "12/12/2021 16:45",
        reserva: true,
        dni: 43897801
      },
      {
        id: 3,
        destino: "Calle 50 e/ 15 y 16",
        origen: "Avenida 13 y 44",
        estado: "En camino",
        fecha: "14/12/2021 09:00",
        reserva: true,
        dni: 43897801
      },
      {
        id: 4,
        destino: "Avenida 32 e/ 19 y 20",
        origen: "Calle 10 y 64",
        estado: "En camino",
        fecha: "12/12/2021 18:30",
        reserva: false,
        dni: 43897801
      },
      {
        id: 5,
        destino: "Calle 10 e/ 50 y 51",
        origen: "Avenida 53 y 11",
        estado: "En camino",
        fecha: "15/12/2021 10:15",
        reserva: true,
        dni: 43897801
      },
      {
        id: 6,
        destino: "Calle 18 e/ 67 y 68",
        origen: "Calle 6 y 59",
        estado: "En camino",
        fecha: "13/12/2021 12:45",
        reserva: true,
        dni: 43897801
      },
      {
        id: 7,
        destino: "Calle 7 e/ 42 y 43",
        origen: "Calle 9 y 66",
        estado: "En camino",
        fecha: "14/12/2021 11:00",
        reserva: true,
        dni: 43897801
      },
      {
        id: 8,
        destino: "Avenida 60 e/ 7 y 8",
        origen: "Avenida 7 y 70",
        estado: "En camino",
        fecha: "13/12/2021 17:00",
        reserva: true,
        dni: 43897801
      },
      {
        id: 9,
        destino: "Calle 48 e/ 2 y 3",
        origen: "Calle 12 y 48",
        estado: "En camino",
        fecha: "15/12/2021 09:30",
        reserva: true,
        dni: 43897801
      }
      
      
    
];

interface Envio {
    nro_seguimiento: number;
    descripcion: string;
    fecha: string;
    hora: string;
    peso_gramos: number;
    dni: number;
    id_estado: number;
    id_origen: number;
    id_destino: number;
    id_viaje: number;
}

export const envios: Envio[] = [
    {
        nro_seguimiento: 100000001,
        descripcion: "Envío de documentos importantes.",
        fecha: "2024-10-01",
        hora: "10:30:00",
        peso_gramos: 500.00,
        dni: 43897799,
        id_estado: 1,
        id_origen: 1,
        id_destino: 2,
        id_viaje: 1,
    },
    {
        nro_seguimiento: 100000002,
        descripcion: "Paquete con artículos de oficina.",
        fecha: "2024-10-02",
        hora: "14:15:00",
        peso_gramos: 1500.00,
        dni: 43897800,
        id_estado: 1,
        id_origen: 2,
        id_destino: 3,
        id_viaje: 1,
    },
    {
        nro_seguimiento: 100000003,
        descripcion: "Envío de ropa y calzado.",
        fecha: "2024-10-03",
        hora: "09:00:00",
        peso_gramos: 3000.00,
        dni: 43897801,
        id_estado: 2,
        id_origen: 3,
        id_destino: 4,
        id_viaje: 2,
    },
    {
        nro_seguimiento: 100000004,
        descripcion: "Entrega de regalos de cumpleaños.",
        fecha: "2024-10-04",
        hora: "11:45:00",
        peso_gramos: 1200.00,
        dni: 43897802,
        id_estado: 3,
        id_origen: 4,
        id_destino: 5,
        id_viaje: 2,
    },
    {
        nro_seguimiento: 100000005,
        descripcion: "Envío de mercancía frágil.",
        fecha: "2024-10-05",
        hora: "16:20:00",
        peso_gramos: 2500.00,
        dni: 43897803,
        id_estado: 1,
        id_origen: 5,
        id_destino: 1,
        id_viaje: 3,
    },
];