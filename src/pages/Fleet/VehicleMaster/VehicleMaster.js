import { useState } from "react";
import AddVehicleModal from "./AddVehicleModal";
import VehicleEditModal from "./EditModal";

const STATS = [
  { val: "6", label: "Total Fleet", cls: "sc-blue" },
  { val: "4", label: "Active", cls: "sc-green" },
  { val: "1", label: "On Trip", cls: "sc-amber" },
  { val: "1", label: "Maintenance", cls: "sc-orange" },
  { val: "4", label: "Compliance Issues", cls: "sc-red" },
];

const ALERTS = [
  {
    reg: "TN59 AB1234",
    doc: "Insurance",
    statusText: "Expiring in 7d",
    statusCls: "status-expiring",
    cardCls: "alert-amber",
  },
  {
    reg: "TN45 CD5678",
    doc: "FC Certificate",
    statusText: "EXPIRED",
    statusCls: "status-expired",
    cardCls: "alert-red",
  },
  {
    reg: "TN69 GH4789",
    doc: "Road Tax",
    statusText: "Due in 12d",
    statusCls: "status-due",
    cardCls: "alert-orange",
  },
];

const TABS = ["All", "Active", "On Trip", "Maintenance"];

const VEHICLES = [
  {
    reg: "TN69 GH4789",
    icon: "🚛",
    type: "Tripper",
    config: "Tripper · 16 Wheelers",
    make: "Tata 2017",
    km: "74,875",
    health: 87,
    healthCls: "fill-green",
    pctCls: "pct-green",
    insurance: { text: "Valid", cls: "pill-valid" },
    fc: { text: "Valid", cls: "pill-valid" },
    tax: { text: "Due in 12d", cls: "pill-due" },
    status: { text: "Active", cls: "st-active" },
    tab: "Active",
  },
  {
    reg: "TN59 AB1234",
    icon: "🚚",
    type: "Open Body",
    config: "Open Body · 14 Wheelers",
    make: "Ashok Leyland 2019",
    km: "92,348",
    health: 73,
    healthCls: "fill-amber",
    pctCls: "pct-amber",
    insurance: { text: "Expiring 7d", cls: "pill-expiring" },
    fc: { text: "Valid", cls: "pill-valid" },
    tax: { text: "Paid", cls: "pill-paid" },
    status: { text: "Active", cls: "st-active" },
    tab: "Active",
  },
  {
    reg: "TN45 CD5678",
    icon: "🚜",
    type: "Trailer",
    config: "Trailer · 3 Axle",
    make: "Tata Prima 2016",
    km: "1,24,080",
    health: 45,
    healthCls: "fill-red",
    pctCls: "pct-red",
    insurance: { text: "Valid", cls: "pill-valid" },
    fc: { text: "Expired", cls: "pill-expired" },
    tax: { text: "Paid", cls: "pill-paid" },
    status: { text: "Maintenance", cls: "st-maintenance" },
    tab: "Maintenance",
  },
  {
    reg: "TN38 EF9812",
    icon: "🛻",
    type: "Flatbed",
    config: "Flatbed · 12 Wheelers",
    make: "BharatBenz 2020",
    km: "54,228",
    health: 91,
    healthCls: "fill-green",
    pctCls: "pct-green",
    insurance: { text: "Valid", cls: "pill-valid" },
    fc: { text: "Valid", cls: "pill-valid" },
    tax: { text: "Paid", cls: "pill-paid" },
    status: { text: "Active", cls: "st-active" },
    tab: "Active",
  },
  {
    reg: "TN71 GH3456",
    icon: "📦",
    type: "Container",
    config: "Container · 14 Wheeler",
    make: "VECV 2018",
    km: "88,918",
    health: 68,
    healthCls: "fill-amber",
    pctCls: "pct-amber",
    insurance: { text: "Valid", cls: "pill-valid" },
    fc: { text: "Valid", cls: "pill-valid" },
    tax: { text: "Due in 45d", cls: "pill-due" },
    status: { text: "On Trip", cls: "st-ontrip" },
    tab: "On Trip",
  },
  {
    reg: "TN22 IJ7890",
    icon: "🚐",
    type: "LCV",
    config: "LCV / SCV · 4 Wheeler",
    make: "Tata 2021",
    km: "31,448",
    health: 82,
    healthCls: "fill-green",
    pctCls: "pct-green",
    insurance: { text: "Valid", cls: "pill-valid" },
    fc: { text: "Valid", cls: "pill-valid" },
    tax: { text: "Paid", cls: "pill-paid" },
    status: { text: "Active", cls: "st-active" },
    tab: "Active",
  },
];

