import React, { useState, useMemo } from 'react';
import BOSeatCheckModal   from './BOSeatCheckModal';
import BOPreTripModal     from './BOPreTripModal';
import BOComplianceModal  from './BOComplianceModal';

export const BUS_FLEET_TYPES = {
  CORPORATE_SHUTTLE: { label:'Corporate Shuttle',   icon:'🏢', billing:'MONTHLY_CONTRACT' },
  SCHOOL_BUS:        { label:'School Bus',           icon:'🏫', billing:'MONTHLY_CONTRACT' },
  TOURISM_CHARTER:   { label:'Tourism / Charter',    icon:'🗺️', billing:'PER_TRIP'         },
  STAFF_TRANSPORT:   { label:'Hospital / Staff',     icon:'🏥', billing:'MONTHLY_CONTRACT' },
  CONTRACT_CARRIAGE: { label:'Contract Carriage',    icon:'📋', billing:'RATE_CONTRACT'    },
  LOCAL_STAGE:       { label:'Local Stage / City',   icon:'🏙️', billing:'TICKET_BASED'     },
  INTER_CITY:        { label:'Inter-City Express',   icon:'🛣️', billing:'TICKET_BASED'     },
  EVENT_TRANSPORT:   { label:'Event Transport',      icon:'🎪', billing:'PER_TRIP'         },
};

export const BUS_MASTER_DATA = [
  {
    id:'BS-001', regNo:'TN22 IJ7890', type:'CORPORATE_SHUTTLE', make:'Tata',  model:'Starbus Ultra 40',
    seatingCapacity:40, standingCapacity:0,  year:2022, acType:'AC',     fuelType:'Diesel',
    insuranceExpiry:'2026-01-15', fcExpiry:'2026-03-20', permitExpiry:'2026-11-30',
    mvTaxDue:'2025-07-01', pucExpiry:'2025-08-10', fitnessScore:88,
    status:'Active',             assignedRoute:'Sholinganallur–Siruseri',       client:'Cognizant Technology', driver:'Arjun D',
  },
  {
    id:'BS-002', regNo:'TN45 KL4321', type:'SCHOOL_BUS',        make:'Ashok', model:'Leyland LYNX 32',
    seatingCapacity:32, standingCapacity:0,  year:2020, acType:'Non-AC', fuelType:'Diesel',
    insuranceExpiry:'2025-09-30', fcExpiry:'2025-12-15', permitExpiry:'2025-12-31',
    mvTaxDue:'2025-10-01', pucExpiry:'2025-06-30', fitnessScore:72,
    status:'Active',             assignedRoute:'Koramangala–CBSE School',       client:'Greenfield School',    driver:'Mani Kumar',
  },
  {
    id:'BS-003', regNo:'TN69 MN8765', type:'TOURISM_CHARTER',   make:'Volvo', model:'9400 Club Class',
    seatingCapacity:45, standingCapacity:0,  year:2023, acType:'AC',     fuelType:'Diesel',
    insuranceExpiry:'2026-06-20', fcExpiry:'2026-08-10', permitExpiry:'2027-03-15',
    mvTaxDue:'2026-01-01', pucExpiry:'2025-11-20', fitnessScore:95,
    status:'Available',          assignedRoute:null,                             client:null,                   driver:null,
  },
  {
    id:'BS-004', regNo:'TN38 PQ2345', type:'LOCAL_STAGE',       make:'Tata',  model:'Starbus 4x2',
    seatingCapacity:52, standingCapacity:20, year:2019, acType:'Non-AC', fuelType:'Diesel',
    insuranceExpiry:'2025-05-15', fcExpiry:'2025-04-30', permitExpiry:'2025-07-31',
    mvTaxDue:'2025-04-01', pucExpiry:'2025-04-25', fitnessScore:61,
    status:'Overdue Compliance', assignedRoute:'Route 47C Tambaram–Velachery',  client:'CMTU Contract',        driver:'Selvam R',
  },
];

