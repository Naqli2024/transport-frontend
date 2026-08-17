import { useState } from "react";


const HERO = [
  { val: "₹2,80,000", label: "TOTAL FREIGHT REVENUE", cls: "hc-green"  },
  { val: "₹2,07,460", label: "TOTAL EXPENSES",         cls: "hc-red"    },
  { val: "₹72,540",   label: "NET PROFIT (MTD)",        cls: "hc-accent" },
];

const TRIPS = [
  {
    trip: "TRP-2025-0041", type: "Own",    typeCls: "type-own",
    party: "Mani Kumar",
    freight: "₹42,000", expenses: "₹16,500", profit: "₹25,500", margin: "60.7%",
    isLoss: false, stripeCls: "stripe-profit",
    profitCls: "", marginCls: "margin-high",
  },
  {
    trip: "TRP-2025-0042", type: "Own",    typeCls: "type-own",
    party: "Selvam R",
    freight: "₹38,000", expenses: "₹14,700", profit: "₹23,300", margin: "61.3%",
    isLoss: false, stripeCls: "stripe-profit",
    profitCls: "", marginCls: "margin-high",
  },
  {
    trip: "TRP-2025-0043", type: "Vendor", typeCls: "type-vendor",
    party: "Sri Murugan Transport",
    freight: "₹75,000", expenses: "₹61,760", profit: "₹13,240", margin: "17.7%",
    isLoss: false, stripeCls: "stripe-profit",
    profitCls: "", marginCls: "",
  },
  {
    trip: "TRP-2025-0044", type: "Own",    typeCls: "type-own",
    party: "Arjun D",
    freight: "₹33,000", expenses: "₹12,100", profit: "₹20,900", margin: "63.3%",
    isLoss: false, stripeCls: "stripe-profit",
    profitCls: "", marginCls: "margin-high",
  },
  {
    trip: "TRP-2025-0045", type: "Vendor", typeCls: "type-vendor",
    party: "KPR Fleet Solutions",
    freight: "₹92,000", expenses: "₹1,02,400", profit: "₹-10,400", margin: "-11.3%",
    isLoss: true,  stripeCls: "stripe-loss",
    profitCls: "profit-neg", marginCls: "margin-neg",
  },
];

function TripRow({ t }) {
  return (
    <tr className={t.isLoss ? "row-loss" : ""}>
      <td><span className="td-trip">{t.trip}</span></td>
      <td><span className={`fp-type ${t.typeCls}`}>{t.type}</span></td>
      <td><span className="td-party">{t.party}</span></td>
      <td><span className="td-freight">{t.freight}</span></td>
      <td><span className="td-expenses">{t.expenses}</span></td>
      <td><span className={`td-profit ${t.profitCls}`}>{t.profit}</span></td>
      <td><span className={`td-margin ${t.marginCls}`}>{t.margin}</span></td>
    </tr>
  );
}

function TripCard({ t }) {
  return (
    <div className={`fp-trip-card ${t.stripeCls} ${t.isLoss ? "row-loss" : ""}`}>
      <div className="fp-tc-head">
        <div className="fp-tc-id-block">
          <span className="fp-tc-trip">{t.trip}</span>
          <span className={`fp-type ${t.typeCls}`}>{t.type}</span>
        </div>
        <span className={`fp-tc-val ${t.isLoss ? "val-loss" : "val-profit"}`}>{t.profit}</span>
      </div>
      <div className="fp-tc-rows">
        <div className="fp-tc-row"><span className="fp-tc-label">Party</span>    <span className="fp-tc-val">{t.party}</span></div>
        <div className="fp-tc-row"><span className="fp-tc-label">Freight</span>  <span className="fp-tc-val val-green">{t.freight}</span></div>
        <div className="fp-tc-row"><span className="fp-tc-label">Expenses</span> <span className="fp-tc-val val-red">{t.expenses}</span></div>
        <div className="fp-tc-row"><span className="fp-tc-label">Margin</span>   <span className={`fp-tc-val ${t.isLoss ? "val-loss" : "val-profit"}`}>{t.margin}</span></div>
      </div>
    </div>
  );
}

export default function Finance() {
  const [theme, setTheme] = useState("dark");

  return (
    <div data-theme={theme}>

    
      <div className="fp-topbar">
        <div className="fp-topbar-left">
          <h1>Finance &amp; P&amp;L</h1>
          <div className="fp-topbar-sub">
            Trip-level profitability — own fleet vs vendor analysis
          </div>
        </div>
      
      </div>

      <div className="fp-main">

      
        <div className="fp-hero-row">
          {HERO.map(h => (
            <div key={h.label} className={`fp-hero-card ${h.cls}`}>
              <div className="fp-hero-val">{h.val}</div>
              <div className="fp-hero-label">{h.label}</div>
            </div>
          ))}
        </div>

      
        <div className="fp-table-section">
          <div className="fp-table-scroll">
            <table className="fp-table">
              <thead>
                <tr>
                  <th>Trip</th>
                  <th>Type</th>
                  <th>Party</th>
                  <th>Freight</th>
                  <th>Expenses</th>
                  <th>Net Profit</th>
                  <th>Margin</th>
                </tr>
              </thead>
              <tbody>
                {TRIPS.map(t => <TripRow key={t.trip} t={t} />)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="fp-card-list">
          {TRIPS.map(t => <TripCard key={t.trip} t={t} />)}
        </div>

      </div>
    </div>
  );
}