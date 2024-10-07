import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L, { LatLng, LatLngTuple } from 'leaflet';
import 'leaflet-routing-machine';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const origen:  LatLngTuple = [-34.88032898748368, -58.08847674063383];
const destino: LatLngTuple = [-34.932271517470625, -57.9215011836475];

export const RoutingMachine = (map: L.Map) => {
if ( typeof window === 'undefined' || !map) return;

const carIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=KX1EJ8mb4zzD&format=png&color=005490',
    iconSize: [30, 30],
    shadowUrl: '',
});

const checkpointIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=62889&format=png&color=005490',
    iconSize: [30, 30],
    iconAnchor: [15, 25],
    shadowUrl: '',
});

// Hay que pasarle cada uno de los checkpoints
L.marker([-34.88032898748368, -58.08847674063383], {icon: carIcon}).addTo(map);

const generateCheckpoints = (route: L.Routing.IRoute): LatLngTuple[] => {
    const checkpoints: LatLngTuple[] = [];
  
    // Asegurarnos de que route.summary no sea undefined
    if (!route.summary) {
        console.error('No se pudo obtener el resumen de la ruta');
        return checkpoints;
    }

    // Accede a los puntos de la ruta (coordinates)
    const latLngs: LatLng[] = route.coordinates as LatLng[];
    const totalCheckpoints = 3;

    // Distribuyo checkpoints a igual distancia
    const totalDistance = route.summary.totalDistance; // El summary devuelve la distancia total entre origen y destino
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


  
const control = L.Routing.control({
    waypoints: [
        L.latLng(origen), //origen
        L.latLng(destino), // destino
    ],

    routeWhileDragging: false,
    addWaypoints: false,
    show: false,
    } as any).addTo(map);

    control.on('routesfound', (e) => {
        const routes = e.routes;
        if (routes.length > 0) {
            const route = routes[0];
            const checkpoints = generateCheckpoints(route);
            
            checkpoints.forEach((checkpoint) => {
                L.marker(checkpoint, { icon: checkpointIcon }).addTo(map);
            });
        }
    });
    
    return control;
 };




//Coordenadas de prueba
// -34.88435373023903, -58.05395088137856, Joaco
// -34.904045188515084, -57.92589693187078, UTN
// -34.88451393713312, -58.055525805036574 Mate
// -34.932271517470625, -57.9215011836475 Jose
// -34.93559626862525, -57.94347383954412 Delfi