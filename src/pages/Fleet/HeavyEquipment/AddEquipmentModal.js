import React, { useEffect, useState } from "react";
import { addVehicle, editVehicle, getAllVehicles, getEquipmentDashboard } from "../../../redux/Vehicle/VehicleSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const EQ_TYPES = [{ id: 'backhoe', label: 'Backhoe', shortLabel: 'Backhoe', icon: '🟡', avgRate: 900 },
{ id: 'excavator', label: 'Excavator', shortLabel: 'Excavator', icon: '🦾', avgRate: 1400 },
{ id: 'mini', label: 'Mini', shortLabel: 'Mini', icon: '🔶', avgRate: 600 },
{ id: 'roller', label: 'Vibratory', shortLabel: 'Vibratory', icon: '🔵', avgRate: 700 },
{ id: 'crane', label: 'Crane', shortLabel: 'Crane', icon: '🏗️', avgRate: 3500 },
{ id: 'telehandler', label: 'Telehandler', shortLabel: 'Telehandler', icon: '🔧', avgRate: 1100 },
{ id: 'grader', label: 'Grader', shortLabel: 'Grader', icon: '⚙️', avgRate: 1600 },
{ id: 'concrete', label: 'Concrete', shortLabel: 'Concrete', icon: '🔘', avgRate: 450 },
{ id: 'transit', label: 'Transit', shortLabel: 'Transit', icon: '🚌', avgRate: 2800 },];

const MAKES = [
  "JCB",
  "CAT",
  "SANY",
  "Komatsu",
  "Hitachi",
  "Volvo CE",
  "Ashok Leyland",
  "BharatBenz",
];

const YEARS = Array.from(
  { length: 15 },
  (_, i) => new Date().getFullYear() - i
);

const OWNERSHIPS = [
  "Company",
  "Owned",
  "Leased",
  "Financed",
  "Rented",
];

