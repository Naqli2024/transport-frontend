import React, { useEffect, useMemo, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function TripMap({ markers = [], onMarkerClick, focusedMarker }) {
const mapRef = useRef(null);

  const center = useMemo(() => {
    if (markers.length > 0) {
      const lat = Number(markers[0].lat);
      const lng = Number(markers[0].lng);

      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return {
          lat,
          lng,
        };
      }
    }

    return defaultCenter;
  }, [markers]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  const handleMapUnmount = () => {
    mapRef.current = null;
  };

  useEffect(() => {
    if (!focusedMarker || !mapRef.current) return;

    const lat = Number(focusedMarker.lat);
    const lng = Number(focusedMarker.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }

    const position = {
      lat,
      lng,
    };

    // Smoothly move map to driver
    mapRef.current.panTo(position);

    // Zoom into driver
    mapRef.current.setZoom(16);
  }, [focusedMarker]);


  return (
     <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={markers.length > 0 ? 15 : 5}
      onLoad={handleMapLoad}
      onUnmount={handleMapUnmount}
    >
      {markers.map((marker, index) => {
        const lat = Number(marker.lat);
        const lng = Number(marker.lng);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }

        const isFocused =
          focusedMarker?.id === marker.id;

        return (
          <Marker
            key={`${marker.id}-${marker.tripId || index}`}
            position={{
              lat,
              lng,
            }}
            onClick={() => onMarkerClick?.(marker)}
            animation={
              isFocused && window.google
                ? window.google.maps.Animation.BOUNCE
                : undefined
            }
          />
        );
      })}
    </GoogleMap>
  );
}
