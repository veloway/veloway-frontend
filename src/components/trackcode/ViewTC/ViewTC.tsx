import CardTC from "../CardTC/CardTC";
import ProgressBar from "../ProgressBar/ProgressBar";

const steps = [
    { label: "Retirado", isActive: true },
    { label: "Llegó a nuestra sucursal", isActive: true },
    { label: "Visita a domicilio", isActive: true },
    { label: "Entregado", isActive: true },
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
        </>
    );
}