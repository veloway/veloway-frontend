export const dataEnviosTabla = [
    {
        id: 1,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 2,
        destino: "7 1569 e/ 63 y 64",
        estado: "Entregado",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    {
        id: 3,
        destino: "7 1569 e/ 63 y 64",
        estado: "En camino",
        fecha: "12/12/2021 12:00",
    },
    
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