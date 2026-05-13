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

/* ─────────────────────────────────────────────
   VEHICLE DATA
───────────────────────────────────────────── */

const VEHICLE = {
  title: "Tata Tata LPT 2518 · 2017",

  info: [
    { label: "Reg No", value: "TN69GH1234" },
    { label: "Type", value: "Truck" },
    { label: "Make/Model", value: "Tata LPT 2518", bold: true },
    { label: "Year", value: "2017", bold: true },
    { label: "Capacity", value: "25T" },
    { label: "Status", value: "Active", highlight: "green" },
    { label: "Assigned Driver", value: "Unassigned", bold: true },
    { label: "Engine No", value: "—" },
    { label: "Chassis No", value: "—" },
  ],

  docs: [
    { label: "RC Book", date: "2026-03-15", ok: true },
    { label: "Insurance", date: "2025-12-01", ok: true },
    { label: "Fitness", date: "2026-06-30", ok: true },
    { label: "Permit", date: "2025-11-20", ok: false },
    { label: "PUC", date: "2025-07-10", ok: true },
    { label: "Toll Tag", date: "N/A", ok: false },
  ],

  financial: [
    { label: "Purchase Cost", value: "₹2,800,000" },
    { label: "Current Value", value: "₹1,960,000" },
    { label: "Monthly EMI", value: "—" },
  ],
};

/* ─────────────────────────────────────────────
   INFO ROW
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   DOC ROW
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function VehicleEditModal({
  open = true,
  onClose,
}) {
  const [isOpen, setIsOpen] = useState(open);

  /* THEME MODE */

  const isLight =
    document.documentElement.getAttribute("data-theme") ===
    "light";

  /* MUI THEME */

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
    setIsOpen(false);
    onClose?.();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={isOpen} onClose={handleClose}>
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
          {/* HEADER */}

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
                  fontFamily:
                    '"JetBrains Mono", monospace',
                }}
              >
                · {VEHICLE.title}
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

          {/* ALERT */}

          <Box sx={{ px: 3, pt: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,

                px: 2,
                py: 1.2,

                borderRadius: "12px",

                background: "var(--accentDim)",

                border:
                  "1px solid var(--accent)",
              }}
            >
              <WarningAmberRoundedIcon
                sx={{
                  fontSize: 16,
                  color: "var(--accent)",
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--accent)",
                  fontFamily:
                    '"Outfit", sans-serif',
                }}
              >
                RC Book, Insurance, Permit &
                PUC expiring soon
              </Typography>
            </Box>
          </Box>

          {/* BODY */}

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
            {/* LEFT */}

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

            {/* RIGHT */}

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

              {/* FINANCIAL */}

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

          {/* FOOTER */}

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

            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                background: "var(--accent)",

                color: "#000",

                fontWeight: 700,

                boxShadow:
                  "0 4px 14px rgba(245,158,11,0.35)",

                "&:hover": {
                  background: "#fbbf24",
                },
              }}
            >
              Edit Vehicle
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}