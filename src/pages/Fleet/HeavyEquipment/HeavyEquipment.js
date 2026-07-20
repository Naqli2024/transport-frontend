import React, { useState, useMemo, useEffect } from "react";
import LogHoursModal from "./LogHoursModal";
import AddEquipmentModal from "./AddEquipmentModal";
import { deleteVehicle, getAllVehicles, getEquipmentDashboard } from "../../../redux/Vehicle/VehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const EQUIPMENT_TYPES = {
  backhoe: {
    label: "Backhoe",
    icon: "🟡",
  },
  excavator: {
    label: "Excavator",
    icon: "🦾",
  },
  mini: {
    label: "Mini",
    icon: "🔶",
  },
  roller: {
    label: "Vibratory",
    icon: "🔵",
  },
  crane: {
    label: "Crane",
    icon: "🏗️",
  },
  telehandler: {
    label: "Telehandler",
    icon: "🔧",
  },
  grader: {
    label: "Grader",
    icon: "⚙️",
  },
  concrete: {
    label: "Concrete",
    icon: "🔘",
  },
  transit: {
    label: "Transit",
    icon: "🚌",
  },
};



const fmt = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000
      ? `₹${(n / 1000).toFixed(1)}k`
      : `₹${n}`;



function statusBadgeCls(s) {
  if (s === "On Site") return "he-badge-green";
  if (s === "Available") return "he-badge-blue";
  if (s === "Maintenance") return "he-badge-orange";
  return "he-badge-amber";
}
function logStatusCls(s) {
  return s === "Billed" ? "he-badge-green" : "he-badge-orange";
}

