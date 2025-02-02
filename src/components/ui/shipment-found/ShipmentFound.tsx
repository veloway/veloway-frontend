import { GetEnvioDto } from "@/entities/envios/getEnvioDto";
import { Step, StepLabel, Stepper } from "@mui/material";

interface ShipmentFoundProps {
    shipment: GetEnvioDto;
}

enum ShipmentStatus {
    Confirmado = 'Confirmado',
    Cancelado = 'Cancelado',
    EnProcesoDeRetiro = 'En proceso de retiro',
    EnTrasladoADestino = 'En traslado a destino',
    Entregado = 'Entregado'
  }
  
  function getStatusColor(status: ShipmentStatus) {
    switch (status) {
      case ShipmentStatus.Confirmado:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case ShipmentStatus.Cancelado:
        return 'bg-red-100 text-red-800 border-red-200';
      case ShipmentStatus.EnProcesoDeRetiro:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case ShipmentStatus.EnTrasladoADestino:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case ShipmentStatus.Entregado:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  }
  
  function getStatusIcon(status: ShipmentStatus) {
    const baseClasses = "w-5 h-5";
    
    switch (status) {
      case ShipmentStatus.Confirmado:
        return (
          <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case ShipmentStatus.Cancelado:
        return (
          <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case ShipmentStatus.EnProcesoDeRetiro:
        return (
          <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case ShipmentStatus.EnTrasladoADestino:
        return (
          <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case ShipmentStatus.Entregado:
        return (
          <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  }

export const ShipmentFound = ({ shipment }: ShipmentFoundProps) => {
    const formatAddress = (address: typeof shipment.origen) => {
        return `${address.calle} ${address.numero}, ${address.localidad.nombre}, ${address.localidad.provincia.nombre}${
          address.descripcion ? ` (${address.descripcion})` : ''
        }`;
    };

    return (
        <div className="bg-gradient-to-b from-[#1565c0]/5 to-[#f8fafc] w-full flex flex-col">
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-[#1565c0] to-[#1976d2] text-white">
        <div className="containerMarginResposive py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-lg font-medium">Estado del Envío</span>
        </div>
        <div className={`px-4 py-2 rounded-md border ${getStatusColor(shipment.estado as ShipmentStatus)} flex items-center gap-2`}>
          {getStatusIcon(shipment.estado as ShipmentStatus)}
          <span className="font-medium">{shipment.estado}</span>
        </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="containerMarginResposive py-8 w-full flex flex-col justify-between flex-1 gap-10">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8 text-[#1565c0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Seguimiento de Envío</h1>
                  <p className="text-gray-500">N° <span className="font-medium text-[#1565c0]">{shipment.nroSeguimiento}</span></p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto bg-gradient-to-r from-[#1565c0]/10 to-[#1976d2]/10 px-6 py-3 rounded-xl">
              <p className="text-[#1565c0] font-medium">{shipment.descripcion}</p>
            </div>
          </div>
        </div>

        {/* Progress Stepper */}
        <Stepper 
          activeStep={[ShipmentStatus.Confirmado, ShipmentStatus.EnProcesoDeRetiro, ShipmentStatus.EnTrasladoADestino, ShipmentStatus.Entregado].indexOf(shipment.estado as ShipmentStatus)} 
          alternativeLabel
          className="py-6"
          >
          {[ShipmentStatus.Confirmado, ShipmentStatus.EnProcesoDeRetiro, ShipmentStatus.EnTrasladoADestino, ShipmentStatus.Entregado].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
      </Stepper>

        {/* Shipping Route */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Origen</h2>
                <p className="text-gray-500">{formatAddress(shipment.origen)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Destino</h2>
                <p className="text-gray-500">
                  {formatAddress(shipment.destino)}
                  {shipment.destino.piso && (
                    <span className="block text-sm mt-1">
                      Piso {shipment.destino.piso} {shipment.destino.depto && `- Depto ${shipment.destino.depto}`}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

         {/* Info Cards */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500 mb-1">Fecha</span>
          <p className="text-lg font-semibold text-gray-900">{shipment.fecha}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500 mb-1">Hora</span>
          <p className="text-lg font-semibold text-gray-900">{shipment.hora}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m-4-4h8" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500 mb-1">Peso</span>
          <p className="text-lg font-semibold text-gray-900">{shipment.pesoGramos}g</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3-3-3zm0 0V4m0 8v8m-4-4h8" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500 mb-1">Monto</span>
          <p className="text-lg font-semibold text-gray-900">${shipment.monto}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Información del Remitente</h2>
              <p className="text-gray-500">Detalles del destinatario</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Nombre Completo</p>
                <p className="text-gray-900">{shipment.cliente.nombre} {shipment.cliente.apellido}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">DNI</p>
                <p className="text-gray-900">{shipment.cliente.dni}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">{shipment.cliente.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Teléfono</p>
                <p className="text-gray-900">{shipment.cliente.telefono}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}