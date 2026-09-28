import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../redux/Driver/DriverSlice";
import TripMap from "../../components/Map/TripMap";
import { SlLocationPin } from "react-icons/sl";

const LiveTracking = () => {
  const dispatch = useDispatch();
  const { drivers } = useSelector((state) => state.driver);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [focusedMarker, setFocusedMarker] = useState(null);
  const [places, setPlaces] = useState({});

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const markers = useMemo(() => {
    return (drivers || [])
      .filter((driver) => driver.currentTripId && driver.lat && driver.lng)
      .map((driver) => {
        const trip = driver.currentTripId;
        const isObj = trip && typeof trip === "object";

        return {
          id: driver._id,
          tripId: isObj ? trip._id : trip,
          tripNo: isObj ? trip.tripNo : "",
          tripStatus: isObj ? trip.tripStatus : "",
          currentLeg: isObj ? trip.currentLeg : undefined,
          lat: Number(driver.lat),
          lng: Number(driver.lng),
          driverName: driver.name,
          mobile: driver.mobile,
          driverId: driver.driverId,
        };
      });
  }, [drivers]);

  useEffect(() => {
    if (!markers.length) return;

    const fetchPlaces = async () => {
      if (!window.google?.maps?.Geocoder) {
        console.warn("Google Maps Geocoder is not loaded");
        return;
      }

      const geocoder = new window.google.maps.Geocoder();

      for (const marker of markers) {
        const key = `${marker.lat},${marker.lng}`;
        if (places[key]) continue;

        try {
          const response = await geocoder.geocode({
            location: { lat: marker.lat, lng: marker.lng },
          });

          const results = response?.results || [];

          if (!results.length) {
            setPlaces((prev) => ({ ...prev, [key]: "Location unavailable" }));
            continue;
          }

          const result =
            results.find((item) => item.types?.includes("street_address")) ||
            results.find((item) => item.types?.includes("route")) ||
            results[0];

          const address = result.address_components || [];

          const getAddressPart = (type) =>
            address.find((item) => item.types?.includes(type))?.long_name || "";

          const street = [
            getAddressPart("street_number"),
            getAddressPart("route"),
          ]
            .filter(Boolean)
            .join(", ");

          const area =
            getAddressPart("neighborhood") ||
            getAddressPart("sublocality_level_3") ||
            getAddressPart("sublocality_level_2") ||
            getAddressPart("sublocality_level_1") ||
            getAddressPart("sublocality") ||
            getAddressPart("administrative_area_level_3");

          const city =
            getAddressPart("locality") ||
            getAddressPart("postal_town") ||
            getAddressPart("administrative_area_level_2") ||
            getAddressPart("administrative_area_level_3");

          const state = getAddressPart("administrative_area_level_1");
          const country = getAddressPart("country");

          const place = [street, area, city, state]
            .filter(Boolean)
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .join(", ");

          const finalPlace =
            place ||
            result.formatted_address ||
            city ||
            state ||
            country ||
            "Location unavailable";

          setPlaces((prev) => ({ ...prev, [key]: finalPlace }));
        } catch (error) {
          console.error("Google reverse geocoding error:", error);
          setPlaces((prev) => ({ ...prev, [key]: "Location unavailable" }));
        }
      }
    };

    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  const handleMarkerClick = (marker) => {
    setSelectedTripId(marker.tripId);
    setFocusedMarker(marker);
  };

  const getPlace = (marker) => {
    const key = `${marker.lat},${marker.lng}`;
    return places[key] || "Finding location...";
  };

  const selectedMarker = markers.find((m) => m.tripId === selectedTripId);

  return (
    <div className="live-tracking-page">
      <div className="row g-3">
        <div className="dashboardHeader">
          <div>
            <h2 className="rj tracking-header">Live GPS Tracking</h2>
            <p>Track Vehicles of your company</p>
          </div>
        </div>

        {/* MAP */}
        <div className="col-lg-8">
          <div className="tracking-panel-container">
            <div
              className="tracking-panel-placeholder"
              style={{ height: "570px" }}
            >
              <TripMap
                markers={markers}
                onMarkerClick={handleMarkerClick}
                focusedMarker={focusedMarker}
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-lg-4">
          <div className="control-card-box">
            <h5>Live Fleet</h5>
            <hr />
            <p>
              <strong>Total Active Trips :</strong> {markers.length}
            </p>

            {selectedTripId ? (
              <>
                <p>
                  <strong>Selected Trip</strong>
                </p>
                <p>{selectedMarker?.tripNo || selectedTripId}</p>
              </>
            ) : (
              <p>Click any vehicle marker.</p>
            )}
            <hr />

            {markers.map((marker) => (
              <div
                key={`${marker.id}-${marker.tripId}`}
                className={`live-driver-card ${
                  focusedMarker?.id === marker.id
                    ? "live-driver-card-active"
                    : ""
                }`}
                onClick={() => handleMarkerClick(marker)}
              >
                <div>
                  <strong style={{ color: "var(--accent)" }}>
                    {marker.driverName}
                  </strong>
                </div>

                <div>Driver ID: {marker.driverId}</div>
                <div>Trip No: {marker.tripNo || marker.tripId}</div>
                {marker.tripStatus && <div>Status: {marker.tripStatus}</div>}
                {marker.currentLeg && <div>Current Leg: {marker.currentLeg}</div>}

                <div className="live-driver-location">
                  <span className="location-icon">
                    <SlLocationPin />
                  </span>
                  <span>{getPlace(marker)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;