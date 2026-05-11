import React, { useState } from 'react'
import { Ic } from '../../../components/icons/Ic'
import { STATUS_COLORS, TRIP_LIFECYCLE } from '../../../helpers/TripLifeCycle';
import { JOURNEY_TYPES } from '../../../helpers/JourneyTypes';
import { fmt, tripExpTotal } from '../../../helpers/RiskBadge';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TripDetailModal from './TripDetailModal';
import TripInspectionModal from './TripInspectionModal';
import TripGeneratorModal from './TripGeneratorModal';

const AllTrips = () => {
   const [showCreate, setShowCreate] = useState(false);
  const [showInspect, setShowInspect] = useState(null);
  const [showTripDetail, setShowTripDetail] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");

  const [trips, setTrips] = useState([
    { id: "TRP-2025-0041", vehicleType: "own", driver: "Mani Kumar", driverId: "DRV-001", vehicle: "TN69 GH4789", vendorVehicle: null, vendor: null, route: "Chennai → Coimbatore", fromCity: "Chennai", toCity: "Coimbatore", distanceKm: 480, freight: 42000, advance: 20000, expenses: { diesel: 12000, toll: 3000, loading: 500, unloading: 500, misc: 500 }, status: "In Transit", agent: "Raja Broker", loadType: "FTL", customer: "Ramco Cements", dateCreated: "2025-04-10", weight: "18T", journeyType: "oneway", vehicleLabel: "Tripper · 16 Wheelers" },
    { id: "TRP-2025-0042", vehicleType: "own", driver: "Selvam R", driverId: "DRV-002", vehicle: "TN59 AB1234", vendorVehicle: null, vendor: null, route: "Madurai → Bangalore", fromCity: "Madurai", toCity: "Bangalore", distanceKm: 440, freight: 38000, advance: 18000, expenses: { diesel: 11000, toll: 2500, loading: 500, unloading: 500, misc: 200 }, status: "Post-Trip Pending", agent: "Suresh Agency", loadType: "FTL", customer: "Godrej Industries", dateCreated: "2025-04-12", weight: "22T", journeyType: "roundtrip", vehicleLabel: "Open Body · 14 Wheelers" },
    { id: "TRP-2025-0043", vehicleType: "vendor", driver: "External Driver", driverId: null, vehicle: null, vendorVehicle: "TN32 XY7821", vendor: "Sri Murugan Transport", route: "Trichy → Mumbai", fromCity: "Trichy", toCity: "Mumbai", distanceKm: 1280, freight: 75000, advance: 0, expenses: { diesel: 0, toll: 5000, loading: 1000, unloading: 1000, misc: 1000 }, vendorCost: 53760, status: "Pre-Trip Pending", agent: "Direct", loadType: "FTL", customer: "TVS Motors", dateCreated: "2025-04-13", weight: "28T", journeyType: "oneway", vehicleLabel: "Vendor Tripper" },
    { id: "TRP-2025-0044", vehicleType: "own", driver: "Arjun D", driverId: "DRV-004", vehicle: "TN38 EF9012", vendorVehicle: null, vendor: null, route: "Salem → Hyderabad", fromCity: "Salem", toCity: "Hyderabad", distanceKm: 520, freight: 33000, advance: 15000, expenses: { diesel: 9000, toll: 2000, loading: 400, unloading: 400, misc: 300 }, status: "Invoiced", agent: "Kumar Freight", loadType: "LTL", customer: "Pepsico India", dateCreated: "2025-04-14", weight: "12T", journeyType: "crossregion", vehicleLabel: "Flatbed · 12 Wheelers" },
    { id: "TRP-2025-0045", vehicleType: "vendor", driver: "External Driver", driverId: null, vehicle: null, vendorVehicle: "TN58 AB1100", vendor: "KPR Fleet Solutions", route: "Coimbatore → Delhi", fromCity: "Coimbatore", toCity: "Delhi", distanceKm: 2100, freight: 92000, advance: 0, expenses: { diesel: 0, toll: 7000, loading: 1500, unloading: 1500, misc: 500 }, vendorCost: 92400, status: "Booked", agent: "Raja Broker", loadType: "FTL", customer: "Asian Paints", dateCreated: "2025-04-15", weight: "24T", journeyType: "dedicated", vehicleLabel: "Vendor Trailer" },
    { id: "TRP-2025-0046", vehicleType: "own", driver: "Karthik M", driverId: "DRV-006", vehicle: "TN22 IJ7890", vendorVehicle: null, vendor: null, route: "Chennai → Pune", fromCity: "Chennai", toCity: "Pune", distanceKm: 1200, freight: 55000, advance: 25000, expenses: { diesel: 14000, toll: 4000, loading: 800, unloading: 800, misc: 400 }, status: "Pre-Trip Done", agent: "Suresh Agency", loadType: "FTL", customer: "Raj Textiles", dateCreated: "2025-04-09", weight: "20T", journeyType: "multileg", vehicleLabel: "LCV · 4 Wheeler" },
    { id: "TRP-2025-0047", vehicleType: "own", driver: "Mani Kumar", driverId: "DRV-001", vehicle: "TN71 GH3456", vendorVehicle: null, vendor: null, route: "Coimbatore → Hyderabad", fromCity: "Coimbatore", toCity: "Hyderabad", distanceKm: 680, freight: 47000, advance: 22000, expenses: { diesel: 15000, toll: 3500, loading: 600, unloading: 600, misc: 400 }, status: "Closed", agent: "Raja Broker", loadType: "FTL", customer: "SKS Logistics", dateCreated: "2025-04-01", weight: "20T", journeyType: "oneway", vehicleLabel: "Container · 14 Wheeler" },
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
      value: "₹" + trips.reduce((sum, t) => sum + t.freight, 0).toLocaleString(),
      color: "#F59E0B"
    }
  ]


  return (
    <div>
      <div className='tracking-container'>
        <div>
          <h1 className='rj tracking-header'>Trips Management</h1>
          <p className='control-sub'>{trips.length} trips · ₹{trips.reduce((s, t) => s + t.freight, 0).toLocaleString()} freight · Own fleet + vendor vehicles</p>
        </div>
        <button className='control-btn trips-btn-booking' onClick={() => setShowCreate(true)}><Ic n="plus" s={14} c="#080B10" /> New Trip Booking</button>
      </div>

      <div className='control-row control-col'>
        {tripStats.map((k) => (
          <div className='control-stat' key={k.label} style={{ borderTop: `3px solid ${k.color}` }}>
            <div className='control-stat-value' style={{ color: k.color }}>{k.value}</div>
            <div className='control-stat-label'>{k.label}</div>
          </div>
        ))}
      </div>

      <div className='trips-lifecycle-bar'>
        {TRIP_LIFECYCLE.map((ls, i) => {
          const count = trips.filter((t) => t.status === ls).length
          return (
            <div key={ls} className={`trips-lc-step ${count > 0 ? "active" : ""}`}>
              <div className='trips-lc-value' style={{ color: count > 0 ? 'var(--accent)' : 'var(--textMuted)' }}>{ls}</div>
              {count > 0 && <div className="rj trips-lc-count">{count}</div>}
            </div>
          )
        })}
      </div>

      {pendingInspections.length > 0 && (
        <div className='control-card-box trips-card-inspection'>
          <div className="section-title" style={{ color: 'var(--orange)' }}>⚡ Inspection Action Required — {pendingInspections.length} trip(s)</div>
          {trips.filter((t) => t.status === "Pre-Trip Pending").map((t) => (
            <div className='control-actions-row trips-inspection-border-green' key={t.id}>
              <Ic n="pretrip" s={13} c='var(--green)' />
              <div style={{ flex: 1 }}>
                <span className="mono trips-inspection-id">{t.id}</span>
                <span className='trips-vendor-route'>{t.route} · {t.vehicleType === "vendor" ? t.vendor : t.vehicle} · {t.vehicleLabel}</span>
              </div>
              <button className="control-btn trips-btn-g trips-btn-g-size" onClick={() => setShowInspect({ trip: t, type: "pre" })}>✅ Pre-Trip Inspect</button>
            </div>
          ))}
          {trips.filter((t) => t.status === "Post-Trip Pending").map((t) => (
            <div className='control-actions-row trips-inspection-border-blue' key={t.id}>
              <Ic n="posttrip" s={13} c='var(--blue)' />
              <div style={{ flex: 1 }}>
                <span className="mono trips-inspection-id">{t.id}</span>
                <span className="trips-vendor-route">{t.route} · {t.vehicle}</span>
              </div>
              <button className="control-btn tracking-btn-b trips-btn-g-size" onClick={() => setShowInspect({ trip: t, type: "post" })}>📋 Post-Trip Inspect</button>
            </div>
          ))}
        </div>
      )}

      <div className='trips-viewmode-wrapper'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search trips, vehicle, customer…' className='trips-search-input' />
        <div className='trips-viewmode-option'>
          {["kanban", "list"].map((v) => (
            <button key={v} onClick={() => setViewMode(v)} className="control-btn trips-viewmode-btn" style={{ background: viewMode === v ? 'var(--accentGlow)' : "transparent", color: viewMode === v ? 'var(--accent)' : 'var(--textSub)' }}>{v}</button>
          ))}
        </div>
        <div className="trips-toggle-pill">
          {["all", "own", "vendor", "active", "pending"].map((f) => (
            <div key={f} className={`trips-toggle-option trips-toggle-option-size ${filterTab === f ? "on" : ""}`}  onClick={() => setFilterTab(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</div>
          ))}
        </div>
      </div>

      {viewMode == "kanban" && (
        <div className='trips-kanban-container'>
          {TRIP_LIFECYCLE.map((col) => {
            const ct = filtered.filter((t) => t.status === col)
            const jtype = JOURNEY_TYPES
            return (
              <div key={col} className='trips-kanban-box'>
                <div className='trips-kanban-status' style={{ color: STATUS_COLORS[col] || 'var(--textMuted)' }}>
                  {col} <span className='trips-ct-len'>{ct.length}</span>
                </div>
                {ct.map((t) => {
                  const jt = jtype.find(j => j.id === t.journeyType)
                  return (
                    <div key={t.id} className="trips-kanban-card" onClick={() => setShowTripDetail(t)}>
                      <div className="mono trips-kanban-id">{t.id}</div>
                      <div className='trips-kanban-route'>{t.route}</div>
                      {jt && <div className='trips-kanban-jt' style={{ color: jt.color }}>{jt.icon} {jt.label}</div>}
                      <div className="trips-kanban-wrapper">
                        <span className={`control-badge control-badge-size ${t.vehicleType === "own" ? "control-bg" : "trips-bp"}`} >{t.vehicleType === "own" ? "Own" : "Vendor"}</span>
                        <span className="control-badge trips-bc control-badge-size">{t.loadType}</span>
                      </div>
                      <div className='trips-kanban-own' >{t.vehicleType === "own" ? t.vehicle : t.vendor}</div>
                      {t.status === "Pre-Trip Pending" && (
                        <button className="control-btn trips-btn-g trips-pre-btn" onClick={e => { e.stopPropagation(); setShowInspect({ trip: t, type: "pre" }) }}>Pre-Trip Inspect</button>
                      )}
                      {t.status === "Post-Trip Pending" && (
                        <button className="control-btn tracking-btn-b trips-pre-btn" onClick={e => { e.stopPropagation(); setShowInspect({ trip: t, type: "post" }) }}>Post-Trip Inspect</button>
                      )}
                      {!["Pre-Trip Pending", "Post-Trip Pending"].includes(t.status) && (
                        <div className='trips-pending-status' >
                          <span className="trips-pend-freight">₹{t.freight.toLocaleString()}</span>
                          <span className="trips-pend-total">+₹{(t.freight - tripExpTotal(t.expenses) - (t.vendorCost || 0)).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
                {ct.length === 0 && <div className='trips-empty'>Empty</div>}
              </div>
            )
          })}
        </div>
      )}
      {viewMode === 'list' && (
        <div className='control-card-box' style={{ padding: 0 }}>
          <TableContainer>
            <Table sx={{width:'100%'}}>
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
                      <TableCell sx={{ fontSize:'11px', color: 'var(--accent)', fontFamily: "JetBrains Mono" }}>{t.id}</TableCell>
                      <TableCell>{t.vehicleType === "own" ? (<span className="control-badge control-bg">Own</span>) : (<span className="control-badge trips-bp">Vendor</span>)}</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize:'12px', color: 'var(--textSub)' }}>{t.route}</TableCell>
                      <TableCell>{jt && (<span className="control-badge" style={{ background: jt.color + "20", color: jt.color, fontSize:'10px' }}>{jt.icon} {jt.tag}</span>)}</TableCell>
                      <TableCell sx={{ fontSize:'11px', fontFamily: "JetBrains Mono", color: 'var(--textSub)' }}>{t.vehicleType === "own" ? t.vehicle : t.vendor}</TableCell>
                      <TableCell sx={{ fontSize:'12px', color: 'var(--textSub)' }}> {t.driver}</TableCell>
                      <TableCell sx={{ fontSize:'12px', color: 'var(--textSub)' }}>{t.customer}</TableCell>
                      <TableCell sx={{ color: 'var(--green)', fontWeight: 600, fontFamily: "Rajdhani,sans-serif" }}>₹{t.freight.toLocaleString()}</TableCell>
                      <TableCell><span className="control-badge" style={{ background: (STATUS_COLORS[t.status] || 'var(--textSub)') + "22", color: STATUS_COLORS[t.status] || 'var(--textSub)' }}>{t.status}</span></TableCell>
                      <TableCell onClick={e => e.stopPropagation()}>
                        {t.status === "Pre-Trip Pending" && <button className="control-btn trips-btn-g trips-btn-size" onClick={() => setShowInspect({ trip: t, type: "pre" })}>Pre-Trip</button>}
                        {t.status === "Post-Trip Pending" && <button className="control-btn trips-btn-b trips-btn-size" onClick={() => setShowInspect({ trip: t, type: "post" })}>Post-Trip</button>}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {showInspect && <TripInspectionModal trip={showInspect.trip} type={showInspect.type} onClose={() => setShowInspect(null)} onComplete={handleInspectionComplete} open={Boolean(showInspect)}/>}
      {showCreate && <TripGeneratorModal onClose={() => setShowCreate(false)} onCreated={handleCreated} open={Boolean(showCreate)}/>}
      {showTripDetail && <TripDetailModal
        trip={showTripDetail}
        open={Boolean(showTripDetail)}
        onClose={() => setShowTripDetail(null)}
        JOURNEY_TYPES={JOURNEY_TYPES}
        STATUS_COLORS={STATUS_COLORS}
        tripExpTotal={tripExpTotal}
        fmt={fmt}
        setShowInspect={setShowInspect}
        setTrips={setTrips} />}

     
    </div>
  )
}

export default AllTrips