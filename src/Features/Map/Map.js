import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import '../../App.css';
import { ChangeView } from '../../Components/ChangeView/ChangeView';

export function Map({ coords }) {
  const marker = new L.icon({
    iconUrl: require('./location-map-marker-85884.png'),
    iconSize: [35, 45],
  });

  if (!coords.location.lat) {
    return <h1>Loading...</h1>;
  }

  return (
    <MapContainer
      height="800px"
      center={[coords?.location.lat, coords?.location.lng]}
      zoom={10}
    >
      <ChangeView
        center={[coords?.location.lat, coords?.location.lng]}
        zoom={10}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[coords?.location.lat, coords?.location.lng]}
        icon={marker}
      >
        <Popup>
          {coords?.location.country} <br /> {coords?.location.region}
          <br />
          {coords?.location.city}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
