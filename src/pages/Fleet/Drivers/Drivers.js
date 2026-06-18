import { useState, useMemo, useEffect } from "react";
import AddDriverModal from "./AddDriverModal";
import DriverDetailModal from "./DriverDetailModal";
import { useDispatch } from "react-redux";
import { deleteDriver, getAllDrivers } from "../../../redux/Driver/DriverSlice";
import { MdOutlineEdit, MdDeleteOutline, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function ScoreBar({ score }) {
  const fillCls =
    score >= 85 ? "fill-high" : score >= 70 ? "fill-mid" : "fill-low";
  return (
    <div className="dm-score-section">
      <div className="dm-bar-track">
        <div
          className={`dm-bar-fill ${fillCls}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="dm-score-line">
        <span
          style={{
            fontSize: "9px",
            color: "var(--textMuted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          0
        </span>
        <span
          className="dm-score-val"
          style={{
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            color: "var(--textSub)",
          }}
        >
          Score: {score}%
        </span>
        <span
          style={{
            fontSize: "9px",
            color: "var(--textMuted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          100
        </span>
      </div>
    </div>
  );
}

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
          { label: "License", val: d.license, valCls: "val-muted" },
          { label: "Phone", val: d.phone, valCls: "" },
          { label: "Vehicle", val: d.vehicle, valCls: "val-muted" },
          { label: "Experience", val: d.exp, valCls: "val-muted" },
        ].map((row) => (
          <div key={row.label} className="dm-info-row">
            <span className="dm-info-label">{row.label}</span>
            <span className={`dm-info-val ${row.valCls}`}>{row.val}</span>
          </div>
        ))}
      </div>

      <ScoreBar score={d.score} />
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
  const [driverData, setDriverData] = useState();
  const [driverDetails, setDriverDetails] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDrivers())
      .unwrap()
      .then((response) => {
        console.log(response);
        setDriverDetails(response.data || []);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

  const handleDelete = () => {
    if (!selectedDriver?._id) return;

    dispatch(deleteDriver(selectedDriver._id))
      .unwrap()
      .then(() => {
        toast.success("Driver deleted successfully");
        setDriverDetails((prev) =>
          prev.filter((d) => d._id !== selectedDriver._id),
        );
        setOpenDeleteModal(false);
        setSelectedDriver(null);
      })
      .catch(() => {
        toast.error("Failed to delete driver");
      });
  };

  const filtered = useMemo(
    () =>
      (driverDetails || []).filter(
        (d) =>
          d.name?.toLowerCase().includes(search.toLowerCase()) ||
          d.dlNo?.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, driverDetails],
  );
  const stats = useMemo(() => {
    const total = driverDetails?.length || 0;
    const active =
      driverDetails?.filter(
        (d) => d.availableStatus?.toLowerCase() === "available",
      ).length || 0;

    const onTrip =
      driverDetails?.filter(
        (d) => d.availableStatus?.toLowerCase() === "on trip",
      ).length || 0;

    const avgScore =
      total > 0
        ? Math.round(
            driverDetails.reduce((sum, d) => sum + (Number(d.score) || 0), 0) /
              total,
          )
        : 0;

    return [
      {
        val: total,
        label: "TOTAL",
        cls: "sc-blue",
        id: "total",
      },
      {
        val: active,
        label: "ACTIVE",
        cls: "sc-green",
        id: "active",
      },
      {
        val: onTrip,
        label: "ON TRIP",
        cls: "sc-orange",
        id: "ontrip",
      },
      {
        val: `${avgScore}%`,
        label: "AVG SCORE",
        cls: "sc-accent",
        id: "score",
      },
    ];
  }, [driverDetails]);
  return (
    <div>
      <div className="dm-topbar">
        <div>
          <h1 className="heading">Driver Management</h1>
          <div className="sub-heading">
            {driverDetails?.length || 0} drivers drivers · Compliance tracking ·
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
            <span className="dm-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search driver name or license..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="dm-grid">
          {filtered.length > 0 ? (
            filtered.map((d) => (
              <DriverCard
                key={d._id}
                d={{
                  id: d.id,
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
                  license: d.dlNo || "—",
                  phone: d.mobile || "—",
                  vehicle: d.vehicleNumber || "",
                  exp: d.experience ? `${d.experience} Years` : "—",
                  score: d.score || 0,
                }}
                onClick={() => {
                  setOpenDriverModal(true);
                  setDriverData(d);
                }}
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
        driver={driverData}
      />
      {openDeleteModal && (
        <div className="vm-delete-backdrop">
          <div className="vm-delete-modal">
            <div className="vm-delete-icon-wrap">
              <MdDelete className="vm-delete-icon" />
            </div>
            <h3 className="vm-delete-title">Delete Vehicle?</h3>
            <p className="vm-delete-text">
              Are you sure you want to delete this vehicle?
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
