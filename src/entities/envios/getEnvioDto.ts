export type GetEnvioDto = {
    nroSeguimiento: number;
    descripcion:    string;
    fecha:          string;
    hora:           string;
    pesoGramos:     number;
    monto:          number;
    reserva:        boolean;
    estado:         string;
    origen:         Destino;
    destino:        Destino;
    cliente:        Cliente;
}

type Cliente = {
    dni:      number;
    email:    string;
    nombre:   string;
    apellido: string;
    telefono: string;
}

type Destino = {
    id:          number;
    calle:       string;
    numero:      number;
    localidad:   Localidad;
    piso:        number | null;
    depto:       null | string;
    descripcion: string;
}

type Localidad = {
    id:           number;
    codigoPostal: number;
    nombre:       string;
    provincia:    Provincia;
}

type Provincia = {
    id:     number;
    nombre: string;
}