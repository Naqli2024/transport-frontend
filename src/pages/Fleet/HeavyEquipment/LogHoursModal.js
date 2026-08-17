import React, { useState, useMemo } from 'react';

const fmt = n =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
  : n >= 1000  ? `₹${(n / 1000).toFixed(1)}k`
  : `₹${n}`;

const LogHoursModal = ({ equipment, contract, onClose, onSave }) => {
  const eq = equipment;
  const [form, setForm] = useState({
    date:       new Date().toISOString().split('T')[0],
    startHours: String(eq.engineHours || 0),
    endHours:   '',
    idleHours:  '0',
    fuel:       '',
    shift:      'Day',
    work:       '',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const { worked, billed, rate, billAmt } = useMemo(() => {
    const s = parseFloat(form.startHours) || 0;
    const e = parseFloat(form.endHours)   || 0;
    const i = parseFloat(form.idleHours)  || 0;
    const worked    = form.endHours ? Math.max(0, e - s - i) : 0;
    const shiftMin  = contract?.shiftHoursPerDay || eq.dailyMin || 8;
    const billed    = worked > 0 ? Math.max(worked, shiftMin) : 0;
    const rate      = contract?.hourlyRate || eq.hourlyRate || 900;
    const billAmt   = Math.round(billed * rate);
    return { worked, billed, rate, billAmt };
  }, [form.startHours, form.endHours, form.idleHours, contract, eq]);

  const canSave = !!form.endHours && worked >= 0;

  function handleSave() {
    onSave?.({
      eqId:       eq.id,
      date:       form.date,
      startHours: parseFloat(form.startHours),
      endHours:   parseFloat(form.endHours),
      idleHours:  parseFloat(form.idleHours || 0),
      fuel:       parseFloat(form.fuel || 0),
      shift:      form.shift,
      work:       form.work,
      worked, billed, billAmt,
      site:   eq.site   || '',
      client: contract?.client || '',
    });
    onClose();
  }

  return (
    <div className="he-log-overlay" onClick={onClose}>
      <div className="he-log-modal" onClick={e => e.stopPropagation()}>
        <div className="he-log-hdr">
          <div className="he-log-title">
            <span className="he-log-badge">⏱️</span>
            <div>
              <div className="he-log-title-main">Log Hours</div>
              <div className="he-log-title-sub">{eq.regNo} · {eq.model}</div>
            </div>
          </div>
          <button className="he-x-btn" onClick={onClose}>✕</button>
        </div>

        <div className="he-log-body">
          <div className="he-lrow he-lr3">
            <div className="he-lfgroup">
              <label className="he-lflabel">DATE</label>
              <input type="date" className="he-lfinput he-ldate"
                value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="he-lfgroup">
              <label className="he-lflabel">START HRS</label>
              <input type="number" className="he-lfinput he-mono"
                value={form.startHours}
                onChange={e => set('startHours', e.target.value)} />
            </div>
            <div className="he-lfgroup">
              <label className="he-lflabel">END HRS</label>
              <input type="number" className="he-lfinput he-mono"
                placeholder={String((eq.engineHours || 0) + 8)}
                value={form.endHours}
                onChange={e => set('endHours', e.target.value)} />
            </div>
          </div>

          <div className="he-lrow he-lr2">
            <div className="he-lfgroup">
              <label className="he-lflabel">IDLE HRS</label>
              <input type="number" className="he-lfinput" min="0"
                value={form.idleHours}
                onChange={e => set('idleHours', e.target.value)} />
            </div>
            <div className="he-lfgroup">
              <label className="he-lflabel">FUEL FILLED (L)</label>
              <input type="number" className="he-lfinput" min="0"
                value={form.fuel}
                onChange={e => set('fuel', e.target.value)} />
            </div>
          </div>

          <div className="he-lfgroup">
            <label className="he-lflabel">WORK DONE</label>
            <textarea className="he-lfinput he-ltarea"
              rows={3} placeholder="Describe work performed…"
              value={form.work} onChange={e => set('work', e.target.value)} />
          </div>
        </div>

        <div className="he-log-footer">
          <button className="he-btn he-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="he-btn he-btn-green" onClick={handleSave} disabled={!canSave}>
            ✅ Log Hours
            {billAmt > 0 && <span className="he-log-btn-amt">— {fmt(billAmt)}</span>}
          </button>
        </div>

      </div>
    </div>
  );
}

export default LogHoursModal