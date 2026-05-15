import React, { useState } from "react";

const DL_CLASSES = ["PSV/HMV", "LMV", "HMV", "MCWG", "Transport", "Non-Transport"];

const INITIAL = {
  fullName: "",
  mobile: "",
  aadhaarNo: "",
  experience: "",
  dlNumber: "",
  dlClass: "PSV/HMV",
  licenseExpiry: "",
};

/* ── Person SVG Icon ── */
const PersonIcon = () => (
  <svg
    className="dm-modal-title-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const Field = ({ label, required, children, full }) => (
  <div className={`dm-modal-field${full ? " dm-modal-field--full" : ""}`}>
    <label className="dm-modal-label">
      {label}
      {required && <span className="dm-modal-required"> *</span>}
    </label>
    {children}
  </div>
);

const AddDriverModal = ({ open, onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  function validateStep1() {
    const err = {};
    if (!form.fullName.trim()) err.fullName = "Required";
    if (!form.mobile.trim()) err.mobile = "Required";
    return err;
  }

  function validateStep2() {
    const err = {};
    if (!form.dlNumber.trim()) err.dlNumber = "Required";
    if (!form.licenseExpiry) err.licenseExpiry = "Required";
    return err;
  }

  function handleNext() {
    const err = validateStep1();
    if (Object.keys(err).length) { setErrors(err); return; }
    setStep(2);
  }

  function handleBack() {
    setStep(1);
    setErrors({});
  }

  function handleSubmit() {
    const err = validateStep2();
    if (Object.keys(err).length) { setErrors(err); return; }
    onAdd?.(form);
    handleClose();
  }

  function handleClose() {
    onClose?.();
    setStep(1);
    setForm(INITIAL);
    setErrors({});
  }

  return (
    <div className="dm-modal-overlay" role="dialog" aria-modal="true" onClick={handleClose}>
      <div className="dm-modal-container" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="dm-modal-header">
          <div className="dm-modal-title">
            <PersonIcon />
            Add Driver &mdash; Step {step}/2
          </div>
          <button className="dm-modal-close" onClick={handleClose} aria-label="Close">
            &#x2715;
          </button>
        </div>

        <div className="dm-modal-body">
          {step === 1 ? (
            <div className="dm-modal-grid">
              <Field label="Full Name" required>
                <input
                  className={`dm-modal-input${errors.fullName ? " dm-modal-input--error" : ""}`}
                  name="fullName"
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="Driver full name"
                  autoFocus
                />
                {errors.fullName && <span className="dm-modal-error-msg">{errors.fullName}</span>}
              </Field>

              <Field label="Mobile" required>
                <input
                  className={`dm-modal-input${errors.mobile ? " dm-modal-input--error" : ""}`}
                  name="mobile"
                  value={form.mobile}
                  onChange={set("mobile")}
                  placeholder="+91 98765 43210"
                  type="tel"
                />
                {errors.mobile && <span className="dm-modal-error-msg">{errors.mobile}</span>}
              </Field>

              <Field label="Aadhaar No">
                <input
                  className="dm-modal-input"
                  name="aadhaarNo"
                  value={form.aadhaarNo}
                  onChange={set("aadhaarNo")}
                  placeholder="XXXX XXXX 1234"
                  maxLength={14}
                />
              </Field>

              <Field label="Experience (Years)">
                <input
                  className="dm-modal-input"
                  name="experience"
                  value={form.experience}
                  onChange={set("experience")}
                  placeholder="5"
                  type="number"
                  min="0"
                  max="50"
                />
              </Field>
            </div>
          ) : (
            <div className="dm-modal-grid">
              <Field label="DL Number" required>
                <input
                  className={`dm-modal-input${errors.dlNumber ? " dm-modal-input--error" : ""}`}
                  name="dlNumber"
                  value={form.dlNumber}
                  onChange={set("dlNumber")}
                  placeholder="MH01 2024 0012345"
                  autoFocus
                />
                {errors.dlNumber && <span className="dm-modal-error-msg">{errors.dlNumber}</span>}
              </Field>

              <Field label="DL Class">
                <select
                  className="dm-modal-select"
                  name="dlClass"
                  value={form.dlClass}
                  onChange={set("dlClass")}
                >
                  {DL_CLASSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="License Expiry" required full>
                <input
                  className={`dm-modal-input${errors.licenseExpiry ? " dm-modal-input--error" : ""}`}
                  name="licenseExpiry"
                  type="date"
                  value={form.licenseExpiry}
                  onChange={set("licenseExpiry")}
                />
                {errors.licenseExpiry && <span className="dm-modal-error-msg">{errors.licenseExpiry}</span>}
              </Field>
            </div>
          )}
        </div>
        
        <div className="dm-modal-footer">
          {step === 1 ? (
            <>
              <button className="dm-modal-btn dm-modal-btn--ghost" onClick={handleClose}>
                Cancel
              </button>
              <button className="dm-modal-btn dm-modal-btn--primary" onClick={handleNext}>
                Next &rarr;
              </button>
            </>
          ) : (
            <>
              <button className="dm-modal-btn dm-modal-btn--ghost" onClick={handleBack}>
                &larr; Back
              </button>
              <button className="dm-modal-btn dm-modal-btn--primary" onClick={handleSubmit}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Add Driver
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddDriverModal;