export default function AddEquipmentModal({
  onClose,
  vehicle,
  isEdit

}) {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    regNo: vehicle?.regNo || "",

    fleet: vehicle?.fleet || "equipment",

    type: vehicle?.type || "Excavator",

    status: vehicle?.status || "Available",

    make: vehicle?.make || "",

    model: vehicle?.model || "",

    year:
      vehicle?.year || new Date().getFullYear(),

    ownerShip:
      vehicle?.ownerShip || "Company",

    purchaseCost:
      vehicle?.purchaseCost || "",

    serialNo:
      vehicle?.serialNo || "",

    hourlyRate:
      vehicle?.hourlyRate || "",

    minShiftHrs:
      vehicle?.minShiftHrs || "",

    siteName:
      vehicle?.siteName || "",

    clientName:
      vehicle?.clientName || "",

    currentEngineHours:
      vehicle?.currentEngineHours || "",

    lastPmHours:
      vehicle?.lastPmHours || "",

    pmIntervalHours:
      vehicle?.pmIntervalHours || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (id) => {
    const selected =
      EQ_TYPES.find((t) => t.id === id);

    setFormData((prev) => ({
      ...prev,
      type: selected?.label || "",
      hourlyRate:
        selected?.avgRate || prev.hourlyRate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      regNo: formData.regNo,
      fleet: "equipment",
      type: formData.type,
      status: formData.siteName ? "Active" : "Available",
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      ownerShip: formData.ownerShip,
      purchaseCost: Number(formData.purchaseCost) || 0,
      serialNo: formData.serialNo,
      hourlyRate: Number(formData.hourlyRate) || 0,
      minShiftHrs: Number(formData.minShiftHrs) || 0,
      siteName: formData.siteName,
      clientName: formData.clientName,
      currentEngineHours: Number(formData.currentEngineHours) || 0,
      lastPmHours: Number(formData.lastPmHours) || 0,
      pmIntervalHours: Number(formData.pmIntervalHours) || 250,
    };

    if (isEdit && vehicle) {
      const response = await dispatch(
        editVehicle({
          userId: vehicle._id,
          payload,
        })
      );

      if (response?.payload) {
        toast.success(response.payload.message);
        await dispatch(getAllVehicles());
        onClose();
      } else {
        toast.error(response?.error?.message);
      }
    } else {
      const response = await dispatch(addVehicle(payload));

      if (response?.payload) {
        toast.success(response.payload.message);
        await dispatch(getAllVehicles());
        await dispatch(getEquipmentDashboard());
        onClose();
      } else {
        toast.error(response?.error?.message);
      }
    }
  };

  useEffect(() => {
  if (isEdit && vehicle) {
    setFormData({
      regNo: vehicle.regNo || "",
      type: vehicle.type || "",
      make: vehicle.make || "",
      model: vehicle.model || "",
      year: vehicle.year || "",
      purchaseCost: vehicle.purchaseCost || "",
      serialNo: vehicle.serialNo || "",
      hourlyRate: vehicle.hourlyRate || "",
      minShiftHrs: vehicle.minShiftHrs || "",
      siteName: vehicle.siteName || "",
      clientName: vehicle.clientName || "",
      currentEngineHours: vehicle.currentEngineHours || "",
      lastPmHours: vehicle.lastPmHours || "",
      pmIntervalHours: vehicle.pmIntervalHours || "",
      ownerShip: vehicle.ownerShip||"",
    });
  } else {
    setFormData({
      regNo: "",
      type: "",
      make: "",
      model: "",
      year: "",
      purchaseCost: "",
      serialNo: "",
      hourlyRate: "",
      minShiftHrs: "",
      siteName: "",
      clientName: "",
      currentEngineHours: "",
      lastPmHours: "",
      pmIntervalHours: "",
      });
  }
}, [isEdit, vehicle]);
  return (
    <div
      className="he-add-overlay"
      onClick={onClose}
    >
      <div
        className="he-add-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="he-add-hdr">
          <div className="he-add-title">
            <span className="he-add-title-icon">
              🏗️
            </span>

            {vehicle
              ? "Edit Equipment"
              : "Add Equipment"}{" "}
            — Step {step}/2
          </div>

          <button
            className="he-x-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="he-add-stepper">
          <div
            className={`he-add-dot ${step >= 1 ? "he-dot-on" : ""
              }`}
          >
            1
          </div>

          <div
            className={`he-add-line ${step === 2
              ? "he-line-done"
              : ""
              }`}
          />

          <div
            className={`he-add-dot ${step >= 2 ? "he-dot-on" : ""
              }`}
          >
            2
          </div>
        </div>

        <div className="he-add-body">
          {/* STEP 1 */}

          {step === 1 && (
            <>
              <div className="he-type-grid">
                {EQ_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`he-type-card ${formData.type === t.label
                      ? "he-type-sel"
                      : ""
                      }`}
                    onClick={() =>
                      handleTypeChange(t.id)
                    }
                  >
                    <span className="he-type-icon">
                      {t.icon}
                    </span>

                    <span className="he-type-label">
                      {t.shortLabel}
                    </span>
                  </button>
                ))}
              </div>

              <div className="he-frow he-fr3">
                <div className="he-fgroup">
                  <label className="he-flabel">
                    REGISTRATION NO *
                  </label>

                  <input
                    className="he-finput he-mono"
                    placeholder="TN58AB1234"
                    name="regNo"
                    value={formData.regNo}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        regNo:
                          e.target.value.toUpperCase(),
                      }))
                    }
                  />
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    MAKE
                  </label>

                  <select
                    className="he-finput"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                  >
                    {MAKES.map((m) => (
                      <option
                        key={m}
                        value={m}
                      >
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    MODEL
                  </label>

                  <input
                    className="he-finput"
                    placeholder="AVTR 4825"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="he-frow he-fr3">
                <div className="he-fgroup">
                  <label className="he-flabel">
                    YEAR
                  </label>

                  <select
                    className="he-finput"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  >
                    {YEARS.map((y) => (
                      <option
                        key={y}
                        value={y}
                      >
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    OWNERSHIP
                  </label>

                  <select
                    className="he-finput"
                    name="ownerShip"
                    value={formData.ownerShip}
                    onChange={handleChange}
                  >
                    {OWNERSHIPS.map((o) => (
                      <option
                        key={o}
                        value={o}
                      >
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    PURCHASE COST
                  </label>

                  <input
                    className="he-finput"
                    type="number"
                    placeholder="4200000"
                    name="purchaseCost"
                    value={formData.purchaseCost}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <>
              <div className="he-frow he-fr2">
                <div className="he-fgroup">
                  <label className="he-flabel">
                    SERIAL NO
                  </label>

                  <input
                    className="he-finput"
                    placeholder="JCB-EXC-2022-001"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    CURRENT ENGINE HOURS
                  </label>

                  <input
                    className="he-finput"
                    type="number"
                    placeholder="2841"
                    name="currentEngineHours"
                    value={
                      formData.currentEngineHours
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="he-frow he-fr3">
                <div className="he-fgroup">
                  <label className="he-flabel">
                    HOURLY RATE (₹)
                  </label>

                  <input
                    className="he-finput"
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                  />
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    MIN SHIFT HRS
                  </label>

                  <input
                    className="he-finput"
                    type="number"
                    name="minShiftHrs"
                    value={formData.minShiftHrs}
                    onChange={handleChange}
                  />
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    PM INTERVAL HOURS
                  </label>

                  <input
                    className="he-finput"
                    type="number"
                    name="pmIntervalHours"
                    value={
                      formData.pmIntervalHours
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="he-frow he-fr2">
                <div className="he-fgroup">
                  <label className="he-flabel">
                    LAST PM HOURS
                  </label>

                  <input
                    className="he-finput"
                    type="number"
                    name="lastPmHours"
                    value={formData.lastPmHours}
                    onChange={handleChange}
                  />
                </div>

                <div className="he-fgroup">
                  <label className="he-flabel">
                    SITE NAME
                  </label>

                  <input
                    className="he-finput"
                    placeholder="Madurai Bypass NH7"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="he-frow he-fr1">
                <div className="he-fgroup">
                  <label className="he-flabel">
                    CLIENT NAME
                  </label>

                  <input
                    className="he-finput"
                    placeholder="ABC Infra"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {formData.regNo && (
                <div className="he-add-summary">
                  <span className="he-add-sum-icon">
                    🏗️
                  </span>

                  <div>
                    <div className="he-add-sum-name">
                      {formData.make}{" "}
                      {formData.model}
                    </div>

                    <div className="he-add-sum-meta">
                      {formData.regNo} ·{" "}
                      {formData.year} · ₹
                      {Number(
                        formData.hourlyRate || 0
                      ).toLocaleString()}
                      /hr
                    </div>
                  </div>

                  <span
                    className={`he-status-badge ${formData.siteName
                      ? "he-badge-green"
                      : "he-badge-blue"
                      }`}
                  >
                    {formData.siteName
                      ? "📍 On Site"
                      : "📦 Available"}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="he-add-footer">
          {step > 1 && (
            <button
              className="he-btn he-btn-ghost"
              onClick={() =>
                setStep(step - 1)
              }
            >
              ← Back
            </button>
          )}

          {step < 2 ? (
            <button
              className="he-btn he-btn-orange"
              onClick={() =>
                setStep(step + 1)
              }
            >
              Next →
            </button>
          ) : (
            <button
              className="he-btn he-btn-orange"
              onClick={handleSubmit}
            >
              {vehicle
                ? "✓ Update Equipment"
                : "✓ Add Equipment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}