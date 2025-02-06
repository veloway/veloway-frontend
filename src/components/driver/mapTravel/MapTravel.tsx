"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L, { LatLngTuple } from "leaflet";
import "leaflet-routing-machine";
import { useViajeActualStore } from "@/stores/viajeActualStore";
import { Skeleton } from "@mui/material";
import { crearCheckpoints } from "@/utils/driver/crearCheckpoints";

const loadRoutingMachine = async (map: L.Map, origen: LatLngTuple, destino: LatLngTuple) => {
	const { RoutingMachine } = await import("./Routing");
	RoutingMachine(map, origen, destino);
};

const RoutingMachine = ({ origen, destino }: { origen: L.LatLngTuple; destino: L.LatLngTuple }) => {
	const map = useMap();

  console.log(origen, destino);
	useEffect(() => {
		if (typeof window === "undefined" || map) {
			loadRoutingMachine(map, origen, destino);
		}
	}, [map, origen, destino]);

	return null;
};

const MapTravel: React.FC = () => {
	const viajeActual = useViajeActualStore((state) => state.viajeActual);
	const getViajeActual = useViajeActualStore((state) => state.getViajeActual);
	const loading = useViajeActualStore((state) => state.loading);

	useEffect(() => {
		getViajeActual("987f6543-e21c-54d3-b789-426614174001").then();
	}, []);

  // useEffect(() => {
	// 	if (viajeActual?.idViaje) {
	// 		console.log("Creando checkpoints para el viaje:", viajeActual.idViaje);
	// 		crearCheckpoints(viajeActual.idViaje)
	// 			.then(() => {
	// 				console.log("Checkpoints creados con éxito");
	// 			})
	// 			.catch((error) => {
	// 				console.error("Error creando checkpoints:", error);
	// 			});
	// 	}
	// }, [viajeActual]);

  
	if (!viajeActual || loading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
	}

  // (async () => { 
  //   await crearCheckpoints(viajeActual?.idViaje)
  // })()
  
	const origen: L.LatLngTuple = [
		viajeActual.origenCord.latitud || 0,
		viajeActual.origenCord.longitud || 0,
	];

	const destino: L.LatLngTuple = [
		viajeActual.destinoCord.latitud || 0,
		viajeActual.destinoCord.longitud || 0,
	];

	// Si alguna coordenada es 0, evitar mostrar el mapa
	if (origen[0] === 0 || origen[1] === 0 || destino[0] === 0 || destino[1] === 0) {
		return <p>Coordenadas inválidas, no se puede generar la ruta.</p>;
	}

	return (
		<MapContainer center={[39.5, -98.35]} zoom={4} className='w-full h-full rounded-md'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<RoutingMachine origen={origen} destino={destino} />
		</MapContainer>
	);
};

export default MapTravel;
