import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  MdOutlineEdit,
  MdDeleteOutline,
  MdDelete,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import AddVendorVehicleModal from "./AddVendorVehicleModal";
import { deleteVendorVehicle, getAllVendorVehicles } from "../../redux/VendorVehicle/VendorVehicleSlice";


const HERO = [
  {
    val: "145",
    label: "TOTAL VEHICLES",
    cls: "hc-green",
  },
  {
    val: "118",
    label: "ACTIVE VEHICLES",
    cls: "hc-accent",
  },
  {
    val: "7",
    label: "EXPIRED DOCS",
    cls: "hc-red",
  },
];

export default function VendorVehicles() {
  const dispatch = useDispatch();

  const [theme] = useState("dark");
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] =  useState(null);
  const [showVehicleModal, setShowVehicleModal] =  useState(false);
  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    dispatch(getAllVendorVehicles())
      .unwrap()
      .then((res) => {
        setVehicles(res.data || []);
      })
      .catch((err) => {
        toast.error(err?.message || "Unable to load vehicles");
      });
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.vehicleNo
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.vendorName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.driverName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.mobile?.includes(search)
    );
  });

  const handleDelete = () => {
    dispatch(deleteVendorVehicle(selectedVehicle._id))
      .unwrap()
      .then(() => {
        toast.success("Vehicle deleted");

        setVehicles((prev) =>
          prev.filter(
            (v) => v._id !== selectedVehicle._id
          )
        );

        setOpenDeleteModal(false);
        setSelectedVehicle(null);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div data-theme={theme}>
      {/* ===================== Header ====================== */}

      <div className="vendor-vehicle-topbar d-flex p-3">

        <div className="vendor-vehicle-topbar-sub w-100">

          <h1>Vendor Vehicles</h1>

          <p className="mb-0">
            Manage vendor fleet vehicles and registration
            details
          </p>

        </div>

        <button
          className="add-vendor-vehicle-btn"
          onClick={() => {
            setSelectedVehicle(null);
            setShowVehicleModal(true);
          }}
        >
          + Add Vehicle
        </button>

      </div>

      {/* ===================== Hero ====================== */}

      <div className="vendor-vehicle-main">

        <div className="vendor-vehicle-hero-row">

          {HERO.map((item) => (
            <div
              key={item.label}
              className={`vendor-vehicle-hero-card ${item.cls}`}
            >
              <div className="vendor-vehicle-hero-val">
                {item.val}
              </div>

              <div className="vendor-vehicle-hero-label">
                {item.label}
              </div>
            </div>
          ))}

        </div>

        {/* ================= Search ================= */}

        <div className="vendor-vehicle-filter-bar py-4">

          <div className="vendor-vehicle-search-wrap">

            <FaSearch className="vendor-vehicle-search-icon" />

            <input
              className="vendor-vehicle-search-input"
              placeholder="Search Vehicle / Vendor / Driver..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>



        <div className="vendor-vehicle-table-section">

          <div className="vendor-vehicle-table-scroll">

            <table className="vendor-vehicle-table">

              <thead>

                <tr>

                  <th>Vehicle No</th>

                  <th>Vendor</th>

                  <th>Vehicle Type</th>

                  <th>Make</th>

                  <th>Capacity</th>

                  <th>Driver</th>

                  <th>Driver Mobile</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredVehicles.length === 0 && (
                  <tr>

                    <td
                      colSpan={10}
                      className="text-center py-5"
                    >
                      No Vehicles Found
                    </td>

                  </tr>
                )}

                {filteredVehicles.map((vehicle) => (

                  <tr key={vehicle._id}>

                    <td>

                      <strong>{vehicle.regNo}</strong>

                    </td>

                    <td>{vehicle.vendorId?.companyName}</td>

                    <td>{vehicle.vehicleType}</td>

                    <td>{vehicle.make}</td>

                    <td>{vehicle.capacity}</td>

                    <td>{vehicle.driverName}</td>

                    <td>{vehicle.driverMobile}</td>


                    <td>

                      <span
                        className={`vehicle-status ${vehicle.status?.toLowerCase()}`}
                      >
                        {vehicle.status}
                      </span>

                    </td>

                    <td className="vendor-vehicle-td-actions">

                      <button
                        className="vendor-vehicle-action-btn vendor-vehicle-action-edit"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setShowVehicleModal(true);
                        }}
                      >
                        <MdOutlineEdit />
                      </button>

                      <button
                        className="vendor-vehicle-action-btn vendor-vehicle-action-delete"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <MdDeleteOutline />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {openDeleteModal && (

        <div className="vendor-vehicle-delete-backdrop">

          <div className="vendor-vehicle-delete-modal">

            <div className="vendor-vehicle-delete-icon-wrap">

              <MdDelete className="vendor-vehicle-delete-icon" />

            </div>

            <h3 className="vendor-vehicle-delete-title">
              Delete Vehicle?
            </h3>

            <p className="vendor-vehicle-delete-text">
              Are you sure you want to delete this
              vehicle?
            </p>

            <div className="vendor-vehicle-delete-actions">

              <button
                className="vendor-vehicle-delete-btn cancel"
                onClick={() =>
                  setOpenDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="vendor-vehicle-delete-btn confirm"
                onClick={handleDelete}
              >
                <MdDelete />
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= Modal ================= */}

      <AddVendorVehicleModal
        show={showVehicleModal}
        vehicle={selectedVehicle}
        onClose={() => {
          setShowVehicleModal(false);
          setSelectedVehicle(null);
          loadVehicles();
        }}
        setVehicles={setVehicles}
      />

    </div>
  );
}