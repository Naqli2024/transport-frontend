import { useState } from "react";


/* ═══════════ DATA ═══════════ */
const STATS = [
  { val: "473L",     label: "TOTAL LITRES", cls: "sc-blue"   },
  { val: "₹47,300",  label: "TOTAL COST",   cls: "sc-accent" },
  { val: "1",        label: "SUSPICIOUS",   cls: "sc-red"    },
  { val: "₹100.0",   label: "AVG ₹/L",      cls: "sc-orange" },
];

const SUSPICIOUS = [
  {
    id: "FL-003",
    meta: "TN38 EF9012 · Arjun D · 148L @ HPCL Salem",
  },
];

const LOGS = [
  { id: "FL-001", vehicle: "TN69 GH4789", driver: "Mani Kumar",  date: "2025-04-10", litres: "120L",  amount: "₹12,000", pump: "IOCL Coimbatore", status: "OK"         },
  { id: "FL-002", vehicle: "TN59 AB1234", driver: "Selvam R",    date: "2025-04-11", litres: "95L",   amount: "₹9,500",  pump: "BPCL Chennai",   status: "OK"         },
  { id: "FL-003", vehicle: "TN38 EF9012", driver: "Arjun D",     date: "2025-04-12", litres: "148L",  amount: "₹14,800", pump: "HPCL Salem",     status: "Suspicious" },
  { id: "FL-004", vehicle: "TN32 XY7821", driver: "External",    date: "2025-04-13", litres: "110L",  amount: "₹11,000", pump: "IOCL Trichy",    status: "OK"         },
];

/* ═══════════ STATUS PILL ═══════════ */
function Pill({ status }) {
  const ok = status === "OK";
  return (
    <span className={`fc-pill ${ok ? "pill-ok" : "pill-susp"}`}>
      {!ok && "⚠ "}
      {status}
    </span>
  );
}

/* ═══════════ TABLE ROW ═══════════ */
function TableRow({ log }) {
  const susp = log.status === "Suspicious";
  return (
    <tr className={susp ? "row-susp" : ""}>
      <td><span className={`td-id${susp ? " id-susp" : ""}`}>{log.id}</span></td>
      <td><span className="td-vehicle">{log.vehicle}</span></td>
      <td><span className="td-driver">{log.driver}</span></td>
      <td><span className="td-date">{log.date}</span></td>
      <td><span className="td-litres">{log.litres}</span></td>
      <td><span className="td-amount">{log.amount}</span></td>
      <td><span className="td-pump">{log.pump}</span></td>
      <td><Pill status={log.status} /></td>
    </tr>
  );
}

/* ═══════════ MOBILE CARD ═══════════ */
function LogCard({ log }) {
  const susp = log.status === "Suspicious";
  return (
    <div className={`fc-log-card${susp ? " card-susp" : ""}`}>
      <div className="fc-lc-head">
        <div className="fc-lc-id-block">
          <span className={`fc-lc-id${susp ? " id-susp" : ""}`}>{log.id}</span>
          <span className="fc-lc-vehicle">{log.vehicle}</span>
        </div>
        <Pill status={log.status} />
      </div>
      <div className="fc-lc-rows">
        <div className="fc-lc-row"><span className="fc-lc-label">Driver</span><span className="fc-lc-val">{log.driver}</span></div>
        <div className="fc-lc-row"><span className="fc-lc-label">Date</span><span className="fc-lc-val">{log.date}</span></div>
        <div className="fc-lc-row"><span className="fc-lc-label">Litres</span><span className="fc-lc-val">{log.litres}</span></div>
        <div className="fc-lc-row"><span className="fc-lc-label">Amount</span><span className="fc-lc-val val-green">{log.amount}</span></div>
        <div className="fc-lc-row"><span className="fc-lc-label">Pump</span><span className="fc-lc-val">{log.pump}</span></div>
      </div>
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function FuelControl() {
  const [theme, setTheme] = useState("dark");

  return (
    <div data-theme={theme}>

      {/* TOPBAR */}
      <div className="fc-topbar">
        <div className="fc-topbar-left">
          <h1>Fuel Control</h1>
          <div className="fc-topbar-sub">Consumption tracking · Theft detection · Cost analysis</div>
        </div>
       
      </div>

      <div className="fc-main">

        {/* STATS */}
        <div className="fc-stat-row">
          {STATS.map(s => (
            <div key={s.label} className={`fc-stat-card ${s.cls}`}>
              <div className="fc-stat-val">{s.val}</div>
              <div className="fc-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* SUSPICIOUS BANNER */}
        {SUSPICIOUS.length > 0 && (
          <div className="fc-suspicious">
            <div className="fc-susp-header">
              <span className="fc-susp-icon">⚠️</span>
              <span className="fc-susp-title">Suspicious Fills ({SUSPICIOUS.length})</span>
            </div>
            <div className="fc-susp-list">
              {SUSPICIOUS.map(s => (
                <div key={s.id} className="fc-susp-row">
                  <div className="fc-susp-left">
                    <span className="fc-susp-id">{s.id}</span>
                    <span className="fc-susp-meta">{s.meta}</span>
                  </div>
                  <span className="fc-review-badge">⚠ Review Required</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="fc-table-section">
          <div className="fc-table-scroll">
            <table className="fc-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Date</th>
                  <th>Litres</th>
                  <th>Amount</th>
                  <th>Pump</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {LOGS.map(log => <TableRow key={log.id} log={log} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="fc-card-list">
          {LOGS.map(log => <LogCard key={log.id} log={log} />)}
        </div>

      </div>
    </div>
  );
}