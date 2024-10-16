"use client";

import React, { useState, useEffect } from 'react';

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
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null); 
  const [editMode, setEditMode] = useState<boolean>(false); 
  const [formData, setFormData] = useState<Vehiculo | null>(null); 

 
  const saveVehiculo = (nuevoVehiculo: Vehiculo) => {
    setVehiculo(nuevoVehiculo); 
    setEditMode(false); 
    setFormData(null); 
  };

  const editVehiculo = () => {
    setEditMode(true);
    setFormData(vehiculo); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      saveVehiculo(formData); // Guardar los datos editados
    }
  };

  const deleteVehiculo = () => {
    setVehiculo(null); // Borrar el vehículo
    setEditMode(false); // Salir del modo de edición
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg transition-transform transform hover:scale-105">
        {vehiculo ? (
          <div>
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
                  Editar Vehículo
                </h2>
                <div className="mb-6">
                  <label className="block mb-2">
                    Patente:
                    <input
                      type="text"
                      name="patente"
                      value={formData?.patente}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Año:
                    <input
                      type="text"
                      name="anio"
                      value={formData?.anio}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Color:
                    <input
                      type="text"
                      name="color"
                      value={formData?.color}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Descripción:
                    <input
                      type="text"
                      name="descripcion"
                      value={formData?.descripcion}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Seguro:
                    <input
                      type="text"
                      name="nomSeguro"
                      value={formData?.nomSeguro}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Modelo:
                    <input
                      type="text"
                      name="tipoVehiculo.modelo.nombre"
                      value={formData?.tipoVehiculo.modelo.nombre}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Marca:
                    <input
                      type="text"
                      name="tipoVehiculo.modelo.marca"
                      value={formData?.tipoVehiculo.modelo.marca}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Titular:
                    <input
                      type="text"
                      name="titular.nombre"
                      value={formData?.titular.nombre}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Documento Titular:
                    <input
                      type="text"
                      name="titular.documento"
                      value={formData?.titular.documento}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full"
                      required
                    />
                  </label>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={deleteVehiculo}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Borrar
                  </button>
                </div>
              </form>
            ) : (
              <>
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
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    onClick={editVehiculo}
                  >
                    Editar
                  </button>
                  <button
                    onClick={deleteVehiculo}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Borrar
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              No hay vehículo registrado
            </h2>
            <div className="flex justify-center mt-4">
              <p className="text-gray-600">Por favor, registra un vehículo.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiculoPage;
