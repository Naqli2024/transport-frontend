import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrips } from "../../../redux/Trip/TripSlice";
import { useEffect } from "react";
import { editFuelLogs, logFuelFill } from "../../../redux/Fuel/FuelSlice";
import { toast } from "react-toastify";

const Field = ({ label, required, children, full }) => (
  <div
    className={`broker-modal-field ${full ? "broker-modal-field--full" : ""}`}
  >
    <label className="broker-modal-label">
      {label}
      {required && <span className="broker-modal-required">*</span>}
    </label>
    {children}
  </div>
);

const FuelIcon = () => (
  <svg
    className="dm-modal-title-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M8 2h8v5l2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
    <path d="M10 8h4" />
    <path d="M10 12h4" />
  </svg>
);

export default function LogFuelFillModal({ open, onClose, editingFuel }) {

 const [form, setForm] = useState({
  tripId: "",
  odometer: "",
  fuelStation: "",
  location: "",
  fuelType: "",
  quantity: "",
  rate: "",
  paymentMode: "",
  billNo: "",
  remarks: "",
});

useEffect(() => {
  if (editingFuel) {
    setForm({
      tripId: editingFuel.tripId || "",
      odometer: editingFuel.odometer,
      fuelStation: editingFuel.fuelStation,
      location: editingFuel.location,
      fuelType: editingFuel.fuelType,
      quantity: editingFuel.quantity,
      rate: editingFuel.rate,
      paymentMode: editingFuel.paymentMode,
      billNo: editingFuel.billNo,
      remarks: editingFuel.remarks || "",
    });
  }
   else {
    setForm({
      tripId: "",
      odometer: "",
      fuelStation: "",
      location: "",
      fuelType: "",
      quantity: "",
      rate: "",
      paymentMode: "",
      billNo: "",
      remarks: "",
    });
  }
}, [editingFuel]);
  const dispatch = useDispatch();
  const { trips } = useSelector((state) => state.trip);
 

  useEffect(() => {
    dispatch(getAllTrips());
  }, [dispatch]);

  const trip = trips|| [];

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSave = async () => {
  try {
    const payload = {
      odometer: Number(form.odometer),
      fuelStation: form.fuelStation,
      location: form.location,
      fuelType: form.fuelType,
      quantity: Number(form.quantity),
      rate: Number(form.rate),
      paymentMode: form.paymentMode,
      billNo: form.billNo,
      remarks: form.remarks,
    };
    let response;
    if (editingFuel) {
      response = await dispatch(
        editFuelLogs({
          id: editingFuel._id,
          payload,
        })
      ).unwrap();
      toast.success(response.message);
    } else {
      response = await dispatch(
        logFuelFill({
          tripId: form.tripId,
          payload,
        })
      ).unwrap();
      toast.success(response.message);
    }
    
    onClose();
  } catch (err) {
    toast.error(err.message || err);
  }
};


  return (
    <div className="broker-modal-overlay" onClick={onClose}>
      <div
        className="broker-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="broker-modal-header">
          <div className="broker-modal-title">
            <FuelIcon />
            Log Fuel Fill
          </div>
          <button className="broker-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="broker-modal-body">
          <div className="broker-modal-grid">
            <Field label="Trip Id" >
              <select
                className="broker-modal-select"
                name="tripId"
                value={form.tripId}
                onChange={handleChange}
              >
                <option value="">Select Trip</option>
                {trip.map((trip) => (
                  <option key={trip._id} value={trip._id}>
                    {trip.tripNo}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Fuel Pump" >
              <input
                className="broker-modal-input"
                name="fuelStation"
                value={form.fuelStation}
                onChange={handleChange}
                placeholder="HPCL Salem"
              />
            </Field>
            <Field label="Litres" >
              <input
                type="number"
                className="broker-modal-input"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
            </Field>
            <Field label="Amount" >
              <input
                type="number"
                className="broker-modal-input"
                name="rate"
                value={form.rate}
                onChange={handleChange}
              />
            </Field>
            <Field label="Location" >
              <input
                className="broker-modal-input"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </Field>
            <Field label="Fuel Type">
              <select
                className="broker-modal-select"
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
              >
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="CNG">CNG</option>
              </select>
            </Field>
            <Field label="Bill No">
              <input
                className="broker-modal-input"
                name="billNo"
                value={form.billNo}
                onChange={handleChange}
              />
            </Field>
            <Field label="Odometer Reading">
              <input
                type="number"
                className="broker-modal-input"
                name="odometer"
                value={form.odometer}
                onChange={handleChange}
              />
            </Field>
            <Field label="Payment Mode">
              <select
                className="broker-modal-select"
                name="paymentMode"
                value={form.paymentMode}
                onChange={handleChange}
              >
                <option>Cash</option>
                <option>Fuel Card</option>
                <option>UPI</option>
                <option>Credit</option>
              </select>
            </Field>
            <Field label="Remarks" full>
              <input
                type="text"
                className="broker-modal-input"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
              />
            </Field>
          </div>
        </div>
        <div className="broker-modal-footer">
          <button
            className="broker-modal-btn broker-modal-btn--ghost"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="broker-modal-btn broker-modal-btn--primary"
            onClick={handleSave}
          >
            Save Fuel Log
          </button>
        </div>
      </div>
    
    </div>
  );
}
