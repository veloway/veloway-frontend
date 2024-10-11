interface Usuario { 
    dni: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaNac: string;
    esConductor: boolean;
    idDomicilio: number;
}

interface Domicilio {
    idDomicilio: number;
    calle: string;
    numero: number;
    depto: string | null;
    piso: number | null;
    descripcion: string;
}


export const clientes: Usuario[] = [
    {
        dni: 43897799,
        nombre: "Juan",
        apellido: "Perez",
        email: "juanperez@ejemplo.com",
        telefono: "2211234567",
        fechaNac: "12/12/1990",
        esConductor: false,
        idDomicilio: 1,
    },
    {
        dni: 43897800,
        nombre: "Marina",
        apellido: "Gomez",
        email: "marinagomez@ejemplo.com",
        telefono: "2211234568",
        fechaNac: "15/05/1992",
        esConductor: true,
        idDomicilio: 2,
    },
    {
        dni: 43897801,
        nombre: "Carlos",
        apellido: "Fernandez",
        email: "carlosfernandez@ejemplo.com",
        telefono: "2211234569",
        fechaNac: "20/10/1985",
        esConductor: true,
        idDomicilio: 3,
    },
    {
        dni: 43897802,
        nombre: "Lucía",
        apellido: "Martínez",
        email: "luciamartinez@ejemplo.com",
        telefono: "2211234570",
        fechaNac: "30/07/1988",
        esConductor: false,
        idDomicilio: 4,
    },
    {
        dni: 43897803,
        nombre: "Diego",
        apellido: "Lopez",
        email: "diegolopez@ejemplo.com",
        telefono: "2211234571",
        fechaNac: "01/01/1995",
        esConductor: false,
        idDomicilio: 5,
    },
];

export const domicilios: Domicilio[] = [
    {
        idDomicilio: 1,
        calle: "7",
        numero: 1569,
        depto: "A",
        piso: 1,
        descripcion: "Entre 63 y 64"
    },
    {
        idDomicilio: 2,
        calle: "32",
        numero: 1254,
        depto: null,
        piso: null,
        descripcion: "Entre 24 y 25, casi llegando a 25, Rejas negras"
    },
    {
        idDomicilio: 3,
        calle: "12",
        numero: 2001,
        depto: "B",
        piso: 2,
        descripcion: "Frente a la plaza central"
    },
    {
        idDomicilio: 4,
        calle: "45",
        numero: 1020,
        depto: "C",
        piso: 3,
        descripcion: "Cerca del supermercado"
    },
    {
        idDomicilio: 5,
        calle: "89",
        numero: 456,
        depto: null,
        piso: 1,
        descripcion: "A una cuadra de la estación de tren"
    },
];