import React, { useState } from 'react'
import { Ic } from '../../components/icons/Ic'

const LiveTracking = () => {

  const [selVehicle, setSelVehicle] = useState(null)

  const LIVE_FLEET = [
    { id: "TN69 GH4789", status: "En Route", speed: 68, lastPing: "2m ago", location: "NH-44, 42km before Nagpur", lat: 21.14, lng: 79.08, driver: "Mani Kumar", trip: "TRP-2025-0041", battery: 87, route: "Chennai → Coimbatore", eta: "6h 20m", load: "18T FTL", kmCovered: 340, kmTotal: 480 },
    { id: "TN59 AB1234", status: "Planned Stop", speed: 0, lastPing: "5m ago", location: "HPCL, Krishnagiri, TN-38", lat: 12.51, lng: 78.21, driver: "Selvam R", trip: "TRP-2025-0042", battery: 72, route: "Madurai → Bangalore", eta: "3h 45m", load: "22T FTL", kmCovered: 220, kmTotal: 440 },
    { id: "TN71 GH3456", status: "En Route", speed: 55, lastPing: "1m ago", location: "NH-7, 180km from Delhi", lat: 28.67, lng: 77.22, driver: "Vinoth S", trip: "TRP-2025-0045", battery: 68, route: "Coimbatore → Delhi", eta: "18h 30m", load: "24T FTL", kmCovered: 1920, kmTotal: 2100 },
    { id: "TN45 CD5678", status: "In Maintenance", speed: 0, lastPing: "3h ago", location: "Ganesh Auto Works, Nagpur", lat: 21.14, lng: 79.09, driver: "Ramesh P", trip: "—", battery: 45, route: "Workshop", eta: "—", load: "—", kmCovered: 0, kmTotal: 0 },
    { id: "TN38 EF9012", status: "Idle", speed: 0, lastPing: "12m ago", location: "Yard, Chennai HQ", lat: 13.08, lng: 80.27, driver: "Arjun D", trip: "—", battery: 91, route: "—", eta: "—", load: "—", kmCovered: 0, kmTotal: 0 },
    { id: "TN22 IJ7890", status: "En Route", speed: 42, lastPing: "3m ago", location: "NH-48, Vellore", lat: 12.91, lng: 79.13, driver: "Karthik M", trip: "TRP-2025-0046", battery: 82, route: "Chennai → Pune", eta: "32h 10m", load: "20T FTL", kmCovered: 85, kmTotal: 1200 },
  ];

  const fleetStatusData = [
    {
      label: "En Route",
      value: LIVE_FLEET.filter((item) => item.status === "En Route").length,
      color: "#3B82F6"
    },
    {
      label: "Planned Stop",
      value: LIVE_FLEET.filter((item) => item.status === "Planned Stop").length,
      color: "#10B981"
    },
    {
      label: "Idle",
      value: LIVE_FLEET.filter((item) => item.status === "Idle").length,
      color: "#3D4F6A"
    },
    {
      label: "Maintenance",
      value: LIVE_FLEET.filter((item) => item.status === "In Maintenance").length,
      color: "#8B5CF6"
    },
    {
      label: "Unplanned Stop",
      value: 0,
      color: "#F97316"
    },
    {
      label: "Disconnected",
      value: 0,
      color: "#EF4444"
    }
  ]
  
  const statusColors2 = { "En Route": "#3B82F6", "Planned Stop": "#10B981", "Idle": "#3D4F6A", "In Maintenance": "#8B5CF6", "Unplanned Stop": "#EF4444", "Disconnected": "#EF4444" };

  return (
    <div>
      <div className='live-container'>
        <div>
          <h1 className='rj rj-size'>Live GPS Tracking</h1>
          <p className='live-sub'>Real-time fleet visibility — every vehicle, every moment</p>
        </div>
        <div className='ref-btn'>
          <button className="btn btn-b"><Ic n="rotate" s={13} c="var(--blue)" /> Refresh All</button>
        </div>
      </div>
      <div className='row g-3' style={{ marginBottom: "18px" }}>
        {fleetStatusData.map((k) => (
          <div className='col-md-2' key={k.label}>
            <div className='stat' style={{ borderTop: `3px solid ${k.color}` }}>
              <div className='stat-v' style={{ color: k.color }}>{k.value}</div>
              <div className='stat-l'>{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='row g-3'>
        <div className='col-lg-4'>
          <div className='card-box' style={{ padding: 0 ,height:'570px'}}>
            <div className='fleet-title'>Fleet ({LIVE_FLEET.length} vehicles)</div>
            {LIVE_FLEET.map((v) => (
              <div key={v.id} className='fleet-main' onClick={() => setSelVehicle(v)} style={{ background: selVehicle?.id === v.id ? 'var(--accentGlow)' : 'var(--bgCard)' }}>
                <div className='live-row'>
                  <span className='mono mono-f' style={{ color: selVehicle?.id === v.id ? 'var(--accent)' : 'var(--text)' }}>{v.id}</span>
                  <div className='live-col'>
                    <div className="dot pulse" style={{ background: statusColors2[v.status] }} />
                    <span className='live-status' style={{ color: statusColors2[v.status] }}>{v.status}</span>
                  </div>
                </div>
                <div className="live-d">{v.driver}</div>
                <div className="live-loc">{v.location}</div>
                {v.speed > 0 && <div className='live-speed'>🏎️ {v.speed} km/h · {v.lastPing}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className='col-lg-8'>
          <div className='panel-main'>
            <div className='panel-placeholder'>
              <div className='panel-grid' />
              {LIVE_FLEET.map((v, i) => (
                <div key={v.id} onClick={() => setSelVehicle(v)} className='v-dot' style={{ left: `${15 + i * 13}%`, top: `${25 + Math.sin(i) * 30}%` }}>
                  <div className="v-dot-size" style={{ background: statusColors2[v.status] }} />
                  <div className="v-dot-map" style={{ background: statusColors2[v.status] + "cc" }}>{v.id.split(" ")[0]}</div>
                </div>
              ))}
              <div className='map-main'>
                <Ic n="map" s={32} c='var(--textMuted)' />
                <div className="map-view">Live GPS Map View</div>
                <div className="map-view-s">GPS integration required for live tracking</div>
              </div>
            </div>

            {selVehicle ? (
              <div className='card-box'>
                <div className='card-details'>
                  <div>
                    <div className='mono ms'>{selVehicle.id}</div>
                    <div className='dr-s'>{selVehicle.driver} · {selVehicle.trip !== "—" ? selVehicle.trip : "Not on trip"}</div>
                  </div>
                  <div className="vh-s">
                    <div className="dot pulse" style={{ background: statusColors2[selVehicle.status] }} />
                    <span className="vh-ss" style={{ color: statusColors2[selVehicle.status] }}>{selVehicle.status}</span>
                  </div>
                </div>
                <div className='row g-3' style={{ marginBottom: '12px' }}>
                  {[
                  { l:"Speed", v:`${selVehicle.speed} km/h` },
                  { l:"ETA", v:selVehicle.eta },
                  { l:"Load", v:selVehicle.load },
                  { l:"KM Covered", v:`${selVehicle.kmCovered}/${selVehicle.kmTotal} km` },
                  { l:"Last Ping", v:selVehicle.lastPing },
                  { l:"Battery", v:`${selVehicle.battery}%` },
                ].map((k) => (
                    <div key={k.l} className='col-md-4'>
                      <div className='vs-bg'>
                        <div className="vs-label">{k.l}</div>
                        <div className="vs-value">{k.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='vh-loc'><span className='vh-loc-s'>Location: </span>{selVehicle.location}</div>
                {selVehicle.route!=="—" && (
                <div style={{ marginTop:'8px' }}>
                  <div className='route-main'>
                    <span  className="route-title">Route progress</span>
                    <span className="route-dist">{selVehicle.kmCovered} / {selVehicle.kmTotal} km</span>
                  </div>
                  <div className="pbar" style={{ height:'6px' }}><div className="pfill p-blue" style={{ width:`${(selVehicle.kmCovered/selVehicle.kmTotal)*100}%` }} /></div>
                </div>
              )}
              </div>
            ) : (
              <div className="card-box card-box-bg">
                <Ic n="truck" s={28} c='var(--textMuted)'/>
                <div className='vh-d'>Click a vehicle to see live details</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveTracking
