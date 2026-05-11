import React from 'react'
import { VEHICLE_SCHEMA } from '../../../helpers/VehicleSchema';
import { FLEET_DATA } from '../../../helpers/FleetData'

const VehicleTypeSelector = ({ form, set }) => {
    const selected = VEHICLE_SCHEMA.find(v => v.id === form.vehicleCategoryId);
    const selectedSubtype = selected?.subtypes.find(s => s.id === form.vehicleSubtypeId);
    const availFleet = FLEET_DATA.filter(t =>
        t.typeId === form.vehicleCategoryId &&
        t.status === "Active" &&
        (!form.vehicleSubtypeId || t.subtypeId === form.vehicleSubtypeId) &&
        (!form.vehicleWheels || t.wheels === form.vehicleWheels)
    );
    return (
        <div>
            <div className='vehicle-type-category-title'>🚛 Select Vehicle Category</div>
            <div className='row g-3' style={{ marginBottom: '18px' }}>
                {VEHICLE_SCHEMA.map((vt) => (
                    <div className='col-md-4' key={vt.id}>
                        <div className={`vehicle-type-schema-btn ${form.vehicleCategoryId === vt.id ? "sel" : ""}`}
                            style={{ borderColor: form.vehicleCategoryId === vt.id ? vt.color : undefined, background: form.vehicleCategoryId === vt.id ? vt.color + "18" : undefined }}
                            onClick={() => { set("vehicleCategoryId", vt.id); set("vehicleSubtypeId", ""); set("vehicleWheels", ""); set("vehicle", ""); }}>
                            <span className='vehicle-type-schema-icon'>{vt.icon}</span>
                            <div>
                                <div className='vehicle-type-schema-label' style={{ color: form.vehicleCategoryId === vt.id ? vt.color : 'var(--text)' }}>{vt.label}</div>
                                <div className='vehicle-type-capacity'>{vt.subtypes[0].capacity}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selected && (
                <div className='vehicle-type-card-box'>
                    <div className='vehicle-type-selected-title' style={{ color: selected.color }}>{selected.icon} {selected.label} — Select Configuration</div>
                    <div className='vehicle-type-form-group'>
                        <div className="vehicle-type-flabel">Body Type</div>
                        <div className='vehicle-type-subtype-wrap'>
                            {selected.subtypes.map((st) => (
                                <div key={st.id} className={`vehicle-type-subtype-btn ${form.vehicleSubtypeId === st.id ? "sel" : ""}`}
                                    onClick={() => { set("vehicleSubtypeId", st.id); set("vehicleWheels", ""); set("vehicle", ""); }}>{st.label}</div>
                            ))}
                        </div>
                    </div>
                    {selectedSubtype && (
                        <div className='vehicle-type-form-group'>
                            <div className="vehicle-type-flabel">Wheel / Axle Config</div>
                            <div className='vehicle-type-subtype-wrap'>
                                {selectedSubtype.wheels.map((w) => (
                                    <div key={w} className={`vehicle-type-subtype-btn ${form.vehicleWheels === w ? "sel" : ""}`}
                                        style={{ borderColor: form.vehicleWheels === w ? selected.color : undefined, color: form.vehicleWheels === w ? selected.color : undefined }}
                                        onClick={() => { set("vehicleWheels", w); set("vehicle", ""); }}>{w}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedSubtype && (
                        <div className='vehicle-type-specs-wrap'>
                            {[
                                { label: "Make", val: selected.specs.make },
                                { label: "Fuel Economy", val: selected.specs.fuelEconomy, color: 'var(--green)' },
                                { label: "Avg Speed", val: selected.specs.avgSpeed },
                                { label: "Capacity", val: selectedSubtype.capacity }
                            ].map((s) => (
                                <div key={s.label} style={{ minWidth: 100 }}>
                                    <div className='vehicle-type-specs-label'>{s.label}</div>
                                    <div className='vehicle-type-specs-value' style={{ color: s.color || 'var(--textSub)' }}>{s.val}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {form.vehicleCategoryId && (
                <div>
                    <div className='vehicle-type-fleet-header'>
                        <div className="vehicle-type-flabel" style={{ margin: 0 }}>Matching Fleet Vehicles</div>
                        <div className='vehicle-type-fleet-count' style={{ background: availFleet.length > 0 ? 'var(--greenGlow)' : 'var(--redGlow)', color: availFleet.length > 0 ? 'var(--green)' : 'var(--red)', border: `1px solid ${availFleet.length > 0 ? 'var(--greenGlow)' : 'var(--redGlow)'}` }}> Available: {availFleet.length} </div>
                    </div>
                    <div className='vehicle-type-fleet-details'>
                        {FLEET_DATA.filter((t) =>
                            t.typeId === form.vehicleCategoryId &&
                            (!form.vehicleSubtypeId || t.subtypeId === form.vehicleSubtypeId) &&
                            (!form.vehicleWheels || t.wheels === form.vehicleWheels)
                        ).map((t) => {
                            const vtype = VEHICLE_SCHEMA.find(v => v.id === t.typeId);
                            const isUnavail = t.status !== "Active";
                            return (
                                <div key={t.id} className={`vehicle-type-truck-card ${form.vehicle === t.num ? "sel" : ""} ${isUnavail ? "unavail" : ""}`}
                                    onClick={() => !isUnavail && set("vehicle", t.num)}>
                                    <div className='vehicle-type-truck-info'>
                                        <div className='vehicle-type-truck-icon' style={{ border: `1px solid ${vtype?.color}33` }}>{vtype?.icon}</div>
                                        <div>
                                            <div className="mono vehicle-type-truck-num" style={{ color: form.vehicle === t.num ? 'var(--accent)' : 'var(--text)' }}>{t.num}</div>
                                            <div className="vehicle-type-truck-data">{t.wheels} · {t.make} {t.year}</div>
                                            <div className="vehicle-type-truck-dist">⛽ {t.fuel} · {t.speed} · {t.km.toLocaleString()} km</div>
                                        </div>
                                    </div>
                                    <div className="vehicle-type-truck-health-info">
                                        <div style={{ textAlign: "right" }}>
                                            <div className='vehicle-type-truck-health-value' style={{ color: t.health > 80 ? 'var(--green)' : t.health > 60 ? 'var(--accent)' : 'var(--red)' }}>{t.health}%</div>
                                            <div className='vehicle-type-truck-health-label'>health</div>
                                        </div>
                                        <span className={`control-badge ${t.status === "Active" ? "vehicle-type-bg" : t.status === "On Trip" ? "vehicle-type-bb" : "vehicle-type-bo"}`}>{t.status}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {form.vehicle && (
                        <div style={{ marginTop: '12px' }}>
                            <label className="vehicle-type-flabel">Starting Odometer Reading (km)</label>
                            <input className='vehicle-type-input' value={form.startOdometer} onChange={e => set("startOdometer", e.target.value)} placeholder="e.g. 74875" style={{ width: 200 }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default VehicleTypeSelector
