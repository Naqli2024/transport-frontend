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
  name = "—",
  driverId = "—",
  dlNo = "—",
  mobile = "—",
  experience = "",
  availableStatus = "—",
  vehicleNumber = "Unassigned",
  totalTrips = 0,
  score = 0,
  dlClass = "—",
  licenseExpiryDate = "—",
  aadhaarNo = "—",
} = driver;

  const rows = [
  { label: "Driver ID", value: driverId },

  { label: "License No", value: dlNo },

  { label: "DL Class", value: dlClass },

  { label: "Phone", value: mobile },

  { label: "Aadhaar No", value: aadhaarNo },

  {
    label: "Experience",
    value: experience ? `${experience} yrs` : "—",
  },

  {
    label: "Status",
    value: availableStatus,
    mod: statusMod(availableStatus),
  },

  {
    label: "License Expiry",
    value: licenseExpiryDate,
  },

  {
    label: "Current Vehicle",
    value: vehicleNumber || "Unassigned",
  },

  {
    label: "Total Trips",
    value: totalTrips,
  },

  {
    label: "Performance Score",
    value: `${score}%`,
  },
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
