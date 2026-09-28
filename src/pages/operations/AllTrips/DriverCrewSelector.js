import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getAllDrivers } from "../../../redux/Driver/DriverSlice";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const DriverCrewSelector = ({ form, setForm, isEdit }) => {
  const [drivers, setDrivers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const result = await dispatch(getAllDrivers()).unwrap();
        setDrivers(result?.data || []);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchDrivers();
  }, [dispatch]);

  const updateLeg = (index, field, value) => {
    setForm((prev) => {
      const legs = [...prev.journeyLegs];
      legs[index] = { ...legs[index], [field]: value };
      return { ...prev, journeyLegs: legs };
    });
  };

  const updateLegAdvance = (legIdx, advIdx, field, value) => {
    setForm((prev) => {
      const legs = [...prev.journeyLegs];
      const leg = legs[legIdx];
      const advanceList = leg.driverAdvance?.length
        ? [...leg.driverAdvance]
        : [{ date: "", amount: "" }];
      advanceList[advIdx] = { ...advanceList[advIdx], [field]: value };
      legs[legIdx] = { ...leg, driverAdvance: advanceList };
      return { ...prev, journeyLegs: legs };
    });
  };

  const addLegAdvance = (legIdx) => {
    setForm((prev) => {
      const legs = [...prev.journeyLegs];
      const leg = legs[legIdx];
      const advanceList = leg.driverAdvance?.length ? leg.driverAdvance : [];
      legs[legIdx] = {
        ...leg,
        driverAdvance: [...advanceList, { date: "", amount: "" }],
      };
      return { ...prev, journeyLegs: legs };
    });
  };

  const removeLegAdvance = (legIdx, advIdx) => {
    setForm((prev) => {
      const legs = [...prev.journeyLegs];
      const leg = legs[legIdx];
      const advanceList = leg.driverAdvance || [];
      if (advanceList.length === 1) return prev;
      legs[legIdx] = {
        ...leg,
        driverAdvance: advanceList.filter((_, i) => i !== advIdx),
      };
      return { ...prev, journeyLegs: legs };
    });
  };

  const isDriverTakenElsewhere = (driverId, currentLegIdx) =>
    form.journeyLegs.some(
      (leg, i) =>
        i !== currentLegIdx &&
        (leg.driver1 === driverId || leg.driver2 === driverId)
    );

  return (
    <div>
      <div className="driver-crew-title">👤 Driver Assignment</div>
      <div className="driver-crew-desc">
        Assign a primary driver and optional second driver for each leg of
        the journey.
      </div>

      {form.journeyLegs.map((leg, legIdx) => {
        const driver1Options = drivers.filter((driver) => {
          if (driver._id === leg.driver2) return false;
          if (isDriverTakenElsewhere(driver._id, legIdx)) return false;
          if (driver._id === leg.driver1) return true;
          return driver.availableStatus === "Available";
        });

        const driver2Options = drivers.filter((driver) => {
          if (driver._id === leg.driver1) return false;
          if (isDriverTakenElsewhere(driver._id, legIdx)) return false;
          if (driver._id === leg.driver2) return true;
          return driver.availableStatus === "Available";
        });

        const selectedDriver1 = drivers.find((d) => d._id === leg.driver1);
        const selectedDriver2 = drivers.find((d) => d._id === leg.driver2);

        const advanceList = leg.driverAdvance?.length
          ? leg.driverAdvance
          : [{ date: "", amount: "" }];

        return (
          <div
            key={legIdx}
            className="journey-type-leg-block"
            style={{ marginBottom: "20px" }}
          >
            {form.journeyLegs.length > 1 && (
              <div
                className="journey-type-leg-header"
                style={{ color: "var(--accent)", marginBottom: "10px" }}
              >
                LEG {legIdx + 1} — {leg.from || "From Location"} → {leg.to || "To Location"}
              </div>
            )}

            <div className="driver-crew-container">
              <div className="driver-crew-card">
                <div className="driver-crew-card-header">
                  <div className="driver-crew-card-title">
                    🚛 Driver 1 — Primary (Mandatory)
                  </div>

                  {selectedDriver1 && (
                    <span
                      className="control-badge driver-crew-badge-bg"
                      style={{ fontSize: "10px" }}
                    >
                      Selected: {selectedDriver1.name}
                    </span>
                  )}
                </div>

                <div className="driver-crew-card-details">
                  {driver1Options.map((driver) => {
                    const isSelected = leg.driver1 === driver._id;

                    return (
                      <div
                        key={driver._id}
                        onClick={() => updateLeg(legIdx, "driver1", driver._id)}
                        className="driver-crew-card-item"
                        style={{
                          border: `2px solid ${
                            isSelected ? "var(--accent)" : "var(--border)"
                          }`,
                          background: isSelected
                            ? "var(--accentGlow)"
                            : "var(--bgCard)",
                        }}
                      >
                        <div className="driver-crew-driver-info">
                          <div
                            className="driver-crew-avatar"
                            style={{
                              background: isSelected
                                ? "var(--accent)33"
                                : "var(--bgPanel)",
                              border: `2px solid ${
                                isSelected ? "var(--accent)" : "var(--border)"
                              }`,
                            }}
                          >
                            {driver.name?.[0]?.toUpperCase() || "D"}
                          </div>

                          <div>
                            <div className="driver-crew-driver-name">
                              {driver.name}
                            </div>

                            <div className="driver-crew-driver-meta">
                              {driver.mobile} · DL {driver.dlNo} · Exp:{" "}
                              {driver.experience} yrs
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="driver-crew-card">
                <div className="driver-crew-card-header">
                  <div className="driver-crew-card-title">
                    🔄 Driver 2 — Second Driver / Co-Driver
                  </div>

                  {selectedDriver2 && (
                    <span
                      className="control-badge driver-crew-badge-bg"
                      style={{ fontSize: "10px" }}
                    >
                      Selected: {selectedDriver2.name}
                    </span>
                  )}
                </div>

                <div className="driver-crew-card-details">
                  {driver2Options.map((driver) => {
                    const isSelected = leg.driver2 === driver._id;

                    return (
                      <div
                        key={driver._id}
                        onClick={() => updateLeg(legIdx, "driver2", driver._id)}
                        className="driver-crew-card-item"
                        style={{
                          border: `2px solid ${
                            isSelected ? "var(--accent)" : "var(--border)"
                          }`,
                          background: isSelected
                            ? "var(--accentGlow)"
                            : "var(--bgCard)",
                        }}
                      >
                        <div className="driver-crew-driver-info">
                          <div
                            className="driver-crew-avatar"
                            style={{
                              background: isSelected
                                ? "var(--accent)33"
                                : "var(--bgPanel)",
                              border: `2px solid ${
                                isSelected ? "var(--accent)" : "var(--border)"
                              }`,
                            }}
                          >
                            {driver.name?.[0]?.toUpperCase() || "D"}
                          </div>

                          <div>
                            <div className="driver-crew-driver-name">
                              {driver.name}
                            </div>

                            <div className="driver-crew-driver-meta">
                              {driver.mobile} · DL {driver.dlNo} · Exp:{" "}
                              {driver.experience} yrs
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-5">
                <label className="driver-screw-flabel">Driver Salary (₹)</label>
                <input
                  value={leg.driverSalary || ""}
                  type="number"
                  onChange={(e) =>
                    updateLeg(legIdx, "driverSalary", e.target.value)
                  }
                  placeholder="e.g. 15000"
                  className="driver-screw-input"
                />
              </div>
            </div>

            <div className="driver-crew-title" style={{ marginTop: "16px" }}>
              💸 Driver Advance
            </div>

            {advanceList.map((adv, advIdx) => (
              <div
                className="row g-3 mb-3"
                key={advIdx}
                style={{ marginBottom: "10px" }}
              >
                <div className="col-md-5">
                  <label className="driver-screw-flabel">Date</label>
                  <input
                    value={adv.date || ""}
                    type="date"
                    onChange={(e) =>
                      updateLegAdvance(legIdx, advIdx, "date", e.target.value)
                    }
                    className="driver-screw-input"
                  />
                </div>

                <div className="col-md-5">
                  <label className="driver-screw-flabel">Advance (₹)</label>
                  <input
                    value={adv.amount || ""}
                    type="number"
                    onChange={(e) =>
                      updateLegAdvance(legIdx, advIdx, "amount", e.target.value)
                    }
                    placeholder="2000"
                    className="driver-screw-input"
                  />
                </div>

                <div
                  className="col-md-2"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    paddingBottom: "8px",
                  }}
                >
                  {advanceList.length > 1 && !adv._id && (
                    <FiMinusCircle
                      size={20}
                      cursor="pointer"
                      onClick={() => removeLegAdvance(legIdx, advIdx)}
                      style={{ color: "var(--red)" }}
                    />
                  )}
                </div>
              </div>
            ))}
            {isEdit &&
            <button
              type="button"
              className="control-btn add-more-leg-btn"
              onClick={() => addLegAdvance(legIdx)}
            >
              <FiPlusCircle size={16} />
              Add Amount
            </button>}
          </div>
        );
      })}
    </div>
  );
};

export default DriverCrewSelector;