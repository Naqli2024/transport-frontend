import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const STATUS_FLOW = [
  "Pre Trip Pending",
  "Reached Pickup",
  "Ready For Loading",
  "Documents Pending",
  "Ready To Start",
  "In Transit",
  "Unloading",
  "Delivery OTP Pending",
  "Completed",
  "Closed",
];

const TrackTrip = ({ trips = [], close }) => {
  const [selectedTripId, setSelectedTripId] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const sortedTrips = useMemo(() => {
    return [...trips].sort((a, b) =>
      a.tripNo.localeCompare(b.tripNo, undefined, { numeric: true }),
    );
  }, [trips]);

  useEffect(() => {
    if (!selectedTripId) return;

    const trip = sortedTrips.find((t) => t._id === selectedTripId);
    setSelectedTrip(trip || null);
  }, [selectedTripId, sortedTrips]);

  useEffect(() => {
    if (!trips.length) return;

    const sortedTrips = [...trips].sort((a, b) =>
      a.tripNo.localeCompare(b.tripNo, undefined, { numeric: true }),
    );

    setSelectedTripId(sortedTrips[0]._id);
    setSelectedTrip(sortedTrips[0]);
  }, [trips]);

  const currentIndex = useMemo(() => {
    if (!selectedTrip) return -1;
    return STATUS_FLOW.indexOf(selectedTrip.tripStatus);
  }, [selectedTrip]);

  const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusTime = (status) => {
  if (!selectedTrip) return "";

  switch (status) {
    case "Reached Pickup":
      return selectedTrip.pickupReachedAt;

    case "Ready For Loading":
      return selectedTrip.loading?.loadingEndTime; 

    case "Documents Pending":
      return selectedTrip.weighbridge?.measuredAt; 

    case "Ready To Start":
      return selectedTrip.startTime;

    case "Completed":
      return selectedTrip.arrivalTime;

    default:
      return "";
  }
};

  return (
    <div className="track-container">
      <div  className="tracking-container">
        <h1 className="rj tracking-header">Track Trip</h1>
        <MdOutlineCancel size={30} color="white" cursor={'pointer'} onClick={close}/>
        </div>
        <select
          value={selectedTripId}
          onChange={(e) => setSelectedTripId(e.target.value)}
          className="trip-dropdown"
        >
          {sortedTrips.map((trip) => (
            <option key={trip._id} value={trip._id}>
              {trip.tripNo} - ({trip.tripStatus})
            </option>
          ))}
        </select>
        <div className="track-trip-container">
            <div className="timeline-container col-md-6">
          {STATUS_FLOW.map((status, index) => {
            const completed = index < currentIndex;
            const current = index === currentIndex;

            return (
              <div className="timeline-row" key={status}>
                <div className="timeline-left">
                  {index !== STATUS_FLOW.length - 1 && (
                    <div
                      className={`line ${completed ? "line-completed" : ""}`}
                    />
                  )}

                  <div
                    className={`circle
                    ${completed ? "completed" : ""}
                    ${current ? "current" : ""}
                    `}
                  />
                </div>

                <div
                    className={`timeline-text
                        ${completed ? "completed-text" : ""}
                        ${current ? "current-text" : ""}
                    `}
                    >
                    <div className="status-title">{status}</div>

                    {getStatusTime(status) && (
                        <div className="status-time">
                        {formatDateTime(getStatusTime(status))}
                        </div>
                    )}
                    </div>
              </div>
            );
          })}
        </div>
        <div className="track-map-container col-md-6">
                Google Map
            </div>
        </div>
      </div>
  );
};

export default TrackTrip;
