import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBroker, editBroker, getAllBrokers, getBrokerDashboard } from "../../../redux/Broker/BrokerSlice";
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

const COMMISSION_TYPES = [
    "Percentage",
    "Fixed",
];

const PAYMENT_TERMS = [
    "Immediate",
    "7 Days",
    "15 Days",
    "30 Days",
    "45 Days",
    "60 Days",
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
    <div className={`broker-modal-field${full ? " broker-modal-field--full" : ""}`}>
        <label className="broker-modal-label">
            {label}
            {required && <span className="broker-modal-required"> *</span>}
        </label>
        {children}
    </div>
);


const AddBrokerModal = ({ open, onClose, mode = "add", broker = null }) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        mobile: "",
        email: "",
        gstNo: "",
        address: "",
        city: "",
        state: "Tamil Nadu",
        country: "",
        pincode: "",
        commissionType: "Percentage",
        commissionValue: "",
        paymentTerms: "30 Days",
    })
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

        const payload = {
            companyName: formData.companyName,
            contactPerson: formData.contactPerson,
            mobile: Number(formData.mobile),
            email: formData.email,
            gstNo: formData.gstNo,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pincode: Number(formData.pincode),
            commissionType: formData.commissionType,
            commissionValue: Number(formData.commissionValue),
            paymentTerms: formData.paymentTerms,
        };

        if (mode === "edit") {
            const response = await dispatch(editBroker({ id: broker._id, data: payload }));
            if (response?.payload) {
                toast.success(response.payload.message);
                await dispatch(getAllBrokers());
                handleClose();
            } else {
                toast.error(response?.error?.message);
            }
        } else {
            const response = await dispatch(addBroker(payload));
            if (response?.payload) {
                toast.success(response.payload.message);
                await dispatch(getAllBrokers());
                await dispatch(getBrokerDashboard());
                handleClose();
            } else {
                toast.error(response?.error?.message);
            }
        }
    };

    const handleClose = () => {
        onClose?.();
        setStep(1);
    };

    useEffect(() => {
        if (mode === "edit" && broker) {
            setFormData({
                companyName: broker.companyName || "",
                contactPerson: broker.contactPerson || "",
                mobile: broker.mobile || "",
                email: broker.email || "",
                gstNo: broker.gstNo || "",
                address: broker.address || "",
                city: broker.city || "",
                state: broker.state || "Tamil Nadu",
                country: broker.country || "",
                pincode: broker.pincode || "",
                commissionType: broker.commissionType || "Percentage",
                commissionValue: broker.commissionValue || "",
                paymentTerms: broker.paymentTerms || "30 Days",
            });
        } else {
            setFormData({
                companyName: "",
                contactPerson: "",
                mobile: "",
                email: "",
                gstNo: "",
                address: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                commissionType: "",
                commissionValue: "",
                paymentTerms: "",
            });
        }
    }, [mode, broker]);

    if (!open) return null;
    return (
        <div>
            <div
                className="broker-modal-overlay"
                role="dialog"
                aria-modal="true"
                onClick={handleClose}
            >
                <div
                    className="broker-modal-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="broker-modal-header">
                        <div className="broker-modal-title">
                            <PersonIcon />
                            {mode === "edit" ? "Edit Broker" : "Add Broker"}  - Step {step}/2
                        </div>

                        <button
                            className="broker-modal-close"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            &#x2715;
                        </button>
                    </div>

                    <div className="broker-modal-body">
                        {step === 1 ? (
                            <div className="broker-modal-grid">
                                <Field label="Company Name" required>
                                    <input
                                        className="broker-modal-input"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Company Name"
                                    />
                                </Field>
                                <Field label="Contact Person" required>
                                    <input
                                        className="broker-modal-input"
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                        placeholder="Contact Person"
                                    />
                                </Field>
                                <Field label="Mobile" required>
                                    <input
                                        className="broker-modal-input"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                    />
                                </Field>
                                <Field label="Email" required>
                                    <input
                                        className="broker-modal-input"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </Field>
                                <Field label="GST No">
                                    <input
                                        className="broker-modal-input"
                                        name="gstNo"
                                        value={formData.gstNo}
                                        onChange={handleChange}
                                        placeholder="GST Number"
                                    />
                                </Field>
                                <Field label="Commission Type" required>
                                    <select
                                        className="broker-modal-select"
                                        name="commissionType"
                                        value={formData.commissionType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Commission Type</option>
                                        {COMMISSION_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Commission Value" required>
                                    <input
                                        className="broker-modal-input"
                                        type="number"
                                        name="commissionValue"
                                        value={formData.commissionValue}
                                        onChange={handleChange}
                                        placeholder="Commission Value"
                                    />
                                </Field>

                                <Field label="Payment Terms" required>
                                    <select
                                        className="broker-modal-select"
                                        name="paymentTerms"
                                        value={formData.paymentTerms}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Payment Terms</option>
                                        {PAYMENT_TERMS.map((term) => (
                                            <option key={term} value={term}>
                                                {term}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                            </div>
                        ) : (
                            <div className="broker-modal-grid">
                                <Field label="Address" full>
                                    <textarea
                                        className="broker-modal-input"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Address"
                                    />
                                </Field>
                                <Field label="State" required>
                                    <select
                                        className="broker-modal-select"
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
                                        className="broker-modal-input"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                    />
                                </Field>
                                <Field label="Country">
                                    <input
                                        className="broker-modal-input"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Country"
                                    />
                                </Field>

                                <Field label="Pincode">
                                    <input
                                        className="broker-modal-input"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Pincode"
                                    />
                                </Field>

                            </div>
                        )}
                    </div>

                    <div className="broker-modal-footer">
                        {step === 1 ? (
                            <>
                                <button
                                    className="broker-modal-btn broker-modal-btn--ghost"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="broker-modal-btn broker-modal-btn--primary"
                                    onClick={handleNext}
                                >
                                    Next &rarr;
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="broker-modal-btn broker-modal-btn--ghost"
                                    onClick={handleBack}
                                >
                                    &larr; Back
                                </button>

                                <button
                                    className="broker-modal-btn broker-modal-btn--primary"
                                    onClick={handleSubmit}
                                >
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

                                    {mode === "edit" ? "Update Broker" : "Add Broker"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBrokerModal;