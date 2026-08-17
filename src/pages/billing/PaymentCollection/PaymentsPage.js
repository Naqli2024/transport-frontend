import React, { useState } from 'react'
import RecordPaymentModal from './RecordPaymentModal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const PAYMENT_RECORDS = [
  { id:"PAY-001", tripId:"TRP-2025-0041", client:"Ramco Cements Ltd",  invoiceNo:"INV-2025-041",  invoiceAmt:42000, paidAmt:20000, balanceDue:22000, dueDate:"2025-05-10", daysOverdue:0,  paymentMode:"Bank Transfer", lastPayDate:"2025-04-10", status:"Partial",  creditDays:30 },
  { id:"PAY-002", tripId:"TRP-2025-0044", client:"Pepsico India",       invoiceNo:"INV-2025-044A", invoiceAmt:12000, paidAmt:12000, balanceDue:0,     dueDate:"2025-04-29", daysOverdue:0,  paymentMode:"UPI",           lastPayDate:"2025-04-20", status:"Paid",     creditDays:15 },
  { id:"PAY-003", tripId:"TRP-2025-0044", client:"Avenue Supermarts",   invoiceNo:"INV-2025-044B", invoiceAmt:5000,  paidAmt:0,     balanceDue:5000,  dueDate:"2025-04-29", daysOverdue:0,  paymentMode:null,            lastPayDate:null,         status:"Pending",  creditDays:15 },
  { id:"PAY-004", tripId:"TRP-2025-0042", client:"Godrej Industries",   invoiceNo:"INV-2025-042",  invoiceAmt:38000, paidAmt:18000, balanceDue:20000, dueDate:"2025-04-12", daysOverdue:17, paymentMode:"Cheque",        lastPayDate:"2025-03-30", status:"Overdue",  creditDays:30 },
  { id:"PAY-005", tripId:"TRP-2025-0047", client:"SKS Logistics",       invoiceNo:"INV-2025-047",  invoiceAmt:47000, paidAmt:47000, balanceDue:0,     dueDate:"2025-04-01", daysOverdue:0,  paymentMode:"NEFT",          lastPayDate:"2025-04-01", status:"Paid",     creditDays:30 },
  { id:"PAY-006", tripId:"TRP-2025-0043", client:"TVS Motors",          invoiceNo:"INV-2025-043",  invoiceAmt:75000, paidAmt:30000, balanceDue:45000, dueDate:"2025-04-20", daysOverdue:9,  paymentMode:"RTGS",          lastPayDate:"2025-04-05", status:"Overdue",  creditDays:30 },
  { id:"PAY-007", tripId:"TRP-2025-0045", client:"Asian Paints",        invoiceNo:"INV-2025-045",  invoiceAmt:92000, paidAmt:0,     balanceDue:92000, dueDate:"2025-05-15", daysOverdue:0,  paymentMode:null,            lastPayDate:null,         status:"Pending",  creditDays:30 },
];

export const riskBadge = (r) => {
  if (r === "HIGH") return <span className="risk-high">HIGH RISK</span>;
  if (r === "MEDIUM") return <span className="risk-med">MEDIUM</span>;
  return <span className="risk-low">LOW RISK</span>;
};
export const tripExpTotal = (exp) => Object.values(exp).reduce((s, v) => s + v, 0);
export const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const pct = (a, b) => b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "0%";

