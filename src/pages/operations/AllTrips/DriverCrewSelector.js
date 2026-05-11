import React from 'react'
import { DRIVERS_DATA } from '../../../helpers/DriversData';
import { fmt } from '../../../helpers/RiskBadge';
const DriverCrewSelector = ({ form, set }) => {
    return (
        <div>
            <div className='driver-crew-title'>👤 Driver & Crew Assignment</div>
            <div className='driver-crew-desc'>Long-haul trucks require a primary driver, optional second driver for relay/rest, and optional cleaner/khalasi for loading assistance.</div>

            {/* PRIMARY DRIVER */}
            <div className='driver-crew-card'>
                <div className='driver-crew-card-header'>
                    <div className='driver-crew-card-title'>🚛 Driver 1 — Primary (Mandatory)</div>
                    {form.driver && <span className="control-badge driver-crew-badge-bg" style={{ fontSize: '10px' }}>Selected: {form.driver}</span>}
                </div>
                <div className='driver-crew-card-details'>
                    {DRIVERS_DATA.filter(d => d.status === "Available").map((d) => (
                        <div key={d.id} onClick={() => set("driver", d.name)} className='driver-crew-card-item'
                            style={{ border: `2px solid ${form.driver === d.name ? 'var(--accent)' : 'var(--border)'}`, background: form.driver === d.name ? 'var(--accentGlow)' : 'var(--bgCard)' }}>
                            <div className='driver-crew-driver-info'>
                                <div className='driver-crew-avatar' style={{ background: form.driver === d.name ? 'var(--accent)' + "33" : 'var(--bgPanel)', border: `2px solid ${form.driver === d.name ? 'var(--accent)' : 'var(--border)'}` }}>{d.name[0]}</div>
                                <div>
                                    <div className='driver-crew-driver-name'>{d.name}</div>
                                    <div className='driver-crew-driver-meta'>{d.phone} · CDL {d.cdl} · Exp: {d.totalTrips} trips</div>
                                </div>
                            </div>
                            <div className='driver-crew-score-info'>
                                <div>
                                    <div className='driver-screw-score' style={{ color: d.score > 80 ? 'var(--green)' : d.score > 65 ? 'var(--accent)' : 'var(--orange)' }}>⭐ {d.score}</div>
                                    <div className='driver-screw-distance'>{d.kmDriven.toLocaleString()} km</div>
                                </div>
                                {form.driver === d.name && <div style={{ fontSize: "18px" }}>✅</div>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='row g-3'>
                    <div className='col-md-4'>
                        <label className="driver-screw-flabel">Driver 1 Advance (₹)</label><input value={form.driverAdvance} onChange={e => set("driverAdvance", e.target.value)} placeholder="5000" className='driver-screw-input' />
                    </div>
                    <div className='col-md-4'>
                        <label className="driver-screw-flabel">Payment Mode</label><select className='driver-screw-input' value={form.driverAdvanceType} onChange={e => set("driverAdvanceType", e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select>
                    </div>
                    <div className='col-md-4'>
                        <label className="driver-screw-flabel">Driver Rental / Hire (₹)</label><input className='driver-screw-input' value={form.rent} onChange={e => set("rent", e.target.value)} placeholder="0" />
                    </div>
                </div>
            </div>

            {/* SECOND DRIVER */}
            <div className='driver-crew-card'>
                <div className='driver-crew-driver2-header'>
                    <div>
                        <div className='driver-screw-card2-title'>
                            🔄 Driver 2 — Second Driver / Co-Driver <span className='driver-crew-card2-optional'>(Optional)</span>
                        </div>
                        <div className='driver-crew-card2-subtitle'>Required for: long haul (800+ km), overnight trips, relay handoff points</div>
                    </div>
                    {form.secondDriver && <span className="control-badge driver-crew-badge-bb" style={{ fontSize: '10px' }}>Selected: {form.secondDriver}</span>}
                </div>
                <div className='row g-3' style={{ marginBottom: '10px' }}>
                    <div className='col-md-6'>
                        <div className='driver-crew-driver2-none' onClick={() => set("secondDriver", "")} style={{ border: `2px solid ${form.secondDriver === "" ? 'var(--textMuted)' : 'var(--border)'}`, background: form.secondDriver === "" ? 'var(--bgCard)' : 'var(--bgPanel)' }}> ✕ None / Not required </div>
                    </div>
                    {DRIVERS_DATA.filter(d => d.status !== 'On Trip' && d.name !== form.driver)
                        .map((d) => (
                            <div className='col-md-6' key={d.id}>
                                <div onClick={() => set("secondDriver", d.name)} className='driver-crew-driver2-card'
                                    style={{ border: `2px solid ${form.secondDriver === d.name ? 'var(--blue)' : 'var(--border)'}`, background: form.secondDriver === d.name ? 'var(--blueGlow)' : 'var(--bgCard)' }}>
                                    <div className='driver-crew-driver2-avatar'>{d.name[0]}</div>
                                    <div>
                                        <div className='driver-crew-driver2-name'>{d.name}</div>
                                        <div className='driver-crew-driver2-score'>CDL {d.cdl} · Score {d.score}</div>
                                    </div>
                                    {form.secondDriver === d.name && <div style={{ marginLeft: "auto", fontSize: 14 }}>✅</div>}
                                </div>
                            </div>
                        ))}
                </div>
                {form.secondDriver && (
                    <div className='row g-3'>
                        <div className='col-md-4'>
                            <label className="driver-screw-flabel">Driver 2 Advance (₹)</label><input className='driver-screw-input' value={form.d2Advance || ""} onChange={e => set("d2Advance", e.target.value)} placeholder="3000" />
                        </div>
                        <div className='col-md-4'>
                            <label className="driver-screw-flabel">Payment Mode</label><select className='driver-screw-input' value={form.d2AdvanceMode || "Cash"} onChange={e => set("d2AdvanceMode", e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select>
                        </div>
                        <div className='col-md-4'>
                            <label className="driver-screw-flabel">Role on this Trip</label><select className='driver-screw-input' value={form.d2Role || "Co-Driver"} onChange={e => set("d2Role", e.target.value)}><option>Co-Driver</option><option>Relief Driver</option><option>Relay Handoff</option><option>Trainee</option></select>
                        </div>
                    </div>
                )}
            </div>

            {/* CLEANER / KHALASI */}
            <div className='driver-crew-cleaner-card'>
                <div className='driver-crew-cleaner-header'>
                    <div>
                        <div className='driver-crew-cleaner-title'>
                            🧹 Cleaner / Khalasi <span className='driver-crew-cleaner-optional'>(Optional)</span>
                        </div>
                        <div className='driver-crew-cleaner-subtitle'>Helps with loading/unloading, paperwork at check-posts, truck maintenance on road</div>
                    </div>
                </div>
                <div className='row g-3' style={{ marginBottom: '10px' }}>
                    <div className='col-md-6'>
                        <label className="driver-screw-flabel">Cleaner Name</label><input value={form.cleanerName || ""} onChange={e => set("cleanerName", e.target.value)} placeholder="Name (if assigned)" className='driver-screw-input' />
                    </div>
                    <div className='col-md-6'>
                        <label className="driver-screw-flabel">Cleaner Phone</label><input value={form.cleanerPhone || ""} onChange={e => set("cleanerPhone", e.target.value)} placeholder="+91 99999 00000" className='driver-screw-input' />
                    </div>
                </div>
                {(form.cleanerName) && (
                    <div className='row g-3'>
                        <div className='col-md-4'>
                            <label className="driver-screw-flabel">Daily Allowance (₹/day)</label><input className='driver-screw-input' value={form.cleanerAllowance || ""} onChange={e => set("cleanerAllowance", e.target.value)} placeholder="500" />
                        </div>
                        <div className='col-md-4'>
                            <label className="driver-screw-flabel">Trip Duration (days)</label><input className='driver-screw-input' value={form.cleanerDays || ""} onChange={e => set("cleanerDays", e.target.value)} placeholder="3" />
                        </div>
                        <div className='col-md-4'>
                            <label className="driver-screw-flabel">Total Cleaner Cost</label>
                            <div className='driver-crew-cleaner-total-cost'>
                                {form.cleanerAllowance && form.cleanerDays ? fmt(parseInt(form.cleanerAllowance) * parseInt(form.cleanerDays)) : "₹ —"}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Crew summary strip */}
            {(form.driver || form.secondDriver || form.cleanerName) && (
                <div className='driver-crew-summary-card'>
                    <div className='driver-crew-summary-title'>👥 Crew Summary</div>
                    <div className='driver-crew-summary-wrap'>
                        {form.driver && <div className='driver-crew-summary-item' ><span className='driver-crew-summary-label'>Driver 1: </span><strong>{form.driver}</strong>{form.driverAdvance ? <span style={{ color: 'var(--accent)',fontSize:'11px'}}> · ₹{parseInt(form.driverAdvance).toLocaleString()} adv</span> : ""}</div>}
                        {form.secondDriver && <div className='driver-crew-summary-item'><span className='driver-crew-summary-label'>Driver 2: </span><strong>{form.secondDriver}</strong><span style={{ color: 'var(--textMuted)',fontSize:'11px' }}> ({form.d2Role || "Co-Driver"})</span>{form.d2Advance ? <span style={{ color: 'var(--blue)',fontSize:'11px' }}> · ₹{parseInt(form.d2Advance).toLocaleString()} adv</span> : ""}</div>}
                        {form.cleanerName && <div className='driver-crew-summary-item'><span className='driver-crew-summary-label'>Cleaner: </span><strong>{form.cleanerName}</strong>{form.cleanerAllowance ? <span style={{ color: 'var(--purple)',fontSize:'11px' }}> · ₹{form.cleanerAllowance}/day</span> : ""}</div>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DriverCrewSelector
