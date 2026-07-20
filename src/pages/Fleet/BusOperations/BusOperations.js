import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BOSeatCheckModal from "./BOSeatCheckModal";
import BOPreTripModal from "./BOPreTripModal";
import BOComplianceModal from "./BOComplianceModal";

import { getAllVehicles, getBusCompliance, getBusFleetDashboard, getBusRoutes } from "../../../redux/Vehicle/VehicleSlice";
import AddBusModal from "./AddBusModal";

export const BUS_FLEET_TYPES = {
  CORPORATE_SHUTTLE: {
    label: "Corporate Shuttle",
    icon: "🏢",
    billing: "MONTHLY_CONTRACT",
  },

  SCHOOL_BUS: {
    label: "School Bus",
    icon: "🏫",
    billing: "MONTHLY_CONTRACT",
  },

  TOURISM_CHARTER: {
    label: "Tourism / Charter",
    icon: "🗺️",
    billing: "PER_TRIP",
  },

  STAFF_TRANSPORT: {
    label: "Hospital / Staff",
    icon: "🏥",
    billing: "MONTHLY_CONTRACT",
  },

  CONTRACT_CARRIAGE: {
    label: "Contract Carriage",
    icon: "📋",
    billing: "RATE_CONTRACT",
  },

  LOCAL_STAGE: {
    label: "Local Stage / City",
    icon: "🏙️",
    billing: "TICKET_BASED",
  },

  INTER_CITY: {
    label: "Inter-City Express",
    icon: "🛣️",
    billing: "TICKET_BASED",
  },

  EVENT_TRANSPORT: {
    label: "Event Transport",
    icon: "🎪",
    billing: "PER_TRIP",
  },
};

export const BUS_PRETRIP_CHECKS = {
  safety_critical: [
    { id: "PT-BK", label: "Brake system — foot + hand", critical: true },
    { id: "PT-TR", label: "Tyre pressure all 6 wheels", critical: true },
    { id: "PT-TT", label: "Tyre tread & sidewall condition", critical: true },
    { id: "PT-DR", label: "All passenger doors open/close", critical: true },
    { id: "PT-EX", label: "Emergency exit — clear & marked", critical: true },
    { id: "PT-FE", label: "Fire extinguisher — charged", critical: true },
    { id: "PT-FA", label: "First aid kit — complete", critical: true },
    { id: "PT-SB", label: "Sample seat belt test (3 seats)", critical: true },
  ],

  electrical: [
    { id: "PT-HL", label: "Headlights + high beam", critical: true },
    { id: "PT-IN", label: "Indicators (all 4)", critical: true },
    { id: "PT-BL", label: "Brake lights", critical: true },
    { id: "PT-HR", label: "Horn", critical: false },
    { id: "PT-WP", label: "Windshield wipers", critical: false },
    { id: "PT-AC", label: "AC / heater operational", critical: false },
    { id: "PT-RL", label: "Interior ceiling lights", critical: false },
  ],

  mechanical: [
    { id: "PT-EN", label: "Engine oil level", critical: false },
    { id: "PT-CL", label: "Coolant level", critical: false },
    { id: "PT-FL", label: "Fuel level (min 1/4 tank)", critical: true },
    { id: "PT-WS", label: "Windshield — no cracks", critical: true },
    { id: "PT-MR", label: "Mirrors — adjusted, uncracked", critical: true },
    { id: "PT-RT", label: "Retro-reflective tape — intact", critical: false },
  ],

  compliance: [
    { id: "PT-RC", label: "RC + Fitness Cert in cabin", critical: true },
    { id: "PT-PM", label: "Permit document in cabin", critical: true },
    { id: "PT-IN2", label: "Insurance document in cabin", critical: true },
    { id: "PT-PU", label: "PUC certificate valid", critical: true },
    { id: "PT-DL", label: "Driver DL valid (check card)", critical: true },
    { id: "PT-BD", label: "Driver PSV badge worn", critical: true },
  ],
};

function mapTripType(tripType = "") {
  const map = {
    "Corporate Shuttle": "CORPORATE_SHUTTLE",
    "School Bus": "SCHOOL_BUS",
    "Tourism / Charter": "TOURISM_CHARTER",
    "Hospital / Staff": "STAFF_TRANSPORT",
    "Contract Carriage": "CONTRACT_CARRIAGE",
    "Local Stage / City": "LOCAL_STAGE",
    "Inter-City Express": "INTER_CITY",
    "Event Transport": "EVENT_TRANSPORT",
  };

  return map[tripType] || "CORPORATE_SHUTTLE";
}

function calcDaysLeft(dateStr) {
  if (!dateStr) return 9999;

  return Math.round((new Date(dateStr) - Date.now()) / 86400000);
}

function calcDocStatus(daysLeft) {
  if (daysLeft < 0) return "Expired";

  if (daysLeft <= 30) return "Critical";

  if (daysLeft <= 90) return "Due Soon";

  return "Valid";
}

const fmt = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000
      ? `₹${(n / 1000).toFixed(1)}k`
      : `₹${n}`;

function docStatusCls(doc) {
  if (doc.daysLeft < 0) return "bo-doc-expired";

  if (doc.daysLeft <= 30) return "bo-doc-critical";

  if (doc.daysLeft <= 90) return "bo-doc-warn";

  return "bo-doc-valid";
}

function docLabel(doc) {
  if (doc.daysLeft < 0) {
    return `EXPIRED ${Math.abs(doc.daysLeft)}d ago`;
  }

  return `${doc.daysLeft}d left`;
}

function fitnessCls(score) {
  if (score >= 80) return "bo-pfill--green";

  if (score >= 60) return "bo-pfill--orange";

  return "bo-pfill--red";
}

function busStatusCls(s) {
  if (s === "Active") return "bo-badge-green";

  if (s === "Available") return "bo-badge-blue";

  if (s === "Overdue Compliance") return "bo-badge-red";

  if (s === "Maintenance") return "bo-badge-orange";

  return "bo-badge-amber";
}

function driverStatusCls(s) {
  if (s === "Valid") return "bo-badge-green";

  if (s === "Expiring") return "bo-badge-orange";

  if (s === "Non-Compliant") return "bo-badge-red";

  return "bo-badge-amber";
}

function dlExpiryCls(dateStr) {
  const ms = new Date(dateStr) - Date.now();

  if (ms < 0) return "bo-td-red";

  if (ms < 60 * 24 * 3600 * 1000) {
    return "bo-td-orange";
  }

  return "";
}

