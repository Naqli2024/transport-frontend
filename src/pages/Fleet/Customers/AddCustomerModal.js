import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  editCustomer,
  getAllCustomers,
  getCustomerDashboard,
} from "../../../redux/Customer/CustomerSlice";
import { toast } from "react-toastify";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

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

const AddCustomerModal = ({ open, onClose, mode = "add", customer = null }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    gstNo: "",
    billingAddress: "",
    city: "",
    state: "Tamil Nadu",
    country: "",
    pincode: "",
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
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: Number(formData.mobile),
        email: formData.email,
        gstNo: formData.gstNo,
        billingAddress: formData.billingAddress,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: Number(formData.pincode),
      };
      if (mode === "edit") {
        const response = await dispatch(
          editCustomer({
            id: customer._id,
            data: payload,
          }),
        );
        if (response.meta?.requestStatus === "fulfilled") {
          toast.success(
            response.payload?.message || "Customer updated successfully",
          );
          await dispatch(getAllCustomers());
          handleClose();
        } else {
          toast.error(
            response.payload?.message ||
              response.error?.message ||
              "Failed to update customer",
          );
        }
      } else {
        const response = await dispatch(addCustomer(payload));

        if (response.meta?.requestStatus === "fulfilled") {
          toast.success(
            response.payload?.message || "Customer added successfully",
          );
          await dispatch(getAllCustomers());
          await dispatch(getCustomerDashboard());
          handleClose();
        } else {
          toast.error(
            response.payload?.message ||
              response.error?.message ||
              "Failed to add customer",
          );
        }
      }
    } catch (error) {
      console.error("Customer submit error:", error);

      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    onClose?.();
    setStep(1);

    setFormData({
      companyName: "",
      contactPerson: "",
      mobile: "",
      email: "",
      gstNo: "",
      billingAddress: "",
      city: "",
      state: "Tamil Nadu",
      country: "",
      pincode: "",
    });
  };

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && customer) {
      setFormData({
        companyName: customer.companyName || "",
        contactPerson: customer.contactPerson || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        gstNo: customer.gstNo || "",
        billingAddress: customer.billingAddress || "",
        city: customer.city || "",
        state: customer.state || "Tamil Nadu",
        country: customer.country || "",
        pincode: customer.pincode || "",
      });
    } else {
      // ADD CUSTOMER → always start with empty form
      setFormData({
        companyName: "",
        contactPerson: "",
        mobile: "",
        email: "",
        gstNo: "",
        billingAddress: "",
        city: "",
        state: "Tamil Nadu",
        country: "",
        pincode: "",
      });
    }

    setStep(1);
  }, [open, mode, customer]);

  if (!open) return null;
  return (
    <div>
      <div
        className="customer-modal-overlay"
        role="dialog"
        aria-modal="true"
        onClick={handleClose}
      >
        <div
          className="customer-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="customer-modal-header">
            <div className="customer-modal-title">
              <PersonIcon />
              {mode === "edit" ? "Edit Customer" : "Add Customer"} — Step {step}
              /2
            </div>

            <button
              className="customer-modal-close"
              onClick={handleClose}
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>

          <div className="customer-modal-body">
            {step === 1 ? (
              <div className="customer-modal-grid">
                <Field label="Company Name" required>
                  <input
                    className="customer-modal-input"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                </Field>
                <Field label="Contact Person" required>
                  <input
                    className="customer-modal-input"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Contact Person"
                  />
                </Field>
                <Field label="Mobile" required>
                  <input
                    className="customer-modal-input"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    className="customer-modal-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </Field>
                <Field label="GST No">
                  <input
                    className="customer-modal-input"
                    name="gstNo"
                    value={formData.gstNo}
                    onChange={handleChange}
                    placeholder="GST Number"
                  />
                </Field>
              </div>
            ) : (
              <div className="customer-modal-grid">
                <Field label="Billing Address" full>
                  <textarea
                    className="customer-modal-input"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Billing Address"
                  />
                </Field>
                <Field label="State" required>
                  <select
                    className="customer-modal-select"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    {STATES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="City">
                  <input
                    className="customer-modal-input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </Field>
                <Field label="Country">
                  <input
                    className="customer-modal-input"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </Field>

                <Field label="Pincode">
                  <input
                    className="customer-modal-input"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                  />
                </Field>
              </div>
            )}
          </div>

          <div className="customer-modal-footer">
            {step === 1 ? (
              <>
                <button
                  className="customer-modal-btn customer-modal-btn--ghost"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  className="customer-modal-btn customer-modal-btn--primary"
                  onClick={handleNext}
                >
                  Next &rarr;
                </button>
              </>
            ) : (
              <>
                <button
                  className="customer-modal-btn customer-modal-btn--ghost"
                  onClick={handleBack}
                >
                  &larr; Back
                </button>

                <button
                  className="customer-modal-btn customer-modal-btn--primary customer-btn-accent"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="customer-btn-loader" />
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

                      {mode === "edit" ? "Update Customer" : "Add Customer"}
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
