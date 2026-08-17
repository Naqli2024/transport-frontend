import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export const EQ_CONTRACTS_INIT = [
  { id:"EC-001", eqId:"EQ-001", client:"NHAI Road Works",    site:"Madurai Bypass NH7",     type:"HYBRID",  startDate:"2025-03-01", endDate:"2025-05-31", hourlyRate:900,  dailyRate:null, monthlyRate:null, includedHoursPerMonth:180, minGuaranteeHours:180, overtimeRate:1200, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-002", eqId:"EQ-003", client:"L&T Construction",   site:"Chennai Port Road",      type:"MONTHLY", startDate:"2025-02-15", endDate:"2025-06-15", hourlyRate:700,  dailyRate:null, monthlyRate:140000, includedHoursPerMonth:200, minGuaranteeHours:null, overtimeRate:900, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-003", eqId:"EQ-004", client:"TIDCO Projects",     site:"Trichy Industrial Park", type:"HOURLY",  startDate:"2025-04-01", endDate:"2025-07-31", hourlyRate:3500, dailyRate:null, monthlyRate:null, includedHoursPerMonth:null, minGuaranteeHours:null, overtimeRate:null, shiftHoursPerDay:null, idleChargeable:true, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-004", eqId:"EQ-006", client:"PWD Tamil Nadu",     site:"Madurai Ring Road",      type:"DAILY",   startDate:"2025-04-10", endDate:"2025-05-10", hourlyRate:null, dailyRate:11000, monthlyRate:null, includedHoursPerMonth:null, minGuaranteeHours:null, overtimeRate:1500, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:true, status:"ACTIVE" },
];

export const EQUIPMENT_DATA = [
  { id:"EQ-001", regNo:"TN69 JCB001", type:"backhoe",    model:"JCB 3DX",         make:"JCB",         year:2021, serialNo:"JCB3DX2021TN001", purchaseCost:2800000, ownership:"Owned",    status:"On Site",       site:"Madurai Bypass NH7",    operator:"Kannan S",  engineHours:4286,  lastServiceHours:4000, nextServiceHours:4250, fuelPerHour:5,  hourlyRate:900,  dailyMin:8, monthlyHours:180, odomKm:null, deployed:true,  transportCost:25000 },
  { id:"EQ-002", regNo:"TN45 EXC01",  type:"excavator",  model:"JCB NXT 215",     make:"JCB",         year:2022, serialNo:"JCBNXT2022001",    purchaseCost:5200000, ownership:"Owned",    status:"Available",     site:null,                    operator:null,        engineHours:2841,  lastServiceHours:2500, nextServiceHours:3000, fuelPerHour:15, hourlyRate:1400, dailyMin:7, monthlyHours:150, odomKm:null, deployed:false, transportCost:45000 },
  { id:"EQ-003", regNo:"TN22 RLL01",  type:"roller",     model:"JCB VM115",       make:"JCB",         year:2020, serialNo:"JCBVM1152020001",  purchaseCost:1600000, ownership:"Owned",    status:"On Site",       site:"Chennai Port Road",     operator:"Murugan V", engineHours:6120,  lastServiceHours:6000, nextServiceHours:6300, fuelPerHour:8,  hourlyRate:700,  dailyMin:8, monthlyHours:200, odomKm:null, deployed:true,  transportCost:18000 },
  { id:"EQ-004", regNo:"TN38 CRN01",  type:"crane",      model:"SANY STC500T",    make:"SANY",        year:2023, serialNo:"SANY500T2023001",  purchaseCost:12000000,ownership:"Financed", status:"On Site",       site:"Trichy Industrial Park",operator:"Raj Kumar", engineHours:1204,  lastServiceHours:1000, nextServiceHours:1400, fuelPerHour:22, hourlyRate:3500, dailyMin:6, monthlyHours:120, odomKm:null, deployed:true,  transportCost:85000 },
  { id:"EQ-005", regNo:"TN71 MXC01",  type:"miniexcav",  model:"JCB 30Plus",      make:"JCB",         year:2023, serialNo:"JCB30P2023001",    purchaseCost:1400000, ownership:"Owned",    status:"Maintenance",   site:null,                    operator:null,        engineHours:890,   lastServiceHours:750,  nextServiceHours:1000, fuelPerHour:4,  hourlyRate:600,  dailyMin:7, monthlyHours:160, odomKm:null, deployed:false, transportCost:15000 },
  { id:"EQ-006", regNo:"TN59 GRD01",  type:"grader",     model:"JCB 140G",        make:"JCB",         year:2021, serialNo:"JCB140G2021001",   purchaseCost:5800000, ownership:"Owned",    status:"Available",     site:null,                    operator:null,        engineHours:3340,  lastServiceHours:3000, nextServiceHours:3500, fuelPerHour:18, hourlyRate:1600, dailyMin:8, monthlyHours:160, odomKm:null, deployed:false, transportCost:55000 },
];

export const EQUIPMENT_TYPES = {
  backhoe:    { label:"Backhoe Loader",      icon:"🟡", brands:["JCB 3DX","JCB 4DX","CAT 424"],              billingUnit:"hour",  avgRate:900,  avgFuel:5,  serviceInterval:250,  lifeHours:12000, category:"earthmoving" },
  excavator:  { label:"Hydraulic Excavator", icon:"🦾", brands:["JCB NXT 215","CAT 320","Tata Hitachi 200"],  billingUnit:"hour",  avgRate:1400, avgFuel:15, serviceInterval:500,  lifeHours:15000, category:"earthmoving" },
  miniexcav:  { label:"Mini Excavator",      icon:"🔶", brands:["JCB 30Plus","CAT 308","Komatsu PC35"],        billingUnit:"hour",  avgRate:600,  avgFuel:4,  serviceInterval:250,  lifeHours:10000, category:"earthmoving" },
  roller:     { label:"Vibratory Roller",    icon:"🔵", brands:["JCB VM115","HAMM HD90","Dynapac CA250"],      billingUnit:"hour",  avgRate:700,  avgFuel:8,  serviceInterval:300,  lifeHours:12000, category:"compaction"  },
  crane:      { label:"Hydraulic Crane",     icon:"🏗️", brands:["SANY 50T","Escorts 30T","Tadano"],            billingUnit:"hour",  avgRate:3500, avgFuel:22, serviceInterval:200,  lifeHours:20000, category:"lifting"     },
  telehandler:{ label:"Telehandler",         icon:"🔧", brands:["JCB 540-170","Manitou MT 625"],               billingUnit:"hour",  avgRate:1100, avgFuel:7,  serviceInterval:300,  lifeHours:12000, category:"handling"    },
  grader:     { label:"Motor Grader",        icon:"⚙️", brands:["JCB 140G","CAT 140","Mahindra"],              billingUnit:"hour",  avgRate:1600, avgFuel:18, serviceInterval:250,  lifeHours:15000, category:"earthmoving" },
  concrete:   { label:"Concrete Mixer",      icon:"🔘", brands:["Ajax Fiori","Schwing Stetter"],               billingUnit:"m3",    avgRate:450,  avgFuel:6,  serviceInterval:500,  lifeHours:8000,  category:"concrete"    },
  transit:    { label:"Transit Mixer",       icon:"🔵", brands:["BharatBenz TM","Tata 1616"],                  billingUnit:"trip",  avgRate:2800, avgFuel:20, serviceInterval:500,  lifeHours:null,  category:"concrete"    },
};

export const SITE_LOG_DATA = [
  { id:"SL-001", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-15", hoursWorked:9.5, shift:"Day",   operator:"Kannan S",  fuel:48,  work:"Trench excavation — 320m pipeline route", status:"Billed",   billAmount:8550,  approved:true  },
  { id:"SL-002", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-14", hoursWorked:8.0, shift:"Day",   operator:"Kannan S",  fuel:40,  work:"Foundation trench continuation",         status:"Billed",   billAmount:7200,  approved:true  },
  { id:"SL-003", eqId:"EQ-003", site:"Chennai Port Road",     client:"L&T Construction",  date:"2025-04-15", hoursWorked:10,  shift:"Day",   operator:"Murugan V", fuel:80,  work:"Road compaction — 1.5km WBM layer",      status:"Pending",  billAmount:7000,  approved:false },
  { id:"SL-004", eqId:"EQ-004", site:"Trichy Industrial Park",client:"TIDCO Projects",    date:"2025-04-15", hoursWorked:6.5, shift:"Night", operator:"Raj Kumar", fuel:143, work:"Structural steel lifting — floor 3",     status:"Pending",  billAmount:22750, approved:false },
  { id:"SL-005", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-13", hoursWorked:7.5, shift:"Day",   operator:"Kannan S",  fuel:38,  work:"Box culvert excavation",                 status:"Billed",   billAmount:6750,  approved:true  },
  { id:"SL-006", eqId:"EQ-003", site:"Chennai Port Road",     client:"L&T Construction",  date:"2025-04-14", hoursWorked:8,   shift:"Day",   operator:"Murugan V", fuel:64,  work:"Sub-grade preparation km 4–6",           status:"Billed",   billAmount:5600,  approved:true  },
];

export const riskBadge = (r) => {
  if (r === "HIGH") return <span className="risk-high">HIGH RISK</span>;
  if (r === "MEDIUM") return <span className="risk-med">MEDIUM</span>;
  return <span className="risk-low">LOW RISK</span>;
};
export const tripExpTotal = (exp) => Object.values(exp).reduce((s, v) => s + v, 0);
export const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const pct = (a, b) => b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "0%";

const EquipmentBillingPage = () => {

  const [selEq, setSelEq] = useState(EQUIPMENT_DATA[0]?.id || 'EQ-001')
  const [logs, setLogs] = useState(SITE_LOG_DATA || [])

  const eq = EQUIPMENT_DATA.find(e => e.id === selEq) || EQUIPMENT_DATA[0] || {}
  const contract = EQ_CONTRACTS_INIT.find(c => c.eqId === selEq)
  const eqLogs = logs.filter(l => l.eqId === selEq)
  const billed = eqLogs.filter(l => l.status === 'Billed').reduce((s, l) => s + l.billAmount, 0)
  const pending = eqLogs.filter(l => l.status === 'Pending').reduce((s, l) => s + l.billAmount, 0)

  const billingStats = [
    {
      label: "Billed",
      value: fmt(billed),
      color: 'var(--green)',
    },
    {
      label: "Pending",
      value: fmt(pending),
      color: 'var(--orange)',
    },
    {
      label: "Rate",
      value: `₹${contract?.hourlyRate || eq.hourlyRate || 900}/hr`,
      color: 'var(--accent)',
    },
    {
      label: "Client",
      value: contract?.client?.split(" ")[0] || "—",
      color: 'var(--blue)',
    },
  ];

  return (
    <div>
      <div className='equipment-billing-header'>
        <h1 className='rj equipment-billing-title'>Equipment Billing</h1>
        <p className='equipment-billing-subtitle'>Running hours · Daily minimum guarantee · Client approval</p>
      </div>
      <div className='equipment-billing-wrap'>
        {EQUIPMENT_DATA.map((e) => (
          <div key={e.id} onClick={() => setSelEq(e.id)} className='equipment-billing-regno-btn'
            style={{
              border: `2px solid ${selEq === e.id ? 'var(--orange)' : 'var(--border)'}`,
              background: selEq === e.id ? 'var(--orangeGlow)' : 'var(--bgPanel)',
              color: selEq === e.id ? 'var(--orange)' : 'var(--textSub)',
              fontWeight: selEq === e.id ? 700 : 400
            }}
          >{EQUIPMENT_TYPES[e.type]?.icon || '🏗️'}{e.regNo}</div>
        ))}
      </div>

      <div className='row g-3' style={{ marginBottom: "14px" }}>
        {billingStats.map((k) => (
          <div className='col-md-3' key={k.label}>
            <div className='equipment-billing-status' style={{ borderTop: `3px solid ${k.color}` }}>
              <div className='equipment-billing-value' style={{ color: k.color, fontSize: '22px' }}>{k.value}</div>
              <div className='equipment-billing-label'>{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {contract && (<div className='equipment-billing-contract-card'>
        <span>Contract: <strong>{contract.type}</strong></span>
        <span>Min Hrs: <strong style={{ color: 'var(--orange)' }}>{contract.minGuaranteeHours || contract.includedHoursPerMonth || "—"}h</strong></span>
        <span>OT Rate: <strong style={{ color: 'var(--red)' }}>₹{contract.overtimeRate || "—"}/hr</strong></span>
        <span>Period: {contract.startDate} → {contract.endDate}</span>
      </div>
      )}

      <div className='equipment-billing-card' style={{ padding: 0 }}>
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
                <TableCell>Date</TableCell>
                <TableCell>Hours Worked</TableCell>
                <TableCell>Min Applied</TableCell>
                <TableCell>Bill Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eqLogs.length === 0 && (
                <TableRow sx={{
                  "&:last-child .MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}>
                  <TableCell colSpan={6}
                    sx={{
                      padding: '20px',
                      fontSize: '12px',
                      color: "var(--textMuted)",
                      textAlign: "center",
                    }}>
                    No site logs. Use Heavy Equipment → Log Hours to add.
                  </TableCell>
                </TableRow>
              )}
              {eqLogs.map((l) => {
                const bh = Math.max(l.hoursWorked, contract?.shiftHoursPerDay || 8)
                return (
                  <TableRow sx={{
                    "& .MuiTableCell-root": {
                      padding: "10px 12px",
                      borderBottom: '1px solid var(--border)18',
                    },

                    "&:hover .MuiTableCell-root": {
                      background: 'var(--bgPanel)',
                      color: 'var(--text)',
                    },

                    "&:last-child .MuiTableCell-root": {
                      borderBottom: "none",
                    },
                  }} key={l.id}>
                    <TableCell sx={{ fontSize: "11px", color: 'var(--textSub)' }}>{l.date}</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "var(--orange)", fontSize: "12.5px", }} > {l.hoursWorked}h</TableCell>
                    <TableCell sx={{
                      fontSize: "12.5px",
                      color:
                        bh > l.hoursWorked
                          ? 'var(--orange)'
                          : 'var(--green)',
                    }}>{bh}h</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'var(--green)', fontSize: "12.5px", }}>{fmt(l.billAmount)}</TableCell>
                    <TableCell sx={{ fontSize: '12.5px', color: 'var(--textSub)' }}><span className={`control-badge ${l.status === "Billed" ? "equipment-billing-badge-bg" : "equipment-billing-badge-bo"}`}>{l.status}</span></TableCell>
                    <TableCell>{!l.approved && <button onClick={() =>
                      setLogs((ls) =>
                        ls.map((x) =>
                          x.id === l.id
                            ? {
                              ...x,
                              approved: true,
                              status: "Billed",
                            }
                            : x
                        )
                      )
                    } className='control-btn equipment-billing-btn-g equipment-billing-approve-btn'>Approve</button>}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default EquipmentBillingPage
