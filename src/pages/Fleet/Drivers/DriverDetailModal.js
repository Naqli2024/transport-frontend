import React from "react";

function statusMod(status) {
  if (!status) return "";
  const s = status.toLowerCase();
  if (s === "available")  return "dm-modal-value--green";
  if (s === "on trip")    return "dm-modal-value--amber";
  if (s === "off duty")   return "dm-modal-value--muted";
  if (s === "suspended")  return "dm-modal-value--red";
  return "";
}

const DriverDetailModal = ({ open, onClose, driver }) => {
  if (!open || !driver) return null;

  const {
    name         = "—",
    id           = "—",
    licenseNo    = "",
    phone        = "—",
    experience   = "",
    status       = "—",
    currentVehicle = "Unassigned",
    totalTrips   = "—",
    performanceScore = "",
  } = driver;

  const rows = [
    { label: "ID",                value: id },
    { label: "License No",        value: licenseNo || "" },
    { label: "Phone",             value: phone },
    { label: "Experience",        value: experience ? `${experience} yrs` : "" },
    { label: "Status",            value: status,          mod: statusMod(status) },
    { label: "Current Vehicle",   value: currentVehicle },
    { label: "Total Trips",       value: totalTrips !== "" ? String(totalTrips) : "—" },
    { label: "Performance Score", value: performanceScore !== "" ? `${performanceScore}%` : "—" },
  ];

  return (
    <div
      className="dm-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Driver details — ${name}`}
      onClick={onClose}
    >
      <div
        className="dm-modal-detail-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dm-modal-detail-header">
          <span className="dm-modal-detail-name">{name}</span>
          <button
            className="dm-modal-detail-close"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        <div className="dm-modal-detail-body">
          {rows.map((row, i) => (
            <div key={i} className="dm-modal-info-row">
              <span className="dm-modal-info-label">{row.label}</span>
              <span className={`dm-modal-info-value ${row.mod || ""}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="dm-modal-detail-footer">
          <button
            className="dm-modal-detail-btn-close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailModal;
