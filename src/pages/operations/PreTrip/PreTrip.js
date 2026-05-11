import React, { useState } from "react";
import PreTripModal from "./PreTripModal";

const CHECKS = [
  "Engine Oil",
  "Coolant",
  "Brakes",
  "Tyres",
  "Lights",
  "Horn",
  "Fuel",
  "Documents",
  "Fire Extinguisher",
  "First Aid Kit",
];
const TRIPS_INIT = [
  {
    id: "TRP-2025-0043",
    vehicle: "TN32 XY7821",
    driver: "External",
    route: "Trichy®Mumbai",
    status: "Pre-Trip Pending",
  },
  {
    id: "TRP-2025-0046",
    vehicle: "TN22 IJ7890",
    driver: "Karthik M",
    route: "Chennai®Pune",
    status: "Pre-Trip Pending",
  },
];

const PreTrip = () => {
  const [trips] = useState(TRIPS_INIT);
  const [sel, setSel] = useState(null);
  const [checks, setChecks] = useState({});
  const [openInspectionModal, setOpenInspectionModal] = useState(false);

  return (
    <div className="pre-trip-page">
      <div className="pre-trip-header">
        <h1 className="heading">Pre-Trip Inspection</h1>
        <p className="sub-heading">
          Mandatory safety checks before vehicle dispatch
        </p>
      </div>
      <div className="pre-trip-kpi-row">
        {[
          { l: "Pending", v: trips.length, c: "orange" },
          { l: "Checks", v: CHECKS.length, c: "blue" },
          { l: "Compliance", v: "100%", c: "green" },
        ].map((k) => (
          <div key={k.l} className={`rl-stat pre-trip-stat-${k.c}`}>
            <div className="stat-v">{k.v}</div>
            <div className="rl-stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      {trips.map((t) => (
        <div key={t.id} className="pre-trip-trip-card">
          <div className="pre-trip-trip-inner">
            <div>
              <div className="mono pre-trip-trip-id">{t.id}</div>
              <div className="pre-trip-trip-label">
                {t.vehicle} — {t.route}
              </div>
              <div className="pre-trip-trip-driver">Driver: {t.driver}</div>
            </div>
            <button
              className="btn btn-g"
              onClick={() => {
                setSel(t);
                setChecks({});
                setOpenInspectionModal(true);
              }}
            >
              ✅ Start Inspection
            </button>
          </div>
        </div>
      ))}
      {openInspectionModal && (
        <PreTripModal sel={sel} setSel={setSel} closeModal={() => setOpenInspectionModal(false)}/>
      )}
    </div>
  );
};

export default PreTrip;
