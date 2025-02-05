import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L, { LatLng, LatLngTuple } from "leaflet";
import "leaflet-routing-machine";
import { toast } from "react-toastify";

L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

let globalOrigen: LatLngTuple;
let globalDestino: LatLngTuple;

let carMarker: L.Marker | null = null; // Variable para almacenar el marcador del auto
let checkpoints: LatLngTuple[] = []; // Variable para almacenar los checkpoints

export const RoutingMachine = (map: L.Map, origen: LatLngTuple, destino: LatLngTuple) => {
	if (typeof window === "undefined" || !map) return;

	const carIcon = L.icon({
		iconUrl: "https://img.icons8.com/?size=100&id=KX1EJ8mb4zzD&format=png&color=005490",
		iconSize: [30, 30],
		shadowUrl: "",
	});

	const checkpointIcon = L.icon({
		iconUrl: "https://img.icons8.com/?size=100&id=62889&format=png&color=005490",
		iconSize: [30, 30],
		iconAnchor: [15, 25],
		shadowUrl: "",
	});

	// Crear el marcador del auto
	carMarker = L.marker(origen, { icon: carIcon }).addTo(map);

	const generateCheckpoints = (route: L.Routing.IRoute): LatLngTuple[] => {
		const checkpoints: LatLngTuple[] = [];

		if (!route.summary) {
			toast.error("No se pudo obtener el resumen de la ruta");
			return checkpoints;
		}

		const latLngs: LatLng[] = route.coordinates as LatLng[];
		const totalCheckpoints = 3;
		const totalDistance = route.summary.totalDistance;
		const checkpointDistance = totalDistance / (totalCheckpoints + 1);
		let accumulatedDistance = 0;
		let currentCheckpoint = 1;

		for (let i = 1; i < latLngs.length; i++) {
			const segmentDistance = latLngs[i].distanceTo(latLngs[i - 1]);
			accumulatedDistance += segmentDistance;

			if (accumulatedDistance >= checkpointDistance * currentCheckpoint) {
				checkpoints.push([latLngs[i].lat, latLngs[i].lng]);
				currentCheckpoint++;
			}

			if (currentCheckpoint > totalCheckpoints) {
				break;
			}
		}
		return checkpoints;
	};

	globalOrigen = origen;
	globalDestino = destino;

	const control = L.Routing.control({
		waypoints: [L.latLng(origen), L.latLng(destino)],
		routeWhileDragging: false,
		addWaypoints: false,
		show: false,
	}).addTo(map);

	control.on("routesfound", (e) => {
		const routes = e.routes;
		if (routes.length > 0) {
			const route = routes[0];
			checkpoints = generateCheckpoints(route);

			checkpoints.forEach((checkpoint) => {
				L.marker(checkpoint, { icon: checkpointIcon }).addTo(map);
			});
		}
	});

	return control;
};

// Exportar el marcador del auto y los checkpoints para usarlos en carAdvance.tsx
export { carMarker, checkpoints, globalOrigen as origen, globalDestino as destino };
