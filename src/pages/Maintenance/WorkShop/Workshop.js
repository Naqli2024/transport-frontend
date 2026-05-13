
import { useState } from "react";

/* ═══════════ DATA ═══════════ */
const STATS = [
  { val: "2",        label: "OPEN",       cls: "sc-red"    },
  { val: "1",        label: "COMPLETED",  cls: "sc-green"  },
  { val: "₹21,500",  label: "TOTAL COST", cls: "sc-accent" },
  { val: "3",        label: "VEHICLES",   cls: "sc-blue"   },
];

const WORK_ORDERS = [
  {
    id: "WO-001",
    vehicle: "TN45 CD5678",
    category: "Engine",
    catCls: "cat-engine",
    issue: "Engine overheating during long haul",
    cost: "₹8,500",
    status: "In Progress",
    stCls: "st-inprogress",
    stripeCls: "stripe-blue",
  },
  {
    id: "WO-002",
    vehicle: "TN59 AB1234",
    category: "Electrical",
    catCls: "cat-electrical",
    issue: "Battery not charging — alternator fault",
    cost: "₹11,000",
    status: "Open",
    stCls: "st-open",
    stripeCls: "stripe-amber",
  },
  {
    id: "WO-003",
    vehicle: "TN69 GH4789",
    category: "Tyre System",
    catCls: "cat-tyre",
    issue: "Scheduled tyre rotation & alignment",
    cost: "₹2,000",
    status: "Completed",
    stCls: "st-completed",
    stripeCls: "stripe-green",
  },
];

/* ═══════════ TABLE ROW ═══════════ */
function TableRow({ wo }) {
  return (
    <tr>
      <td><span className="td-woid">{wo.id}</span></td>
      <td><span className="td-vehicle">{wo.vehicle}</span></td>
      <td><span className={`wo-cat ${wo.catCls}`}>{wo.category}</span></td>
      <td><span className="td-issue">{wo.issue}</span></td>
      <td><span className="td-cost">{wo.cost}</span></td>
      <td><span className={`wo-status ${wo.stCls}`}>{wo.status}</span></td>
      <td><button className="wo-btn-view">View</button></td>
    </tr>
  );
}

/* ═══════════ MOBILE CARD ═══════════ */
function WorkOrderCard({ wo }) {
  return (
    <div className={`wo-card ${wo.stripeCls}`}>
      <div className="wo-card-head">
        <div className="wo-card-id-block">
          <span className="wo-card-id">{wo.id}</span>
          <span className="wo-card-vehicle">{wo.vehicle}</span>
        </div>
        <span className={`wo-status ${wo.stCls}`}>{wo.status}</span>
      </div>
      <div className="wo-card-rows">
        <div className="wo-card-row">
          <span className="wo-card-label">Category</span>
          <span className={`wo-cat ${wo.catCls}`}>{wo.category}</span>
        </div>
        <div className="wo-card-row">
          <span className="wo-card-label">Issue</span>
          <span className="wo-card-val" style={{ textAlign: "right", maxWidth: "60%" }}>{wo.issue}</span>
        </div>
        <div className="wo-card-row">
          <span className="wo-card-label">Cost</span>
          <span className="wo-card-val val-red">{wo.cost}</span>
        </div>
      </div>
      <div className="wo-card-footer">
        <span style={{ fontSize: "10px", color: "var(--textMuted)", fontFamily: "var(--font-mono)" }}>
          {wo.id}
        </span>
        <button className="wo-btn-view">View</button>
      </div>
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function Workshop() {
  const [theme, setTheme] = useState("dark");

  return (
    <div data-theme={theme}>

      {/* TOPBAR */}
      <div className="wo-topbar">
        <div className="wo-topbar-left">
          <h1>Workshop &amp; Work Orders</h1>
          <div className="wo-topbar-sub">Active repairs · Scheduled PM · Cost tracking</div>
        </div>
        <div className="wo-topbar-right">

          <button className="wo-btn-new">+ New WO</button>
        </div>
      </div>

      <div className="wo-main">

        {/* STAT CARDS */}
        <div className="wo-stat-row">
          {STATS.map(s => (
            <div key={s.label} className={`wo-stat-card ${s.cls}`}>
              <div className="wo-stat-val">{s.val}</div>
              <div className="wo-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="wo-table-section">
          <div className="wo-table-scroll">
            <table className="wo-table">
              <thead>
                <tr>
                  <th>WO ID</th>
                  <th>Vehicle</th>
                  <th>Category</th>
                  <th>Issue</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {WORK_ORDERS.map(wo => <TableRow key={wo.id} wo={wo} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="wo-card-list">
          {WORK_ORDERS.map(wo => <WorkOrderCard key={wo.id} wo={wo} />)}
        </div>

      </div>
    </div>
  );
}