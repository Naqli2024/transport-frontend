import React, { useState } from 'react'
import { Ic } from '../../../components/icons/Ic'
import { STATUS_COLORS, TRIP_LIFECYCLE } from '../../../helpers/TripLifeCycle';
import { JOURNEY_TYPES } from '../../../helpers/JourneyTypes';
import { fmt, tripExpTotal } from '../../../helpers/RiskBadge';
import { Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AllTrips = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showInspect, setShowInspect] = useState(null);
  const [showTripDetail, setShowTripDetail] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");

  const [trips, setTrips] = useState([
    { id: "TRP-2025-0041", vehicleType: "own", driver: "Mani Kumar", driverId: "DRV-001", vehicle: "TN69 GH4789", vendorVehicle: null, vendor: null, route: "Chennai â†’ Coimbatore", fromCity: "Chennai", toCity: "Coimbatore", distanceKm: 480, freight: 42000, advance: 20000, expenses: { diesel: 12000, toll: 3000, loading: 500, unloading: 500, misc: 500 }, status: "In Transit", agent: "Raja Broker", loadType: "FTL", customer: "Ramco Cements", dateCreated: "2025-04-10", weight: "18T", journeyType: "oneway", vehicleLabel: "Tripper Â· 16 Wheelers" },
    { id: "TRP-2025-0042", vehicleType: "own", driver: "Selvam R", driverId: "DRV-002", vehicle: "TN59 AB1234", vendorVehicle: null, vendor: null, route: "Madurai â†’ Bangalore", fromCity: "Madurai", toCity: "Bangalore", distanceKm: 440, freight: 38000, advance: 18000, expenses: { diesel: 11000, toll: 2500, loading: 500, unloading: 500, misc: 200 }, status: "Post-Trip Pending", agent: "Suresh Agency", loadType: "FTL", customer: "Godrej Industries", dateCreated: "2025-04-12", weight: "22T", journeyType: "roundtrip", vehicleLabel: "Open Body Â· 14 Wheelers" },
    { id: "TRP-2025-0043", vehicleType: "vendor", driver: "External Driver", driverId: null, vehicle: null, vendorVehicle: "TN32 XY7821", vendor: "Sri Murugan Transport", route: "Trichy â†’ Mumbai", fromCity: "Trichy", toCity: "Mumbai", distanceKm: 1280, freight: 75000, advance: 0, expenses: { diesel: 0, toll: 5000, loading: 1000, unloading: 1000, misc: 1000 }, vendorCost: 53760, status: "Pre-Trip Pending", agent: "Direct", loadType: "FTL", customer: "TVS Motors", dateCreated: "2025-04-13", weight: "28T", journeyType: "oneway", vehicleLabel: "Vendor Tripper" },
    { id: "TRP-2025-0044", vehicleType: "own", driver: "Arjun D", driverId: "DRV-004", vehicle: "TN38 EF9012", vendorVehicle: null, vendor: null, route: "Salem â†’ Hyderabad", fromCity: "Salem", toCity: "Hyderabad", distanceKm: 520, freight: 33000, advance: 15000, expenses: { diesel: 9000, toll: 2000, loading: 400, unloading: 400, misc: 300 }, status: "Invoiced", agent: "Kumar Freight", loadType: "LTL", customer: "Pepsico India", dateCreated: "2025-04-14", weight: "12T", journeyType: "crossregion", vehicleLabel: "Flatbed Â· 12 Wheelers" },
    { id: "TRP-2025-0045", vehicleType: "vendor", driver: "External Driver", driverId: null, vehicle: null, vendorVehicle: "TN58 AB1100", vendor: "KPR Fleet Solutions", route: "Coimbatore â†’ Delhi", fromCity: "Coimbatore", toCity: "Delhi", distanceKm: 2100, freight: 92000, advance: 0, expenses: { diesel: 0, toll: 7000, loading: 1500, unloading: 1500, misc: 500 }, vendorCost: 92400, status: "Booked", agent: "Raja Broker", loadType: "FTL", customer: "Asian Paints", dateCreated: "2025-04-15", weight: "24T", journeyType: "dedicated", vehicleLabel: "Vendor Trailer" },
    { id: "TRP-2025-0046", vehicleType: "own", driver: "Karthik M", driverId: "DRV-006", vehicle: "TN22 IJ7890", vendorVehicle: null, vendor: null, route: "Chennai â†’ Pune", fromCity: "Chennai", toCity: "Pune", distanceKm: 1200, freight: 55000, advance: 25000, expenses: { diesel: 14000, toll: 4000, loading: 800, unloading: 800, misc: 400 }, status: "Pre-Trip Done", agent: "Suresh Agency", loadType: "FTL", customer: "Raj Textiles", dateCreated: "2025-04-09", weight: "20T", journeyType: "multileg", vehicleLabel: "LCV Â· 4 Wheeler" },
    { id: "TRP-2025-0047", vehicleType: "own", driver: "Mani Kumar", driverId: "DRV-001", vehicle: "TN71 GH3456", vendorVehicle: null, vendor: null, route: "Coimbatore â†’ Hyderabad", fromCity: "Coimbatore", toCity: "Hyderabad", distanceKm: 680, freight: 47000, advance: 22000, expenses: { diesel: 15000, toll: 3500, loading: 600, unloading: 600, misc: 400 }, status: "Closed", agent: "Raja Broker", loadType: "FTL", customer: "SKS Logistics", dateCreated: "2025-04-01", weight: "20T", journeyType: "oneway", vehicleLabel: "Container Â· 14 Wheeler" },
  ]);

  const handleCreated = (trip) => setTrips(t => [trip, ...t]);
  const handleInspectionComplete = (tripId, type, checks, remarks, decision) => {
    setTrips(ts => ts.map(t => {
      if (t.id !== tripId) return t;
      if (type === "pre") return { ...t, status: decision === "maintenance" ? "In Maintenance" : "Pre-Trip Done" };
      return { ...t, status: decision === "approve" ? "Post-Trip Done" : decision === "maintenance" ? "In Maintenance" : "Invoiced" };
    }));
  };

  const filtered = trips.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.route.toLowerCase().includes(search.toLowerCase()) ||
      (t.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.vehicle || "").toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filterTab === "own") return t.vehicleType === "own";
    if (filterTab === "vendor") return t.vehicleType === "vendor";
    if (filterTab === "active") return ["Pre-Trip Pending", "Pre-Trip Done", "Started", "In Transit", "Arrived", "Post-Trip Pending"].includes(t.status);
    if (filterTab === "pending") return ["Pre-Trip Pending", "Post-Trip Pending"].includes(t.status);
    return true;
  });

  const pendingInspections = trips.filter(t => t.status === "Pre-Trip Pending" || t.status === "Post-Trip Pending");

  const tripStats = [
    {
      label: "Total Trips",
      value: trips.length,
      color: "#3B82F6"
    },
    {
      label: "Own Fleet",
      value: trips.filter((t) => t.vehicleType === "own").length,
      color: "#10B981"
    },
    {
      label: "Vendor Trips",
      value: trips.filter((t) => t.vehicleType === "vendor").length,
      color: "#8B5CF6"
    },
    {
      label: "Inspection Pending",
      value: pendingInspections.length,
      color: "#F97316"
    },
    {
      label: "Total Freight",
      value: "â‚¹" + trips.reduce((sum, t) => sum + t.freight, 0).toLocaleString(),
      color: "#F59E0B"
    }
  ]


  return (
    <div>
      <div className='live-container'>
        <div>
          <h1 className='rj rj-size'>Trips Management</h1>
          <p className='control-sub'>{trips.length} trips Â· â‚¹{trips.reduce((s, t) => s + t.freight, 0).toLocaleString()} freight Â· Own fleet + vendor vehicles</p>
        </div>
        <button className='btn btn-p'><Ic n="plus" s={14} c="#080B10" /> New Trip Booking</button>
      </div>

      <div className='kpi-row kpi-col'>
        {tripStats.map((k) => (
          <div className='stat' key={k.label} style={{ borderTop: `3px solid ${k.color}` }}>
            <div className='stat-v' style={{ color: k.color }}>{k.value}</div>
            <div className='stat-l'>{k.label}</div>
          </div>
        ))}
      </div>

      <div className='lifecycle-bar'>
        {TRIP_LIFECYCLE.map((ls, i) => {
          const count = trips.filter((t) => t.status === ls).length
          return (
            <div key={ls} className={`lc-step ${count > 0 ? "active" : ""}`}>
              <div className='lc-s' style={{ color: count > 0 ? 'var(--accent)' : 'var(--textMuted)' }}>{ls}</div>
              {count > 0 && <div className="rj ms">{count}</div>}
            </div>
          )
        })}
      </div>

      {pendingInspections.length > 0 && (
        <div className='card-box card-pi'>
          <div className="section-title" style={{ color: 'var(--orange)' }}>âš¡ Inspection Action Required â€” {pendingInspections.length} trip(s)</div>
          {trips.filter((t) => t.status === "Pre-Trip Pending").map((t) => (
            <div className='arow blc-g' key={t.id}>
              <Ic n="pretrip" s={13} c='var(--green)' />
              <div style={{ flex: 1 }}>
                <span className="mono mono-pre">{t.id}</span>
                <span className='pre-route'>{t.route} Â· {t.vehicleType === "vendor" ? t.vendor : t.vehicle} Â· {t.vehicleLabel}</span>
              </div>
              <button className="btn btn-g btn-g-s" onClick={() => setShowInspect({ trip: t, type: "pre" })}>âœ… Pre-Trip Inspect</button>
            </div>
          ))}
          {trips.filter((t) => t.status === "Post-Trip Pending").map((t) => (
            <div className='arow blc-b' key={t.id}>
              <Ic n="posttrip" s={13} c='var(--blue)' />
              <div style={{ flex: 1 }}>
                <span className="mono mono-pre">{t.id}</span>
                <span className="pre-route">{t.route} Â· {t.vehicle}</span>
              </div>
              <button className="btn btn-b btn-g-s" onClick={() => setShowInspect({ trip: t, type: "post" })}>ðŸ“‹ Post-Trip Inspect</button>
            </div>
          ))}
        </div>
      )}

      <div className='view-container'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search trips, vehicle, customerâ€¦' className='search-input' />
        <div className='view-option'>
          {["kanban", "list"].map((v) => (
            <button key={v} onClick={() => setViewMode(v)} className="btn btn-v" style={{ background: viewMode === v ? 'var(--accentGlow)' : "transparent", color: viewMode === v ? 'var(--accent)' : 'var(--textSub)' }}>{v}</button>
          ))}
        </div>
        <div className="toggle-pill">
          {["all", "own", "vendor", "active", "pending"].map((f) => (
            <div key={f} className={`toggle-opt toggle-s ${filterTab === f ? "on" : ""}`} style={{ fontSize: 11 }} onClick={() => setFilterTab(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</div>
          ))}
        </div>
      </div>

      {viewMode == "kanban" && (
        <div className='k-container'>
          {TRIP_LIFECYCLE.map((col) => {
            const ct = filtered.filter((t) => t.status === col)
            const jtype = JOURNEY_TYPES
            return (
              <div key={col} className='kanban-col'>
                <div className='kanban-stat' style={{ color: STATUS_COLORS[col] || 'var(--textMuted)' }}>
                  {col} <span className='ct-len'>{ct.length}</span>
                </div>
                {ct.map((t) => {
                  const jt = jtype.find(j => j.id === t.journeyType)
                  return (
                    <div key={t.id} className="kanban-card" onClick={() => setShowTripDetail(t)}>
                      <div className="mono mono-kan">{t.id}</div>
                      <div className='rs-s'>{t.route}</div>
                      {jt && <div className='jt-s' style={{ color: jt.color }}>{jt.icon} {jt.label}</div>}
                      <div className="jt-main">
                        <span className={`badge b-f ${t.vehicleType === "own" ? "bg" : "bp"}`} >{t.vehicleType === "own" ? "Own" : "Vendor"}</span>
                        <span className="badge bc b-f">{t.loadType}</span>
                      </div>
                      <div className='kanban-own' >{t.vehicleType === "own" ? t.vehicle : t.vendor}</div>
                      {t.status === "Pre-Trip Pending" && (
                        <button className="btn btn-g pre-btn" onClick={e => { e.stopPropagation(); setShowInspect({ trip: t, type: "pre" }) }}>Pre-Trip Inspect</button>
                      )}
                      {t.status === "Post-Trip Pending" && (
                        <button className="btn btn-b pre-btn" onClick={e => { e.stopPropagation(); setShowInspect({ trip: t, type: "post" }) }}>Post-Trip Inspect</button>
                      )}
                      {!["Pre-Trip Pending", "Post-Trip Pending"].includes(t.status) && (
                        <div className='pending-status' >
                          <span className="pend-freight">â‚¹{t.freight.toLocaleString()}</span>
                          <span className="pend-total">+â‚¹{(t.freight - tripExpTotal(t.expenses) - (t.vendorCost || 0)).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
                {ct.length === 0 && <div className='empty'>Empty</div>}
              </div>
            )
          })}
        </div>
      )}
      {viewMode === 'list' && (
        <div className='card-box' style={{ padding: 0 }}>
          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow sx={{
                  "& .MuiTableCell-root": {
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    color: 'var(--textMuted)',
                    padding: "9px 12px",
                    textAlign: "left",
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--bgPanel)'
                  }
                }}>
                  <TableCell>Trip ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Route</TableCell>
                  <TableCell>Journey</TableCell>
                  <TableCell>Vehicle/Vendor</TableCell>
                  <TableCell>Driver</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Freight</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((t) => {
                  const jt = JOURNEY_TYPES.find((j) => j.id === t.journeyType);
                  return (
                    <TableRow key={t.id}
                      sx={{
                        cursor: "pointer",
                        "& .MuiTableCell-root": {
                          borderBottom: "none"
                        },
                        "&:hover .MuiTableCell-root": {
                          background: 'var(--bgPanel)',
                          color: 'var(--text)'
                        }
                      }}
                      onClick={() => setShowTripDetail(t)}>
                      <TableCell sx={{ fontSize: 11, color: 'var(--accent)', fontFamily: "JetBrains Mono" }}>{t.id}</TableCell>
                      <TableCell>{t.vehicleType === "own" ? (<span className="badge bg">Own</span>) : (<span className="badge bp">Vendor</span>)}</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, color: 'var(--textSub)' }}>{t.route}</TableCell>
                      <TableCell>{jt && (<span className="badge" style={{ background: jt.color + "20", color: jt.color, fontSize: 10 }}>{jt.icon} {jt.tag}</span>)}</TableCell>
                      <TableCell sx={{ fontSize: 11, fontFamily: "JetBrains Mono", color: 'var(--textSub)' }}>{t.vehicleType === "own" ? t.vehicle : t.vendor}</TableCell>
                      <TableCell sx={{ fontSize: 12, color: 'var(--textSub)' }}> {t.driver}</TableCell>
                      <TableCell sx={{ fontSize: 12, color: 'var(--textSub)' }}>{t.customer}</TableCell>
                      <TableCell sx={{ color: 'var(--green)', fontWeight: 600, fontFamily: "Rajdhani,sans-serif" }}>â‚¹{t.freight.toLocaleString()}</TableCell>
                      <TableCell><span className="badge" style={{ background: (STATUS_COLORS[t.status] || 'var(--textSub)') + "22", color: STATUS_COLORS[t.status] || 'var(--textSub)' }}>{t.status}</span></TableCell>
                      <TableCell onClick={e => e.stopPropagation()}>
                        {t.status === "Pre-Trip Pending" && <button className="btn btn-g btn-gh-s" onClick={() => setShowInspect({ trip: t, type: "pre" })}>Pre-Trip</button>}
                        {t.status === "Post-Trip Pending" && <button className="btn btn-b btn-gh-s" onClick={() => setShowInspect({ trip: t, type: "post" })}>Post-Trip</button>}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* â”€â”€ TRIP SHEET MODAL  */}
      {showTripDetail && (() => {
        const t = showTripDetail;
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
          <Dialog open={!!showTripDetail}
            onClose={() => setShowTripDetail(null)}
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
                maxHeight: isOwn ? "unset" : "1020px",
                overflowY: isOwn ? "visible" : "auto"
              }
            }}>
            <DialogContent
              sx={{ p: 0 }}>

              <div className='trip-modal-container' style={{ background: `linear-gradient(135deg,${isOwn ? "#052E16,#064E3B" : "#1E1B4B,#2E1065"})` }}>
                <div className='trip-modal-main'>
                  <div>
                    <div className="trip-modal-title">
                      <div className="rj rj-font">
                        {isOwn ? "ðŸšš" : "ðŸ¤"} TRIP SHEET
                      </div>
                      <span className="badge badge-trip-bg">{t.id}</span>
                    </div>
                    <div className='trip-route'>{t.route}</div>
                    <div className='trip-badges'>
                      {jt && <span className="badge" style={{ background: jt.color + "33", color: jt.color }}>{jt.icon} {jt.label}</span>}
                      <span className="badge" style={{ background: isOwn ? 'var(--green)' + "33" : 'var(--purple)' + "33", color: isOwn ? 'var(--green)' : 'var(--purple)' }}>{isOwn ? "Own Fleet" : "Vendor Trip"}</span>
                      <span className="badge badge-load" >{t.loadType}</span>
                      <span className="badge badge-load" >{t.weight}</span>
                      <span className="badge" style={{ background: (STATUS_COLORS[t.status] || 'var(--textSub)') + "44", color: STATUS_COLORS[t.status] || "#fff" }}>{t.status}</span>
                    </div>
                  </div>
                  <div className='trip-right'>
                    <div className='trip-right-side'>
                      <div className='trip-right-title'>Date Created</div>
                      <div className='trip-date'>{t.dateCreated}</div>
                    </div>
                    <button className="btn btn-icon" onClick={() => setShowTripDetail(null)}><Ic n="x" s={14} c="#fff" /></button>
                  </div>
                </div>
              </div>

              <div className='timeline-container'>
                <div className='timeline-main'>
                  {statusSeq.map((s, i) => {
                    const done = i < statusIdx;
                    const curr = i === statusIdx;
                    const col = done ? 'var(--green)' : curr ? 'var(--accent)' : 'var(--textMuted)';
                    return (
                      <div key={s} className='timeline-sheet'>
                        <div className='timeline-sheet-main'>
                          <div className='timeline-avatar' style={{ background: curr ? 'var(--accent)' : done ? 'var(--green)' : 'var(--bgCard)', border: `2px solid ${col}`, color: done ? "#fff" : curr ? "#080B10" : 'var(--textMuted)' }}>
                            {done ? "âœ“" : i + 1}
                          </div>
                          <div className='timeline-data' style={{ color: col, fontWeight: curr ? 700 : 400 }}>{s}</div>
                        </div>
                        {i < statusSeq.length - 1 && <div className="timeline-seq" style={{ background: done ? 'var(--green)' : 'var(--border)' }} />}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='main-content'>
                <div className='summary-grid'>
                  {[
                    { l: "Freight Revenue", v: fmt(t.freight), c: 'var(--green)', border: 'var(--green)' },
                    { l: isOwn ? "Total Expenses" : "Vendor + Extras", v: fmt(totalExp), c: 'var(--red)', border: 'var(--red)' },
                    { l: "Net Profit", v: fmt(profit), c: profit >= 0 ? 'var(--green)' : 'var(--red)', border: profit >= 0 ? 'var(--green)' : 'var(--red)' },
                    { l: "Margin %", v: `${margin}%`, c: parseFloat(margin) > 20 ? 'var(--green)' : parseFloat(margin) > 5 ? 'var(--accent)' : 'var(--red)', border: 'var(--accent)' },
                    { l: isOwn ? "Advance Given" : "Vendor Cost", v: isOwn ? fmt(t.advance) : fmt(t.vendorCost || 0), c: 'var(--orange)', border: 'var(--orange)' },
                  ].map((k) => (
                    <div key={k.l} className='summary-main' style={{ border: `1px solid ${k.border}22`, borderTop: `3px solid ${k.border}` }}>
                      <div className='summary-l'>{k.l}</div>
                      <div className="rj summary-v" style={{ color: k.c }}>{k.v}</div>
                    </div>
                  ))}
                </div>

                <div className='row g-3' style={{ marginBottom: "16px" }}>

                  <div className='col-lg-4'>
                    <div className='trip-card' style={{ height: '385px' }}>
                      <div className="section-title">ðŸ“‹ Trip Information</div>
                      {
                        [
                          ["Trip ID", t.id],
                          ["Route", t.route],
                          ["Distance", `${t.distanceKm || "â€”"} km`],
                          ["Journey Type", jt?.label || "â€”"],
                          ["Load Type", t.loadType],
                          ["Weight", t.weight],
                          ["Customer", t.customer],
                          ["Agent / Broker", t.agent],
                          ["LR Number", t.lrNumber || "â€”"],
                          ["Date Created", t.dateCreated],
                        ].map(([k, v]) => (
                          <div key={k} className='trip-row'>
                            <span className='trip-l'>{k}</span>
                            <span className='trip-v' style={{ color: k === "Trip ID" ? "transparent" : k === "Customer" ? 'var(--accent)' : 'var(--text)', fontFamily: k === "Trip ID" ? "JetBrains Mono" : "inherit", fontSize: k === "Trip ID" ? 11 : 12 }}>{v}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='trip-card' style={{ height: '385px' }}>
                      <div className='section-title'>{isOwn ? "ðŸš› Vehicle & Driver" : "ðŸ¤ Vendor Details"}</div>
                      {(isOwn ? [
                        ["Vehicle No.", t.vehicle || "â€”"],
                        ["Vehicle Type", t.vehicleLabel || "â€”"],
                        ["Driver", t.driver || "â€”"],
                        ["Driver ID", t.driverId || "â€”"],
                        ["Advance Given", fmt(t.advance)],
                        ["Diesel (litres)", `${Math.round((t.expenses?.diesel || 0) / 100)} L`],
                        ["Start Odometer", t.startOdometer || "â€”"],
                        ["End Odometer", "â€”"],
                      ] : [
                        ["Vendor Name", t.vendor || "â€”"],
                        ["Vendor Vehicle", t.vendorVehicle || "â€”"],
                        ["Vendor Rate/km", t.vendorRatePerKm ? `â‚¹${t.vendorRatePerKm}/km` : "â€”"],
                        ["Vendor Cost", fmt(t.vendorCost || 0)],
                        ["Driver", "Vendor-assigned"],
                        ["Advance Given", "None"],
                        ["KYC Status", "Verified âœ“"],
                        ["Contact", "â€”"],
                      ]).map(([k, v]) => (
                        <div key={k} className='trip-row'>
                          <span className='trip-l'>{k}</span>
                          <span className='trip-v' style={{ fontFamily: ["Vehicle No.", "Driver ID"].includes(k) ? "JetBrains Mono" : "inherit", fontSize: ["Vehicle No.", "Driver ID"].includes(k) ? 11 : 12, color: k === "Vendor Name" ? 'var(--purple)' : k === "Vendor Cost" ? 'var(--red)' : 'var(--text)' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='trip-card'>
                      <div className='section-title'>ðŸ’° Expense Ledger</div>

                      {/* {Income} */}
                      <div className="income-title">INCOME</div>
                      {[
                        ["Freight Revenue", t.freight, '#10B981'],
                        ["Advance Received", t.advance || 0, '#10B981'],
                      ].map(([k, v, c]) => (
                        <div key={k} className="ledger-row">
                          <span className="ledger-label">{k}</span>
                          <span className="ledger-cr">{fmt(v)}</span>
                        </div>
                      ))}

                      <div className="divider" />

                      {/* Expenses */}
                      <div className="expenses-title">EXPENSES</div>
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
                        <div key={k} className='ledger-row'>
                          <span className='ledger-label'>{k}</span>
                          <span className='ledger-dr'>{v > 0 ? fmt(v) : <span className='ledger-s'>â€”</span>}</span>
                        </div>
                      ))}

                      <div className="divider" />

                      {/* Net */}
                      <div className="profit-row">
                        <span className="profit-label">NET PROFIT</span>
                        <span className="profit-value rj" style={{ color: profit >= 0 ? 'var(--green)' : 'var(--red)' }}>{fmt(profit)}</span>
                      </div>
                      <div className='margin-row'>
                        <span className='margin-label'>Margin</span>
                        <span className='margin-value' style={{ color: parseFloat(margin) > 20 ? 'var(--green)' : parseFloat(margin) > 5 ? 'var(--accent)' : 'var(--red)' }}>{margin}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* â”€â”€ DRIVER SETTLEMENT SNAPSHOT (own fleet only) â”€â”€ */}
                {isOwn && (
                  <div className='driver-settlement-card' style={{ background: driverOwes ? 'var(--redGlow)' : 'var(--greenGlow)', border: `1px solid ${driverOwes ? 'var(--red)' : 'var(--green)'}33` }}>
                    <div className='driver-settlement-header'>
                      <div>
                        <div className='driver-settlement-title'>ðŸ‘¤ Driver Settlement â€” {t.driver}</div>
                        <div className='driver-settlement-details'>
                          {[
                            ["Advance Given", fmt(t.advance), "#F97316"],
                            ["Total Expenses", fmt(tripExpTotal(t.expenses)), "#EF4444"],
                            [driverOwes ? "Driver Returns" : "Pay Driver", fmt(Math.abs(driverBalance)), driverOwes ? "#EF4444" : "#10B981"]
                          ].map(([k, v, c]) => (
                            <div key={k}>
                              <span className='settlement-label'>{k}: </span>
                              <span className='settlement-value' style={{ color: c }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button className="btn btn-o settlement-btn">
                        <Ic n="wallet" s={13} /> Settle Now
                      </button>
                    </div>
                  </div>
                )}

                {/* â”€â”€ DOCS & POD ROW â”€â”€ */}
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
                      label: "POD â€” Proof of Delivery",
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
                      <div className='doc-card' style={{ border: `1px solid ${d.done ? d.color + "44" : 'var(--border)'}` }}>
                        <div className="doc-icon-box" style={{ background: d.color + "18", border: `1px solid ${d.color}33` }}>
                          <Ic n={d.icon} s={16} c={d.color} />
                        </div>
                        <div className="doc-content">
                          <div className="doc-label">{d.label}</div>
                          <div className="doc-value" style={{ color: d.color }}>{d.value}</div>
                        </div>
                        {!d.done && <button className="btn upload-btn" style={{ background: d.color + "20", color: d.color, border: `1px solid ${d.color}33` }}>Upload</button>}
                        {d.done && <span className="doc-check">âœ“</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* â”€â”€ INSPECTION HISTORY â”€â”€ */}
                <div className='inspection-container'>
                  <div className='section-title'>ðŸ” Inspection History</div>
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
                              ? "Pending â€” Action Required"
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
                          <div className='inspection-card' style={{ border: `1px solid ${ins.color}33` }}>
                            <div className="inspection-icon-box" style={{ background: `${ins.color}18`, border: `1px solid ${ins.color}33` }}>
                              <Ic n={ins.icon} s={15} c={ins.color} />
                            </div>
                            <div className="inspection-content">
                              <div className="inspection-title">{ins.type} Inspection</div>
                              <div className="inspection-status" style={{ color: ins.color }}>{ins.status}</div>
                            </div>
                            {ins.status.includes("Pending") && (
                              <button
                                className=" btn inspection-btn"
                                style={{
                                  background: `${ins.color}20`,
                                  color: ins.color,
                                  border: `1px solid ${ins.color}33`,
                                }}
                                onClick={() => {
                                  setShowTripDetail(null);
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

                {/* â”€â”€ ACTIONS FOOTER â”€â”€ */}
                <div className='trip-actions-buttons'>
                   {t.status==="Pre-Trip Pending" && <button className="btn btn-g btn-trip" onClick={()=>{setShowTripDetail(null);setShowInspect({trip:t,type:"pre"})}}><Ic n="pretrip" s={13} /> Pre-Trip Inspect</button>}
                   {t.status==="Post-Trip Pending" && <button className="btn btn-b btn-trip" onClick={()=>{setShowTripDetail(null);setShowInspect({trip:t,type:"post"})}}><Ic n="posttrip" s={13} /> Post-Trip Inspect</button>}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
      })()}
    </div>
  )
}

export default AllTrips