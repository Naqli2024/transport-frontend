import { useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  MdOutlineRemoveRedEye,
  MdEdit,
  MdDeleteOutline,
  MdInsertDriveFile,
  MdDelete,
} from "react-icons/md";
import { toast } from "react-toastify";
import { deleteVehicleDoc, getVehicleDocs, updateVehicleDocs } from "../../../redux/Vehicle/VehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdCheck } from "react-icons/md";


function InfoRow({ label, value, bold, highlight }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: "var(--muted)",
          fontFamily: '"Outfit", sans-serif',
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: bold ? 700 : 500,
          fontFamily: '"Outfit", sans-serif',

          color:
            highlight === "green"
              ? "var(--green)"
              : bold
                ? "var(--text)"
                : "var(--muted)",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}


function DocRow({ label, date, ok }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: "var(--muted)",
          fontFamily: '"Outfit", sans-serif',
        }}
      >
        {label}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: '"JetBrains Mono", monospace',
            color: ok ? "var(--green)" : "var(--red)",
          }}
        >
          {date}
        </Typography>

        {ok ? (
          <CheckRoundedIcon
            sx={{
              fontSize: 14,
              color: "var(--green)",
            }}
          />
        ) : (
          <CloseRoundedIcon
            sx={{
              fontSize: 14,
              color: "var(--red)",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default function VehicleViewModal({
  open = true,
  onClose,
  vehicle,
}) {
  const isLight = document.documentElement.getAttribute("data-theme") ===
    "light";
  const dispatch = useDispatch();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editingDocId, setEditingDocId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploadingDocId, setUploadingDocId] = useState(null);
  const fileRefs = useRef({});
  const { vehicleDocs, loading } = useSelector((state) => state.vehicle);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isLight ? "light" : "dark",

          primary: {
            main: "#f59e0b",
          },

          success: {
            main: "#10b981",
          },

          error: {
            main: "#ef4444",
          },

          background: {
            default: isLight ? "#f0f4ff" : "#080b10",

            paper: isLight ? "#ffffff" : "#0d1117",
          },

          text: {
            primary: isLight ? "#0d1830" : "#f1f5f9",

            secondary: isLight
              ? "#5a6a8a"
              : "#94a3b8",
          },
        },

        typography: {
          fontFamily:
            '"JetBrains Mono", "Outfit", monospace',
        },
      }),
    [isLight]
  );

  const handleClose = () => {
    onClose?.();
  };

  const VEHICLE = {
    title: `${vehicle?.make || ""} ${vehicle?.type || ""} · ${vehicle?.year || ""}`,

    info: [
      {
        label: "Reg No",
        value: vehicle?.regNo || "-",
      },

      {
        label: "Type",
        value: vehicle?.type || "-",
      },

      {
        label: "Make/Model",
        value: vehicle?.make || "-",
        bold: true,
      },

      {
        label: "Year",
        value: vehicle?.year || "-",
        bold: true,
      },


      {
        label: "Status",
        value: vehicle?.status || "-",
        highlight: "green",
      },

      {
        label: "Assigned Driver",
        value:
          vehicle?.assignedDriver?.status ||
          "Unassigned",

        bold: true,
      },

      {
        label: "Engine No",
        value: vehicle?.engineNo || "—",
      },

      {
        label: "Chassis No",
        value:
          vehicle?.chassisNo || "—",
      },
    ],

    docs: [
      {
        label: "Insurance",
        date:
          vehicle?.insuranceExpiryDate ||
          "N/A",

        ok: !!vehicle?.insuranceExpiryDate,
      },

      {
        label: "Fitness",
        date:
          vehicle?.fcExpiryDate || "N/A",

        ok: !!vehicle?.fcExpiryDate,
      },

      {
        label: "Road Tax",
        date:
          vehicle?.taxExpiryDate || "N/A",

        ok: !!vehicle?.taxExpiryDate,
      },
    ],

    financial: [
      {
        label: "Purchase Cost",
        value:
          vehicle?.purchaseCost || "—",
      },
    ],
  };

  const docTypeKeyMap = {
    RC_BOOK: "rcBook",
    INSURANCE: "insurance",
    FITNESS_CERTIFICATE: "fitnessCertificate",
    ROAD_TAX: "roadTax",
    PERMIT: "permit",
    POLLUTION: "pollution",
    FASTAG: "fastag",
    NATIONAL_PERMIT: "nationalPermit",
    STATE_PERMIT: "statePermit",
    OTHER: "other",
  };


  useEffect(() => {
    if (vehicle?._id) {
      dispatch(getVehicleDocs(vehicle._id));
    }
  }, [dispatch, vehicle?._id]);

  const handleDelete = async (docId) => {

    try {
      const res = await dispatch(deleteVehicleDoc(docId)).unwrap();
      toast.success(res.message);
      setOpenDeleteModal(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdate = async (doc, file) => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const payload = new FormData();
    payload.append("file", file);

    setSaving(true);
    setUploadingDocId(doc._id);

    try {
      const res = await dispatch(
        updateVehicleDocs({
          docId: doc._id,
          payload,
        })
      ).unwrap();

      toast.success(res.message);
      await dispatch(getVehicleDocs(vehicle._id)).unwrap();

      setEditingDocId(null);

      setSelectedFiles((prev) => {
        const copy = { ...prev };
        delete copy[doc._id];
        return copy;
      });

      if (fileRefs.current[doc._id]) {
        fileRefs.current[doc._id].value = "";
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
      setUploadingDocId(null);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              width: { xs: "95vw", sm: 660 },

              maxHeight: "92vh",
              overflowY: "auto",
              color: "var(--textSub)",
              background: "var(--bgCard)",
              border: "1px solid var(--border)",

              borderRadius: "18px",

              boxShadow:
                "0 30px 80px rgba(0,0,0,0.35)",

              outline: "none",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                background: "var(--bgPanel)",

                borderBottom:
                  "1px solid var(--border)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,

                    borderRadius: "12px",

                    background: "var(--accentDim)",

                    border:
                      "1px solid var(--border)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    fontSize: 18,
                  }}
                >
                  🚛
                </Box>
                <Typography
                  sx={{
                    color: "var(--muted)",
                    fontSize: 13,
                  }}
                >
                  {VEHICLE.title}
                </Typography>
              </Box>

              <IconButton
                onClick={handleClose}
                size="small"
                sx={{
                  color: "var(--muted)",

                  "&:hover": {
                    background: "var(--bg)",
                    color: "var(--text)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ px: 3, pt: 2 }}>

            </Box>
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },

                px: 3,
                py: 2,
              }}
            >
              <Box
                sx={{
                  pr: { sm: 2 },

                  borderRight: {
                    sm: "1px solid var(--border)",
                  },
                }}
              >
                <Typography
                  sx={{
                    mb: 1.5,

                    fontSize: 10,
                    fontWeight: 700,

                    color: "var(--muted)",

                    letterSpacing: "0.18em",

                    textTransform: "uppercase",

                    fontFamily:
                      '"JetBrains Mono", monospace',
                  }}
                >
                  Vehicle Info
                </Typography>

                {VEHICLE.info.map((row) => (
                  <InfoRow
                    key={row.label}
                    {...row}
                  />
                ))}
              </Box>

              <Box sx={{ pl: { sm: 2 } }}>
                <Typography
                  sx={{
                    mb: 1.5,

                    fontSize: 10,
                    fontWeight: 700,

                    color: "var(--muted)",

                    letterSpacing: "0.18em",

                    textTransform: "uppercase",

                    fontFamily:
                      '"JetBrains Mono", monospace',
                  }}
                >
                  Documents & Compliance
                </Typography>


                {VEHICLE.docs.map((row) => (
                  <DocRow
                    key={row.label}
                    {...row}
                  />
                ))}
                <Typography
                  sx={{
                    mt: 2,
                    mb: 1.5,

                    fontSize: 10,
                    fontWeight: 700,

                    color: "var(--muted)",

                    letterSpacing: "0.18em",

                    textTransform: "uppercase",

                    fontFamily:
                      '"JetBrains Mono", monospace',
                  }}
                >
                  Financial
                </Typography>

                {VEHICLE.financial.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",

                      alignItems: "center",

                      py: 1,

                      borderBottom:
                        "1px solid var(--border)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "var(--muted)",
                        fontFamily:
                          '"Outfit", sans-serif',
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 700,

                        color: "var(--accent)",

                        fontFamily:
                          '"JetBrains Mono", monospace',
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <div className="mx-4 mb-3">
              {loading ? (
                <div className="broker-loading-wrap">
                  <div className="broker-loader"></div>
                </div>
              ) : (vehicleDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="trip-upload-file-card"
                >
                  <div className="trip-upload-file-left">
                    <MdInsertDriveFile
                      size={18}
                      color="#4ecdc4"
                    />

                    <div>
                      <div className="trip-upload-doc-title">
                        {doc.documentType.replaceAll("_", " ")}
                      </div>

                      <div className="trip-upload-doc-name">
                        {doc.filePath.split("/").pop()}
                      </div>
                    </div>
                  </div>

                  <div className="trip-upload-actions">
                    <button
                      className="vm-action-btn vm-action-view"
                      onClick={() =>
                        window.open(doc.fileUrl, "_blank")
                      }
                    >
                      <MdOutlineRemoveRedEye />
                    </button>

                    {editingDocId === doc._id ? (
                      <button
                        className="vm-action-btn vm-action-edit"
                        disabled={saving}
                        onClick={() => handleUpdate(doc, selectedFiles[doc._id])}
                      >
                        {uploadingDocId === doc._id ? (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                            style={{ width: "16px", height: "16px" }}
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <MdCheck />
                        )}
                      </button>
                    ) : (
                      <button
                        className="vm-action-btn vm-action-edit"
                        onClick={() => fileRefs.current[doc._id]?.click()}
                      >
                        <MdEdit />
                      </button>
                    )}

                    <input
                      ref={(el) => (fileRefs.current[doc._id] = el)}
                      hidden
                      type="file"
                      onChange={(e) => {
                        if (!e.target.files?.length) return;

                        setSelectedFiles((prev) => ({
                          ...prev,
                          [doc._id]: e.target.files[0],
                        }));

                        setEditingDocId(doc._id);
                      }}
                    />
                    <button
                      className="vm-action-btn vm-action-delete"
                      onClick={() => {
                        setSelectedDoc(doc);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              )))}
            </div>
            <Box
              sx={{
                px: 3,
                py: 2,

                display: "flex",
                gap: 1.5,

                borderTop:
                  "1px solid var(--border)",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                  "&:hover": {
                    borderColor:
                      "var(--accent)",
                    background:
                      "var(--bgPanel)",
                    color: "var(--text)",
                  },
                  textTransform: "capitalize"
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
      {openDeleteModal && (
        <div className="vm-delete-backdrop">
          <div className="vm-delete-modal">
            <div className="vm-delete-icon-wrap">
              <MdDelete className="vm-delete-icon" />
            </div>
            <h3 className="vm-delete-title">Delete Document?</h3>
            <p className="vm-delete-text">
              Are you sure you want to delete this document?
            </p>
            <div className="vm-delete-actions">
              <button
                className="vm-delete-btn cancel"
                onClick={() => {
                  setOpenDeleteModal(false);
                  setSelectedDoc(null);
                }}
              >
                Cancel
              </button>
              <button
                className="vm-delete-btn confirm"
                onClick={async () => {
                  await handleDelete(selectedDoc._id);
                  setOpenDeleteModal(false);
                  setSelectedDoc(null);
                }}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}