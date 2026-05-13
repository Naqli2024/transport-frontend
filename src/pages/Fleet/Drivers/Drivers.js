import { useState, useMemo } from "react";
import AddVehicleModal from "./AddDriver";
import DriverDetailsModal from "./DriverDetailsModal";

/* ═══════════ DATA ═══════════ */
const STATS = [
  { val: "6", label: "TOTAL", cls: "sc-blue", id: "total" },
  { val: "0", label: "ACTIVE", cls: "sc-green", id: "active" },
  { val: "2", label: "ON TRIP", cls: "sc-orange", id: "ontrip" },
  { val: "79%", label: "AVG SCORE", cls: "sc-accent", id: "score" },
];

const DRIVERS = [
  {
    id: "DRV-001",
    name: "Mani Kumar",
    initials: "M",
    av: "av-blue",
    status: "Available",
    sb: "sb-available",
    sc: "status-available",
    dot: "dot-green",
    license: "—",
    phone: "+91 98765 43210",
    vehicle: "Unassigned",
    exp: "—",
    score: 88,
    tab: "Available",
  },
  {
    id: "DRV-002",
    name: "Selvam R",
    initials: "S",
    av: "av-green",
    status: "On Settlement",
    sb: "sb-settlement",
    sc: "status-settlement",
    dot: "dot-blue",
    license: "—",
    phone: "+91 87654 32100",
    vehicle: "Unassigned",
    exp: "—",
    score: 76,
    tab: "Settlement",
  },
  {
    id: "DRV-003",
    name: "Ramesh P",
    initials: "R",
    av: "av-orange",
    status: "On Trip",
    sb: "sb-ontrip",
    sc: "status-ontrip",
    dot: "dot-orange",
    license: "—",
    phone: "+91 72345 21033",
    vehicle: "Unassigned",
    exp: "—",
    score: 82,
    tab: "On Trip",
  },
  {
    id: "DRV-004",
    name: "Arjun D",
    initials: "A",
    av: "av-purple",
    status: "Available",
    sb: "sb-available",
    sc: "status-available",
    dot: "dot-green",
    license: "—",
    phone: "+91 65432 10987",
    vehicle: "Unassigned",
    exp: "—",
    score: 94,
    tab: "Available",
  },
  {
    id: "DRV-005",
    name: "Vinoth S",
    initials: "V",
    av: "av-cyan",
    status: "On Trip",
    sb: "sb-ontrip",
    sc: "status-ontrip",
    dot: "dot-orange",
    license: "—",
    phone: "+91 54321 09876",
    vehicle: "Unassigned",
    exp: "—",
    score: 71,
    tab: "On Trip",
  },
  {
    id: "DRV-006",
    name: "Karthik M",
    initials: "K",
    av: "av-accent",
    status: "Available",
    sb: "sb-available",
    sc: "status-available",
    dot: "dot-green",
    license: "—",
    phone: "+91 43210 98765",
    vehicle: "Unassigned",
    exp: "—",
    score: 85,
    tab: "Available",
  },
];

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

function DriverCard({ d, onClick }) {
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
    </div>
  );
}

export default function Drivers() {
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [openAddDriver, setOpenAddDriver] = useState(false);
  const [openDriverModal, setOpenDriverModal] = useState(false);

  const filtered = useMemo(
    () =>
      DRIVERS.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.id.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div data-theme={theme}>
      <div className="dm-topbar ">
        <div className="dm-topbar-left d-flex justify-content-between align-items-center w-100">
          <div>
            <h1>Driver Management</h1>

            <div className="dm-topbar-sub">
              {DRIVERS.length} drivers · Compliance tracking · Performance
              scores
            </div>
          </div>

          <div
            className="add-driver-btn"
            onClick={() => setOpenAddDriver(true)}
            style={{ cursor: "pointer" }}
          >
            <span>+ Add Driver</span>
          </div>
        </div>
      </div>
      <div className="dm-main">
        <div className="dm-stat-row">
          {STATS.map((s) => (
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
                key={d.id}
                d={d}
                onClick={() => setOpenDriverModal(true)}
              />
            ))
          ) : (
            <div className="dm-empty">No drivers match your search.</div>
          )}
        </div>
      </div>
      <AddVehicleModal
        open={openAddDriver}
        handleClose={() => setOpenAddDriver(false)}
      />

      <DriverDetailsModal
        open={openDriverModal}
        onClose={() => setOpenDriverModal(false)}
      />
    </div>
  );
}
