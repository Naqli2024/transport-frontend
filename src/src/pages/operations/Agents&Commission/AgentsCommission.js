import React, { useState } from 'react';

const AGENTS_INIT = [
  {
    id: 'AGT-001',
    name: 'Raja Broker',
    company: 'Raja Transport Agency',
    city: 'Chennai',
    commType: 'percent',
    commValue: 5,
    status: 'Active',
    totalTrips: 34,
    totalFreight: 1820000,
  },
  {
    id: 'AGT-002',
    name: 'Suresh Agency',
    company: 'Suresh Logistics',
    city: 'Coimbatore',
    commType: 'fixed',
    commValue: 3000,
    status: 'Active',
    totalTrips: 21,
    totalFreight: 980000,
  },
  {
    id: 'AGT-003',
    name: 'Kumar Freight',
    company: 'Kumar Freight Solutions',
    city: 'Madurai',
    commType: 'percent',
    commValue: 4,
    status: 'Active',
    totalTrips: 18,
    totalFreight: 762000,
  },
];

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');

const commDisplay = (agent) =>
  agent.commType === 'percent'
    ? { value: `${agent.commValue}%`, isPercent: true }
    : { value: fmt(agent.commValue), isPercent: false };

const AgentsCommission = () => {
  const [agents] = useState(AGENTS_INIT);

  const activeCount      = agents.filter(a => a.status === 'Active').length;
  const commPending      = agents.reduce(
    (s, a) => s + (a.commType === 'fixed' ? a.commValue : 0), 0
  );
  const totalFreightAll  = agents.reduce((s, a) => s + a.totalFreight, 0);

  const KPI = [
    { label: 'Active Agents',       value: activeCount,        color: 'green'  },
    { label: 'Commission Pending',  value: fmt(commPending),   color: 'orange' },
    { label: 'Total Freight Sourced', value: fmt(totalFreightAll), color: 'blue' },
  ];

  return (
    <div className="agents-c-page">
      <div className="agents-c-header">
        <div>
          <h1 className="agents-c-title">Agents &amp; Commission</h1>
          <p className="agents-c-sub">Freight brokers, commission ledger &amp; payouts</p>
        </div>
        <button className="agents-c-btn-add">+ Add Agent</button>
      </div>
      <div className="agents-c-kpi-list">
        {KPI.map(k => (
          <div key={k.label} className={`agents-c-kpi-card agents-c-kpi-${k.color}`}>
            <div className="agents-c-kpi-val">{k.value}</div>
            <div className="agents-c-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="agents-c-grid">
        {agents.map(agent => {
          const comm = commDisplay(agent);
          return (
            <div key={agent.id} className="agents-c-card">
              <div className="agents-c-card-head">
                <div>
                  <div className="agents-c-card-name">{agent.name}</div>
                  <div className="agents-c-card-company">
                    {agent.company} · {agent.city}
                  </div>
                </div>
                <span className="agents-c-badge-active">Active</span>
              </div>
              <div className="agents-c-card-footer">
                <div className="agents-c-card-stats">
                  <span className="agents-c-comm-val">{comm.value}</span>
                  <span className="agents-c-comm-label"> comm.</span>
                  <span className="agents-c-sep">  </span>
                  <span className="agents-c-trips-val">{agent.totalTrips}</span>
                  <span className="agents-c-trips-label"> trips</span>
                </div>
                <div className="agents-c-freight">{fmt(agent.totalFreight)}</div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentsCommission;