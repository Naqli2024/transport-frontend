import React, { useState } from "react";

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

const EQUIPMENT_DATA = [
  { id: "EQ-001", regNo: "TN69 JCB001", type: "backhoe", model: "JCB 3DX", make: "JCB", year: 2021, serialNo: "JCB3DX2021TN001", purchaseCost: 2800000, ownership: "Owned", status: "On Site", site: "Madurai Bypass NH7", operator: "Kannan S", engineHours: 4286, lastServiceHours: 4000, nextServiceHours: 4250, fuelPerHour: 5, hourlyRate: 900, dailyMin: 8, monthlyHours: 180, odomKm: null, deployed: true, transportCost: 25000 },
  { id: "EQ-002", regNo: "TN45 EXC01", type: "excavator", model: "JCB NXT 215", make: "JCB", year: 2022, serialNo: "JCBNXT2022001", purchaseCost: 5200000, ownership: "Owned", status: "Available", site: null, operator: null, engineHours: 2841, lastServiceHours: 2500, nextServiceHours: 3000, fuelPerHour: 15, hourlyRate: 1400, dailyMin: 7, monthlyHours: 150, odomKm: null, deployed: false, transportCost: 45000 },
  { id: "EQ-003", regNo: "TN22 RLL01", type: "roller", model: "JCB VM115", make: "JCB", year: 2020, serialNo: "JCBVM1152020001", purchaseCost: 1600000, ownership: "Owned", status: "On Site", site: "Chennai Port Road", operator: "Murugan V", engineHours: 6120, lastServiceHours: 6000, nextServiceHours: 6300, fuelPerHour: 8, hourlyRate: 700, dailyMin: 8, monthlyHours: 200, odomKm: null, deployed: true, transportCost: 18000 },
  { id: "EQ-004", regNo: "TN38 CRN01", type: "crane", model: "SANY STC500T", make: "SANY", year: 2023, serialNo: "SANY500T2023001", purchaseCost: 12000000, ownership: "Financed", status: "On Site", site: "Trichy Industrial Park", operator: "Raj Kumar", engineHours: 1204, lastServiceHours: 1000, nextServiceHours: 1400, fuelPerHour: 22, hourlyRate: 3500, dailyMin: 6, monthlyHours: 120, odomKm: null, deployed: true, transportCost: 85000 },
  { id: "EQ-005", regNo: "TN71 MXC01", type: "miniexcav", model: "JCB 30Plus", make: "JCB", year: 2023, serialNo: "JCB30P2023001", purchaseCost: 1400000, ownership: "Owned", status: "Maintenance", site: null, operator: null, engineHours: 890, lastServiceHours: 750, nextServiceHours: 1000, fuelPerHour: 4, hourlyRate: 600, dailyMin: 7, monthlyHours: 160, odomKm: null, deployed: false, transportCost: 15000 },
  { id: "EQ-006", regNo: "TN59 GRD01", type: "grader", model: "JCB 140G", make: "JCB", year: 2021, serialNo: "JCB140G2021001", purchaseCost: 5800000, ownership: "Owned", status: "Available", site: null, operator: null, engineHours: 3340, lastServiceHours: 3000, nextServiceHours: 3500, fuelPerHour: 18, hourlyRate: 1600, dailyMin: 8, monthlyHours: 160, odomKm: null, deployed: false, transportCost: 55000 },
]

const BUS_MASTER_DATA = [
  { id: "BS-001", regNo: "TN22 IJ7890", type: "CORPORATE_SHUTTLE", make: "Tata", model: "Starbus Ultra 40", seatingCapacity: 40, standingCapacity: 0, year: 2022, acType: "AC", fuelType: "Diesel", color: "White/Blue", insuranceExpiry: "2026-01-15", fcExpiry: "2026-03-20", permitType: "Contract Carriage", permitExpiry: "2026-11-30", mvTaxDue: "2025-07-01", pucExpiry: "2025-08-10", fitnessScore: 88, status: "Active", assignedRoute: "Sholinganallur–Siruseri", client: "Cognizant Technology" },
  { id: "BS-002", regNo: "TN45 KL4321", type: "SCHOOL_BUS", make: "Ashok", model: "Leyland LYNX 32", seatingCapacity: 32, standingCapacity: 0, year: 2020, acType: "Non-AC", fuelType: "Diesel", color: "Yellow", insuranceExpiry: "2025-09-30", fcExpiry: "2025-12-15", permitType: "School Bus Permit", permitExpiry: "2025-12-31", mvTaxDue: "2025-10-01", pucExpiry: "2025-06-30", fitnessScore: 72, status: "Active", assignedRoute: "Koramangala–CBSE School", client: "Greenfield School" },
  { id: "BS-003", regNo: "TN69 MN8765", type: "TOURISM_CHARTER", make: "Volvo", model: "9400 Club Class", seatingCapacity: 45, standingCapacity: 0, year: 2023, acType: "AC", fuelType: "Diesel", color: "White/Red", insuranceExpiry: "2026-06-20", fcExpiry: "2026-08-10", permitType: "Tourist Vehicle Permit", permitExpiry: "2027-03-15", mvTaxDue: "2026-01-01", pucExpiry: "2025-11-20", fitnessScore: 95, status: "Available", assignedRoute: null, client: null },
  { id: "BS-004", regNo: "TN38 PQ2345", type: "LOCAL_STAGE", make: "Tata", model: "Starbus 4x2", seatingCapacity: 52, standingCapacity: 20, year: 2019, acType: "Non-AC", fuelType: "Diesel", color: "Red/Cream", insuranceExpiry: "2025-05-15", fcExpiry: "2025-04-30", permitType: "Stage Carriage Permit", permitExpiry: "2025-07-31", mvTaxDue: "2025-04-01", pucExpiry: "2025-04-25", fitnessScore: 61, status: "Overdue Compliance", assignedRoute: "Route 47C Tambaram–Velachery", client: "CMTU Contract" },
];

