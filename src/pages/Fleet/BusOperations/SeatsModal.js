import { useMemo, useState } from "react";

import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Chip,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";

const seats = Array.from({ length: 10 }, (_, row) =>
  ["A", "B", "C", "D"].map((col) => `${row + 1}${col}`),
).flat();

export default function SeatConditionModal({
  open,
  onClose,
  busNo = "TN22 IJ7890",
}) {
  const isLight = document.documentElement.dataset.theme === "light";

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isLight ? "light" : "dark",
        },
      }),
    [isLight],
  );

  const [selectedSeat, setSelectedSeat] = useState("2B");

  // DEMO ISSUE SEATS
  const issueSeats = useMemo(() => ["2B", "5C", "7A"], []);

  const uncheckedCount = 400;

  return (
    <ThemeProvider theme={muiTheme}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",

            top: "50%",
            left: "50%",

            transform: "translate(-50%, -50%)",

            width: {
              xs: "95vw",
              md: 680,
            },

            background: "var(--bgCard)",

            border: "1px solid var(--border)",

            borderRadius: "20px",

            overflow: "hidden",

            boxShadow: isLight
              ? "0 20px 60px rgba(0,0,0,0.08)"
              : "0 30px 80px rgba(0,0,0,0.65)",

            color: "var(--text)",
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

              background:
                "linear-gradient(90deg, var(--blueGlow) 0%, rgba(59,130,246,0.15) 50%, var(--blueGlow) 100%)",

              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* TITLE */}
            <Typography
              sx={{
                color: "var(--blue)",

                fontWeight: 700,

                fontSize: 16,

                letterSpacing: "0.02em",
              }}
            >
              🪑 Seat Condition Check —{busNo}
            </Typography>

            {/* CLOSE */}
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: "var(--textMuted)",

                "&:hover": {
                  color: "var(--text)",

                  background: "var(--accentDim)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* BODY */}
          <Box
            sx={{
              px: 2.2,
              pt: 3,
              pb: 2,
            }}
          >
            {/* SEAT GRID */}
            <Grid container spacing={1.3}>
              {seats.map((seat) => {
                const isIssue = issueSeats.includes(seat);

                const isSelected = selectedSeat === seat;

                return (
                  <Grid item xs={3} key={seat}>
                    <Box
                      onClick={() => setSelectedSeat(seat)}
                      sx={{
                        height: 42,
                        px: 4,
                        borderRadius: "10px",

                        border: isIssue
                          ? "1px solid rgba(255,80,120,0.45)"
                          : isSelected
                            ? "1px solid var(--blue)"
                            : "1px solid var(--border)",

                        background: isIssue
                          ? "var(--redGlow)"
                          : isSelected
                            ? "var(--blueGlow)"
                            : "var(--bgPanel)",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        cursor: "pointer",

                        transition: "all 0.18s ease",

                        userSelect: "none",

                        "&:hover": {
                          borderColor: "var(--blue)",

                          background: "var(--blueGlow)",

                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,

                          fontWeight: 700,

                          color: isIssue
                            ? "var(--red)"
                            : isSelected
                              ? "var(--blue)"
                              : "var(--textSub)",
                        }}
                      >
                        {seat}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            {/* LEGEND */}
            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1,

                mt: 3,

                flexWrap: "wrap",
              }}
            >
              {/* OK */}
              <Chip
                size="small"
                label="OK: 0"
                sx={{
                  background: "var(--greenGlow)",
                  
                  color: "var(--green)",

                  border: "1px solid rgba(34,197,94,0.25)",

                  fontWeight: 600,
                }}
              />

              {/* ISSUES */}
              <Chip
                size="small"
                label={`Issues: ${issueSeats.length}`}
                sx={{
                  background: "var(--redGlow)",

                  color: "var(--red)",

                  border: "1px solid rgba(239,68,68,0.25)",

                  fontWeight: 600,
                }}
              />

              {/* UNCHECKED */}
              <Chip
                size="small"
                label={`Unchecked: ${uncheckedCount} items`}
                sx={{
                  background: "var(--bgPanel)",

                  color: "var(--textSub)",

                  border: "1px solid var(--border)",

                  fontWeight: 600,
                }}
              />
            </Box>

            {/* INFO */}
            <Typography
              sx={{
                mt: 2,

                fontSize: 12,

                color: "var(--textMuted)",
              }}
            >
              Click any seat code above to inspect its IO items individually.
            </Typography>
          </Box>

          {/* FOOTER */}
          <Box
            sx={{
              px: 3,
              py: 2,

              display: "flex",

              justifyContent: "flex-end",

              gap: 1.5,

              borderTop: "1px solid var(--border)",

              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)",
            }}
          >
            {/* CLOSE */}
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "var(--text)",

                borderColor: "var(--borderHi)",

                textTransform: "none",

                px: 3,

                "&:hover": {
                  borderColor: "var(--blue)",

                  background: "var(--blueGlow)",
                },
              }}
            >
              Close
            </Button>

            {/* GENERATE */}
            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              sx={{
                textTransform: "none",

                px: 3,

                fontWeight: 700,

                background:
                  "linear-gradient(135deg,var(--blue) 0%, #3159b7 100%)",

                boxShadow: "0 8px 24px rgba(49,89,183,0.25)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg,#3159b7 0%, #3d6ae0 100%)",
                },
              }}
            >
              Generate WO for Issues
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
