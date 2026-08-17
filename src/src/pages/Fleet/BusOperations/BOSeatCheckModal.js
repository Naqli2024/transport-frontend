import React, { useState, useCallback } from 'react';
 
const SEAT_ITEMS = [
  { id: 'SC-UP', label: 'Seat cover / upholstery' },
  { id: 'SC-FR', label: 'Seat frame & recliner' },
  { id: 'SC-BK', label: 'Seat belt buckle lock' },
  { id: 'SC-RT', label: 'Seat belt retractor' },
  { id: 'SC-WO', label: 'Window open/close' },
  { id: 'SC-WG', label: 'Window glass condition' },
  { id: 'SC-OR', label: 'Overhead rack / luggage bay' },
  { id: 'SC-AC', label: 'AC vent functioning' },
  { id: 'SC-RL', label: 'Reading light' },
  { id: 'SC-EX', label: 'Emergency exit row clear' },
];
 
function getSeatStatus(seatData, busId, seat) {
  const vals = SEAT_ITEMS.map((c) => seatData[`${busId}_${seat}_${c.id}`]);
  if (vals.every((v) => !v)) return 'unchecked';
  if (vals.some((v) => v === 'issue')) return 'issue';
  if (vals.every((v) => v === 'ok')) return 'ok';
  return 'partial';
}
 
function seatStatusCls(status) {
  if (status === 'ok') return 'bo-seat-btn--ok';
  if (status === 'issue') return 'bo-seat-btn--issue';
  if (status === 'partial') return 'bo-seat-btn--partial';
  return 'bo-seat-btn--unchecked';
}
 
function itemStatusCls(val) {
  if (val === 'ok') return 'bo-check-item--ok';
  if (val === 'issue') return 'bo-check-item--issue';
  return 'bo-check-item--unchecked';
}
 
function itemIcon(val) {
  if (val === 'ok') return '✓';
  if (val === 'issue') return '✗';
  return '○';
}
 
function BOSeatCheckModal({ bus, onClose }) {
  const [seatData, setSeatData] = useState({});
  const [selSeat, setSelSeat] = useState(null);
 
  const cycleItem = useCallback(
    (busId, seat, itemId) => {
      const k = `${busId}_${seat}_${itemId}`;
      const cur = seatData[k] || '';
      const nxt = cur === '' ? 'ok' : cur === 'ok' ? 'issue' : '';
      setSeatData((d) => ({ ...d, [k]: nxt }));
    },
    [seatData]
  );
 
  const seats = Array.from({ length: bus.seatingCapacity }, (_, i) => i + 1);
 
  const countOk = seats.filter((s) => getSeatStatus(seatData, bus.id, s) === 'ok').length;
  const countIssue = seats.filter((s) => getSeatStatus(seatData, bus.id, s) === 'issue').length;
  const countChecked = seats.filter((s) => getSeatStatus(seatData, bus.id, s) !== 'unchecked').length;
 
  const selItems = selSeat
    ? SEAT_ITEMS.map((item) => ({
        ...item,
        val: seatData[`${bus.id}_${selSeat}_${item.id}`] || '',
      }))
    : [];
 
  return (
    <div className="bo-seat-overlay" onClick={onClose}>
      <div className="bo-seat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bo-seat-hdr">
          <div className="bo-seat-hdr-title">
            <span className="bo-seat-hdr-badge">💺</span>
            <div>
              <div className="bo-seat-title-main">Seat Condition Check</div>
              <div className="bo-seat-title-sub">
                {bus.regNo} · {bus.model} · {bus.seatingCapacity} seats
              </div>
            </div>
          </div>
          <button className="bo-x-btn" onClick={onClose}>
            ✕
          </button>
        </div>
 
        <div className="bo-seat-body">
          <div className="bo-seat-progress">
            <div className="bo-seat-prog-item bo-seat-prog--ok">
              <span className="bo-seat-prog-val">{countOk}</span>
              <span className="bo-seat-prog-label">OK</span>
            </div>
            <div className="bo-seat-prog-item bo-seat-prog--issue">
              <span className="bo-seat-prog-val">{countIssue}</span>
              <span className="bo-seat-prog-label">Issues</span>
            </div>
            <div className="bo-seat-prog-item bo-seat-prog--partial">
              <span className="bo-seat-prog-val">
                {seats.filter((s) => getSeatStatus(seatData, bus.id, s) === 'partial').length}
              </span>
              <span className="bo-seat-prog-label">Partial</span>
            </div>
            <div className="bo-seat-prog-item bo-seat-prog--unchecked">
              <span className="bo-seat-prog-val">{bus.seatingCapacity - countChecked}</span>
              <span className="bo-seat-prog-label">Unchecked</span>
            </div>
          </div>
 
          <div className="bo-seat-grid-wrap">
            <div className="bo-seat-grid-label">Click a seat to inspect · Tap again to cycle status</div>
            <div className="bo-seat-seat-grid">
              {seats.map((s) => {
                const status = getSeatStatus(seatData, bus.id, s);
                return (
                  <button
                    key={s}
                    className={`bo-seat-btn ${seatStatusCls(status)} ${selSeat === s ? 'bo-seat-btn--sel' : ''}`}
                    onClick={() => setSelSeat(selSeat === s ? null : s)}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
 
          {selSeat && (
            <div className="bo-seat-detail">
              <div className="bo-seat-detail-title">
                <span>Seat {selSeat} — Inspection Checklist</span>
                <span className="bo-seat-detail-hint">Click each item to cycle ○ → ✓ → ✗</span>
              </div>
              <div className="bo-seat-checklist">
                {selItems.map((item) => (
                  <button
                    key={item.id}
                    className={`bo-check-item ${itemStatusCls(item.val)}`}
                    onClick={() => cycleItem(bus.id, selSeat, item.id)}
                  >
                    <span className="bo-check-icon">{itemIcon(item.val)}</span>
                    <span className="bo-check-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
 
          <div className="bo-seat-legend">
            <span className="bo-legend-item bo-legend--ok">✓ OK</span>
            <span className="bo-legend-item bo-legend--issue">✗ Issue</span>
            <span className="bo-legend-item bo-legend--partial">◑ Partial</span>
            <span className="bo-legend-item bo-legend--unchecked">○ Unchecked</span>
          </div>
        </div>
 
        <div className="bo-seat-footer">
          <button className="bo-btn bo-btn-ghost" onClick={onClose}>
            Close
          </button>
          <button className="bo-btn bo-btn-blue" disabled={countChecked === 0}>
            📋 Generate Work Order {countIssue > 0 ? `(${countIssue} issues)` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BOSeatCheckModal;