const FLEET_DATA = [
  { id: "VH-001", num: "TN69 GH4789", typeId: "tripper", subtypeId: "tripper_live", wheels: "16 Wheelers", model: "Tata LPT 2518", make: "Tata", year: 2017, status: "Active", health: 87, ownership: "Owned", purchaseCost: 2800000, purchaseDate: "2017-04-10", insurance: "Valid", fc: "Valid", tax: "Due in 12d", km: 74875, revenue: 4820000, cost: 3640000, fuel: "5.2 km/l", speed: "60 kmph" },
  { id: "VH-002", num: "TN59 AB1234", typeId: "openbody", subtypeId: "openbody_std", wheels: "14 Wheelers", model: "Ashok Leyland 2518", make: "Ashok Leyland", year: 2019, status: "Active", health: 73, ownership: "Owned", purchaseCost: 2600000, purchaseDate: "2019-08-15", insurance: "Expiring in 7d", fc: "Valid", tax: "Paid", km: 92340, revenue: 3950000, cost: 3120000, fuel: "4.8 km/l", speed: "58 kmph" },
  { id: "VH-003", num: "TN45 CD5678", typeId: "trailer", subtypeId: "trailer_single", wheels: "3 Axle", model: "Tata Prima 4928", make: "Tata Prima", year: 2016, status: "Maintenance", health: 45, ownership: "Leased", purchaseCost: 4200000, purchaseDate: "2016-02-20", insurance: "Valid", fc: "Expired", tax: "Paid", km: 124000, revenue: 6200000, cost: 5800000, fuel: "4.1 km/l", speed: "55 kmph" },
  { id: "VH-004", num: "TN38 EF9012", typeId: "flatbed", subtypeId: "flatbed_std", wheels: "12 Wheelers", model: "BharatBenz 3523", make: "BharatBenz", year: 2020, status: "Active", health: 91, ownership: "Owned", purchaseCost: 3100000, purchaseDate: "2020-11-05", insurance: "Valid", fc: "Valid", tax: "Paid", km: 54220, revenue: 2870000, cost: 1950000, fuel: "5.8 km/l", speed: "60 kmph" },
  { id: "VH-005", num: "TN71 GH3456", typeId: "container", subtypeId: "container_32ft", wheels: "14 Wheeler", model: "VECV Eicher 6016", make: "VECV", year: 2018, status: "On Trip", health: 68, ownership: "Owned", purchaseCost: 2200000, purchaseDate: "2018-06-22", insurance: "Valid", fc: "Valid", tax: "Due in 45d", km: 88910, revenue: 5100000, cost: 3980000, fuel: "7.5 km/l", speed: "65 kmph" },
  { id: "VH-006", num: "TN22 IJ7890", typeId: "lcv", subtypeId: "lcv_mini", wheels: "4 Wheeler", model: "Tata Ace Gold", make: "Tata", year: 2021, status: "Active", health: 82, ownership: "Owned", purchaseCost: 680000, purchaseDate: "2021-03-10", insurance: "Valid", fc: "Valid", tax: "Paid", km: 31440, revenue: 820000, cost: 560000, fuel: "15 km/l", speed: "60 kmph" },
];

