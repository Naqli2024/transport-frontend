import React, { useState, useMemo } from 'react';
import LogHoursModal from './LogHoursModal';
import AddEquipmentModal from './AddEquipmentModal';

export const EQUIPMENT_TYPES = {
  backhoe:    { label:'Backhoe Loader',      icon:'🟡', avgRate:900,  avgFuel:5,  serviceInterval:250, lifeHours:12000, category:'earthmoving' },
  excavator:  { label:'Hydraulic Excavator', icon:'🦾', avgRate:1400, avgFuel:15, serviceInterval:500, lifeHours:15000, category:'earthmoving' },
  miniexcav:  { label:'Mini Excavator',      icon:'🔶', avgRate:600,  avgFuel:4,  serviceInterval:250, lifeHours:10000, category:'earthmoving' },
  roller:     { label:'Vibratory Roller',    icon:'🔵', avgRate:700,  avgFuel:8,  serviceInterval:300, lifeHours:12000, category:'compaction'  },
  crane:      { label:'Hydraulic Crane',     icon:'🏗️', avgRate:3500, avgFuel:22, serviceInterval:200, lifeHours:20000, category:'lifting'     },
  telehandler:{ label:'Telehandler',         icon:'🔧', avgRate:1100, avgFuel:7,  serviceInterval:300, lifeHours:12000, category:'handling'    },
  grader:     { label:'Motor Grader',        icon:'⚙️', avgRate:1600, avgFuel:18, serviceInterval:250, lifeHours:15000, category:'earthmoving' },
  concrete:   { label:'Concrete Mixer',      icon:'🔘', avgRate:450,  avgFuel:6,  serviceInterval:500, lifeHours:8000,  category:'concrete'    },
  transit:    { label:'Transit Mixer',       icon:'🚌', avgRate:2800, avgFuel:20, serviceInterval:500, lifeHours:null,  category:'concrete'    },
};

const EQUIPMENT_DATA = [
  { id:'EQ-001', regNo:'TN69 JCB001', type:'backhoe',   model:'JCB 3DX',      make:'JCB',  year:2021, purchaseCost:2800000, ownership:'Owned',    status:'On Site',   site:'Madurai Bypass NH7',     operator:'Kannan S',  engineHours:4286, lastServiceHours:4000, nextServiceHours:4250, fuelPerHour:5,  hourlyRate:900,  dailyMin:8, monthlyHours:180, deployed:true },
  { id:'EQ-002', regNo:'TN45 EXC01',  type:'excavator', model:'JCB NXT 215',  make:'JCB',  year:2022, purchaseCost:5200000, ownership:'Owned',    status:'Available', site:null,                     operator:null,        engineHours:2841, lastServiceHours:2500, nextServiceHours:3000, fuelPerHour:15, hourlyRate:1400, dailyMin:7, monthlyHours:150, deployed:false },
  { id:'EQ-003', regNo:'TN22 RLL01',  type:'roller',    model:'JCB VM115',    make:'JCB',  year:2020, purchaseCost:1600000, ownership:'Owned',    status:'On Site',   site:'Chennai Port Road',      operator:'Murugan V', engineHours:6120, lastServiceHours:6000, nextServiceHours:6300, fuelPerHour:8,  hourlyRate:700,  dailyMin:8, monthlyHours:200, deployed:true },
  { id:'EQ-004', regNo:'TN38 CRN01',  type:'crane',     model:'SANY STC500T', make:'SANY', year:2023, purchaseCost:12000000,ownership:'Financed', status:'On Site',   site:'Trichy Industrial Park', operator:'Raj Kumar', engineHours:1204, lastServiceHours:1000, nextServiceHours:1400, fuelPerHour:22, hourlyRate:3500, dailyMin:6, monthlyHours:120, deployed:true },
  { id:'EQ-005', regNo:'TN71 MXC01',  type:'miniexcav', model:'JCB 30Plus',   make:'JCB',  year:2023, purchaseCost:1400000, ownership:'Owned',    status:'Maintenance',site:null,                    operator:null,        engineHours:890,  lastServiceHours:750,  nextServiceHours:1000, fuelPerHour:4,  hourlyRate:600,  dailyMin:7, monthlyHours:160, deployed:false },
  { id:'EQ-006', regNo:'TN59 GRD01',  type:'grader',    model:'JCB 140G',     make:'JCB',  year:2021, purchaseCost:5800000, ownership:'Owned',    status:'Available', site:null,                     operator:null,        engineHours:3340, lastServiceHours:3000, nextServiceHours:3500, fuelPerHour:18, hourlyRate:1600, dailyMin:8, monthlyHours:160, deployed:false },
];

