import React, { useState, useMemo } from "react";
import { BUS_PRETRIP_CHECKS } from "./BusOperations";

const CATEGORIES = [
  {
    key: "safety_critical",
    label: "🚨 Safety Critical",
    colorCls: "red",
    count: 8,
  },
  { key: "electrical", label: "⚡ Electrical", colorCls: "blue", count: 7 },
  { key: "mechanical", label: "🔧 Mechanical", colorCls: "orange", count: 6 },
  {
    key: "compliance",
    label: "📋 Compliance Docs",
    colorCls: "green",
    count: 6,
  },
];

function itemStateCls(val) {
  if (val === "ok") return "bo-pt-item--ok";
  if (val === "issue") return "bo-pt-item--issue";
  return "bo-pt-item--unchecked";
}

function itemIcon(val) {
  if (val === "ok") return "✓";
  if (val === "issue") return "✗";
  return "○";
}

export default function BOPreTripModal({ bus, onClose, totalChecks = 27 }) {
  const [ptData, setPtData] = useState({});

  function cycleCheck(checkId) {
    const k = `${bus.id}_${checkId}`;
    const cur = ptData[k] || "";
    const nxt = cur === "" ? "ok" : cur === "ok" ? "issue" : "";
    setPtData((d) => ({ ...d, [k]: nxt }));
  }

  const { criticalFailed, totalPassed, totalIssues } = useMemo(() => {
    const criticalFailed = BUS_PRETRIP_CHECKS.safety_critical.some(
      (c) => ptData[`${bus.id}_${c.id}`] === "issue",
    );
    const allVals = Object.values(ptData);
    const totalPassed = allVals.filter((v) => v === "ok").length;
    const totalIssues = allVals.filter((v) => v === "issue").length;
    return { criticalFailed, totalPassed, totalIssues };
  }, [ptData, bus.id]);

  const allCriticalPassed = BUS_PRETRIP_CHECKS.safety_critical.every(
    (c) => ptData[`${bus.id}_${c.id}`] === "ok",
  );
  const canDepart = allCriticalPassed && !criticalFailed;

  const progressPct = Math.round((totalPassed / totalChecks) * 100);

  return (
    <div className="bo-pt-overlay" onClick={onClose}>
      <div className="bo-pt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bo-pt-hdr">
          <div>
            <div className="bo-pt-title">
              🔍 Pre-Trip Safety Check — {bus.regNo}
            </div>
            <div className="bo-pt-subtitle">
              {totalChecks} checks across 4 categories · All Safety Critical
              items must pass to depart
            </div>
          </div>
          <button className="bo-x-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="bo-pt-body">
          {criticalFailed && (
            <div className="bo-pt-danger-banner">
              <span className="bo-pt-danger-icon">🚨</span>
              <span>
                Bus <strong>CANNOT depart</strong> — resolve critical issues
                first
              </span>
            </div>
          )}
          <div className="bo-pt-progress-wrap">
            <div className="bo-pt-progress-meta">
              <span className="bo-pt-progress-label">Overall Progress</span>
              <span className="bo-pt-progress-pct">
                {totalPassed}/{totalChecks} passed
              </span>
            </div>
            <div className="bo-pt-pbar">
              <div
                className={`bo-pt-pfill ${criticalFailed ? "bo-pt-pfill--danger" : progressPct === 100 ? "bo-pt-pfill--full" : "bo-pt-pfill--progress"}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {CATEGORIES.map(({ key, label, colorCls }) => {
            const items = BUS_PRETRIP_CHECKS[key];
            const passed = items.filter(
              (c) => ptData[`${bus.id}_${c.id}`] === "ok",
            ).length;
            const issues = items.filter(
              (c) => ptData[`${bus.id}_${c.id}`] === "issue",
            ).length;
            return (
              <div key={key} className="bo-pt-category">
                <div className="bo-pt-cat-head">
                  <div
                    className={`bo-pt-cat-label bo-pt-cat-label--${colorCls}`}
                  >
                    {label}
                  </div>
                  <div className="bo-pt-cat-counts">
                    {issues > 0 && (
                      <span className="bo-pt-count-issue">
                        {issues} issue{issues > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="bo-pt-count-passed">
                      {passed}/{items.length} passed
                    </span>
                  </div>
                </div>
                <div className="bo-pt-items-grid">
                  {items.map((item) => {
                    const val = ptData[`${bus.id}_${item.id}`] || "";
                    return (
                      <button
                        key={item.id}
                        className={`bo-pt-item ${itemStateCls(val)} ${item.critical ? "bo-pt-item--critical" : ""}`}
                        onClick={() => cycleCheck(item.id)}
                      >
                        <span className="bo-pt-item-icon">{itemIcon(val)}</span>
                        <span className="bo-pt-item-label">{item.label}</span>
                        {item.critical && (
                          <span className="bo-pt-crit-dot" title="Critical" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {(totalPassed > 0 || totalIssues > 0) && (
            <div className="bo-pt-summary">
              <div className="bo-pt-sum-item bo-pt-sum--ok">
                <span className="bo-pt-sum-val">{totalPassed}</span>
                <span className="bo-pt-sum-label">Passed</span>
              </div>
              <div className="bo-pt-sum-item bo-pt-sum--issue">
                <span className="bo-pt-sum-val">{totalIssues}</span>
                <span className="bo-pt-sum-label">Issues</span>
              </div>
              <div className="bo-pt-sum-item bo-pt-sum--pending">
                <span className="bo-pt-sum-val">
                  {totalChecks - totalPassed - totalIssues}
                </span>
                <span className="bo-pt-sum-label">Pending</span>
              </div>
            </div>
          )}
        </div>

        <div className="bo-pt-footer">
          <div className="bo-pt-footer-hint">
            {criticalFailed
              ? "🚫 Resolve critical failures before clearing for departure"
              : canDepart
                ? "✅ All safety-critical checks passed"
                : "⏳ Complete all safety-critical checks first"}
          </div>
          <div className="bo-pt-footer-actions">
            <button className="bo-btn bo-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className={`bo-btn ${canDepart ? "bo-btn-green" : "bo-btn-disabled"}`}
              disabled={!canDepart}
            >
              🚌 Clear for Departure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
