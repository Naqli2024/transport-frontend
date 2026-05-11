import React, { useState } from 'react'
import FleetContractWizard from './FleetContractWizard';

const FLEET_CONTRACTS_DATA_INIT = [
  {
    id: "FC-001", assetType: "truck", contractTypeId: "DEDICATED_FLEET",
    client: "Ramco Cement Ltd", clientPhone: "044-28510000",
    vehicles: ["TN69 GH4789", "TN59 AB1234"], drivers: ["Mani Kumar", "Selvam R"],
    routes: [{ from: "Chennai", to: "Coimbatore", km: 500 }, { from: "Chennai", to: "Madurai", km: 460 }],
    startDate: "2025-01-01", endDate: "2025-12-31",
    monthlyRetainer: 120000, ratePerKm: null, ratePerTrip: null,
    includedKm: 8000, extraKmRate: 22,
    includedTrips: null, extraTripRate: null,
    monthlyRate: null, annualRate: null,
    advanceCollected: 240000, totalBilled: 480000, totalTrips: 42,
    status: "ACTIVE", billingCycle: "MONTHLY", paymentTerms: "30 days net",
    notes: "2 dedicated trucks for cement distribution Tamil Nadu circuit",
  },
  {
    id: "FC-002", assetType: "truck", contractTypeId: "RATE_CONTRACT",
    client: "Blue Dart Express", clientPhone: "1800-111-345",
    vehicles: [], drivers: [],
    routes: [{ from: "Chennai", to: "Bangalore", km: 350 }, { from: "Chennai", to: "Hyderabad", km: 630 }],
    startDate: "2025-02-01", endDate: "2025-07-31",
    monthlyRetainer: null, ratePerKm: 45, ratePerTrip: null,
    includedKm: null, extraKmRate: null,
    includedTrips: null, extraTripRate: null,
    monthlyRate: null, annualRate: null,
    advanceCollected: 50000, totalBilled: 218000, totalTrips: 18,
    status: "ACTIVE", billingCycle: "WEEKLY", paymentTerms: "15 days",
    notes: "Express courier loads Chennai hub. Any available vehicle.",
  },
  {
    id: "FC-003", assetType: "truck", contractTypeId: "MONTHLY_RETAINER",
    client: "Ashok Leyland Spare Parts", clientPhone: "044-25361000",
    vehicles: ["TN45 CD5678"], drivers: ["Ramesh P"],
    routes: [{ from: "Chennai", to: "Pan Tamil Nadu", km: null }],
    startDate: "2025-03-01", endDate: "2025-08-31",
    monthlyRetainer: null, ratePerKm: null, ratePerTrip: null,
    includedKm: null, extraKmRate: null,
    includedTrips: 12, extraTripRate: 3500,
    monthlyRate: 38000, annualRate: null,
    advanceCollected: 76000, totalBilled: 152000, totalTrips: 28,
    status: "ACTIVE", billingCycle: "MONTHLY", paymentTerms: "30 days",
    notes: "Parts distribution across TN. 12 trips included, extra at ₹3,500/trip",
  },
  // ── EQUIPMENT CONTRACTS ──
  {
    id: "FC-004", assetType: "equipment", contractTypeId: "HYBRID",
    client: "NHAI Road Works", clientPhone: "011-23400100",
    vehicles: ["EQ-001"], drivers: ["Kannan S"],
    routes: [{ from: "Madurai", to: "Madurai Bypass NH7", km: 14 }],
    startDate: "2025-03-01", endDate: "2025-05-31",
    monthlyRetainer: null, ratePerKm: null, ratePerTrip: null,
    hourlyRate: 900, dailyRate: null, monthlyRate: null,
    minGuaranteeHours: 180, includedHours: 180, overtimeRate: 1200,
    shiftHours: 8, idleChargeable: false, fuelIncluded: false,
    advanceCollected: 100000, totalBilled: 287000, totalTrips: null,
    totalHoursRun: 310, status: "ACTIVE", billingCycle: "MONTHLY",
    paymentTerms: "30 days net",
    notes: "JCB 3DX for highway trench excavation. Min 180 hrs/month guarantee.",
  },
  {
    id: "FC-005", assetType: "equipment", contractTypeId: "MONTHLY",
    client: "L&T Construction", clientPhone: "044-71770770",
    vehicles: ["EQ-003"], drivers: ["Murugan V"],
    routes: [{ from: "Chennai", to: "Chennai Port Road", km: 8 }],
    startDate: "2025-02-15", endDate: "2025-06-15",
    monthlyRetainer: null, ratePerKm: null, ratePerTrip: null,
    hourlyRate: 700, dailyRate: null, monthlyRate: 140000,
    minGuaranteeHours: null, includedHours: 200, overtimeRate: 900,
    shiftHours: 8, idleChargeable: false, fuelIncluded: false,
    advanceCollected: 80000, totalBilled: 196000, totalTrips: null,
    totalHoursRun: 218, status: "ACTIVE", billingCycle: "MONTHLY",
    paymentTerms: "30 days",
    notes: "JCB Roller for road compaction. ₹1.4L/month includes 200 hrs.",
  },
  // ── BUS CONTRACTS ──
  {
    id: "FC-006", assetType: "bus", contractTypeId: "MONTHLY_CONTRACT",
    client: "Cognizant Technology Solutions", clientPhone: "044-42096000",
    vehicles: ["TN22 IJ7890"], drivers: ["Arjun D"],
    routes: [{ from: "Sholinganallur", to: "Siruseri IT Park", km: 18 }],
    startDate: "2025-01-01", endDate: "2025-12-31",
    monthlyRetainer: null, ratePerKm: null, ratePerTrip: null,
    monthlyRate: 52000, includedTrips: 46, extraTripRate: 1200,
    annualRate: null, routeKm: 18, minPax: null, perSeatRate: null,
    advanceCollected: 104000, totalBilled: 208000, totalTrips: 89,
    passengerCount: 32, status: "ACTIVE", billingCycle: "MONTHLY",
    paymentTerms: "30 days",
    notes: "Corporate shuttle. AM/PM shift. 46 trips/month included (Mon-Sat).",
  },
];

