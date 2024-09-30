import React from 'react';

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

interface Props {
  vehiculos: Vehiculo[];
  editVehiculo: (index: number) => void; // Función para editar vehículo
  deleteVehiculo: (index: number) => void; // Función para eliminar vehículo
}

const VehiculoList: React.FC<Props> = ({ vehiculos, editVehiculo, deleteVehiculo }) => {
  return (
    <div className="space-y-4 mt-4">
      {vehiculos.length > 0 ? (
        vehiculos.map((vehiculo, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-lg">{`${vehiculo.tipoVehiculo.nombre} - ${vehiculo.tipoVehiculo.modelo.nombre} (${vehiculo.tipoVehiculo.modelo.marca})`}</h3>
            <p><strong>Año:</strong> {vehiculo.anio}</p>
            <p><strong>Color:</strong> {vehiculo.color}</p>
            <p><strong>Descripción:</strong> {vehiculo.descripcion}</p>
            <p><strong>Nombre del Seguro:</strong> {vehiculo.nomSeguro}</p>
            <p><strong>Patente:</strong> {vehiculo.patente}</p>
            <p><strong>Titular:</strong> {vehiculo.titular.nombre} (Documento: {vehiculo.titular.documento})</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => editVehiculo(index)} // Llama a la función de editar
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => deleteVehiculo(index)} // Llama a la función de eliminar
                className="bg-red-500 text-white p-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="border border-dashed border-gray-400 rounded p-4 bg-gray-100 text-center">
          <p>No hay vehículos registrados. Por favor, agrega uno.</p>
        </div>
      )}
    </div>
  );
};

export default VehiculoList;
