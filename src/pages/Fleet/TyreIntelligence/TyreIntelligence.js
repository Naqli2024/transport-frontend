import { useState, useMemo } from "react";

const TYRES = [
  { id:"TYR-B01", tin:"MRF-CH-17-23-0042",  brand:"MRF",         pos:"FL",    vehicle:"TN69 GH4789", risk:"healthy",  km:8200,  tread:7.2 },
  { id:"TYR-B02", tin:"CEA-NA-08-23-1187",  brand:"CEAT",        pos:"FR",    vehicle:"TN69 GH4789", risk:"warning",  km:1800,  tread:3.8 },
  { id:"TYR-X01", tin:"APL-NA-32-22-0891",  brand:"Apollo",      pos:"RL1",   vehicle:"TN69 GH4789", risk:"critical", km:420,   tread:2.1 },
  { id:"TYR-X02", tin:"MRF-CH-21-22-0318",  brand:"MRF",         pos:"RR1",   vehicle:"TN69 GH4789", risk:"healthy",  km:7100,  tread:6.9 },
  { id:"TYR-X03", tin:"APL-NA-14-22-0556",  brand:"Apollo",      pos:"RL2",   vehicle:"TN69 GH4789", risk:"retread",  km:2800,  tread:4.5 },
  { id:"TYR-X04", tin:"CEA-NA-27-23-0834",  brand:"CEAT",        pos:"RR2",   vehicle:"TN69 GH4789", risk:"warning",  km:1400,  tread:3.2 },
  { id:"TYR-X05", tin:"BRG-PU-06-23-0077",  brand:"Bridgestone", pos:"RL3",   vehicle:"TN69 GH4789", risk:"healthy",  km:6800,  tread:7.0 },
  { id:"TYR-X06", tin:"MRF-CH-09-23-0719",  brand:"MRF",         pos:"RR3",   vehicle:"TN69 GH4789", risk:"healthy",  km:5900,  tread:6.4 },
  { id:"TYR-SP1", tin:"MRF-CH-01-24-0003",  brand:"MRF",         pos:"Spare", vehicle:"TN69 GH4789", risk:"healthy",  km:9800,  tread:8.8 },
  { id:"TYR-B01", tin:"BRG-PU-44-22-0112",  brand:"Bridgestone", pos:"FL",    vehicle:"TN59 AB1234", risk:"healthy",  km:6200,  tread:6.8 },
  { id:"TYR-B02", tin:"BRG-PU-44-22-0113",  brand:"Bridgestone", pos:"FR",    vehicle:"TN59 AB1234", risk:"healthy",  km:5800,  tread:6.1 },
  { id:"TYR-B03", tin:"MRF-CH-29-22-0481",  brand:"MRF",         pos:"RL1",   vehicle:"TN59 AB1234", risk:"warning",  km:2200,  tread:3.6 },
  { id:"TYR-B04", tin:"MRF-CH-29-22-0482",  brand:"MRF",         pos:"RR1",   vehicle:"TN59 AB1234", risk:"healthy",  km:4100,  tread:5.2 },
];


function riskClass(r)   { return `risk-${r}`; }
function kmClass(t)     { return t === "critical" ? "km-critical" : t === "warning" ? "km-warning" : ""; }
function treadClass(t)  {
  if (t === "critical") return "tread-critical";
  if (t === "warning")  return "tread-warning";
  if (t === "retread")  return "tread-retread";
  return "";
}
function posClass(p) {
  if (p === "FL" || p === "FR") return "pos-FL";
  if (p.startsWith("RL")) return "pos-RL1";
  if (p.startsWith("RR")) return "pos-RR1";
  return "pos-Spare";
}

const RISK_ICON = { healthy:"●", warning:"▲", critical:"!", retread:"↺" };


