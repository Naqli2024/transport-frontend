import React from 'react';

const DETAIL_ROWS = (pod) => [
  { l: "Trip ID", v: pod.tripId },
  { l: "LR Number", v: pod.lrNo },
  { l: "Vehicle", v: pod.vehicle },
  { l: "Driver", v: pod.driver },
  { l: "Route", v: pod.from && pod.to ? `${pod.from} → ${pod.to}` : null },
  { l: "Consignor", v: pod.consignor },
  { l: "Consignee", v: pod.consignee },
  { l: "Material", v: pod.material },
  { l: "Ordered Qty", v: pod.qty != null ? `${pod.qty} ${pod.unit}` : null },
  { l: "Delivered Qty", v: pod.deliveredQty != null ? `${pod.deliveredQty} ${pod.unit}` : null },
  { l: "Shortage", v: pod.shortage > 0 ? `${pod.shortage} ${pod.unit}` : "None" },
  { l: "Damaged", v: pod.damaged != null ? (pod.damaged ? "Yes" : "No") : null },
  { l: "Received By", v: pod.receiverName },
  { l: "Receiver Phone", v: pod.receiverPhone },
  { l: "Dispatch Time", v: pod.dispatchTime },
  { l: "Delivery Time", v: pod.deliveryTime },
  { l: "OTP Verified", v: pod.otpVerified ? "✅ Yes" : "—" },
  { l: "Signature", v: pod.signatureCaptured ? "✅ Captured" : "—" },
  { l: "Photo Upload", v: pod.photoUploaded ? "✅ Uploaded" : "—" },
  { l: "GPS", v: pod.gpsLat != null ? `${pod.gpsLat}, ${pod.gpsLng}` : null },
  { l: "Status", v: pod.status },
];

const PODDetailModal = ({ pod, onClose }) => (
  <div className="pod-modal">
    <div className="pod-detail-modal">
      <div className="pod-detail-head">
        <div className="pod-detail-title">📄 POD — {pod?.id}</div>
        <div className="pod-detail-close" onClick={onClose}>✕</div>
      </div>
      <div className="pod-detail-body">
        {pod && DETAIL_ROWS(pod).map(r => (
          <div key={r.l} className="pod-detail-row">
            <div className="pod-detail-label">{r.l}</div>
            <div className="pod-detail-value">{r.v || "—"}</div>
          </div>
        ))}
        {pod.notes && (
          <div className="pod-detail-remarks">
            📝 Notes: {pod.notes}
          </div>
        )}
      </div>
      <div className="m-3">
        <button className="btn btn-gh me-2" onClick={onClose}>Close</button>
        <button className="btn btn-p">📥 Download POD</button>
      </div>
    </div>
  </div>
);

export default PODDetailModal;