const EQ_CONTRACTS = [
  { id:'EC-001', eqId:'EQ-001', client:'NHAI Road Works',  site:'Madurai Bypass NH7',     type:'HYBRID',  hourlyRate:900,  shiftHoursPerDay:8, startDate:'2025-03-01', endDate:'2025-05-31', status:'ACTIVE'  },
  { id:'EC-002', eqId:'EQ-003', client:'L&T Construction', site:'Chennai Port Road',      type:'MONTHLY', hourlyRate:700,  shiftHoursPerDay:8, startDate:'2025-02-15', endDate:'2025-06-15', status:'ACTIVE'  },
  { id:'EC-003', eqId:'EQ-004', client:'TIDCO Projects',   site:'Trichy Industrial Park', type:'HOURLY',  hourlyRate:3500, shiftHoursPerDay:null, startDate:'2025-04-01', endDate:'2025-07-31', status:'ACTIVE' },
];

const SITE_LOGS_INIT = [
  { id:'SL-001', eqId:'EQ-001', site:'Madurai Bypass NH7',     client:'NHAI Road Works',  date:'2026-05-12', hoursWorked:9.5, billed:9.5, billAmount:8550,  status:'Billed',   approved:true  },
  { id:'SL-002', eqId:'EQ-001', site:'Madurai Bypass NH7',     client:'NHAI Road Works',  date:'2026-05-11', hoursWorked:8.0, billed:8.0, billAmount:7200,  status:'Billed',   approved:true  },
  { id:'SL-003', eqId:'EQ-003', site:'Chennai Port Road',      client:'L&T Construction', date:'2026-05-12', hoursWorked:10,  billed:10,  billAmount:7000,  status:'Pending',  approved:false },
  { id:'SL-004', eqId:'EQ-004', site:'Trichy Industrial Park', client:'TIDCO Projects',   date:'2026-05-12', hoursWorked:6.5, billed:6.5, billAmount:22750, status:'Pending',  approved:false },
  { id:'SL-005', eqId:'EQ-001', site:'Madurai Bypass NH7',     client:'NHAI Road Works',  date:'2026-05-10', hoursWorked:7.5, billed:8.0, billAmount:7200,  status:'Billed',   approved:true  },
  { id:'SL-006', eqId:'EQ-003', site:'Chennai Port Road',      client:'L&T Construction', date:'2026-05-11', hoursWorked:8.0, billed:8.0, billAmount:5600,  status:'Billed',   approved:true  },
];

const fmt = n =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
  : n >= 1000  ? `₹${(n / 1000).toFixed(1)}k`
  : `₹${n}`;

function calcHourlyRate(eq) {
  const spec    = EQUIPMENT_TYPES[eq.type] || {};
  const life    = spec.lifeHours || 12000;
  const annHrs  = (eq.monthlyHours || 160) * 12;
  const dep     = Math.round((eq.purchaseCost || 2800000) / life);
  const fuel    = Math.round((eq.fuelPerHour || spec.avgFuel || 8) * 96);
  const own     = Math.round((eq.purchaseCost || 2800000) * 0.10 / annHrs);
  const maint   = Math.round((eq.purchaseCost || 2800000) * 0.08 / annHrs);
  const op      = Math.round(15000 / (annHrs / 12));
  const cost    = dep + own + fuel + maint + op;
  return { cost, dep, fuel, own, maint, op, suggested: Math.round(cost * 1.25) };
}

function statusBadgeCls(s) {
  if (s === 'On Site')     return 'he-badge-green';
  if (s === 'Available')   return 'he-badge-blue';
  if (s === 'Maintenance') return 'he-badge-orange';
  return 'he-badge-amber';
}
function logStatusCls(s) {
  return s === 'Billed' ? 'he-badge-green' : 'he-badge-orange';
}