export default function TyreIntelligence() {
  const [theme,  setTheme]  = useState("dark");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortCol, setSortCol] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let rows = [...TYRES];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.id.toLowerCase().includes(q) ||
        r.tin.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.vehicle.toLowerCase().includes(q)
      );
    }
    if (filter !== "all") rows = rows.filter(r => r.risk === filter);
    rows.sort((a, b) => {
      let av = a[sortCol], bv = b[sortCol];
if (typeof av === "string" && typeof bv === "string") {
  av = av.toLowerCase();
  bv = bv.toLowerCase();
}
      const d = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? d : -d;
    });
    return rows;
  }, [search, filter, sortCol, sortDir]);

  const stats = useMemo(() => ({
    total:    TYRES.length,
    critical: TYRES.filter(t => t.risk === "critical").length,
    warning:  TYRES.filter(t => t.risk === "warning").length,
    healthy:  TYRES.filter(t => t.risk === "healthy").length,
  }), []);

  const criticals = TYRES.filter(t => t.risk === "critical");

  const SortTh = ({ col, children }) => (
    <th
      className={`sortable${sortCol === col ? " sortable-active" : ""}`}
      onClick={() => handleSort(col)}
    >
      {children}
      <span className="sort-icon">
        {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
      </span>
    </th>
  );

  return (
    <div className="tyre-app" data-theme={theme} data-industry="tyre">


      <header className="topbar">
        <div className="topbar-brand">
          <div className="topbar-title">
            Tyre <span>Intelligence</span>
          </div>
          <div className="topbar-sub">
            {["TIN tracking","Rotation scheduling","Lifecycle management"].map(t => (
              <em key={t}>{t}</em>
            ))}
          </div>
        </div>
        
      </header>

      <main className="main">


        <div className="stat-grid">
          {[
            { cls:"sc-total",    val:stats.total,    lbl:"Total Tyres" },
            { cls:"sc-critical", val:stats.critical, lbl:"Critical" },
            { cls:"sc-warning",  val:stats.warning,  lbl:"Warning" },
            { cls:"sc-healthy",  val:stats.healthy,  lbl:"Healthy" },
          ].map(s => (
            <div className={`stat-card ${s.cls}`} key={s.lbl}>
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>


        {criticals.length > 0 && (
          <section className="critical-panel">
            <div className="cp-header">
              <span>🚨</span>
              <span className="cp-title">Critical — Replace Before Next Trip</span>
            </div>
            {criticals.map((t, i) => (
              <div className="cp-item" key={i}>
                <div>
                  <div className="cp-item-id">{t.id} — {t.tin}</div>
                  <div className="cp-item-meta">
                    {t.brand} · {t.km.toLocaleString()} km left · Tread: {t.tread}mm
                  </div>
                </div>
                <button className="btn-replace">Replace</button>
              </div>
            ))}
          </section>
        )}


        <div className="table-section">
          <div className="table-toolbar">
            <div className="table-toolbar-left">
              <div className="search-wrap">
                <span className="ico">🔍</span>
                <input
                  className="search-input"
                  placeholder="Search ID, TIN, brand…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <option value="all">All Risk</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="retread">Retread</option>
                <option value="healthy">Healthy</option>
              </select>
            </div>
            <span className="table-count">{filtered.length} tyres</span>
          </div>

          <div className="table-wrap">
            <table className="tyre-table">
              <thead>
                <tr>
                  <SortTh col="id">ID</SortTh>
                  <SortTh col="tin">TIN</SortTh>
                  <SortTh col="brand">Brand</SortTh>
                  <SortTh col="pos">Position</SortTh>
                  <SortTh col="vehicle">Vehicle</SortTh>
                  <SortTh col="risk">Risk</SortTh>
                  <SortTh col="km">KM Left</SortTh>
                  <SortTh col="tread">Tread↕</SortTh>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={i} className={t.risk === "critical" ? "row-critical" : ""}>
                    <td className="col-id">{t.id}</td>
                    <td className="col-tin">{t.tin}</td>
                    <td className="col-brand">{t.brand}</td>
                    <td>
                      <span className={`pos-badge ${posClass(t.pos)}`}>{t.pos}</span>
                    </td>
                    <td className="col-vehicle">
                      <strong>{t.vehicle.split(" ")[0]}</strong>{" "}
                      {t.vehicle.split(" ").slice(1).join(" ")}
                    </td>
                    <td>
                      <span className={`risk-badge ${riskClass(t.risk)}`}>
                        <span>{RISK_ICON[t.risk]}</span>
                        {t.risk}
                      </span>
                    </td>
                    <td className={`col-km ${kmClass(t.risk)}`}>
                      {t.km.toLocaleString()}
                    </td>
                    <td className={`col-tread ${treadClass(t.risk)}`}>
                      {t.tread}mm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}