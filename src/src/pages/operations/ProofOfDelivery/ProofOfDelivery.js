import React, { useState } from 'react'
import DeliveryCompletionModal from './DeliveryCompletionModal';
import PODDetailModal from './PODDetailModal';

const POD_DATA_INIT = [
  { id: "POD-001", tripId: "TRP-2025-0041", lrNo: "LR-2025-4891", status: "Delivered & Signed", vehicle: "TN69 GH4789", driver: "Mani Kumar", consignor: "Steel Corp India Ltd", consignorPhone: "044-23456789", consignee: "Ramesh Enterprises", consigneePhone: "9876543210", from: "Chennai", to: "Coimbatore", date: "2025-04-15", dispatchTime: "06:30", deliveryTime: "14:15", material: "HR Coils", qty: 22, unit: "MT", deliveredQty: 22, shortage: 0, damaged: false, receiverName: "Vijay Kumar", receiverPhone: "9876543210", otpVerified: true, gpsLat: 11.0168, gpsLng: 76.9558, notes: "Delivered in good condition", signatureCaptured: true, photoUploaded: true, locked: true },
  { id: "POD-002", tripId: "TRP-2025-0042", lrNo: "LR-2025-4892", status: "In Transit", vehicle: "TN59 AB1234", driver: "Selvam R", consignor: "Reliance Industries", consignorPhone: "022-12345678", consignee: "Madurai Distributors", consigneePhone: "9944332211", from: "Mumbai", to: "Madurai", date: "2025-04-15", dispatchTime: "08:00", deliveryTime: null, material: "FMCG Goods", qty: 18, unit: "MT", deliveredQty: null, shortage: null, damaged: null, receiverName: null, receiverPhone: null, otpVerified: false, gpsLat: null, gpsLng: null, notes: "", signatureCaptured: false, photoUploaded: false, locked: false },
  { id: "POD-003", tripId: "TRP-2025-0043", lrNo: "LR-2025-4893", status: "Delivered — Shortage", vehicle: "TN45 CD5678", driver: "Ramesh P", consignor: "Ambuja Cement", consignorPhone: "079-87654321", consignee: "Nagpur Infra Pvt Ltd", consigneePhone: "9988776655", from: "Pune", to: "Nagpur", date: "2025-04-14", dispatchTime: "05:00", deliveryTime: "13:30", material: "Cement Bags", qty: 240, unit: "Bags", deliveredQty: 232, shortage: 8, damaged: true, receiverName: "Suresh Patel", receiverPhone: "9988776655", otpVerified: true, gpsLat: 21.1458, gpsLng: 79.0882, notes: "8 bags damaged in transit — wet patch on load floor", signatureCaptured: true, photoUploaded: true, locked: true },
  { id: "POD-004", tripId: "TRP-2025-0044", lrNo: "LR-2025-4894", status: "Pending Delivery", vehicle: "TN71 GH3456", driver: "Vinoth S", consignor: "Tata Steel", consignorPhone: "033-44556677", consignee: "Delhi Steel Traders", consigneePhone: "9911223344", from: "Jamshedpur", to: "Delhi", date: "2025-04-15", dispatchTime: "07:00", deliveryTime: null, material: "Steel Rods", qty: 30, unit: "MT", deliveredQty: null, shortage: null, damaged: null, receiverName: null, receiverPhone: null, otpVerified: false, gpsLat: null, gpsLng: null, notes: "", signatureCaptured: false, photoUploaded: false, locked: false },
];

const STATUS_CLASS = {
  "Delivered & Signed": "pod-status-green",
  "In Transit": "pod-status-blue",
  "Delivered — Shortage": "pod-status-orange",
  "Pending Delivery": "pod-status-muted",
};

const KPI_ITEMS = (pods, delivered, pending, shortage) => [
  { l: "Total PODs", v: pods.length, statCls: "pod-stat-blue", valCls: "pod-val-blue" },
  { l: "Verified & Locked", v: delivered.length, statCls: "pod-stat-green", valCls: "pod-val-green" },
  { l: "Pending", v: pending.length, statCls: "pod-stat-orange", valCls: "pod-val-orange" },
  { l: "Shortage Cases", v: shortage.length, statCls: "pod-stat-red", valCls: "pod-val-red" },
  { l: "Verified Badge", v: delivered.filter(p => p.otpVerified).length, statCls: "pod-stat-cyan", valCls: "pod-val-cyan" },
];

