import { useState } from "react";


/* ═══════════ DATA ═══════════ */
const VEHICLES = [
  { id: "TN69 GH4789", odo: "74,875 km" },
  { id: "TN59 AB1234", odo: "92,348 km" },
  { id: "TN45 CD5678", odo: "1,24,080 km" },
  { id: "TN38 EF9012", odo: "54,228 km" },
  { id: "TN71 GH3456", odo: "88,918 km" },
  { id: "TN22 IJ7890", odo: "31,448 km" },
];

const TASKS = [
  { task: "Front Wheel Hub Bearing — Re-pack",       type: "grease", typeCls:"type-grease", interval:"40,000 km", lastDone:"2025-01-15", nextKm:"1,08,000", nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Rear Hub Bearing — Re-pack (Drive Axle)", type: "grease", typeCls:"type-grease", interval:"60,000 km", lastDone:"Never",      nextKm:"1,34,875", nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Front Leaf Spring — Graphite Grease",     type: "grease", typeCls:"type-grease", interval:"10,000 km", lastDone:"Never",      nextKm:"84,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Rear Leaf Spring — Graphite Grease",      type: "grease", typeCls:"type-grease", interval:"10,000 km", lastDone:"Never",      nextKm:"84,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Steering Linkage Nipples (All Points)",   type: "grease", typeCls:"type-grease", interval:"5,000 km",  lastDone:"Never",      nextKm:"79,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "King Pin & Stub Axle Grease",             type: "grease", typeCls:"type-grease", interval:"15,000 km", lastDone:"Never",      nextKm:"89,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Propeller Shaft Universal Joints",        type: "grease", typeCls:"type-grease", interval:"10,000 km", lastDone:"Never",      nextKm:"84,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Fifth Wheel Plate — Trailer Coupling",    type: "grease", typeCls:"type-grease", interval:"10,000 km", lastDone:"Never",      nextKm:"84,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Chassis Nipple Points — Full Set",        type: "grease", typeCls:"type-grease", interval:"5,000 km",  lastDone:"2025-03-01", nextKm:"77,000",   nextCls:"due-warn", status:"DUE", stCls:"pst-due", isDue:true },
  { task: "Bogie Suspension — Centre Bearing Grease",type: "grease", typeCls:"type-grease", interval:"20,000 km", lastDone:"Never",      nextKm:"94,875",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Engine Oil Change + Oil Filter",          type: "oil",    typeCls:"type-oil",    interval:"15,000 km", lastDone:"2025-02-14", nextKm:"85,000",   nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Gearbox Oil Change",                      type: "oil",    typeCls:"type-oil",    interval:"60,000 km", lastDone:"Never",      nextKm:"1,34,875", nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
  { task: "Front Axle Differential Oil",             type: "oil",    typeCls:"type-oil",    interval:"60,000 km", lastDone:"Never",      nextKm:"1,34,875", nextCls:"", status:"OK",  stCls:"pst-ok",  isDue:false },
];

/* helper: stripe class from stCls */
function stripeClass(stCls) {
  if (stCls === "pst-due")  return "stripe-due";
  if (stCls === "pst-over") return "stripe-over";
  return "stripe-ok";
}
function nextValClass(nextCls, stCls) {
  if (stCls === "pst-due")  return "val-accent";
  if (stCls === "pst-over") return "val-red";
  return "val-green";
}

/* ═══════════ TABLE ROW ═══════════ */
function TaskRow({ t }) {
  return (
    <tr className={t.isDue ? "row-due" : ""}>
      <td><span className={`td-task ${t.isDue ? "task-due" : ""}`}>{t.task}</span></td>
      <td><span className={`prevent-maintenance-type ${t.typeCls}`}>{t.type}</span></td>
      <td><span className="td-interval">{t.interval}</span></td>
      <td><span className="td-lastdone">{t.lastDone}</span></td>
      <td><span className={`td-nextdue ${t.nextCls}`}>{t.nextKm}</span></td>
      <td><span className={`prevent-maintenance-status ${t.stCls}`}>{t.status}</span></td>
      <td><button className="prevent-maintenance-btn-log-sm">Log</button></td>
    </tr>
  );
}

/* ═══════════ MOBILE CARD ═══════════ */
function TaskCard({ t }) {
  const stripe = stripeClass(t.stCls);
  const valCls = nextValClass(t.nextCls, t.stCls);
  return (
    <div className={`prevent-maintenance-task-card ${stripe} ${t.isDue ? "row-due" : ""}`}>
      <div className="prevent-maintenance-tc-head">
        <span className={`prevent-maintenance-tc-task ${t.isDue ? "task-due" : ""}`}>{t.task}</span>
        <span className={`prevent-maintenance-type ${t.typeCls}`}>{t.type}</span>
      </div>
      <div className="prevent-maintenance-tc-rows">
        <div className="prevent-maintenance-tc-row"><span className="prevent-maintenance-tc-label">Interval</span>    <span className="prevent-maintenance-tc-val">{t.interval}</span></div>
        <div className="prevent-maintenance-tc-row"><span className="prevent-maintenance-tc-label">Last Done</span>   <span className="prevent-maintenance-tc-val">{t.lastDone}</span></div>
        <div className="prevent-maintenance-tc-row"><span className="prevent-maintenance-tc-label">Next Due KM</span> <span className={`prevent-maintenance-tc-val ${valCls}`}>{t.nextKm}</span></div>
        <div className="prevent-maintenance-tc-row"><span className="prevent-maintenance-tc-label">Status</span>      <span className={`prevent-maintenance-status ${t.stCls}`}>{t.status}</span></div>
      </div>
      <div className="prevent-maintenance-tc-footer">
        <button className="prevent-maintenance-btn-log-sm">Log</button>
      </div>
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function PreventiveMaintenance() {
  const [theme,      setTheme]   = useState("dark");
  const [activeVeh,  setVeh]     = useState("TN69 GH4789");

  const currentVeh = VEHICLES.find(v => v.id === activeVeh) || VEHICLES[0];

  return (
    <div data-theme={theme}>

      {/* TOPBAR */}
      <div className="prevent-maintenance-topbar">
        <div className="prevent-maintenance-topbar-left">
          <h1>Preventive Maintenance</h1>
          <div className="prevent-maintenance-topbar-sub">Grease packing · Engine oil · Brakes · Service intervals</div>
        </div>
        <div className="prevent-maintenance-topbar-right">
          <button className="prevent-maintenance-btn-log">✓ Log prevent-maintenance Done</button>
        </div>
      </div>

      <div className="prevent-maintenance-main">

        {/* VEHICLE SELECTOR */}
        <div className="prevent-maintenance-vehicle-bar">
          <span className="prevent-maintenance-vbar-label">Vehicle</span>
          <div className="prevent-maintenance-vbar-chips">
            {VEHICLES.map(v => (
              <button
                key={v.id}
                className={`prevent-maintenance-vchip ${activeVeh === v.id ? "active" : ""}`}
                onClick={() => setVeh(v.id)}
              >{v.id}</button>
            ))}
          </div>
          <div className="prevent-maintenance-vbar-odo">ODO: <span>{currentVeh.odo}</span></div>
        </div>

        {/* ALERT BANNER — shown if any due task */}
        <div className="prevent-maintenance-alert-banner">
          <div className="prevent-maintenance-alert-header">
            <span className="prevent-maintenance-alert-icon">⚠️</span>
            <span className="prevent-maintenance-alert-title">1 Grease Task Due Within 3,000 KM — Auto Alert</span>
          </div>
          <div className="prevent-maintenance-alert-row">
            <div className="prevent-maintenance-alert-left">
              <div className="prevent-maintenance-alert-task">Chassis Nipple Points — Full Set</div>
              <div className="prevent-maintenance-alert-meta">
                Due at 77,000 km · <strong>2,125 km left</strong> · Interval: every 5,000 km
              </div>
            </div>
            <button className="prevent-maintenance-alert-btn">Log Done</button>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="prevent-maintenance-table-section">
          <div className="prevent-maintenance-table-scroll">
            <table className="prevent-maintenance-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Type</th>
                  <th>Interval</th>
                  <th>Last Done</th>
                  <th>Next Due KM</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {TASKS.map((t, i) => <TaskRow key={i} t={t} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="prevent-maintenance-card-list">
          {TASKS.map((t, i) => <TaskCard key={i} t={t} />)}
        </div>

      </div>
    </div>
  );
}