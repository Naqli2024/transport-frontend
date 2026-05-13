import { useState } from "react";


/* ═══════════ DATA ═══════════ */
const PARTS = [
  {
    id: "SP-001", name: "Engine Oil 20W-50 (5L)",
    category: "Engine",    catCls: "cat-engine",
    qty: "24 Can",  qtyLow: false,
    unit: "₹1,200", value: "₹28,800", status: "OK",  stCls: "st-ok",  stripeCls: "stripe-ok",
  },
  {
    id: "SP-002", name: "Brake Pads (Axle Set)",
    category: "Brake System", catCls: "cat-brake",
    qty: "4 Set",   qtyLow: false,
    unit: "₹6,500", value: "₹26,000", status: "OK",  stCls: "st-ok",  stripeCls: "stripe-ok",
  },
  {
    id: "SP-003", name: "Alternator",
    category: "Electrical",  catCls: "cat-electrical",
    qty: "1 Pcs",   qtyLow: true,
    unit: "₹8,500", value: "₹8,500",  status: "Low", stCls: "st-low", stripeCls: "stripe-low",
  },
  {
    id: "SP-004", name: "Clutch Plate Kit",
    category: "Gearbox",     catCls: "cat-gearbox",
    qty: "3 Set",   qtyLow: false,
    unit: "₹12,000",value: "₹36,000", status: "OK",  stCls: "st-ok",  stripeCls: "stripe-ok",
  },
  {
    id: "SP-005", name: "Air Filter",
    category: "Engine",      catCls: "cat-engine",
    qty: "2 Pcs",   qtyLow: true,
    unit: "₹850",   value: "₹1,700",  status: "Low", stCls: "st-low", stripeCls: "stripe-low",
  },
];

const LOW_STOCK = [
  { name: "Alternator", meta: "Only 1 Pcs left · Reorder at 1" },
  { name: "Air Filter",  meta: "Only 2 Pcs left · Reorder at 3" },
];

/* ═══════════ TABLE ROW ═══════════ */
function PartRow({ p }) {
  return (
    <tr className={p.qtyLow ? "row-low" : ""}>
      <td><span className="td-id">{p.id}</span></td>
      <td><span className="td-name">{p.name}</span></td>
      <td><span className={`sp-cat ${p.catCls}`}>{p.category}</span></td>
      <td><span className={`td-qty ${p.qtyLow ? "qty-low" : ""}`}>{p.qty}</span></td>
      <td><span className="td-unit">{p.unit}</span></td>
      <td><span className="td-val">{p.value}</span></td>
      <td><span className={`sp-status ${p.stCls}`}>{p.status}</span></td>
    </tr>
  );
}

/* ═══════════ MOBILE CARD ═══════════ */
function PartCard({ p }) {
  return (
    <div className={`sp-part-card ${p.stripeCls} ${p.qtyLow ? "row-low" : ""}`}>
      <div className="sp-pc-head">
        <div>
          <div className="sp-pc-id-block">
            <span className="sp-pc-id">{p.id}</span>
            <span className={`sp-cat ${p.catCls}`}>{p.category}</span>
          </div>
          <div className="sp-pc-name">{p.name}</div>
        </div>
        <span className={`sp-status ${p.stCls}`}>{p.status}</span>
      </div>
      <div className="sp-pc-rows">
        <div className="sp-pc-row">
          <span className="sp-pc-label">Qty</span>
          <span className={`sp-pc-val ${p.qtyLow ? "val-red" : "val-green"}`}>{p.qty}</span>
        </div>
        <div className="sp-pc-row">
          <span className="sp-pc-label">Unit Cost</span>
          <span className="sp-pc-val">{p.unit}</span>
        </div>
        <div className="sp-pc-row">
          <span className="sp-pc-label">Stock Value</span>
          <span className="sp-pc-val val-cyan">{p.value}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function SpareParts() {
  const [theme, setTheme] = useState("dark");

  return (
    <div data-theme={theme}>

      {/* TOPBAR */}
      <div className="sp-topbar">
        <div className="sp-topbar-left">
          <h1>Spare Parts</h1>
          <div className="sp-topbar-sub">Stock, reorder alerts, issue against work orders</div>
        </div>
        <div className="sp-topbar-right">
          <button className="sp-btn-add">+ Add Parts</button>
        </div>
      </div>

      <div className="sp-main">

        {/* ALERT BANNER */}
        <div className="sp-alert">
          <div className="sp-alert-header">
            <div className="sp-alert-dot" />
            <span className="sp-alert-title">Low Stock — {LOW_STOCK.length} Items Below Reorder Level</span>
          </div>
          <div className="sp-alert-rows">
            {LOW_STOCK.map(s => (
              <div key={s.name} className="sp-alert-row">
                <div className="sp-alert-left">
                  <div className="sp-alert-part-name">{s.name}</div>
                  <div className="sp-alert-part-meta">{s.meta}</div>
                </div>
                <button className="sp-reorder-btn">Reorder</button>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="sp-table-section">
          <div className="sp-table-scroll">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>QTY</th>
                  <th>Unit Cost</th>
                  <th>Stock Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PARTS.map(p => <PartRow key={p.id} p={p} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="sp-card-list">
          {PARTS.map(p => <PartCard key={p.id} p={p} />)}
        </div>

      </div>
    </div>
  );
}