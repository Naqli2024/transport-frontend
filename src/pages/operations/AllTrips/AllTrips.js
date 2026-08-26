import React, { useState } from "react";
import { Ic } from "../../../components/icons/Ic";
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdDelete,
  MdOutlineFileUpload,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import {
  bulkUploadDocuments,
  closeTrip,
  deleteTrip,
  editTrip,
  getAllTrips,
  getDriverExpenses,
  getFuelEntries,
  getTripById,
  getTripDocuments,
  getWeighBridge,
} from "../../../redux/Trip/TripSlice";
import { useDispatch, useSelector } from "react-redux";
import TripDetailModal from "./TripDetailModal";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import TripGeneratorModal from "./TripGeneratorModal";
import TripUploadModal from "./TripUploadModal";
import TripOverViewPage from "./TripOverViewPage";
import { getCustomerById } from "../../../redux/Customer/CustomerSlice";
import { IoSearchOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { CgTrack } from "react-icons/cg";
import TrackTrip from "./TrackTrip";
import TripCloseModal from "../../../components/TripCloseModal";

const AllTrips = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showInspect, setShowInspect] = useState(null);
  const [showTripDetail, setShowTripDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const dispatch = useDispatch();
  const [trip, setTrip] = useState(false);
  const {
    trips,
    tripDetail,
    documents,
    expenses,
    fuelEntries,
    weighBridge,
    loading,
    loadingDetail,
    error,
  } = useSelector((state) => state.trip);
  const [activeTrip, setActiveTrip] = useState(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [customerMap, setCustomerMap] = useState({});
  const [openTrackTrip, setOpenTrackTrip] = useState(false);
  const [openTripCloseModal, setOpenTripCloseModal] = useState(false);

  const filtered = trips.filter((t) => {
    const matchSearch =
      (t.tripNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.origin?.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.destination?.city || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (t.vehicleId?.regNo || "").toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterTab === "own fleet") return t.fleetSource === "Own Fleet";

    if (filterTab === "vendor") return t.fleetSource === "Vendor";
    return true;
  });

  useEffect(() => {
    dispatch(getAllTrips());
  }, [dispatch]);

  useEffect(() => {
    if (!trips.length) return;

    const fetchCustomers = async () => {
      const ids = [
        ...new Set(
          trips.map((t) => t.journeyLegs?.[0]?.customerId).filter(Boolean),
        ),
      ];
      const map = {};
      for (const id of ids) {
        try {
          const result = await dispatch(getCustomerById(id)).unwrap();

          if (result?.data) {
            map[id] = result.data;
          }
        } catch (e) {
          // console.error("Failed to fetch customer", id, e);
        }
      }
      setCustomerMap(map);
    };

    fetchCustomers();
  }, [dispatch, trips]);

  const handleUpload = async (tripId, payload) => {
    const response = await dispatch(bulkUploadDocuments({ tripId, payload }));
    if (response?.payload) {
      toast.success(response.payload.message);
      dispatch(getAllTrips());
      setOpenUploadModal(false);
      setActiveTrip(null);
    } else {
      toast.error(response?.error?.message);
    }
  };

  const handleDelete = async () => {
    if (isDeleting || !selectedTrip?._id) return;

    setIsDeleting(true);

    try {
      const response = await dispatch(deleteTrip(selectedTrip._id)).unwrap();
      toast.success(response?.message);
      await dispatch(getAllTrips()).unwrap();
      setOpenDeleteModal(false);
      setSelectedTrip(null);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const pendingInspections = trips.filter(
    (t) =>
      t &&
      (t.tripStatus === "Pre Trip Pending" ||
        t.tripStatus === "Post Trip Pending"),
  );

  const tripStats = [
    {
      label: "Total Trips",
      value: trips.length,
      color: "#3B82F6",
    },
    {
      label: "Own Fleet",
      value: trips.filter((t) => t.fleetSource === "Own Fleet").length,
      color: "#10B981",
    },
    {
      label: "Vendor Trips",
      value: trips.filter((t) => t.fleetSource === "Vendor").length,
      color: "#8B5CF6",
    },
    {
      label: "Inspection Pending",
      value: pendingInspections.length,
      color: "#F97316",
    },
    {
      label: "Total Freight",
      value:
        "₹" + trips.reduce((sum, t) => sum + (Number(t.freightAmount) || 0), 0),
      color: "#F59E0B",
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleView = async (trip) => {
    setShowOverview(true);
    await dispatch(getTripById(trip._id));
    await dispatch(getTripDocuments(trip._id));
    await dispatch(getDriverExpenses(trip._id));
    await dispatch(getWeighBridge(trip._id));
    await dispatch(getFuelEntries(trip._id));
  };

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
      {showOverview ? (
        loadingDetail ? (
          <div className="broker-loading-wrap">
            <div className="broker-loader"></div>
            <p>Loading trip details...</p>
          </div>
        ) : (
          <TripOverViewPage
            tripDetail={tripDetail}
            documents={documents}
            expenses={expenses}
            weighBridge={weighBridge}
            fuelEntries={fuelEntries}
            onBack={() => setShowOverview(false)}
          />
        )
      ) : openTrackTrip ? (
        <TrackTrip trip={activeTrip} close={() => setOpenTrackTrip(false)} />
      ) : (
        <div>
          <div className="tracking-container">
            <div>
              <h1 className="rj tracking-header">Trips Management</h1>
              <p className="control-sub">
                {trips.length} trips · ₹
                {trips
                  .reduce((s, t) => s + t.freightAmount, 0)
                  .toLocaleString("en-In")}{" "}
                freight · Own fleet + vendor vehicles
              </p>
            </div>
            <div className="d-flex gap-3">
              <button
                className="control-btn trips-btn-booking"
                onClick={() => {
                  setEditingTrip(null);
                  setShowCreate(true);
                }}
              >
                <CiDeliveryTruck size={18} />
                New Trip Booking
              </button>
            </div>
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
          <div className="trips-viewmode-wrapper">
            <div className="trips-search-wrapper">
              <span className="trip-search-icon">
                <IoSearchOutline size={14} />
              </span>
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
          <div
            className="control-card-box"
            style={{ padding: 0, overflow: "hidden" }}
          >
            <div className="trip-table-scroll">
              <table className="trip-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Type</th>
                    <th>Journey</th>
                    <th>Vehicle/Vendor</th>
                    <th>Driver</th>
                    <th>Customer</th>
                    <th>Freight</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((t) => (
                      <tr key={t._id}>
                        <td>{t.tripNo}</td>

                        <td>{t.fleetSource}</td>

                        <td>{t.journeyType}</td>

                        <td>
                          {t.vehicleId?.regNo}
                          <br />
                          {t.vendorId?.companyName &&
                            `/${t.vendorId?.companyName}`}
                        </td>

                        <td>{t.driver1?.name}</td>

                        <td>
                          {customerMap[t.journeyLegs?.[0]?.customerId]
                            ?.companyName || "-"}
                        </td>

                        <td>₹{t.freightAmount?.toLocaleString("en-IN")}</td>

                        <td>{t.tripStatus}</td>

                        <td>
                          <div className="vm-td-actions">
                            <button
                              title="View Trip Details"
                              className="vm-action-btn vm-action-view"
                              onClick={() => handleView(t)}
                            >
                              <MdOutlineRemoveRedEye />
                            </button>

                            <button
                              title="Edit Trip Details"
                              className="vm-action-btn vm-action-edit"
                              onClick={() => {
                                setEditingTrip(t);
                                setShowCreate(true);
                              }}
                            >
                              <MdOutlineEdit />
                            </button>

                            <button
                              title="Upload Trip Documents"
                              className="vm-action-btn vm-action-upload"
                              onClick={() => {
                                setActiveTrip(t);
                                setOpenUploadModal(true);
                              }}
                            >
                              <MdOutlineFileUpload />
                            </button>

                            <button
                              title="Delete Trip"
                              className="vm-action-btn vm-action-delete"
                              onClick={() => {
                                setSelectedTrip(t);
                                setOpenDeleteModal(true);
                              }}
                            >
                              <MdDeleteOutline />
                            </button>

                            <button
                              title="Track Vehicle"
                              className="vm-action-btn vm-action-track"
                              onClick={() => {
                                setActiveTrip(t);
                                setOpenTrackTrip(true);
                              }}
                            >
                              <CgTrack size={18} />
                            </button>

                            {t.settlement.status === "Pending" && (
                              <button
                                title="Close Trip"
                                className="vm-action-closed py-1"
                                onClick={() => {
                                  setOpenTripCloseModal(true);
                                  setSelectedTrip(t._id);
                                }}
                              >
                                Close Trip
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="trip-table-empty">
                        {filterTab === "vendor"
                          ? "No Vendor Trips Found"
                          : filterTab === "own fleet"
                            ? "No Own Fleet Trips Found"
                            : "No Trips Found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {openDeleteModal && (
            <div className="vm-delete-backdrop">
              <div className="vm-delete-modal">
                <div className="vm-delete-icon-wrap">
                  <MdDelete className="vm-delete-icon" />
                </div>
                <h3 className="vm-delete-title">Delete Trip?</h3>

                <p className="vm-delete-text">
                  Are you sure you want to delete trip <br />
                  <b>{selectedTrip?.tripNo}</b>?
                </p>
                <div className="vm-delete-actions">
                  <button
                    className="vm-delete-btn cancel"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="vm-delete-btn confirm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="trip-save-spinner"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <MdDelete />
                        Delete
                      </>
                    )}
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
            />
          )}
          {openUploadModal && (
            <TripUploadModal
              open={openUploadModal}
              trip={activeTrip}
              onClose={() => {
                setOpenUploadModal(false);
                setActiveTrip(null);
              }}
              onUpload={handleUpload}
            />
          )}
        </div>
      )}
      {openTripCloseModal && (
        <TripCloseModal
          open={() => setOpenTripCloseModal(true)}
          onClose={() => setOpenTripCloseModal(false)}
          selectedTrip={selectedTrip}
        />
      )}
    </div>
  );
};

export default AllTrips;
