"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const loadRoutingMachine = async (map: L.Map) => {
  const { RoutingMachine } = await import('./Routing');
  RoutingMachine(map);
};

const RoutingMachine = () => {
  const map = useMap();

  useEffect(() => {
    if (typeof window === 'undefined' || map) {
      loadRoutingMachine(map);
    }
  }, [map]);

  return null;
};

const MapTravel: React.FC = () => {
  return (
    <MapContainer
      center={[39.5, -98.35]}
      zoom={4}
      className="w-[900px] h-[450px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine />
    </MapContainer>
  );
};

export default MapTravel;

