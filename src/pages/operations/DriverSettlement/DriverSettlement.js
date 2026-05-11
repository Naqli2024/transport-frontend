import React, { useState } from 'react';
import DriverSettleModal from './DriverSettleModal';

/* ── Seed data ── */
const INIT_DATA = [
  { id: 'DS-001', driver: 'Mani Kumar', tripId: 'TRP-2025-0041', advance: 20000, diesel: 12000, toll: 3000, expense: 500,  balance: -4500, status: 'Pending' },
  { id: 'DS-002', driver: 'Selvam R',   tripId: 'TRP-2025-0042', advance: 18000, diesel: 11000, toll: 2500, expense: 200,  balance: -4300, status: 'Settled' },
  { id: 'DS-003', driver: 'Arjun D',    tripId: 'TRP-2025-0044', advance: 15000, diesel: 9000,  toll: 2000, expense: 300,  balance: -3700, status: 'Pending' },
  { id: 'DS-004', driver: 'Karthik M',  tripId: 'TRP-2025-0046', advance: 25000, diesel: 14000, toll: 4000, expense: 400,  balance: -6600, status: 'Pending' },
];

const fmt = n => '₹' + Number(n).toLocaleString('en-IN');

const DriverSettlement = () => {
  const [settlements, setSettlements] = useState(INIT_DATA);
  const [showPay, setShowPay]         = useState(null);  

  const handleConfirm = (id) =>
    setSettlements(prev =>
      prev.map(s => s.id === id ? { ...s, status: 'Settled' } : s)
    );

  const pending      = settlements.filter(s => s.status === 'Pending');
  const settled      = settlements.filter(s => s.status === 'Settled');
  const totalBalance = pending.reduce((sum, s) => sum + Math.abs(s.balance), 0);

  const KPI = [
    { label: 'Pending',     value: pending.length,       color: 'orange' },
    { label: 'To Pay Out',  value: fmt(totalBalance),     color: 'red'    },
    { label: 'Settled',     value: settled.length,        color: 'green'  },
    { label: 'Drivers',     value: settlements.length,    color: 'blue'   },
  ];

  return (
    <div className="driver-s-page">
      <div className="driver-s-header">
        <h1 className="driver-s-title">Driver Settlement</h1>
        <p className="driver-s-sub">
          Advance vs actual · Diesel · Toll · Balance computation
        </p>
      </div>
      <div className="driver-s-kpi-row">
        {KPI.map(k => (
          <div key={k.label} className={`driver-s-kpi-card ${k.color}`}>
            <div className="driver-s-kpi-val">{k.value}</div>
            <div className="driver-s-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="driver-s-table-card">
        <div className="driver-s-table-scroll">
          <table className="driver-s-table">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Trip</th>
                <th className="driver-s-col-advance">Advance</th>
                <th className="driver-s-col-diesel">Diesel</th>
                <th className="driver-s-col-toll">Toll</th>
                <th>Balance</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {settlements.map(s => (
                <tr
                  key={s.id}
                  className={s.status === 'Settled' ? 'driver-s-row-settled' : ''}
                >
                  <td className="driver-s-td-driver">{s.driver}</td>
                  <td className="driver-s-td-trip">{s.tripId}</td>
                  <td className="driver-s-td-advance driver-s-col-advance">
                    {fmt(s.advance)}
                  </td>
                  <td className="driver-s-td-diesel driver-s-col-diesel">
                    {fmt(s.diesel)}
                  </td>
                  <td className="driver-s-td-toll driver-s-col-toll">
                    {fmt(s.toll)}
                  </td>
                  <td className="driver-s-td-balance">
                    {fmt(Math.abs(s.balance))}
                  </td>
                  <td>
                    <span
                      className={`driver-s-badge ${
                        s.status === 'Settled'
                          ? 'driver-s-badge-settled'
                          : 'driver-s-badge-pending'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td>
                    {s.status !== 'Settled' && (
                      <button
                        className="driver-s-btn-settle"
                        onClick={() => setShowPay(s)}
                      >
                        Settle
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPay && (
        <DriverSettleModal
          settlement={showPay}
          onClose={() => setShowPay(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default DriverSettlement;
