import React from 'react'
import { JOURNEY_TYPES } from '../../../helpers/JourneyTypes'
import { CUSTOMERS } from '../../../helpers/CustomersData';
import { DRIVERS_DATA } from '../../../helpers/DriversData';
const JourneyTypeSelector = ({ form, set }) => {
  const selected = JOURNEY_TYPES.find(j => j.id === form.journeyType);

  const tripLegs = [
    {
      num: 1,
      fromKey: "from",
      toKey: "to",
      custKey: "customer",
      label: "Loaded Run A→B",
      color: 'var(--accent)'
    },
    {
      num: 2,
      fromKey: "leg2From",
      toKey: "leg2To",
      custKey: "leg2Customer",
      label: "Cross-Load B→C",
      color: 'var(--orange)'
    },
    {
      num: 3,
      fromKey: "leg3From",
      toKey: "leg3To",
      custKey: "leg3Customer",
      label: "Return C→A",
      color: 'var(--blue)'
    }
  ];
  return (
    <div>
      <div className='journey-type-title'>🗺️ Trip Journey Type</div>
      <div className='journey-type-desc'>Choose how the truck will operate for this assignment</div>
      <div className='row g-3' style={{ marginBottom: '16px' }}>
        {JOURNEY_TYPES.map((jt) => (
          <div className='col-md-6' key={jt.id}>
            <div className={`journey-type-card ${form.journeyType === jt.id ? "sel" : ""}`}
              style={{ borderColor: form.journeyType === jt.id ? jt.color : undefined, background: form.journeyType === jt.id ? jt.color + "12" : undefined }}
              onClick={() => set("journeyType", jt.id)}>
              <div className='journey-type-card-header'>
                <div className='journey-type-card-wrapper'>
                  <span className="journey-type-card-icon">{jt.icon}</span>
                  <div className='journey-type-card-label' style={{ color: form.journeyType === jt.id ? jt.color : 'var(--text)' }}>{jt.label}</div>
                </div>
                <span className="control-badge" style={{ background: jt.color + "20", color: jt.color, fontSize: '10px' }}>{jt.tag}</span>
              </div>
              <div className='journey-type-card-desc'>{jt.desc}</div>
              {jt.legs.map((leg, i) => <div key={i} className='journey-type-card-leg' style={{ color: form.journeyType === jt.id ? jt.color + "cc" : 'var(--textMuted)' }}>{i + 1}. {leg}</div>)}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className='journey-type-selected-card' style={{ border: `1px solid ${selected.color}44` }}>
          <div className='journey-type-selected-title' style={{ color: selected.color }}>{selected.icon} {selected.label} — Route Builder</div>

          {form.journeyType === 'oneway' && (
            <div>
              <div className='journey-type-leg-block'>
                <div className='journey-type-leg-title'>LEG 1 — Loaded Run</div>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">From (Origin)</label><input value={form.from} onChange={e => set("from", e.target.value)} placeholder="Chennai" className='journey-type-input' />
                  </div>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">To (Destination)</label><input value={form.to} onChange={e => set("to", e.target.value)} placeholder="Coimbatore" className='journey-type-input' />
                  </div>
                </div>
                <div className='row g-3 mt-1'>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Start Date/Time</label><input type="datetime-local" value={form.startDate} onChange={e => set("startDate", e.target.value)} className='journey-type-input' />
                  </div>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Customer</label><select value={form.customer} onChange={e => set("customer", e.target.value)} className='journey-type-input'><option value="">Select</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                  </div>
                </div>
              </div>
              <div className='journey-type-info-box'>ℹ️ Truck returns empty. Switch to <strong>Round Trip</strong> to book a return load.</div>
            </div>
          )}

          {form.journeyType === 'roundtrip' && (
            <div>
              <div className='journey-type-leg-block'>
                <div className='journey-type-leg-title-green'>LEG 1 — Forward Loaded Run</div>
                <div className='row g-3'>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">From (Origin)</label><input value={form.from} onChange={e => set("from", e.target.value)} placeholder="Chennai" className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">To</label><input value={form.to} onChange={e => set("to", e.target.value)} placeholder="Mumbai" className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Customer</label><select value={form.customer} onChange={e => set("customer", e.target.value)} className='journey-type-input'><option value="">Select</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                  </div>
                </div>
                <div className='row g-3 mt-1'>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Start Date/Time</label><input type="datetime-local" value={form.startDate} onChange={e => set("startDate", e.target.value)} className='journey-type-input' />
                  </div>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Freight (₹)</label><input value={form.freightAmount} onChange={e => set("freightAmount", e.target.value)} placeholder="45000" className='journey-type-input' />
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-conn">↕ Return leg (truck picks up load at destination)</div>
              <div className='journey-type-leg-block' style={{ borderColor: 'var(--green)' }}>
                <div className='journey-type-leg-title-green'>LEG 2 — Return Loaded Run</div>
                <div className='row g-3'>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">From</label><input value={form.returnFrom || form.to} onChange={e => set("returnFrom", e.target.value)} placeholder={form.to || "Mumbai"} className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">To (Return)</label><input value={form.returnTo || form.from} onChange={e => set("returnTo", e.target.value)} placeholder={form.from || "Chennai"} className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Return Customer</label><select className='journey-type-input' value={form.returnCustomer || ""} onChange={e => set("returnCustomer", e.target.value)}><option value="">TBD at destination</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                  </div>
                </div>
                <div className='row g-3 mt-1'>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Return Freight (₹)</label><input value={form.returnFreight || ""} onChange={e => set("returnFreight", e.target.value)} placeholder="0 if not yet booked" className='journey-type-input' />
                  </div>
                  <div className='col-md-6'>
                    <div className='journey-type-revenue-box'>
                      <div className='journey-type-revenue-title'>Combined revenue:</div>
                      <div className="rj journey-type-revenue-amount">₹{((parseInt(form.freightAmount || 0) + parseInt(form.returnFreight || 0))).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {form.journeyType === 'multileg' && (
            <div>
              {tripLegs.map((leg) => (
                <div key={leg.num}>
                  <div className='journey-type-leg-block' style={{ borderColor: leg.color }}>
                    <div className='journey-type-leg-header' style={{ color: leg.color }}>LEG {leg.num} — {leg.label}</div>
                    <div className='row g-3' style={{ marginTop: 2 }}>
                      <div className='col-md-4'>
                        <label className="journey-type-flabel">From</label><input value={form[leg.fromKey] || ""} onChange={e => set(leg.fromKey, e.target.value)} placeholder="City" className='journey-type-input' />
                      </div>
                      <div className='col-md-4'>
                        <label className="journey-type-flabel">To</label><input value={form[leg.toKey] || ""} onChange={e => set(leg.toKey, e.target.value)} placeholder="City" className='journey-type-input' />
                      </div>
                      <div className='col-md-4'>
                        <label className="journey-type-flabel">Customer</label><select className='journey-type-input' value={form[leg.custKey] || ""} onChange={e => set(leg.custKey, e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                      </div>
                    </div>

                  </div>
                  {leg.num < 3 && <div className="journey-type-leg-conn">↓ Continues to next leg</div>}
                </div>
              ))}
              <div><label className="journey-type-flabel">Trip Start</label><input type="datetime-local" value={form.startDate} onChange={e => set("startDate", e.target.value)} style={{ width: 240 }} className='journey-type-input' /></div>
            </div>
          )}

          {form.journeyType === 'crossregion' && (
            <div>
              <div className='journey-type-leg-block'>
                <div className='journey-type-leg-title-purple'>LEG 1 — Origin to Relay Point (Driver 1)</div>
                <div className='row g-3'>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Origin</label><input value={form.from} onChange={e => set("from", e.target.value)} placeholder="Chennai" className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Relay Depot</label><input value={form.relayPoint || ""} onChange={e => set("relayPoint", e.target.value)} placeholder="Nagpur" className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Est. KM</label><input value={form.leg1Km || ""} onChange={e => set("leg1Km", e.target.value)} placeholder="900 km" className='journey-type-input' />
                  </div>
                </div>
              </div>
              <div className="journey-type-leg-conn" style={{ color: 'var(--purple)' }}>🔄 Driver handoff at relay point — fresh driver takes over</div>
              <div className='journey-type-leg-block' style={{ borderColor: 'var(--purple)' }}>
                <div className='journey-type-leg-title-purple'>LEG 2 — Relay to Destination (Driver 2)</div>
                <div className='row g-3'>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">From Relay</label><input value={form.relayPoint || ""} readOnly placeholder="Auto-filled" style={{ opacity: .7 }} className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Destination</label><input value={form.to} onChange={e => set("to", e.target.value)} placeholder="Delhi" className='journey-type-input' />
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Relay Driver</label><select className='journey-type-input' value={form.relayDriver || ""} onChange={e => set("relayDriver", e.target.value)}><option value="">Assign later</option>{DRIVERS_DATA.filter(d => d.status === "Available").map(d => <option key={d.id}>{d.name}</option>)}</select>
                  </div>
                </div>
              </div>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <label className="journey-type-flabel">Customer</label><select className='journey-type-input' value={form.customer} onChange={e => set("customer", e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                </div>
                <div className='col-md-6'>
                  <label className="journey-type-flabel">Start Date/Time</label><input type="datetime-local" value={form.startDate} onChange={e => set("startDate", e.target.value)} className='journey-type-input' />
                </div>
              </div>
            </div>
          )}

          {form.journeyType === 'dedicated' && (
            <div>
              <div className='journey-type-leg-block'>
                <div className='journey-type-leg-title-orange'>Fixed Route Configuration</div>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Fixed Origin</label><input value={form.from} onChange={e => set("from", e.target.value)} placeholder="Chennai Port" className='journey-type-input' />
                  </div>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Fixed Destination</label><input value={form.to} onChange={e => set("to", e.target.value)} placeholder="Coimbatore Warehouse" className='journey-type-input' />
                  </div>
                </div>
                <div className='row g-3' style={{ marginTop: 2 }}>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Dedicated Customer</label><select className='journey-type-input' value={form.customer} onChange={e => set("customer", e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c => <option key={c}>{c}</option>)}</select>
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Frequency</label><select className='journey-type-input' value={form.frequency || ""} onChange={e => set("frequency", e.target.value)}><option value="">Select</option><option>Daily</option><option>Alternate Days</option><option>2× per week</option><option>Weekly</option></select>
                  </div>
                  <div className='col-md-4'>
                    <label className="journey-type-flabel">Contract Period</label><select className='journey-type-input' value={form.contractPeriod || ""} onChange={e => set("contractPeriod", e.target.value)}><option value="">Select</option><option>1 Month</option><option>3 Months</option><option>6 Months</option><option>Annual</option></select>
                  </div>
                </div>
                <div className='row g-3' style={{ marginTop: 2 }}>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Rate per Trip (₹)</label><input value={form.freightAmount} onChange={e => set("freightAmount", e.target.value)} placeholder="8000" className='journey-type-input' />
                  </div>
                  <div className='col-md-6'>
                    <label className="journey-type-flabel">Start Date</label><input type="date" value={(form.startDate || "").split("T")[0]} onChange={e => set("startDate", e.target.value)} className='journey-type-input' />
                  </div>
                </div>
              </div>
              {form.freightAmount && form.frequency && (
                <div className='journey-type-revenue-projection-box'>
                  <div className='journey-type-revenue-projection-title'>Revenue Projection</div>
                  <div style={{ color:'var(--textSub)' }}>{form.frequency} runs at ₹{parseInt(form.freightAmount||0).toLocaleString()} per trip →{" "}
                    <strong style={{ color:'var(--green)'}}>~₹{(parseInt(form.freightAmount||0)*(form.frequency==="Daily"?26:form.frequency==="Alternate Days"?13:form.frequency==="2x per week"?8:4)).toLocaleString()} / month</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JourneyTypeSelector
