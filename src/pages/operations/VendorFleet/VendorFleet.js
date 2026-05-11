import React, { useState } from 'react';

const VENDORS = [
  { id: 'VND-001', name: 'Sri Murugan Transport',   contact: 'Vijay K',    city: 'Coimbatore', vehicles: 3, rating: 4.2, status: 'Active', totalTrips: 18, totalFreight: 890000,  ratePerKm: 42, kycDone: true  },
  { id: 'VND-002', name: 'Annamalai Lorry Service', contact: 'Selvam A',   city: 'Salem',      vehicles: 2, rating: 3.8, status: 'Active', totalTrips: 12, totalFreight: 540000,  ratePerKm: 38, kycDone: true  },
  { id: 'VND-003', name: 'KPR Fleet Solutions',     contact: 'Krishnan P', city: 'Madurai',    vehicles: 5, rating: 4.5, status: 'Active', totalTrips: 29, totalFreight: 1450000, ratePerKm: 44, kycDone: true  },
];

const VENDOR_VEHICLES = [
  { id: 'VVH-001', vendor: 'Sri Murugan Transport',   num: 'TN32 XY7821', model: 'Tata LPT 2518', type: 'Tripper',  status: 'Available', ratePerKm: 42 },
  { id: 'VVH-002', vendor: 'KPR Fleet Solutions',     num: 'TN58 AB1100', model: 'Tata Prima',    type: 'Trailer',  status: 'Available', ratePerKm: 44 },
  { id: 'VVH-003', vendor: 'Annamalai Lorry Service', num: 'TN72 CD4400', model: 'BharatBenz',    type: 'Flatbed',  status: 'Available', ratePerKm: 38 },
];

const RATE_REF_KM = 1280; 

const fmt  = (n)  => '₹' + Number(n).toLocaleString('en-IN');
const TABS = ['Vendors', 'Vehicles', 'Rates'];


const VendorFleet = () => {
  const [tab, setTab] = useState('Vendors');

  const KPI = [
    { label: 'Active Vendors',   value: VENDORS.length,                                    color: 'green'  },
    { label: 'Vendor Vehicles',  value: VENDOR_VEHICLES.length,                            color: 'blue'   },
    { label: 'Available Now',    value: VENDOR_VEHICLES.filter(v => v.status === 'Available').length, color: 'cyan' },
    { label: 'Vendor Trips',     value: 2,                                                  color: 'purple' },
  ];

  const rateOptions = [
    { label: 'Own Fleet (est.)', cost: 52480, isOwn: true  },
    ...VENDORS.map(v => ({ label: v.name, cost: v.ratePerKm * RATE_REF_KM, isOwn: false })),
  ];

  return (
    <div className="vendor-fleet-page">
      <div className="vendor-fleet-header">
        <div>
          <h1 className="vendor-fleet-title">Vendor Fleet</h1>
          <p className="vendor-fleet-sub">KYC · Rate contracts · Vehicle pool · Performance</p>
        </div>
        <button className="vendor-fleet-btn-onboard">+ Onboard Vendor</button>
      </div>
      <div className="vendor-fleet-kpi-list">
        {KPI.map(k => (
          <div key={k.label} className={`vendor-fleet-kpi-card vendor-fleet-kpi-${k.color}`}>
            <div className="vendor-fleet-kpi-val">{k.value}</div>
            <div className="vendor-fleet-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="vendor-fleet-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`vendor-fleet-tab ${tab === t ? 'vendor-fleet-tab-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
        <div className="vendor-fleet-tabs-line" />
      </div>
      {tab === 'Vendors' && (
        <div className="vendor-fleet-grid">
          {VENDORS.map(v => (
            <div key={v.id} className="vendor-fleet-card">
              <div className="vendor-fleet-card-head">
                <div>
                  <div className="vendor-fleet-card-name">{v.name}</div>
                  <div className="vendor-fleet-card-contact">{v.contact} · {v.city}</div>
                </div>
                <div className="vendor-fleet-card-meta">
                  <div className="vendor-fleet-rating">
                    <span className="vendor-fleet-star">★</span>
                    <span className="vendor-fleet-rating-val">{v.rating}</span>
                  </div>
                  <span className="vendor-fleet-badge-active">Active</span>
                </div>
              </div>
              <div className="vendor-fleet-card-stats">
                <span className="vendor-fleet-stat-vehicles">
                  <strong>{v.vehicles}</strong> vehicles
                </span>
                <span className="vendor-fleet-stat-trips">
                  <strong>{v.totalTrips}</strong> trips
                </span>
                <span className="vendor-fleet-stat-rate">
                  ₹{v.ratePerKm}/km
                </span>
                {v.kycDone && (
                  <span className="vendor-fleet-badge-kyc">KYC ✓</span>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
      {tab === 'Vehicles' && (
        <div className="vendor-fleet-table-card">
          <div className="vendor-fleet-table-scroll">
            <table className="vendor-fleet-table">
              <thead>
                <tr>
                  <th>Vehicle No</th>
                  <th>Vendor</th>
                  <th>Model</th>
                  <th>Type</th>
                  <th>Rate/km</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {VENDOR_VEHICLES.map(v => (
                  <tr key={v.id}>
                    <td className="vendor-fleet-td-num">{v.num}</td>
                    <td className="vendor-fleet-td-vendor">{v.vendor}</td>
                    <td className="vendor-fleet-td-model">{v.model}</td>
                    <td>
                      <span className="vendor-fleet-badge-type">{v.type}</span>
                    </td>
                    <td className="vendor-fleet-td-rate">₹{v.ratePerKm}/km</td>
                    <td>
                      <span className={`vendor-fleet-badge-status vendor-fleet-status-${v.status.toLowerCase().replace(' ', '-')}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>
                      <button className="vendor-fleet-btn-assign">Assign Trip</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === 'Rates' && (
        <div className="vendor-fleet-rates-card">
          <div className="vendor-fleet-rates-title">Rate Comparison</div>
          <div className="vendor-fleet-rates-grid">
            {rateOptions.map((opt, i) => (
              <div
                key={i}
                className={`vendor-fleet-rate-opt ${opt.isOwn ? 'vendor-fleet-rate-own' : ''}`}
              >
                <div className="vendor-fleet-rate-label">{opt.label}</div>
                <div className={`vendor-fleet-rate-val ${opt.isOwn ? 'vendor-fleet-rate-val-own' : 'vendor-fleet-rate-val-vendor'}`}>
                  {fmt(opt.cost)}
                </div>
                {opt.isOwn && (
                  <div className="vendor-fleet-rate-rec">Recommended</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default VendorFleet;
