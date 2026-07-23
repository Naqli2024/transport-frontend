import React from "react";

const Review = ({ form, set, fleetSource }) => {
  const JOURNEY_TYPES = [
    {
      id: "oneway",
      label: "One-Way Load",
      icon: "→",
      color: "#3B82F6",
      desc: "Truck goes A→B with load. Returns empty or on its own.",
      legs: ["Origin → Destination"],
      tag: "Single Leg",
    },
    {
      id: "roundtrip",
      label: "Round Trip",
      icon: "⇄",
      color: "#10B981",
      desc: "A→B with load, B→A with return load from another party.",
      legs: ["Origin → Destination", "Destination → Origin (Return Load)"],
      tag: "2 Legs",
    },
    {
      id: "multileg",
      label: "Multi-Leg (Hub & Spoke)",
      icon: "⟳",
      color: "#F59E0B",
      desc: "A→B→C. Deliver at B, pick new load to C, then return.",
      legs: ["Origin → Stop 1", "Stop 1 → Stop 2", "Stop 2 → Origin"],
      tag: "3 Legs",
    },
    {
      id: "crossregion",
      label: "Cross-Region Relay",
      icon: "↬",
      color: "#8B5CF6",
      desc: "Long-haul trip with driver relay handoff at midpoint depot.",
      legs: ["Origin → Relay Point", "Relay Point → Destination"],
      tag: "Driver Relay",
    },
    {
      id: "dedicated",
      label: "Dedicated Fleet Run",
      icon: "∞",
      color: "#F97316",
      desc: "Fixed route, recurring trips for one customer.",
      legs: ["Fixed Route (Repeating)"],
      tag: "Recurring",
    },
  ];

  const reviewItems = [
    {
      label: "Journey Type",
      value: JOURNEY_TYPES.find((j) => j.id === form.journeyType)?.label || "—",
    },
    {
      label: "Route",
      value: form.from || "-",
    },
    {
      label: "Fleet Source",
      value: form.fleetSource || "-",
    },
    {
      label: fleetSource === "Own Fleet" ? "Vehicle" : "Vendor Vehicle",
      value: form.vehicleCategory || "-",
    },
    {
      label: "Driver 1 (Primary)",
      value: form.driver1 || "-",
    },
    {
      label: "Driver 2 / Co-Driver",
      value: fleetSource === "Own Fleet" ? form.secondDriver || "Not assigned" : "—",
    },
    {
      label: "Cleaner / Khalasi",
      value: fleetSource === "Own Fleet" ? form.cleanerName || "Not assigned" : "—",
    },
    { label: "Customer", value: form.customer || "—" },
    { label: "Load Type", value: form.loadType },
    {
      label: "Freight",
      value: form.freightAmount
        ? `₹${parseInt(form.freightAmount).toLocaleString()}`
        : "—",
    },
  ];

  return (
    <div>
      <div className="review-confirm-title">✅ Review & Confirm</div>
      <div className="row g-3" style={{ marginBottom: "16px" }}>
        {reviewItems.map((r) => (
          <div className="col-md-6" key={r.label}>
            <div className="review-confirm-card">
              <div className="review-confirm-label">{r.label}</div>
              <div className="review-confirm-value">{r.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="review-confirm-next-step">
        <strong style={{ color: "var(--accent)" }}>Next Step:</strong> Trip
        created as{" "}
        <strong style={{ color: "var(--orange)" }}>Pre-Trip Pending</strong>.{" "}
        {fleetSource === "Own Fleet"
          ? "Driver must complete vehicle inspection before departure."
          : "Vendor confirms pickup and driver assignment."}
      </div>
    </div>
  );
};

export default Review;
