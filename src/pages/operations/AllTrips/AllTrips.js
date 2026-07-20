import React, { useState } from "react";
import { Ic } from "../../../components/icons/Ic";
import { STATUS_COLORS } from "../../../helpers/TripLifeCycle";
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdDelete,
} from "react-icons/md";
import { fmt, tripExpTotal } from "../../../helpers/RiskBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { deleteTrip, editTrip, getAllTrips } from "../../../redux/Trip/TripSlice";
import { useDispatch, useSelector } from "react-redux";
import TripDetailModal from "./TripDetailModal";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import TripGeneratorModal from "./TripGeneratorModal";
import { BsUpload } from "react-icons/bs";
import UploadTripDocument from "./UploadDocuments";


const AllTrips = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [allTrip, setAllTrip] = useState(true);
  const [showInspect, setShowInspect] = useState(null);
  const [showTripDetail, setShowTripDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [editingTrip, setEditingTrip] = useState(null);
  const dispatch = useDispatch();
  const [trip, setTrip] = useState(false);
  const { trips, loading, error } = useSelector((state) => state.trip);
  const filtered = trips.filter((t) => {
    const matchSearch =
      (t.tripNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.origin?.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.destination?.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.vehicleId?.regNo || "").toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterTab === "own fleet")
      return t.fleetSource === "Own Fleet";

    if (filterTab === "vendor")
      return t.fleetSource === "Vendor";
    return true;
  });

  useEffect(() => {
    dispatch(getAllTrips());
  }, [dispatch]);

  const handleDelete = async () => {
    const response = await dispatch(deleteTrip(selectedTrip._id))
    if (response?.payload) {
      toast.success(response.payload.message)
      await dispatch(getAllTrips());
      setOpenDeleteModal(false);
      setSelectedTrip(null);
    }
    else {
      toast.error(response?.error?.message)
    }
  };

  const pendingInspections = trips.filter(
    (t) =>
      t &&
      (t.tripStatus === "Pre Trip Pending" ||
        t.tripStatus === "Post Trip Pending")
  );

  const tripStats = [
    {
      label: "Total Trips",
      value: trips.length,
      color: "#3B82F6",
    },
    {
      label: "Own Fleet",
      value: trips.filter((t) => t.vehicleType === "own").length,
      color: "#10B981",
    },
    {
      label: "Vendor Trips",
      value: trips.filter((t) => t.vehicleType === "vendor").length,
      color: "#8B5CF6",
    },
    {
      label: "Inspection Pending",
      value: pendingInspections.length,
      color: "#F97316",
    },
    {
      label: "Total Freight",
      value: "₹" + trips.reduce((sum, t) => sum + (Number(t.freightAmount) || 0), 0),
      color: "#F59E0B",
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !trips?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Trips...</p>
      </div>
    );
  }

  return (
   <div>
    {allTrip ?(
       <div>
      <div className="tracking-container">
        <div>
          <h1 className="rj tracking-header">Trips Management</h1>
          <p className="control-sub">
            {trips.length} trips · ₹
            {trips.reduce((s, t) => s + t.freightAmount, 0).toLocaleString("en-In")} freight
            · Own fleet + vendor vehicles
          </p>
        </div>
        <button
          className="control-btn trips-btn-booking"
          onClick={() => {
            setEditingTrip(null);
            setShowCreate(true);
          }}
        >
          <Ic n="plus" s={14} c="#080B10" />
          {trip ? "✏️ Edit Trip" : "🚛 New Trip Booking"}
        </button>
      </div>
      {error && !loading && (
        <div className="broker-error-banner">
          {error || "Failed to load trips data."}
        </div>
      )}
      <div className="control-row control-col">
        {tripStats.map((k) => (
          <div
            className="control-stat"
            key={k.label}
            style={{ borderTop: `3px solid ${k.color}` }}
          >
            <div className="control-stat-value" style={{ color: k.color }}>
              {k.value || 0}
            </div>
            <div className="control-stat-label">{k.label}</div>
          </div>
        ))}
      </div>
      {pendingInspections.length > 0 && (
        <div className="control-card-box trips-card-inspection">
          <div className="section-title" style={{ color: "var(--orange)" }}>
            ⚡ Inspection Action Required — {pendingInspections.length} trip(s)
          </div>
          {trips
            .filter((t) => t.tripStatus === "Pre Trip Pending")
            .map((t) => {
              const route = `${t.origin?.city} → ${t.destination?.city}`;
              return (
                <div
                  className="control-actions-row trips-inspection-border-green"
                  key={t._id}
                >
                  <Ic n="pretrip" s={13} c="var(--green)" />
                  <div style={{ flex: 1 }}>
                    <span className="mono trips-inspection-id">{t.id}</span>
                    <span className="trips-vendor-route">
                      {route} ·{" "}
                      {t.fleetSource === "Vendor" ? t.vendorVehicleId?.regNo : t.vehicleId?.regNo} {" "}
                      {t.fleetSource === "Vendor" ? t.vendorVehicleId?.vehicleType : t.vehicleId?.type}
                    </span>
                  </div>
                  <button
                    className="control-btn trips-btn-g trips-btn-g-size"
                    onClick={() => setShowInspect({ trip: t, type: "pre" })}

                  >
                    ✅ Pre-Trip Inspect
                  </button>
                </div>
              )
            })}
          {trips
            .filter((t) => t.tripStatus === "Post Trip Pending")
            .map((t) => (
              <div
                className="control-actions-row trips-inspection-border-blue"
                key={t._id}
              >
                <Ic n="posttrip" s={13} c="var(--blue)" />
                <div style={{ flex: 1 }}>
                  <span className="mono trips-inspection-id">{t.id}</span>
                  <span className="trips-vendor-route">
                    {t.route} · {t.vehicle}
                  </span>
                </div>
                <button
                  className="control-btn tracking-btn-b trips-btn-g-size"
                  onClick={() => setShowInspect({ trip: t, type: "post" })}
                >
                  📋 Post-Trip Inspect
                </button>
              </div>
            ))}
        </div>
      )}
      <div className="trips-viewmode-wrapper">
        <div className="trips-search-wrapper">
          <span className="trip-search-icon">⌕</span>
          <input
            className="trip-search-input"
            placeholder="Search trips, vehicle, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="trips-toggle-pill">
          {["all", "own fleet", "vendor"].map((f) => (
            <div
              key={f}
              className={`trips-toggle-option trips-toggle-option-size ${filterTab === f ? "on" : ""}`}
              onClick={() => setFilterTab(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </div>
          ))}
        </div>
      </div>
      <div className="control-card-box" style={{ padding: 0 }}>
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    color: "var(--textMuted)",
                    padding: "9px 12px",
                    textAlign: "left",
                    borderBottom: "1px solid var(--borderHi)",
                    background: "var(--bgPanel)",
                  },
                }}
              >
                <TableCell>Trip ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Journey</TableCell>
                <TableCell>Vehicle/Vendor</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Freight</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Upload</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t._id}
                  sx={{
                    "& .MuiTableCell-root": {
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: ".07em",
                      color: "var(--textSub)",
                      padding: "9px 12px",
                      textAlign: "left",
                      borderBottom: "1px solid var(--border)",
                      background: "var(--bgPanel)",
                    },
                  }}>
                  <TableCell>{t.tripNo}</TableCell>
                  <TableCell>{t.fleetSource}</TableCell>
                  <TableCell>
                    {t.origin?.city} → {t.destination?.city}
                  </TableCell>
                  <TableCell>{t.journeyType}</TableCell>
                  <TableCell>
                    {t.vehicleId?.regNo}<br />{t.vendorId?.companyName && `/${t.vendorId?.companyName}`}</TableCell>
                  <TableCell>{t.driver1?.name}</TableCell>
                  <TableCell>
                    {t.journeyLegs?.[0]?.customerId || "-"}
                  </TableCell>
                  <TableCell>
                    ₹{t.freightAmount?.toLocaleString("en-In")}
                  </TableCell>
                  <TableCell>{t.tripStatus}</TableCell>
                  <TableCell>
                    <div className="trip-td-actions">
                      <button className="trip-action-btn trip-action-view">
                        <MdOutlineRemoveRedEye />
                      </button>
                      <button
                        className="trip-action-btn trip-action-edit"
                        onClick={() => {
                          setEditingTrip(t);
                          setShowCreate(true);
                        }}
                      >
                        <MdOutlineEdit />
                      </button>

                      <button
                        className="trip-action-btn trip-action-delete"
                        onClick={() => {
                          setSelectedTrip(t);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <MdDeleteOutline />
                      </button>

                      
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
  className="trip-action-upload"
  onClick={() => {
    setSelectedTripId(t._id);
    setAllTrip(false);
  }}
>
  <BsUpload /> Upload
</button>
                  </TableCell>
                 
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {openDeleteModal && (
        <div className="trip-delete-backdrop">
          <div className="trip-delete-modal">
            <div className="trip-delete-icon-wrap">
              <MdDelete className="trip-delete-icon" />
            </div>
            <h3 className="trip-delete-title">Delete Trip?</h3>

            <p className="trip-delete-text">
              Are you sure you want to delete trip <b>{selectedTrip?.tripNo}</b>?
            </p>
            <div className="trip-delete-actions">
              <button
                className="trip-delete-btn cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="trip-delete-btn confirm" onClick={handleDelete}>
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <TripGeneratorModal
          open={showCreate}
          trip={editingTrip}
          onClose={() => {
            setShowCreate(false);
            setEditingTrip(null);
          }}

        />)}

    </div>
    ):(
   <UploadTripDocument tripId={selectedTripId} />
    )}
   </div>
  );
};

export default AllTrips;
