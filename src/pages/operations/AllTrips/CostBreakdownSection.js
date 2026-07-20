import React from "react";

const CostBreakdownSection = ({ form, set }) => {
  return (
    <div>
      <div className="costs-break-diesel-card">
        
        <div className="row g-3" style={{ marginBottom: "14px" }}>
          <div className="col-md-6">
            <label className="costs-break-flabel"> Diesel Amount (₹)</label>
            <input
              className="costs-break-input"
              value={form.dieselAmount}
              onChange={(e) => set("dieselAmount", e.target.value)}
              placeholder="12000"
            />
          </div>
           <div className="col-md-6">
          <label className="costs-break-flabel">Toll (₹)</label>
          <input
            className="costs-break-input"
            value={form.tollAmount}
            onChange={(e) => set("tollAmount", e.target.value)}
            placeholder="0"
          />
        </div>
        </div>
        <div className="row g-3" style={{ marginBottom: "14px" }}>
       
        <div className="col-md-6">
          <label className="costs-break-flabel">Loading (₹)</label>
          <input
            className="costs-break-input"
            value={form.loadingAmount}
            onChange={(e) => set("loadingAmount", e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="col-md-6">
          <label className="costs-break-flabel">Unloading (₹)</label>
          <input
            className="costs-break-input"
            value={form.unloadingAmount}
            onChange={(e) => set("unloadingAmount", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
      <div className="row g-3" style={{ marginBottom: "14px" }}>
        <div className="col-md-6">
          <label className="costs-break-flabel">Commission (₹)</label>
          <input
            className="costs-break-input"
            value={form.commissionAmount}
            onChange={(e) => set("commissionAmount", e.target.value)}
            placeholder="0"
          />
        </div>
     
      </div>
      </div>
      
      
    </div>
  );
};

export default CostBreakdownSection;
