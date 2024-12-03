import { default as CardTC } from "../CardTC/CardTC";

export default function viewtc(){
    return (
        <>
            <div className="display: flex justify-around">
                <CardTC textoTit="Codigo de seguimiento:" textoCuerpo="2364736523"></CardTC>
                <CardTC textoTit="Estado del envio:" textoCuerpo="Enviado"></CardTC>
            </div>
        </>
    );
}