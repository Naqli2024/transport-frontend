import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdOutlineEdit,
  MdDeleteOutline,
  MdDelete,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import AddVendorModal from "./AddVendorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVendor,
  getAllVendor,
  getVendorById,
} from "../../redux/Vendor/VendorSlice";
import { toast } from "react-toastify";
import AddVendorVehicleModal from "./AddVendorVehicleModal";
import VendorDetailModal from "./VendorDetailModal";
import {
  deleteVendorVehicle,
  getAllVendorVehicles,
} from "../../redux/VendorVehicle/VendorVehicleSlice";

export default function Vendors() {
  const [search, setSearch] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleVendor, setSelectedVehicleVendor] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const [vehicleDeleting, setVehicleDeleting] = useState(false);
  const dispatch = useDispatch();
  const { vendors, vendorDetails, loading, error } = useSelector(
    (state) => state.vendor,
  );
  const { vendorVehicle } = useSelector((state) => state.vendorVehicle);

  const filteredVendors = useMemo(() => {
    return vendors.filter(
      (vendor) =>
        vendor.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        vendor.contactPerson?.toLowerCase().includes(search.toLowerCase()) ||
        vendor.mobile?.includes(search),
    );
  }, [vendors, search]);

  const handleViewVendor = async (id) => {
    if (!id) return;
    setOpenViewModal(true);
    setViewLoading(true);

    try {
      const response = await dispatch(getVendorById(id)).unwrap();
    } catch (error) {
      toast.error(error);
      setOpenViewModal(false);
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedVendor?._id) return;
    const response = await dispatch(deleteVendor(selectedVendor._id));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllVendor());
      setOpenDeleteModal(false);
      setSelectedVendor(null);
    } else {
      toast.error(response?.error?.message);
    }
  };

  const handleDeleteVendorVehicle = async (vehicle) => {
    if (!vehicle?._id || vehicleDeleting) return;

    setVehicleDeleting(true);

    try {
      const response = await dispatch(
        deleteVendorVehicle(vehicle._id),
      ).unwrap();

      toast.success(response?.message);

      await dispatch(getAllVendorVehicles()).unwrap();
    } catch (error) {
      toast.error(error);

      throw error;
    } finally {
      setVehicleDeleting(false);
    }
  };

  useEffect(() => {
    dispatch(getAllVendor());
    dispatch(getAllVendorVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !vendors?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Vendors...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="vm-topbar">
        <div className="vm-topbar-left">
          <h1 className="heading">Vendors</h1>
          <div className="sub-heading">
            Monitor vendors and Vendor's vehicles
          </div>
        </div>
        <div className="vm-topbar-right">
          <button
            className="add-vendor-btn"
            onClick={() => {
              setSelectedVendor(null);
              setShowVendorModal(true);
            }}
          >
            + Add Vendor
          </button>
        </div>
      </div>
      <div className="vendor-main">
        <div className="he-search-wrap mb-3">
          <span className="he-search-icon">
            <IoSearchOutline size={16} />
          </span>
          <input
            className="he-search-input"
            placeholder="Search company, contact, mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error && !loading && (
          <div className="broker-error-banner">
            {error || "Failed to load vendor data."}
          </div>
        )}
        <div className="vendor-table-section">
          <div className="vendor-table-scroll">
            <table className="vendor-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Contact Person</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>GST No</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Address</th>
                  <th>Actions</th>
                  <th>Add Vehicle</th>
                </tr>
              </thead>

              <tbody>
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor) => (
                    <tr key={vendor._id}>
                      <td>{vendor.companyName}</td>
                      <td>{vendor.contactPerson}</td>
                      <td>{vendor.mobile}</td>
                      <td>{vendor.email}</td>
                      <td>{vendor.gstNo}</td>
                      <td>{vendor.city}</td>
                      <td>{vendor.state}</td>
                      <td>{vendor.address}</td>

                      <td className="vendor-td-actions p-1">
                        <button
                          className="vm-action-btn vm-action-view"
                          onClick={() => handleViewVendor(vendor._id)}
                        >
                          <MdOutlineRemoveRedEye />
                        </button>

                        <button
                          className="vm-action-btn vm-action-edit"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowVendorModal(true);
                          }}
                        >
                          <MdOutlineEdit />
                        </button>

                        <button
                          className="vm-action-btn vm-action-delete"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setOpenDeleteModal(true);
                          }}
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>

                      <td>
                        <button
                          className="add-vendor-vehicle-btn"
                          onClick={() => {
                            setSelectedVehicle(null);
                            setSelectedVehicleVendor(vendor._id);
                            setShowVehicleModal(true);
                          }}
                        >
                          + Add
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#888",
                        fontWeight: "500",
                      }}
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openDeleteModal && (
        <div className="vendor-delete-backdrop">
          <div className="vendor-delete-modal">
            <div className="vendor-delete-icon-wrap">
              <MdDelete className="vendor-delete-icon" />
            </div>
            <h3 className="vendor-delete-title">Delete Vendor?</h3>
            <p className="vendor-delete-text">
              Are you sure you want to delete this vendor?
            </p>
            <div className="vendor-delete-actions">
              <button
                className="vendor-delete-btn cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="vendor-delete-btn confirm"
                onClick={handleDelete}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <AddVendorModal
        show={showVendorModal}
        onClose={() => {
          setShowVendorModal(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
      />
      <VendorDetailModal
        open={openViewModal}
        loading={viewLoading}
        vendors={vendorDetails}
        vehicles={vendorVehicle}
        onClose={() => {
          if (!viewLoading && !vehicleDeleting) {
            setOpenViewModal(false);
          }
        }}
        onEditVehicle={(vehicle) => {
          setSelectedVehicle(vehicle);
          setSelectedVehicleVendor(null);
          setShowVehicleModal(true);
        }}
        onDeleteVehicle={handleDeleteVendorVehicle}
      />

      <AddVendorVehicleModal
        show={showVehicleModal}
        vehicle={selectedVehicle}
        vendorId={selectedVehicleVendor}
        onClose={() => {
          setShowVehicleModal(false);
          setSelectedVehicle(null);
          setSelectedVehicleVendor(null);
        }}
      />
    </div>
  );
}
