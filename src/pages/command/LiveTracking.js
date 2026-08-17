import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../redux/Driver/DriverSlice";
import TripMap from "../../components/Map/TripMap";
import { SlLocationPin } from "react-icons/sl";

const LiveTracking = () => {
  const dispatch = useDispatch();
  const { drivers, loading } = useSelector((state) => state.driver);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [focusedMarker, setFocusedMarker] = useState(null);
  const [places, setPlaces] = useState({});

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const markers = useMemo(() => {
    const activeMarkers = (drivers || [])
      .filter((driver) => {
        return driver.currentTripId && driver.lat && driver.lng;
      })
      .map((driver) => ({
        id: driver._id,
        tripId: driver.currentTripId,
        lat: Number(driver.lat),
        lng: Number(driver.lng),
        driverName: driver.name,
        mobile: driver.mobile,
        driverId: driver.driverId,
      }));

    return activeMarkers;
  }, [drivers]);

useEffect(() => {
  if (!markers.length) return;

  const fetchPlaces = async () => {
    // Wait until Google Maps is loaded
    if (!window.google?.maps?.Geocoder) {
      console.warn("Google Maps Geocoder is not loaded");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    for (const marker of markers) {
      const key = `${marker.lat},${marker.lng}`;

      // Already loaded
      if (places[key]) continue;

      try {
        const response = await geocoder.geocode({
          location: {
            lat: Number(marker.lat),
            lng: Number(marker.lng),
          },
        });

        const results = response?.results || [];

        if (!results.length) {
          setPlaces((prev) => ({
            ...prev,
            [key]: "Location unavailable",
          }));

          continue;
        }

        // Use the most detailed Google result
        const result =
          results.find((item) =>
            item.types?.includes("street_address")
          ) ||
          results.find((item) =>
            item.types?.includes("route")
          ) ||
          results[0];

        const address =
          result.address_components || [];

        const getAddressPart = (type) => {
          const component = address.find((item) =>
            item.types?.includes(type)
          );

          return component?.long_name || "";
        };

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

        const state =
          getAddressPart(
            "administrative_area_level_1"
          );

        const country =
          getAddressPart("country");

        /*
         * Build the same type of readable
         * location that Nominatim was giving you.
         */
        const place = [
          street,
          area,
          city,
          state,
        ]
          .filter(Boolean)
          .filter(
            (value, index, array) =>
              array.indexOf(value) === index
          )
          .join(", ");

        // Strong fallback
        const finalPlace =
          place ||
          result.formatted_address ||
          city ||
          state ||
          country ||
          "Location unavailable";

        setPlaces((prev) => ({
          ...prev,
          [key]: finalPlace,
        }));
      } catch (error) {
        console.error(
          "Google reverse geocoding error:",
          error
        );

        setPlaces((prev) => ({
          ...prev,
          [key]: "Location unavailable",
        }));
      }
    }
  };

  fetchPlaces();
}, [markers]);

  const handleMarkerClick = (marker) => {
    setSelectedTripId(marker.tripId);
    setFocusedMarker(marker);
  };

  const getPlace = (marker) => {
    const key = `${marker.lat},${marker.lng}`;

    return places[key] || "Finding location...";
  };

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
              <TripMap markers={markers} onMarkerClick={handleMarkerClick} focusedMarker={focusedMarker} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-lg-4">
          <div
            className="control-card-box">
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
                <p>{selectedTripId}</p>
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

                <div>Trip ID: {marker.tripId}</div>
                <div className="live-driver-location">

                  <span className="location-icon">
                    <SlLocationPin/>
                  </span>
                  <span>
                    {getPlace(marker)}
                  </span>
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
