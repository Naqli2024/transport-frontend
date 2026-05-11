import React from 'react'
import { Ic } from '../../../components/icons/Ic';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

const TripDetailModal = ({ trip, open, onClose, JOURNEY_TYPES, STATUS_COLORS, tripExpTotal, fmt, setShowInspect, setTrips }) => {

    const t = trip;
    const jt = JOURNEY_TYPES.find(j => j.id === t.journeyType);
    const isOwn = t.vehicleType === "own";
    const totalExp = tripExpTotal(t.expenses) + (isOwn ? 0 : (t.vendorCost || 0));
    const profit = t.freight - totalExp;
    const margin = t.freight > 0 ? ((profit / t.freight) * 100).toFixed(1) : "0.0";
    const driverBalance = isOwn ? (t.advance - tripExpTotal(t.expenses)) : 0;
    const driverOwes = driverBalance > 0;
    const statusSeq = ["Pre-Trip Pending", "Pre-Trip Done", "Started", "In Transit", "Arrived", "Post-Trip Pending", "Post-Trip Done", "Invoiced", "Closed"];
    const statusIdx = statusSeq.indexOf(t.status);
    return (
        <div>
            <Dialog open={open}
                onClose={onClose}
                maxWidth='lg'
                fullWidth
                sx={{
                    "& .MuiBackdrop-root": {
                        background: "rgba(0,0,0,.85)",
                        backdropFilter: "blur(8px)"
                    },
                    "& .MuiDialog-container": {
                        alignItems: "flex-start",
                        paddingTop: "20px",
                        overflowY: isOwn ? "scroll" : "auto"
                    },
                    "& .MuiPaper-root": {
                        background: 'var(--bgCard)',
                        border: '1px solid var(--borderHi)',
                        borderRadius: "16px",
                        width: "100%",
                        maxHeight: "unset",
                        overflowY: "visible"
                    }
                }}>
                <DialogContent
                    sx={{ p: 0 }}>

                    <div className='trip-modal-container' style={{ background: `linear-gradient(135deg,${isOwn ? "#052E16,#064E3B" : "#1E1B4B,#2E1065"})` }}>
                        <div className='trip-modal-main'>
                            <div>
                                <div className="trip-modal-header">
                                    <div className="rj trip-modal-title">
                                        {isOwn ? "🚚" : "🤝"} TRIP SHEET
                                    </div>
                                    <span className="control-badge trip-modal-badge-id">{t.id}</span>
                                </div>
                                <div className='trip-modal-route'>{t.route}</div>
                                <div className='trip-modal-badges'>
                                    {jt && <span className="control-badge" style={{ background: jt.color + "33", color: jt.color }}>{jt.icon} {jt.label}</span>}
                                    <span className="control-badge" style={{ background: isOwn ? 'var(--green)' + "33" : 'var(--purple)' + "33", color: isOwn ? 'var(--green)' : 'var(--purple)' }}>{isOwn ? "Own Fleet" : "Vendor Trip"}</span>
                                    <span className="control-badge trip-modal-badge-load" >{t.loadType}</span>
                                    <span className="control-badge trip-modal-badge-load" >{t.weight}</span>
                                    <span className="control-badge" style={{ background: (STATUS_COLORS[t.status] || 'var(--textSub)') + "44", color: STATUS_COLORS[t.status] || "#fff" }}>{t.status}</span>
                                </div>
                            </div>
                            <div className='trip-modal-right'>
                                <div className='trip-modal-right-side'>
                                    <div className='trip-modal-right-title'>Date Created</div>
                                    <div className='trip-modal-date'>{t.dateCreated}</div>
                                </div>
                                <button className="control-btn trip-modal-icon-btn" onClick={onClose}><Ic n="x" s={14} c="#fff" /></button>
                            </div>
                        </div>
                    </div>

                    <div className='trip-modal-timeline-container'>
                        <div className='trip-modal-timeline-main'>
                            {statusSeq.map((s, i) => {
                                const done = i < statusIdx;
                                const curr = i === statusIdx;
                                const col = done ? 'var(--green)' : curr ? 'var(--accent)' : 'var(--textMuted)';
                                return (
                                    <div key={s} className='trip-modal-timeline-sheet'>
                                        <div className='trip-modal-timeline-sheet-main'>
                                            <div className='trip-modal-timeline-avatar' style={{ background: curr ? 'var(--accent)' : done ? 'var(--green)' : 'var(--bgCard)', border: `2px solid ${col}`, color: done ? "#fff" : curr ? "#080B10" : 'var(--textMuted)' }}>
                                                {done ? "✓" : i + 1}
                                            </div>
                                            <div className='trip-modal-timeline-data' style={{ color: col, fontWeight: curr ? 700 : 400 }}>{s}</div>
                                        </div>
                                        {i < statusSeq.length - 1 && <div className="trip-modal-timeline-seq" style={{ background: done ? 'var(--green)' : 'var(--border)' }} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='trip-modal-main-content'>
                        <div className='trip-modal-summary-grid'>
                            {[
                                { l: "Freight Revenue", v: fmt(t.freight), c: 'var(--green)', border: 'var(--green)' },
                                { l: isOwn ? "Total Expenses" : "Vendor + Extras", v: fmt(totalExp), c: 'var(--red)', border: 'var(--red)' },
                                { l: "Net Profit", v: fmt(profit), c: profit >= 0 ? 'var(--green)' : 'var(--red)', border: profit >= 0 ? 'var(--green)' : 'var(--red)' },
                                { l: "Margin %", v: `${margin}%`, c: parseFloat(margin) > 20 ? 'var(--green)' : parseFloat(margin) > 5 ? 'var(--accent)' : 'var(--red)', border: 'var(--accent)' },
                                { l: isOwn ? "Advance Given" : "Vendor Cost", v: isOwn ? fmt(t.advance) : fmt(t.vendorCost || 0), c: 'var(--orange)', border: 'var(--orange)' },
                            ].map((k) => (
                                <div key={k.l} className='trip-modal-summary-main' style={{ border: `1px solid ${k.border}22`, borderTop: `3px solid ${k.border}` }}>
                                    <div className='trip-modal-summary-l'>{k.l}</div>
                                    <div className="rj trip-modal-summary-v" style={{ color: k.c }}>{k.v}</div>
                                </div>
                            ))}
                        </div>

                        <div className='row g-3' style={{ marginBottom: "16px" }}>

                            <div className='col-lg-4'>
                                <div className='trip-modal-trip-card' style={{ height: '410px' }}>
                                    <div className="section-title">📋 Trip Information</div>
                                    {
                                        [
                                            ["Trip ID", t.id],
                                            ["Route", t.route],
                                            ["Distance", `${t.distanceKm || "—"} km`],
                                            ["Journey Type", jt?.label || "—"],
                                            ["Load Type", t.loadType],
                                            ["Weight", t.weight],
                                            ["Customer", t.customer],
                                            ["Agent / Broker", t.agent],
                                            ["LR Number", t.lrNumber || "—"],
                                            ["Date Created", t.dateCreated],
                                        ].map(([k, v]) => (
                                            <div key={k} className='trip-modal-trip-row'>
                                                <span className='trip-modal-trip-l'>{k}</span>
                                                <span className='trip-modal-trip-v' style={{ color: k === "Trip ID" ? "transparent" : k === "Customer" ? 'var(--accent)' : 'var(--text)', fontFamily: k === "Trip ID" ? "JetBrains Mono" : "inherit", fontSize: k === "Trip ID" ? 11 : 12 }}>{v}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className='col-lg-4'>
                                <div className='trip-modal-trip-card' style={{ height: '410px' }}>
                                    <div className='section-title'>{isOwn ? "🚛 Vehicle & Driver" : "🤝 Vendor Details"}</div>
                                    {(isOwn ? [
                                        ["Vehicle No.", t.vehicle || "—"],
                                        ["Vehicle Type", t.vehicleLabel || "—"],
                                        ["Driver", t.driver || "—"],
                                        ["Driver ID", t.driverId || "—"],
                                        ["Advance Given", fmt(t.advance)],
                                        ["Diesel (litres)", `${Math.round((t.expenses?.diesel || 0) / 100)} L`],
                                        ["Start Odometer", t.startOdometer || "—"],
                                        ["End Odometer", "—"],
                                    ] : [
                                        ["Vendor Name", t.vendor || "—"],
                                        ["Vendor Vehicle", t.vendorVehicle || "—"],
                                        ["Vendor Rate/km", t.vendorRatePerKm ? `₹${t.vendorRatePerKm}/km` : "—"],
                                        ["Vendor Cost", fmt(t.vendorCost || 0)],
                                        ["Driver", "Vendor-assigned"],
                                        ["Advance Given", "None"],
                                        ["KYC Status", "Verified ✓"],
                                        ["Contact", "—"],
                                    ]).map(([k, v]) => (
                                        <div key={k} className='trip-modal-trip-row'>
                                            <span className='trip-modal-trip-l'>{k}</span>
                                            <span className='trip-modal-trip-v' style={{ fontFamily: ["Vehicle No.", "Driver ID"].includes(k) ? "JetBrains Mono" : "inherit", fontSize: ["Vehicle No.", "Driver ID"].includes(k) ? 11 : 12, color: k === "Vendor Name" ? 'var(--purple)' : k === "Vendor Cost" ? 'var(--red)' : 'var(--text)' }}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='col-lg-4'>
                                <div className='trip-modal-trip-card'>
                                    <div className='section-title'>💰 Expense Ledger</div>

                                    {/* {Income} */}
                                    <div className="trip-modal-income-title">INCOME</div>
                                    {[
                                        ["Freight Revenue", t.freight, '#10B981'],
                                        ["Advance Received", t.advance || 0, '#10B981'],
                                    ].map(([k, v, c]) => (
                                        <div key={k} className="trip-modal-ledger-row">
                                            <span className="trip-modal-ledger-label">{k}</span>
                                            <span className="trip-modal-ledger-cr">{fmt(v)}</span>
                                        </div>
                                    ))}

                                    <div className="divider" />

                                    {/* Expenses */}
                                    <div className="trip-modal-expenses-title">EXPENSES</div>
                                    {(isOwn ? [
                                        ["Diesel / Fuel", t.expenses?.diesel || 0],
                                        ["Toll Charges", t.expenses?.toll || 0],
                                        ["Loading Charges", t.expenses?.loading || 0],
                                        ["Unloading Charges", t.expenses?.unloading || 0],
                                        ["Misc / Others", t.expenses?.misc || 0],
                                    ] : [
                                        ["Vendor Cost", t.vendorCost || 0],
                                        ["Toll (our share)", t.expenses?.toll || 0],
                                        ["Loading", t.expenses?.loading || 0],
                                        ["Unloading", t.expenses?.unloading || 0],
                                        ["Misc", t.expenses?.misc || 0],
                                    ]).map(([k, v]) => (
                                        <div key={k} className='trip-modal-ledger-row'>
                                            <span className='trip-modal-ledger-label'>{k}</span>
                                            <span className='trip-modal-ledger-dr'>{v > 0 ? fmt(v) : <span className='ledger-s'>—</span>}</span>
                                        </div>
                                    ))}

                                    <div className="divider" />

                                    {/* Net */}
                                    <div className="trip-modal-profit-row">
                                        <span className="trip-modal-profit-label">NET PROFIT</span>
                                        <span className="trip-modal-profit-value rj" style={{ color: profit >= 0 ? 'var(--green)' : 'var(--red)' }}>{fmt(profit)}</span>
                                    </div>
                                    <div className='trip-modal-margin-row'>
                                        <span className='trip-modal-margin-label'>Margin</span>
                                        <span className='trip-modal-margin-value' style={{ color: parseFloat(margin) > 20 ? 'var(--green)' : parseFloat(margin) > 5 ? 'var(--accent)' : 'var(--red)' }}>{margin}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── DRIVER SETTLEMENT SNAPSHOT (own fleet only) ── */}
                        {isOwn && (
                            <div className='trip-modal-driver-settlement-card' style={{ background: driverOwes ? 'var(--redGlow)' : 'var(--greenGlow)', border: `1px solid ${driverOwes ? 'var(--red)' : 'var(--green)'}33` }}>
                                <div className='trip-modal-driver-settlement-header'>
                                    <div>
                                        <div className='trip-modal-driver-settlement-title'>👤 Driver Settlement — {t.driver}</div>
                                        <div className='trip-modal-driver-settlement-details'>
                                            {[
                                                ["Advance Given", fmt(t.advance), "#F97316"],
                                                ["Total Expenses", fmt(tripExpTotal(t.expenses)), "#EF4444"],
                                                [driverOwes ? "Driver Returns" : "Pay Driver", fmt(Math.abs(driverBalance)), driverOwes ? "#EF4444" : "#10B981"]
                                            ].map(([k, v, c]) => (
                                                <div key={k}>
                                                    <span className='trip-modal-settlement-label'>{k}: </span>
                                                    <span className='trip-modal-settlement-value' style={{ color: c }}>{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="control-btn trip-modal-btn-orange trip-modal-settlement-btn">
                                        <Ic n="wallet" s={13} /> Settle Now
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── DOCS & POD ROW ── */}
                        <div className='row g-3' style={{ marginBottom: "16px" }}>
                            {[
                                {
                                    icon: "doc",
                                    label: "Lorry Receipt (LR)",
                                    value: t.lrNumber || "Pending",
                                    color: '#3B82F6',
                                    done: !!t.lrNumber,
                                },
                                {
                                    icon: "clipboard",
                                    label: "POD — Proof of Delivery",
                                    value: "Not Uploaded",
                                    color: '#F97316',
                                    done: false,
                                },
                                {
                                    icon: "finance",
                                    label: "Invoice Status",
                                    value:
                                        t.status === "Invoiced" || t.status === "Closed"
                                            ? "Invoiced"
                                            : "Not Raised",
                                    color:
                                        t.status === "Invoiced" || t.status === "Closed"
                                            ? '#10B981'
                                            : '#3D4F6A',
                                    done: t.status === "Invoiced" || t.status === "Closed",
                                },
                            ].map((d) => (
                                <div className='col-lg-4' key={d.label}>
                                    <div className='trip-modal-doc-card' style={{ border: `1px solid ${d.done ? d.color + "44" : 'var(--border)'}` }}>
                                        <div className="trip-modal-doc-icon-box" style={{ background: d.color + "18", border: `1px solid ${d.color}33` }}>
                                            <Ic n={d.icon} s={16} c={d.color} />
                                        </div>
                                        <div className="trip-modal-doc-content">
                                            <div className="trip-modal-doc-label">{d.label}</div>
                                            <div className="trip-modal-doc-value" style={{ color: d.color }}>{d.value}</div>
                                        </div>
                                        {!d.done && <button className="control-btn trip-modal-upload-btn" style={{ background: d.color + "20", color: d.color, border: `1px solid ${d.color}33` }}>Upload</button>}
                                        {d.done && <span className="trip-modal-doc-check">✓</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── INSPECTION HISTORY ── */}
                        <div className='trip-modal-inspection-container'>
                            <div className='section-title'>🔍 Inspection History</div>
                            <div className='row g-3'>
                                {
                                    [
                                        {
                                            type: "Pre-Trip",
                                            status: [
                                                "Pre-Trip Done",
                                                "Started",
                                                "In Transit",
                                                "Arrived",
                                                "Post-Trip Pending",
                                                "Post-Trip Done",
                                                "Invoiced",
                                                "Closed",
                                            ].includes(t.status)
                                                ? "Completed"
                                                : "Pending",
                                            icon: "pretrip",
                                            color: [
                                                "Pre-Trip Done",
                                                "Started",
                                                "In Transit",
                                                "Arrived",
                                                "Post-Trip Pending",
                                                "Post-Trip Done",
                                                "Invoiced",
                                                "Closed",
                                            ].includes(t.status)
                                                ? '#10B981'
                                                : '#F97316',
                                        },
                                        {
                                            type: "Post-Trip",
                                            status: ["Post-Trip Done", "Invoiced", "Closed"].includes(t.status)
                                                ? "Completed"
                                                : t.status === "Post-Trip Pending"
                                                    ? "Pending — Action Required"
                                                    : "Not Yet",
                                            icon: "posttrip",
                                            color: ["Post-Trip Done", "Invoiced", "Closed"].includes(t.status)
                                                ? '#10B981'
                                                : t.status === "Post-Trip Pending"
                                                    ? '#F97316'
                                                    : '#3D4F6A',
                                        },
                                    ].map((ins) => (
                                        <div className='col-lg-6'>
                                            <div className='trip-modal-inspection-card' style={{ border: `1px solid ${ins.color}33` }}>
                                                <div className="trip-modal-inspection-icon-box" style={{ background: `${ins.color}18`, border: `1px solid ${ins.color}33` }}>
                                                    <Ic n={ins.icon} s={15} c={ins.color} />
                                                </div>
                                                <div className="trip-modal-inspection-content">
                                                    <div className="trip-modal-inspection-title">{ins.type} Inspection</div>
                                                    <div className="trip-modal-inspection-status" style={{ color: ins.color }}>{ins.status}</div>
                                                </div>
                                                {ins.status.includes("Pending") && (
                                                    <button
                                                        className="control-btn trip-modal-inspection-btn"
                                                        style={{
                                                            background: `${ins.color}20`,
                                                            color: ins.color,
                                                            border: `1px solid ${ins.color}33`,
                                                        }}
                                                        onClick={() => {
                                                            onClose();
                                                            setShowInspect({
                                                                trip: t,
                                                                type: ins.type === "Pre-Trip" ? "pre" : "post",
                                                            });
                                                        }}
                                                    >
                                                        Start
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* ── ACTIONS FOOTER ── */}
                        <DialogActions sx={{display:"flex",gap:"8px",flexWrap:"wrap",paddingTop:"4px"}} >
                            {t.status === "Pre-Trip Pending" && <button className="control-btn trip-modal-btn-green trip-modal-btn-trip" onClick={() => { onClose(); setShowInspect({ trip: t, type: "pre" }) }}><Ic n="pretrip" s={13} /> Pre-Trip Inspect</button>}
                            {t.status === "Post-Trip Pending" && <button className="control-btn trip-modal-btn-blue trip-modal-btn-trip" onClick={() => { onClose(); setShowInspect({ trip: t, type: "post" }) }}><Ic n="posttrip" s={13} /> Post-Trip Inspect</button>}
                            {["Started", "In Transit"].includes(t.status) && <button className="control-btn trip-modal-btn-green trip-modal-btn-trip" onClick={() => setTrips(ts => ts.map(x => x.id === t.id ? { ...x, status: "Arrived" } : x))}><Ic n="check" s={13} /> Mark Arrived</button>}
                            {t.status === "Arrived" && <button className="control-btn trip-modal-btn-green trip-modal-btn-trip" onClick={() => setTrips(ts => ts.map(x => x.id === t.id ? { ...x, status: "Post-Trip Pending" } : x))}><Ic n="check" s={13} /> Mark Delivered → Post-Trip</button>}
                            {t.status === "Post-Trip Done" && <button className="control-btn trip-modal-btn-cyan trip-modal-btn-trip" onClick={() => setTrips(ts => ts.map(x => x.id === t.id ? { ...x, status: "Invoiced" } : x))}><Ic n="finance" s={13} /> Raise Invoice</button>}
                            <button className="control-btn trip-modal-btn-blue trip-modal-btn-trip"><Ic n="doc" s={13} /> Upload POD</button>
                            {isOwn && <button className="control-btn trip-modal-btn-orange trip-modal-btn-trip"><Ic n="wallet" s={13} /> Settle Driver</button>}
                            <button className="control-btn trip-modal-btn-gh trip-modal-btn-trip" style={{ marginLeft: "auto" }} onClick={onClose}>Close</button>
                          </DialogActions>
                       
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TripDetailModal
