import React, { useEffect, useState } from "react";
import { getAllVehicles } from "../../../redux/Vehicle/VehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { getAllVendor } from "../../../redux/Vendor/VendorSlice";
import { getAllVendorVehicles } from "../../../redux/VendorVehicle/VendorVehicleSlice";

const VehicleTypeSelector = ({ form, set, fleetSource, setForm, isEdit }) => {
  const dispatch = useDispatch();

  const { vendors, loading, error } = useSelector((state) => state.vendor);
  const { vendorVehicle } = useSelector((state) => state.vendorVehicle);
  const { vehicles, loadingVehicle } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  const filteredVendorVehicles = (vendorVehicle || []).filter(
    (vehicle) => vehicle.vendorId?._id === form.vendorId,
  );

  const vehicleTypes = useMemo(() => {
    return [
      ...new Map(
        vehicles.filter((v) => v.fleet === "vehicle").map((v) => [v.type, v]),
      ).values(),
    ];
  }, [vehicles]);

  const availableVehicles = useMemo(() => {
    return vehicles.filter(
      (v) => v.fleet === "vehicle" && v.type === form.vehicleCategory,
    );
  }, [vehicles, form.vehicleCategory]);

  useEffect(() => {
    if (fleetSource === "Vendor") {
      dispatch(getAllVendor());
      dispatch(getAllVendorVehicles());
    }
  }, [dispatch, fleetSource]);

  return (
    <div>
      {isEdit && (
        <div
          style={{
            padding: "10px 14px",
            marginBottom: "14px",
            borderRadius: "8px",
            background: "var(--accentDim, var(--bgPanel))",
            border: "1px solid var(--border)",
            fontSize: "12px",
            color: "var(--textSub)",
          }}
        >
          🔒 Vehicle assignment can't be changed after a trip is created.
        </div>
      )}
      {fleetSource === "Vendor" && (
        <div>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="trip-generator-modal-flabel">
                Select Vendor
              </label>
              <select
                className="trip-generator-modal-input"
                value={form.vendorId}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    vendorId: e.target.value,
                    vendorVehicleId: "",
                  }));
                }}
                disabled={isEdit}
              >
                <option value="" disabled>
                  Choose Vendor
                </option>

                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="trip-generator-modal-flabel">
                Vendor Vehicle
              </label>
              <select
                className="trip-generator-modal-input"
                value={form.vendorVehicleId}
                onChange={(e) => set("vendorVehicleId", e.target.value)}
                disabled={isEdit || !form.vendorId}
              >
                <option value="" disabled>
                  Choose Vehicle
                </option>

                {filteredVendorVehicles.length > 0
                  ? filteredVendorVehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.regNo} — {vehicle.make} {vehicle.model}
                      </option>
                    ))
                  : form.vendorId && (
                      <option value="" disabled>
                        No vehicle found
                      </option>
                    )}
              </select>
            </div>

            {/* Vendor Amount */}
            <div className="col-md-6">
              <label className="trip-generator-modal-flabel">
                Vendor Amount
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                className="trip-generator-modal-input"
                placeholder="Enter vendor amount"
                value={form.vendorAmount}
                onChange={(e) => set("vendorAmount", e.target.value)}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>
      )}
      {fleetSource !== "Vendor" && (
        <>
          <div className="vehicle-type-category-title">
            🚛 Select Vehicle Category
          </div>
          {loadingVehicle ? (
            <div
              className="d-flex justify-content-start mb-3"
              style={{ color: "var(--text)" }}
            >
              Loading...
            </div>
          ) : (
            <div className="row g-3 mb-4">
              {vehicleTypes.map((type) => (
                <div className="col-md-4" key={type.type}>
                  <div
                    className={`vehicle-type-schema-btn ${
                      form.vehicleCategory === type.type ? "sel" : ""
                    }`}
                    onClick={() => {
                      if (isEdit) return;
                      set("vehicleCategory", type.type);
                      set("vehicleId", "");
                    }}
                  >
                    <div>
                      <div className="vehicle-type-schema-label">
                        {type.type}
                      </div>

                      <div className="vehicle-type-capacity">
                        {type.make} {type.model}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {form.vehicleCategory && (
            <>
              <h5 className="available-vehicle">
                Available {form.vehicleCategory} Vehicles
              </h5>

              <div className="row g-3">
                {availableVehicles.length > 0 ? (
                  availableVehicles.map((vehicle) => (
                    <div className="col-md-6 p-3" key={vehicle._id}>
                      <div
                        className={`vehicle-card ${
                          form.vehicleId === vehicle._id ? "selected" : ""
                        }`}
                        onClick={() => {
                          if (isEdit) return;
                          set("vehicleId", vehicle._id);
                        }}
                      >
                        <div className="vehicle-card-left">
                          <div className="truck-icon">🚛</div>

                          <div className="vehicle-info">
                            <h2>{vehicle.regNo}</h2>

                            <p>
                              {vehicle.make} • {vehicle.model}
                            </p>

                            <small>Year : {vehicle.year}</small>
                          </div>
                        </div>

                        <div className="vehicle-card-right">
                          <div className="status-text">{vehicle.status}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No Vehicles Available</div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VehicleTypeSelector;
