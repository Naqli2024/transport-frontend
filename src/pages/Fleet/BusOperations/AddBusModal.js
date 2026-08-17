import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../../redux/Vehicle/VehicleSlice";
import { toast } from "react-toastify";

const BUS_TYPES = [
  "Corporate Shuttle",
  "School Bus",
  "Tourism / Charter",
  "Hospital / Staff",
  "Contract Carriage",
  "Local Stage / City",
  "Inter-City Express",
  "Event Transport",
];

const BusIcon = () => (
  <svg className="add-bus-modal-title-icon" viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="4"
      width="16"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="8" cy="19" r="1.5" fill="currentColor" />
    <circle cx="16" cy="19" r="1.5" fill="currentColor" />
    <path d="M4 10H20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Field = ({ label, required, children, full }) => (
  <div
    className={`add-bus-modal-field ${full ? "add-bus-modal-field--full" : ""}`}
  >
    <label className="add-bus-modal-label">
      {label}
      {required && <span className="add-bus-modal-required">*</span>}
    </label>

    {children}
  </div>
);

const AddBusModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    regNo: "",
    fleet: "bus",
    type: "Bus",
    tripType: BUS_TYPES[0],
    make: "",
    model: "",
    year: "",
    seatingCapacity: "",
    healthScore: "",
    fuelType: "Diesel",
    acType: "AC",
    busName: "",
    insuranceExpiryDate: "",
    fcExpiryDate: "",
    permitExpiryDate: "",
    fromLocation: "",
    toLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        regNo: formData.regNo.trim(),
        fleet: "bus",
        type: formData.type,
        tripType: formData.tripType,
        make: formData.make.trim(),
        model: formData.model.trim(),
        year: Number(formData.year),
        seatingCapacity: Number(formData.seatingCapacity),
        healthScore: Number(formData.healthScore),
        fuelType: formData.fuelType,
        acType: formData.acType,
        busName: formData.busName,
        insuranceExpiryDate: formData.insuranceExpiryDate,
        fcExpiryDate: formData.fcExpiryDate,
        permitExpiryDate: formData.permitExpiryDate,
        fromLocation: formData.fromLocation,
        toLocation: formData.toLocation,
      };
      console.log("Sending Payload:", payload);

      const response = await dispatch(addVehicle(payload)).unwrap();

      toast.success(response?.message || "Vehicle added successfully");

      onClose();
    } catch (error) {
      console.log("API Error:", error);

      toast.error(error?.message || error?.error || "Failed to add vehicle");
    }
  };

  if (!open) return null;

  return (
    <div className="add-bus-modal-overlay" onClick={onClose}>
      <div
        className="add-bus-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="add-bus-modal-header">
          <div className="add-bus-modal-title">
            <BusIcon />
            Add Bus
          </div>

          <button className="add-bus-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="add-bus-modal-body">
          <div className="add-bus-modal-grid">
            <Field label="Registration Number" required>
              <input
                className="add-bus-modal-input"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                placeholder="TN22 AB1234"
              />
            </Field>

            <Field label="Make">
              <input
                className="add-bus-modal-input"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="Tata"
              />
            </Field>

            <Field label="Model">
              <input
                className="add-bus-modal-input"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Star Bus Ultra"
              />
            </Field>

            <Field label="Manufacturing Year">
              <input
                className="add-bus-modal-input"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2022"
              />
            </Field>

            <Field label="Seating Capacity">
              <input
                className="add-bus-modal-input"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                placeholder="40"
              />
            </Field>

            <Field label="health score">
              <input
                className="add-bus-modal-input"
                name="healthScore"
                value={formData.healthScore}
                onChange={handleChange}
                placeholder="50"
              />
            </Field>

            <Field label="Fuel Type">
              <select
                className="add-bus-modal-select"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option>Diesel</option>
                <option>Petrol</option>
                <option>CNG</option>
                <option>Electric</option>
              </select>
            </Field>

            <Field label="AC Type">
              <select
                className="add-bus-modal-select"
                name="acType"
                value={formData.acType}
                onChange={handleChange}
              >
                <option>AC</option>
                <option>Non AC</option>
              </select>
            </Field>

            <Field label="Bus Name">
              <input
                className="add-bus-modal-select"
                name="busName"
                value={formData.busName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Insurance Expiry">
              <input
                className="add-bus-modal-select"
                type="date"
                name="insuranceExpiryDate"
                value={formData.insuranceExpiryDate}
                onChange={handleChange}
              />
            </Field>

            <Field label="Fitness Certificate Expiry">
              <input
                className="add-bus-modal-select"
                type="date"
                name="fcExpiryDate"
                value={formData.fcExpiryDate}
                onChange={handleChange}
              />
            </Field>

            <Field label="Permit Expiry">
              <input
                className="add-bus-modal-select"
                type="date"
                name="permitExpiryDate"
                value={formData.permitExpiryDate}
                onChange={handleChange}
              />
            </Field>

            <Field label="From Location">
              <input
                className="add-bus-modal-select"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
              />
            </Field>

            <Field label="to Location">
              <input
                className="add-bus-modal-select"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
              />
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="add-bus-modal-footer">
          <button
            className="add-bus-modal-btn add-bus-modal-btn--ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="add-bus-modal-btn add-bus-modal-btn--primary"
            onClick={handleSubmit}
          >
            Save Bus
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBusModal;
