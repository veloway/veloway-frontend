"use client";

import React, { useState } from 'react';
import VehiculoForm from '@/components/vehiculo/VehiculoForm';

interface Vehiculo {
  anio: string;
  color: string;
  descripcion: string;
  nomSeguro: string;
  patente: string;
  tipoVehiculo: {
    nombre: string;
    modelo: {
      nombre: string;
      marca: string;
    };
  };
  titular: {
    nombre: string;
    documento: string;
  };
}

const VehiculoPage: React.FC = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addVehiculo = (vehiculo: Vehiculo) => {
    if (editIndex !== null) {
      setVehiculos((prev) => {
        const updatedVehiculos = [...prev];
        updatedVehiculos[editIndex] = vehiculo;
        return updatedVehiculos;
      });
      setEditIndex(null);
    } else {
      setVehiculos((prev) => [...prev, vehiculo]);
    }
  };

  const editVehiculo = (index: number) => {
    setEditIndex(index);
  };

  const deleteVehiculo = (index: number) => {
    if (index < 0 || index >= vehiculos.length) {
      console.error("Índice de vehículo no válido.");
      return;
    }
    setVehiculos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Formulario de registro de vehículo */}
        <VehiculoForm addVehiculo={addVehiculo} editIndex={editIndex} vehiculos={vehiculos} />
      </div>
    </div>
  );
};

export default VehiculoPage;
