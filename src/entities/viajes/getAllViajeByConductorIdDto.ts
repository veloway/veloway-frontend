import { GetEnvioDto } from "../envios/getEnvioDto";

export type GetAllByConductorID = {
    idViaje:        number;
    idConductor:    string;
    envio: GetEnvioDto;
    fechaInicio:    string;
}

