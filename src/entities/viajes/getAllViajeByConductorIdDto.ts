import { GetEnvioDto } from "../envios/getEnvioDto";

export type GetAllByConductorIDDto = {
    idViaje:        number;
    idConductor:    string;
    envio: GetEnvioDto;
    fechaInicio:    string;
}

