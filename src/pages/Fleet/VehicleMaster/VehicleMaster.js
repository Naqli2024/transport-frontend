import { useEffect, useState } from "react";
import AddVehicleModal from "./AddVehicleModal";
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdDelete,
} from "react-icons/md";
import {
  deleteVehicle,
  getAllVehicles,
} from "../../../redux/Vehicle/VehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import VehicleViewModal from "./VehicleViewModal";

const TABS = ["All", "Available", "On Trip", "Maintenance"];
const getStatusStr = (status) =>
  typeof status === "object" ? status?.status || "-" : status || "-";

function getComplianceAlerts(vehicles, thresholdDays = 30) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const alerts = [];

  const check = (vehicle, dateStr, docLabel) => {
    if (!dateStr) return;
    const expiry = new Date(dateStr);
    expiry.setHours(0, 0, 0, 0);
    const diffDays = Math.round((expiry - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      alerts.push({
        reg: vehicle.regNo,
        doc: docLabel,
        statusText: "EXPIRED",
        statusCls: "status-expired",
        cardCls: "alert-red",
      });
    } else if (diffDays <= thresholdDays) {
      alerts.push({
        reg: vehicle.regNo,
        doc: docLabel,
        statusText:
          diffDays === 0
            ? "Expires Today"
            : `${diffDays <= 7 ? "Expiring" : "Due"} in ${diffDays}d`,
        statusCls: diffDays <= 7 ? "status-expiring" : "status-due",
        cardCls: diffDays <= 7 ? "alert-amber" : "alert-orange",
      });
    }
  };

  vehicles.forEach((v) => {
    check(v, v.insuranceExpiryDate, "Insurance");
    check(v, v.fcExpiryDate, "FC Certificate");
    check(v, v.taxExpiryDate, "Road Tax");
  });

  return alerts;
}

function getDocStatus(dateStr, type = "default") {
  if (!dateStr) return { text: "-", cls: "pill-expired" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(dateStr);
  expiry.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: "Expired", cls: "pill-expired" };
  if (diffDays <= 7)
    return { text: `Expiring ${diffDays}d`, cls: "pill-expiring" };
  if (diffDays <= 30) return { text: `Due in ${diffDays}d`, cls: "pill-due" };
  if (type === "tax") return { text: "Paid", cls: "pill-valid" };
  return { text: "Valid", cls: "pill-valid" };
}

