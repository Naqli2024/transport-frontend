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
      color: "#10B981"
    },
    {
      label: "Active Trips",
      value: "3",
      color: "#3B82F6"
    },
    {
      label: "Inspection Pending",
      value: "2",
      color: "#F97316"
    },
    {
      label: "High Risk Vehicles",
      value: highRisk.length,
      color: "#EF4444"
    },
    {
      label: "Today Revenue",
      value: status.length,
      color: "#8B5CF6"
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
        <h1 className='rj control-title' >Control Tower</h1>
        <p className='control-sub'>Wednesday, 15 April 2026 — Fleet Business OS Overview</p>
      </div>
      <div className='control-row control-col'>
        {dashboardData.map((item) => (
          <div className='control-stat'>
            <div className='control-stat-value' style={{color:item.color}}>{item.value}</div>
            <div className='control-stat-label'>{item.label}</div>
          </div>
        ))}
      </div>
      <div className='row g-3' style={{ marginBottom: "16px" }}>
        <div className='col-lg-6'>
          <div className='control-card-box'>
            <div className='section-title' style={{ color: 'var(--orange)' }}>⚡ Pending Actions</div>
            {actions.map((a, i) => (
              <div key={i} className='control-actions-row' style={{ borderLeftColor: a.bgcolor }}>
                <Ic n={a.icon} s={13} c={a.bgcolor} />
                <div style={{ flex: 1 }}>
                  <div className='control-pending-label' style={{ color: a.bgcolor }}>{a.label}</div>
                  <div className='control-pending-sub'>{a.sub}</div>
                </div>
                <button className="control-btn control-btn-gh " onClick={() => { navigate(`/transport/${a.path}`) }}>Fix →</button>
              </div>
            ))}
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='control-card-box' style={{ height: '355px' }}>
            <div className="section-title">Fleet Health Overview</div>
            {FLEET_DATA.map((v) => {
              const vt = VEHICLE_SCHEMA.find(x => x.id === v.typeId)
              return (
                <div key={v.id} style={{ marginBottom: "10px" }}>
                  <div className='control-fleet-data-container'>
                    <div className='control-fleet-data-head'>
                      <span className='control-vt-icon'>{vt?.icon}</span>
                      <span className='mono control-num'>{v.num}</span>
                    </div>
                    <div className='control-fleet-data-heads'>
                      <span className={`control-badge control-badge-size ${v.status === "Active" ? "control-bg" : v.status === "On Trip" ? "control-bb" : "control-ba"}`}>{v.status}</span>
                      <span style={{ color: v.health > 80 ? 'var(--green)' : v.health > 60 ? 'var(--accent)' : 'var(--red)', fontWeight: 600 }}>{v.health}%</span>
                    </div>
                  </div>
                  <div className="control-pbar"><div className="control-pfill" style={{ width: `${v.health}%`, background: v.health > 80 ? 'var(--green)' : v.health > 60 ? 'var(--accent)' : 'var(--red)' }} /></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='row g-3'>
        <div className='col-md-4'>
          <div className='control-card-box'>
            <div className="section-title">Journey Types Active</div>
            {JOURNEY_TYPES.map((jt) => (
              <div className='control-journey-container' key={jt.id}>
                <div className='control-journey-head'>
                  <span className='control-icon-size' style={{ color: jt.color }}>{jt.icon}</span>
                  <span className='control-journey-label'>{jt.label}</span>
                </div>
                <span className="control-badge" style={{ background: jt.color + "20", color: jt.color, fontSize: 9 }}>{jt.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-4'>
          <div className='control-card-box' style={{ height: '245px' }}>
            <div className="section-title">AI Risk Summary</div>
            {AI_PREDICTIONS.map((p) => (
              <div className='control-journey-container' key={p.vehicle}>
                <span className="mono control-vehicle">{p.vehicle}</span>
                {riskBadge(p.riskScore)}
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-4'>
          <div className="control-card-box" style={{ height: "245px" }}>
            <div className="section-title">Work Orders</div>
            {WORK_ORDERS.map((wo) => {
              const statusClass =
                wo.status === "Completed"
                  ? "control-completed"
                  : wo.status === "In Progress"
                    ? "control-progress"
                    : "control-pending";
              return (
                <div key={wo.id} className="control-work-orders-container">
                  <div className="control-work-orders-row">
                    <div>
                      <div className="mono control-work-id">{wo.id}</div>
                      <div className="control-work-sub">{wo.vehicle} · {wo.category}</div>
                    </div>
                    <span className={`control-badge control-badge-size ${statusClass}`}>
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
