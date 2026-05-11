import React, { useState } from "react";

const BACKHAUL_LOADS = [
  {
    id: "BH-001", fromCity: "Bangalore", toCity: "Chennai",
    distance: 350, material: "Electronics", qty: "8T",
    rate: 28000, margin: 9800, emptyKm: 0,
    matchVehicle: "TN69 GH4789", postedBy: "Reliance Retail",
    postedAt: "2025-04-15 09:00", expiresAt: "2025-04-16 18:00",
    contact: "+91 98001 23456"
  },
  {
    id: "BH-002", fromCity: "Coimbatore", toCity: "Hyderabad",
    distance: 620, material: "Cotton Yarn", qty: "15T",
    rate: 48000, margin: 14200, emptyKm: 620,
    matchVehicle: null, postedBy: "KPR Mills",
    postedAt: "2025-04-15 11:00", expiresAt: "2025-04-17 12:00",
    contact: "+91 98002 34567"
  },
  {
    id: "BH-003", fromCity: "Mumbai", toCity: "Chennai",
    distance: 1330, material: "Auto Parts", qty: "12T",
    rate: 92000, margin: 31000, emptyKm: 1330,
    matchVehicle: null, postedBy: "Tata Motors",
    postedAt: "2025-04-14 08:00", expiresAt: "2025-04-16 20:00",
    contact: "+91 98003 45678"
  },
];
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const ReturnLoads = () => {
  const totalEmptyKm = BACKHAUL_LOADS.reduce((s, l) => s + l.emptyKm, 0);
  const totalRevOpp = BACKHAUL_LOADS.reduce((s, l) => s + l.rate, 0);
  const matchedLoads = BACKHAUL_LOADS.filter(l => l.matchVehicle);

  return (
    <div className="return-loads-page">
      <div className="return-loads-header">
        <div>
          <h1 className="heading">Return Load / Backhaul</h1>
          <p className="sub-heading">
            Reduce empty km · Match returning vehicles · Capture revenue
          </p>
        </div>
        <button className="btn btn-p">📋Post Available Truck</button>
      </div>
      <div className="return-loads-kpi-row">
        {[
          { l: "Available Loads", v: BACKHAUL_LOADS.length, c: "green" },
          { l: "Revenue Opportunity", v: fmt(totalRevOpp), c: "accent" },
          {
            l: "Empty KM Today", v: totalEmptyKm > 0
              ? totalEmptyKm.toLocaleString() + " km"
              : "Minimal", c: "orange"
          },
          { l: "Matched Vehicles", v: matchedLoads.length + " loads", c: "blue" },
        ].map(k => (
          <div key={k.l} className={`rl-stat return-loads-stat-${k.c}`}>
            <div className="stat-v">{k.v}</div>
            <div className="rl-stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="return-loads-tip-banner">
        💡 <strong className="return-loads-tip-strong">Backhaul saves ₹8-15/km</strong>
        <span className="return-loads-tip-text">
           in diesel + driver costs on empty return trips. A 480km empty run at ₹12/km = ₹5,760 direct loss. Backhaul converts this to ₹38,000+ revenue. Vehicles returning from Coimbatore, Bangalore, and Hyderabad are prime candidates.
        </span>
      </div>
      <div className="return-loads-list">
        {BACKHAUL_LOADS.map(load => (
          <div key={load.id}
            className={`return-loads-card ${load.matchVehicle? " return-loads-card-matched" : ""}`}
          >
            <div className="return-loads-card-top">
              <div>
                <div className="return-loads-card-route">
                  <span className="return-loads-card-icon">📦</span>
                  <span className="return-loads-card-route-label">
                    {load.fromCity} → {load.toCity}
                  </span>
                  <span className="return-loads-card-distance">
                    {load.distance} km
                  </span>
                  {load.matchVehicle && (
                    <span className="return-loads-match-badge">
                      ✅ Truck available: {load.matchVehicle}
                    </span>
                  )}
                </div>
                <div className="return-loads-card-meta">
                  {load.material} · {load.qty} · Posted by:{" "}
                  <span>{load.postedBy}</span>
                </div>
                <div className="return-loads-card-meta2">
                  Posted: {load.postedAt} · Expires:{" "}
                  <span className="return-loads-expire">{load.expiresAt}</span>
                  {" "}· Contact: <span className="mono">{load.contact}</span>
                </div>
              </div>
              <div className="return-loads-card-rate">
                <div className="return-loads-rate-value">{fmt(load.rate)}</div>
                <div className="return-loads-margin">
                  Margin:{" "}
                  <strong className="return-loads-margin-value">
                    {fmt(load.margin)}
                  </strong>
                </div>
                <div className="return-loads-per-km">
                  ₹{Math.round(load.rate / load.distance)}/km
                </div>
              </div>
            </div>
            <div className="return-loads-card-actions">
              <button className="btn btn-p">✅ Accept Load</button>
              <button className="btn btn-b">📞 Call Poster</button>
              <button className="btn btn-gh">Negotiate Rate</button>
              {load.matchVehicle && (
                <button className="btn btn-g">
                 🚚 Assign {load.matchVehicle}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReturnLoads
