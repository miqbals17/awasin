import { useRef } from "react";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, PathOptions } from "leaflet";

const LATITUDE_DPR = -6.2085967;
const LONGITUDE_DPR = 106.8025844;

const DPR_AREA: LatLngExpression = [LATITUDE_DPR, LONGITUDE_DPR];
const POLDA_AREA: LatLngExpression = [-6.224071, 106.8093165];

const fillRedOptions: PathOptions = { fillColor: "red", color: "" };

export default function Heatmap() {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[LATITUDE_DPR, LONGITUDE_DPR]}
      zoom={14}
      ref={mapRef}
      style={{ height: "75%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={DPR_AREA} pathOptions={fillRedOptions} radius={2000} />
      <Circle center={POLDA_AREA} pathOptions={fillRedOptions} radius={450} />
    </MapContainer>
  );
}
