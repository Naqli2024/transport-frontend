import React, { useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import TripMap from "../../../components/Map/TripMap";
import { getTripById } from "../../../redux/Trip/TripSlice";
import { getDriverById } from "../../../redux/Driver/DriverSlice";
import { useDispatch, useSelector } from "react-redux";

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

const TrackTrip = ({ trip, close }) => {
  const dispatch = useDispatch();
  const { tripDetail } = useSelector((state) => state.trip);
  const { driverDetails } = useSelector((state) => state.driver);

  const markers = useMemo(() => {
    if (!driverDetails?.lat || !driverDetails?.lng) {
      return [];
    }

    return [
      {
        id: driverDetails._id,
        lat: Number(driverDetails.lat),
        lng: Number(driverDetails.lng),
        tripId: tripDetail?._id,
        driverName: driverDetails.driverName,
        vehicleNo: driverDetails.vehicleNo,
      },
    ];
  }, [driverDetails, tripDetail]);

  if (driverDetails?.lat && driverDetails?.lng) {
    markers.push({
      id: driverDetails._id,
      lat: Number(driverDetails.lat),
      lng: Number(driverDetails.lng),
      tripId: tripDetail._id,
      driverName: driverDetails.name,
      vehicleNo: driverDetails.vehicleNo,
    });
  }

  useEffect(() => {
    if (!trip._id) return;
    dispatch(getTripById(trip._id));
  }, [trip._id, dispatch]);

  useEffect(() => {
    if (!tripDetail?.driver1._id) {
      console.log("No driverId found");
      return;
    }

    dispatch(getDriverById(tripDetail.driver1._id));
  }, [tripDetail, dispatch]);

  const currentIndex = useMemo(() => {
    if (!tripDetail) return -1;
    return STATUS_FLOW.indexOf(tripDetail.tripStatus);
  }, [tripDetail]);

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
    if (!tripDetail) return "";

    switch (status) {
      case "Reached Pickup":
        return tripDetail.pickupReachedAt;

      case "Ready For Loading":
        return tripDetail.loading?.loadingEndTime;

      case "Documents Pending":
        return tripDetail.weighbridge?.measuredAt;

      case "Ready To Start":
        return tripDetail.startTime;

      case "Completed":
        return tripDetail.arrivalTime;

      default:
        return "";
    }
  };

  return (
    <div className="track-container">
      <div className="tracking-container">
        <h1 className="rj tracking-header">Track Trip - {trip.tripNo}</h1>
        <div className="track-cancel">
          <RxCross2
          size={25}
          onClick={close}
        />
        </div>
      </div>
      <div className="track-trip-container">
        <div className="timeline-container col-md-5">
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
        <div className="track-map-container col-md-7">
          <TripMap markers={markers} />
        </div>
      </div>
    </div>
  );
};

export default TrackTrip;
