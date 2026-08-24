import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addDriver,
  editDriver,
  getAllDrivers,
  getDriversDashboard,
} from "../../../redux/Driver/DriverSlice";

const DL_CLASSES = ["LMV", "HMV", "Transport", "Heavy"];

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

const AddDriverModal = ({ open, onClose, mode = "add", driver = null }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aadhaarNo: "",
    experience: "",
    dlNo: "",
    dlClass: "PSV/HMV",
    licenseExpiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        mobile: Number(formData.mobile),
        aadhaarNo: Number(formData.aadhaarNo),
        experience: Number(formData.experience) || 0,
        dlNo: formData.dlNo,
        dlClass: formData.dlClass,
        licenseExpiryDate: formData.licenseExpiryDate,
      };

      if (mode === "edit") {
        const response = await dispatch(
          editDriver({
            id: driver._id,
            data: payload,
          }),
        );
        if (response.meta?.requestStatus === "fulfilled") {
          toast.success(
            response.payload?.message || "Driver updated successfully",
          );
          await dispatch(getAllDrivers());
          handleClose();
        } else {
          toast.error(
            response.payload?.message ||
              response.error?.message ||
              "Failed to update driver",
          );

          // IMPORTANT:
          // Do NOT call handleClose() here.
          // Modal stays open.
        }
      } else {
        const response = await dispatch(addDriver(payload));

        if (response.meta?.requestStatus === "fulfilled") {
          toast.success(
            response.payload?.message || "Driver added successfully",
          );

          await dispatch(getAllDrivers());
          await dispatch(getDriversDashboard());

          handleClose();
        } else {
          toast.error(
            response.payload?.message ||
              response.error?.message ||
              "Failed to add driver",
          );

          // IMPORTANT:
          // Do NOT call handleClose() here.
          // Modal stays open.
        }
      }
    } catch (error) {
      console.error("Driver submit error:", error);

      toast.error(error?.message || "Something went wrong. Please try again.");

      // Modal stays open
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    onClose?.();
    setStep(1);
  };

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && driver) {
      setFormData({
        name: driver.name || "",
        mobile: driver.mobile || "",
        aadhaarNo: driver.aadhaarNo || "",
        experience: driver.experience || "",
        dlNo: driver.dlNo || "",
        dlClass: driver.dlClass || "PSV/HMV",
        licenseExpiryDate: driver.licenseExpiryDate
          ? driver.licenseExpiryDate.split("T")[0]
          : "",
      });
    } else {
      setFormData({
        name: "",
        mobile: "",
        aadhaarNo: "",
        experience: "",
        dlNo: "",
        dlClass: "PSV/HMV",
        licenseExpiryDate: "",
      });
    }

    setStep(1);
    setLoading(false);
  }, [open, mode, driver]);

  if (!open) return null;

  return (
    <div
      className="dm-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div className="dm-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dm-modal-header">
          <div className="dm-modal-title">
            <PersonIcon />
            {mode === "edit" ? "Edit Driver" : "Add Driver"} - Step {step}/2
          </div>

          <button
            className="dm-modal-close"
            onClick={handleClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        <div className="dm-modal-body">
          {step === 1 ? (
            <div className="dm-modal-grid">
              <Field label="Full Name" required>
                <input
                  className="dm-modal-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Driver full name"
                  autoFocus
                />
              </Field>

              <Field label="Mobile" required>
                <input
                  type="number"
                  className="dm-modal-input"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </Field>

              <Field label="Aadhaar No">
                <input
                  className="dm-modal-input"
                  name="aadhaarNo"
                  type="number"
                  value={formData.aadhaarNo}
                  onChange={handleChange}
                  placeholder="XXXX XXXX 1234"
                  maxLength={14}
                />
              </Field>

              <Field label="Experience (Years)">
                <input
                  className="dm-modal-input"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="5"
                  type="number"
                  min="0"
                  max="50"
                />
              </Field>
            </div>
          ) : (
            <div className="dm-modal-grid">
              <Field label="DL Number">
                <input
                  className="dm-modal-input"
                  name="dlNo"
                  value={formData.dlNo}
                  onChange={handleChange}
                  placeholder="MH01 2024 0012345"
                />
              </Field>

              <Field label="DL Class">
                <select
                  className="dm-modal-select"
                  name="dlClass"
                  value={formData.dlClass}
                  onChange={handleChange}
                >
                  {DL_CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="License Expiry" full>
                <input
                  className="dm-modal-input"
                  name="licenseExpiryDate"
                  type="date"
                  value={formData.licenseExpiryDate}
                  onChange={handleChange}
                />
              </Field>
            </div>
          )}
        </div>

        <div className="dm-modal-footer">
          {step === 1 ? (
            <>
              <button
                className="dm-modal-btn dm-modal-btn--ghost"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                className="dm-modal-btn dm-modal-btn--primary"
                onClick={handleNext}
              >
                Next &rarr;
              </button>
            </>
          ) : (
            <>
              <button
                className="dm-modal-btn dm-modal-btn--ghost"
                onClick={handleBack}
              >
                &larr; Back
              </button>

              <button
                className="dm-modal-btn dm-modal-btn--primary dm-btn-accent"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="dm-btn-loader" />
                    {mode === "edit" ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>

                    {mode === "edit" ? "Update Driver" : "Add Driver"}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDriverModal;