const BusOperations = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("fleet");
  const [showSeat, setShowSeat] = useState(null);
  const [showPreTrip, setShowPreTrip] = useState(null);
  const [showCompliance, setShowCompliance] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const { vehicles, loading, error, busFleet, busRoutes, busCompliance } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getBusFleetDashboard());
    dispatch(getAllVehicles());
    dispatch(getBusCompliance());
    dispatch(getBusRoutes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const buses = vehicles.filter((v) => v.fleet === "bus").map((v) => ({
    id: v._id,
    regNo: v.regNo,
    type: mapTripType(v.tripType),
    make: v.make,
    model: v.model,
    year: v.year,
    busName: v.busName,
    seatingCapacity: v.seatingCapacity ?? 0,
    standingCapacity: v.standingCapacity ?? 0,
    acType: v.acType,
    fuelType: v.fuelType,
    fitnessScore: v.fitnessScore || 0,
    status: v.status,
    insuranceExpiry: v.insuranceExpiryDate,
    fcExpiry: v.fcExpiryDate,
    permitExpiry: v.permitExpiryDate,
    pollutionExpiry: v.pollutionExpiryDate,
    fromLocation: v.fromLocation,
    toLocation: v.toLocation,
    driver: v.assignedDriver?.driverName || "Not Assigned",
  }));

  const ticketLogs = vehicles.flatMap((v) =>
    (v.ticketLogs || []).map((t) => ({
      id: v._id,
      busId: v._id,
      regNo: v.regNo,
      routeName: t.routeName,
      date: t.tripDate,
      shift: t.shift,
      tripNo: t.tripNo,
      boardedPax: t.boardedPassengers,
      ticketsSold: t.ticketsSold,
      cashCollected: t.cashCollected,
      conductorName: t.conductorName,
      verified: t.verified,
      remarks: t.remarks,
    }))
  );

  const routeSchedules = (busRoutes?.data || []).map((route) => ({
    id: route.busId,
    busId: route.busId,
    routeId: route.routeId,
    regNo: route.regNo,
    busName: route.busName,
    routeName: route.routeName,
    client: route.clientName,
    monthlyRate: route.monthlyRate,
    amShift:
      route.amShiftStart && route.amShiftEnd
        ? `${route.amShiftStart} - ${route.amShiftEnd}`
        : null,
    pmShift:
      route.pmShiftStart && route.pmShiftEnd
        ? `${route.pmShiftStart} - ${route.pmShiftEnd}`
        : null,
    daysOfWeek: route.daysOfWeek ?? [],
    totalPax: route.totalPassengers ?? 0,
    status: route.status,
    stops: (route.routeStops || []).map((stop) => ({
      id: stop._id,
      name: stop.stopName,
      time: stop.stopTime,
      pax: stop.passengerCount ?? 0,
    })),
  }));

  const complianceDocs = (busCompliance?.documents || []).map((doc) => {
    const daysLeft = calcDaysLeft(doc.expiryDate);
    return {
      id: doc.busId,
      busId: doc.busId,
      regNo: doc.regNo,
      docType: doc.docType,
      docNo: doc.docNo,
      issuer: doc.issuer,
      expiryDate: doc.expiryDate?.split("T")[0].split("-").reverse().join("-"),
      daysLeft,
      status: calcDocStatus(daysLeft),
      fine: doc.fine,
    };
  });

  const filteredBuses = buses.filter((b) => {
    const q = search.toLowerCase();

    return (
      !q ||
      b.regNo?.toLowerCase().includes(q) ||
      b.model?.toLowerCase().includes(q) ||
      (b.client || "").toLowerCase().includes(q) ||
      (b.assignedRoute || "").toLowerCase().includes(q)
    );
  });

  const expiredCount = complianceDocs.filter((d) => d.daysLeft < 0).length;

  const criticalCount = complianceDocs.filter(
    (d) => d.daysLeft >= 0 && d.daysLeft <= 30,
  ).length;

  const contractRev = routeSchedules.reduce(
    (s, r) => s + (r.monthlyRate || 0),
    0,
  );

  const ticketRev = ticketLogs.reduce((s, t) => s + (t.cashCollected || 0), 0);

  const kpis = [
    {
      label: "Total Fleet",
      value: busFleet.totalFleet,
      colorCls: "blue",
    },
    {
      label: "Active / On Route",
      value: busFleet.active,
      colorCls: "green",
    },
    {
      label: "Available",
      value: busFleet.available,
      colorCls: "cyan",
    },
    {
      label: "Compliance Issues",
      value: busFleet.complianceIssues,
      colorCls: "red",
    },
    {
      label: "MTD Revenue",
      value: fmt(busFleet.mtdRevenue),
      colorCls: "accent",
    },
  ];

  const totalChecks = Object.values(BUS_PRETRIP_CHECKS).reduce(
    (s, arr) => s + arr.length,
    0,
  );
  if (loading && !buses?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Bus...</p>
      </div>
    );
  }

  return (
    <div className="bo-page">
      {showSeat && (
        <BOSeatCheckModal bus={showSeat} onClose={() => setShowSeat(null)} />
      )}

      {showPreTrip && (
        <BOPreTripModal
          bus={showPreTrip}
          onClose={() => setShowPreTrip(null)}
          totalChecks={totalChecks}
        />
      )}

      {showCompliance && (
        <BOComplianceModal
          bus={showCompliance}
          docs={complianceDocs.filter((d) => d.busId === showCompliance.id)}
          onClose={() => setShowCompliance(null)}
        />
      )}

      <AddBusModal
        open={showAddBusModal}
        onClose={() => setShowAddBusModal(false)}
      />

      <div className="bo-page-hdr d-flex justify-content-between align-items-center">
        <div className="bo-page-hdr-left">
          <h1 className="heading">Bus Operations</h1>

          <p className="sub-heading">
            Fleet · Compliance · Pre-Trip Safety · Routes · Driver Docs
          </p>
        </div>
        <div>
          <button
            className="add-bus-btn"
            onClick={() => setShowAddBusModal(true)}
          >
            + Add Bus
          </button>
        </div>
      </div>
      {error && !loading && (
        <div className="broker-error-banner">
          {error || "Failed to load fleet data."}
        </div>
      )}
      <div className="bo-kpi-row">
        {kpis.map((k) => (
          <div
            key={k.label}
            className={`bo-kpi-card bo-kpi-card--${k.colorCls}`}
          >
            <div className="bo-kpi-val">{k.value}</div>

            <div className="bo-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="bo-tabs">
        {[
          ["fleet", "Fleet"],
          ["routes", "Routes"],
          ["compliance", "Compliance"],
          ["drivers", "Drivers"],
          ["tickets", "Ticket Log"],
        ].map(([k, l]) => (
          <button
            key={k}
            className={`bo-tab ${tab === k ? "bo-tab-on" : ""}`}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "fleet" && (
        <>
          <div className="he-filter-bar">
            <div className="he-search-wrap">
              <span className="he-search-icon">⌕</span>
              <input
                className="he-search-input"
                placeholder="Search reg, model, client…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="bus-card-grid">
            {filteredBuses.map((bus) => {
              const route = routeSchedules.find((r) => r.busId === bus.id);
              return (
                <div key={bus.id} className="bus-card">

                  {/* Header */}
                  <div className="bus-card-header">
                    <div className="bus-info">
                      <div className="bus-icon">
                        {
                          BUS_FLEET_TYPES[bus.type]?.icon || "🚌"
                        }
                      </div>

                      <div>
                        <h3 className="bus-regno">
                          {bus.regNo}
                        </h3>

                        <p className="bus-model">
                          {bus.make} {bus.model} · {bus.year}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`bus-status ${busStatusCls(
                        bus.status
                      )}`}
                    >
                      {bus.status}
                    </span>
                  </div>

                  {/* Fitness */}
                  <div className="fitness-section">
                    <div className="fitness-header">
                      <span>FITNESS SCORE</span>

                      <strong>
                        {bus.fitnessScore}%
                      </strong>
                    </div>

                    <div className="fitness-bar">
                      <div
                        className={`fitness-progress ${fitnessCls(
                          bus.fitnessScore
                        )}`}
                        style={{
                          width: `${bus.fitnessScore}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bus-tags">
                    <span className="tag tag-ac">
                      {bus.acType === "AC"
                        ? "❄ AC"
                        : "🌡 Non AC"}
                    </span>

                    <span className="tag">
                      💺 {bus.seatingCapacity}
                    </span>

                    <span className="tag">
                      ⛽ {bus.fuelType}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="route-strip">
                    📍 {bus.fromLocation || "-"}
                    {" → "}
                    {bus.toLocation || "-"}
                  </div>

                  <div className="meta-box">
                    <div className="meta-item">
                      <span className="meta-label">BUS NAME</span>
                      <span className="meta-value">
                        {bus.busName || "-"}
                      </span>
                    </div>
                    
                    <div className="meta-item">
                    <span className="meta-label">CLIENT</span>
                    <span className="meta-value">
                       {route?.client || "-"}
                    </span>
                  </div>
                  </div>

                  {/* Expiry Dates */}
                  <div className="expiry-section">
                    <div>
                      <small>Insurance</small>
                      <p>{bus.insuranceExpiry}</p>
                    </div>

                    <div>
                      <small>FC</small>
                      <p>{bus.fcExpiry}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bo-action-buttons">
                    <button
                      className="seat-btn"
                      onClick={() => setShowSeat(bus)}
                    >
                      💺 Seats
                    </button>

                    <button
                      className="pretrip-btn"
                      onClick={() =>
                        setShowPreTrip(bus)
                      }
                    >
                      🔍 Pre-Trip
                    </button>

                    <button
                      className="docs-btn"
                      onClick={() =>
                        setShowCompliance(bus)
                      }
                    >
                      📋 Docs
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          {filteredBuses.length === 0 && (
            <div className="he-empty">
              <div className="he-empty-icon">🏗️</div>
              <div>No Buses matches your filter</div>
            </div>
          )}
        </>
      )}




    </div>
  );
};

export default BusOperations;