export const BUS_COMPLIANCE_DOCS = [
  { id:'BC-001', busId:'BS-001', docType:'Insurance',           docNo:'POL-2024-1182945',  issuer:'New India Assurance',  issueDate:'2025-01-15', expiryDate:'2026-01-15', daysLeft:266, status:'Valid',    fine:'₹2,000–₹5,000/day'   },
  { id:'BC-002', busId:'BS-001', docType:'Fitness Certificate', docNo:'FC/TN-22/2025/881', issuer:'RTO Chennai South',    issueDate:'2025-03-20', expiryDate:'2026-03-20', daysLeft:331, status:'Valid',    fine:'₹2,000 first offence' },
  { id:'BC-003', busId:'BS-001', docType:'Permit (Contract)',   docNo:'PCP/TN/2021/5541',  issuer:'RTO Chennai Central',  issueDate:'2021-11-30', expiryDate:'2026-11-30', daysLeft:585, status:'Valid',    fine:'Permit cancellation'  },
  { id:'BC-004', busId:'BS-001', docType:'PUC Certificate',     docNo:'PUC-2025-884421',   issuer:'TNPCB Authorised',     issueDate:'2025-02-10', expiryDate:'2025-08-10', daysLeft:108, status:'Valid',    fine:'₹1,000'               },
  { id:'BC-005', busId:'BS-001', docType:'Motor Vehicle Tax',   docNo:'MVT-TN22-2025',     issuer:'RTO Chennai South',    issueDate:'2025-01-01', expiryDate:'2025-07-01', daysLeft:68,  status:'Due Soon', fine:'Penalty + tax'        },
  { id:'BC-006', busId:'BS-002', docType:'Insurance',           docNo:'POL-2024-0987321',  issuer:'HDFC Ergo',            issueDate:'2024-09-30', expiryDate:'2025-09-30', daysLeft:159, status:'Valid',    fine:'₹2,000–₹5,000/day'   },
  { id:'BC-007', busId:'BS-002', docType:'Fitness Certificate', docNo:'FC/TN-45/2024/330', issuer:'RTO Bangalore South',  issueDate:'2024-12-15', expiryDate:'2025-12-15', daysLeft:235, status:'Valid',    fine:'₹2,000 first offence' },
  { id:'BC-008', busId:'BS-002', docType:'PUC Certificate',     docNo:'PUC-2025-221133',   issuer:'TNPCB Authorised',     issueDate:'2025-03-30', expiryDate:'2025-06-30', daysLeft:67,  status:'Due Soon', fine:'₹1,000'               },
  { id:'BC-009', busId:'BS-004', docType:'Insurance',           docNo:'POL-2024-0045221',  issuer:'United India',         issueDate:'2024-05-15', expiryDate:'2025-05-15', daysLeft:21,  status:'Critical', fine:'₹2,000–₹5,000/day'   },
  { id:'BC-010', busId:'BS-004', docType:'Fitness Certificate', docNo:'FC/TN-38/2024/117', issuer:'RTO Chennai Central',  issueDate:'2024-04-30', expiryDate:'2025-04-30', daysLeft:-7,  status:'Expired',  fine:'₹10,000 + seizure'   },
  { id:'BC-011', busId:'BS-004', docType:'PUC Certificate',     docNo:'PUC-2025-009441',   issuer:'TNPCB Authorised',     issueDate:'2025-01-25', expiryDate:'2025-04-25', daysLeft:-8,  status:'Expired',  fine:'₹1,000'               },
];

export const DRIVER_COMPLIANCE_DATA = [
  { driverId:'DRV-001', name:'Mani Kumar', dlNo:'TN202012345678', dlClass:'PSV/HMV', dlExpiry:'2027-04-10', badgeNo:'TN-PSV-2024-18821', badgeExpiry:'2026-04-10', medFitExpiry:'2025-10-15', policeVerification:'2024-08-20', aadharLinked:true,  mobileVerified:true,  trainingCert:'2023-11-01', status:'Valid'         },
  { driverId:'DRV-002', name:'Selvam R',   dlNo:'TN20190044122',  dlClass:'PSV/HMV', dlExpiry:'2025-06-30', badgeNo:'TN-PSV-2023-09821', badgeExpiry:'2025-06-30', medFitExpiry:'2025-05-20', policeVerification:'2023-06-15', aadharLinked:true,  mobileVerified:true,  trainingCert:'2022-09-15', status:'Expiring'      },
  { driverId:'DRV-003', name:'Arjun D',    dlNo:'KA2022079988',   dlClass:'PSV/HMV', dlExpiry:'2028-02-28', badgeNo:'KA-PSV-2024-55210', badgeExpiry:'2026-02-28', medFitExpiry:'2026-01-10', policeVerification:'2024-12-01', aadharLinked:true,  mobileVerified:true,  trainingCert:'2024-01-20', status:'Valid'         },
  { driverId:'DRV-004', name:'Karthik M',  dlNo:'TN20200054321',  dlClass:'HMV',     dlExpiry:'2025-05-15', badgeNo:null,                badgeExpiry:null,          medFitExpiry:'2024-12-01', policeVerification:'2023-01-10', aadharLinked:false, mobileVerified:false, trainingCert:null,         status:'Non-Compliant' },
];