const CONTRACT_TYPE_DEFS = {
  truck: [
    { id: "DEDICATED_FLEET", label: "Dedicated Fleet", icon: "🚛", color: "#3B82F6", desc: "Specific vehicles + drivers exclusively assigned to one client. Monthly retainer + per-trip rate.", billingFields: ["monthlyRetainer", "ratePerKm", "includedKm", "extraKmRate"] },
    { id: "RATE_CONTRACT", label: "Rate Contract", icon: "📋", color: "#F59E0B", desc: "Agreed per-trip rates for specified routes. Pay per trip completed. Most common in India.", billingFields: ["ratePerTrip", "ratePerKm", "loadType", "routes"] },
    { id: "MONTHLY_RETAINER", label: "Monthly Retainer", icon: "📅", color: "#10B981", desc: "Fixed monthly payment regardless of trips. Client guarantees minimum business volume.", billingFields: ["monthlyRate", "includedTrips", "extraTripRate"] },
    { id: "SPOT_RATE", label: "Spot / Ad-hoc Rate", icon: "⚡", color: "#8B5CF6", desc: "One-off rate agreed per trip. No long-term commitment. Higher rate for flexibility.", billingFields: ["ratePerTrip"] },
  ],
  equipment: [
    { id: "HOURLY", label: "Hourly Rate", icon: "⏱️", color: "#3B82F6", desc: "Charge per running hour. Minimum hours per day applies. Best for short jobs.", billingFields: ["hourlyRate", "minHoursPerDay", "idleChargeable"] },
    { id: "DAILY", label: "Daily / Shift", icon: "📅", color: "#F59E0B", desc: "Fixed daily rate + overtime beyond shift hours. Site-based work.", billingFields: ["dailyRate", "shiftHours", "overtimeRate"] },
    { id: "MONTHLY", label: "Monthly Contract", icon: "📆", color: "#10B981", desc: "Fixed monthly rent includes X running hours. Extra hours charged separately.", billingFields: ["monthlyRate", "includedHours", "overtimeRate"] },
    { id: "HYBRID", label: "Hybrid (Best)", icon: "🔁", color: "#F97316", desc: "Min guarantee hours at hourly rate + overtime premium. Protects both parties.", billingFields: ["hourlyRate", "minGuarantee", "includedHours", "overtimeRate"] },
  ],
  bus: [
    { id: "MONTHLY_CONTRACT", label: "Monthly Contract", icon: "📅", color: "#10B981", desc: "Fixed monthly payment for staff/school transport. Fixed routes, fixed schedule.", billingFields: ["monthlyRate", "includedTrips", "routeKm"] },
    { id: "PER_TRIP", label: "Per Trip Rate", icon: "🎫", color: "#3B82F6", desc: "Charge per completed trip. Suitable for one-time and regular contract carriage.", billingFields: ["ratePerTrip", "perSeatRate", "minPax"] },
    { id: "ANNUAL_CONTRACT", label: "Annual Contract", icon: "📆", color: "#8B5CF6", desc: "Annual agreement with fixed payment. Schools, corporates. Best rate for client.", billingFields: ["annualRate", "monthlyBreakdown", "includedTrips"] },
    { id: "SPOT_BOOKING", label: "Spot Booking", icon: "⚡", color: "#F59E0B", desc: "One-off trip rate. Tourist, event, emergency transport. Premium pricing.", billingFields: ["ratePerTrip", "perKmRate"] },
  ],
};

