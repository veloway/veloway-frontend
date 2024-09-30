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
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null); // Guardar solo un vehículo
  const [editMode, setEditMode] = useState<boolean>(false); // Modo de edición

  // Función para agregar o editar el vehículo
  const saveVehiculo = (nuevoVehiculo: Vehiculo) => {
    setVehiculo(nuevoVehiculo); // Guardar o actualizar el vehículo
    setEditMode(false); // Salir del modo de edición
  };

  // Función para habilitar la edición
  const editVehiculo = () => {
    setEditMode(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg transition-transform transform hover:scale-105">
        {vehiculo ? (
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              Vehículo Registrado
            </h2>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-lg font-medium"><strong>Patente:</strong> {vehiculo.patente}</p>
              <p className="text-lg font-medium"><strong>Año:</strong> {vehiculo.anio}</p>
              <p className="text-lg font-medium"><strong>Color:</strong> {vehiculo.color}</p>
              <p className="text-lg font-medium"><strong>Descripción:</strong> {vehiculo.descripcion}</p>
              <p className="text-lg font-medium"><strong>Seguro:</strong> {vehiculo.nomSeguro}</p>
              <p className="text-lg font-medium"><strong>Modelo:</strong> {vehiculo.tipoVehiculo.modelo.nombre}</p>
              <p className="text-lg font-medium"><strong>Marca:</strong> {vehiculo.tipoVehiculo.modelo.marca}</p>
              <p className="text-lg font-medium"><strong>Titular:</strong> {vehiculo.titular.nombre}</p>
              <p className="text-lg font-medium"><strong>Documento Titular:</strong> {vehiculo.titular.documento}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                onClick={editVehiculo}
              >
                Editar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              No hay vehículo registrado
            </h2>
            <div className="flex justify-center mt-4">
              <p className="text-gray-600">Por favor, registre un vehículo.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiculoPage;