const PaymentsPage = () => {

    const [payments, setPayments] = useState(PAYMENT_RECORDS)
    const [showRecordPay, setShowRecordPay] = useState(null)
    const [payAmt, setPayAmt] = useState("")

    const totalOutstanding = payments.reduce((s, p) => s + p.balanceDue, 0)
    const overdueAmt = payments.filter(p => p.status === "Overdue").reduce((s, p) => s + p.balanceDue, 0)
    const collected = payments.reduce((s, p) => s + p.paidAmt, 0)

    const handleRecord = (id) => {
        const amt = parseInt(payAmt) || 0;
        if (!amt) return;
        setPayments(ps => ps.map(p => {
            if (p.id !== id) return p;
            const newPaid = p.paidAmt + amt;
            const newBal = Math.max(0, p.invoiceAmt - newPaid);
            return { ...p, paidAmt: newPaid, balanceDue: newBal, status: newBal === 0 ? "Paid" : newBal < p.invoiceAmt ? "Partial" : p.status, lastPayDate: new Date().toISOString().split("T")[0] };
        }));
        setShowRecordPay(null); setPayAmt("");
    };

    const paymentStats = [
        {
            label: "Total Outstanding",
            value: fmt(totalOutstanding),
            color: 'var(--orange)',
        },
        {
            label: "Overdue Amount",
            value: fmt(overdueAmt),
            color: 'var(--red)',
        },
        {
            label: "Collected MTD",
            value: fmt(collected),
            color: 'var(--green)',
        },
        {
            label: "Overdue Invoices",
            value: payments.filter((p) => p.status === "Overdue").length,
            color: 'var(--red)',
        },
    ];


    return (
        <div>
            <div className='payments-header'>
                <div>
                    <h1 className='payments-title rj'>Payments & Collections</h1>
                    <p className='payments-subtitle'>Outstanding invoices · Credit period tracking · Overdue alerts · Cash flow management</p>
                </div>
                <button className='control-btn payments-reminder-btn payments-reminder-btn-p'>📤 Send All Reminders</button>
            </div>
            <div className='row g-3' style={{ marginBottom: "18px" }}>
                {paymentStats.map((k) => (
                    <div className='col-md-3' key={k.id}>
                        <div className='payments-status' style={{ borderTop: `3px solid ${k.color}` }}>
                            <div className='payments-status-value' style={{ color: k.color }}>{k.value}</div>
                            <div className='payments-status-label'>{k.label}</div>
                        </div>
                    </div>
                ))}
            </div>
            {payments.filter((p) => p.status === 'Overdue').length > 0 && (
                <div className='payments-card payments-card-container'>
                    <div className="section-title" style={{ color: 'var(--red)' }}>🚨 Overdue Payments — Immediate Follow-up Required</div>
                    {payments.filter((p) => p.status === 'Overdue').map((p) => (
                        <div key={p.id} className='payments-arow' style={{ borderLeftColor: 'var(--red)' }}>
                            <div className='payments-overdue-content'>
                                <div className='payments-overdue-client'>{p.client}</div>
                                <div className='payments-overdue-info'>Invoice: <span className="mono">{p.invoiceNo}</span> · Due: {p.dueDate} · <strong style={{ color: 'var(--red)' }}>{p.daysOverdue} days overdue</strong></div>
                            </div>
                            <div className='payments-overdue-actions'>
                                <div className='payments-overdue-balance'> {fmt(p.balanceDue)}</div>
                                <div className='payments-overdue-btns'>
                                    <button className='control-btn payments-remind-btn payments-btn-r'>📱 Remind</button>
                                    <button className='control-btn payments-remind-btn payments-btn-g' onClick={() => setShowRecordPay(p)}>💰 Record</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='payments-card' style={{ padding: 0 }}>
                <TableContainer>
                    <Table sx={{ width: '100%' }}>
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
                                <TableCell>Invoice</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Trip</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Credit</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((p) => (
                                <TableRow sx={{
                                    background: p.status === "Overdue" ? 'var(--redGlow)' : p.status === "Partial" ? "rgba(245,158,11,.04)" : "",
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
                                }} key={p.id}>
                                    <TableCell className='mono' sx={{ fontSize: "11px", color: "var(--accent)" }}>{p.invoiceNo}</TableCell>
                                    <TableCell sx={{ fontSize: '11px', fontWeight: 600, color: 'var(--textSub)' }}>{p.client?.split(" ")[0]}</TableCell>
                                    <TableCell className='mono' sx={{ fontSize: "11px", color: "var(--textSub)" }}>{p.tripId}</TableCell>
                                    <TableCell sx={{ fontSize: '11px', fontWeight: 600, color: 'var(--textSub)' }}>{fmt(p.invoiceAmt)}</TableCell>
                                    <TableCell sx={{ color: 'var(--green)', fontWeight: 600, fontSize: '11px' }}>{fmt(p.paidAmt)}</TableCell>
                                    <TableCell sx={{ color: p.balanceDue > 0 ? 'var(--orange)' : 'var(--green)', fontWeight: 700, fontSize: '11px' }}>{fmt(p.balanceDue)}</TableCell>
                                    <TableCell sx={{ fontSize: '11px', color: p.status === "Overdue" ? 'var(--red)' : 'var(--text)' }}>{p.dueDate}</TableCell>
                                    <TableCell sx={{ color: 'var(--textMuted)', fontSize: '11px' }}>{p.creditDays}d</TableCell>
                                    <TableCell><span className={`control-badge payments-badge-status ${p.status === "Paid" ? "payments-badge-bg" : p.status === "Overdue" ? "payments-badge-br" : p.status === "Partial" ? "payments-badge-bo" : "payments-badge-ba"}`}>{p.status}</span></TableCell>
                                    <TableCell>
                                        {p.balanceDue > 0 && <button className="control-btn payments-btn-g payments-record-btn" onClick={() => setShowRecordPay(p)}>₹ Record</button>}
                                        {p.balanceDue === 0 && <span className='payments-paid-tick'>✓</span>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            {showRecordPay && (<RecordPaymentModal open={Boolean(showRecordPay)} onClose={() => setShowRecordPay(null)} showRecordPay={showRecordPay} handleRecord={handleRecord} payAmt={payAmt} setPayAmt={setPayAmt}/>)}
        </div>
    )
}

export default PaymentsPage
