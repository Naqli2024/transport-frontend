import React, { useEffect, useState } from 'react'
import { getAllVehicles } from '../../../redux/Vehicle/VehicleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getAllVendor } from '../../../redux/Vendor/VendorSlice';
import { getAllVendorVehicles } from '../../../redux/VendorVehicle/VendorVehicleSlice';

const VehicleTypeSelector = ({ form, set, fleetSource, setForm }) => {
  const dispatch = useDispatch();

  const { vendors, loading, error } = useSelector(
    (state) => state.vendor
  );
  const { vendorVehicle } = useSelector(
    (state) => state.vendorVehicle
  );
  const { vehicles, loadingVehicle } = useSelector(
  (state) => state.vehicle
);

useEffect(() => {
  dispatch(getAllVehicles());
}, [dispatch]);


  const filteredVendorVehicles =
    (vendorVehicle || []).filter(
      (vehicle) => vehicle.vendorId?._id === form.vendorId
    );

  const vehicleTypes = useMemo(() => {
    return [
      ...new Map(
        vehicles
          .filter((v) => v.fleet === "vehicle")
          .map((v) => [v.type, v])
      ).values(),
    ];
  }, [vehicles]);

  const availableVehicles = useMemo(() => {
    return vehicles.filter(
      (v) =>
        v.fleet === "vehicle" &&
        v.type === form.vehicleCategory
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
      {fleetSource === "Vendor" && (
        <div>

          <div className="row g-3">
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
              >
                <option value="" disabled>Choose Vendor</option>

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
              >
                <option value="" disabled>Choose Vehicle</option>

                {filteredVendorVehicles.length > 0 ? (
                  filteredVendorVehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.regNo} — {vehicle.make} {vehicle.model}
                    </option>
                  ))
                ) : (
                  form.vendorId && (
                    <option value="" disabled>
                      No vehicle found
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      )}
      <div className='vehicle-type-category-title py-3'>🚛 Select Vehicle Category</div>
      {loadingVehicle ? (
              <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
      </div>
      ) : (<div className="row g-3 mb-4">
        {vehicleTypes.map((type) => (
          <div className="col-md-4" key={type.type}>
            <div
              className={`vehicle-type-schema-btn ${form.vehicleCategory === type.type ? "sel" : ""
                }`}
              onClick={() => {
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
      </div>)}

      {form.vehicleCategory && (
        <>
          <h5 className=" available-vehicle mb-3 ">
            Available {form.vehicleCategory} Vehicles
          </h5>

          <div className="row g-3">
            {availableVehicles.length > 0 ? (
              availableVehicles.map((vehicle) => (
                <div className="col-md-6 p-3" key={vehicle._id}>
                  <div
                    className={`vehicle-card ${form.vehicleId === vehicle._id ? "selected" : ""
                      }`}
                    onClick={() => set("vehicleId", vehicle._id)}
                  >
                    <div className="vehicle-card-left">
                      <div className="truck-icon">
                        🚛
                      </div>

                      <div className="vehicle-info">
                        <h2>{vehicle.regNo}</h2>

                        <p>
                          {vehicle.make} • {vehicle.model}
                        </p>

                        <small>
                          Year : {vehicle.year}
                        </small>
                      </div>
                    </div>

                    <div className="vehicle-card-right">
                      <div className="status-text">
                        {vehicle.status}
                      </div>
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

    </div>
  )
}

export default VehicleTypeSelector;
