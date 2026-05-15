import React, { useState } from 'react';

const MAKES      = ['Tata', 'Ashok Leyland', 'Mahindra', 'Eicher', 'BharatBenz', 'Volvo', 'MAN', 'Force'];
const YEARS      = Array.from({ length: 20 }, (_, i) => 2025 - i);
const AXLES      = ['4x2', '6x2', '6x4', '8x2', '8x4', '10x4', 'Trailer'];
const OWNERSHIPS = ['Owned', 'Leased', 'Hired', 'Contract'];
const PERMITS    = ['National Permit', 'State Permit', 'All India Tourist Permit', 'Contract Carriage', 'Goods Carriage'];

const INIT = {
  regNo: '', make: 'Tata', model: '', year: '2023',
  axle: '6x4', gvw: '', ownership: 'Owned',
  insuranceExpiry: '', fcExpiry: '',
  permitType: 'National Permit', purchaseCost: '',
};

export default function AddVehicleModal({ onClose, onAdd }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  function handleNext() {
    if (!form.regNo.trim()) {
      setErrors({ regNo: 'Registration number is required' });
      return;
    }
    setStep(2);
  }

  function handleAdd() {
    onAdd?.(form);
    onClose?.();
  }

  return (
    <div className="vm-modal-overlay" onClick={onClose}>
      <div className="vm-modal-box" onClick={e => e.stopPropagation()}>
        <div className="vm-modal-header">
          <div className="vm-modal-title">
            <span className="vm-modal-emoji">🚛</span>
            Add Vehicle &mdash; Step {step}/2
          </div>
          <button className="vm-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="vm-modal-stepper">
          <div className={`vm-stepper-dot ${step >= 1 ? 'vm-dot-active' : ''}`}>1</div>
          <div className={`vm-stepper-bar ${step === 2 ? 'vm-bar-done' : ''}`} />
          <div className={`vm-stepper-dot ${step === 2 ? 'vm-dot-active' : ''}`}>2</div>
        </div>

        {step === 1 && (
          <div className="vm-modal-body">
            <div className="vm-form-row vm-cols-313">
              <div className="vm-form-group">
                <label className="vm-form-label">
                  REG NO <span className="vm-required">*</span>
                </label>
                <input
                  className={`vm-form-input ${errors.regNo ? 'vm-input-error' : ''}`}
                  placeholder="TN69 GH1234"
                  value={form.regNo}
                  onChange={e => set('regNo', e.target.value.toUpperCase())}
                  autoFocus
                />
                {errors.regNo && <span className="vm-error-msg">{errors.regNo}</span>}
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">MAKE</label>
                <select className="vm-form-select" value={form.make} onChange={e => set('make', e.target.value)}>
                  {MAKES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">MODEL</label>
                <input
                  className="vm-form-input"
                  placeholder="LPT 2518"
                  value={form.model}
                  onChange={e => set('model', e.target.value)}
                />
              </div>
            </div>

            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">YEAR</label>
                <select className="vm-form-select" value={form.year} onChange={e => set('year', e.target.value)}>
                  {YEARS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">AXLE</label>
                <select className="vm-form-select" value={form.axle} onChange={e => set('axle', e.target.value)}>
                  {AXLES.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">GVW (T)</label>
                <input
                  className="vm-form-input"
                  type="number"
                  placeholder="25"
                  min={1}
                  value={form.gvw}
                  onChange={e => set('gvw', e.target.value)}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">OWNERSHIP</label>
                <select className="vm-form-select" value={form.ownership} onChange={e => set('ownership', e.target.value)}>
                  {OWNERSHIPS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

          </div>
        )}

        {step === 2 && (
          <div className="vm-modal-body">
            <div className="vm-form-row vm-cols-2">
              <div className="vm-form-group">
                <label className="vm-form-label">INSURANCE EXPIRY</label>
                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  value={form.insuranceExpiry}
                  onChange={e => set('insuranceExpiry', e.target.value)}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">FC EXPIRY</label>
                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  value={form.fcExpiry}
                  onChange={e => set('fcExpiry', e.target.value)}
                />
              </div>
            </div>

            <div className="vm-form-row vm-cols-2">
              <div className="vm-form-group">
                <label className="vm-form-label">PERMIT TYPE</label>
                <select className="vm-form-select" value={form.permitType} onChange={e => set('permitType', e.target.value)}>
                  {PERMITS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">PURCHASE COST (₹)</label>
                <input
                  className="vm-form-input"
                  type="number"
                  placeholder="0"
                  min={0}
                  value={form.purchaseCost}
                  onChange={e => set('purchaseCost', e.target.value)}
                />
              </div>
            </div>

          </div>
        )}

        <div className="vm-modal-footer">
          {step === 1 ? (
            <>
              <button className="vm-btn-ghost" onClick={onClose}>Cancel</button>
              <button className="vm-btn-accent" onClick={handleNext}>
                Next <span className="vm-btn-arrow">→</span>
              </button>
            </>
          ) : (
            <>
              <button className="vm-btn-ghost" onClick={() => setStep(1)}>
                <span className="vm-btn-arrow">←</span> Back
              </button>
              <button className="vm-btn-accent" onClick={handleAdd}>
                <span className="vm-btn-check">✓</span> Add Vehicle
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
