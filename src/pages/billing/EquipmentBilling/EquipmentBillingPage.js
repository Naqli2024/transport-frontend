import React, { useState } from 'react'
import { EQUIPMENT_DATA } from '../../../helpers/EquipmentData'
import { SITE_LOG_DATA } from '../../../helpers/SiteLogData'
import { EQ_CONTRACTS_INIT } from '../../../helpers/EqContractsInit'
import { fmt } from '../../../helpers/RiskBadge'
import { EQUIPMENT_TYPES } from '../../../helpers/EquipmentTypes';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

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
