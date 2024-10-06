"use client";

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

const MapTravel: React.FC = () => {
  useEffect(() => {
    let map: L.Map | null = null;
    let routingControl: L.Routing.Control | null = null;

    if (typeof window !== 'undefined') {
      // Inicializa el mapa solo si la ventana está disponible
      map = L.map('map').setView([-34.92102192210491, -57.95456607172279], 15);

      // Ícono personalizado para el autito
      const carIcon = L.icon({
        iconUrl: 'https://img.icons8.com/?size=100&id=KX1EJ8mb4zzD&format=png&color=005490',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      // Capa base del mapa
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.Routing.control({
        waypoints: [
            L.latLng(-34.88435373023903, -58.05395088137856),
            L.latLng(-34.904045188515084, -57.92589693187078),
        ],
        }).addTo(map);

    }

    return () => {
        if (map) {
            map.remove();
          }
    };
  }, []);

  return (
    <div
      id="map"
      className="w-[900px] h-[450px]"
    />
  );
};

export default MapTravel;

// L.latLng(-34.88435373023903, -58.05395088137856),
// L.latLng(-34.904045188515084, -57.92589693187078),