import { useMemo, useState } from "react";
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
  const isLight =
    document.documentElement.getAttribute("data-theme") ===
    "light";

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
  value: vehicle?.status?.status || "-",
  highlight: "green",
},

    {
      label: "Assigned Driver",
      value:
        vehicle?.assignedDriver ||
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

  return (
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
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}