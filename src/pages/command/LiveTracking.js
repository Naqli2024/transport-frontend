import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../redux/Driver/DriverSlice";
import TripMap from "../../components/Map/TripMap";

const LiveTracking = () => {
  const dispatch = useDispatch();

  const { drivers, loading } = useSelector((state) => state.driver);
  console.log("Drivers:", drivers);
  const [selectedTripId, setSelectedTripId] = useState(null);

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const markers = useMemo(() => {
    const activeMarkers = (drivers || [])
      .filter((driver) => {
        console.log("Checking Driver:", driver);

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

    console.log("Markers:", activeMarkers);

    return activeMarkers;
  }, [drivers]);
  console.log("Markers:", markers);

  const handleMarkerClick = (marker) => {
    console.log("Clicked Marker:", marker);

    console.log("Trip ID:", marker.tripId);

    setSelectedTripId(marker.tripId);
  };

  return (
    <div>
      <div className="row g-3">
        {/* MAP */}
        <div className="col-lg-8">
          <div className="tracking-panel-container">
            <div
              className="tracking-panel-placeholder"
              style={{ height: "570px" }}
            >
              <TripMap markers={markers} onMarkerClick={handleMarkerClick} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-lg-4">
          <div
            className="control-card-box"
            style={{
              padding: 20,
              height: "570px",
              overflowY: "auto",
            }}
          >
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
    className="live-driver-card"
    style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px",
      cursor: "pointer",
    }}
    onClick={() => handleMarkerClick(marker)}
  >
    <div>
      <strong style={{color:"var(--accent)"}}>{marker.driverName}</strong>
    </div>

    <div>Driver ID: {marker.driverId}</div>

    <div>Trip ID: {marker.tripId}</div>

    <div>
      {marker.lat}, {marker.lng}
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
