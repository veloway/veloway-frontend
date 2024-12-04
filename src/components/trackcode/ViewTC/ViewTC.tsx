import CardTC from "../CardTC/CardTC";
import ProgressBar from "../ProgressBar/ProgressBar";

const steps = [
    { label: "Retirado", isActive: true },
    { label: "Llegó a nuestra sucursal", isActive: false },
    { label: "Visita a domicilio", isActive: false },
    { label: "Entregado", isActive: false },
  ];

const lastActiveStep = steps.filter((step) => step.isActive).pop();

const lastActiveStepLabel = lastActiveStep ? lastActiveStep.label : "No iniciado";

export default function viewtc(){
    return (
        <>
            <div className="p-8">
                <ProgressBar steps={steps} />
                <div className="flex justify-between text-sm mt-4">
                    {steps.map((step, index) => (
                    <span
                        key={index}
                        className={`${
                        step.isActive ? "text-blue-600" : "text-gray-500"
                        }`}
                    >
                        {step.label}
                    </span>
                    ))}
                </div>
            </div>
            
            <div className="display: flex justify-around">
                <CardTC textoTit="Codigo de seguimiento:" textoCuerpo="2364736523"></CardTC>
                <CardTC textoTit="Estado del envio:" textoCuerpo={lastActiveStepLabel}></CardTC>
            </div>

            <div className="display: flex justify-around m-16">
                <div className="grid grid-rows-auto text-center justify-center outline outline-blue-500 rounded-md p-4  w-1/2 bg-blue-100">
                    <p className="font-bold">Origen: </p>
                    <p className="mb-4">Honorio Pueyrredon 1841, Capital Federal - BUENOS AIRES</p>
                    <p className="font-bold">Destino: </p>
                    <p className="mb-4">443 3283, City Bell - BUENOS AIRES</p>
                    <p className="font-bold">Monto: </p>
                    <p className="mb-4">$98.000</p>
                    <p className="font-bold">Peso (gr): </p> 
                    <p>6537</p>
                </div>
            </div>
            
        </>
    );
}