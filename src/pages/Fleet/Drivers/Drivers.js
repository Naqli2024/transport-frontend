import { useState, useMemo, useEffect } from "react";
import AddDriverModal from "./AddDriverModal";
import DriverDetailModal from "./DriverDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteDriver, getAllDrivers, getDriverById, getDriversDashboard } from "../../../redux/Driver/DriverSlice";
import { MdOutlineEdit, MdDeleteOutline, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";

function DriverCard({ d, onClick, onEdit, onDelete }) {
  return (
    <div
      className={`dm-card ${d.sc}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="dm-card-head">
        <div className="dm-driver-identity">
          <div className={`dm-avatar ${d.av}`}>
            {d.initials}
            <span className={`dm-avatar-dot ${d.dot}`} />
          </div>
          <div className="dm-driver-info">
            <div className="dm-driver-name">{d.name}</div>
            <div className="dm-driver-id">{d.id}</div>
          </div>
        </div>
        <span className={`dm-status-badge ${d.sb}`}>{d.status}</span>
      </div>

      <div className="dm-info-rows">
        {[
          { label: "License", val: d.dlNo, valCls: "val-muted" },
          { label: "Phone", val: d.phone, valCls: "val-muted" },
          { label: "Vehicle", val: d.vehicle, valCls: "val-muted" },
          { label: "Experience", val: d.exp, valCls: "val-muted" },
        ].map((row) => (
          <div key={row.label} className="dm-info-row">
            <span className="dm-info-label">{row.label}</span>
            <span className={`dm-info-val ${row.valCls}`}>{row.val}</span>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <span></span>
        <div className="d-flex gap-2">
          <span
            className="dm-edit-btn d-flex align-items-center justify-content-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <MdOutlineEdit />
          </span>
          <span
            className="dm-delete-btn d-flex align-items-center justify-content-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <MdDeleteOutline />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Drivers() {
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [openAddDriver, setOpenAddDriver] = useState(false);
  const [openDriverModal, setOpenDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const dispatch = useDispatch();
  const { drivers, summary, driverDetails, loading, error } = useSelector((state) => state.driver)

  useEffect(() => {
    dispatch(getDriversDashboard());
    dispatch(getAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleViewDriver = async (id) => {
    if (!id) return;
    const response = await dispatch(getDriverById(id));
    if (response?.payload !== undefined) {
      setOpenDriverModal(true);
    } else {
      toast.error(response?.error?.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedDriver?._id) return;
    const response = await dispatch(deleteDriver(selectedDriver._id));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllDrivers());
      await dispatch(getDriversDashboard());
      setOpenDeleteModal(false);
      setSelectedDriver(null);
    } else {
      toast.error(response?.error?.message);
    }
  };

  const filtered = useMemo(
    () =>
      (drivers || []).filter(
        (d) =>
          d.name?.toLowerCase().includes(search.toLowerCase()) ||
          d.driverId?.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, drivers],
  );


  const stats = [
    { val: summary.totalDrivers, label: "TOTAL DRIVERS", cls: "sc-blue", id: "totalDrivers" },
    { val: summary.available, label: "AVAILABLE", cls: "sc-green", id: "available" },
    { val: summary.onTrip, label: "ON TRIP", cls: "sc-orange", id: "ontrip" },
    { val: summary.onLeave, label: "ON LEAVE", cls: "sc-red", id: "onleave" },
    { val: summary.assigned, label: "ASSIGNED", cls: "sc-purple", id: "assigned" },
    { val: summary.unassigned, label: "UNASSIGNED", cls: "sc-accent", id: "unassigned" },
    { val: summary.licenseExpiring, label: "LICENSE EXPIRING", cls: "sc-cyan", id: "license" },
    { val: summary.reserved, label: "RESERVED", cls: "sc-accent", id: "reserved" },
    { val: summary.activeTrips, label: "ACTIVE TRIPS", cls: "sc-green", id: "activeTrips" },
  ];

  if (loading && !drivers?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Drivers...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="dm-topbar">
        <div>
          <h1 className="heading">Driver Management</h1>
          <div className="sub-heading">
            {drivers?.length || 0} drivers · Compliance tracking ·
            Performance scores
          </div>
        </div>
        <div
          className="dm-btn-add"
          onClick={() => {
            setModalMode("add");
            setSelectedDriver(null);
            setOpenAddDriver(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <span>+ Add Driver</span>
        </div>
      </div>
      <div className="dm-main">
        <div className="dm-stat-row">
          {stats.map((s) => (
            <div key={s.id} className={`dm-stat-card ${s.cls}`}>
              <div className="dm-stat-val">{s.val}</div>
              <div className="dm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="dm-search-wrap">
          <div className="dm-search">
            <span className="dm-search-icon"><IoSearchOutline size={16}/></span>
            <input
              type="text"
              placeholder="Search driver name or license..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {error && !loading && (
          <div className="broker-error-banner">
            {error || "Failed to load driver data."}
          </div>
        )}
        <div className="dm-grid">
          {filtered.length > 0 ? (
            filtered.map((d) => (
              <DriverCard
                key={d._id}
                d={{
                  id: d.driverId,
                  name: d.name,
                  initials: d.name?.charAt(0)?.toUpperCase(),
                  av: "av-blue",
                  status: d.availableStatus || "Available",
                  sb:
                    d.availableStatus === "On Trip"
                      ? "sb-ontrip"
                      : "sb-available",
                  sc:
                    d.availableStatus === "On Trip"
                      ? "status-ontrip"
                      : "status-available",
                  dot:
                    d.availableStatus === "On Trip"
                      ? "dot-orange"
                      : "dot-green",
                  dlNo: d.dlNo || "—",
                  phone: d.mobile || "—",
                  vehicle: d.vehicle?.status || "Unassigned",
                  exp: d.experience ? `${d.experience} Years` : "—",
                  score: d.score || 0,
                }}
                onClick={() => { handleViewDriver(d._id) }}
                onEdit={() => {
                  setModalMode("edit");
                  setSelectedDriver(d);
                  setOpenAddDriver(true);
                }}
                onDelete={() => {
                  setSelectedDriver(d);
                  setOpenDeleteModal(true);
                }}
              />
            ))
          ) : (
            <div className="dm-empty">No drivers match your search.</div>
          )}
        </div>
      </div>
      <AddDriverModal
        open={openAddDriver}
        onClose={() => setOpenAddDriver(false)}
        mode={modalMode}
        driver={selectedDriver}
      />

      <DriverDetailModal
        open={openDriverModal}
        onClose={() => setOpenDriverModal(false)}
        driver={driverDetails}
      />
      {openDeleteModal && (
        <div className="vm-delete-backdrop">
          <div className="vm-delete-modal">
            <div className="vm-delete-icon-wrap">
              <MdDelete className="vm-delete-icon" />
            </div>
            <h3 className="vm-delete-title">Delete Driver?</h3>
            <p className="vm-delete-text">
              Are you sure you want to delete this driver?
            </p>
            <div className="vm-delete-actions">
              <button
                className="vm-delete-btn cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="vm-delete-btn confirm" onClick={handleDelete}>
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
