import { useState, useMemo, useEffect } from "react";
import AddDriverModal from "./AddDriverModal";
import DriverDetailModal from "./DriverDetailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDriver,
  getAllDrivers,
  getDriverById,
  getDriversDashboard,
} from "../../../redux/Driver/DriverSlice";
import { MdOutlineEdit, MdDeleteOutline, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DriverSettlementModal from "./DriverSettlementModal";

function DriverRow({ d, onView, onEdit, onDelete }) {
  const [driverId, setDriverId] = useState(null);
  const [openDriverSettlementModal, setOpenDriverSettlementModal] =
    useState(false);

  return (
    <>
      <tr>
        <td>{d.driverId}</td>
        <td>{d.name}</td>
        <td>{d.mobile}</td>
        <td>{d.dlNo || "-"}</td>
        <td>{d.experience ? `${d.experience} Years` : "-"}</td>
        <td>{d.vehicle?.regNo || "Unassigned"}</td>
        <td>
          <span
            className={`broker-status ${
              d.availableStatus === "On Trip"
                ? "st-warning"
                : d.availableStatus === "Available"
                  ? "st-active"
                  : "st-inactive"
            }`}
          >
            {d.availableStatus || "Available"}
          </span>
        </td>
        <td className="broker-td-actions">
          <button
            className="broker-action-btn broker-action-view"
            onClick={() => onView(d)}
          >
            <MdOutlineRemoveRedEye />
          </button>

          <button
            className="broker-action-btn broker-action-edit"
            onClick={() => onEdit(d)}
          >
            <MdOutlineEdit />
          </button>

          <button
            className="broker-action-btn broker-action-delete"
            onClick={() => onDelete(d)}
          >
            <MdDeleteOutline />
          </button>
        </td>
        {d?.currentTripId && (
          <td>
            {" "}
            <button
              className="logout-btn confirm"
              onClick={() => {
                setDriverId(d?._id);
                setOpenDriverSettlementModal(true);
              }}
            >
              Settle
            </button>
          </td>
        )}
      </tr>
      {openDriverSettlementModal && (
        <DriverSettlementModal
          open={() => setOpenDriverSettlementModal(true)}
          onClose={() => setOpenDriverSettlementModal(false)}
          driverId={driverId}
        />
      )}
    </>
  );
}

export default function Drivers() {
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [openAddDriver, setOpenAddDriver] = useState(false);
  const [openDriverModal, setOpenDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch();
  const { drivers, summary, driverDetails, loading, error } = useSelector(
    (state) => state.driver,
  );

  useEffect(() => {
    dispatch(getDriversDashboard());
    dispatch(getAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleViewDriver = async (id) => {
    if (!id) return;
    const response = await dispatch(getDriverById(id));
    if (response?.payload !== undefined) {
      setOpenDriverModal(true);
    } else {
      toast.error(response?.error?.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedDriver?._id || deleteLoading) return;

    setDeleteLoading(true);

    try {
      const response = await dispatch(deleteDriver(selectedDriver._id));

      if (response?.meta?.requestStatus === "fulfilled") {
        toast.success(
          response.payload?.message || "Driver deleted successfully",
        );

        await dispatch(getAllDrivers());
        await dispatch(getDriversDashboard());

        setOpenDeleteModal(false);
        setSelectedDriver(null);
      } else {
        toast.error(
          response?.payload?.message ||
            response?.error?.message ||
            "Failed to delete driver",
        );
      }
    } catch (error) {
      console.error("Delete driver error:", error);

      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = useMemo(
    () =>
      (drivers || []).filter(
        (d) =>
          d.name?.toLowerCase().includes(search.toLowerCase()) ||
          d.driverId?.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, drivers],
  );

  const stats = [
    {
      val: summary.totalDrivers,
      label: "TOTAL DRIVERS",
      cls: "sc-blue",
      id: "totalDrivers",
    },
    {
      val: summary.available,
      label: "AVAILABLE",
      cls: "sc-green",
      id: "available",
    },
    { val: summary.onTrip, label: "ON TRIP", cls: "sc-orange", id: "ontrip" },
    { val: summary.onLeave, label: "ON LEAVE", cls: "sc-red", id: "onleave" },
    {
      val: summary.assigned,
      label: "ASSIGNED",
      cls: "sc-purple",
      id: "assigned",
    },
    {
      val: summary.unassigned,
      label: "UNASSIGNED",
      cls: "sc-accent",
      id: "unassigned",
    },
    {
      val: summary.licenseExpiring,
      label: "LICENSE EXPIRING",
      cls: "sc-cyan",
      id: "license",
    },
    {
      val: summary.reserved,
      label: "RESERVED",
      cls: "sc-accent",
      id: "reserved",
    },
    {
      val: summary.activeTrips,
      label: "ACTIVE TRIPS",
      cls: "sc-green",
      id: "activeTrips",
    },
  ];

  if (loading && !drivers?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Drivers...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="dm-topbar">
        <div>
          <h1 className="heading">Driver Management</h1>
          <div className="sub-heading">
            {drivers?.length || 0} drivers · Compliance tracking · Performance
            scores
          </div>
        </div>
        <div
          className="dm-btn-add"
          onClick={() => {
            setModalMode("add");
            setSelectedDriver(null);
            setOpenAddDriver(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <span>+ Add Driver</span>
        </div>
      </div>
      <div className="dm-main">
        <div className="dm-stat-row">
          {stats.map((s) => (
            <div key={s.id} className={`dm-stat-card ${s.cls}`}>
              <div className="dm-stat-val">{s.val}</div>
              <div className="dm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="dm-search-wrap">
          <div className="dm-search">
            <span className="dm-search-icon">
              <IoSearchOutline size={16} />
            </span>
            <input
              type="text"
              placeholder="Search driver name or license..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {error && !loading && (
          <div className="broker-error-banner">
            {error || "Failed to load driver data."}
          </div>
        )}
        <div className="dm-table-wrap">
          <table className="dm-table">
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>License No</th>
                <th>Experience</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((d) => (
                  <DriverRow
                    key={d._id}
                    d={d}
                    onView={() => handleViewDriver(d._id)}
                    onEdit={() => {
                      setModalMode("edit");
                      setSelectedDriver(d);
                      setOpenAddDriver(true);
                    }}
                    onDelete={() => {
                      setSelectedDriver(d);
                      setOpenDeleteModal(true);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      color: "#888",
                    }}
                  >
                    No Drivers Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddDriverModal
        open={openAddDriver}
        onClose={() => setOpenAddDriver(false)}
        mode={modalMode}
        driver={selectedDriver}
      />

      <DriverDetailModal
        open={openDriverModal}
        onClose={() => setOpenDriverModal(false)}
        driver={driverDetails}
      />
      {openDeleteModal && (
        <div className="vm-delete-backdrop">
          <div className="vm-delete-modal">
            <div className="vm-delete-icon-wrap">
              <MdDelete className="vm-delete-icon" />
            </div>
            <h3 className="vm-delete-title">Delete Driver?</h3>
            <p className="vm-delete-text">
              Are you sure you want to delete this driver?
            </p>
            <div className="vm-delete-actions">
              <button
                className="vm-delete-btn cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="vm-delete-btn confirm"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <span className="delete-btn-loader" />
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
  );
}
