import { useEffect, useState } from "react";
import LogFuelFillModal from "./LogFuelFillModal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteFuelLogs, getAllFuelLogs } from "../../../redux/Fuel/FuelSlice";
import { MdOutlineEdit, MdDeleteOutline, MdDelete } from "react-icons/md";
import AddVendorVehicleModal from "../../Vendor/AddVendorVehicleModal";

export default function FuelControl() {
  const [theme, setTheme] = useState("dark");
  const [openModal, setOpenModal] = useState(false);
  const [editingFuel, setEditingFuel] = useState(null);
  const [selectedFuelLog, setSelectedFuelLog] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const dispatch = useDispatch();
  const { fuelLogs, summary, loading, error } = useSelector((state) => state.fuel);
  const tripId = "6a3e6ee3d869fca810f35fdf"

  const STATS = [
    {
      val: summary?.totalFuel || 0,
      label: "TOTAL LITRES",
      cls: "sc-blue",
    },
    {
      val: `₹${(summary?.totalAmount || 0).toLocaleString("en-IN")}`,
      label: "TOTAL COST",
      cls: "sc-accent",
    },
    {
      val: summary?.totalEntries || 0,
      label: "TOTAL ENTRIES",
      cls: "sc-red",
    },
    {
      val:
        summary?.totalFuel > 0
          ? `₹${(summary.totalAmount / summary.totalFuel).toFixed(2)}`
          : "₹0",
      label: "AVG ₹/L",
      cls: "sc-orange",
    },
  ];

  const handleDelete = async () => {
    if (!selectedFuelLog?._id) return;
    const response = await dispatch(deleteFuelLogs(selectedFuelLog._id));
    if (response?.payload) {
      toast.success(response.payload.message);
      await dispatch(getAllFuelLogs(tripId));
      setOpenDeleteModal(false);
      setSelectedFuelLog(null);
    } else {
      toast.error(response?.error?.message);
    }
  };

  useEffect(() => {
     dispatch(getAllFuelLogs(tripId));
    }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !fuelLogs?.length) {
    return (
      <div className="broker-loading-wrap">
        <div className="broker-loader"></div>
        <p>Loading Fuel...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="fc-topbar">
        <div className="fc-topbar-left">
          <h1 className="heading">Fuel Control</h1>
          <div className="sub-heading">
            Consumption tracking · Theft detection · Cost analysis
          </div>
        </div>
        <button className="vm-btn-add" onClick={() => setOpenModal(true)}>
          + Log Fuel Fill
        </button>
      </div>
      {error && !loading && (
        <div className="broker-error-banner">
          {error || "Failed to load Fuel data."}
        </div>
      )}
      <div className="fc-main">
        <div className="fc-stat-row">
          {STATS.map((s) => (
            <div key={s.label} className={`fc-stat-card ${s.cls}`}>
              <div className="fc-stat-val">{s.val}</div>
              <div className="fc-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="fc-table-section">
          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      color: "var(--textMuted)",
                      padding: "9px 22px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--borderHi)",
                      background: "var(--bgPanel)",
                    },
                  }}
                >
                  <TableCell>Fuel Station</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Fuel Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Bill No</TableCell>
                  <TableCell>Odometer</TableCell>
                  <TableCell>Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {fuelLogs?.map((log) => (
                  <TableRow
                    key={log._id}
                    sx={{
                      "& .MuiTableCell-root": {
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: ".07em",
                        color: "var(--textSub)",
                        padding: "9px 12px",
                        textAlign: "center",
                        borderBottom: "1px solid var(--border)",
                        background: "var(--bgPanel)",
                      },
                    }}
                  >
                    <TableCell>{log.fuelStation}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>{log.fuelType}</TableCell>
                    <TableCell>{log.quantity}</TableCell>
                    <TableCell>₹{log.rate}</TableCell>
                    <TableCell>₹{log.amount}</TableCell>
                    <TableCell>{log.paymentMode}</TableCell>
                    <TableCell>{log.billNo}</TableCell>
                    <TableCell>{log.odometer}</TableCell>
                    <TableCell>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="fc-action-btn fc-action-edit"
                          onClick={() => {
                            setEditingFuel(log);
                            setOpenModal(true);
                          }}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="fc-action-btn fc-action-delete"
                          onClick={() => {
                            setSelectedFuelLog(log);
                            setOpenDeleteModal(true);
                          }}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <LogFuelFillModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingFuel(null);
        }}
        editingFuel={editingFuel}
      />
      {openDeleteModal && (
        <div className="fc-delete-backdrop">
          <div className="fc-delete-modal">
            <div className="fc-delete-icon-wrap">
              <MdDelete className="fc-delete-icon" />
            </div>
            <h3 className="fc-delete-title">Delete Fuel Log?</h3>

            <p className="fc-delete-text">
              Are you sure you want to delete this fuel log?
            </p>
            <div className="fc-delete-actions">
              <button
                className="fc-delete-btn cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="fc-delete-btn confirm" onClick={handleDelete}>
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <AddVendorVehicleModal
        show={showVehicleModal}
        onClose={() => {
          setShowVehicleModal(false);
        }}

      />
    </div>
  );
}
