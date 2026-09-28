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

  // current leg being tracked
  const activeLeg = useMemo(() => {
    if (!tripDetail?.journeyLegs?.length) return null;
    const idx = (tripDetail.currentLeg || 1) - 1;
    return (
      tripDetail.journeyLegs[idx] ||
      tripDetail.journeyLegs[tripDetail.journeyLegs.length - 1]
    );
  }, [tripDetail]);

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
        driverName: driverDetails.name,
        vehicleNo: driverDetails.vehicleNo,
      },
    ];
  }, [driverDetails, tripDetail]);

  useEffect(() => {
    if (!trip?._id) return;
    dispatch(getTripById(trip._id));
  }, [trip?._id, dispatch]);

  useEffect(() => {
    const driverId = activeLeg?.driver1?._id;

    if (!driverId) {
      console.log("No driverId found");
      return;
    }

    dispatch(getDriverById(driverId));
  }, [activeLeg, dispatch]);

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
    if (!activeLeg) return "";

    switch (status) {
      case "Reached Pickup":
        return activeLeg.pickupReachedAt;

      case "Ready For Loading":
        return activeLeg.loading?.loadingEndTime;

      case "Documents Pending":
        return activeLeg.weighbridge?.measuredAt;

      case "Ready To Start":
        return activeLeg.startTime;

      case "Completed":
        return activeLeg.arrivalTime;

      default:
        return "";
    }
  };

  return (
    <div className="track-container">
      <div className="tracking-container">
        <h1 className="rj tracking-header">Track Trip - {trip.tripNo}</h1>
        <div className="track-cancel">
          <RxCross2 size={25} onClick={close} />
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