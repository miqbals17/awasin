import { useRef } from "react";
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";

interface HeatmapProps {
  activityMap: {
    suburb: string;
    lat: number;
    lng: number;
    level: number;
  }[];
}

const LATITUDE_DPR = -6.2085967;
const LONGITUDE_DPR = 106.8025844;

const fillRed1Options: PathOptions = { fillColor: "#BE5B50", stroke: false };
const fillRed2Options: PathOptions = { fillColor: "#8A2D3B", stroke: false };
const fillRed3Options: PathOptions = { fillColor: "#641B2E", stroke: false };

export default function Heatmap({ activityMap }: HeatmapProps) {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[LATITUDE_DPR, LONGITUDE_DPR]}
      zoom={12}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {activityMap.map((activity) => {
        let options: PathOptions;

        if (activity.level < 50) {
          options = fillRed1Options;
        } else if (activity.level < 500) {
          options = fillRed2Options;
        } else {
          options = fillRed3Options;
        }

        return (
          <Circle
            center={[activity.lat, activity.lng]}
            pathOptions={options}
            radius={activity.level * 500}
            key={activity.suburb}
          >
            <Popup>
              Level demonstrasi: <b>{activity.level}</b>
            </Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
}