const HeavyEquipment = () => {
  const [tab, setTab] = useState("fleet");
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { vehicles, summary, loading, error } = useSelector((state) => state.vehicle);

  const handleDelete = async () => {
    if (!selectedEquipment?._id) return;
    const response = await dispatch(deleteVehicle(selectedEquipment._id));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllVehicles());
      await dispatch(getEquipmentDashboard());
      setOpenDeleteModal(false);
      setSelectedEquipment(null);
    } else {
      toast.error(response?.error?.message);
    }
  };

  useEffect(() => {
    dispatch(getEquipmentDashboard());
    dispatch(getAllVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const equipment = useMemo(() => {
    return (vehicles || [])
      .filter((item) => item.fleet === "equipment")
      .map((item) => ({
        _id: item._id,
        regNo: item.regNo || "",
        type: item.type,
        make: item.make || "",
        model: item.model || "",
        year: item.year || "",
        status:
          item.status === "Active"
            ? "On Site"
            : item.status || "Available",
        siteName: item.siteName || "",
        clientName: item.clientName || "",
        ownerShip: item.ownerShip || "",
        purchaseCost: Number(item.purchaseCost),
        serialNo: item.serialNo || "",
        currentEngineHours: Number(item.currentEngineHours) || 0,
        hourlyRate: Number(item.hourlyRate) || 0,
        nextServiceHours: Number(item.nextPmDueHours) || 0,
        remainingPmHours: Number(item.remainingPmHours) || 0,
        pmStatus: item.pmStatus || "",
        operator: item.operatorName || "",
        lastPmHours: Number(item.lastPmHours),
        pmIntervalHours: Number(item.pmIntervalHours),
        minShiftHrs: Number(item.minShiftHrs),
      }));
  }, [vehicles]);

  const filteredEquip = useMemo(() => {
    return equipment.filter((e) => {
      const q = search.toLowerCase();
      return (
        !q ||
        e.regNo?.toLowerCase().includes(q) ||
        e.model?.toLowerCase().includes(q) ||
        e.siteName?.toLowerCase().includes(q)
      );
    });
  }, [equipment, search]);

  const kpis = [
    {
      label: "Total Equipment",
      value: summary.totalEquipment,
      color: "var(--blue)",
    },
    {
      label: "On Site",
      value: summary.onSite,
      color: "var(--green)",
    },
    {
      label: "Available",
      value: summary.available,
      color: "var(--cyan)",
    },
    {
      label: "Service Due",
      value: summary.serviceDue,
      color: "var(--red)",
    },
    {
      label: "MTD Billed",
      value: summary.mtdBilled,
      color: "var(--accent)",
    },
  ];

  if (loading && !vehicles?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Equipment...</p>
      </div>
    );
  }
  return (
    <div className="he-page">
      {showAdd && (
        <AddEquipmentModal
          vehicle={selectedEquipment}
          isEdit={isEdit}
          onClose={() => {
            setShowAdd(false);
            setSelectedEquipment(null);
            setIsEdit(false);
          }}
        />
      )}
      <div className="he-page-hdr">
        <div className="he-page-hdr-left">
          <h1 className="heading">Heavy Equipment</h1>
          <p className="sub-heading">
            JCB · Excavator · Crane · Roller — hours-based site billing
          </p>
        </div>
        <div className="he-page-hdr-right">
          <button className="vm-btn-add" onClick={() => setShowAdd(true)}>
            + Add Equipment
          </button>
        </div>
      </div>
      {error && !loading && (
        <div className="broker-error-banner">
          {error || "Failed to load equipment data."}
        </div>
      )}
      <div className="he-kpi-row">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="he-kpi-card"
            style={{ borderTopColor: k.color }}
          >
            <div className="he-kpi-icon">{k.icon}</div>
            <div className="he-kpi-val" style={{ color: k.color }}>
              {k.value}
            </div>
            <div className="he-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="vm-tabs mb-4">
        {[
          ["fleet", "Fleet"],
          ["hours-log", "Hours Log"],
          ["rate-calc", "Rate Calc"],
        ].map(([k, l]) => (
          <button
            key={k}
            className={`vm-tab-btn ${tab === k ? "active" : ""}`}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "fleet" && (
        <>
          <div className="he-filter-bar">
            <div className="he-search-wrap">
              <span className="he-search-icon">⌕</span>
              <input
                className="he-search-input"
                placeholder="Search reg, model, site…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="he-fleet-container">
            <div className="he-fleet-grid">
              {filteredEquip.map((eq) => {
                const htsLeft =
                  Number(eq.nextServiceHours || 0) -
                  Number(eq.currentEngineHours || 0);
                return (
                  <div
                    key={eq._id}
                    className={`he-eq-card ${htsLeft < 0 ? "he-card-overdue" : htsLeft <= 100 ? "he-card-warn" : ""}`}
                  >
                    <div style={{ flex: "1" }}>
                      <div className="he-eq-card-head mb-3">
                        <div className="he-eq-card-id">
                          <span className="he-eq-type-icon">
                            {EQUIPMENT_TYPES[eq.type?.toLowerCase()]?.icon || '🏗️'}
                          </span>
                          <div>
                            <div className="he-eq-regno">{eq.regNo}</div>
                            <div className="he-eq-model">
                              {eq.model} · {eq.make} {eq.year} {eq.serialNo}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`he-status-badge ${statusBadgeCls(eq.status)}`}
                        >
                          {eq.status}
                        </span>
                      </div>
                      <div className="he-engine-row">
                        <div className="he-engine-meta">
                          <span className="he-engine-label">Engine Hours</span>
                          <span className="he-engine-val">
                            {Number(eq.currentEngineHours || 0).toLocaleString()} hrs
                          </span>
                        </div>
                      </div>
                      <div
                        className={`he-service-tag ${htsLeft < 0 ? "he-svc-overdue" : htsLeft <= 100 ? "he-svc-warn" : "he-svc-ok"}`}
                      >
                        <span>🔧</span>
                        <span>
                          {htsLeft < 0
                            ? `PM OVERDUE by ${Math.abs(htsLeft)}h`
                            : htsLeft === 0
                              ? "PM DUE NOW"
                              : `Next PM in ${htsLeft}h`}
                        </span>
                      </div>
                      <div
                        className={`ms-2 he-site-tag ${eq.siteName ? "he-site-active" : "he-site-depot"}`}
                      >
                        <span>{eq.siteName ? "📍" : "📦"}</span>
                        <span>
                          {eq.siteName ? "On Site" : "At Depot"}
                        </span>
                      </div>
                      {(eq.operator || eq.hourlyRate) && (
                        <div className="he-eq-meta-row">
                          {eq.operator && (
                            <div className="he-eq-operator">
                              <span className="he-eq-meta-label">Operator</span>
                              <span className="he-eq-meta-val">
                                {eq.operator}
                              </span>
                            </div>
                          )}
                          {(eq.hourlyRate) && (
                            <div className="he-eq-rate">
                              <span className="he-eq-meta-label">Rate</span>
                              <span
                                className="he-eq-meta-val"
                                style={{ color: "var(--accent)" }}
                              >
                                ₹{eq.hourlyRate}/hr
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="he-eq-actions">
                      <button
                        className="he-btn he-btn-edit"
                        onClick={() => {
                          setSelectedEquipment(eq);
                          setIsEdit(true);
                          setShowAdd(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="he-btn he-btn-log"
                        onClick={() => { setOpenDeleteModal(true); setSelectedEquipment(eq) }}
                      >
                        Delete
                      </button>
                      <button className="he-btn he-btn-ghost-sm">
                        Details →
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredEquip.length === 0 && (
                <div className="he-empty">
                  <div className="he-empty-icon">🏗️</div>
                  <div>No equipment matches your filter</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {openDeleteModal && (
        <div className="vm-delete-backdrop">
          <div className="vm-delete-modal">
            <div className="vm-delete-icon-wrap">
              <MdDelete className="vm-delete-icon" />
            </div>
            <h3 className="vm-delete-title">Delete Equipment?</h3>
            <p className="vm-delete-text">
              Are you sure you want to delete this Equipment?
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
};

export default HeavyEquipment;
