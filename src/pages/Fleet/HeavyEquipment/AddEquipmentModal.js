import React, { useState } from 'react';

const EQ_TYPES = [
  { id: 'backhoe', label: 'Backhoe', shortLabel: 'Backhoe', icon: '🟡', avgRate: 900 },
  { id: 'excavator', label: 'Hydraulic Excavator', shortLabel: 'Excavator', icon: '🦾', avgRate: 1400 },
  { id: 'miniexcav', label: 'Mini Excavator', shortLabel: 'Mini', icon: '🔶', avgRate: 600 },
  { id: 'roller', label: 'Vibratory Roller', shortLabel: 'Vibratory', icon: '🔵', avgRate: 700 },
  { id: 'crane', label: 'Hydraulic Crane', shortLabel: 'Crane', icon: '🏗️', avgRate: 3500 },
  { id: 'telehandler', label: 'Telehandler', shortLabel: 'Telehandler', icon: '🔧', avgRate: 1100 },
  { id: 'grader', label: 'Motor Grader', shortLabel: 'Grader', icon: '⚙️', avgRate: 1600 },
  { id: 'concrete', label: 'Concrete Mixer', shortLabel: 'Concrete', icon: '🔘', avgRate: 450 },
  { id: 'transit', label: 'Transit Mixer', shortLabel: 'Transit', icon: '🚌', avgRate: 2800 },
];

const MAKES = ['JCB', 'CAT', 'SANY', 'Komatsu', 'Hitachi', 'Volvo CE', 'BharatBenz', 'Liebherr', 'Doosan', 'Escorts'];
const YEARS = Array.from({ length: 12 }, (_, i) => String(2025 - i));
const OWNERSHIPS = ['Owned', 'Financed', 'Leased', 'Rented'];

const INIT = {
  type: 'backhoe', make: 'JCB', model: '', year: '2023', ownership: 'Owned',
  regNo: '', serialNo: '', purchaseCost: '', engineHours: '0',
  hourlyRate: '900', dailyMin: '8', site: '', client: '',
};

const AddEquipmentModal = ({ onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const selType = EQ_TYPES.find(t => t.id === form.type) || EQ_TYPES[0];

  function selectType(id) {
    const t = EQ_TYPES.find(x => x.id === id);
    set('type', id);
    if (t) set('hourlyRate', String(t.avgRate));
  }

  function handleAdd() {
    onAdd?.({
      id: `EQ-${String(Date.now()).slice(-3)}`,
      ...form,
      engineHours: parseInt(form.engineHours) || 0,
      purchaseCost: parseInt(form.purchaseCost) || 0,
      hourlyRate: parseInt(form.hourlyRate) || 900,
      dailyMin: parseInt(form.dailyMin) || 8,
      status: form.site ? 'On Site' : 'Available',
      deployed: !!form.site,
      lastServiceHours: parseInt(form.engineHours) || 0,
      nextServiceHours: (parseInt(form.engineHours) || 0) + 250,
      fuelPerHour: selType.avgFuel || 8,
    });
    onClose();
  }

  return (
    <div className="he-add-overlay" onClick={onClose}>
      <div className="he-add-modal" onClick={e => e.stopPropagation()}>
        <div className="he-add-hdr">
          <div className="he-add-title">
            <span className="he-add-title-icon">🏗️</span>
            Add Equipment — Step {step}/2
          </div>
          <button className="he-x-btn" onClick={onClose}>✕</button>
        </div>

        <div className="he-add-stepper">
          <div className={`he-add-dot ${step >= 1 ? 'he-dot-on' : ''}`}>1</div>
          <div className={`he-add-line ${step === 2 ? 'he-line-done' : ''}`} />
          <div className={`he-add-dot ${step === 2 ? 'he-dot-on' : ''}`}>2</div>
        </div>

        <div className="he-add-body">
          {step === 1 && (
            <>
              <div className="he-type-grid">
                {EQ_TYPES.map(t => (
                  <button
                    key={t.id}
                    className={`he-type-card ${form.type === t.id ? 'he-type-sel' : ''}`}
                    onClick={() => selectType(t.id)}
                  >
                    <span className="he-type-icon">{t.icon}</span>
                    <span className="he-type-label">{t.shortLabel}</span>
                  </button>
                ))}
              </div>

              <div className="he-frow he-fr3">
                <div className="he-fgroup">
                  <label className="he-flabel">MAKE</label>
                  <select className="he-finput" value={form.make} onChange={e => set('make', e.target.value)}>
                    {MAKES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">MODEL</label>
                  <input className="he-finput" placeholder={selType.label}
                    value={form.model} onChange={e => set('model', e.target.value)} />
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">YEAR</label>
                  <select className="he-finput" value={form.year} onChange={e => set('year', e.target.value)}>
                    {YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div className="he-frow he-fr2">
                <div className="he-fgroup">
                  <label className="he-flabel">OWNERSHIP</label>
                  <select className="he-finput" value={form.ownership} onChange={e => set('ownership', e.target.value)}>
                    {OWNERSHIPS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">PURCHASE COST (₹)</label>
                  <input className="he-finput" type="number" placeholder="2800000"
                    value={form.purchaseCost} onChange={e => set('purchaseCost', e.target.value)} />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="he-frow he-fr2">
                <div className="he-fgroup">
                  <label className="he-flabel">FLEET NO / REG *</label>
                  <input className="he-finput he-mono" placeholder="TN69 JCB001"
                    value={form.regNo} onChange={e => set('regNo', e.target.value.toUpperCase())} />
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">SERIAL NUMBER</label>
                  <input className="he-finput he-mono" placeholder="JCB3DX2024TN001"
                    value={form.serialNo} onChange={e => set('serialNo', e.target.value)} />
                </div>
              </div>

              <div className="he-frow he-fr3">
                <div className="he-fgroup">
                  <label className="he-flabel">CURRENT ENGINE HRS</label>
                  <input className="he-finput" type="number"
                    value={form.engineHours} onChange={e => set('engineHours', e.target.value)} />
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">HOURLY RATE (₹)</label>
                  <input className="he-finput" type="number"
                    value={form.hourlyRate} onChange={e => set('hourlyRate', e.target.value)} />
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">MIN SHIFT (HRS)</label>
                  <input className="he-finput" type="number"
                    value={form.dailyMin} onChange={e => set('dailyMin', e.target.value)} />
                </div>
              </div>

              <div className="he-frow he-fr2">
                <div className="he-fgroup">
                  <label className="he-flabel">DEPLOYMENT SITE</label>
                  <input className="he-finput" placeholder="Madurai Bypass NH7"
                    value={form.site} onChange={e => set('site', e.target.value)} />
                </div>
                <div className="he-fgroup">
                  <label className="he-flabel">CLIENT</label>
                  <input className="he-finput" placeholder="NHAI Road Works"
                    value={form.client} onChange={e => set('client', e.target.value)} />
                </div>
              </div>

              {form.regNo && (
                <div className="he-add-summary">
                  <span className="he-add-sum-icon">{selType.icon}</span>
                  <div>
                    <div className="he-add-sum-name">{form.make} {form.model || selType.label}</div>
                    <div className="he-add-sum-meta">{form.regNo} · {form.year} · ₹{parseInt(form.hourlyRate || 0).toLocaleString()}/hr</div>
                  </div>
                  <span className={`he-status-badge ${form.site ? 'he-badge-green' : 'he-badge-blue'}`}>
                    {form.site ? '📍 On Site' : '📦 Depot'}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="he-add-footer">
          <button className="he-btn he-btn-ghost" onClick={() => step > 1 ? setStep(1) : onClose()}>
            {step === 1 ? 'Cancel' : '← Back'}
          </button>
          <button className="he-btn he-btn-orange"
            onClick={() => step < 2 ? setStep(2) : handleAdd()}
            disabled={step === 2 && !form.regNo}>
            {step === 2 ? '🏗️ Add Equipment' : 'Next →'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddEquipmentModal