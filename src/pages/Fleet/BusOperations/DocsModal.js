import { useMemo } from "react";

import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const complianceData = [
  {
    title: "Insurance",
    days: "266d left",
    number: "POL-2024-1182945",
    expiry: "2026-01-15",
    status: "safe",
  },

  {
    title: "Fitness Certificate",
    days: "331d left",
    number: "FC/TN-22/2025/881",
    expiry: "2026-03-20",
    status: "safe",
  },

  {
    title: "Permit (Contract)",
    days: "585d left",
    number: "PCP/TN/2021/5541",
    expiry: "2026-11-30",
    status: "safe",
  },

  {
    title: "PUC Certificate",
    days: "108d left",
    number: "PUC-2025-884421",
    expiry: "2025-08-10",
    status: "safe",
  },

  {
    title: "Motor Vehicle Tax",
    days: "68d left",
    number: "MVT-TN22-2025",
    expiry: "2025-07-01",
    status: "warning",
  },
];

export default function ComplianceModal({
  open,
  onClose,
  busNo = "TN22 IJ7890",
}) {
  // LIGHT MODE CHECK
  const isLight =
    document.documentElement.dataset.theme ===
    "light";

  // MUI THEME
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isLight
            ? "light"
            : "dark",
        },
      }),
    [isLight]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",

            top: "50%",
            left: "50%",

            transform:
              "translate(-50%, -50%)",

            width: {
              xs: "95vw",
              sm: 540,
            },

            background:
              "var(--bgCard)",

            borderRadius: "20px",

            overflow: "hidden",

            border:
              "1px solid var(--border)",

            color: "var(--text)",

            boxShadow: isLight
              ? "0 20px 60px rgba(0,0,0,0.08)"
              : "0 30px 80px rgba(0,0,0,0.7)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              px: 3,
              py: 2,

              display: "flex",

              alignItems: "center",

              justifyContent:
                "space-between",

              background:
                "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(249,115,22,0.12))",

              borderBottom:
                "1px solid var(--border)",
            }}
          >
            {/* TITLE */}
            <Typography
              sx={{
                color: "var(--red)",

                fontWeight: 700,

                fontSize: 18,
              }}
            >
              📋 Compliance — {busNo}
            </Typography>

            {/* CLOSE */}
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color:
                  "var(--textMuted)",

                "&:hover": {
                  color: "var(--text)",

                  background:
                    "var(--redGlow)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* BODY */}
          <Box
            sx={{
              px: 3,
              py: 2,
            }}
          >
            {complianceData.map(
              (item, index) => (
                <Box key={item.title}>
                  <Box
                    sx={{
                      py: 2,

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      gap: 2,
                    }}
                  >
                    {/* LEFT */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",

                          alignItems:
                            "center",

                          gap: 1,

                          mb: 1,

                          flexWrap:
                            "wrap",
                        }}
                      >
                        {/* TITLE */}
                        <Typography
                          sx={{
                            color:
                              "var(--text)",

                            fontWeight: 600,

                            fontSize: 15,
                          }}
                        >
                          {item.title}
                        </Typography>

                        {/* DAYS */}
                        <Chip
                          label={item.days}
                          size="small"
                          sx={{
                            height: 24,

                            fontWeight: 700,

                            fontSize: 11,

                            background:
                              item.status ===
                              "warning"
                                ? "var(--orangeGlow)"
                                : "var(--greenGlow)",

                            color:
                              item.status ===
                              "warning"
                                ? "var(--orange)"
                                : "var(--green)",

                            border:
                              item.status ===
                              "warning"
                                ? "1px solid rgba(249,115,22,0.2)"
                                : "1px solid rgba(16,185,129,0.2)",
                          }}
                        />
                      </Box>

                      {/* DETAILS */}
                      <Typography
                        sx={{
                          fontSize: 12,

                          color:
                            "var(--textMuted)",
                        }}
                      >
                        No: {item.number} ·
                        Expiry:
                        <Box
                          component="span"
                          sx={{
                            ml: 0.5,

                            fontWeight: 700,

                            color:
                              item.status ===
                              "warning"
                                ? "var(--orange)"
                                : "var(--green)",
                          }}
                        >
                          {item.expiry}
                        </Box>
                      </Typography>
                    </Box>

                    {/* ACTION */}
                    {item.status ===
                      "warning" && (
                      <Button
                        variant="contained"
                        endIcon={
                          <ArrowForwardIcon />
                        }
                        sx={{
                          textTransform:
                            "none",

                          borderRadius:
                            "10px",

                          px: 2.2,

                          fontWeight: 700,

                          background:
                            "linear-gradient(135deg,var(--blue) 0%, #2966d8 100%)",

                          boxShadow:
                            "0 8px 24px rgba(36,81,166,0.25)",

                          "&:hover":
                            {
                              background:
                                "linear-gradient(135deg,#2451a6 0%, #2f6ae0 100%)",
                            },
                        }}
                      >
                        Renew
                      </Button>
                    )}
                  </Box>

                  {/* DIVIDER */}
                  {index !==
                    complianceData.length -
                      1 && (
                    <Divider
                      sx={{
                        borderColor:
                          "var(--border)",
                      }}
                    />
                  )}
                </Box>
              )
            )}
          </Box>

          {/* FOOTER */}
          <Box
            sx={{
              px: 3,
              py: 2,

              display: "flex",

              justifyContent:
                "flex-end",

              borderTop:
                "1px solid var(--border)",

              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                textTransform: "none",

                color: "var(--text)",

                borderColor:
                  "var(--borderHi)",

                px: 3,

                borderRadius: "10px",

                "&:hover": {
                  borderColor:
                    "var(--blue)",

                  background:
                    "var(--blueGlow)",
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