import React from 'react';

function docStatusCls(doc) {
  if (doc.daysLeft < 0)   return 'bo-cm-doc--expired';
  if (doc.daysLeft <= 30) return 'bo-cm-doc--critical';
  if (doc.daysLeft <= 90) return 'bo-cm-doc--warn';
  return 'bo-cm-doc--valid';
}

function docLabel(doc) {
  if (doc.daysLeft < 0) return `EXPIRED ${Math.abs(doc.daysLeft)}d ago`;
  if (doc.daysLeft === 0) return 'EXPIRES TODAY';
  return `${doc.daysLeft}d left`;
}

function docIconCls(doc) {
  if (doc.daysLeft < 0)   return 'bo-cm-doc-icon--expired';
  if (doc.daysLeft <= 30) return 'bo-cm-doc-icon--critical';
  if (doc.daysLeft <= 90) return 'bo-cm-doc-icon--warn';
  return 'bo-cm-doc-icon--valid';
}

export default function BOComplianceModal({ bus, docs, onClose }) {
  const expiredCount  = docs.filter(d => d.daysLeft < 0).length;
  const criticalCount = docs.filter(d => d.daysLeft >= 0 && d.daysLeft <= 30).length;

  return (
    <div className="bo-cm-overlay" onClick={onClose}>
      <div className="bo-cm-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bo-cm-hdr">
          <div className="bo-cm-hdr-title">
            <span className="bo-cm-hdr-badge">📋</span>
            <div>
              <div className="bo-cm-title-main">Compliance Documents</div>
              <div className="bo-cm-title-sub">{bus.regNo} · {bus.make} {bus.model}</div>
            </div>
          </div>
          <button className="bo-x-btn" onClick={onClose}>✕</button>
        </div>

        <div className="bo-cm-body">

          {/* Alert banner */}
          {(expiredCount > 0 || criticalCount > 0) && (
            <div className={`bo-cm-alert ${expiredCount > 0 ? 'bo-cm-alert--expired' : 'bo-cm-alert--critical'}`}>
              <span className="bo-cm-alert-icon">{expiredCount > 0 ? '🚨' : '⚠'}</span>
              <span>
                {expiredCount > 0
                  ? `${expiredCount} document(s) have EXPIRED — vehicle may not be road-legal`
                  : `${criticalCount} document(s) expiring within 30 days — renew immediately`}
              </span>
            </div>
          )}

          {/* Doc list */}
          <div className="bo-cm-doc-list">
            {docs.length === 0 ? (
              <div className="bo-cm-empty">No compliance documents on record for this bus</div>
            ) : (
              docs.map(doc => (
                <div key={doc.id} className={`bo-cm-doc-row ${docStatusCls(doc)}`}>

                  {/* Status icon */}
                  <div className={`bo-cm-doc-icon ${docIconCls(doc)}`}>
                    {doc.daysLeft < 0 ? '✗' : doc.daysLeft <= 30 ? '!' : '✓'}
                  </div>

                  {/* Doc info */}
                  <div className="bo-cm-doc-info">
                    <div className="bo-cm-doc-head">
                      <span className="bo-cm-doc-type">{doc.docType}</span>
                      <span className={`bo-cm-doc-badge ${docStatusCls(doc)}`}>{docLabel(doc)}</span>
                    </div>
                    <div className="bo-cm-doc-meta">
                      <span className="bo-cm-doc-no">No: {doc.docNo}</span>
                      <span className="bo-cm-doc-sep">·</span>
                      <span className="bo-cm-doc-issuer">{doc.issuer}</span>
                    </div>
                    <div className="bo-cm-doc-dates">
                      <span className="bo-cm-doc-expiry">Expires: {doc.expiryDate}</span>
                      {doc.fine && (
                        <span className="bo-cm-doc-fine">Fine: {doc.fine}</span>
                      )}
                    </div>
                  </div>

                  {/* Renew action */}
                  {doc.daysLeft < 90 && (
                    <button className="bo-btn bo-btn-renew-sm">Renew →</button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer summary */}
          <div className="bo-cm-summary">
            <div className="bo-cm-sum-item bo-cm-sum--valid">
              <span className="bo-cm-sum-val">{docs.filter(d => d.daysLeft > 90).length}</span>
              <span className="bo-cm-sum-label">Valid</span>
            </div>
            <div className="bo-cm-sum-item bo-cm-sum--warn">
              <span className="bo-cm-sum-val">{docs.filter(d => d.daysLeft > 30 && d.daysLeft <= 90).length}</span>
              <span className="bo-cm-sum-label">Due Soon</span>
            </div>
            <div className="bo-cm-sum-item bo-cm-sum--critical">
              <span className="bo-cm-sum-val">{criticalCount}</span>
              <span className="bo-cm-sum-label">Critical</span>
            </div>
            <div className="bo-cm-sum-item bo-cm-sum--expired">
              <span className="bo-cm-sum-val">{expiredCount}</span>
              <span className="bo-cm-sum-label">Expired</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bo-cm-footer">
          <button className="bo-btn bo-btn-ghost" onClick={onClose}>Close</button>
          <button className="bo-btn bo-btn-blue">📤 Export Documents</button>
        </div>
      </div>
    </div>
  );
}
