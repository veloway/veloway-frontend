"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useViajeActualStore } from '@/stores/viajeActualStore';
import { destino, origen } from './Routing';


const loadRoutingMachine = async (map: L.Map) => {
  const { RoutingMachine } = await import('./Routing');
  RoutingMachine(map, origen, destino);
};

const RoutingMachine = ({ origen, destino }: { origen: L.LatLngTuple; destino: L.LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    if (typeof window === 'undefined' || map) {
      loadRoutingMachine(map);
    }
  }, [map, origen, destino]);

  return null;
};

const MapTravel: React.FC = () => {
  const viajeActual = useViajeActualStore((state) => state.viajeActual);
  const getViajeActual = useViajeActualStore((state) => state.getViajeActual);
  const loading = useViajeActualStore((state) => state.loading);

  useEffect(() => {
    console.log("Llamando a getViajeActual...");
    getViajeActual("987f6543-e21c-54d3-b789-426614174001");
  }, [loading]);

  // const viajeActual = useViajeActualStore((state) => state.viajeActual);

  // useEffect(() => {
  //   console.log("viajeActual actualizado:", viajeActual);
  // }, [viajeActual]);

  if (!viajeActual) return <p>Cargando viaje...</p>

  // Crea las tuplas de latitud y longitud para origen y destino
  const origen: L.LatLngTuple = [
    viajeActual.origenCord?.latitud || 0, // Usar valor por defecto si es undefined
    viajeActual.origenCord?.longitud || 0, // Usar valor por defecto si es undefined
  ];

  console.log("El origen", origen);
  

  const destino: L.LatLngTuple = [
    viajeActual.destinoCord?.latitud || 0, // Usar valor por defecto si es undefined
    viajeActual.destinoCord?.longitud || 0, // Usar valor por defecto si es undefined
  ];

  console.log("El destino", destino);
  

  // Si alguna coordenada es 0, evitar mostrar el mapa
  if (origen[0] === 0 || origen[1] === 0 || destino[0] === 0 || destino[1] === 0) {
    return <p>Coordenadas inválidas, no se puede generar la ruta.</p>;
  }

  // const origen = [viajeActual.origenCord.latitud, viajeActual.origenCord.longitud] as L.LatLngTuple
  // const destino = [viajeActual.destinoCord.latitud, viajeActual.destinoCord.longitud] as L.LatLngTuple

  if(loading) return <p>Cargando rutas</p>
  return (
    <MapContainer
      center={[39.5, -98.35]}
      zoom={4}
      className="w-[900px] h-[500px] rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine origen={origen} destino={destino}/>
    </MapContainer>
  );
};

export default MapTravel;

