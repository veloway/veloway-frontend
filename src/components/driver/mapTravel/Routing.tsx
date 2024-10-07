import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet-routing-machine';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const origen:  LatLngTuple = [-34.88435373023903, -58.05395088137856];
const destino: LatLngTuple = [-34.904045188515084, -57.92589693187078];

export const RoutingMachine = (map: L.Map) => {
if (typeof window === "undefined" || !map) return;

const carIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=KX1EJ8mb4zzD&format=png&color=005490',
    iconSize: [30, 30],
    shadowUrl: '',
});

//Hay que pasarle cada uno de los checkpoints
L.marker([-34.88698256285441, -58.03028352477662], {icon: carIcon}).addTo(map);

const control = L.Routing.control({
    waypoints: [
        L.latLng(origen), //origen
        L.latLng(destino), // destino
    ],
    routeWhileDragging: false,
    addWaypoints: false,
    show: false,
    } as any).addTo(map);

return control;
};


//Coordenadas de prueba
// L.latLng(-34.88435373023903, -58.05395088137856),
// L.latLng(-34.904045188515084, -57.92589693187078),