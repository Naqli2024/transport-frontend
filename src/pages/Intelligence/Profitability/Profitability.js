import React, { useState } from "react";
import {
  FaDownload,
  FaMoon,
  FaSun,
  FaExclamationTriangle,
} from "react-icons/fa";

const stats = [
  {
    value: "₹2,37,60,000",
    label: "Total Revenue",
    className: "sc-green",
  },
  {
    value: "₹64,27,000",
    label: "Total Cost",
    className: "sc-red",
  },
  {
    value: "₹1,73,33,000",
    label: "Net Profit",
    className: "sc-accent",
  },
  {
    value: "73.0%",
    label: "Overall Margin",
    className: "sc-blue",
  },
  {
    value: "2",
    label: "Cost Leaks Found",
    className: "sc-orange",
  },
];

const leaks = [
  {
    text: "Vehicle TN45 CD5678 — maintenance cost 31% of revenue",
    severity: "high",
    save: "₹2,80,000",
  },
  {
    text: "Fuel efficiency below target on 2 vehicles — est. 12% fuel waste",
    severity: "medium",
    save: "₹85,000",
  },
  {
    text: "2 vendor trips with negative margin (cost > freight)",
    severity: "high",
    save: "₹46,400",
  },
  {
    text: "Driver advances outstanding > 30d — cash flow impact",
    severity: "medium",
    save: "₹22,700",
  },
  {
    text: "Tyre replacement due on 3 vehicles — cost if breakdown: 3x",
    severity: "medium",
    save: "₹15,000",
  },
];

const vehicleProfit = [
  {
    id: "TN69 GH4789",
    revenue: "₹48,20,000",
    cost: "₹12,99,000",
    profit: "₹35,21,000",
    margin: "73.0%",
    revWidth: "92%",
    costWidth: "26%",
  },
  {
    id: "TN59 AB1234",
    revenue: "₹39,50,000",
    cost: "₹10,78,000",
    profit: "₹28,72,000",
    margin: "72.7%",
    revWidth: "85%",
    costWidth: "28%",
  },
  {
    id: "TN38 EF9012",
    revenue: "₹28,70,000",
    cost: "₹7,32,000",
    profit: "₹21,38,000",
    margin: "74.5%",
    revWidth: "78%",
    costWidth: "25%",
  },
  {
    id: "TN71 GH3456",
    revenue: "₹51,00,000",
    cost: "₹11,02,000",
    profit: "₹39,98,000",
    margin: "78.4%",
    revWidth: "96%",
    costWidth: "21%",
  },
  {
    id: "TN22 IJ7890",
    revenue: "₹8,20,000",
    cost: "₹2,62,000",
    profit: "₹5,58,000",
    margin: "68.0%",
    revWidth: "60%",
    costWidth: "32%",
  },
  {
    id: "TN45 CD5678",
    revenue: "₹62,00,000",
    cost: "₹19,54,000",
    profit: "₹42,46,000",
    margin: "68.5%",
    revWidth: "100%",
    costWidth: "31%",
  },
];

const cpkmData = [
  {
    id: "TN69 GH4789",
    value: "₹17.35/km",
    width: "72%",
    fillClass: "cpkm-fill-orange",
  },
  {
    id: "TN59 AB1234",
    value: "₹11.67/km",
    width: "48%",
    fillClass: "cpkm-fill-green",
  },
  {
    id: "TN38 EF9012",
    value: "₹13.50/km",
    width: "55%",
    fillClass: "cpkm-fill-teal",
  },
  {
    id: "TN71 GH3456",
    value: "₹12.39/km",
    width: "51%",
    fillClass: "cpkm-fill-green",
  },
  {
    id: "TN22 IJ7890",
    value: "₹8.33/km",
    width: "34%",
    fillClass: "cpkm-fill-green",
  },
  {
    id: "TN45 CD5678",
    value: "₹15.76/km",
    width: "66%",
    fillClass: "cpkm-fill-orange",
  },
];

export default function Profitability() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [theme, setTheme] = useState("dark");

  return (
    <div data-theme={theme}>
      <div className="profitability-topbar">
        <div className="profitability-topbar-left">
          <h1>Profitability Command Center</h1>

          <div className="profitability-topbar-sub">
            Vehicle-wise P&L, cost breakdown, margin analytics & leak detection
          </div>
        </div>
      </div>
      <div className="profitability-main">
        <div className="profitability-stat-row">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`profitability-stat-card ${item.className}`}
            >
              <  div className="profitability-stat-val">{item.value}</div>

              <div className="profitability-stat-label">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="profitability-leak-banner">
          <div className="profitability-leak-header">
            <div className="profitability-leak-icon">
              <FaExclamationTriangle  color="white"/>
            </div>

            <div className="profitability-leak-title">
              Profitability Leak Detection — ₹4,49,100 At Risk
            </div>
          </div>
          <div className="profitability-leak-list">
            {leaks.map((item, index) => (
              <div key={index} className="profitability-leak-row">
                <div className="profitability-leak-text">{item.text}</div>
                <div className="profitability-leak-right">
                  <div
                    className={`profitability-severity ${
                      item.severity === "high" ? "sev-high" : "sev-medium"
                    }`}
                  >
                    {item.severity}
                  </div>
                  <div className="profitability-save">Save {item.save}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="profitability-tabs">
          {["Overview", "Vehicle P&L", "Cost Breakdown", "Benchmarks"].map(
            (tab) => (
              <button
                key={tab}
                className={`profitability-tab-btn ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ),
          )}
        </div>
        <div className="profitability-overview-grid">
          <div className="profitability-panel">
            <div className="pc-panel-title">Revenue VS Cost by Vehicle</div>
            {vehicleProfit.map((vehicle, index) => (
              <div className="profitability-veh-row" key={index}>
                <div className="profitability-veh-top">
                  <div className="profitability-veh-id">{vehicle.id}</div>

                  <div className="profitability-veh-summary">
                    <span className="rev">{vehicle.revenue}</span>

                    <span className="sep">−</span>

                    <span className="cost">{vehicle.cost}</span>

                    <span className="sep">=</span>

                    <span className="prof">{vehicle.profit}</span>

                    <span className="margin"> ({vehicle.margin})</span>
                  </div>
                </div>
                <div className="profitability-dual-bar">
                  <div className="profitability-bar-track">
                    <div
                      className="profitability-bar-fill fill-rev"
                      style={{
                        width: vehicle.revWidth,
                      }}
                    />
                  </div>
                  <div className="profitability-bar-track">
                    <div
                      className="profitability-bar-fill fill-cost"
                      style={{
                        width: vehicle.costWidth,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="profitability-panel">
            <div className="profitability-panel-title">
              Cost Per KM by Vehicle
            </div>
            {cpkmData.map((item, index) => (
              <div className="profitability-cpkm-row" key={index}>
                <div className="profitability-cpkm-id">{item.id}</div>
                <div className="profitability-cpkm-bar-wrap">
                  <div className="profitability-cpkm-track">
                    <div
                      className={`profitability-cpkm-fill ${item.fillClass}`}
                      style={{
                        width: item.width,
                      }}
                    />
                  </div>
                </div>
                <div className="profitability-cpkm-val">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
