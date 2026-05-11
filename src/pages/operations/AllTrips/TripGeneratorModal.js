import { Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { Ic } from '../../../components/icons/Ic';
import JourneyTypeSelector from './JourneyTypeSelector';
import { VEHICLE_SCHEMA } from '../../../helpers/VehicleSchema';
import { VENDORS } from '../../../helpers/VendorsData';
import { DRIVERS_DATA } from '../../../helpers/DriversData';
import VehicleTypeSelector from './VehicleTypeSelector';
import { VENDOR_VEHICLES } from '../../../helpers/VendorsVehicles';
import LoadFreightDetails from './LoadFreightDetails';
import DriverCrewSelector from './DriverCrewSelector';
import CostBreakdownSection from './CostBreakdownSection';
import Review from './Review';

const TripGeneratorModal = ({ open, onClose, onCreated, vehicleSource = "own" }) => {
    const [step, setStep] = useState(1);
    const [fleetSource, setFleetSource] = useState(vehicleSource);
    const [form, setForm] = useState({
        journeyType: "", from: "", to: "", startDate: "", customer: "", loadType: "FTL",
        vehicleCategoryId: "", vehicleSubtypeId: "", vehicleWheels: "", vehicle: "", startOdometer: "",
        vendorId: "", vendorVehicle: "",
        driver: "", driverAdvance: "", driverAdvanceType: "Cash", secondDriver: "", d2Advance: "", d2AdvanceMode: "Cash", d2Role: "Co-Driver", cleanerName: "", cleanerPhone: "", cleanerAllowance: "", cleanerDays: "", rent: "",
        commodity: "", weight: "", freightAmount: "", advanceAmount: "", paymentType: "Account",
        dieselLitres: "", dieselAmount: "", tollCharges: "", loadingCharges: "", unloadingCharges: "",
        commission: "", commissionTo: "", miscCharges: "",
        returnFrom: "", returnTo: "", returnCustomer: "", returnFreight: "",
        relayPoint: "", relayDriver: "", leg1Km: "",
        leg2From: "", leg2To: "", leg2Customer: "",
        leg3From: "", leg3To: "", leg3Customer: "",
        frequency: "", contractPeriod: "",
    });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const steps = [
        { n: 1, label: "Journey Type" },
        { n: 2, label: "Vehicle" },
        { n: 3, label: "Load & Freight" },
        { n: 4, label: "Driver & Crew" },
        { n: 5, label: "Costs & P&L" },
        { n: 6, label: "Review" },
    ];

    const handleCreate = () => {
        const id = `TRP-2025-${String(Math.floor(Math.random() * 900) + 50).padStart(4, "0")}`;
        const vtype = VEHICLE_SCHEMA.find(v => v.id === form.vehicleCategoryId);
        const totalCost = parseInt(form.dieselAmount || 0) + parseInt(form.tollCharges || 0) + parseInt(form.loadingCharges || 0) + parseInt(form.unloadingCharges || 0);
        onCreated({
            id, vehicleType: fleetSource,
            route: `${form.from} → ${form.to}`,
            fromCity: form.from, toCity: form.to,
            vehicle: fleetSource === "own" ? form.vehicle : null,
            vendorVehicle: fleetSource === "vendor" ? form.vendorVehicle : null,
            vendor: fleetSource === "vendor" ? (VENDORS.find(v => v.id === form.vendorId)?.name || null) : null,
            driver: fleetSource === "own" ? form.driver : "External Driver",
            driverId: fleetSource === "own" ? (DRIVERS_DATA.find(d => d.name === form.driver)?.id || null) : null,
            customer: form.customer,
            freight: parseInt(form.freightAmount) || 0,
            advance: parseInt(form.driverAdvance) || 0,
            expenses: { diesel: parseInt(form.dieselAmount) || 0, toll: parseInt(form.tollCharges) || 0, loading: parseInt(form.loadingCharges) || 0, unloading: parseInt(form.unloadingCharges) || 0, misc: parseInt(form.miscCharges) || 0 },
            vendorCost: fleetSource === "vendor" ? parseInt(form.freightAmount || 0) : undefined,
            status: "Pre-Trip Pending",
            loadType: form.loadType,
            weight: form.weight + "T",
            journeyType: form.journeyType,
            vehicleLabel: vtype ? `${vtype.label} · ${form.vehicleWheels}` : "",
            agent: form.commissionTo || "Direct",
            dateCreated: "2025-04-15",
            distanceKm: 480,
        });
        onClose();
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiBackdrop-root": {
                        background: "rgba(0,0,0,.85)",
                        backdropFilter: "blur(8px)",
                    },
                    "& .MuiDialog-container": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",

                    },
                    "& .MuiPaper-root": {
                        background: 'var(--bgCard)',
                        border: `1px solid var(--borderHi)`,
                        borderRadius: "16px",
                        width: "100%",
                        maxWidth: "900px",
                        maxHeight: "92vh",
                        overflowY: "visible",
                        margin: 0,
                    },
                }}
            >
                <DialogContent sx={{ p: 0 }}>
                    <div className='trip-generator-modal-header' style={{ background: "linear-gradient(135deg,#1746A2,#0F2D7A)" }}>
                        <div>
                            <div className="rj trip-generator-modal-title">🚛 New Trip Booking</div>
                            <div className="trip-generator-modal-steps">Step {step} of 6 — {steps[step - 1].label}</div>
                        </div>
                        <div className='trip-generator-modal-header-actions'>
                            <div className="trip-generator-modal-toggle-pill trip-generator-modal-toggle-pill-header">
                                <div className={`trip-generator-modal-toggle-opt trip-generator-modal-toggle-opt-small ${fleetSource === "own" ? "on" : ""}`} onClick={() => setFleetSource("own")}>🚚 Own Fleet</div>
                                <div className={`trip-generator-modal-toggle-opt trip-generator-modal-toggle-opt-small ${fleetSource === "vendor" ? "on" : ""}`} onClick={() => setFleetSource("vendor")}>🤝 Vendor</div>
                            </div>
                            <button className="control-btn trip-generator-modal-close-btn" onClick={onClose}><Ic n="x" s={14} c="#fff" /></button>
                        </div>
                    </div>

                    <div className='trip-generator-modal-step-wrapper'>
                        <div className='trip-generator-modal-stepper'>
                            {steps.map((s, i) => (
                                <div key={s.n} className='trip-generator-modal-step-item'>
                                    <div className='trip-generator-modal-step-row'>
                                        {i > 0 && <div className="trip-generator-modal-step-line" style={{ background: step > i ? 'var(--accent)' : 'var(--border)' }} />}
                                        <div className="trip-generator-modal-step-dot" style={{ background: step === s.n ? 'var(--accent)' : step > s.n ? 'var(--green)' : 'var(--bgCard)', border: `2px solid ${step === s.n ? 'var(--accent)' : step > s.n ? 'var(--green)' : 'var(--border)'}`, color: step > s.n ? "#fff" : step === s.n ? "#080B10" : 'var(--textMuted)', margin: "0 auto" }}>
                                            {step > s.n ? "✓" : s.n}
                                        </div>
                                        {i < steps.length - 1 && <div className="trip-generator-modal-step-line" style={{ background: step > s.n ? 'var(--accent)' : 'var(--border)' }} />}
                                    </div>
                                    <div className="trip-generator-modal-step-label" style={{ color: step === s.n ? 'var(--accent)' : 'var(--textMuted)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='trip-generator-modal-body'>
                        {step === 1 && <JourneyTypeSelector form={form} set={set} />}
                        {step === 2 && (
                            fleetSource === 'own' ? (<VehicleTypeSelector form={form} set={set} />) : (<div>
                                <div className='trip-generator-modal-vendor-title'>🤝 Vendor Vehicle Selection</div>
                                <div className='trip-generator-modal-vendor-box'>💡 No driver advance or diesel expense needed — vendor manages their own driver and fuel</div>
                                <div className='row g-3'>
                                    <div className='col-md-6'>
                                        <label className="trip-generator-modal-flabel">Select Vendor</label>
                                        <select className='trip-generator-modal-input' value={form.vendorId} onChange={e => set("vendorId", e.target.value)}>
                                            <option value="">Choose vendor</option>
                                            {VENDORS.map(v => <option key={v.id} value={v.id}>{v.name} (★{v.rating}) — ₹{v.ratePerKm}/km</option>)}
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="trip-generator-modal-flabel">Vendor Vehicle</label>
                                        <select className='trip-generator-modal-input' value={form.vendorVehicle} onChange={e => set("vendorVehicle", e.target.value)}>
                                            <option value="">Choose vehicle</option>
                                            {VENDOR_VEHICLES.map(v => <option key={v.id}>{v.num} — {v.model}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className='row g-3' style={{ marginTop: 2 }}>
                                    <div className='col-md-6'>
                                        <label className="trip-generator-modal-flabel">Rate per KM (₹)</label><input value={form.vendorRate || ""} onChange={e => set("vendorRate", e.target.value)} placeholder="42" className='trip-generator-modal-input' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="trip-generator-modal-flabel">Est. Distance (km)</label><input value={form.estDistance || ""} onChange={e => set("estDistance", e.target.value)} placeholder="480" className='trip-generator-modal-input' />
                                    </div>
                                </div>
                                {form.vendorRate && form.estDistance && (
                                    <div className='trip-generator-modal-vendor-cost-box'>
                                        <span className="trip-generator-modal-vendor-cost-label">Estimated Vendor Cost: </span>
                                        <span className="rj trip-generator-modal-vendor-cost-value">₹{(parseInt(form.vendorRate || 0) * parseInt(form.estDistance || 0)).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                            )
                        )}
                        {step === 3 && (<LoadFreightDetails form={form} set={set} />)}
                        {step === 4 && (
                            <div>
                                {fleetSource === "own" ? (<DriverCrewSelector form={form} set={set} />) :
                                    (
                                        <div className="trip-generator-modal-vendor-trip-box">
                                            <div className="trip-generator-modal-vendor-trip-title">🤝 Vendor Trip — Driver Managed by Vendor</div>
                                            <div className="trip-generator-modal-vendor-trip-text">No driver advance required. The vendor ({VENDORS.find(v => v.id === form.vendorId)?.name || "selected vendor"}) assigns their own driver and handles fuel & crew expenses.</div>
                                        </div>

                                    )
                                }
                            </div>
                        )}
                        {step === 5 && (
                            <div>
                                <div className='trip-generator-modal-cost-title'>💰 Cost Breakdown & P&L</div>
                                {fleetSource === 'own' ? (<CostBreakdownSection form={form} set={set} />) : (
                                    <div className='row g-3' style={{ marginBottom: '14px' }}>
                                        <div className='col-md-6'>
                                            <label className="trip-generator-modal-flabel">Toll to Vendor (₹)</label><input className='trip-generator-modal-input' value={form.tollCharges} onChange={e => set("tollCharges", e.target.value)} placeholder="3000" />
                                        </div>
                                        <div className='col-md-6'>
                                            <label className="trip-generator-modal-flabel">Misc (₹)</label><input className='trip-generator-modal-input' value={form.miscCharges} onChange={e => set("miscCharges", e.target.value)} placeholder="0" />
                                        </div>
                                    </div>
                                )}
                                {form.freightAmount && (
                                    <div className='trip-generator-modal-pl-preview-card'>
                                        <div className='trip-generator-modal-pl-title'>Live P&L Preview</div>
                                        <div className='trip-generator-modal-pl-wrap'>
                                            {[
                                                { label: "Freight", val: parseInt(form.freightAmount || 0), c: 'var(--green)' },
                                                { label: "Total Cost", val: parseInt(form.dieselAmount || 0) + parseInt(form.tollCharges || 0) + parseInt(form.loadingCharges || 0) + parseInt(form.unloadingCharges || 0) + parseInt(form.commission || 0) + parseInt(form.miscCharges || 0), c: 'var(--red)' },
                                                { label: "Est. Margin", val: parseInt(form.freightAmount || 0) - parseInt(form.dieselAmount || 0) - parseInt(form.tollCharges || 0) - parseInt(form.loadingCharges || 0) - parseInt(form.unloadingCharges || 0) - parseInt(form.commission || 0) - parseInt(form.miscCharges || 0), c: 'var(--accent)' },
                                            ].map((k) => (
                                                <div key={k.label}>
                                                    <div className='trip-generator-modal-pl-label'>{k.label}</div>
                                                    <div className="rj trip-generator-modal-pl-value" style={{ color: k.c }}>₹{k.val.toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {step === 6 && (<Review form={form} set={set} fleetSource={fleetSource} />)}
                        <DialogActions sx={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
                            <button className="control-btn trip-generator-modal-btn-gh" onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}>{step === 1 ? "Cancel" : "← Back"}</button>
                            <button className="control-btn trip-generator-modal-btn-p" onClick={() => step < 6 ? setStep(s => s + 1) : handleCreate()}>{step === 6 ? "🚀 Create Trip" : "Next →"}</button>
                        </DialogActions>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default TripGeneratorModal
