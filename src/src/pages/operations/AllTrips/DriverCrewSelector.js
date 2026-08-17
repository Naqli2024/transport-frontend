import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getAllDrivers } from "../../../redux/Driver/DriverSlice";
const DriverCrewSelector = ({ form, set }) => {
    const [drivers, setDrivers] = useState([]);
    const dispatch = useDispatch();

    const availableDrivers = drivers.filter(
  (driver) => driver.availableStatus === "Available"
);

useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const result = await dispatch(getAllDrivers()).unwrap();
        setDrivers(result.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchDrivers();
  }, [dispatch]);
  return (
    <div>
      <div className="driver-crew-title">👤 Driver & Crew Assignment</div>
      <div className="driver-crew-desc">
        Long-haul trucks require a primary driver, optional second driver for
        relay/rest, and optional cleaner/khalasi for loading assistance.
      </div>

      {/* PRIMARY DRIVER */}
      <div className="driver-crew-card">
        <div className="driver-crew-card-header">
          <div className="driver-crew-card-title">
            🚛 Driver 1 — Primary (Mandatory)
          </div>
          {form.driver && (
            <span
              className="control-badge driver-crew-badge-bg"
              style={{ fontSize: "10px" }}
            >
             Selected: {
  availableDrivers.find(x => x._id === form.driver1)?.name
}
            </span>
          )}
        </div>
        <div className="driver-crew-card-details">
          {availableDrivers.map((d) => (
            <div
              key={d._id}
onClick={() => set("driver1", d._id)}
              className="driver-crew-card-item"
              style={{
                border: `2px solid ${form.driver1 === d._id ? "var(--accent)" : "var(--border)"}`,
                background:
                  form.driver === d.name
                    ? "var(--accentGlow)"
                    : "var(--bgCard)",
              }}
            >
              <div className="driver-crew-driver-info">
                <div
                  className="driver-crew-avatar"
                  style={{
                    background:
                      form.driver === d.name
                        ? "var(--accent)" + "33"
                        : "var(--bgPanel)",
                    border: `2px solid ${form.driver === d.name ? "var(--accent)" : "var(--border)"}`,
                  }}
                >
                  {d.name[0]}
                </div>
                <div>
                  <div className="driver-crew-driver-name">{d.name}</div>
                  <div className="driver-crew-driver-meta">
                   {d.mobile} · DL {d.dlNo} · Exp: {d.experience} yrs
                  </div>
                </div>
              </div>
            
            </div>
          ))}
        </div>


       
      </div>

      <div className="driver-crew-card"> 
        <div className="driver-crew-card-title">
  🔄 Driver 2 — Second Driver / Co-Driver
</div>

<div className="driver-crew-card-details py-3">
  {availableDrivers
    .filter((d) => d._id !== form.driver1)
    .map((d) => (
      <div
        key={d._id}
        onClick={() => set("driver2", d._id)}
        className="driver-crew-card-item"
        style={{
          border: `2px solid ${
            form.driver2 === d._id
              ? "var(--accent)"
              : "var(--border)"
          }`,
        }}
      >
        <div className="driver-crew-driver-info">
          <div
            className="driver-crew-avatar"
            style={{
              background:
                form.driver2 === d._id
                  ? "var(--accent)33"
                  : "var(--bgPanel)",
              border: `2px solid ${
                form.driver2 === d._id
                  ? "var(--accent)"
                  : "var(--border)"
              }`,
            }}
          >
            {d.name[0]}
          </div>

          <div>
            <div className="driver-crew-driver-name">
              {d.name}
            </div>

            <div className="driver-crew-driver-meta">
              {d.mobile} · DL {d.dlNo} · Exp: {d.experience} yrs
            </div>
          </div>
        </div>
      </div>
    ))}
</div>
      </div>


      

      {(form.driver || form.secondDriver || form.cleanerName) && (
        <div className="driver-crew-summary-card">
          <div className="driver-crew-summary-title">👥 Crew Summary</div>
          <div className="driver-crew-summary-wrap">
            {form.driver && (
              <div className="driver-crew-summary-item">
                <span className="driver-crew-summary-label">Driver 1: </span>
             <strong>
  {availableDrivers.find(d => d._id === form.driver1)?.name}
</strong>
                {form.driverAdvance ? (
                  <span style={{ color: "var(--accent)", fontSize: "11px" }}>
                    {" "}
                    · ₹{parseInt(form.driverAdvance).toLocaleString()} adv
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
            {form.secondDriver && (
              <div className="driver-crew-summary-item">
                <span className="driver-crew-summary-label">Driver 2: </span>
                <strong>
  {availableDrivers.find(d => d._id === form.driver2)?.name}
</strong>
                <span style={{ color: "var(--textMuted)", fontSize: "11px" }}>
                  {" "}
                  ({form.d2Role || "Co-Driver"})
                </span>
                {form.d2Advance ? (
                  <span style={{ color: "var(--blue)", fontSize: "11px" }}>
                    {" "}
                    · ₹{parseInt(form.d2Advance).toLocaleString()} adv
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
      
          </div>
        </div>
      )}
       <div className="row g-3">
          <div className="col-md-6">
            <label className="driver-screw-flabel">Driver Advance (₹)</label>
            <input
              value={form.driverAdvance}
              onChange={(e) => set("driverAdvance", e.target.value)}
              placeholder="5000"
              className="driver-screw-input"
            />
          </div>
        </div>
    </div>
  );
};

export default DriverCrewSelector;
