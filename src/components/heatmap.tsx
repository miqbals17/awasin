import { useMemo, useRef } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LATITUDE_DPR, LONGITUDE_DPR, type UserLocation } from "../App";

interface HeatmapProps {
  activityMap: {
    suburb: string;
    lat: number;
    lng: number;
    level: number;
  }[];
  pinLocation: UserLocation | null;
  setPinLocation: (pinLocation: UserLocation | null) => void;
}

const fillRed1Options: PathOptions = { fillColor: "#BE5B50", stroke: false };
const fillRed2Options: PathOptions = { fillColor: "#8A2D3B", stroke: false };
const fillRed3Options: PathOptions = { fillColor: "#641B2E", stroke: false };

export default function Heatmap({
  pinLocation,
  setPinLocation,
  activityMap,
}: HeatmapProps) {
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

      <DraggableMarker
        pinLocation={pinLocation}
        setPinLocation={setPinLocation}
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

function DraggableMarker({
  pinLocation,
  setPinLocation,
}: {
  pinLocation: UserLocation | null;
  setPinLocation: (pinLocation: UserLocation | null) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as L.Marker;
        if (marker != null) {
          console.log("marker position: ", marker.getLatLng());
          setPinLocation(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[
        pinLocation?.lat || LATITUDE_DPR,
        pinLocation?.lng || LONGITUDE_DPR,
      ]}
      ref={markerRef}
    />
  );
}
