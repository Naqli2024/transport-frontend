import React, { useState } from "react";
import PostTripModal from "./PostTripModal";

const CHECKS = [
  "Body Damage Check",
  "Tyre Condition",
  "Engine Status",
  "Fuel Level",
  "Odometer Reading",
  "Cargo Cleared",
  "Documents Returned",
  "Cash Settlement",
  "Toll Receipts",
  "Driver Debriefing",
];

const TRIPS_INIT = [
  {
    id: "TRP-2025-0042",
    vehicle: "TN59 AB1234",
    driver: "Selvam R",
    route: "Madurai→Bangalore",
    freight: 38000,
    expenses: 16700,
    status: "Post-Trip Pending",
  },
];

const PostTrip = () => {
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
          { l:"Pending", v:trips.length, c:"blue" },
{ l:"Checks", v:CHECKS.length, c:"accent" },
{ l:"Settled Today",v:"₹0", c:"green" },
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
        <PostTripModal
          sel={sel}
          setSel={setSel}
          closeModal={() => setOpenInspectionModal(false)}
        />
      )}
    </div>
  );
};

export default PostTrip;
