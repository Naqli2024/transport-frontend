import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { INSPECTION_ITEMS } from "../../../helpers/InspectionItems";
import { Ic } from "../../../components/icons/Ic";

const TripInspectionModal = ({ trip, type, onClose, onComplete, open }) => {
  const [checks, setChecks] = useState(() =>
    Object.fromEntries(INSPECTION_ITEMS.map((i) => [i, null])),
  );
  const [odometer, setOdometer] = useState("");
  const [fuelLevel, setFuelLevel] = useState("");
  const [remarks, setRemarks] = useState("");
  const [signed, setSigned] = useState(false);
  const [decision, setDecision] = useState("approve");

  const toggle = (item, val) => setChecks((c) => ({ ...c, [item]: val }));
  const passCount = Object.values(checks).filter((v) => v === "pass").length;
  const failCount = Object.values(checks).filter((v) => v === "fail").length;
  const allChecked = Object.values(checks).every((v) => v !== null);
  const hasDefects = failCount > 0;
  const isPost = type === "post";
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiBackdrop-root": {
            background: "rgba(0,0,0,.85)",
            backdropFilter: "blur(8px)",
          },
          "& .MuiDialog-container": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          },
          "& .MuiPaper-root": {
            background: "var(--bgCard)",
            border: `1px solid var(--borderHi)`,
            borderRadius: "16px",
            width: "100%",
            maxWidth: "900px",
            maxHeight: "92vh",
            overflowY: "visible",
            margin: 0,
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <div
            className="trip-inspection-modal-header"
            style={{ background: isPost ? "#312E81" : "#064E3B" }}
          >
            <div>
              <div className="rj trip-inspection-modal-title">
                {isPost ? "📋 Post-Trip Inspection" : "✅ Pre-Trip Inspection"}{" "}
                — {trip.id}
              </div>
              <div
                className="trip-inspection-modal-route"
                style={{ color: isPost ? "#C7D2FE" : "#6EE7B7" }}
              >
                {trip.vehicleType === "vendor"
                  ? "Vendor: " + trip.vendor
                  : trip.vehicle}{" "}
                · {trip.route} · {trip.driver}
              </div>
            </div>
            <div className="trip-inspection-modal-header-actions">
              <span
                className="trip-inspection-modal-checked"
                style={{ color: isPost ? "#C7D2FE" : "#6EE7B7" }}
              >
                {passCount}/{INSPECTION_ITEMS.length} checked
              </span>
              <button
                className="control-btn"
                className="trip-inspection-modal-close-btn"
                onClick={onClose}
              >
                <Ic n="x" s={14} c="#fff" />
              </button>
            </div>
          </div>
          <div className="trip-inspection-modal-body">
            <div className="trip-inspection-modal-progress-wrap">
              <div className="trip-inspection-modal-progress-header">
                <span className="trip-inspection-modal-progress-title">
                  Inspection Progress
                </span>
                <span className="trip-inspection-modal-progress-title">
                  {passCount} Pass ·{" "}
                  <span
                    className="trip-inspection-modal-progress-title"
                    style={{ color: "var(--red)" }}
                  >
                    {failCount} Fail
                  </span>{" "}
                  · {INSPECTION_ITEMS.length - passCount - failCount} Pending
                </span>
              </div>
              <div className="control-pbar" style={{ height: "6px" }}>
                <div
                  className="control-pfill"
                  style={{
                    width: `${((passCount + failCount) / INSPECTION_ITEMS.length) * 100}%`,
                    background: hasDefects
                      ? "var(--red)"
                      : isPost
                        ? "var(--purple)"
                        : "var(--green)",
                  }}
                />
              </div>
            </div>

            <div className="row g-3" style={{ marginBottom: "18px" }}>
              {INSPECTION_ITEMS.map((item) => (
                <div className="col-md-6" key={item}>
                  <div
                    className={`trip-inspection-modal-inspect-item ${checks[item] === "pass" ? "pass" : checks[item] === "fail" ? "fail" : ""}`}
                  >
                    <span className="trip-inspection-modal-inspect-item-label">
                      {item}
                    </span>
                    <div className="trip-inspection-modal-inspect-actions">
                      <button
                        onClick={() => toggle(item, "pass")}
                        className="control-btn trip-inspection-modal-inspect-btn"
                        style={{
                          background:
                            checks[item] === "pass"
                              ? "var(--green)"
                              : "var(--bgCard)",
                          color:
                            checks[item] === "pass" ? "#fff" : "var(--textSub)",
                          border: `1px solid ${checks[item] === "pass" ? "var(--green)" : "var(--border)"}`,
                        }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => toggle(item, "fail")}
                        className="control-btn trip-inspection-modal-inspect-btn"
                        style={{
                          background:
                            checks[item] === "fail"
                              ? "var(--red)"
                              : "var(--bgCard)",
                          color:
                            checks[item] === "fail" ? "#fff" : "var(--textSub)",
                          border: `1px solid ${checks[item] === "fail" ? "var(--red)" : "var(--border)"}`,
                        }}
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-3" style={{ marginBottom: "12px" }}>
              <div className="col-md-4">
                <label className="trip-inspection-modal-flabel">
                  Odometer (km)
                </label>
                <input
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  placeholder="74875"
                  className="trip-inspection-modal-odom-input"
                />
              </div>
              <div className="col-md-4">
                <label className="trip-inspection-modal-flabel">
                  Fuel Level
                </label>
                <select
                  value={fuelLevel}
                  onChange={(e) => setFuelLevel(e.target.value)}
                  className="trip-inspection-modal-odom-input"
                >
                  <option value="">Select</option>
                  <option>Full</option>
                  <option>3/4</option>
                  <option>1/2</option>
                  <option>1/4</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="trip-inspection-modal-flabel">
                  Driver Sign
                </label>
                <div
                  onClick={() => setSigned((s) => !s)}
                  className="trip-inspection-modal-sign-box"
                  style={{
                    border: `1px solid ${signed ? "var(--green)" : "var(--border)"}`,
                    background: signed ? "var(--greenGlow)" : "var(--bgPanel)",
                    color: signed ? "var(--green)" : "var(--textSub)",
                  }}
                >
                  {signed ? "✓ Signed" : "Tap to Sign"}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label className="trip-inspection-modal-flabel">
                Remarks / Observations
              </label>
              <textarea
                className="trip-inspection-modal-odom-input"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Defects, issues, notes..."
                style={{ height: 60 }}
              />
            </div>
            {hasDefects && (
              <div className="trip-inspection-modal-alert">
                ⚠️ {failCount} defect(s) found. Admin must decide action before
                proceeding.
              </div>
            )}

            {isPost && (
              <div style={{ marginBottom: "16px" }}>
                <label className="trip-inspection-modal-flabel">
                  Admin Decision
                </label>
                <div className="trip-inspection-modal-admin-actions">
                  {[
                    ["approve", "✓ Approve", "var(--green)"],
                    ["maintenance", "🔧 Maintenance", "var(--orange)"],
                    ["hold", "⏸ Hold", "var(--red)"],
                  ].map(([val, lbl, col]) => (
                    <button
                      key={val}
                      onClick={() => setDecision(val)}
                      className="control-btn"
                      style={{
                        border: `1px solid ${decision === val ? col : "var(--border)"}`,
                        background:
                          decision === val ? col + "20" : "var(--bgPanel)",
                        color: decision === val ? col : "var(--textSub)",
                        fontSize: 12,
                      }}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <DialogActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                className="control-btn trip-inspection-modal-btn-gh"
                onClick={onClose}
              >
                Close
              </button>
              <div className="trip-inspection-modal-admin-actions">
                {hasDefects && !isPost && (
                  <button
                    className="control-btn trip-inspection-modal-btn-orange"
                    onClick={() => {
                      onComplete(trip.id, type, checks, remarks, "maintenance");
                      onClose();
                    }}
                  >
                    Send to Maintenance
                  </button>
                )}
                <button
                  className="control-btn trip-inspection-modal-btn-p"
                  style={{ opacity: !allChecked || !signed ? 0.5 : 1 }}
                  onClick={() => {
                    if (allChecked && signed) {
                      onComplete(
                        trip.id,
                        type,
                        checks,
                        remarks,
                        isPost ? decision : "approved",
                      );
                      onClose();
                    }
                  }}
                >
                  {" "}
                  {isPost ? "Submit Post-Trip" : "✓ Approve & Dispatch"}{" "}
                </button>
              </div>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripInspectionModal;
