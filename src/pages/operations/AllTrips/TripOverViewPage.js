import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';

function titleCase(s) {
    if (!s) return "";
    return s.toUpperCase();
}

function daysUntil(dateStr) {
    if (!dateStr) return null;
    const target = new Date(dateStr);
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / msPerDay);
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
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
const URGENCY_STYLE = {
    expired: { bg: "#FBE7E4", fg: "#A5352A", dot: "#C1443A", label: "Expired" },
    critical: { bg: "#FCEEE0", fg: "#9C5A16", dot: "#E0942C", label: "Due soon" },
    warning: { bg: "#FDF6DE", fg: "#8A7414", dot: "#D9B93B", label: "Upcoming" },
    ok: { bg: "#E7F1EA", fg: "#2F6146", dot: "#3E7A5C", label: "Valid" },
    unknown: { bg: "#EFEEEA", fg: "#6B6459", dot: "#B8B2A2", label: "—" },
};

function fmtCurrency(n) {
    if (typeof n !== "number") return "—";
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

const TripOverViewPage = ({ onBack, tripDetail, documents, expenses, weighBridge, fuelEntries }) => {
   
    
    const vehicle = tripDetail?.vehicleId || {};
    const driver = tripDetail?.driver1 || {};
    const expensesType = ["Fuel Entries", "Loading" , "Unloading", "Weighbridge"]
    const complianceItems = useMemo(() => {
        const list = [
            { label: "Insurance", date: vehicle.insuranceExpiryDate, owner: vehicle.regNo },
            { label: "RC Book", date: vehicle.rcBookExpiryDate, owner: vehicle.regNo },
            { label: "Fitness Cert.", date: vehicle.fcExpiryDate, owner: vehicle.regNo },
            { label: "Road Tax", date: vehicle.taxExpiryDate, owner: vehicle.regNo },
            { label: "Permit", date: vehicle.permitExpiryDate, owner: vehicle.regNo },
            { label: "Pollution (PUC)", date: vehicle.pollutionExpiryDate, owner: vehicle.regNo },
            { label: "Driver License", date: driver.licenseExpiryDate, owner: driver.name },
        ];
        return list
            .map((d) => ({ ...d, days: daysUntil(d.date), level: urgency(daysUntil(d.date)) }))
            .sort((a, b) => (a.days ?? Infinity) - (b.days ?? Infinity));
    }, [vehicle, driver]);

    const costs = [
        ["Freight amount", tripDetail?.freightAmount],
        ["Advance paid", tripDetail?.advanceAmount],
        ["Driver advance", tripDetail?.driverAdvance],
        ["Diesel", tripDetail?.dieselAmount],
        ["Toll", tripDetail?.tollAmount],
        ["Loading", tripDetail?.loadingAmount],
        ["Unloading", tripDetail?.unloadingAmount],
        ["Commission", tripDetail?.commissionAmount],
        ["Misc.", tripDetail?.miscAmount],
    ];

    const totalOutflow = costs.slice(2).reduce((sum, item) => sum + (item[1] || 0), 0);

    return (
        <div>
            <div className="trip-overview-topbar">
                <button className="trip-overview-back" onClick={onBack}>
                    ← Back to trips
                </button>
            </div>
            <div className="trip-overview-header">
                <div>
                    <div className="trip-overview-tripno">{tripDetail?.tripNo || "—"}</div>
                    <div className="trip-overview-lrno">
                        LR No. {tripDetail?.lrNo || "—"} &nbsp;·&nbsp; {tripDetail?.fleetSource || "—"}
                    </div>
                </div>
                <span className="trip-overview-status-pill">
                    {tripDetail?.tripStatus || "—"}
                </span>
            </div>
            <div className="trip-overview-route">
                <div className="trip-overview-route-point">
                    <div className="trip-overview-route-city">{titleCase(tripDetail?.origin?.city)}</div>
                    <div className="trip-overview-route-sub">{titleCase(tripDetail?.origin?.location)}</div>
                </div>
                <div className="trip-overview-route-line">
                    <span className="trip-overview-route-badge">{tripDetail?.journeyType || "One Way"}</span>
                </div>
                <div className="trip-overview-route-point end">
                    <div className="trip-overview-route-city">{titleCase(tripDetail?.destination?.city)}</div>
                    <div className="trip-overview-route-sub">{titleCase(tripDetail?.destination?.location)}</div>
                </div>
            </div>

            <div className="trip-overview-card" style={{ marginBottom: 14 }}>
                <div className="trip-overview-radar-title">Document validity tracker </div>
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
                                <div className="trip-overview-chip-label" style={{ color: style.fg }}>
                                    <span className="trip-overview-chip-dot" style={{ background: style.dot }} />
                                    {d.label}
                                </div>
                                <div className="trip-overview-chip-days" style={{ color: style.fg }}>
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
                        Driver
                    </div>
                    <div className="trip-overview-row">
                        <span className="k">Name</span>
                        <span className="v">{driver.name || "—"}</span>
                    </div>
                    <div className="trip-overview-row">
                        <span className="k">Driver ID</span>
                        <span className="v">{driver.driverId || "—"}</span>
                    </div>
                    <div className="trip-overview-row">
                        <span className="k">Mobile</span>
                        <span className="v">{driver.mobile || "—"}</span>
                    </div>
                    <div className="trip-overview-row">
                        <span className="k">DL no. / class</span>
                        <span className="v">
                            {driver.dlNo} · {driver.dlClass}
                        </span>
                    </div>
                    <div className="trip-overview-row">
                        <span className="k">Availability</span>
                        <span className="v">{driver.availableStatus}</span>
                    </div>
                </div>

                <div className="trip-overview-card">
                    <div className="trip-overview-card-title">Financial summary</div>
                    <div className="trip-overview-row">
                        <span className="k">Payment type</span>
                        <span className="v">{tripDetail?.paymentType || "—"}</span>
                    </div>
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
            <div className="trip-overview-card ">
                <div className="trip-overview-card-title">Trip documents</div>
                {documents.length > 0 ? (
                    <div className="trip-overview-docs">
                        {documents.map((doc) => (
                            <div className="trip-overview-doc" key={doc._id}>
                                <span className="trip-overview-doc-type">{docTypeLabel(doc.documentType)}</span>
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
                    <div className="trip-overview-doc-empty">No documents uploaded for this trip yet.</div>
                )}
            </div>
            <div className="trip-overview-card mt-3">
                <div className="trip-overview-card-title">Trip Expenses</div>
                {expenses.length > 0 ? (
                    <div className="trip-overview-docs">
                        {expenses.map((exp) => (
                            <div className="trip-overview-doc" key={exp._id}>
                                <span className="trip-overview-doc-type">{exp.expenseType}</span>
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
                    <div className="trip-overview-doc-empty">No Trip Expenses uploaded for this trip yet.</div>
                )}
            </div>
            <div className="trip-overview-card mt-3">
                <div className="trip-overview-card-title">Fuel Entries</div>
                {fuelEntries.length > 0 ? (
                    <div className="trip-overview-docs">
                        {fuelEntries.map((fuel) => (
                            <div className="trip-overview-doc" key={fuel._id}>
                                <span className="trip-overview-doc-type">{fuel.fuelType} ({fuel.quantity}L)</span>
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
                    <div className="trip-overview-doc-empty">No Fuel Entries uploaded for this trip yet.</div>
                )}
            </div>
            <div className="trip-overview-card mt-3">
                <div className="trip-overview-card-title">Weigh Bridge Bill</div>
                    <div className="trip-overview-docs">
                            <div className="trip-overview-doc" key={weighBridge._id}>
                                <span className="trip-overview-doc-type">Weight {weighBridge.grossWeight} Kg</span>
                                <a
                                    className="trip-overview-doc-link"
                                    href={weighBridge.receiptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View
                                </a>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default TripOverViewPage
