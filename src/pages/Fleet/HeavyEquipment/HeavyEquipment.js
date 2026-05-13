import { useState } from "react";
import AddEquipmentModal from "./AddEquipment";

const FLEET = [
  {
    id: "TN69 JCB001",
    model: "JCB 3DX",
    icon: "🟡",
    iconClass: "icon-amber",
    idColor: "amber",
    status: "On Site",
    statusClass: "badge-onsite",
    cardClass: "status-onsite",
    engineHours: 4286,
    engineMax: 6000,
    fillClass: "fill-amber",
    pm: "OVERDUE 36h",
    pmClass: "red",
    location: "Madurai Bypass NH7",
    locClass: "loc-red",
  },
  {
    id: "TN45 EXC01",
    model: "JCB NXT 215",
    icon: "🦾",
    iconClass: "icon-teal",
    idColor: "teal",
    status: "Available",
    statusClass: "badge-avail",
    cardClass: "status-avail",
    engineHours: 2841,
    engineMax: 6000,
    fillClass: "fill-teal",
    pm: "159h left",
    pmClass: "green",
    location: "At Depot",
    locClass: "loc-amber",
  },
  {
    id: "TN45 EXC01",
    model: "JCB NXT 215",
    icon: "🦾",
    iconClass: "icon-teal",
    idColor: "teal",
    status: "Available",
    statusClass: "badge-avail",
    cardClass: "status-avail",
    engineHours: 2841,
    engineMax: 6000,
    fillClass: "fill-teal",
    pm: "159h left",
    pmClass: "green",
    location: "At Depot",
    locClass: "loc-amber",
  },
  {
    id: "TN45 EXC01",
    model: "JCB NXT 215",
    icon: "🦾",
    iconClass: "icon-teal",
    idColor: "teal",
    status: "Available",
    statusClass: "badge-avail",
    cardClass: "status-avail",
    engineHours: 2841,
    engineMax: 6000,
    fillClass: "fill-teal",
    pm: "159h left",
    pmClass: "green",
    location: "At Depot",
    locClass: "loc-amber",
  },
];

function Bar({ pct, fillClass }) {
  return (
    <div className="heavy-equipment-progress-bar">
      <div
        className={`heavy-equipment-progress-fill heavy-equipment-${fillClass}`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

function EqCard({ eq }) {
  const enginePct = Math.round((eq.engineHours / eq.engineMax) * 100);

  return (
    <div className={`heavy-equipment-eq-card heavy-equipment-${eq.cardClass}`}>
      <div className="heavy-equipment-eq-card-head">
        <div className="heavy-equipment-eq-id-block">
          <div
            className={`heavy-equipment-eq-icon heavy-equipment-${eq.iconClass}`}
          >
            {eq.icon}
          </div>

          <div className="heavy-equipment-eq-id-text">
            <div
              className={`heavy-equipment-eq-id heavy-equipment-${eq.idColor}`}
            >
              {eq.id}
            </div>
            <div className="heavy-equipment-eq-model">{eq.model}</div>
          </div>
        </div>

        <span
          className={`heavy-equipment-status-badge heavy-equipment-${eq.statusClass}`}
        >
          {eq.status}
        </span>
      </div>

      <div className="heavy-equipment-meter-block">
        <div className="heavy-equipment-meter-row">
          <span className="heavy-equipment-meter-label">Engine Hours</span>
          <span
            className={`heavy-equipment-meter-val heavy-equipment-${eq.fillClass}`}
          >
            {eq.engineHours.toLocaleString()} hrs
          </span>
        </div>

        <Bar pct={enginePct} fillClass={eq.fillClass} />
      </div>

      <div className="heavy-equipment-pm-bar-row">
        <span className="heavy-equipment-pm-label">Next PM</span>
        <span
          className={`heavy-equipment-pm-val heavy-equipment-${eq.pmClass}`}
        >
          {eq.pm}
        </span>
      </div>

      <div className="heavy-equipment-eq-location">
        <div
          className={`heavy-equipment-loc-dot heavy-equipment-${eq.locClass}`}
        />
        {eq.location}
      </div>

      <div className="heavy-equipment-eq-card-footer">
        <button className="heavy-equipment-btn-log">⊕ Log Hrs</button>
        <button className="heavy-equipment-btn-details">Details →</button>
      </div>
    </div>
  );
}

export default function HeavyEquipment() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("Fleet");
  const [openAddEquipmentModal, setOpenAddEquipmentModal] = useState(false);

  return (
    <div className={`heavy-equipment-root`} data-theme={theme}>
      <div className="heavy-equipment-topbar">
        <div className="heavy-equipment-topbar-left">
          <h1>Heavy Equipment</h1>
          <div className="heavy-equipment-topbar-subtitle">
            JCB · Excavator · Crane · Roller — hours-based site billing
          </div>
        </div>

        <div className="heavy-equipment-topbar-right">
        <button
  className="heavy-equipment-btn-add"
  onClick={() => setOpenAddEquipmentModal(true)}
>
  + Add Equipment
</button>
        </div>
      </div>

      <div className="heavy-equipment-main-wrap">
        <div className="heavy-equipment-tabs-row">
          {["Fleet", "Hours Log", "Rate Calc"].map((tab) => (
            <button
              key={tab}
              className={`heavy-equipment-tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Fleet" && (
          <div className="heavy-equipment-fleet-grid">
            {FLEET.map((eq) => (
              <EqCard key={eq.id} eq={eq} />
            ))}
          </div>
        )}
      </div>
      {openAddEquipmentModal && (
  <AddEquipmentModal
    open={openAddEquipmentModal}
    onClose={() => setOpenAddEquipmentModal(false)}
  />
)}
    </div>
  );
}
