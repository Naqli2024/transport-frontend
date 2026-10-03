import React from "react";

const LoadFreightDetails = ({ form, setForm, isEdit, originalLegCount = 0 }) => {
  const updateLeg = (index, field, value) => {
    setForm((prev) => {
      const legs = [...prev.journeyLegs];
      legs[index] = { ...legs[index], [field]: value };
      return { ...prev, journeyLegs: legs };
    });
  };

  return (
    <div>
      <div className="load-details-title">📦 Load & Freight Details</div>
      {form.journeyLegs.map((leg, idx) => {
        const locked = isEdit && idx < originalLegCount;
        const uomLabel = leg.uom || "Unit";
        const estimatedAmount =
          Number(leg.amountPerTon || 0) * Number(leg.weight || 0);

        return (
          <div
            key={idx}
            className="journey-type-leg-block"
            style={{ marginBottom: "16px", opacity: locked ? 0.65 : 1 }}
          >
            <div className="journey-type-leg-header mb-2" style={{ color: "var(--accent)" }}>
              LEG {idx + 1} — {leg.from || "From Location"} → {leg.to || "To Location"}
              {locked && (
                <span style={{ fontSize: "10px", marginLeft: "8px", color: "var(--textSub)" }}>
                  🔒 Locked
                </span>
              )}
            </div>

            <div className="row g-3" style={{ marginBottom: "14px" }}>
              <div className="col-md-6">
                <label className="load-details-flabel">Commodity / Material</label>
                <input
                  value={leg.commodity || ""}
                  onChange={(e) => updateLeg(idx, "commodity", e.target.value)}
                  placeholder="e.g. Textile, Steel, Cement"
                  className="load-details-input"
                  disabled={locked}
                />
              </div>
              <div className="col-md-6">
                <label className="load-details-flabel">UOM</label>
                <select
                  className="load-details-input"
                  value={leg.uom || ""}
                  onChange={(e) => updateLeg(idx, "uom", e.target.value)}
                  disabled={locked}
                >
                  <option value="" disabled>Select UOM</option>
                  <option value="Tonne">Tonne</option>
                  <option value="Kg">Kg</option>
                  <option value="Piece">Piece</option>
                  <option value="Bag">Bag</option>
                  <option value="Box">Box</option>
                  <option value="Pallet">Pallet</option>
                  <option value="Litre">Litre</option>
                  <option value="Container">Container</option>
                </select>
              </div>
            </div>

            <div className="row g-3" style={{ marginBottom: "14px" }}>
              <div className="col-md-3">
                <label className="load-details-flabel">Weight per {uomLabel}</label>
                <input
                  value={leg.weight || ""}
                  type="number"
                  onChange={(e) => updateLeg(idx, "weight", e.target.value)}
                  placeholder="e.g. 10"
                  className="load-details-input"
                  disabled={locked}
                />
              </div>
              <div className="col-md-3">
                <label className="load-details-flabel">Amount per {uomLabel} (₹)</label>
                <input
                  value={leg.amountPerTon || ""}
                  type="number"
                  onChange={(e) => updateLeg(idx, "amountPerTon", e.target.value)}
                  placeholder="e.g. 2500"
                  className="load-details-input"
                  disabled={locked}
                />
              </div>
              <div className="col-md-6">
                <label className="load-details-flabel">Estimated Amount</label>
                <input
                  value={estimatedAmount}
                  type="number"
                  placeholder="Est. Amount"
                  className="load-details-input"
                  readOnly
                />
              </div>
            </div>

            <div className="row g-3" style={{ marginBottom: "14px" }}>
              <div className="col-md-6">
                <label className="load-details-flabel">Payment Type</label>
                <select
                  className="load-details-input"
                  value={leg.paymentType || ""}
                  onChange={(e) => updateLeg(idx, "paymentType", e.target.value)}
                  disabled={locked}
                >
                  <option value="" disabled>Select</option>
                  <option>Account</option>
                  <option>Cash</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="load-details-flabel">Load Type</label>
                <select
                  className="load-details-input"
                  value={leg.loadType || ""}
                  onChange={(e) => updateLeg(idx, "loadType", e.target.value)}
                  disabled={locked}
                >
                  <option value="" disabled>Select</option>
                  <option>FTL</option>
                  <option>PTL</option>
                </select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoadFreightDetails;