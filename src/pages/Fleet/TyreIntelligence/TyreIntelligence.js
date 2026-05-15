import { useState, useMemo } from "react";

const TYRES = [
  {
    id: "TYR-B01",
    tin: "MRF-CH-17-23-0042",
    brand: "MRF",
    pos: "FL",
    vehicle: "TN69 GH4789",
    risk: "healthy",
    km: 8200,
    tread: 7.2,
  },
  {
    id: "TYR-B02",
    tin: "CEA-NA-08-23-1187",
    brand: "CEAT",
    pos: "FR",
    vehicle: "TN69 GH4789",
    risk: "warning",
    km: 1800,
    tread: 3.8,
  },
  {
    id: "TYR-X01",
    tin: "APL-NA-32-22-0891",
    brand: "Apollo",
    pos: "RL1",
    vehicle: "TN69 GH4789",
    risk: "critical",
    km: 420,
    tread: 2.1,
  },
  {
    id: "TYR-X02",
    tin: "MRF-CH-21-22-0318",
    brand: "MRF",
    pos: "RR1",
    vehicle: "TN69 GH4789",
    risk: "healthy",
    km: 7100,
    tread: 6.9,
  },
  {
    id: "TYR-X03",
    tin: "APL-NA-14-22-0556",
    brand: "Apollo",
    pos: "RL2",
    vehicle: "TN69 GH4789",
    risk: "retread",
    km: 2800,
    tread: 4.5,
  },
  {
    id: "TYR-X04",
    tin: "CEA-NA-27-23-0834",
    brand: "CEAT",
    pos: "RR2",
    vehicle: "TN69 GH4789",
    risk: "warning",
    km: 1400,
    tread: 3.2,
  },
  {
    id: "TYR-X05",
    tin: "BRG-PU-06-23-0077",
    brand: "Bridgestone",
    pos: "RL3",
    vehicle: "TN69 GH4789",
    risk: "healthy",
    km: 6800,
    tread: 7.0,
  },
  {
    id: "TYR-X06",
    tin: "MRF-CH-09-23-0719",
    brand: "MRF",
    pos: "RR3",
    vehicle: "TN69 GH4789",
    risk: "healthy",
    km: 5900,
    tread: 6.4,
  },
  {
    id: "TYR-SP1",
    tin: "MRF-CH-01-24-0003",
    brand: "MRF",
    pos: "Spare",
    vehicle: "TN69 GH4789",
    risk: "healthy",
    km: 9800,
    tread: 8.8,
  },
  {
    id: "TYR-B01",
    tin: "BRG-PU-44-22-0112",
    brand: "Bridgestone",
    pos: "FL",
    vehicle: "TN59 AB1234",
    risk: "healthy",
    km: 6200,
    tread: 6.8,
  },
  {
    id: "TYR-B02",
    tin: "BRG-PU-44-22-0113",
    brand: "Bridgestone",
    pos: "FR",
    vehicle: "TN59 AB1234",
    risk: "healthy",
    km: 5800,
    tread: 6.1,
  },
  {
    id: "TYR-B03",
    tin: "MRF-CH-29-22-0481",
    brand: "MRF",
    pos: "RL1",
    vehicle: "TN59 AB1234",
    risk: "warning",
    km: 2200,
    tread: 3.6,
  },
  {
    id: "TYR-B04",
    tin: "MRF-CH-29-22-0482",
    brand: "MRF",
    pos: "RR1",
    vehicle: "TN59 AB1234",
    risk: "healthy",
    km: 4100,
    tread: 5.2,
  },
];

function riskClass(r) {
  return `risk-${r}`;
}
function kmClass(t) {
  return t === "critical" ? "tyre-intelligence-km-critical" : t === "warning" ? "tyre-intelligence-km-warning" : "";
}
function treadClass(t) {
  if (t === "critical") return "tread-critical";
  if (t === "warning") return "tread-warning";
  if (t === "retread") return "tread-retread";
  if (t === "healthy") return "tread-healthy";
  return "";
}
function posClass(p) {
  if (p === "FL" || p === "FR") return "pos-FL";
  if (p.startsWith("RL")) return "pos-RL1";
  if (p.startsWith("RR")) return "pos-RR1";
  return "pos-Spare";
}

export default function TyreIntelligence() {
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortCol, setSortCol] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const stats = useMemo(
    () => ({
      total: TYRES.length,
      critical: TYRES.filter((t) => t.risk === "critical").length,
      warning: TYRES.filter((t) => t.risk === "warning").length,
      healthy: TYRES.filter((t) => t.risk === "healthy").length,
    }),
    [],
  );

  const criticals = TYRES.filter((t) => t.risk === "critical");

  return (
    <div className="tyre-app" data-theme={theme} data-industry="tyre">
      <header className="tyre-intelligence-topbar">
        <div className="tyre-intelligence-topbar-brand">
          <div className="heading">Tyre Intelligence</div>
          <div className="sub-heading">
            TIN tracking · Rotation scheduling · Lifecycle management
          </div>
        </div>
        <div className="bo-page-hdr-right">
          <button className="bo-btn bo-btn-primary">+ Add Tyre</button>
        </div>
      </header>

      <div className="tyre-intelligence-main mt-4">
        <div className="tyre-intelligence-stat-grid">
          {[
            {
              cls: "tyre-intelligence-sc-total",
              val: stats.total,
              lbl: "Total Tyres",
            },
            {
              cls: "tyre-intelligence-sc-critical",
              val: stats.critical,
              lbl: "Critical",
            },
            {
              cls: "tyre-intelligence-sc-warning",
              val: stats.warning,
              lbl: "Warning",
            },
            {
              cls: "tyre-intelligence-sc-healthy",
              val: stats.healthy,
              lbl: "Healthy",
            },
          ].map((s) => (
            <div className={`tyre-intelligence-stat-card ${s.cls}`} key={s.lbl}>
              <div className="tyre-intelligence-stat-val">{s.val}</div>

              <div className="tyre-intelligence-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        {criticals.length > 0 && (
          <section className="tyre-intelligence-critical-panel">
            <div className="tyre-intelligence-cp-header">
              <span>🚨</span>

              <span className="tyre-intelligence-cp-title">
                Critical — Replace Before Next Trip
              </span>
            </div>

            {criticals.map((t, i) => (
              <div className="tyre-intelligence-cp-item" key={i}>
                <div>
                  <div className="tyre-intelligence-cp-item-id">
                    {t.id} — {t.tin}
                  </div>

                  <div className="tyre-intelligence-cp-item-meta">
                    {t.brand} · {t.km.toLocaleString()} km left · Tread:{" "}
                    {t.tread}mm
                  </div>
                </div>

                <button className="tyre-intelligence-btn-replace">
                  Replace
                </button>
              </div>
            ))}
          </section>
        )}
         <div className="he-search-wrap mb-4">
              <span className="he-search-icon">⌕</span>
              <input
                className="he-search-input"
                placeholder="Search id, model, site…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
        <div className="he-tbl-card">
          <table className="he-tbl">
            <thead>
              <tr>
                <th col="id">ID</th>
                <th col="tin">TIN</th>
                <th col="brand">Brand</th>
                <th col="pos">Position</th>
                <th col="vehicle">Vehicle</th>
                <th col="risk">Risk</th>
                <th col="km">KM Left</th>
                <th col="tread">Tread</th>
              </tr>
            </thead>
            <tbody className="tyre-intelligence-table-body">
              {TYRES.map((t, i) => (
                <tr
                  key={i}
                  className={
                    t.risk === "critical"
                      ? "tyre-intelligence-row-critical"
                      : ""
                  }
                >
                  <td className="tyre-intelligence-col-id">{t.id}</td>
                  <td className="tyre-intelligence-col-tin">{t.tin}</td>
                  <td className="tyre-intelligence-col-brand">{t.brand}</td>
                  <td>
                    <span
                      className={`tyre-intelligence-pos-badge ${posClass(
                        t.pos,
                      )}`}
                    >
                      {t.pos}
                    </span>
                  </td>
                  <td className="tyre-intelligence-col-vehicle">
                    {t.vehicle}
                  </td>
                  <td>
                    <span
                      className={`tyre-intelligence-risk-badge ${riskClass(
                        t.risk,
                      )}`}
                    >
                      {t.risk}
                    </span>
                  </td>
                  <td className={`tyre-intelligence-col-km ${kmClass(t.risk)}`}>
                    {t.km.toLocaleString()}
                  </td>
                  <td
                    className={`tyre-intelligence-col-tread ${treadClass(
                      t.risk,
                    )}`}
                  >
                    {t.tread}mm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
