import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addVendorVehicle,
  editVendorVehicle,
  getAllVendorVehicles,
} from "../../redux/VendorVehicle/VendorVehicleSlice";
import { getAllVendor } from "../../redux/Vendor/VendorSlice";

const getInitialPayload = (vendorId = "") => ({
  vendorId: vendorId || "",
  regNo: "",
  vehicleType: "",
  capacity: "",
  driverName: "",
  driverMobile: "",
  make: "",
  model: "",
});

export default function AddVendorVehicleModal({
  show,
  onClose,
  vehicle,
  vendorId,
}) {
  const dispatch = useDispatch();

  const [formData, setForm] = useState(getInitialPayload());

  const [submitting, setSubmitting] = useState(false);

  const { vendors = [] } = useSelector((state) => state.vendor);

  const isEditMode = Boolean(vehicle?._id);

  useEffect(() => {
    if (!show) return;

    if (vehicle?._id) {
      const vehicleVendorId =
        typeof vehicle.vendorId === "object"
          ? vehicle.vendorId?._id
          : vehicle.vendorId;

      setForm({
        vendorId: vehicleVendorId || "",
        regNo: vehicle.regNo || "",
        vehicleType: vehicle.vehicleType || "",
        capacity:
          vehicle.capacity !== null && vehicle.capacity !== undefined
            ? String(vehicle.capacity)
            : "",
        driverName: vehicle.driverName || "",
        driverMobile: vehicle.driverMobile || "",
        make: vehicle.make || "",
        model: vehicle.model || "",
      });
    } else {
      setForm(getInitialPayload(vendorId));
    }
  }, [show, vehicle, vendorId]);

  useEffect(() => {
    if (show) {
      dispatch(getAllVendor());
    }
  }, [dispatch, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!formData.regNo.trim()) {
      toast.error("Vehicle number is required");
      return;
    }

    if (!formData.vendorId) {
      toast.error("Please select a vendor");
      return;
    }

    if (!formData.vehicleType) {
      toast.error("Please select vehicle type");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        vendorId: formData.vendorId,
        regNo: formData.regNo.trim(),
        vehicleType: formData.vehicleType,
        capacity: formData.capacity === "" ? "" : Number(formData.capacity),
        driverName: formData.driverName.trim(),
        driverMobile: formData.driverMobile.trim(),
        make: formData.make.trim(),
        model: formData.model.trim(),
      };

      let response;
      if (isEditMode) {
        response = await dispatch(
          editVendorVehicle({
            id: vehicle._id,
            data: payload,
          }),
        ).unwrap();

        toast.success(response?.message);
      } else {
        response = await dispatch(addVendorVehicle(payload)).unwrap();
        toast.success(response?.message);
      }
      await dispatch(getAllVendorVehicles()).unwrap();
      setForm(getInitialPayload());
      onClose?.();
    } catch (error) {
      console.error(
        isEditMode ? "UPDATE VEHICLE ERROR:" : "ADD VEHICLE ERROR:",
        error,
      );

      toast.error(
        error?.message ||
          error?.error ||
          (typeof error === "string"
            ? error
            : isEditMode
              ? "Unable to update vehicle"
              : "Unable to add vehicle"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="vendor-vehicle-modal-overlay">
      <div
        className="vendor-vehicle-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vendor-vehicle-modal-header">
          <h3>{isEditMode ? "Edit Vendor Vehicle" : "Add Vendor Vehicle"}</h3>

          <button
            className="fc-modal-close-btn"
            onClick={onClose}
            disabled={submitting}
          >
            <MdClose />
          </button>
        </div>
        <div className="vendor-vehicle-modal-body">
          <div className="row">
            {/* VEHICLE NUMBER */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Vehicle Number *</label>

              <input
                className="add-vendor-vehicle-input"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            {/* VENDOR */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Vendor *</label>

              <select
                className="add-vendor-vehicle-input add-vendor-vehicle-select"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="" disabled>
                  Select Vendor
                </option>

                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.companyName}
                  </option>
                ))}
              </select>
            </div>

            {/* VEHICLE TYPE */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Vehicle Type *</label>

              <select
                className="add-vendor-vehicle-input add-vendor-vehicle-select"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="" disabled>
                  Select
                </option>

                <option value="Trailer">Trailer</option>

                <option value="Container">Container</option>

                <option value="Truck">Truck</option>

                <option value="LCV">LCV</option>

                <option value="Mini Truck">Mini Truck</option>
              </select>
            </div>

            {/* CAPACITY */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Capacity</label>

              <input
                className="add-vendor-vehicle-input"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            {/* DRIVER NAME */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Driver Name</label>

              <input
                className="add-vendor-vehicle-input"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            {/* DRIVER MOBILE */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Driver Mobile</label>

              <input
                className="add-vendor-vehicle-input"
                name="driverMobile"
                value={formData.driverMobile}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Make</label>

              <input
                className="add-vendor-vehicle-input"
                name="make"
                value={formData.make}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            {/* MODEL */}

            <div className="col-md-6 mb-3">
              <label className="vm-form-label">Model</label>

              <input
                className="add-vendor-vehicle-input"
                name="model"
                value={formData.model}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
          </div>
        </div>
        <div className="vendor-modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="vm-btn-accent"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="vm-btn-loader"></span>

                {isEditMode ? "Updating..." : "Saving..."}
              </>
            ) : isEditMode ? (
              "Update Vehicle"
            ) : (
              "Save Vehicle"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