const ProofOfDelivery = () => {
  const [pods, setPods] = useState(POD_DATA_INIT);
  const [PODDetail, setPODDetail] = useState(null);
  const [PODComplete, setPODComplete] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSavePOD = (updated) => setPods(p => p.map(pod => pod.id === updated.id ? updated : pod));
  const filtered = filterStatus === "All" ? pods : pods.filter(p => p.status === filterStatus);
  const pending = pods.filter(p => !p.locked);
  const delivered = pods.filter(p => p.locked);
  const shortage = pods.filter(p => p.shortage > 0);

  return (
    <div>
      {showCompleteModal && (
        <DeliveryCompletionModal 
        pod={PODComplete} 
        onClose={() => {
          setPODComplete(null) 
        setShowCompleteModal(false)
        }} onSave={handleSavePOD} />)}
      {showDetailModal && (
        <PODDetailModal
          pod={PODDetail}
          onClose={() => {
            setPODDetail(null);
            setShowDetailModal(false);
          }}
        />
      )}
      <div className="pod-page-header">
        <div>
          <h1 className="heading">Proof of Delivery (POD)</h1>
          <p className="sub-heading">3-party verified · OTP signature · GPS stamped · legally defensible delivery records</p>
        </div>
        <div className="pod-header-actions">
          <button className="btn btn-b">📄 Bulk Download</button>
        </div>
      </div>
      <div className="pod-kpi" style={{ gridTemplateColumns: "repeat(5,1fr)", marginBottom: 18 }}>
        {KPI_ITEMS(pods, delivered, pending, shortage).map(k => (
          <div key={k.l} className={`pod-stat ${k.statCls}`}>
            <div className={`pod-stat-v ${k.valCls}`}>{k.v}</div>
            <div className="pod-stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      {pending.length > 0 && (
        <div className="card pod-alert-pending">
          <div className="pod-section-title pod-alert-title-orange">⏳ Awaiting Delivery Completion — {pending.length} trips</div>
          {pending.map(p => (
            <div key={p.id} className="pod-arrow pod-arow-orange">
              <div className="pod-alert-info">
                <div className="pod-alert-lr-row">
                  <span className="mono pod-lr-no">{p.lrNo}</span>
                  <span className="pod-alert-vehicle">{p.vehicle} · {p.driver}</span>
                  <span className={`badge ${STATUS_CLASS[p.status] || "pod-status-muted"}`}>{p.status}</span>
                </div>
                <div className="pod-alert-sub">{p.consignor} → {p.consignee} · {p.material} · {p.qty} {p.unit}</div>
                <div className="pod-alert-muted">{p.from} → {p.to}</div>
              </div>
              <button className="btn pod-btn-complete" onClick={() => {
                      setPODComplete(p)
                      setShowCompleteModal(true)
                    }}>✅ Complete Delivery</button>
            </div>
          ))}
        </div>
      )}
      {shortage.length > 0 && (
        <div className="card pod-alert-shortage">
          <div className="pod-section-title pod-alert-title-red">⚠️ Shortage / Damage Cases — {shortage.length} PODs</div>
          {shortage.map(p => (
            <div key={p.id} className="pod-arrow pod-arow-red">
              <div className="pod-alert-info">
                <div className="pod-shortage-lr">{p.lrNo} · {p.consignee}</div>
                <div className="pod-shortage-sub">Shortage: {p.shortage} {p.unit} · {p.damaged ? "Damage reported" : "No damage"}</div>
                <div className="pod-shortage-notes">{p.notes?.slice(0, 80)}</div>
              </div>
              <button className="btn pod-btn-view-shortage" onClick={() => {
                setPODDetail(p)
                setShowDetailModal(true)
              }}>View →</button>
            </div>
          ))}
        </div>
      )}
      <div className="pod-filter-row">
        <div className="tabs pod-tabs">
          {["All", "In Transit", "Pending Delivery", "Delivered & Signed", "Delivered - Shortage"].map(s => (
            <div key={s} className={`tab pod-tab ${filterStatus === s ? "on" : ""}`} onClick={() => setFilterStatus(s)}>{s}</div>
          ))}
        </div>
      </div>
      <div className="card pod-table-card">
        <table className="pod-tbl">
          <thead>
            <tr>
              <th>LR No</th><th>Date</th><th>Consignor</th><th>Consignee</th>
              <th>Vehicle</th><th>Material</th><th>Qty</th><th>Delivered</th>
              <th>OTP</th><th>Signature</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="pod-tbl-row">
                <td className="pod-tbl-lr">{p.lrNo}</td>
                <td className="pod-tbl-sm">{p.date}</td>
                <td className="pod-tbl-sm">{p.consignor?.split(" ").slice(0, 2).join(" ")}</td>
                <td className="pod-tbl-sm">{p.consignee?.split(" ").slice(0, 2).join(" ")}</td>
                <td className="mono pod-tbl-sm">{p.vehicle}</td>
                <td className="pod-tbl-sm">{p.material}</td>
                <td className="pod-tbl-qty">{p.qty} {p.unit}</td>
                <td className={p.shortage > 0 ? "pod-tbl-del-bad" : "pod-tbl-del-ok"}>
                  {p.deliveredQty != null ? `${p.deliveredQty} ${p.unit}` : "—"}
                </td>
                <td>
                  {p.otpVerified
                    ? <span className="badge bg pod-tbl-badge-sm">✅ Yes</span>
                    : <span className="pod-tbl-no">—</span>}
                </td>
                <td>
                  {p.signatureCaptured
                    ? <span className="badge bg pod-tbl-badge-sm">✅ Signed</span>
                    : <span className="pod-tbl-no">—</span>}
                </td>
                <td>
                  <span className={`badge ${STATUS_CLASS[p.status] || "pod-status-muted"}`}>{p.status}</span>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  {!p.locked
                    ? <button className="btn pod-tbl-btn-complete" onClick={() => {
                      setPODComplete(p)
                      setShowCompleteModal(true)
                    }}>Complete</button>
                    : <button className="btn pod-tbl-btn-view" onClick={() => {
                      setPODDetail(p)
                      setShowDetailModal(true)
                    }}>View POD →</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProofOfDelivery