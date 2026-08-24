import React, { useState } from "react";
import {
  MdDelete,
  MdDeleteOutline,
  MdOutlineEdit,
} from "react-icons/md";

function statusMod(status) {
  if (!status) return "";

  const s = status.toLowerCase();

  if (s === "active" || s === "available") {
    return "vendor-modal-value--green";
  }

  if (s === "inactive" || s === "maintenance") {
    return "vendor-modal-value--red";
  }

  return "";
}

const VendorDetailModal = ({
  open,
  onClose,
  vendors,
  vehicles = [],
  loading,
  onEditVehicle,
  onDeleteVehicle,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!open) return null;

  if (loading) {
    return (
      <div className="vendor-modal-overlay">
        <div className="vendor-modal-detail-container vendor-modal-loading-container">
          <div className="vendor-detail-loader"></div>

          <div className="vendor-detail-loading-text">
            Loading vendor details...
          </div>
        </div>
      </div>
    );
  }

  if (!vendors) return null;

  const {
    vendorCode = "-",
    companyName = "-",
    contactPerson = "-",
    mobile = "-",
    email = "-",
    gstNo = "-",
    address = "-",
    city = "-",
    state = "-",
    status = "-",
  } = vendors;

  const vendorVehicles = vehicles.filter((vehicle) => {
    const vehicleVendorId =
      typeof vehicle.vendorId === "object"
        ? vehicle.vendorId?._id
        : vehicle.vendorId;

    return vehicleVendorId === vendors._id;
  });

  const rows = [
    { label: "Vendor Code", value: vendorCode },
    { label: "Company Name", value: companyName },
    { label: "Contact Person", value: contactPerson },
    { label: "Mobile", value: mobile },
    { label: "Email", value: email },
    { label: "GST No", value: gstNo },
    { label: "Address", value: address },
    { label: "City", value: city || "-" },
    { label: "State", value: state || "-" },
    {
      label: "Status",
      value: status,
      mod: statusMod(status),
    },
  ];

  const handleEdit = (vehicle) => {
    if (!vehicle?._id || deleteLoading) return;

    onEditVehicle?.(vehicle);
  };

  const handleOpenDeleteModal = (vehicle) => {
    if (deleteLoading) return;

    setSelectedVehicle(vehicle);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (deleteLoading) return;

    setOpenDeleteModal(false);
    setSelectedVehicle(null);
  };

  const handleDelete = async () => {
    if (!selectedVehicle || deleteLoading) return;

    setDeleteLoading(true);

    try {
      await onDeleteVehicle?.(selectedVehicle);

      setOpenDeleteModal(false);
      setSelectedVehicle(null);
    } catch (error) {
      console.error("Delete vehicle error:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div
      className="vendor-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="vendor-modal-detail-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vendor-modal-detail-header">
          <div>
            <span className="vendor-modal-detail-name">
              {companyName}
            </span>

            <div className="vendor-modal-detail-subtitle">
              {vendorCode}
            </div>
          </div>

          <button
            className="vendor-modal-detail-close"
            onClick={onClose}
            disabled={deleteLoading}
          >
            &#x2715;
          </button>
        </div>
        <div className="vendor-modal-detail-body">
          {rows.map((row, index) => (
            <div
              key={index}
              className="vendor-modal-info-row"
            >
              <span className="vendor-modal-info-label">
                {row.label}
              </span>

              <span
                className={`vendor-modal-info-value ${
                  row.mod || ""
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="vendor-vehicle-section">
          <div className="vendor-vehicle-section-header">
            <h4>Vendor Vehicles</h4>

            <span>
              {vendorVehicles.length} Vehicle
              {vendorVehicles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {vendorVehicles.length === 0 ? (
            <div className="vendor-no-vehicles">
              No vehicles registered for this vendor.
            </div>
          ) : (
            <div className="vendor-vehicle-table-wrap">
              <table className="vendor-vehicle-table">
                <thead>
                  <tr>
                    <th>Vehicle No</th>
                    <th>Type</th>
                    <th>Capacity</th>
                    <th>Driver</th>
                    <th>Mobile</th>
                    <th>Make / Model</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {vendorVehicles.map((vehicle) => (
                    <tr key={vehicle._id}>
                      <td>{vehicle.regNo || "-"}</td>

                      <td>{vehicle.vehicleType || "-"}</td>

                      <td>
                        {vehicle.capacity
                          ? `${vehicle.capacity} T`
                          : "-"}
                      </td>

                      <td>{vehicle.driverName || "-"}</td>

                      <td>{vehicle.driverMobile || "-"}</td>

                      <td>
                        {vehicle.make || "-"}
                        {vehicle.model
                          ? ` / ${vehicle.model}`
                          : ""}
                      </td>

                      <td>
                        <span
                          className={statusMod(
                            vehicle.status
                          )}
                        >
                          {vehicle.status || "-"}
                        </span>
                      </td>

                      <td>
                        <div className="vendor-vehicle-actions">
                          <button
                            className="vm-action-btn vm-action-edit"
                            title="Edit Vehicle"
                            disabled={deleteLoading}
                            onClick={() =>
                              handleEdit(vehicle)
                            }
                          >
                            <MdOutlineEdit />
                          </button>
                          <button
                            className="vm-action-btn vm-action-delete"
                            title="Delete Vehicle"
                            disabled={deleteLoading}
                            onClick={() =>
                              handleOpenDeleteModal(vehicle)
                            }
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="vendor-modal-detail-footer">
          <button
            className="vendor-modal-detail-btn-close"
            onClick={onClose}
            disabled={deleteLoading}
          >
            Close
          </button>
        </div>
        {openDeleteModal && (
          <div
            className="vendor-delete-backdrop"
            onClick={handleCloseDeleteModal}
          >
            <div
              className="vendor-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="vendor-delete-icon-wrap">
                <MdDelete className="vendor-delete-icon" />
              </div>

              <h3 className="vendor-delete-title">
                Delete Vehicle?
              </h3>

              <p className="vendor-delete-text">
                Are you sure you want to delete this vehicle?
              </p>

              <div className="vendor-delete-actions">
                <button
                  className="vendor-delete-btn cancel"
                  onClick={handleCloseDeleteModal}
                  disabled={deleteLoading}
                >
                  Cancel
                </button>

                <button
                  className="vendor-delete-btn confirm"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <span className="vm-btn-loader"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <MdDelete />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDetailModal;