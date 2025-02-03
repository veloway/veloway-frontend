import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import Link from "next/link";

interface ShipmentCreatedConfirmationProps {
    nroSeguimiento: number;
    handleGoBack: () => void;
}

export const ShipmentCreatedConfirmation= ({nroSeguimiento, handleGoBack}:  ShipmentCreatedConfirmationProps) => {
    return (
        <div className="m-auto content-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="flex flex-col items-center gap-6">
                    <CheckIcon className="text-6xl text-green-500" />
                    <h2 className="text-2xl font-bold text-gray-800">¡Envío realizado con éxito!</h2>
                    <div className="bg-gray-100 p-4 rounded-lg w-full">
                        <p className="text-sm text-gray-600">Número de seguimiento:</p>
                        <p className="text-lg font-mono font-bold text-gray-900">{nroSeguimiento}</p>
                    </div>
                    <Button
                        variant="contained"
                        LinkComponent={Link}
                        href="/client/dashboard"
                        onClick={handleGoBack}
                    >
                        Volver al Inicio
                    </Button>
                </div>
            </div>
        </div>
    );
}