function HealthBar({ pct, fillCls, pctCls }) {
  return (
    <div className="vm-health-cell">
      <div className="vm-health-bar">
        <div
          className={`vm-health-fill ${fillCls}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`vm-health-pct ${pctCls}`}>{pct}%</span>
    </div>
  );
}

function VehicleRow({  v, onView }) {
    const [openEditVehicleModal, setOpenEditVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  return (
    <tr>
      <td>
        <span className="vm-reg">{v.reg}</span>
      </td>
      <td>
        <span className="vm-type-icon">{v.icon}</span>
      </td>
      <td>
        <span className="vm-config">{v.config}</span>
      </td>
      <td>
        <span className="vm-make">{v.make}</span>
      </td>
      <td>
        <span className="vm-km">{v.km}</span>
      </td>
      <td>
        <HealthBar pct={v.health} fillCls={v.healthCls} pctCls={v.pctCls} />
      </td>
      <td>
        <span className={`vm-pill ${v.insurance.cls}`}>{v.insurance.text}</span>
      </td>
      <td>
        <span className={`vm-pill ${v.fc.cls}`}>{v.fc.text}</span>
      </td>
      <td>
        <span className={`vm-pill ${v.tax.cls}`}>{v.tax.text}</span>
      </td>
      <td>
        <span className={`vm-status ${v.status.cls}`}>{v.status.text}</span>
      </td>
      <td>
      <button
  className="vm-btn-view"
  onClick={() => onView(v)}
>
  View →
</button>
      </td>
    </tr>
  );
}

function VehicleCard({ v }) {
  return (
    <div className="vm-vehicle-card">
      <div className="vm-vc-head">
        <div className="vm-vc-left">
          <span className="vm-vc-icon">{v.icon}</span>
          <div>
            <div className="vm-vc-reg">{v.reg}</div>
            <div className="vm-vc-sub">
              {v.config} · {v.make}
            </div>
          </div>
        </div>
        <span className={`vm-status ${v.status.cls}`}>{v.status.text}</span>
      </div>
      <HealthBar pct={v.health} fillCls={v.healthCls} pctCls={v.pctCls} />
      <div className="vm-vc-pills">
        {[
          { label: "Insurance", ...v.insurance },
          { label: "FC", ...v.fc },
          { label: "Tax", ...v.tax },
        ].map((p) => (
          <div key={p.label} className="vm-vc-pill-group">
            <div className="vm-vc-pill-label">{p.label}</div>
            <span className={`vm-pill ${p.cls}`}>{p.text}</span>
          </div>
        ))}
      </div>
      <div className="vm-vc-footer">
        <span className="vm-vc-km">🛣 {v.km} km</span>
        <button className="vm-btn-view">View →</button>
      </div>
    </div>
  );
}

export default function VehicleMaster( ) {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setTab] = useState("All");
  const [openAddVehicleModal, setOpenAddVehiclemodal] = useState(false);
  const [openEditVehicleModal, setOpenEditVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filtered =
    activeTab === "All"
      ? VEHICLES
      : VEHICLES.filter((v) => v.tab === activeTab);

  return (
    <div>
      <div data-theme={theme}>
      <div className="vm-topbar">
        <div className="vm-topbar-left">
          <h1>Vehicle Master &amp; Compliance</h1>
          <div className="vm-topbar-sub">
            Every lorry as a profit asset — smart onboarding · lifecycle ·
            compliance · P&amp;L
          </div>
        </div>
        <div className="vm-topbar-right">
          <button className="vm-btn-add" 
         onClick={() => setOpenAddVehiclemodal(true)}>+ Add Vehicle</button>
        </div>
      </div>
      <div className="vm-main">
        <div className="vm-stat-row">
          {STATS.map((s) => (
            <div key={s.label} className={`vm-stat-card ${s.cls}`}>
              <div className="vm-stat-val">{s.val}</div>
              <div className="vm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="vm-alert-banner">
          <div className="vm-alert-header">
            <span className="vm-alert-icon">⚠️</span>
            <span className="vm-alert-title">
              Compliance Alerts — 4 Vehicles Need Attention
            </span>
          </div>
          <div className="vm-alert-cards">
            {ALERTS.map((a) => (
              <div key={a.reg} className={`vm-alert-card ${a.cardCls}`}>
                <div className="vm-alert-reg">{a.reg}</div>
                <div className="vm-alert-doc">{a.doc}</div>
                <div className={`vm-alert-status ${a.statusCls}`}>
                  {a.statusText}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="vm-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`vm-tab-btn ${activeTab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="vm-table-wrap">
          <table className="vm-table">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Type</th>
                <th>Config</th>
                <th>Make / Year</th>
                <th>KM</th>
                <th>Health</th>
                <th>Insurance</th>
                <th>FC</th>
                <th>Tax</th>
                <th>Status</th>
              </tr>
            </thead>
           <tbody>
  {filtered.map((v) => (
    <VehicleRow
      key={v.reg}
      v={v}
      onView={(vehicle) => {
        setSelectedVehicle(vehicle);
        setOpenEditVehicleModal(true);
      }}
    />
  ))}
</tbody>
          </table>
        </div>
        <div className="vm-card-list">
         {filtered.map((v) => (
  <VehicleRow
    key={v.reg}
    v={v}
    onView={(vehicle) => {
      setSelectedVehicle(vehicle);
      setOpenEditVehicleModal(true);
    }}
  />
))}
        </div>
      </div>
    </div>
   {/* ADD MODAL */}
{openAddVehicleModal && (
  <AddVehicleModal
    open={openAddVehicleModal}
    handleClose={() => setOpenAddVehiclemodal(false)}
  />
)}

{/* EDIT MODAL */}
{openEditVehicleModal && (
 <VehicleEditModal
  open={openEditVehicleModal}
  vehicle={selectedVehicle}
  onClose={() => setOpenEditVehicleModal(false)}
/>
)}
    </div>
    
  );
}
