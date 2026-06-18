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
];

function riskClass(r) {
  return `risk-${r}`;
}

function kmClass(t) {
  return t === "critical"
    ? "tyre-intelligence-km-critical"
    : t === "warning"
      ? "tyre-intelligence-km-warning"
      : "";
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
  const [theme] = useState("dark");

  const [tyres, setTyres] = useState(TYRES);

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    tin: "",
    brand: "",
    pos: "FL",
    vehicle: "",
    risk: "healthy",
    km: "",
    tread: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTyre = (e) => {
    e.preventDefault();

    const newTyre = {
      ...formData,
      km: Number(formData.km),
      tread: Number(formData.tread),
    };

    setTyres([...tyres, newTyre]);

    setFormData({
      id: "",
      tin: "",
      brand: "",
      pos: "FL",
      vehicle: "",
      risk: "healthy",
      km: "",
      tread: "",
    });

    setOpenModal(false);
  };

  const stats = useMemo(
    () => ({
      total: tyres.length,
      critical: tyres.filter((t) => t.risk === "critical").length,
      warning: tyres.filter((t) => t.risk === "warning").length,
      healthy: tyres.filter((t) => t.risk === "healthy").length,
    }),
    [tyres],
  );

  const criticals = tyres.filter((t) => t.risk === "critical");

  return (
    <div className="tyre-app" data-theme={theme}>
      {/* TOPBAR */}
      <header className="tyre-intelligence-topbar">
        <div>
          <div className="heading">Tyre Intelligence</div>

          <div className="sub-heading">
            TIN tracking · Rotation scheduling · Lifecycle management
          </div>
        </div>

        <button
          className="bo-btn bo-btn-primary"
          onClick={() => setOpenModal(true)}
        >
          + Add Tyre
        </button>
      </header>

      {/* STATS */}
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

      {/* CRITICAL PANEL */}
      {criticals.length > 0 && (
        <section className="tyre-intelligence-critical-panel">
          <div className="tyre-intelligence-cp-header">
            🚨 Critical — Replace Before Next Trip
          </div>

          {criticals.map((t, i) => (
            <div className="tyre-intelligence-cp-item" key={i}>
              <div>
                <div className="tyre-intelligence-cp-item-id">
                  {t.id} — {t.tin}
                </div>

                <div className="tyre-intelligence-cp-item-meta">
                  {t.brand} · {t.km} km left · Tread: {t.tread}mm
                </div>
              </div>

              <button className="tyre-intelligence-btn-replace">
                Replace
              </button>
            </div>
          ))}
        </section>
      )}

      {/* TABLE */}
      <div className="he-tbl-card">
        <table className="he-tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>TIN</th>
              <th>Brand</th>
              <th>Position</th>
              <th>Vehicle</th>
              <th>Risk</th>
              <th>KM Left</th>
              <th>Tread</th>
            </tr>
          </thead>

          <tbody className="tyre-intelligence-table-body">
            {tyres.map((t, i) => (
              <tr key={i}>
                <td className="tyre-intelligence-col-id">{t.id}</td>

                <td className="tyre-intelligence-col-tin">{t.tin}</td>

                <td className="tyre-intelligence-col-brand">{t.brand}</td>

                <td>
                  <span
                    className={`tyre-intelligence-pos-badge ${posClass(t.pos)}`}
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

      {/* MODAL */}
      {openModal && (
        <div className="tyre-modal-overlay">
          <div className="tyre-modal">
            <div className="tyre-modal-header">
              <h3>Add New Tyre</h3>

              <button
                className="tyre-modal-close"
                onClick={() => setOpenModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTyre}>
              <div className="tyre-form-grid">
                <div className="tyre-form-group">
                  <label>Tyre ID</label>

                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>TIN</label>

                  <input
                    type="text"
                    name="tin"
                    value={formData.tin}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Brand</label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Vehicle</label>

                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Position</label>

                  <select
                    name="pos"
                    value={formData.pos}
                    onChange={handleChange}
                  >
                    <option>FL</option>
                    <option>FR</option>
                    <option>RL1</option>
                    <option>RR1</option>
                    <option>RL2</option>
                    <option>RR2</option>
                    <option>Spare</option>
                  </select>
                </div>

                <div className="tyre-form-group">
                  <label>Risk</label>

                  <select
                    name="risk"
                    value={formData.risk}
                    onChange={handleChange}
                  >
                    <option value="healthy">Healthy</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                    <option value="retread">Retread</option>
                  </select>
                </div>

                <div className="tyre-form-group">
                  <label>KM Left</label>

                  <input
                    type="number"
                    name="km"
                    value={formData.km}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tyre-form-group">
                  <label>Tread (mm)</label>

                  <input
                    type="number"
                    step="0.1"
                    name="tread"
                    value={formData.tread}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="tyre-modal-footer">
                <button
                  type="button"
                  className="tyre-btn-cancel"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="tyre-btn-save">
                  Save Tyre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}