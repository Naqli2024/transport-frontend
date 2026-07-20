import React, { useState } from "react";
import { addVehicle, editVehicle } from "../../../redux/Vehicle/VehicleSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const MAKES = [
  "Tata",
  "Ashok Leyland",
  "Mahindra",
  "Eicher",
  "BharatBenz",
  "Volvo",
  "MAN",
  "Force",
];

const YEARS = Array.from(
  { length: 20 },
  (_, i) => new Date().getFullYear() - i,
);

const AXLES = ["4x2", "6x2", "6x4", "8x2", "8x4", "10x4", "Trailer"];

const OWNERSHIPS = ["Owned", "Leased", "Hired", "Contract"];

const PERMITS = [
  "National Permit",
  "State Permit",
  "All India Tourist Permit",
  "Contract Carriage",
  "Goods Carriage",
];

const TYPE = ["Truck", "Trailer", "LCV", "Container", "Tanker", "Mini Truck"];

const HEALTH = ["Excellent", "Good", "Average", "Critical"];

const TOLLTAG = ["Yes", "No"];

export default function AddVehicleModal({ onClose, vehicle }) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    regNo: vehicle?.regNo,
    fleet: "vehicle",
    type: vehicle?.type,
    make: vehicle?.make,
    model: vehicle?.model,
    year: vehicle?.year || new Date().getFullYear(),
    engineNo: vehicle?.engineNo,
    chassisNo: vehicle?.chassisNo,
    axle: vehicle?.axle,
    gvw: vehicle?.gvw,
    currentKm: vehicle?.currentKm,
    healthStatus: vehicle?.healthStatus,
    ownerShip: vehicle?.ownerShip,
    insuranceExpiryDate: vehicle?.insuranceExpiryDate,
    rcBookExpiryDate: vehicle?.rcBookExpiryDate,
    fcExpiryDate: vehicle?.fcExpiryDate,
    taxExpiryDate: vehicle?.taxExpiryDate,
    permitExpiryDate: vehicle?.permitExpiryDate,
    pollutionExpiryDate: vehicle?.pollutionExpiryDate,
    permitType: vehicle?.permitType,
    purchaseCost: vehicle?.purchaseCost,
    tollTagAvailable: vehicle?.tollTagAvailable,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    if (vehicle) {
      response = await dispatch(
        editVehicle({
          userId: vehicle._id,
          payload: formData,
        })
      );

      if (response?.payload) {
        toast.success(response.payload.message);
        onClose();
      } else {
        toast.error(response?.error?.message);
      }
    } else {
      response = await dispatch(addVehicle(formData));

      if (response?.payload) {
        toast.success(response.payload.message);
        onClose();
      } else {
        toast.error(response?.error?.message);
      }
    }
  };

  return (
    <div className="vm-modal-overlay" onClick={onClose}>
      <div className="vm-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="vm-modal-header">
          <div className="vm-modal-title">
            <span className="vm-modal-emoji">🚛</span>
            {vehicle ? "Edit Vehicle" : "Add Vehicle"}
          </div>
          <button className="vm-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div>
          <div className="vm-modal-body">
            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">REG NO</label>

                <input
                  className={`vm-form-input ${errors.regNo ? "vm-input-error" : ""
                    }`}
                  placeholder="TN69GH1234"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  autoFocus
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">TYPE</label>

                <select
                  className="vm-form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {TYPE.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">MAKE</label>

                <select
                  className="vm-form-select"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                >
                  {MAKES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">MODEL</label>

                <input
                  className="vm-form-input"
                  placeholder="LPT 2518"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">YEAR</label>

                <select
                  className="vm-form-select"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">ENGINE NO</label>

                <input
                  className="vm-form-input"
                  placeholder="Engine No"
                  name="engineNo"
                  value={formData.engineNo}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">CHASSIS NO</label>

                <input
                  className="vm-form-input"
                  placeholder="Chassis No"
                  name="chassisNo"
                  value={formData.chassisNo}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">AXLE</label>

                <select
                  className="vm-form-select"
                  name="axle"
                  value={formData.axle}
                  onChange={handleChange}
                >
                  {AXLES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">GVW (T)</label>
                <input
                  className="vm-form-input"
                  type="number"
                  min={1}
                  placeholder="25"
                  name="gvw"
                  value={formData.gvw}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">CURRENT KM</label>

                <input
                  className="vm-form-input"
                  type="number"
                  min={1}
                  placeholder="25000"
                  name="currentKm"
                  value={formData.currentKm}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">HEALTH STATUS</label>

                <select
                  className="vm-form-select"
                  name="healthStatus"
                  value={formData.healthStatus}
                  onChange={handleChange}
                >
                  {HEALTH.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">OWNERSHIP</label>

                <select
                  className="vm-form-select"
                  name="ownerShip"
                  value={formData.ownerShip}
                  onChange={handleChange}
                >
                  {OWNERSHIPS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">INSURANCE EXPIRY</label>
                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="insuranceExpiryDate"
                  value={formData.insuranceExpiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">RC BOOK EXPIRY</label>

                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="rcBookExpiryDate"
                  value={formData.rcBookExpiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">FC EXPIRY</label>

                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="fcExpiryDate"
                  value={formData.fcExpiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">TAX EXPIRY</label>

                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="taxExpiryDate"
                  value={formData.taxExpiryDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">PERMIT EXPIRY</label>

                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="permitExpiryDate"
                  value={formData.permitExpiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">POLLUTION EXPIRY</label>

                <input
                  className="vm-form-input vm-input-date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="pollutionExpiryDate"
                  value={formData.pollutionExpiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">PERMIT TYPE</label>

                <select
                  className="vm-form-select"
                  name="permitType"
                  value={formData.permitType}
                  onChange={handleChange}
                >
                  {PERMITS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="vm-form-group">
                <label className="vm-form-label">PURCHASE COST</label>

                <input
                  className="vm-form-input"
                  type="number"
                  min={0}
                  placeholder="0"
                  name="purchaseCost"
                  value={formData.purchaseCost}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="vm-form-row vm-cols-4">
              <div className="vm-form-group">
                <label className="vm-form-label">TOLL TAG</label>

                <select
                  className="vm-form-select"
                  value={formData.tollTagAvailable ? "Yes" : "No"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tollTagAvailable: e.target.value === "Yes",
                    }))
                  }
                >
                  {TOLLTAG.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="vm-modal-footer">
            <button
              className="vm-btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="vm-btn-accent"
              onClick={handleSubmit}
            >
              {vehicle
                ? "✓ Update Vehicle"
                : "✓ Add Vehicle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
