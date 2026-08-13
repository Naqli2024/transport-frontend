import React, { useMemo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function TripMap({ markers = [], onMarkerClick }) {
  // console.log("TripMap Markers:", markers);
  // console.log("Markers Count:", markers.length);

  markers.forEach((m, i) => {
    // console.log(`Marker ${i}`, m);
  });

  const center = useMemo(() => {
    if (markers.length > 0) {
      return {
        lat: Number(markers[0].lat),
        lng: Number(markers[0].lng),
      };
    }

    return defaultCenter;
  }, [markers]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {markers.map((marker, index) => {
        // console.log("Marker:", marker);

        return (
          <Marker
            key={`${marker.id}-${marker.tripId || index}`}
            position={{
              lat: Number(marker.lat),
              lng: Number(marker.lng),
            }}
            onClick={() => onMarkerClick?.(marker)}
          />
        );
      })}
    </GoogleMap>
  );
}