export const BUS_PRETRIP_CHECKS = {
  safety_critical: [
    { id:'PT-BK', label:'Brake system — foot + hand',       critical:true  },
    { id:'PT-TR', label:'Tyre pressure all 6 wheels',        critical:true  },
    { id:'PT-TT', label:'Tyre tread & sidewall condition',   critical:true  },
    { id:'PT-DR', label:'All passenger doors open/close',    critical:true  },
    { id:'PT-EX', label:'Emergency exit — clear & marked',   critical:true  },
    { id:'PT-FE', label:'Fire extinguisher — charged',       critical:true  },
    { id:'PT-FA', label:'First aid kit — complete',          critical:true  },
    { id:'PT-SB', label:'Sample seat belt test (3 seats)',   critical:true  },
  ],
  electrical: [
    { id:'PT-HL', label:'Headlights + high beam',            critical:true  },
    { id:'PT-IN', label:'Indicators (all 4)',                 critical:true  },
    { id:'PT-BL', label:'Brake lights',                      critical:true  },
    { id:'PT-HR', label:'Horn',                              critical:false },
    { id:'PT-WP', label:'Windshield wipers',                 critical:false },
    { id:'PT-AC', label:'AC / heater operational',           critical:false },
    { id:'PT-RL', label:'Interior ceiling lights',           critical:false },
  ],
  mechanical: [
    { id:'PT-EN', label:'Engine oil level',                  critical:false },
    { id:'PT-CL', label:'Coolant level',                     critical:false },
    { id:'PT-FL', label:'Fuel level (min 1/4 tank)',         critical:true  },
    { id:'PT-WS', label:'Windshield — no cracks',            critical:true  },
    { id:'PT-MR', label:'Mirrors — adjusted, uncracked',     critical:true  },
    { id:'PT-RT', label:'Retro-reflective tape — intact',    critical:false },
  ],
  compliance: [
    { id:'PT-RC', label:'RC + Fitness Cert in cabin',        critical:true  },
    { id:'PT-PM', label:'Permit document in cabin',          critical:true  },
    { id:'PT-IN2',label:'Insurance document in cabin',       critical:true  },
    { id:'PT-PU', label:'PUC certificate valid',             critical:true  },
    { id:'PT-DL', label:'Driver DL valid (check card)',      critical:true  },
    { id:'PT-BD', label:'Driver PSV badge worn',             critical:true  },
  ],
};

export const ROUTE_SCHEDULES = [
  {
    id:'RS-001', busId:'BS-001', routeName:'Corporate Shuttle Route A', type:'CORPORATE_SHUTTLE',
    client:'Cognizant Technology',
    stops:[
      { name:'Sholinganallur OMR',   time:'08:25', pax:8  },
      { name:'Perungudi Tollgate',   time:'08:38', pax:12 },
      { name:'Elcot SEZ Gate',       time:'08:49', pax:6  },
      { name:'Siruseri IT Park',     time:'09:05', pax:0  },
    ],
    totalPax:26, amShift:'08:25–09:05', pmShift:'18:15–18:55',
    driver:'Arjun D', conductor:null,
    daysOfWeek:['Mon','Tue','Wed','Thu','Fri'], monthlyRate:52000,
  },
  {
    id:'RS-002', busId:'BS-002', routeName:'School Route — Morning AM', type:'SCHOOL_BUS',
    client:'Greenfield School',
    stops:[
      { name:'HSR Layout 7th Sector',time:'07:10', pax:6  },
      { name:'Koramangala 4th Block',time:'07:22', pax:10 },
      { name:'BTM 2nd Stage',        time:'07:35', pax:8  },
      { name:'School Gate',          time:'07:50', pax:0  },
    ],
    totalPax:24, amShift:'07:10–07:50', pmShift:'13:30–14:15',
    driver:'Mani Kumar', conductor:'Raju K',
    daysOfWeek:['Mon','Tue','Wed','Thu','Fri','Sat'], monthlyRate:38000,
  },
  {
    id:'RS-003', busId:'BS-004', routeName:'Route 47C Stage Service', type:'LOCAL_STAGE',
    client:'CMTU',
    stops:[
      { name:'Tambaram Bus Stand',   time:'06:00', pax:20 },
      { name:'Pallavaram',           time:'06:18', pax:14 },
      { name:'Guindy',               time:'06:38', pax:18 },
      { name:'Velachery Bus Stop',   time:'07:00', pax:0  },
    ],
    totalPax:52, frequency:'Every 30 min',
    driver:'Selvam R', conductor:'Murugan K',
    daysOfWeek:['Daily'], ticketRate:12, dailyRevTarget:3600,
  },
];

