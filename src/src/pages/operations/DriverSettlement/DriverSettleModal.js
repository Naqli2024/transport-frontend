import React, { useState } from 'react';

const DriverSettleModal = ({ settlement, onClose, onConfirm }) => {
  const [form, setForm] = useState({
    amount: String(Math.abs(settlement.balance)),
    mode:   'Cash',
  });

  const pf = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleConfirm = () => {
    onConfirm && onConfirm(settlement.id);
    onClose();
  };

  return (
    <div className="driver-s-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="driver-s-modal">
        <div className="driver-s-modal-hdr">
          <div className="driver-s-modal-title">
            💳 Settle — {settlement.driver}
          </div>
          <button className="driver-s-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="driver-s-modal-body">
          <div className="driver-s-balance-info">
            Balance:&nbsp;
            <span className="driver-s-balance-val">
              ₹{Math.abs(settlement.balance).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="driver-s-form-grid">
            <div className="driver-s-field">
              <label className="driver-s-label">Amount (₹)</label>
              <input
                className="driver-s-input"
                type="number"
                min={0}
                value={form.amount}
                onChange={e => pf('amount', e.target.value)}
                placeholder={Math.abs(settlement.balance)}
              />
            </div>
            <div className="driver-s-field">
              <label className="driver-s-label">Mode</label>
              <select
                className="driver-s-select"
                value={form.mode}
                onChange={e => pf('mode', e.target.value)}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
              </select>
            </div>
          </div>
          <div className="driver-s-modal-footer">
            <button className="driver-s-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="driver-s-btn-confirm" onClick={handleConfirm}>
              ✅ Mark Settled
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DriverSettleModal;