const DRIVERS_DATA = [
  { id: "DRV-001", name: "Mani Kumar", phone: "+91 98765 43210", cdl: "Class A", score: 88, status: "Available", advanceBalance: 4500, totalTrips: 34, kmDriven: 284000, licenseExp: "2027-03-15" },
  { id: "DRV-002", name: "Selvam R", phone: "+91 87654 32109", cdl: "Class B", score: 76, status: "On Settlement", advanceBalance: 0, totalTrips: 21, kmDriven: 168000, licenseExp: "2026-07-22" },
  { id: "DRV-003", name: "Ramesh P", phone: "+91 76543 21098", cdl: "Class A", score: 62, status: "On Trip", advanceBalance: 8000, totalTrips: 18, kmDriven: 142000, licenseExp: "2025-12-31" },
  { id: "DRV-004", name: "Arjun D", phone: "+91 65432 10987", cdl: "Class A", score: 94, status: "Available", advanceBalance: 2300, totalTrips: 28, kmDriven: 231000, licenseExp: "2028-11-10" },
  { id: "DRV-005", name: "Vinoth S", phone: "+91 54321 09876", cdl: "Class B", score: 71, status: "On Trip", advanceBalance: 6700, totalTrips: 15, kmDriven: 118000, licenseExp: "2029-04-05" },
  { id: "DRV-006", name: "Karthik M", phone: "+91 43210 98765", cdl: "Class A", score: 85, status: "Available", advanceBalance: 1200, totalTrips: 22, kmDriven: 195000, licenseExp: "2028-08-20" },
];

