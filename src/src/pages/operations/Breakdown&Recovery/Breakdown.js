import React, { useState } from "react";
import BreakdownModal from "./BreakdownModal";

const BREAKDOWN_DATA = [
  {
    id: "BRK-001",
    vehicle: "TN45 CD5678",
    location: "Nagpur NH-44",
    issue: "Radiator hose burst — engine overheating",
    driver: "Ramesh P",
    status: "In Progress",
    cost: 8500,
    reportedAt: "2025-04-10 14:30",
  },
  {
    id: "BRK-002",
    vehicle: "TN59 AB1234",
    location: "Chennai Bypass",
    issue: "Alternator failure — battery not charging",
    driver: "Selvam R",
    status: "Recovery Sent",
    cost: null,
    reportedAt: "2025-04-14 09:15",
  },
  {
    id: "BRK-003",
    vehicle: "TN38 EF9012",
    location: "Coimbatore Depot",
    issue: "Tyre burst — rear axle right outer",
    driver: "Arjun D",
    status: "Resolved",
    cost: 3200,
    reportedAt: "2025-04-08 11:00",
  },
];
const IconX = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const Breakdown = () => {
  const [bds, setBds] = useState(BREAKDOWN_DATA);
  const [sel, setSel] = useState(null);
  const open = bds.filter((b) => b.status !== "Resolved").length;
  const [openBreakdownModal, setOpenBreakdownModal] = useState(false);

  return (
    <div className="breakdown-page">
      <div className="breakdown-header">
        <div>
          <h1 className="heading">Breakdown Recovery</h1>
          <p className="sub-heading">
            Real-time incident tracking · Vendor dispatch · Recovery timeline
          </p>
        </div>
        <button className="btn btn-p">🚨 Report Breakdown</button>
      </div>
      <div className="breakdown-kpi-row">
        {[
          { l: "Active", v: open, c: "red" },
          {
            l: "Resolved",
            v: bds.filter((b) => b.status === "Resolved").length,
            c: "green",
          },
          { l: "Avg Resolution", v: "4.2h", c: "blue" },
          {
            l: "Recovery Cost",
            v:
              "₹" + bds.reduce((s, b) => s + (b.cost || 0), 0).toLocaleString(),
            c: "orange",
          },
        ].map((k) => (
          <div key={k.l} className={`rl-stat breakdown-stat-${k.c}`}>
            <div className="stat-v">{k.v}</div>
            <div className="rl-stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      {open > 0 && (
        <div className="breakdown-active-card">
          <div className="breakdown-active-title">
            🚨 Active Breakdowns ({open})
          </div>
          {bds
            .filter((b) => b.status !== "Resolved")
            .map((b) => (
              <div
                key={b.id}
                className="breakdown-arrow"
                onClick={() => setSel(b)}
              >
                <div className="breakdown-arrow-content">
                  <div className="breakdown-arrow-label">
                    {b.vehicle} — {b.location}
                  </div>
                  <div className="breakdown-arow-sub">
                    {b.issue} · Driver: {b.driver}
                  </div>
                </div>
                <span className="breakdown-badge-orange">{b.status}</span>
              </div>
            ))}
        </div>
      )}
      <div className="card pod-table-card">
        <table className="pod-tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Location</th>
              <th>Issue</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {bds.map((b) => (
              <tr
                key={b.id}
                 className="breakdown-tbl-row"
                onClick={() => {
                    setOpenBreakdownModal(true)
                    setSel(b)
                }}
              >
                <td className="breakdown-id">{b.id}</td>
                <td className="breakdown-vehicle">{b.vehicle}</td>
                <td>{b.location}</td>
                <td>{b.issue}</td>
                <td>{b.driver}</td>
                <td>
                  <span
                    className={`${b.status==="Resolved"? "breakdown-badge-green" : "breakdown-badge-orange"}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="breakdown-cost">
                  {b.cost ? "₹" + b.cost.toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openBreakdownModal && (
        <BreakdownModal sel={sel} setSel={setSel} setBds={setBds} closeModal={() => setOpenBreakdownModal(false)}/>
      )}
    </div>
  );
};

export default Breakdown;
