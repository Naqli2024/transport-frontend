import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addVendor, editVendor, getAllVendor } from "../../redux/Vendor/VendorSlice";

export default function AddVendorModal({ show, onClose, vendor }) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    gstNo: "",
    city: "",
    state: "",
    address: "",
  });
  useEffect(() => {
    if (vendor) {
      setFormData({
        companyName: vendor.companyName || "",
        contactPerson: vendor.contactPerson || "",
        mobile: vendor.mobile || "",
        email: vendor.email || "",
        gstNo: vendor.gstNo || "",
        city: vendor.city || "",
        state: vendor.state || "",
        address: vendor.address || "",
      });
    } else {
      setFormData({
        companyName: "",
        contactPerson: "",
        mobile: "",
        email: "",
        gstNo: "",
        city: "",
        state: "",
        address: "",
      });
    }
  }, [vendor]);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      mobile: formData.mobile,
      email: formData.email,
      gstNo: formData.gstNo,
      city: formData.city,
      state: formData.state,
      address: formData.address,
    };
    if (vendor) {
      const response = await dispatch(editVendor({ userId: vendor._id, payload }));
      if (response?.payload) {
        toast.success(response.payload.message);
        await dispatch(getAllVendor());
        onClose();
      } else {
        toast.error(response?.error?.message);
      }
    } else {
      const response = await dispatch(addVendor(payload));

      if (response?.payload) {
        toast.success(response.payload.message);
        await dispatch(getAllVendor());
        onClose();
      } else {
        toast.error(response?.error.message);
      }
    }
  };
  if (!show) return null;

  return (
    <div className="vendor-modal-overlay">
      <div className="vendor-modal">
        <div className="vendor-modal-header">
          <h3>Add Vendor</h3>
          <button
            className="fc-modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="vm-form-label">Company Name</label>
              <input
                type="text"
                className="add-vendor-input"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="vm-form-label">Contact Person</label>
              <input
                type="text"
                className="add-vendor-input"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="vm-form-label">Mobile</label>
              <input
                type="text"
                className="add-vendor-input"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="vm-form-label">Email</label>
              <input
                type="email"
                className="add-vendor-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="vm-form-label">GST No</label>
              <input
                type="text"
                className="add-vendor-input"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="vm-form-label">City</label>
              <input
                type="text"
                className="add-vendor-input"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="vm-form-label">State</label>
              <input
                type="text"
                className="add-vendor-input"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <label className="vm-form-label">Address</label>
              <textarea
                rows="3"
                className="add-vendor-input"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="vendor-modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="add-vendor-btn">
              {vendor ? "Update Vendor" : "Add Vendor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}