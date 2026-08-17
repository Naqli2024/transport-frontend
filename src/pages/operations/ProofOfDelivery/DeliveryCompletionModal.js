import React, { useState } from 'react';

const DeliveryCompletionModal = ({ pod, onClose, onSave }) => {
  const [f, sf] = useState({
    receiverName:     "",
    receiverPhone:    "",
    condition:        "Good",
    shortage:         0,
    otp:              "",
    otpSent:          false,
    otpVerified:      false,
    signatureCaptured:false,
  });

  const pf = (k, v) => sf(x => ({ ...x, [k]: v }));

  const canLock = f.signatureCaptured && f.otpVerified;

  const handleLock = () => {
    if (!canLock) return;
    onSave && onSave({
      id:               pod.id,
      receiverName:     f.receiverName,
      receiverPhone:    f.receiverPhone,
      otpVerified:      f.otpVerified,
      signatureCaptured:f.signatureCaptured,
      deliveredQty:     pod.qty,
      shortage:         Number(f.shortage),
    });
    onClose();
  };

  return (
    <div className="pod-modal">
      <div className="pod-detail-modal">
        <div className="pod-detail-head">
          <div className="pod-detail-title">✅ Delivery Confirmation — {pod.id}</div>
          <div className="pod-detail-close" onClick={onClose}>✕</div>
        </div>
        <div className="pod-detail-body">
          <div className="pod-complete-info">
            <div className="pod-complete-info-inner">
              <span>Material: <strong>{pod.material}</strong></span>
              <span>Qty: <strong>{pod.qty} {pod.unit}</strong></span>
              <span>Route: <strong>{pod.from} → {pod.to}</strong></span>
            </div>
          </div>
          <div className="pod-complete-grid">
            <div>
              <label className="pod-label">Receiver Name *</label>
              <input
                value={f.receiverName}
                onChange={e => pf("receiverName", e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="pod-label">Phone (for OTP)</label>
              <input
                type='number'
                value={f.receiverPhone}
                onChange={e => pf("receiverPhone", e.target.value)}
                placeholder="10-digit number"
              />
            </div>
          </div>
          <div className="pod-complete-grid">
            <div>
              <label className="pod-label">Shortage ({pod.unit})</label>
              <input
                type="number"
                min={0}
                max={pod.qty}
                value={f.shortage}
                onChange={e => pf("shortage", e.target.value)}
              />
            </div>
            <div>
              <label className="pod-label">Condition</label>
              <select value={f.condition} onChange={e => pf("condition", e.target.value)}>
                <option>Good</option>
                <option>Damaged</option>
                <option>Partial</option>
              </select>
            </div>
          </div>
          <div className="pod-otp-box">
            {!f.otpVerified ? (
              !f.otpSent ? (
                <button
                  className="btn btn-b"
                  style={{ fontSize: 11 }}
                  onClick={() => pf("otpSent", true)}
                  disabled={!f.receiverPhone}
                >
                  📱 Send OTP to {f.receiverPhone || "receiver"}
                </button>
              ) : (
                <div className="pod-otp-row">
                  <input
                    className="pod-otp-input"
                    value={f.otp}
                    onChange={e => pf("otp", e.target.value)}
                    placeholder="6-digit OTP"
                    maxLength={6}
                  />
                  <button
                    className="btn btn-g"
                    onClick={() => f.otp.length >= 4 && pf("otpVerified", true)}
                  >
                    Verify ✓
                  </button>
                </div>
              )
            ) : (
              <div className="pod-otp-verified">✅ OTP Verified — {f.receiverPhone}</div>
            )}
          </div>
          {!f.signatureCaptured ? (
            <div
              className={`pod-sign-area ${f.otpVerified ? "pod-sign-ready" : "pod-sign-locked"}`}
              onClick={() => f.otpVerified && pf("signatureCaptured", true)}
            >
              {f.otpVerified ? "✍️ Tap to capture signature" : "🔒 Verify OTP first"}
            </div>
          ) : (
            <div className="pod-signed-done">
              ✅ Signature captured — signed by <strong>{f.receiverName || "receiver"}</strong>
            </div>
          )}
          <div className="pod-complete-actions">
            <button className="btn btn-gh" onClick={onClose}>Cancel</button>
            <button
              className={`btn ${canLock ? "pod-btn-lock-active" : "pod-btn-lock-disabled"}`}
              onClick={handleLock}
              disabled={!canLock}
            >
              🔒 Lock Delivery
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeliveryCompletionModal;
