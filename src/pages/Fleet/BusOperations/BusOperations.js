import { useState } from "react";
import PreTripModal from "./PreTripModal";
import SeatConditionModal from "./SeatsModal";
import ComplianceModal from "./DocsModal";

const STATS = [
  { value: 4, label: "Buses", color: "blue" },
  { value: 2, label: "Active", color: "green" },
  { value: 2, label: "Expired Docs", color: "red" },
  { value: 1, label: "Critical <30D", color: "orange" },
  { value: 2, label: "Non-Compliant Drivers", color: "purple" },
];

const VIOLATIONS = [
  {
    id: "v1",
    bus: "TN38 PQ2345",
    type: "Fitness Certificate",
    meta: "Expired 7d ago",
    fine: "₹10,000 + seizure",
  },
  {
    id: "v2",
    bus: "TN38 PQ2345",
    type: "PUC Certificate",
    meta: "Expired 8d ago",
    fine: "₹1,000",
  },
];

const FLEET = [
  {
    id: "b1",
    reg: "TN22 IJ7890",
    status: "Active",
    model: "Starbus Ultra 40",
    seats: 40,
    ac: true,
    type: "Corporate Shuttle",
    typeClass: "corporate",
    icon: "🚌",
    compliant: true,
    overdue: false,
    pretrip: 28,
    seatCount: 40,
    docsOk: true,
  },
  {
    id: "b2",
    reg: "TN45 KL4321",
    status: "Active",
    model: "Leyland LYNX 32",
    seats: 32,
    ac: false,
    type: "School Bus",
    typeClass: "school",
    icon: "🏫",
    compliant: true,
    overdue: false,
    pretrip: 28,
    seatCount: 32,
    docsOk: false,
  },
  {
    id: "b3",
    reg: "TN69 MN8765",
    status: "Available",
    model: "9400 Club Class",
    seats: 45,
    ac: true,
    type: "Tourism / Charter",
    typeClass: "tourism",
    icon: "🚌",
    compliant: true,
    overdue: false,
    pretrip: 28,
    seatCount: 45,
    docsOk: true,
  },
  {
    id: "b4",
    reg: "TN38 PQ2345",
    status: "Overdue Compliance",
    model: "Starbus 4x2",
    seats: 52,
    ac: false,
    type: "Local Stage / City",
    typeClass: "stage",
    icon: "🏙️",
    compliant: false,
    overdue: true,
    pretrip: 28,
    seatCount: 52,
    docsOk: false,
    expiredCount: 2,
  },
];

const TABS = [
  "Fleet",
  "Compliance",
  "Driver PSV",
  "Seat Check",
  "Routes",
  "Tickets",
];

function StatCard({ value, label, color }) {
  return (
    <div className={`bus-operation-stat-card bus-operation-color-${color}`}>
      <div className="bus-operation-stat-value">{value}</div>
      <div className="bus-operation-stat-label">{label}</div>
    </div>
  );
}

function ViolationItem({ bus, type, meta, fine }) {
  return (
    <div className="bus-operation-violation-item">
      <div className="bus-operation-violation-info">
        <div className="bus-operation-violation-title">
          {bus} — {type}
        </div>
        <div className="bus-operation-violation-meta">
          {meta} · Fine: <span>{fine}</span>
        </div>
      </div>
      <button className="bus-operation-violation-btn">View</button>
    </div>
  );
}

function ProgressBar({
  label,
  icon,
  count,
  total,
  variant,
  hasIssue,
  onClick,
}) {
  const pct = Math.min((count / (total || 1)) * 100, 100);
  const docClass =
    variant === "bus-operation-docs"
      ? hasIssue
        ? "bus-operation-docs"
        : "bus-operation-docs-ok"
      : variant;

  return (
   <div
  className={`bus-operation-progress-item bus-operation-${docClass}`}
  onClick={onClick}
  style={{ cursor: onClick ? "pointer" : "default" }}
>
      <div className="bus-operation-progress-label">
        <span>
          <span className="bus-operation-icon">{icon}</span>
          {label} ({count})
        </span>
      </div>
      <div className="bus-operation-progress-bar-wrap">
        <div
          className="bus-operation-progress-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function BusCard({ bus, onOpenPreTrip, onOpenSeat, onOpenDocs }) {
  const statusClass =
    bus.status === "Active"
      ? "active"
      : bus.status === "Available"
        ? "available"
        : "overdue";

  return (
    <div
      className={`bus-operation-bus-card ${bus.overdue ? "bus-operation-overdue" : ""}`}
    >
      <div className="bus-operation-bus-card-header">
        <div className="bus-operation-bus-header-left">
          <span className="bus-operation-bus-icon">{bus.icon}</span>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span className="bus-operation-bus-reg">{bus.reg}</span>
              <span
                className={`bus-operation-status-badge bus-operation-${statusClass}`}
              >
                {bus.status}
              </span>
            </div>
          </div>
        </div>
        <div className="bus-operation-bus-header-right">
          {bus.compliant && (
            <span className="bus-operation-compliant-badge">
              Compliant
              <span className="bus-operation-compliant-check">✓</span>
            </span>
          )}
          {bus.overdue && (
            <span className="bus-operation-expired-count">
              {bus.expiredCount} EXPIRED
            </span>
          )}
        </div>
      </div>

      <div className="bus-operation-bus-model">
        {bus.model} · {bus.seats} seats
        <span> · {bus.ac ? "AC" : "Non-AC"}</span>
      </div>
      <div className={`bus-operation-bus-type bus-operation-${bus.typeClass}`}>
        {bus.type}
      </div>

      <div className="bus-operation-progress-row">
        <ProgressBar
  label="Pre-Trip"
  icon="🔍"
  count={bus.pretrip}
  total={30}
  variant="pretrip"
  onClick={onOpenPreTrip}
/>
       <ProgressBar
  label="Seats"
  icon="💺"
  count={bus.seatCount}
  total={bus.seatCount}
  variant="seats"
  onClick={onOpenSeat}
/>
        <ProgressBar
  label="Docs"
  icon="📋"
  count={bus.overdue ? 0 : 1}
  total={1}
  variant="docs"
  hasIssue={!bus.docsOk}
  onClick={onOpenDocs}
/>
      </div>
    </div>
  );
}

export default function BusOperations() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("Fleet");
  const [openPreTripModal, setOpenPreTripModal] = useState(false);
  const [openSeatModal, setOpenSeatModal] = useState(false);
  const [openDocsModal, setOpenDocsModal] = useState(false);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="bus-operation-app" data-theme={theme}>
      <header className="bus-operation-topbar">
        <div className="bus-operation-topbar-left">
          <span className="bus-operation-topbar-title">Bus Operations</span>
          <div className="bus-operation-topbar-subtitle">
            {[
              "Corporate",
              "School",
              "Tourism",
              "Stage",
              "PSV Compliance",
              "Driver Check",
              "Seat Inspection",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </header>
      <main className="bus-operation-main-content">
        <div className="bus-operation-stat-grid">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
        <section className="bus-operation-compliance-panel">
          <div className="bus-operation-compliance-header">
            <span className="bus-operation-icon">🚨</span>
            <span className="bus-operation-compliance-title">
              Compliance Violations — MV Act 2019
            </span>
          </div>
          <div className="bus-operation-violation-list">
            {VIOLATIONS.map((v) => (
              <ViolationItem key={v.id} {...v} />
            ))}
          </div>
        </section>
        <div className="bus-operation-tabs-bar">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`bus-operation-tab-btn ${activeTab === tab ? "bus-operation-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Fleet" ? (
          <div className="bus-operation-fleet-grid">
            {FLEET.map((bus) => (
            <BusCard
  key={bus.id}
  bus={bus}
  onOpenPreTrip={() => setOpenPreTripModal(true)}
  onOpenSeat={() => setOpenSeatModal(true)}
  onOpenDocs={() => setOpenDocsModal(true)}
/>
            ))}
          </div>
        ) : (
          <div className="bus-operation-tab-placeholder">
            <div className="bus-operation-icon">📂</div>
            <p>{activeTab.toUpperCase()} — coming soon</p>
          </div>
        )}
      </main>
   {openPreTripModal && (
  <PreTripModal
    open={openPreTripModal}
    onClose={() => setOpenPreTripModal(false)}
  />
)}

{openSeatModal && (
  <SeatConditionModal
    open={openSeatModal}
    onClose={() => setOpenSeatModal(false)}
  />
)}

{openDocsModal && (
  <ComplianceModal
    open={openDocsModal}
    onClose={() => setOpenDocsModal(false)}
  />
)}
    </div>
  );
}
