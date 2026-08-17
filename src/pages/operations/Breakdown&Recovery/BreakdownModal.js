import React from 'react'
import { RxCross2 } from "react-icons/rx";

const BreakdownModal = ({sel,setSel,setBds,closeModal}) => {
  return (
     <div className="breakdown-modal-overlay">
          <div className="breakdown-modal">
            <div className="breakdown-modal-header">
              <div className="rj breakdown-modal-title">
                🚨 {sel.id} — {sel.vehicle}
              </div>
             <div className="pre-trip-close-btn" onClick={closeModal}>
                         <RxCross2 size={20} color="white" cursor={"Pointer"} />
                       </div>
            </div>
            <div className="breakdown-modal-body">
              {[
                { l: "Location", v: sel.location },
                { l: "Issue", v: sel.issue },
                { l: "Driver", v: sel.driver },
                { l: "Status", v: sel.status },
                {
                  l: "Recovery Cost",
                  v: sel.cost ? "₹" + sel.cost.toLocaleString() : "Pending",
                },
                { l: "Reported", v: sel.reportedAt || "—" },
              ].map((r) => (
                <div key={r.l} className="breakdown-detail-row">
                  <span className="breakdown-detail-label">{r.l}</span>
                  <span className="breakdown-detail-value">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="breakdown-modal-footer">
              <button className="btn btn-gh" onClick={() =>closeModal(false)}>
                Close
              </button>
              {sel.status !== "Resolved" && (
                <button
                  className="btn breakdown-resolve-btn"
                  onClick={() => {
                    closeModal(false);
                    setSel(null);
                  }}
                >
                  ✅ Mark Resolved
                </button>
              )}
            </div>
          </div>
        </div>
  )
}

export default BreakdownModal