"use client"
import { GetEnvioDto } from "@/entities/envios/getEnvioDto";
import { EnviosService } from "@/services/envios.service";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

// const ShipmentPage = () => {
 
//   const [shipment, setShipment] = useState<GetEnvioDto>();
//   const { nroSeguimiento } = useParams();

//   useEffect(() => {
//     EnviosService.getByNroSeguimiento(Number(nroSeguimiento))
//       .then((shipment) => {
//         setShipment(shipment);
//       })
//   }, [])
  
//   if (!shipment) {
//     return null;
//   }

//   return (
//     <div>{shipment.cliente.nombre}</div>
//   )
// }

// export default ShipmentPage


import React from 'react';

type ShipmentStatus = 'Confirmado' | 'Cancelado' | 'En proceso de retiro' | 'En traslado a destino' | 'Entregado';

function getStatusColor(status: string) {
  switch (status) {
    case 'Confirmado':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Cancelado':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'En proceso de retiro':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'En traslado a destino':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'Entregado':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }
}

function getStatusIcon(status: string) {
  const baseClasses = "w-5 h-5";
  
  switch (status) {
    case 'Confirmado':
      return (
        <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Cancelado':
      return (
        <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'En proceso de retiro':
      return (
        <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
    case 'En traslado a destino':
      return (
        <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'Entregado':
      return (
        <svg className={baseClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}

function ShipmentPage() {
  const [shipment, setShipment] = useState<GetEnvioDto>();
  const { nroSeguimiento } = useParams();

  useEffect(() => {
    EnviosService.getByNroSeguimiento(Number(nroSeguimiento))
      .then((shipment) => {
        setShipment(shipment);
      })
  }, [])
  
  if (!shipment) {
    return null;
  }

  const formatAddress = (address: typeof shipment.origen) => {
    return `${address.calle} ${address.numero}, ${address.localidad.nombre}, ${address.localidad.provincia.nombre}${
      address.descripcion ? ` (${address.descripcion})` : ''
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1565c0]/5 to-[#f8fafc]">
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-[#1565c0] to-[#1976d2] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg font-medium">Estado del Envío</span>
            </div>
            <div className={`px-4 py-2 rounded-full border ${getStatusColor(shipment.estado)} flex items-center gap-2`}>
              {getStatusIcon(shipment.estado)}
              <span className="font-medium">{shipment.estado}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
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

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center w-full">
            {['Confirmado', 'En proceso de retiro', 'En traslado a destino', 'Entregado'].map((step, index) => (
              <div key={step} className="flex flex-col items-center relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === shipment.estado ? 'bg-[#1565c0] text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <p className={`text-xs mt-2 text-center ${
                  step === shipment.estado ? 'text-[#1565c0] font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </p>
                {index < 3 && (
                  <div className={`absolute top-4 left-8 w-[calc(100%-2rem)] h-0.5 ${
                    index < ['Confirmado', 'En proceso de retiro', 'En traslado a destino', 'Entregado'].indexOf(shipment.estado)
                      ? 'bg-[#1565c0]'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Route */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
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

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: 'calendar', label: 'Fecha', value: shipment.fecha, color: 'rose' },
            { icon: 'clock', label: 'Hora', value: shipment.hora, color: 'sky' },
            { icon: 'scale', label: 'Peso', value: `${shipment.pesoGramos}g`, color: 'amber' },
            { icon: 'currency', label: 'Monto', value: `$${shipment.monto}`, color: 'emerald' }
          ].map(({ icon, label, value, color }) => (
            <div key={label} className={`bg-${color}-50 rounded-2xl p-4 border border-${color}-100`}>
              <div className={`text-${color}-700 font-medium mb-1`}>{label}</div>
              <div className="text-lg font-semibold text-gray-900">{value}</div>
            </div>
          ))}
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
              <h2 className="text-xl font-bold text-gray-900">Información del Cliente</h2>
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
  );
}

export default ShipmentPage;