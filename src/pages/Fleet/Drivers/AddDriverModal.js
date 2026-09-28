import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addDriver,
  editDriver,
  getAllDrivers,
  getDriversDashboard,
} from "../../../redux/Driver/DriverSlice";
import { IoCheckmark } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  <div
    className={`customer-modal-field${full ? " customer-modal-field--full" : ""}`}
  >
    <label className="customer-modal-label">
      {label}
      {required && <span className="customer-modal-required"> *</span>}
    </label>
    {children}
  </div>
);

const AddDriverModal = ({ open, onClose, mode = "add", driver = null }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    mobile: "",
    aadhaarNo: "",
    experience: "",
    dlNo: "",
    dlClass: "",
    licenseExpiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!formData.name?.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.mobile) {
      toast.error("Mobile number is required");
      return;
    }

    if (!formData.dlNo?.trim()) {
      toast.error("DL Number is required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        userName: formData.userName,
        password: formData.password,
        name: formData.name,
        mobile: formData.mobile,
        aadhaarNo: Number(formData.aadhaarNo),
        experience: Number(formData.experience) || 0,
        dlNo: formData.dlNo,
        ...(formData.dlClass ? { dlClass: formData.dlClass } : {}),
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
          toast.success(response.payload?.message);
          await dispatch(getAllDrivers());
          handleClose();
        } else {
          toast.error(response.payload?.message);
        }
      } else {
        const response = await dispatch(addDriver(payload));

        if (response.meta?.requestStatus === "fulfilled") {
          toast.success(response.payload?.message);

          await dispatch(getAllDrivers());
          await dispatch(getDriversDashboard());
          setFormData({
            userName: "",
            password: "",
            name: "",
            mobile: "",
            aadhaarNo: "",
            experience: "",
            dlNo: "",
            dlClass: "",
            licenseExpiryDate: "",
          });
          handleClose();
        } else {
          toast.error(response.payload?.message);
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && driver) {
      setFormData({
        userName: driver.userName || "",
        name: driver.name || "",
        mobile: driver.mobile || "",
        aadhaarNo: driver.aadhaarNo || "",
        experience: driver.experience || "",
        dlNo: driver.dlNo || "",
        dlClass: driver.dlClass || "",
        licenseExpiryDate: driver.licenseExpiryDate
          ? driver.licenseExpiryDate.split("T")[0]
          : "",
      });
    } else {
      setFormData({
        userName: "",
        password: "",
        name: "",
        mobile: "",
        aadhaarNo: "",
        experience: "",
        dlNo: "",
        dlClass: "",
        licenseExpiryDate: "",
      });
    }

    setLoading(false);
  }, [open, mode, driver]);

  if (!open) return null;

  return (
    <div className="dm-modal-overlay" role="dialog" aria-modal="true">
      <div className="dm-modal-container">
        {/* Header */}
        <div className="dm-modal-header">
          <div className="dm-modal-title">
            <PersonIcon />
            {mode === "edit" ? "Edit Driver" : "Add Driver"}
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
          <div className="dm-modal-grid">
            <Field label="UserName" required>
              <input
                className="dm-modal-input"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                autoFocus
                autoComplete="off"
              />
            </Field>

            <Field label="Password" required>
              <div className="dm-password-wrapper">
                <input
                  className="dm-modal-input dm-password-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="dm-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>{" "}
              </div>
            </Field>

            <Field label="Full Name" required>
              <input
                className="dm-modal-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Driver full name"
              />
            </Field>

            <Field label="Mobile No" required>
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
            <Field label="DL Number" required>
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
                <option value={""} disabled>
                  Select
                </option>
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
        </div>

        <div className="dm-modal-footer">
          <>
            <button
              className="dm-modal-btn dm-modal-btn--ghost"
              onClick={handleClose}
            >
              Cancel
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
                  <IoCheckmark size={16} />
                  {mode === "edit" ? "Update Driver" : "Add Driver"}
                </>
              )}
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default AddDriverModal;