const FleetContractWizard = ({ initialAssetType = "truck", onClose, onSave }) => {
  const [step, setStep] = useState(0);
  const [assetType, setAssetType] = useState(initialAssetType);
  const [ctId, setCtId] = useState("");
  const fmt = (n) => "₹" + Number(n ||0).toLocaleString("en-IN");
  const [form, setForm] = useState({
    client: "", clientPhone: "", clientGST: "", clientEmail: "",
    startDate: "", endDate: "", billingCycle: "MONTHLY", paymentTerms: "30 days net",
    autoRenew: false, noticePeriod: 30,
    // truck fields
    monthlyRetainer: "", ratePerKm: "", includedKm: "", extraKmRate: "",
    monthlyRate: "", includedTrips: "", extraTripRate: "", ratePerTrip: "",
    // equipment fields
    hourlyRate: "", dailyRate: "", minGuaranteeHours: "", includedHours: "",
    overtimeRate: "", shiftHours: "8", idleChargeable: false, fuelIncluded: false,
    mobilizationCharge: "", demobilizationCharge: "",
    // bus fields
    busMonthlyRate: "", busIncludedTrips: "", busExtraTripRate: "",
    busRatePerTrip: "", busAnnualRate: "", perSeatRate: "", minPax: "",
    routeKm: "", amShift: "", pmShift: "",
    // vehicle/driver assignment
    assignedVehicles: [], assignedDrivers: [],
    // routes
    routes: [{ from: "", to: "", km: "" }],
    // billing
    advance: "", securityDeposit: "",
    notes: "",
  });
  const rf = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const rfArr = (arr, idx, k, v) => setForm(f => { const a = [...f[arr]]; a[idx] = { ...a[idx], [k]: v }; return { ...f, [arr]: a }; });
  const contractTypes = CONTRACT_TYPE_DEFS[assetType] || [];
  const ctDef = contractTypes.find(c => c.id === ctId);
  const acClass = `fc-${assetType}`;
  const assetLabel = { truck: "Truck", equipment: "Equipment", bus: "Bus" }[assetType];

  const projMonthly = () => {
    const r = (v) => parseInt(v) || 0;
    if (assetType === "truck") {
      if (ctId === "DEDICATED_FLEET") return r(form.monthlyRetainer);
      if (ctId === "MONTHLY_RETAINER") return r(form.monthlyRate);
      if (ctId === "RATE_CONTRACT") return r(form.ratePerKm) * r(form.includedKm || 5000);
      if (ctId === "SPOT_RATE") return r(form.ratePerTrip) * 4;
      return 0;
    }
    if (assetType === "equipment") {
      if (ctId === "MONTHLY") return r(form.monthlyRate);
      if (ctId === "DAILY") return r(form.dailyRate) * 26;
      if (ctId === "HOURLY" || ctId === "HYBRID") return r(form.hourlyRate) * (r(form.minGuaranteeHours) || r(form.includedHours) || 180);
      return 0;
    }
    if (assetType === "bus") {
      if (ctId === "MONTHLY_CONTRACT") return r(form.busMonthlyRate);
      if (ctId === "PER_TRIP") return r(form.busRatePerTrip) * (r(form.busIncludedTrips) || 20);
      if (ctId === "ANNUAL_CONTRACT") return Math.round(r(form.busAnnualRate) / 12);
      if (ctId === "SPOT_BOOKING") return r(form.busRatePerTrip);
      return 0;
    }
    return 0;
  };
  const monthly = projMonthly();
  const annual = monthly * 12;

  const steps = ["Asset & Type", "Client Details", "Rates & Billing", "Assets & Routes", "Review & Activate"];

  const canNext = () => {
    if (step === 0) return !!ctId;
    if (step === 1) return !!form.client && !!form.startDate && !!form.endDate;
    if (step === 2) return monthly > 0;
    return true;
  };

  const buildContract = () => ({
    id: `FC-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
    assetType, contractTypeId: ctId,
    client: form.client, clientPhone: form.clientPhone, clientGST: form.clientGST, clientEmail: form.clientEmail,
    vehicles: form.assignedVehicles, drivers: form.assignedDrivers,
    routes: form.routes.filter(r => r.from && r.to),
    startDate: form.startDate, endDate: form.endDate,
    billingCycle: form.billingCycle, paymentTerms: form.paymentTerms,
    autoRenew: form.autoRenew, noticePeriod: parseInt(form.noticePeriod) || 30,
    // rates
    monthlyRetainer: parseInt(form.monthlyRetainer) || null,
    ratePerKm: parseInt(form.ratePerKm) || null,
    monthlyRate: parseInt(form.monthlyRate || form.busMonthlyRate) || null,
    includedKm: parseInt(form.includedKm) || null,
    extraKmRate: parseInt(form.extraKmRate) || null,
    includedTrips: parseInt(form.includedTrips || form.busIncludedTrips) || null,
    extraTripRate: parseInt(form.extraTripRate || form.busExtraTripRate) || null,
    ratePerTrip: parseInt(form.ratePerTrip || form.busRatePerTrip) || null,
    annualRate: parseInt(form.busAnnualRate) || null,
    hourlyRate: parseInt(form.hourlyRate) || null,
    dailyRate: parseInt(form.dailyRate) || null,
    overtimeRate: parseInt(form.overtimeRate) || null,
    minGuaranteeHours: parseInt(form.minGuaranteeHours) || null,
    includedHours: parseInt(form.includedHours) || null,
    shiftHours: parseInt(form.shiftHours) || 8,
    idleChargeable: form.idleChargeable,
    fuelIncluded: form.fuelIncluded,
    mobilizationCharge: parseInt(form.mobilizationCharge) || null,
    perSeatRate: parseInt(form.perSeatRate) || null,
    minPax: parseInt(form.minPax) || null,
    routeKm: parseInt(form.routeKm) || null,
    amShift: form.amShift, pmShift: form.pmShift,
    advanceCollected: parseInt(form.advance) || 0,
    securityDeposit: parseInt(form.securityDeposit) || 0,
    totalBilled: 0, totalTrips: 0, totalHoursRun: 0,
    billingHistory: [], tripLog: [], hoursLog: [],
    status: "ACTIVE", notes: form.notes,
    createdAt: new Date().toISOString().split("T")[0],
  });

  const acMap = {
  truck: "#4F8EF7",
  equipment: "#FB923C",
  bus: "#10B981"
};

const ac = acMap[assetType] || "#4F8EF7";

  return (
    <div
      className={`fc-modal ${acClass}`}
    >
      <div className="fc-container">
        <div className="fc-header">
          <div className="fc-header-top">
            <div>
              <div className="rj fc-title">
                {ctDef?.icon || "📋"} New {assetLabel} Contract
              </div>
              <div className="fc-subtitle">
                {ctDef?.label || "Select contract type to begin"}
              </div>
            </div>
            <button className="fc-close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="fc-step-bar">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`fc-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
                onClick={() => 
                  i < step &&
                   setStep(i)}
              >
                <div className="fc-step-label">
                  {i < step ? "✓ " : ""}{s}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {step === 0 && (
            <div>
              <div className="fc-modal-section">
                <label className="flabel">Asset Type</label>

                <div className="fc-modal-grid-3">
                  {[["truck", "🚛", "Truck", "Any freight vehicle"], ["equipment", "🏗️", "Equipment", "JCB / Crane / Roller"], ["bus", "🚌", "Bus", "Corporate / School / Stage"]]
                    .map(([id, ic, lb, sub]) => {
                      const isActive = assetType === id;

                      return (
                        <div
                          key={id}
                          onClick={() => { setAssetType(id); setCtId(""); }}
                          className={`fc-modal-asset-card fc-${id} ${isActive ? "active" : ""}`}
                        >
                          <div className="fc-modal-asset-icon">{ic}</div>
                          <div className="fc-modal-asset-title">{lb}</div>
                          <div className="fc-modal-asset-sub">{sub}</div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div>
                <label className="flabel">Contract Model *</label>

                <div className="fc-modal-contract-list">
                  {contractTypes.map(ct => {
                    const isActive = ctId === ct.id;

                    return (
                      <div
                        key={ct.id}
                        onClick={() => setCtId(ct.id)}
                        className={`fc-modal-contract-item ${isActive ? "active" : ""}`}
                       style={{"--fc-ct-color": ct.color}}
                      >
                        <span className="fc-modal-contract-icon">{ct.icon}</span>

                        <div className="fc-modal-contract-content">
                          <div className="fc-modal-contract-title">{ct.label}</div>
                          <div className="fc-modal-contract-desc">{ct.desc}</div>
                        </div>

                        {isActive && <span className="fc-modal-check">✅</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="fc-modal-grid-2">
                <div>
                  <label className="flabel">Client / Company Name *</label>
                  <input value={form.client} onChange={e => rf("client", e.target.value)} placeholder="Ramco Cement Ltd" />
                </div>

                <div>
                  <label className="flabel">Phone</label>
                  <input value={form.clientPhone} onChange={e => rf("clientPhone", e.target.value)} placeholder="044-28510000" />
                </div>
              </div>

              <div className="fc-modal-grid-2">
                <div>
                  <label className="flabel">GSTIN</label>
                  <input value={form.clientGST} onChange={e => rf("clientGST", e.target.value)} placeholder="33AABCT1332L1ZR" />
                </div>

                <div>
                  <label className="flabel">Email</label>
                  <input value={form.clientEmail} onChange={e => rf("clientEmail", e.target.value)} placeholder="logistics@client.com" />
                </div>
              </div>

              <div className="fc-modal-grid-2">
                <div>
                  <label className="flabel">Start Date *</label>
                  <input type="date" value={form.startDate} onChange={e => rf("startDate", e.target.value)} />
                </div>
                <div>
                  <label className="flabel">End Date *</label>
                  <input type="date" value={form.endDate} onChange={e => rf("endDate", e.target.value)} />
                </div>
              </div>
              <div className="fc-modal-grid-3">
                <div>
                  <label className="flabel">Billing Cycle</label>
                  <select value={form.billingCycle} onChange={e => rf("billingCycle", e.target.value)}>
                    {[["WEEKLY", "Weekly"], ["FORTNIGHTLY", "Fortnightly"], ["MONTHLY", "Monthly"], ["QUARTERLY", "Quarterly"], ["ANNUAL", "Annual"], ["PER_TRIP", "Per Trip"], ["PER_HOUR", "Per Hour"]]
                      .map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel">Payment Terms</label>
                  <select value={form.paymentTerms} onChange={e => rf("paymentTerms", e.target.value)}>
                    {[["7 days", "7 days"], ["15 days", "15 days"], ["30 days net", "30 days net"], ["45 days", "45 days"], ["60 days", "60 days"], ["Advance", "Advance"]]
                      .map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel">Notice Period (days)</label>
                  <input value={form.noticePeriod} onChange={e => rf("noticePeriod", e.target.value)} placeholder="30" />
                </div>
              </div>
              <div className="fc-modal-flex-row">
                <div className="fc-modal-flex-1">
                  <label className="flabel">Advance (₹)</label>
                  <input value={form.advance} onChange={e => rf("advance", e.target.value)} placeholder="e.g. 50000" />
                </div>
                <div className="fc-modal-flex-1">
                  <label className="flabel">Security Deposit (₹)</label>
                  <input value={form.securityDeposit} onChange={e => rf("securityDeposit", e.target.value)} placeholder="e.g. 100000" />
                </div>
              </div>
              <div
                className="fc-modal-checkbox-row"
                style={{ "--fc-bg-panel": 'var(--fc-bg-panel)' }}
              >
                <input
                  type="checkbox"
                  id="autoRenew"
                  checked={form.autoRenew}
                  onChange={e => rf("autoRenew", e.target.checked)}
                />
                <label htmlFor="autoRenew" className="fc-modal-checkbox-label">
                  Auto-renew on expiry (notify {form.noticePeriod || 30} days before)
                </label>
              </div>

            </div>
          )}

          {step === 2 && (
            <div>
              <div className="fc-modal-rate-info">
                Setting rates for: <strong style={{ color: ac }}>{ctDef?.label}</strong> — {ctDef?.desc}
              </div>
              {assetType === "truck" && ctId === "DEDICATED_FLEET" && (
                <div className="fc-modal-grid-2 fc-modal-mb10">
                  <div><label className="flabel">Monthly Retainer (₹) *</label><input value={form.monthlyRetainer} onChange={e => rf("monthlyRetainer", e.target.value)} /></div>
                  <div><label className="flabel">Rate/km (₹)</label><input value={form.ratePerKm} onChange={e => rf("ratePerKm", e.target.value)} /></div>
                  <div><label className="flabel">Included KM/month</label><input value={form.includedKm} onChange={e => rf("includedKm", e.target.value)} /></div>
                  <div><label className="flabel">Extra KM Rate (₹/km)</label><input value={form.extraKmRate} onChange={e => rf("extraKmRate", e.target.value)} /></div>
                </div>
              )}

              {assetType === "truck" && ctId === "RATE_CONTRACT" && (
                <div className="fc-modal-grid-2 fc-modal-mb10">
                  <div><label className="flabel">Rate per KM (₹) *</label><input value={form.ratePerKm} onChange={e => rf("ratePerKm", e.target.value)} /></div>
                  <div><label className="flabel">Rate per Trip (₹)</label><input value={form.ratePerTrip} onChange={e => rf("ratePerTrip", e.target.value)} /></div>
                  <div><label className="flabel">Included KM/period</label><input value={form.includedKm} onChange={e => rf("includedKm", e.target.value)} /></div>
                  <div><label className="flabel">Extra KM Rate (₹/km)</label><input value={form.extraKmRate} onChange={e => rf("extraKmRate", e.target.value)} /></div>
                </div>
              )}

              {assetType === "truck" && ctId === "MONTHLY_RETAINER" && (
                <div className="fc-modal-grid-2 fc-modal-mb10">
                  <div><label className="flabel">Monthly Rate (₹) *</label><input value={form.monthlyRate} onChange={e => rf("monthlyRate", e.target.value)} /></div>
                  <div><label className="flabel">Included Trips</label><input value={form.includedTrips} onChange={e => rf("includedTrips", e.target.value)} /></div>
                  <div><label className="flabel">Extra Trip Rate (₹)</label><input value={form.extraTripRate} onChange={e => rf("extraTripRate", e.target.value)} /></div>
                </div>
              )}

              {assetType === "truck" && ctId === "SPOT_RATE" && (
                <div className="fc-modal-grid-2 fc-modal-mb10">
                  <div><label className="flabel">Rate per Trip (₹) *</label><input value={form.ratePerTrip} onChange={e => rf("ratePerTrip", e.target.value)} /></div>
                  <div><label className="flabel">Rate per KM (₹)</label><input value={form.ratePerKm} onChange={e => rf("ratePerKm", e.target.value)} /></div>
                </div>
              )}

              {/* ───────── EQUIPMENT ───────── */}
              {assetType === "equipment" && (ctId === "HOURLY" || ctId === "HYBRID") && (
                <>
                  <div className="fc-modal-grid-3 fc-modal-mb10">
                    <div><label className="flabel">Rate/hr (₹) *</label><input value={form.hourlyRate} onChange={e => rf("hourlyRate", e.target.value)} /></div>
                    <div><label className="flabel">Min Guarantee Hrs/day</label><input value={form.minGuaranteeHours} onChange={e => rf("minGuaranteeHours", e.target.value)} /></div>
                    <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e => rf("overtimeRate", e.target.value)} /></div>
                  </div>

                  <div className="fc-modal-grid-3 fc-modal-mb10">
                    <div><label className="flabel">Shift Hours</label><input value={form.shiftHours} onChange={e => rf("shiftHours", e.target.value)} /></div>
                    <div><label className="flabel">Mobilization (₹)</label><input value={form.mobilizationCharge} onChange={e => rf("mobilizationCharge", e.target.value)} /></div>
                    <div><label className="flabel">Demobilization (₹)</label><input value={form.demobilizationCharge} onChange={e => rf("demobilizationCharge", e.target.value)} /></div>
                  </div>

                  <div className="fc-modal-checkbox-row fc-modal-mb10">
                    <label><input type="checkbox" checked={form.idleChargeable} onChange={e => rf("idleChargeable", e.target.checked)} /> Idle hours chargeable</label>
                    <label><input type="checkbox" checked={form.fuelIncluded} onChange={e => rf("fuelIncluded", e.target.checked)} /> Fuel included</label>
                  </div>
                </>
              )}

              {assetType === "equipment" && ctId === "DAILY" && (
                <div className="fc-modal-grid-3 fc-modal-mb10">
                  <div><label className="flabel">Daily Rate (₹) *</label><input value={form.dailyRate} onChange={e => rf("dailyRate", e.target.value)} /></div>
                  <div><label className="flabel">Shift Hours</label><input value={form.shiftHours} onChange={e => rf("shiftHours", e.target.value)} /></div>
                  <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e => rf("overtimeRate", e.target.value)} /></div>
                </div>
              )}

              {assetType === "equipment" && ctId === "MONTHLY" && (
                <div className="fc-modal-grid-3 fc-modal-mb10">
                  <div><label className="flabel">Monthly Rate (₹) *</label><input value={form.monthlyRate} onChange={e => rf("monthlyRate", e.target.value)} /></div>
                  <div><label className="flabel">Included Hours/month</label><input value={form.includedHours} onChange={e => rf("includedHours", e.target.value)} /></div>
                  <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e => rf("overtimeRate", e.target.value)} /></div>
                </div>
              )}

              {/* ───────── BUS ───────── */}
              {assetType === "bus" && ctId === "MONTHLY_CONTRACT" && (
                <div className="fc-modal-grid-3 fc-modal-mb10">
                  <div><label className="flabel">Monthly Rate (₹) *</label><input value={form.busMonthlyRate} onChange={e => rf("busMonthlyRate", e.target.value)} /></div>
                  <div><label className="flabel">Included Trips/month</label><input value={form.busIncludedTrips} onChange={e => rf("busIncludedTrips", e.target.value)} /></div>
                  <div><label className="flabel">Extra Trip Rate (₹)</label><input value={form.busExtraTripRate} onChange={e => rf("busExtraTripRate", e.target.value)} /></div>
                  <div><label className="flabel">Route KM</label><input value={form.routeKm} onChange={e => rf("routeKm", e.target.value)} /></div>
                  <div><label className="flabel">AM Shift</label><input value={form.amShift} onChange={e => rf("amShift", e.target.value)} /></div>
                  <div><label className="flabel">PM Shift</label><input value={form.pmShift} onChange={e => rf("pmShift", e.target.value)} /></div>
                </div>
              )}

              {assetType === "bus" && ctId === "PER_TRIP" && (
                <div className="fc-modal-grid-3 fc-modal-mb10">
                  <div><label className="flabel">Rate per Trip (₹) *</label><input value={form.busRatePerTrip} onChange={e => rf("busRatePerTrip", e.target.value)} /></div>
                  <div><label className="flabel">Per Seat Rate (₹)</label><input value={form.perSeatRate} onChange={e => rf("perSeatRate", e.target.value)} /></div>
                  <div><label className="flabel">Min Passengers</label><input value={form.minPax} onChange={e => rf("minPax", e.target.value)} /></div>
                </div>
              )}

              {assetType === "bus" && ctId === "ANNUAL_CONTRACT" && (
                <div className="fc-modal-grid-2 fc-modal-mb10">
                  <div><label className="flabel">Annual Rate (₹) *</label><input value={form.busAnnualRate} onChange={e => rf("busAnnualRate", e.target.value)} /></div>
                  <div><label className="flabel">Included Trips/year</label><input value={form.busIncludedTrips} onChange={e => rf("busIncludedTrips", e.target.value)} /></div>
                  <div><label className="flabel">Route KM</label><input value={form.routeKm} onChange={e => rf("routeKm", e.target.value)} /></div>
                  <div><label className="flabel">Extra Trip Rate (₹)</label><input value={form.busExtraTripRate} onChange={e => rf("busExtraTripRate", e.target.value)} /></div>
                </div>
              )}

              {assetType === "bus" && ctId === "SPOT_BOOKING" && (
                <div className="fc-modal-grid-2 fc-modal-mb10">
                  <div><label className="flabel">Trip Rate (₹) *</label><input value={form.busRatePerTrip} onChange={e => rf("busRatePerTrip", e.target.value)} /></div>
                  <div><label className="flabel">Per KM Rate (₹)</label><input value={form.ratePerKm} onChange={e => rf("ratePerKm", e.target.value)} /></div>
                </div>
              )}

              {/* ───────── REVENUE ───────── */}
              {monthly > 0 && (
                <div className="fc-modal-revenue-grid">
                  <div className="fc-modal-rev-card green">
                    <div className="fc-modal-rev-label">Monthly Revenue</div>
                    <div className="fc-modal-rev-value">{fmt(monthly)}</div>
                  </div>
                  <div className="fc-modal-rev-card accent">
                    <div className="fc-modal-rev-label">Annual Projection</div>
                    <div className="fc-modal-rev-value">{fmt(annual)}</div>
                  </div>
                  <div className="fc-modal-rev-card blue">
                    <div className="fc-modal-rev-label">Contract Value</div>
                    <div className="fc-modal-rev-value">
                      {fmt(Math.round((new Date(form.endDate) - new Date(form.startDate)) / 2592000000) * monthly)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="fc-modal-section">
                <label className="flabel">Assign Vehicles (optional)</label>
                <div className="fc-modal-chip-wrap">
                  {(assetType === "equipment" ? EQUIPMENT_DATA : assetType === "bus" ? BUS_MASTER_DATA : FLEET_DATA).map(v => {
                    const vid = assetType === "equipment" ? v.id : assetType === "bus" ? v.regNo : v.num;
                    const sel = form.assignedVehicles.includes(vid);

                    return (
                      <div
                        key={vid}
                        onClick={() =>
                          rf(
                            "assignedVehicles",
                            sel
                              ? form.assignedVehicles.filter(x => x !== vid)
                              : [...form.assignedVehicles, vid]
                          )
                        }
                        className={`fc-modal-chip ${sel ? "active" : ""}`}
                        style={{ "--chip-color": ac }}
                      >
                        {vid}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="fc-modal-section">
                <label className="flabel">Assign Drivers (optional)</label>
                <div className="fc-modal-chip-wrap">
                  {DRIVERS_DATA.map(d => {
                    const sel = form.assignedDrivers.includes(d.name);

                    return (
                      <div
                        key={d.id}
                        onClick={() =>
                          rf(
                            "assignedDrivers",
                            sel
                              ? form.assignedDrivers.filter(x => x !== d.name)
                              : [...form.assignedDrivers, d.name]
                          )
                        }
                        className={`fc-modal-chip ${sel ? "active success" : ""}`}
                      >
                        {d.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="fc-modal-section">
                <div className="fc-modal-section-header">
                  <label className="flabel no-margin">Routes</label>
                  <button
                    className="fc-modal-btn-sm"
                    style={{ "--btn-color": ac }}
                    onClick={() =>
                      rf("routes", [...form.routes, { from: "", to: "", km: "" }])
                    }
                  >
                    + Add Route
                  </button>
                </div>

                {form.routes.map((r, i) => (
                  <div key={i} className="fc-modal-route-row">
                    <input
                      className="fc-modal-input"
                      value={r.from}
                      onChange={e => rfArr("routes", i, "from", e.target.value)}
                      placeholder="From city"
                    />
                    <input
                      className="fc-modal-input"
                      value={r.to}
                      onChange={e => rfArr("routes", i, "to", e.target.value)}
                      placeholder="To city"
                    />
                    <input
                      className="fc-modal-input"
                      value={r.km}
                      type="number"
                      onChange={e => rfArr("routes", i, "km", e.target.value)}
                      placeholder="km"
                    />
                    <button
                      className="fc-modal-remove-btn"
                      onClick={() =>
                        rf("routes", form.routes.filter((_, j) => j !== i))
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="fc-modal-section">
                <label className="flabel">Contract Notes</label>
                <textarea
                  className="fc-modal-textarea"
                  value={form.notes}
                  onChange={e => rf("notes", e.target.value)}
                  rows={3}
                  placeholder="Special terms, SLA, penalty clauses, etc."
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div
                className="fc-modal-review-card"
                style={{ "--accent": ac }}
              >
                <div className="fc-modal-review-header">
                  <span className="fc-modal-review-icon">{ctDef?.icon}</span>
                  <div>
                    <div className="rj fc-modal-review-title">
                      {ctDef?.label} Contract
                    </div>
                    <div className="fc-modal-review-sub">
                      {assetLabel} · {form.billingCycle} billing
                    </div>
                  </div>

                  <div className="fc-modal-review-price">
                    <div className="rj">{fmt(monthly)}</div>
                    <span>per month</span>
                  </div>
                </div>

                <div className="fc-modal-review-grid">
                  {[
                    ["Client", form.client],
                    ["Phone", form.clientPhone || "—"],
                    ["GSTIN", form.clientGST || "—"],
                    ["Period", `${form.startDate} → ${form.endDate}`],
                    ["Payment Terms", form.paymentTerms],
                    ["Auto-Renew", form.autoRenew ? "Yes" : "No"],
                    ["Advance", form.advance ? fmt(parseInt(form.advance)) : "—"],
                    ["Security Deposit", form.securityDeposit ? fmt(parseInt(form.securityDeposit)) : "—"],
                    ["Vehicles", form.assignedVehicles.length ? form.assignedVehicles.join(", ") : "Any available"],
                    ["Drivers", form.assignedDrivers.length ? form.assignedDrivers.join(", ") : "Any available"],
                    ["Routes", form.routes.filter(r => r.from).map(r => `${r.from}→${r.to}${r.km ? ` (${r.km}km)` : ""}`).join(", ") || "—"],
                    ["Annual Value", fmt(annual)],
                  ].map(([k, v]) => (
                    <div key={k} className="fc-modal-review-row">
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {form.notes && (
                <div className="fc-modal-notes-box">
                  <strong>Notes:</strong> {form.notes}
                </div>
              )}

              <div className="fc-modal-success-box">
                ✅ Contract will be <strong>immediately activated</strong>. A contract ID will be auto-generated.
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: `1px solid var(--fc-border)` }}>
            <button className="btn btn-gh" onClick={step === 0 ? onClose : () => setStep(s => s - 1)}>{step === 0 ? "Cancel" : "← Back"}</button>
            {step < 4 ? (
              <button className="btn" style={{ background: canNext() ? ac : "rgba(255,255,255,.08)", color: canNext() ? "#fff" : 'var(--fc-text-muted)', cursor: canNext() ? "pointer" : "not-allowed", fontSize: 12 }} disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
                Continue → {steps[step + 1]}
              </button>
            ) : (
              <button className="btn" style={{ background: '#10B981', color: "#fff", fontSize: 12 }} onClick={() => { onSave && onSave(buildContract()); onClose(); }}>
                🚀 Activate Contract
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default FleetContractWizard;