function HealthBar({ pct, fillCls, pctCls }) {
  return (
    <div className="vm-health-cell">
      <div className="vm-health-bar">
        <div
          className={`vm-health-fill ${fillCls}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`vm-health-pct ${pctCls}`}>{pct}%</span>
    </div>
  );
}

function VehicleRow({ v, onView, onEdit, onDelete }) {
  const insurance = getDocStatus(v.insuranceExpiryDate);
  const fc = getDocStatus(v.fcExpiryDate);
  const tax = getDocStatus(v.taxExpiryDate, "tax");
  const statusStr = getStatusStr(v.status);

  return (
    <tr>
      <td>
        <span className="vm-reg">{v.regNo}</span>
      </td>
      <td>
        <span className="vm-config">{v.type}</span>
      </td>
      <td>
        <span className="vm-config">{v.axle}</span>
      </td>
      <td>
        <span className="vm-make">
          {v.make} {v.year}
        </span>
      </td>
      <td>
        <span className="vm-km">{v.currentKm}</span>
      </td>
      <td>
        <span className="vm-km">{v.healthStatus}</span>
      </td>
      <td>
        <span className={`vm-pill ${insurance.cls}`}>{insurance.text}</span>
      </td>
      <td>
        <span className={`vm-pill ${fc.cls}`}>{fc.text}</span>
      </td>
      <td>
        <span className={`vm-pill ${tax.cls}`}>{tax.text}</span>
      </td>
      <td>
        <span className="vm-status st-available">{statusStr}</span>
      </td>
      <td className="vm-td-actions">
        <button
          className="vm-action-btn vm-action-view"
          onClick={() => onView(v)}
        >
          <MdOutlineRemoveRedEye />
        </button>
        <button
          className="vm-action-btn vm-action-edit"
          onClick={() => onEdit(v)}
        >
          <MdOutlineEdit />
        </button>
        <button
          className="vm-action-btn vm-action-delete"
          onClick={() => onDelete(v)}
        >
          <MdDeleteOutline />
        </button>
      </td>
    </tr>
  );
}

function VehicleCard({ v }) {
  const statusStr = getStatusStr(v.status);

  return (
    <div className="vm-vehicle-card">
      <div className="vm-vc-head">
        <div className="vm-vc-left">
          <span className="vm-vc-icon">🚛</span>
          <div>
            <div className="vm-vc-reg">{v.regNo}</div>
            <div className="vm-vc-sub">
              {v.type} · {v.make} {v.year}
            </div>
          </div>
        </div>
        <span className="vm-status st-active">{statusStr}</span>
      </div>
      <div className="vm-vc-footer">
        <span className="vm-vc-km">🛣 {v.currentKm} km</span>
      </div>
    </div>
  );
}

const VehicleMaster = () => {
  const dispatch = useDispatch();
  const [activeTab, setTab] = useState("All");
  const [openAddVehicleModal, setOpenAddVehiclemodal] = useState(false);
  const [openVehicleViewModal, setOpenVehicleViewModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const { vehicles, loading, error } = useSelector((state) => state.vehicle);
  const vehicleOnlyData = vehicles?.filter((v) => v.fleet === "vehicle");


  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !vehicles?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Vehicle...</p>
      </div>
    );
  }

  const searchFiltered = vehicleOnlyData.filter(
    (v) =>
      v.regNo?.toLowerCase().includes(search.toLowerCase()) ||
      v.make?.toLowerCase().includes(search.toLowerCase()),
  );
  const filtered =
    activeTab === "All"
      ? searchFiltered
      : searchFiltered.filter((v) => getStatusStr(v.status) === activeTab);
  const dynamicAlerts = getComplianceAlerts(filtered);
  const complianceCount = dynamicAlerts.length;
  const availableCount = vehicleOnlyData.filter(
    (v) => getStatusStr(v.status) === "Available",
  ).length;
  const onTripCount = vehicleOnlyData.filter(
    (v) => getStatusStr(v.status) === "On Trip",
  ).length;
  const maintenanceCount = vehicleOnlyData.filter(
    (v) => getStatusStr(v.status) === "Maintenance",
  ).length;
  const STATS = [
    { val: vehicleOnlyData.length, label: "Total Fleet", cls: "sc-blue" },
    { val: availableCount, label: "Available", cls: "sc-green" },
    { val: onTripCount, label: "On Trip", cls: "sc-amber" },
    { val: maintenanceCount, label: "Maintenance", cls: "sc-orange" },
    { val: complianceCount, label: "Compliance Issues", cls: "sc-red" },
  ];

  const handleDelete = async () => {
    if (!selectedVehicle?._id) return;
    const response = await dispatch(deleteVehicle(selectedVehicle._id));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllVehicles());
      setOpenDeleteModal(false);
      setSelectedVehicle(null);
    } else {
      toast.error(response?.error?.message);
    }
  };

  return (
    <div>
      <div className="vm-topbar">
        <div className="vm-topbar-left">
          <h1 className="heading">Vehicle Master & Compliance</h1>
          <div className="sub-heading">Every lorry as a profit asset</div>
        </div>
        <div className="vm-topbar-right">
          <button
            className="vm-btn-add"
            onClick={() => setOpenAddVehiclemodal(true)}
          >
            + Add Vehicle
          </button>
        </div>
      </div>

      <div className="vm-main">
        <div className="vm-stat-row">
          {STATS.map((s) => (
            <div key={s.label} className={`vm-stat-card ${s.cls}`}>
              <div className="vm-stat-val">{s.val}</div>
              <div className="vm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="vm-alert-banner">
          <div className="vm-alert-header">
            <span className="vm-alert-icon">⚠️</span>
            <span className="vm-alert-title">
              Compliance Alerts — {dynamicAlerts.length} Vehicle
              {dynamicAlerts.length !== 1 ? "s" : ""} Need Attention
            </span>
          </div>
          {dynamicAlerts.length === 0 ? (
            <div className="vm-alert-clear">
              ✅ All documents are up to date
            </div>
          ) : (
            <div className="vm-alert-cards">
              {dynamicAlerts.map((a, i) => (
                <div key={i} className={`vm-alert-card ${a.cardCls}`}>
                  <div className="vm-alert-reg">{a.reg}</div>
                  <div className="vm-alert-doc">{a.doc}</div>
                  <div className={`vm-alert-status ${a.statusCls}`}>
                    {a.statusText}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="vm-tabs mb-4">
          {TABS.map((t) => (
            <button
              key={t}
              className={`vm-tab-btn ${activeTab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="he-search-wrap mb-3">
          <span className="he-search-icon">⌕</span>
          <input
            className="he-search-input"
            placeholder="Search vehicle no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error && !loading && (
          <div className="broker-error-banner">
            {error || "Failed to load vehicle data."}
          </div>
        )}
        <div className="vm-table-wrap">
          <table className="vm-table">
            <thead>
              <tr>
                <th>Vehicle No</th>
                <th>Type</th>
                <th>Config</th>
                <th>Make / Year</th>
                <th>KM</th>
                <th>Health</th>
                <th>Insurance</th>
                <th>FC</th>
                <th>Tax</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((v) => (
                  <VehicleRow
                    key={v._id}
                    v={v}
                    onView={(vehicle) => {
                      setSelectedVehicle(vehicle);
                      setOpenVehicleViewModal(true);
                    }}
                    onEdit={(vehicle) => {
                      setSelectedVehicle(vehicle);
                      setOpenAddVehiclemodal(true);
                    }}
                    onDelete={(vehicle) => {
                      setSelectedVehicle(vehicle);
                      setOpenDeleteModal(true);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
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
        <div className="vm-card-list">
          {filtered.length > 0 ? (
            filtered.map((v) => <VehicleCard key={v._id} v={v} />)
          ) : (
            <div className="vm-no-data">No Data Found</div>
          )}
        </div>
      </div>

      {openAddVehicleModal && (
        <AddVehicleModal
          vehicle={selectedVehicle}
          onClose={() => {
            setOpenAddVehiclemodal(false);
            setSelectedVehicle(null);
          }}
        />
      )}
      {openVehicleViewModal && (
        <VehicleViewModal
          open={openVehicleViewModal}
          vehicle={selectedVehicle}
          onClose={() => setOpenVehicleViewModal(false)}
        />
      )}
      {openDeleteModal && (
        <div className="vm-delete-backdrop">
          <div className="vm-delete-modal">
            <div className="vm-delete-icon-wrap">
              <MdDelete className="vm-delete-icon" />
            </div>
            <h3 className="vm-delete-title">Delete Vehicle?</h3>
            <p className="vm-delete-text">
              Are you sure you want to delete this vehicle?
            </p>
            <div className="vm-delete-actions">
              <button
                className="vm-delete-btn cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="vm-delete-btn confirm" onClick={handleDelete}>
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMaster;
