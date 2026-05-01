import React, { useState } from 'react'
import { AI_PREDICTIONS } from '../../helpers/AiPredictionsData';
import { WORK_ORDERS } from '../../helpers/WorkOrdersData';
import { Ic } from '../../components/icons/Ic'
import { transportItems } from '../../helpers/SidebarData'
import { useNavigate } from 'react-router-dom';
import { FLEET_DATA } from '../../helpers/FleetData';
import { VEHICLE_SCHEMA } from '../../helpers/VehicleSchema';
import { JOURNEY_TYPES } from '../../helpers/JourneyTypes';
import { riskBadge } from '../../helpers/RiskBadge';

const ControlTower = () => {

  const highRisk = AI_PREDICTIONS.filter(p => p.riskScore === "HIGH");
  const status = WORK_ORDERS.filter(w => w.status !== 'Completed')
  const navigate = useNavigate()

  const dashboardData = [
    {
      label: "Today Revenue",
      value: "₹2,83,000",
      color: "text-green"
    },
    {
      label: "Active Trips",
      value: "3",
      color: "text-blue"
    },
    {
      label: "Inspection Pending",
      value: "2",
      color: "text-orange"
    },
    {
      label: "High Risk Vehicles",
      value: highRisk.length,
      color: "text-red"
    },
    {
      label: "Today Revenue",
      value: status.length,
      color: "text-purple"
    },
  ]

  const actions = [
    {
      icon: "pretrip",
      label: "Pre-Trip Pending — TRP-2025-0043",
      sub: "Trichy → Mumbai · Sri Murugan Transport",
      bgcolor: "green",
      path: "all-trips"
    },
    {
      icon: "posttrip",
      label: "Post-Trip Pending — TRP-2025-0042",
      sub: "Madurai → Bangalore · Selvam R",
      bgcolor: "blue",
      path: "all-trips"
    },
    {
      icon: "alert",
      label: `${highRisk.length} Vehicles HIGH Risk`,
      sub: highRisk.map(p => p.vehicle).join(", "),
      bgcolor: "red",
      path: "ai-predictions"
    },
    {
      icon: "wrench",
      label: "Work Order Open — TN59 AB1234",
      sub: "Alternator fault — Power Electricals",
      bgcolor: "orange",
      path: "workshop"
    },
    {
      icon: "shield",
      label: "Insurance Expiring — TN59 AB1234",
      sub: "7 days remaining",
      bgcolor: "red",
      path: "vehicle-master"
    },
  ]


  return (
    <div>
      <div style={{ marginBottom: "22px" }}>
        <h1 className='rj rj-title' >Control Tower</h1>
        <p className='control-sub'>Wednesday, 15 April 2026 — Fleet Business OS Overview</p>
      </div>
      <div className='kpi-row kpi-col'>
        {dashboardData.map((item) => (
          <div className='stat'>
            <div className={`stat-v ${item.color}`}>{item.value}</div>
            <div className='stat-l'>{item.label}</div>
          </div>
        ))}
      </div>
      <div className='row g-3' style={{ marginBottom: "16px" }}>
        <div className='col-lg-6'>
          <div className='card-box'>
            <div className='section-title' style={{ color: 'var(--orange)' }}>⚡ Pending Actions</div>
            {actions.map((a, i) => (
              <div key={i} className='arow' style={{ borderLeftColor: a.bgcolor }}>
                <Ic n={a.icon} s={13} c={a.bgcolor} />
                <div style={{ flex: 1 }}>
                  <div className='pending-label' style={{ color: a.bgcolor }}>{a.label}</div>
                  <div className='pending-sub'>{a.sub}</div>
                </div>
                <button className="btn btn-gh btn-gh-fix" onClick={() => { navigate(`/${a.path}`) }}>Fix →</button>
              </div>
            ))}
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='card-box' style={{ height: '355px' }}>
            <div className="section-title">Fleet Health Overview</div>
            {FLEET_DATA.map((v) => {
              const vt = VEHICLE_SCHEMA.find(x => x.id === v.typeId)
              return (
                <div key={v.id} style={{ marginBottom: "10px" }}>
                  <div className='fleet-data-container'>
                    <div className='fleet-data-head'>
                      <span className='vt-icon'>{vt?.icon}</span>
                      <span className='mono mono-style'>{v.num}</span>
                    </div>
                    <div className='fleet-data-heads'>
                      <span className={` badge bg-f ${v.status === "Active" ? "bg" : v.status === "On Trip" ? "bb" : "ba"}`}>{v.status}</span>
                      <span style={{ color: v.health > 80 ? 'var(--green)' : v.health > 60 ? 'var(--accent)' : 'var(--red)', fontWeight: 600 }}>{v.health}%</span>
                    </div>
                  </div>
                  <div className="pbar"><div className="pfill" style={{ width: `${v.health}%`, background: v.health > 80 ? 'var(--green)' : v.health > 60 ? 'var(--accent)' : 'var(--red)' }} /></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='row g-3'>
        <div className='col-md-4'>
          <div className='card-box'>
            <div className="section-title">Journey Types Active</div>
            {JOURNEY_TYPES.map((jt) => (
              <div className='jt-container' key={jt.id}>
                <div className='jt-head'>
                  <span className='icon-size' style={{ color: jt.color }}>{jt.icon}</span>
                  <span className='jt-l'>{jt.label}</span>
                </div>
                <span className="badge" style={{ background: jt.color + "20", color: jt.color, fontSize: 9 }}>{jt.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card-box' style={{ height: '245px' }}>
            <div className="section-title">AI Risk Summary</div>
            {AI_PREDICTIONS.map((p) => (
              <div className='jt-container' key={p.vehicle}>
                <span className="mono mono-v">{p.vehicle}</span>
                {riskBadge(p.riskScore)}
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-4'>
          <div className="card-box" style={{ height: "245px" }}>
            <div className="section-title">Work Orders</div>
            {WORK_ORDERS.map((wo) => {
              const statusClass =
                wo.status === "Completed"
                  ? "completed"
                  : wo.status === "In Progress"
                    ? "progress"
                    : "pending";
              return (
                <div key={wo.id} className="work-orders-container">
                  <div className="work-orders-row">
                    <div>
                      <div className="mono mono-v">{wo.id}</div>
                      <div className="wo-sub">{wo.vehicle} · {wo.category}</div>
                    </div>
                    <span className={`badge b-f ${statusClass}`}>
                      {wo.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlTower
