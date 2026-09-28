import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function titleCase(s) {
  if (!s) return "";
  return s.toUpperCase();
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil(
    (target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / msPerDay,
  );
}

function urgency(days) {
  if (days === null) return "unknown";
  if (days < 0) return "expired";
  if (days <= 7) return "critical";
  if (days <= 30) return "warning";
  return "ok";
}

function fmtDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
const URGENCY_STYLE = {
  expired: { bg: "#FBE7E4", fg: "#A5352A", dot: "#C1443A", label: "Expired" },
  critical: { bg: "#FCEEE0", fg: "#9C5A16", dot: "#E0942C", label: "Due soon" },
  warning: { bg: "#FDF6DE", fg: "#8A7414", dot: "#D9B93B", label: "Upcoming" },
  ok: { bg: "#E7F1EA", fg: "#2F6146", dot: "#3E7A5C", label: "Valid" },
  unknown: { bg: "#EFEEEA", fg: "#6B6459", dot: "#B8B2A2", label: "—" },
};

function fmtCurrency(n) {
  if (typeof n !== "number" || isNaN(n)) return "—";
  return "₹" + n.toLocaleString("en-IN");
}

const DOC_TYPE_LABELS = {
  EWAY_BILL: "E-Way Bill",
  INVOICE: "Invoice",
  LR: "Lorry Receipt",
  DELIVERY_CHALLAN: "Delivery Challan",
};

function docTypeLabel(type) {
  if (!type) {
    return "Document";
  }
  return DOC_TYPE_LABELS[type];
}

const TripOverViewPage = ({
  onBack,
  tripDetail,
  documents = [],
  expenses = [],
  weighBridge = [],
  fuelEntries = [],
}) => {
  const vehicle = tripDetail?.vehicleId || {};
  const legs = tripDetail?.journeyLegs || [];

  // unique drivers across every leg (driver1 per leg)
  const uniqueDrivers = useMemo(() => {
    const seen = new Map();
    legs.forEach((leg) => {
      if (leg.driver1?._id && !seen.has(leg.driver1._id)) {
        seen.set(leg.driver1._id, leg.driver1);
      }
    });
    return [...seen.values()];
  }, [legs]);

  const complianceItems = useMemo(() => {
    const list = [
      {
        label: "Insurance",
        date: vehicle.insuranceExpiryDate,
        owner: vehicle.regNo,
      },
      {
        label: "RC Book",
        date: vehicle.rcBookExpiryDate,
        owner: vehicle.regNo,
      },
      {
        label: "Fitness Cert.",
        date: vehicle.fcExpiryDate,
        owner: vehicle.regNo,
      },
      { label: "Road Tax", date: vehicle.taxExpiryDate, owner: vehicle.regNo },
      { label: "Permit", date: vehicle.permitExpiryDate, owner: vehicle.regNo },
      {
        label: "Pollution (PUC)",
        date: vehicle.pollutionExpiryDate,
        owner: vehicle.regNo,
      },
      ...uniqueDrivers.map((d) => ({
        label: `Driver License (${d.name})`,
        date: d.licenseExpiryDate,
        owner: d.name,
      })),
    ];
    return list
      .map((d) => ({
        ...d,
        days: daysUntil(d.date),
        level: urgency(daysUntil(d.date)),
      }))
      .sort((a, b) => (a.days ?? Infinity) - (b.days ?? Infinity));
  }, [vehicle, uniqueDrivers]);

  // financial totals across all legs
  const totalFreight = legs.reduce(
    (s, l) => s + (Number(l.estimatedFreightAmount) || 0),
    0,
  );
  const totalDriverSalary = legs.reduce(
    (s, l) => s + (Number(l.driverSalary) || 0),
    0,
  );
  const totalDriverAdvance = legs.reduce(
    (s, l) =>
      s +
      (l.driverAdvance || []).reduce(
        (a, adv) => a + (Number(adv.amount) || 0),
        0,
      ),
    0,
  );
  const totalTripExpense = legs.reduce(
    (s, l) =>
      s +
      (l.tripExpense || []).reduce(
        (a, exp) => a + (Number(exp.amount) || 0),
        0,
      ),
    0,
  );
  const totalWeighbridgeFee = legs.reduce(
    (s, l) => s + (Number(l.weighbridge?.weighbridgeFee) || 0),
    0,
  );

  const costs = [
    ["Estimated freight (all legs)", totalFreight],
    ["Driver salary (all legs)", totalDriverSalary],
    ["Driver advance (all legs)", totalDriverAdvance],
    ["Trip expenses (all legs)", totalTripExpense],
    ["Weighbridge fees", totalWeighbridgeFee],
  ];

  const totalOutflow =
    totalDriverSalary +
    totalDriverAdvance +
    totalTripExpense +
    totalWeighbridgeFee;

  const firstLeg = legs[0];
  const lastLeg = legs[legs.length - 1];

  return (
    <div>
      <div className="trip-overview-topbar">
        <button className="trip-overview-back" onClick={onBack}>
          ← Back to trips
        </button>
      </div>
      <div className="trip-overview-header">
        <div>
          <div className="trip-overview-tripno">
            {tripDetail?.tripNo || "—"}
          </div>
          <div className="trip-overview-lrno">
            {tripDetail?.fleetSource || "—"} &nbsp;·&nbsp; Leg{" "}
            {tripDetail?.currentLeg || 1} of {legs.length}
          </div>
        </div>
        <span className="trip-overview-status-pill">
          {tripDetail?.tripStatus || "—"}
        </span>
      </div>

      <div className="trip-overview-route">
        <div className="trip-overview-route-point">
          <div className="trip-overview-route-city">
            {titleCase(firstLeg?.from)}
          </div>
        </div>
        <div className="trip-overview-route-line">
          <span className="trip-overview-route-badge">
            {tripDetail?.journeyType || "One Way"} · {legs.length}{" "}
            {legs.length === 1 ? "Leg" : "Legs"}
          </span>
        </div>
        <div className="trip-overview-route-point end">
          <div className="trip-overview-route-city">
            {titleCase(lastLeg?.to)}
          </div>
        </div>
      </div>

      <div className="trip-overview-card" style={{ marginBottom: 14 }}>
        <div className="trip-overview-radar-title">
          Document validity tracker{" "}
        </div>
        <div className="trip-overview-radar">
          {complianceItems.map((d) => {
            const style = URGENCY_STYLE[d.level];
            return (
              <div
                key={d.label}
                className="trip-overview-chip"
                style={{ background: style.bg }}
                title={`${d.label}: ${fmtDate(d.date)}`}
              >
                <div
                  className="trip-overview-chip-label"
                  style={{ color: style.fg }}
                >
                  <span
                    className="trip-overview-chip-dot"
                    style={{ background: style.dot }}
                  />
                  {d.label}
                </div>
                <div
                  className="trip-overview-chip-days"
                  style={{ color: style.fg }}
                >
                  {d.days === null
                    ? "no date on file"
                    : d.days < 0
                      ? `expired ${Math.abs(d.days)}d ago`
                      : d.days === 0
                        ? "expires today"
                        : `${d.days}d remaining`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="trip-overview-grid">
        <div className="trip-overview-card">
          <div className="trip-overview-card-title">Vehicle</div>
          <div className="trip-overview-row">
            <span className="k">Reg. no.</span>
            <span className="v">{vehicle.regNo || "—"}</span>
          </div>
          <div className="trip-overview-row">
            <span className="k">Make / model</span>
            <span className="v">
              {vehicle.make} {vehicle.model}
            </span>
          </div>
          <div className="trip-overview-row">
            <span className="k">Type / axle</span>
            <span className="v">
              {vehicle.type} · {vehicle.axle}
            </span>
          </div>
          <div className="trip-overview-row">
            <span className="k">GVW</span>
            <span className="v">{vehicle.gvw} T</span>
          </div>
          <div className="trip-overview-row">
            <span className="k">Status</span>
            <span className="v">{vehicle.status}</span>
          </div>
          <div className="trip-overview-row">
            <span className="k">Health</span>
            <span className="v">{vehicle.healthStatus}</span>
          </div>

          <div className="trip-overview-card-title" style={{ marginTop: 16 }}>
  Drivers ({uniqueDrivers.length})
</div>
{uniqueDrivers.length > 0 ? (
  uniqueDrivers.map((d) => (
    <div key={d._id} className="trip-overview-driver-block">
      <div className="trip-overview-row">
        <span className="k">Name</span>
        <span className="v">{d.name || "—"}</span>
      </div>
      <div className="trip-overview-row">
        <span className="k">Driver ID</span>
        <span className="v">{d.driverId || "—"}</span>
      </div>
      <div className="trip-overview-row">
        <span className="k">Mobile</span>
        <span className="v">{d.mobile || "—"}</span>
      </div>
      <div className="trip-overview-row">
        <span className="k">DL no. / class</span>
        <span className="v">
          {d.dlNo} · {d.dlClass}
        </span>
      </div>
      <div className="trip-overview-row">
        <span className="k">Availability</span>
        <span className="v">{d.availableStatus}</span>
      </div>
    </div>
  ))
) : (
  <div className="trip-overview-doc-empty">No driver assigned yet.</div>
)}
        </div>

        <div className="trip-overview-card">
          <div className="trip-overview-card-title">Financial summary</div>
          {costs.map(([label, val]) => (
            <div className="trip-overview-row" key={label}>
              <span className="k">{label}</span>
              <span className="v">{fmtCurrency(val)}</span>
            </div>
          ))}
          <div className="trip-overview-row trip-overview-total-row">
            <span className="k">Total operating outflow</span>
            <span className="v">{fmtCurrency(totalOutflow)}</span>
          </div>
        </div>
      </div>

      <div className="trip-overview-card mt-3">
  <div className="trip-overview-card-title">Journey Legs</div>
  {legs.length > 0 ? (
    legs.map((leg) => (
      <div key={leg._id} className="trip-overview-leg-block">
        <div className="trip-overview-leg-head">
          <span className="trip-overview-leg-route">
            Leg {leg.legNo}: {titleCase(leg.from)} → {titleCase(leg.to)}
          </span>
          <span className="trip-overview-leg-status">{leg.legStatus}</span>
        </div>
        <div className="trip-overview-row">
          <span className="k">Commodity</span>
          <span className="v">
            {leg.commodity || "—"} ({leg.weight} {leg.uom})
          </span>
        </div>
        <div className="trip-overview-row">
          <span className="k">Load / Payment</span>
          <span className="v">
            {leg.loadType} · {leg.paymentType}
          </span>
        </div>
        <div className="trip-overview-row">
          <span className="k">Rate / Est. Amount</span>
          <span className="v">
            ₹{leg.amountPerTon}/{leg.uom} ·{" "}
            {fmtCurrency(leg.estimatedFreightAmount)}
          </span>
        </div>
        <div className="trip-overview-row">
          <span className="k">Driver</span>
          <span className="v">{leg.driver1?.name || "—"}</span>
        </div>
        <div className="trip-overview-row">
          <span className="k">Driver salary / advance</span>
          <span className="v">
            {fmtCurrency(leg.driverSalary)} ·{" "}
            {fmtCurrency(
              (leg.driverAdvance || []).reduce(
                (a, adv) => a + (Number(adv.amount) || 0),
                0,
              ),
            )}
          </span>
        </div>
      </div>
    ))
  ) : (
    <div className="trip-overview-doc-empty">
      No journey legs on this trip.
    </div>
  )}
</div>

      <div className="trip-overview-card mt-3">
        <div className="trip-overview-card-title">Trip documents</div>
        {documents.length > 0 ? (
          <div className="trip-overview-docs">
            {documents.map((doc) => (
              <div className="trip-overview-doc" key={doc._id}>
                <span className="trip-overview-doc-type">
                  {docTypeLabel(doc.documentType)}
                </span>
                <a
                  className="trip-overview-doc-link"
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="trip-overview-doc-empty">
            No documents uploaded for this trip yet.
          </div>
        )}
      </div>
      <div className="trip-overview-card mt-3">
        <div className="trip-overview-card-title">Trip Expenses</div>
        {expenses.length > 0 ? (
          <div className="trip-overview-docs">
            {expenses.map((exp) => (
              <div className="trip-overview-doc" key={exp._id}>
                <span className="trip-overview-doc-type">
                  {exp.expenseType}
                </span>
                <a
                  className="trip-overview-doc-link"
                  href={exp.billUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="trip-overview-doc-empty">
            No Trip Expenses uploaded for this trip yet.
          </div>
        )}
      </div>
      <div className="trip-overview-card mt-3">
        <div className="trip-overview-card-title">Fuel Entries</div>
        {fuelEntries.length > 0 ? (
          <div className="trip-overview-docs">
            {fuelEntries.map((fuel) => (
              <div className="trip-overview-doc" key={fuel._id}>
                <span className="trip-overview-doc-type">
                  {fuel.fuelType} ({fuel.quantity}L)
                </span>
                <a
                  className="trip-overview-doc-link"
                  href={fuel.billUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="trip-overview-doc-empty">
            No Fuel Entries uploaded for this trip yet.
          </div>
        )}
      </div>
<div className="trip-overview-card mt-3">
  <div className="trip-overview-card-title">Weigh Bridge Bills</div>
  {weighBridge?.length > 0 ? (
    <div className="trip-overview-docs">
      {weighBridge.map((wb) => (
        <div className="trip-overview-doc" key={wb._id}>
          <span className="trip-overview-doc-type">
            {wb.legNo ? `Leg ${wb.legNo} · ` : ""}
            Weight {wb.grossWeight} Kg
            {wb.ticketNumber ? ` · Ticket ${wb.ticketNumber}` : ""}
          </span>
          <a
            className="trip-overview-doc-link"
            href={wb.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </div>
      ))}
    </div>
  ) : (
    <div className="trip-overview-doc-empty">
      No Weigh Bridge uploaded for this trip yet.
    </div>
  )}
</div>
    </div>
  );
};

export default TripOverViewPage;