const FleetContracts = () => {
  const [contracts, setContracts] = useState(FLEET_CONTRACTS_DATA_INIT);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardAsset, setWizardAsset] = useState("truck");
  const [selContract, setSelContract] = useState(null);
  const [filterAsset, setFilterAsset] = useState("all");
  const [filterStatus, setFilterStatus] = useState("ACTIVE");
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  function monthlyRevProj(contract) {
    if (contract.assetType === "truck") {
      if (contract.contractTypeId === "DEDICATED_FLEET") return contract.monthlyRetainer || 0;
      if (contract.contractTypeId === "MONTHLY_RETAINER") return contract.monthlyRate || 0;
      if (contract.contractTypeId === "RATE_CONTRACT") return (contract.ratePerKm || 0) * (contract.includedKm || 5000);
      return 0;
    }
    if (contract.assetType === "equipment") {
      if (contract.contractTypeId === "MONTHLY") return contract.monthlyRate || 0;
      if (contract.contractTypeId === "HYBRID" || contract.contractTypeId === "HOURLY") return (contract.hourlyRate || 0) * (contract.minGuaranteeHours || contract.includedHours || 180);
      if (contract.contractTypeId === "DAILY") return (contract.dailyRate || 0) * 26;
      return 0;
    }
    if (contract.assetType === "bus") {
      if (contract.contractTypeId === "MONTHLY_CONTRACT") return contract.monthlyRate || 0;
      if (contract.contractTypeId === "PER_TRIP") return (contract.ratePerTrip || 0) * (contract.includedTrips || 20);
      if (contract.contractTypeId === "ANNUAL_CONTRACT") return Math.round((contract.annualRate || 0) / 12);
      return 0;
    }
    return 0;
  }

  const assetIcon = { truck: "🚛", equipment: "🏗️", bus: "🚌" };

  const filtered = contracts.filter(c => (filterAsset === "all" || c.assetType === filterAsset) && (filterStatus === "all" || c.status === filterStatus));
  const totalMthRevenue = contracts.filter(c => c.status === "ACTIVE").reduce((s, c) => s + monthlyRevProj(c), 0);

  return (
    <div>
      <div className="fleet-contracts-header">
        <div>
          <h1 className="heading">Fleet Contracts</h1>
          <p className="sub-heading">Unified contract engine · Truck / Equipment / Bus · Pre-fills trip sheets automatically</p>
        </div>
        <div className="fleet-contracts-actions">
          <button
            className="fleet-contracts-btn-blue"
            onClick={() => {
              setWizardAsset("truck");
              setShowWizard(true);
            }}
          >
            🚛 New Truck Contract
          </button>

          <button
            className="fleet-contracts-btn-orange"
            onClick={() => {
              setWizardAsset("equipment");
              setShowWizard(true);
            }}
          >
            🏗️ New Equipment Contract
          </button>
          <button
            className="fleet-contracts-btn-green"
            onClick={() => {
              setWizardAsset("bus");
              setShowWizard(true);
            }}
          >
            🚌 New Bus Contract
          </button>
        </div>
      </div>
      <div className="fleet-contracts-kpi-row">
        <div className="fleet-contracts-stat fleet-contracts-stat-blue">
          <div className="fleet-contracts-stat-v">6</div>
          <div className="fleet-contracts-stat-l">Total Contracts</div>
        </div>

        <div className="fleet-contracts-stat fleet-contracts-stat-green">
          <div className="fleet-contracts-stat-v">
            5
          </div>
          <div className="fleet-contracts-stat-l">Active</div>
        </div>

        <div className="fleet-contracts-stat fleet-contracts-stat-blue">
          <div className="fleet-contracts-stat-v">
            3
          </div>
          <div className="fleet-contracts-stat-l">Truck Contracts</div>
        </div>

        <div className="fleet-contracts-stat fleet-contracts-stat-orange">
          <div className="fleet-contracts-stat-v">
            1
          </div>
          <div className="fleet-contracts-stat-l">Equip Contracts</div>
        </div>

        <div className="fleet-contracts-stat fleet-contracts-stat-green">
          <div className="fleet-contracts-stat-v">
            1
          </div>
          <div className="fleet-contracts-stat-l">Bus Contracts</div>
        </div>

        <div className="fleet-contracts-stat fleet-contracts-stat-accent">
          <div className="fleet-contracts-stat-v">
            ₹ 7000
          </div>
          <div className="fleet-contracts-stat-l">MTD Revenue</div>
        </div>
      </div>

      <div className="fleet-contracts-filter-bar">

        <div className="fleet-contracts-tabs-underline">
          {["all", "truck", "equipment", "bus"].map((t) => (
            <div
              key={t}
              className={`fleet-contracts-tab-underline ${filterAsset === t ? "active" : ""
                }`}
              onClick={() => setFilterAsset(t)}
            >
              {t === "all"
                ? "All Assets"
                : `${assetIcon[t]} ${t.charAt(0).toUpperCase() + t.slice(1)}`}
            </div>
          ))}
        </div>

        <div className="fleet-contracts-toggle">
          {["all", "ACTIVE", "COMPLETED"].map((s) => (
            <div
              key={s}
              className={`fleet-contracts-toggle-opt ${filterStatus === s ? "on" : ""
                }`}
              onClick={() => setFilterStatus(s)}
            >
              {s === "all" ? "All" : s === "ACTIVE" ? "Active" : "Completed"}
            </div>
          ))}
        </div>
      </div>

      <div className="fleet-contracts-list">
        {filtered.map((c) => {
          const ctDef = CONTRACT_TYPE_DEFS[c.assetType]?.find(
            (x) => x.id === c.contractTypeId
          );
          const mthRev = monthlyRevProj(c);

          return (
            <div
              key={c.id}
              className={`fleet-contracts-card fleet-contracts-${c.assetType}`}
              onClick={() => setSelContract(c)}
            >
              <div className="fleet-contracts-card-top">
                <div className="fleet-contracts-card-left">
                  <div className="fleet-contracts-icon">
                    {assetIcon[c.assetType]}
                  </div>

                  <div>
                    <div className="fleet-contracts-title-row">
                      <span className="fleet-contracts-id">{c.id}</span>

                      <span className="fleet-contracts-badge type">
                        {ctDef?.label || c.contractTypeId}
                      </span>

                      <span
                        className={`fleet-contracts-badge status ${c.status === "ACTIVE" ? "active" : "completed"
                          }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="fleet-contracts-client">{c.client}</div>

                    <div className="fleet-contracts-meta">
                      {c.startDate} → {c.endDate} · {c.billingCycle} billing ·{" "}
                      {c.paymentTerms}
                    </div>
                  </div>
                </div>

                <div className="fleet-contracts-revenue-box">
                  <div className="fleet-contracts-revenue">
                    {fmt(mthRev)}
                    <span>/mo</span>
                  </div>
                  <div>Billed: {fmt(c.totalBilled)}</div>
                  <div>Adv: {fmt(c.advanceCollected)}</div>
                </div>
              </div>

              <div className="fleet-contracts-tags">
                {c.monthlyRetainer && (
                  <span>₹{(c.monthlyRetainer / 1000).toFixed(0)}k/mo</span>
                )}
                {c.hourlyRate && <span>₹{c.hourlyRate}/hr</span>}
                {c.dailyRate && <span>₹{c.dailyRate}/day</span>}
                {c.monthlyRate && (
                  <span>₹{(c.monthlyRate / 1000).toFixed(0)}k/mo</span>
                )}
                {c.ratePerKm && <span>₹{c.ratePerKm}/km</span>}
                {c.includedKm && <span>{c.includedKm} km incl.</span>}
                {c.includedTrips && <span>{c.includedTrips} trips incl.</span>}
              </div>

              <div className="fleet-contracts-users">
                {(c.vehicles || []).map((v) => (
                  <span key={v} className="vehicle">🚛 {v}</span>
                ))}
                {(c.drivers || []).map((d) => (
                  <span key={d} className="driver">👤 {d}</span>
                ))}
              </div>

              {c.totalBilled > 0 && (
                <div className="fleet-contracts-progress">
                  <div className="fleet-contracts-progress-top">
                    <span>Revenue Collected: {fmt(c.totalBilled)}</span>
                    <span>
                      {c.totalTrips
                        ? `${c.totalTrips} trips`
                        : c.totalHoursRun
                          ? `${c.totalHoursRun} hrs`
                          : ""}
                    </span>
                  </div>
                  <div className="fleet-contracts-bar">
                    <div
                      className="fleet-contracts-bar-fill"
                      style={{
                        width: `${Math.min(
                          (c.totalBilled / Math.max(mthRev * 6, 1)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                className="fleet-contracts-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="fleet-contracts-btn primary">
                  🚀 Create Trip from Contract
                </button>
                <button className="fleet-contracts-btn secondary">
                  📄 Invoice
                </button>
                <button className="fleet-contracts-btn ghost">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
      {showWizard && <FleetContractWizard initialAssetType={wizardAsset} onClose={() => setShowWizard(false)} onSave={c => setContracts(cs => [...cs, c])} />}
    </div>
  );
};

export default FleetContracts