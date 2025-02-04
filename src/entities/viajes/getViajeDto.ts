import { GetEnvioDto } from "../envios/getEnvioDto";

export type GetViajeDto = {
    idViaje: number;
    checkpointActual: number;
    fechaFin: string | null;
    fechaInicio: string | null;
    idConductor: string;
    envio: Envio;
    origenCord: Coordenada;
    destinoCord: Coordenada;
}

type Envio = {
    nroSeguimiento: number;
    descripcion:    string;
    fecha:          string;
    hora:           string;
    pesoGramos:     number;
    monto:          number;
    reserva:        boolean;
    estado:         string;
    origen:         Origen;
    destino:        Destino;
    cliente:        Cliente;
}

type Cliente = {
    dni:      number;
    email:    string;
    nombre:   string;
    apellido: string;
    telefono?: string | null | undefined;
}

type Origen = {
    id:          string;
    calle:       string;
    numero:      number;
    localidad:   Localidad;
    piso:        string | null;
    depto:       null | string;
    descripcion?: string | null | undefined;
}

type Destino = {
    id:          string;
    calle:       string;
    numero:      number;
    localidad:   Localidad;
    piso:        string | null;
    depto:       null | string;
    descripcion?: string | null | undefined;
}

type Localidad = {
    id:           number;
    codigoPostal: string;
    nombre:       string;
    provincia:    Provincia;
}

type Provincia = {
    id:     number;
    nombre: string;
}

type Coordenada = {
    latitud: number;
    longitud: number;
}