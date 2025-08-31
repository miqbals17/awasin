import { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LATITUDE_JAKARTA = -6.2085967;
const LONGITUDE_JAKARTA = 106.8025844;

export default function Heatmap() {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[LATITUDE_JAKARTA, LONGITUDE_JAKARTA]}
      zoom={14}
      ref={mapRef}
      style={{ height: "75%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
