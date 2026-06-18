import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import BOSeatCheckModal from "./BOSeatCheckModal";
import BOPreTripModal from "./BOPreTripModal";
import BOComplianceModal from "./BOComplianceModal";

import { getAllVehicles } from "../../../redux/Vehicle/VehicleSlice";

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

  const [buses, setBuses] = useState([]);

  const [complianceDocs, setComplianceDocs] = useState([]);

  const [routeSchedules, setRouteSchedules] = useState([]);

  const [ticketLogs, setTicketLogs] = useState([]);

  const [driverData, setDriverData] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);
  const fetchVehicles = async () => {
    try {
      setLoading(true);

      setError(null);

      const response = await dispatch(getAllVehicles()).unwrap();

      console.log("API RESPONSE:", response);

      const vehiclesRaw = Array.isArray(response)
        ? response
        : response?.data || [];

      const mappedBuses = vehiclesRaw.map((v) => ({
        id: v._id || v.id,

        regNo: v.regNo,

        type: mapTripType(v.tripType),

        make: v.make,

        model: v.model,

        seatingCapacity: v.seatingCapacity ?? 0,

        standingCapacity: v.standingCapacity ?? 0,

        year: v.year,

        acType: v.acType,

        fuelType: v.fuelType,

        insuranceExpiry: v.insuranceExpiryDate,

        fcExpiry: v.fcExpiryDate,

        permitExpiry: v.permitExpiryDate,

        mvTaxDue: v.mvTaxDueDate,

        pucExpiry: v.pollutionExpiryDate,

        fitnessScore: v.fitnessScore ?? 0,

        status: v.status ?? "Active",

        assignedRoute:
          v.fromLocation && v.toLocation
            ? `${v.fromLocation}–${v.toLocation}`
            : null,

        client: v.routes?.[0]?.clientName ?? null,

        driver: v.assignedDriver?.driverName ?? null,
      }));

      setBuses(mappedBuses);

      const mappedDocs = [];

      vehiclesRaw.forEach((v) => {
        const busId = v._id || v.id;

        (v.complianceDocs || []).forEach((doc, i) => {
          const daysLeft = calcDaysLeft(doc.expiryDate);

          mappedDocs.push({
            id: `BC-${busId}-${i}`,

            busId,

            docType: doc.docType,

            docNo: doc.docNo,

            issuer: doc.issuer,

            issueDate: doc.issueDate,

            expiryDate: doc.expiryDate,

            daysLeft,

            status: calcDocStatus(daysLeft),

            fine: doc.fine ?? "—",
          });
        });
      });

      setComplianceDocs(mappedDocs);
      const mappedRoutes = [];

      vehiclesRaw.forEach((v) => {
        const busId = v._id || v.id;

        (v.routes || []).forEach((r, i) => {
          mappedRoutes.push({
            id: `RS-${busId}-${i}`,

            busId,

            routeName: r.routeName,

            routeCode: r.routeCode,

            type: mapTripType(v.tripType),

            client: r.clientName,

            stops: (r.routeStops || []).map((s) => ({
              name: s.stopName,

              time: s.stopTime,

              pax: s.passengerCount ?? 0,
            })),

            totalPax: r.totalPassengers ?? 0,

            amShift:
              r.amShiftStart && r.amShiftEnd
                ? `${r.amShiftStart}–${r.amShiftEnd}`
                : null,

            pmShift:
              r.pmShiftStart && r.pmShiftEnd
                ? `${r.pmShiftStart}–${r.pmShiftEnd}`
                : null,

            frequency: r.frequency,

            driver: r.driverName,

            conductor: r.conductorName,

            daysOfWeek: r.daysOfWeek ?? [],

            monthlyRate: r.monthlyRate ?? 0,

            status: r.status,
          });
        });
      });

      setRouteSchedules(mappedRoutes);
      const mappedTickets = [];

      vehiclesRaw.forEach((v) => {
        const busId = v._id || v.id;

        (v.ticketLogs || []).forEach((t, i) => {
          mappedTickets.push({
            id: `TK-${busId}-${i}`,

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
          });
        });
      });

      setTicketLogs(mappedTickets);

      const driversMap = {};

      vehiclesRaw.forEach((v) => {
        if (v.assignedDriver?.driverName) {
          const name = v.assignedDriver.driverName;

          if (!driversMap[name]) {
            driversMap[name] = {
              driverId: `DRV-${Object.keys(driversMap).length + 1}`,

              name,

              dlNo: "—",

              dlClass: "PSV/HMV",

              dlExpiry: "—",

              badgeNo: null,

              badgeExpiry: null,

              medFitExpiry: "—",

              policeVerification: "—",

              aadharLinked: false,

              mobileVerified: false,

              trainingCert: null,

              status:
                v.assignedDriver.status === "Assigned"
                  ? "Valid"
                  : "Non-Compliant",
            };
          }
        }
      });

      setDriverData(Object.values(driversMap));
    } catch (err) {
      console.log(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  };

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
      value: buses.length,
      colorCls: "blue",
    },

    {
      label: "Active / On Route",
      value: buses.filter((b) => b.status === "Active").length,
      colorCls: "green",
    },

    {
      label: "Available",
      value: buses.filter((b) => b.status === "Available").length,
      colorCls: "cyan",
    },

    {
      label: "Compliance Issues",
      value: expiredCount + criticalCount,
      colorCls: "red",
    },

    {
      label: "MTD Revenue",
      value: fmt(contractRev + ticketRev),
      colorCls: "accent",
    },
  ];

  const totalChecks = Object.values(BUS_PRETRIP_CHECKS).reduce(
    (s, arr) => s + arr.length,
    0,
  );

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

      <div className="bo-page-hdr">
        <div className="bo-page-hdr-left">
          <h1 className="heading">Bus Operations</h1>

          <p className="sub-heading">
            Fleet · Compliance · Pre-Trip Safety · Routes · Driver Docs
          </p>
        </div>
      </div>

      {loading && <div className="bo-loading">Loading fleet data…</div>}

      {error && <div className="bo-error">Failed to load fleet</div>}

      {!loading && (
        <>
          {!loading && (
            <>
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
                  <div className="bo-filter-bar">
                    <div className="bo-search-wrap">
                      <span className="bo-search-icon">⌕</span>

                      <input
                        className="bo-search-input"
                        placeholder="Search reg no, model, client, route…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="he-fleet-container">
                    <div className="bo-fleet-grid">
                      {filteredBuses.map((bus) => {
                        const spec = BUS_FLEET_TYPES[bus.type] || {};

                        const busDocs = complianceDocs.filter(
                          (d) => d.busId === bus.id,
                        );

                        const hasExp = busDocs.some((d) => d.daysLeft < 0);

                        const hasCrit = busDocs.some(
                          (d) => d.daysLeft >= 0 && d.daysLeft <= 30,
                        );

                        return (
                          <div
                            key={bus.id}
                            className={`bo-bus-card ${
                              hasExp
                                ? "bo-bus-card--expired"
                                : hasCrit
                                  ? "bo-bus-card--critical"
                                  : ""
                            }`}
                          >
                            <div className="bo-bus-card-head">
                              <div className="bo-bus-id">
                                <span className="bo-bus-type-icon">
                                  {spec.icon || "🚌"}
                                </span>

                                <div>
                                  <div className="bo-bus-regno">
                                    {bus.regNo}
                                  </div>

                                  <div className="bo-bus-model">
                                    {bus.make} {bus.model} · {bus.year}
                                  </div>
                                </div>
                              </div>

                              <span
                                className={`bo-status-badge ${busStatusCls(
                                  bus.status,
                                )}`}
                              >
                                {bus.status}
                              </span>
                            </div>

                            <div className="bo-fitness-row">
                              <div className="bo-fitness-meta">
                                <span className="bo-fitness-label">
                                  Fitness Score
                                </span>

                                <span
                                  className={`bo-fitness-val ${fitnessCls(
                                    bus.fitnessScore,
                                  ).replace("bo-pfill--", "bo-fit-val--")}`}
                                >
                                  {bus.fitnessScore}%
                                </span>
                              </div>

                              <div className="bo-pbar">
                                <div
                                  className={`bo-pfill ${fitnessCls(
                                    bus.fitnessScore,
                                  )}`}
                                  style={{
                                    width: `${bus.fitnessScore}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="bo-bus-tags">
                              <span
                                className={`bo-tag-ac ${
                                  bus.acType === "AC"
                                    ? "bo-tag-ac--yes"
                                    : "bo-tag-ac--no"
                                }`}
                              >
                                ❄ {bus.acType}
                              </span>

                              <span className="bo-tag-cap">
                                💺 {bus.seatingCapacity}
                              </span>

                              {bus.fuelType && (
                                <span className="bo-tag-fuel">
                                  ⛽ {bus.fuelType}
                                </span>
                              )}
                            </div>

                            {bus.assignedRoute && (
                              <div className="bo-bus-route-strip">
                                <span className="bo-route-pin">📍</span>

                                <span className="bo-bus-route-text">
                                  {bus.assignedRoute}
                                </span>
                              </div>
                            )}

                            {(bus.client || bus.driver) && (
                              <div className="bo-bus-meta-row">
                                {bus.client && (
                                  <div className="bo-bus-meta-item">
                                    <span className="bo-meta-label">
                                      Client
                                    </span>

                                    <span className="bo-meta-val">
                                      {bus.client}
                                    </span>
                                  </div>
                                )}

                                {bus.driver && (
                                  <div className="bo-bus-meta-item">
                                    <span className="bo-meta-label">
                                      Driver
                                    </span>

                                    <span className="bo-meta-val">
                                      {bus.driver}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {(hasExp || hasCrit) && (
                              <div
                                className={`bo-compliance-alert ${
                                  hasExp
                                    ? "bo-compliance-alert--expired"
                                    : "bo-compliance-alert--critical"
                                }`}
                              >
                                <span>⚠</span>

                                <span>
                                  {hasExp
                                    ? `${
                                        busDocs.filter((d) => d.daysLeft < 0)
                                          .length
                                      } doc(s) EXPIRED`
                                    : `${
                                        busDocs.filter(
                                          (d) =>
                                            d.daysLeft >= 0 && d.daysLeft <= 30,
                                        ).length
                                      } expiring within 30 days`}
                                </span>
                              </div>
                            )}
                            <div className="bo-bus-actions">
                              <button
                                className="bo-btn bo-btn-seat"
                                onClick={() => setShowSeat(bus)}
                              >
                                💺 Seats
                              </button>

                              <button
                                className="bo-btn bo-btn-pretrip"
                                onClick={() => setShowPreTrip(bus)}
                              >
                                🔍 Pre-Trip
                              </button>

                              <button
                                className="bo-btn bo-btn-docs"
                                onClick={() => setShowCompliance(bus)}
                              >
                                📋 Docs
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {filteredBuses.length === 0 && (
                        <div className="bo-empty">
                          <div className="bo-empty-icon">🚌</div>

                          <div>No buses match your filter</div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BusOperations;