const HeavyEquipment = () => {
  const [tab,        setTab]        = useState('fleet');
  const [showAdd,    setShowAdd]    = useState(false);
  const [showLog,    setShowLog]    = useState(null);   
  const [equipment,  setEquipment]  = useState(EQUIPMENT_DATA);
  const [siteLogs,   setSiteLogs]   = useState(SITE_LOGS_INIT);
  const [search,     setSearch]     = useState('');

  const deployed    = equipment.filter(e => e.deployed);
  const nearService = equipment.filter(e => (e.nextServiceHours - e.engineHours) <= 100);
  const totalBilled = siteLogs
    .filter(l => l.status === 'Billed')
    .reduce((s, l) => s + l.billAmount, 0);

  const filteredEquip = useMemo(() =>
    equipment.filter(e => {
      const q           = search.toLowerCase();
      const matchSearch = !q || e.regNo.toLowerCase().includes(q)
        || e.model.toLowerCase().includes(q)
        || (e.site || '').toLowerCase().includes(q);
      return matchSearch;
    }),
    [equipment, search]
  );

  function handleAddEquipment(eq) {
    setEquipment(prev => [{ ...eq }, ...prev]);
  }

  function handleLogSave(log) {
    const newLog = {
      id:          `SL-${String(Date.now()).slice(-4)}`,
      eqId:        log.eqId,
      site:        log.site || showLog?.site || '—',
      client:      log.client || EQ_CONTRACTS.find(c => c.eqId === log.eqId)?.client || '—',
      date:        log.date,
      hoursWorked: log.worked,
      billed:      log.billed,
      billAmount:  log.billAmt,
      status:      'Pending',
      approved:    false,
    };
    setSiteLogs(prev => [newLog, ...prev]);
    setEquipment(prev => prev.map(e =>
      e.id === log.eqId ? { ...e, engineHours: Math.round(parseFloat(log.endHours || e.engineHours)) } : e
    ));
    setShowLog(null);
  }

  function approveLog(id) {
    setSiteLogs(prev => prev.map(l =>
      l.id === id ? { ...l, approved: true, status: 'Billed' } : l
    ));
  }


  const kpis = [
    { label:'Total Equipment', value: equipment.length,                                             color:'var(--blue)'},
    { label:'On Site',         value: deployed.length,                                              color:'var(--green)'},
    { label:'Available',       value: equipment.filter(e => e.status === 'Available').length,       color:'var(--cyan)'},
    { label:'Service Due',     value: nearService.length,                                           color:'var(--red)'},
    { label:'MTD Billed',      value: fmt(totalBilled),                                             color:'var(--accent)'},
  ];

  return (
    <div className="he-page">
      {showAdd && (
        <AddEquipmentModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAddEquipment}
        />
      )}
      {showLog && (
        <LogHoursModal
          equipment={showLog}
          contract={EQ_CONTRACTS.find(c => c.eqId === showLog.id)}
          onClose={() => setShowLog(null)}
          onSave={handleLogSave}
        />
      )}
      <div className="he-page-hdr">
        <div className="he-page-hdr-left">
          <h1 className="heading">Heavy Equipment</h1>
          <p className="sub-heading">
            JCB · Excavator · Crane · Roller — hours-based site billing
          </p>
        </div>
        <div className="he-page-hdr-right">
          {deployed.map(e => (
            <button key={e.id} className="he-btn he-btn-green-sm"
              onClick={() => setShowLog(e)}>
              ⏱ {e.regNo}
            </button>
          ))}
          <button className="vm-btn-add" onClick={() => setShowAdd(true)}>
            + Add Equipment
          </button>
        </div>
      </div>

      <div className="he-kpi-row">
        {kpis.map(k => (
          <div key={k.label} className="he-kpi-card" style={{ borderTopColor: k.color }}>
            <div className="he-kpi-icon">{k.icon}</div>
            <div className="he-kpi-val" style={{ color: k.color }}>{k.value}</div>
            <div className="he-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="vm-tabs mb-4">
        {[['fleet','Fleet'],['hours-log','Hours Log'],['rate-calc','Rate Calc']].map(([k, l]) => (
          <button key={k} className={`vm-tab-btn ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'fleet' && (
        <>
          <div className="he-filter-bar">
            <div className="he-search-wrap">
              <span className="he-search-icon">⌕</span>
              <input
                className="he-search-input"
                placeholder="Search reg, model, site…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className='he-fleet-container'>
            <div className="he-fleet-grid">
            {filteredEquip.map(eq => {
              const spec    = EQUIPMENT_TYPES[eq.type] || {};
              const htsLeft = eq.nextServiceHours - eq.engineHours;
              const lifePct = spec.lifeHours ? Math.min(Math.round((eq.engineHours / spec.lifeHours) * 100), 100) : null;
              const barColor = lifePct === null ? 'var(--textMuted)' : lifePct > 80 ? 'var(--red)' : lifePct > 60 ? 'var(--orange)' : 'var(--green)';
              const contract = EQ_CONTRACTS.find(c => c.eqId === eq.id);
              return (
                <div
                  key={eq.id}
                  className={`he-eq-card ${htsLeft < 0 ? 'he-card-overdue' : htsLeft <= 100 ? 'he-card-warn' : ''}`}
                >
                  <div style={{flex:"1"}}>
                  <div className="he-eq-card-head mb-3">
                    <div className="he-eq-card-id">
                      <span className="he-eq-type-icon">{spec.icon || '🏗️'}</span>
                      <div>
                        <div className="he-eq-regno">{eq.regNo}</div>
                        <div className="he-eq-model">{eq.model} · {eq.make} {eq.year}</div>
                      </div>
                    </div>
                    <span className={`he-status-badge ${statusBadgeCls(eq.status)}`}>
                      {eq.status}
                    </span>
                  </div>
                  <div className="he-engine-row">
                    <div className="he-engine-meta">
                      <span className="he-engine-label">Engine Hours</span>
                      <span className="he-engine-val">{eq.engineHours.toLocaleString()} hrs</span>
                    </div>
                    <div className="he-pbar">
                      <div className="he-pfill" style={{
                        width: `${lifePct || 40}%`,
                        background: barColor,
                      }} />
                    </div>
                    {lifePct !== null && (
                      <div className="he-life-pct" style={{ color: barColor }}>
                        {lifePct}% life
                      </div>
                    )}
                  </div>
                  <div className={`he-service-tag ${htsLeft < 0 ? 'he-svc-overdue' : htsLeft <= 100 ? 'he-svc-warn' : 'he-svc-ok'}`}>
                    <span>🔧</span>
                    <span>
                      {htsLeft < 0
                        ? `PM OVERDUE by ${Math.abs(htsLeft)}h`
                        : htsLeft === 0
                          ? 'PM DUE NOW'
                          : `Next PM in ${htsLeft}h`
                      }
                    </span>
                  </div>
                  <div className={`ms-2 he-site-tag ${eq.deployed ? 'he-site-active' : 'he-site-depot'}`}>
                    <span>{eq.deployed ? '📍' : '📦'}</span>
                    <span>{eq.deployed ? (eq.site || 'On Site') : 'At Depot'}</span>
                  </div>
                  {(eq.operator || contract) && (
                    <div className="he-eq-meta-row">
                      {eq.operator && (
                        <div className="he-eq-operator">
                          <span className="he-eq-meta-label">Operator</span>
                          <span className="he-eq-meta-val">{eq.operator}</span>
                        </div>
                      )}
                      {contract && (
                        <div className="he-eq-rate">
                          <span className="he-eq-meta-label">Rate</span>
                          <span className="he-eq-meta-val" style={{ color:'var(--accent)' }}>
                            ₹{contract.hourlyRate}/hr
                          </span>
                        </div>
                      )}
                    </div>
                  )}
</div>
                  <div className="he-eq-actions">
                    <button className="he-btn he-btn-log" onClick={() => setShowLog(eq)}>
                      ⏱ Log Hrs
                    </button>
                    <button className="he-btn he-btn-ghost-sm">
                      Details →
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredEquip.length === 0 && (
              <div className="he-empty">
                <div className="he-empty-icon">🏗️</div>
                <div>No equipment matches your filter</div>
              </div>
            )}
          </div>
          </div>
        </>
      )}

      {tab === 'hours-log' && (
        <div className="he-log-wrap">
          {siteLogs.length === 0 ? (
            <div className="he-empty">
              <div className="he-empty-icon">⏱️</div>
              <div>No logs yet — click ⏱ Log Hrs on a fleet card</div>
            </div>
          ) : (
            <div className="he-tbl-card">
              <table className="he-tbl">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Equipment</th>
                    <th>Site / Client</th>
                    <th>Worked</th>
                    <th>Billed</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {siteLogs.map(l => {
                    const eq   = equipment.find(e => e.id === l.eqId) || {};
                    const spec = EQUIPMENT_TYPES[eq.type] || {};
                    return (
                      <tr key={l.id}>
                        <td className="he-td-mono">{l.date}</td>
                        <td>
                          <div className="he-tbl-eq-cell">
                            <span>{spec.icon || '🏗️'}</span>
                            <div>
                              <div className="he-tbl-model">{eq.model || l.eqId}</div>
                              <div className="he-tbl-regno">{eq.regNo}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="he-tbl-site">{l.site}</div>
                          <div className="he-tbl-client">{l.client}</div>
                        </td>
                        <td>
                          <span className="he-td-orange">{l.hoursWorked}h</span>
                        </td>
                        <td>
                          <span style={{ color: l.billed > l.hoursWorked ? 'var(--orange)' : 'var(--green)', fontWeight:700 }}>
                            {l.billed}h
                          </span>
                        </td>
                        <td>
                          <span className="he-td-green he-td-bold">{fmt(l.billAmount)}</span>
                        </td>
                        <td>
                          <span className={`he-status-badge ${logStatusCls(l.status)}`}>{l.status}</span>
                        </td>
                        <td>
                          {!l.approved && (
                            <button className="he-btn he-btn-approve" onClick={() => approveLog(l.id)}>
                              ✓ Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'rate-calc' && (
        <div className="he-rate-list">
          <div className="he-section-title">AI Hourly Rate Breakdown — Cost vs Billing</div>
          {equipment.map(eq => {
            const spec   = EQUIPMENT_TYPES[eq.type] || {};
            const r      = calcHourlyRate(eq);
            const margin = eq.hourlyRate > 0
              ? Math.round(((eq.hourlyRate - r.cost) / eq.hourlyRate) * 100)
              : 0;
            const marginColor = margin < 15 ? 'var(--red)' : margin < 30 ? 'var(--orange)' : 'var(--green)';

            return (
              <div key={eq.id} className="he-rate-card">
                <div className="he-rate-card-head">
                  <div className="he-rate-eq-info">
                    <span className="he-rate-icon">{spec.icon || '🏗️'}</span>
                    <div>
                      <div className="he-rate-model">{eq.model}</div>
                      <div className="he-rate-regno">{eq.regNo}</div>
                    </div>
                    <span className={`he-status-badge ${statusBadgeCls(eq.status)}`} style={{ marginLeft:8 }}>
                      {eq.status}
                    </span>
                  </div>
                  <div className="he-rate-summary">
                    <div className="he-rate-cost">Cost: ₹{r.cost}/hr</div>
                    <div className="he-rate-billing">Billing: ₹{eq.hourlyRate}/hr</div>
                    <div className="he-rate-margin" style={{ color: marginColor }}>
                      Margin: {margin}%
                    </div>
                  </div>
                </div>
                <div className="he-cost-bar-wrap">
                  <div className="he-cost-bar-bg">
                    <div className="he-cost-bar-fill" style={{ width:`${Math.min((eq.hourlyRate / Math.max(r.cost, 1)) * 50, 100)}%` }} />
                  </div>
                  <span className="he-cost-bar-label" style={{ color: marginColor }}>{margin}% margin</span>
                </div>
                <div className="he-cost-chips">
                  {[
                    ['Depreciation', r.dep,   'var(--red)'    ],
                    ['Ownership',    r.own,   'var(--orange)' ],
                    ['Fuel',         r.fuel,  'var(--accent)' ],
                    ['Maintenance',  r.maint, 'var(--blue)'   ],
                    ['Operator',     r.op,    'var(--purple)'  ],
                  ].map(([label, val, color]) => (
                    <div key={label} className="he-cost-chip">
                      <span className="he-cost-chip-label">{label}</span>
                      <span className="he-cost-chip-val" style={{ color }}>₹{val}/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default HeavyEquipment