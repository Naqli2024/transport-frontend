import React, { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { MdOutlineEdit, MdDeleteOutline, MdDelete, MdOutlineRemoveRedEye } from "react-icons/md";
import AddVendorModal from "./AddVendorModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteVendor, getAllVendor, getVendorById } from "../../redux/Vendor/VendorSlice";
import { toast } from "react-toastify";
import AddVendorVehicleModal from "./AddVendorVehicleModal";
import VendorDetailModal from "./VendorDetailModal";

const HERO = [
  {
    val: "125",
    label: "TOTAL VENDORS",
    cls: "hc-green",
  },
  {
    val: "98",
    label: "ACTIVE VENDORS",
    cls: "hc-accent",
  },
  {
    val: "27",
    label: "INACTIVE VENDORS",
    cls: "hc-red",
  },
];





function TripRow({ t }) {
  return (
    <tr className={t.isLoss ? "row-loss" : ""}>
      <td>
        <span className="td-trip">{t.trip}</span>
      </td>
      <td>
        <span className={`fp-type ${t.typeCls}`}>{t.type}</span>
      </td>
      <td>
        <span className="td-party">{t.party}</span>
      </td>
      <td>
        <span className="td-freight">{t.freight}</span>
      </td>
      <td>
        <span className="td-expenses">{t.expenses}</span>
      </td>
      <td>
        <span className={`td-profit ${t.profitCls}`}>{t.profit}</span>
      </td>
      <td>
        <span className={`td-margin ${t.marginCls}`}>{t.margin}</span>
      </td>
    </tr>
  );
}

function VendorCard({ vendor }) {
  return (
    <div className="vendor-card">
      <div className="vendor-card-header">
        <h4>{vendor.companyName}</h4>
      </div>
      <div className="vendor-card-body">
        <div>
          <strong>Contact:</strong> {vendor.contactPerson}
        </div>
        <div>
          <strong>Mobile:</strong> {vendor.mobile}
        </div>
        <div>
          <strong>Email:</strong> {vendor.email}
        </div>
        <div>
          <strong>GST:</strong> {vendor.gstNo}
        </div>
        <div>
          <strong>City:</strong> {vendor.city}
        </div>

        <div>
          <strong>State:</strong> {vendor.state}
        </div>

        <div>
          <strong>Address:</strong> {vendor.address}
        </div>
      </div>
    </div>
  );
}

export default function Vendors() {
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const dispatch = useDispatch();
  const { vendors, vendorDetails, loading, error } = useSelector((state) => state.vendor)

  const filteredVendors = useMemo(() => {
    return vendors.filter(
      (vendor) =>
        vendor.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        vendor.contactPerson?.toLowerCase().includes(search.toLowerCase()) ||
        vendor.mobile?.includes(search)
    );
  }, [vendors, search]);

  const handleViewVendor = async (id) => {
    if (!id) return;
    const response = await dispatch(getVendorById(id));
    if (response?.payload !== undefined) {
      setOpenViewModal(true);
    } else {
      toast.error(response?.error?.message);
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

  useEffect(() => {
    dispatch(getAllVendor());
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
    <div data-theme={theme}>
      <div className="vendor-topbar d-flex p-3">
        <div className="vendor-topbar-sub w-100 ">
          <h1>Vendors </h1>
          Trip-level profitability — own fleet vs vendor analysis
        </div>
        <div>
          <button
            className="add-vendor-btn"
            onClick={() => {
              setSelectedVendor(null);   // Add mode
              setShowVendorModal(true);
            }}
          >
            + Add Vendor
          </button>
        </div>

      </div>


      <div className="vendor-main">
        <div className="vendor-hero-row">
          {HERO.map((h) => (
            <div key={h.label} className={`vendor-hero-card ${h.cls}`}>
              <div className="vendor-hero-val">{h.val}</div>
              <div className="vendor-hero-label">{h.label}</div>
            </div>
          ))}
        </div>

        <div className="vendor-filter-bar py-4">
          <div className="vendor-search-wrap">
            <FaSearch className="vendor-search-icon" />

            <input
              type="text"
              className="vendor-search-input"
              placeholder="Search company, contact, mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
                          className="vendor-action-btn vendor-action-view"
                          onClick={() => handleViewVendor(vendor._id)}
                        >
                          <MdOutlineRemoveRedEye />
                        </button>

                        <button
                          className="vendor-action-btn vendor-action-edit"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowVendorModal(true);
                          }}
                        >
                          <MdOutlineEdit />
                        </button>

                        <button
                          className="vendor-action-btn vendor-action-delete"
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
                            setSelectedVehicle(vendor);
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
              <button className="vendor-delete-btn confirm" onClick={handleDelete}>
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
        onClose={() => { setOpenViewModal(false) }}
        vendors={vendorDetails} />

      <AddVendorVehicleModal
        show={showVehicleModal}
        onClose={() => {
          setShowVehicleModal(false);
        }}

      />

    </div>
  );
}