export const TICKET_LOG_INIT = [
  { id:'TK-001', routeId:'RS-003', date:'2025-04-15', shift:'AM', tripNo:1, boardedPax:48, ticketsSold:48, cashCollected:576,  conductorName:'Murugan K', verified:true  },
  { id:'TK-002', routeId:'RS-003', date:'2025-04-15', shift:'AM', tripNo:2, boardedPax:52, ticketsSold:52, cashCollected:624,  conductorName:'Murugan K', verified:true  },
  { id:'TK-003', routeId:'RS-003', date:'2025-04-15', shift:'PM', tripNo:3, boardedPax:35, ticketsSold:35, cashCollected:420,  conductorName:'Murugan K', verified:false },
  { id:'TK-004', routeId:'RS-003', date:'2025-04-15', shift:'PM', tripNo:4, boardedPax:41, ticketsSold:39, cashCollected:468,  conductorName:'Murugan K', verified:false },
];

const fmt = n =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
  : n >= 1000  ? `₹${(n / 1000).toFixed(1)}k`
  : `₹${n}`;

function docStatusCls(doc) {
  if (doc.daysLeft < 0)   return 'bo-doc-expired';
  if (doc.daysLeft <= 30) return 'bo-doc-critical';
  if (doc.daysLeft <= 90) return 'bo-doc-warn';
  return 'bo-doc-valid';
}

function docLabel(doc) {
  if (doc.daysLeft < 0) return `EXPIRED ${Math.abs(doc.daysLeft)}d ago`;
  return `${doc.daysLeft}d left`;
}

function fitnessCls(score) {
  if (score >= 80) return 'bo-pfill--green';
  if (score >= 60) return 'bo-pfill--orange';
  return 'bo-pfill--red';
}

function busStatusCls(s) {
  if (s === 'Active')             return 'bo-badge-green';
  if (s === 'Available')          return 'bo-badge-blue';
  if (s === 'Overdue Compliance') return 'bo-badge-red';
  if (s === 'Maintenance')        return 'bo-badge-orange';
  return 'bo-badge-amber';
}

function driverStatusCls(s) {
  if (s === 'Valid')          return 'bo-badge-green';
  if (s === 'Expiring')       return 'bo-badge-orange';
  if (s === 'Non-Compliant')  return 'bo-badge-red';
  return 'bo-badge-amber';
}

function dlExpiryCls(dateStr) {
  const ms = new Date(dateStr) - Date.now();
  if (ms < 0)                     return 'bo-td-red';
  if (ms < 60 * 24 * 3600 * 1000) return 'bo-td-orange';
  return '';
}

const BusOperations = () => {
  const [tab,           setTab]           = useState('fleet');
  const [showSeat,      setShowSeat]      = useState(null);
  const [showPreTrip,   setShowPreTrip]   = useState(null);
  const [showCompliance,setShowCompliance]= useState(null);
  const [buses]                           = useState(BUS_MASTER_DATA);
  const [search,        setSearch]        = useState('');
  const [typeFilter,    setTypeFilter]    = useState('All');

  const expiredCount  = BUS_COMPLIANCE_DOCS.filter(d => d.daysLeft < 0).length;
  const criticalCount = BUS_COMPLIANCE_DOCS.filter(d => d.daysLeft >= 0 && d.daysLeft <= 30).length;
  const contractRev   = ROUTE_SCHEDULES.reduce((s, r) => s + (r.monthlyRate || 0), 0);
  const ticketRev     = TICKET_LOG_INIT.reduce((s, t) => s + t.cashCollected, 0);

  const kpis = [
    { label:'Total Fleet',      value: buses.length,                                                 colorCls:'blue' },
    { label:'Active / On Route',value: buses.filter(b => b.status === 'Active').length,              colorCls:'green'},
    { label:'Available',        value: buses.filter(b => b.status === 'Available').length,           colorCls:'cyan'},
    { label:'Compliance Issues',value: expiredCount + criticalCount,                                 colorCls:'red'},
    { label:'MTD Revenue',      value: fmt(contractRev + ticketRev),                                 colorCls:'accent'},
  ];

  const filteredBuses = useMemo(() =>
    buses.filter(b => {
      const q = search.toLowerCase();
      const matchSearch = !q
        || b.regNo.toLowerCase().includes(q)
        || b.model.toLowerCase().includes(q)
        || (b.client || '').toLowerCase().includes(q)
        || (b.assignedRoute || '').toLowerCase().includes(q);
      return matchSearch;
    }),
    [buses, search]
  );

  const totalChecks = Object.values(BUS_PRETRIP_CHECKS).reduce((s, arr) => s + arr.length, 0);

  return (
    <div className="bo-page">
      {showSeat && (
        <BOSeatCheckModal bus={showSeat} onClose={() => setShowSeat(null)} />
      )}
      {showPreTrip && (
        <BOPreTripModal bus={showPreTrip} onClose={() => setShowPreTrip(null)} totalChecks={totalChecks} />
      )}
      {showCompliance && (
        <BOComplianceModal
          bus={showCompliance}
          docs={BUS_COMPLIANCE_DOCS.filter(d => d.busId === showCompliance.id)}
          onClose={() => setShowCompliance(null)}
        />
      )}

      <div className="bo-page-hdr">
        <div className="bo-page-hdr-left">
          <h1 className="heading">Bus Operations</h1>
          <p className="sub-heading">Fleet · Compliance · Pre-Trip Safety · Routes · Driver Docs</p>
        </div>
      </div>

      <div className="bo-kpi-row">
        {kpis.map(k => (
          <div key={k.label} className={`bo-kpi-card bo-kpi-card--${k.colorCls}`}>
            <div className="bo-kpi-icon">{k.icon}</div>
            <div className={`bo-kpi-val bo-kpi-val--${k.colorCls}`}>{k.value}</div>
            <div className="bo-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="bo-tabs">
        {[
          ['fleet',      'Fleet'],
          ['routes',     'Routes'],
          ['compliance', 'Compliance'],
          ['drivers',    'Drivers'],
          ['tickets',    'Ticket Log'],
        ].map(([k, l]) => (
          <button
            key={k}
            className={`bo-tab ${tab === k ? 'bo-tab-on' : ''}`}
            onClick={() => setTab(k)}
          >{l}</button>
        ))}
      </div>

      {tab === 'fleet' && (
        <>
          <div className="bo-filter-bar">
            <div className="bo-search-wrap">
              <span className="bo-search-icon">⌕</span>
              <input
                className="bo-search-input"
                placeholder="Search reg no, model, client, route…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
<div className='he-fleet-container'>
          <div className="bo-fleet-grid">
            {filteredBuses.map(bus => {
              const spec     = BUS_FLEET_TYPES[bus.type] || {};
              const busDocs  = BUS_COMPLIANCE_DOCS.filter(d => d.busId === bus.id);
              const hasExp   = busDocs.some(d => d.daysLeft < 0);
              const hasCrit  = busDocs.some(d => d.daysLeft >= 0 && d.daysLeft <= 30);
              return (
                <div
                  key={bus.id}
                  className={`bo-bus-card ${hasExp ? 'bo-bus-card--expired' : hasCrit ? 'bo-bus-card--critical' : ''}`}
                >
                  <div className="bo-bus-card-head">
                    <div className="bo-bus-id">
                      <span className="bo-bus-type-icon">{spec.icon || '🚌'}</span>
                      <div>
                        <div className="bo-bus-regno">{bus.regNo}</div>
                        <div className="bo-bus-model">{bus.make} {bus.model} · {bus.year}</div>
                      </div>
                    </div>
                    <span className={`bo-status-badge ${busStatusCls(bus.status)}`}>{bus.status}</span>
                  </div>
                  <div className="bo-fitness-row">
                    <div className="bo-fitness-meta">
                      <span className="bo-fitness-label">Fitness Score</span>
                      <span className={`bo-fitness-val ${fitnessCls(bus.fitnessScore).replace('bo-pfill--', 'bo-fit-val--')}`}>
                        {bus.fitnessScore}%
                      </span>
                    </div>
                    <div className="bo-pbar">
                      <div
                        className={`bo-pfill ${fitnessCls(bus.fitnessScore)}`}
                        style={{ width:`${bus.fitnessScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="bo-bus-tags">
                    <span className={`bo-tag-ac ${bus.acType === 'AC' ? 'bo-tag-ac--yes' : 'bo-tag-ac--no'}`}>
                      ❄ {bus.acType}
                    </span>
                    <span className="bo-tag-cap">💺 {bus.seatingCapacity}</span>
                    {bus.fuelType && <span className="bo-tag-fuel">⛽ {bus.fuelType}</span>}
                  </div>
                  {bus.assignedRoute && (
                    <div className="bo-bus-route-strip">
                      <span className="bo-route-pin">📍</span>
                      <span className="bo-bus-route-text">{bus.assignedRoute}</span>
                    </div>
                  )}
                  {(bus.client || bus.driver) && (
                    <div className="bo-bus-meta-row">
                      {bus.client && (
                        <div className="bo-bus-meta-item">
                          <span className="bo-meta-label">Client</span>
                          <span className="bo-meta-val">{bus.client}</span>
                        </div>
                      )}
                      {bus.driver && (
                        <div className="bo-bus-meta-item">
                          <span className="bo-meta-label">Driver</span>
                          <span className="bo-meta-val">{bus.driver}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {(hasExp || hasCrit) && (
                    <div className={`bo-compliance-alert ${hasExp ? 'bo-compliance-alert--expired' : 'bo-compliance-alert--critical'}`}>
                      <span>⚠</span>
                      <span>
                        {hasExp
                          ? `${busDocs.filter(d => d.daysLeft < 0).length} doc(s) EXPIRED`
                          : `${busDocs.filter(d => d.daysLeft >= 0 && d.daysLeft <= 30).length} expiring within 30 days`}
                      </span>
                    </div>
                  )}
                  <div className="bo-bus-actions">
                    <button className="bo-btn bo-btn-seat"    onClick={() => setShowSeat(bus)}>💺 Seats</button>
                    <button className="bo-btn bo-btn-pretrip" onClick={() => setShowPreTrip(bus)}>🔍 Pre-Trip</button>
                    <button className="bo-btn bo-btn-docs"    onClick={() => setShowCompliance(bus)}>📋 Docs</button>
                  </div>
                </div>
              );
            })}

            {filteredBuses.length === 0 && (
              <div className="bo-empty">
                <div className="bo-empty-icon">🚌</div>
                <div>No buses match your filter</div>
              </div>
            )}
          </div>
          </div>
        </>
      )}

      {tab === 'routes' && (
        <div className="bo-routes-list">
          {ROUTE_SCHEDULES.map(route => {
            const bus  = buses.find(b => b.id === route.busId);
            const spec = BUS_FLEET_TYPES[route.type] || {};
            return (
              <div key={route.id} className="bo-route-card">
                <div className="bo-route-card-head">
                  <div className="bo-route-title-wrap">
                    <span className="bo-route-type-icon">{spec.icon || '🚌'}</span>
                    <div>
                      <div className="bo-route-name">{route.routeName}</div>
                      <div className="bo-route-client">{route.client}</div>
                    </div>
                  </div>
                  <div className="bo-route-rate-block">
                    <div className="bo-route-rate-val">
                      {fmt(route.monthlyRate || route.dailyRevTarget || 0)}
                    </div>
                    <div className="bo-route-rate-unit">
                      /{route.monthlyRate ? 'month' : 'day target'}
                    </div>
                  </div>
                </div>
                <div className="bo-stops-row">
                  {route.stops.map((stop, i) => (
                    <div key={i} className="bo-stop">
                      <div className="bo-stop-time">{stop.time}</div>
                      <div className="bo-stop-track">
                        <div className={`bo-stop-dot ${i === 0 || i === route.stops.length - 1 ? 'bo-stop-dot--terminal' : ''}`} />
                        {i < route.stops.length - 1 && <div className="bo-stop-line" />}
                      </div>
                      <div className="bo-stop-name">{stop.name}</div>
                      {stop.pax > 0 && <div className="bo-stop-pax">+{stop.pax} pax</div>}
                    </div>
                  ))}
                </div>
                <div className="bo-route-meta">
                  <div className="bo-route-meta-item">
                    <span className="bo-meta-label">AM Shift</span>
                    <span className="bo-meta-val bo-mono">{route.amShift || route.frequency}</span>
                  </div>
                  {route.pmShift && (
                    <div className="bo-route-meta-item">
                      <span className="bo-meta-label">PM Shift</span>
                      <span className="bo-meta-val bo-mono">{route.pmShift}</span>
                    </div>
                  )}
                  <div className="bo-route-meta-item">
                    <span className="bo-meta-label">Driver</span>
                    <span className="bo-meta-val">{route.driver}</span>
                  </div>
                  {route.conductor && (
                    <div className="bo-route-meta-item">
                      <span className="bo-meta-label">Conductor</span>
                      <span className="bo-meta-val">{route.conductor}</span>
                    </div>
                  )}
                  <div className="bo-route-meta-item">
                    <span className="bo-meta-label">Days</span>
                    <span className="bo-meta-val">{route.daysOfWeek.join(' · ')}</span>
                  </div>
                  <div className="bo-route-meta-item">
                    <span className="bo-meta-label">Total Pax</span>
                    <span className="bo-meta-val">{route.totalPax}</span>
                  </div>
                </div>
                {bus && (
                  <div className="bo-route-bus-chip">
                    <span className="bo-route-bus-icon">{BUS_FLEET_TYPES[bus.type]?.icon || '🚌'}</span>
                    <span className="bo-mono">{bus.regNo}</span>
                    <span className="bo-route-bus-model">{bus.model}</span>
                    <span className={`bo-status-badge ${busStatusCls(bus.status)}`}>{bus.status}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'compliance' && (
        <div className="bo-compliance-wrap">
          <div className="bo-comp-summary-row">
            {[
              { label:'Expired',         count: BUS_COMPLIANCE_DOCS.filter(d => d.daysLeft < 0).length,                      cls:'bo-comp-sum--red'    },
              { label:'Critical (≤30d)', count: BUS_COMPLIANCE_DOCS.filter(d => d.daysLeft >= 0 && d.daysLeft <= 30).length,  cls:'bo-comp-sum--orange' },
              { label:'Due Soon (≤90d)', count: BUS_COMPLIANCE_DOCS.filter(d => d.daysLeft > 30 && d.daysLeft <= 90).length,  cls:'bo-comp-sum--amber'  },
              { label:'Valid',           count: BUS_COMPLIANCE_DOCS.filter(d => d.daysLeft > 90).length,                      cls:'bo-comp-sum--green'  },
            ].map(({ label, count, cls }) => (
              <div key={label} className={`bo-comp-sum-item ${cls}`}>
                <div className="bo-comp-sum-val">{count}</div>
                <div className="bo-comp-sum-label">{label}</div>
              </div>
            ))}
          </div>
          <div className="bo-tbl-card">
            <table className="bo-tbl">
              <thead>
                <tr>
                  <th>Bus Reg</th>
                  <th>Document Type</th>
                  <th>Doc Number</th>
                  <th>Issuer</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Fine if Lapsed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...BUS_COMPLIANCE_DOCS]
                  .sort((a, b) => a.daysLeft - b.daysLeft)
                  .map(doc => {
                    const bus = buses.find(b => b.id === doc.busId);
                    return (
                      <tr key={doc.id} className={doc.daysLeft < 0 ? 'bo-tbl-row--expired' : ''}>
                        <td><span className="bo-mono">{bus?.regNo || doc.busId}</span></td>
                        <td className="bo-td-bold">{doc.docType}</td>
                        <td><span className="bo-mono bo-td-sub">{doc.docNo}</span></td>
                        <td className="bo-td-sub">{doc.issuer}</td>
                        <td><span className="bo-mono">{doc.expiryDate}</span></td>
                        <td>
                          <span className={`bo-doc-badge ${docStatusCls(doc)}`}>{docLabel(doc)}</span>
                        </td>
                        <td className="bo-td-fine">{doc.fine}</td>
                        <td>
                          {doc.daysLeft < 90 && (
                            <button className="bo-btn bo-btn-renew">Renew →</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'drivers' && (
        <div className="bo-tbl-card">
          <table className="bo-tbl">
            <thead>
              <tr>
                <th>Driver</th>
                <th>DL Number</th>
                <th>Class</th>
                <th>DL Expiry</th>
                <th>PSV Badge</th>
                <th>Badge Expiry</th>
                <th>Med Fitness</th>
                <th>Aadhar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DRIVER_COMPLIANCE_DATA.map(d => (
                <tr key={d.driverId}>
                  <td>
                    <div className="bo-driver-cell">
                      <div className="bo-driver-avatar">
                        {d.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="bo-td-bold">{d.name}</div>
                        <div className="bo-td-sub bo-td-small">{d.driverId}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="bo-mono">{d.dlNo}</span></td>
                  <td><span className="bo-status-badge bo-badge-blue">{d.dlClass}</span></td>
                  <td>
                    <span className={`bo-mono ${dlExpiryCls(d.dlExpiry)}`}>{d.dlExpiry}</span>
                  </td>
                  <td>
                    {d.badgeNo
                      ? <span className="bo-mono bo-td-sub">{d.badgeNo}</span>
                      : <span className="bo-td-missing">— No Badge</span>}
                  </td>
                  <td>
                    {d.badgeExpiry
                      ? <span className="bo-mono bo-td-sub">{d.badgeExpiry}</span>
                      : <span className="bo-td-missing">N/A</span>}
                  </td>
                  <td><span className="bo-mono bo-td-sub">{d.medFitExpiry}</span></td>
                  <td>
                    <span className={d.aadharLinked ? 'bo-td-green' : 'bo-td-red'}>
                      {d.aadharLinked ? '✓ Linked' : '✗ Not linked'}
                    </span>
                  </td>
                  <td>
                    <span className={`bo-status-badge ${driverStatusCls(d.status)}`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'tickets' && (
        <div className="bo-ticket-wrap">
          <div className="bo-ticket-summary">
            {[
              { label:'Total Pax',      value: TICKET_LOG_INIT.reduce((s, t) => s + t.boardedPax, 0),    cls:'' },
              { label:'Tickets Sold',   value: TICKET_LOG_INIT.reduce((s, t) => s + t.ticketsSold, 0),   cls:'' },
              { label:'Cash Collected', value: fmt(TICKET_LOG_INIT.reduce((s, t) => s + t.cashCollected, 0)), cls:'bo-tsum-val--green' },
              { label:'Verified',       value: `${TICKET_LOG_INIT.filter(t => t.verified).length}/${TICKET_LOG_INIT.length}`, cls:'' },
            ].map(({ label, value, cls }) => (
              <div key={label} className="bo-tsum-item">
                <div className={`bo-tsum-val ${cls}`}>{value}</div>
                <div className="bo-tsum-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="bo-tbl-card">
            <table className="bo-tbl">
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Shift</th>
                  <th>Boarded</th>
                  <th>Tickets</th>
                  <th>Cash</th>
                  <th>Conductor</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {TICKET_LOG_INIT.map(t => {
                  const route = ROUTE_SCHEDULES.find(r => r.id === t.routeId);
                  return (
                    <tr key={t.id}>
                      <td><span className="bo-mono">{t.id}</span></td>
                      <td className="bo-td-sub">{route?.routeName || t.routeId}</td>
                      <td><span className="bo-mono">{t.date}</span></td>
                      <td>
                        <span className={`bo-status-badge ${t.shift === 'AM' ? 'bo-badge-blue' : 'bo-badge-amber'}`}>
                          {t.shift}
                        </span>
                      </td>
                      <td className="bo-td-bold">{t.boardedPax}</td>
                      <td className="bo-td-bold">{t.ticketsSold}</td>
                      <td className="bo-td-green bo-td-bold">{fmt(t.cashCollected)}</td>
                      <td className="bo-td-sub">{t.conductorName}</td>
                      <td>
                        <span className={t.verified ? 'bo-td-green' : 'bo-td-orange'}>
                          {t.verified ? '✓ Verified' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default BusOperations