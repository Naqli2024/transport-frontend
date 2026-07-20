import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addVendorVehicle } from "../../redux/VendorVehicle/VendorVehicleSlice";
import { editVendorVehicle } from "../../redux/VendorVehicle/VendorVehicleSlice";
import { getAllVendor } from "../../redux/Vendor/VendorSlice";

const payload = {
  vendorId:"",
  regNo: "",
  vehicleType: "",
  capacity: "",
  driverName: "",
  driverMobile: "",
  make: "",
  model: "",
};

export default function AddVendorVehicleModal({
  show,
  onClose,
  vehicle,
  setVehicles,
}) {
  const dispatch = useDispatch();
  const [formData, setForm] = useState(payload);
  

const { vendors } = useSelector((state) => state.vendor);

 useEffect(() => {
  if (vehicle) {
    setForm({
     vendorId: vehicle.vendorId?._id || vehicle.vendorId || "",
      regNo: vehicle.regNo || "",
      vendorName: vehicle.vendorId?.companyName || "",
      vehicleType: vehicle.vehicleType || "",
      capacity: vehicle.capacity || "",
      driverName: vehicle.driverName || "",
     driverMobile: vehicle.driverMobile || "",
      make: vehicle.make || "",
      model: vehicle.model || "",
      status: vehicle.status || "Available",
    });
  } else {
    setForm(payload);
  }
}, [vehicle]);


  useEffect(() => {
  if (show) {
    dispatch(getAllVendor());
  }
}, [dispatch, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
  if (
  !formData.regNo ||
  !formData.vendorId ||
  !formData.vehicleType
) {
  toast.error("Please fill all required fields");
  return;
}

    if (vehicle) {
      dispatch(
        editVendorVehicle({
          id: vehicle._id,
          data: formData,
        })
      )
        .unwrap()
        .then((res) => {
          toast.success("Vehicle Updated");

          setVehicles((prev) =>
            prev.map((item) =>
              item._id === vehicle._id
                ? res.data
                : item
            )
          );

          onClose();
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    } else {
      console.log(formData);
      dispatch(addVendorVehicle(formData))
        .unwrap()
        .then((res) => {
          toast.success("Vehicle Added");

          setVehicles((prev) => [
            res.data,
            ...prev,
          ]);

          onClose();
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    
  };


  return (
    <div className="vendor-vehicle-modal-overlay">

      <div className="vendor-vehicle-modal">

        {/* Header */}

        <div className="vendor-vehicle-modal-header">

          <h3>
            {vehicle
              ? "Edit Vendor Vehicle"
              : "Add Vendor Vehicle"}
          </h3>

          <button
            className="fc-modal-close-btn"
            onClick={onClose}
          >
            <MdClose />
          </button>

        </div>

        {/* Body */}

        <div className="vendor-vehicle-modal-body">

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Vehicle Number </label>

              <input
                className="add-vendor-vehicle-input"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Vendor </label>
<select
className="add-vendor-vehicle-input"
  name="vendorId"
  value={formData.vendorId}
  onChange={handleChange}
>
  <option value="">Select Vendor</option>

  {vendors.map((vendor) => (
    <option key={vendor._id} value={vendor._id}>
      {vendor.companyName}
    </option>
  ))}
</select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Vehicle Type *</label>

              <select
                className="add-vendor-vehicle-input"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option value="">
                  Select
                </option>

                <option>
                  Trailer
                </option>

                <option>
                  Container
                </option>

                <option>
                  Truck
                </option>

                <option>
                  LCV
                </option>

                <option>
                  Mini Truck
                </option>

              </select>
            </div>

            <div className="col-md-6 mb-3">

              <label>Capacity</label>

              <input
                className="add-vendor-vehicle-input"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Driver Name</label>

              <input
                className="add-vendor-vehicle-input"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Driver Mobile</label>

              <input
                className="add-vendor-vehicle-input"
                name="driverMobile"
                value={formData.driverMobile}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Make</label>

              <input
                className="add-vendor-vehicle-input"
                name="make"
                value={formData.make}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>model</label>

              <input
                className="add-vendor-vehicle-input"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Status</label>

              <select
                className="add-vendor-vehicle-input"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Maintenance</option>
                <option>Inactive</option>
              </select>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="vendor-modal-footer">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {vehicle
              ? "Update Vehicle"
              : "Save Vehicle"}
          </button>

        </div>

      </div>

    </div>
  );
}