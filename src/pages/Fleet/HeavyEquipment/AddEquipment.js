import { useMemo, useState } from "react";

import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TypeTile({ item, selected, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.6,
        p: 1.5,
        minHeight: 100,
        borderRadius: "14px",

        border: selected
          ? "1.5px solid var(--accent)"
          : "1.5px solid var(--border)",

        background: selected
          ? "var(--accentDim)"
          : "var(--bgPanel)",

        cursor: "pointer",
        transition: "all 0.2s ease",

        "&:hover": {
          border: "1.5px solid var(--accent)",
          background: "var(--accentDim)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          fontSize: 24,
        }}
      >
        {item.icon}
      </Box>

      <Typography
        sx={{
          fontSize: 11,
          fontWeight: selected ? 700 : 500,
          color: selected ? "var(--accent)" : "var(--textSub)",
          textAlign: "center",
        }}
      >
        {item.label}
      </Typography>
    </Box>
  );
}

export default function AddEquipmentModal({
  open = true,
  onClose,
}) {
  const isLight =
    document.documentElement.dataset.theme === "light";

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isLight ? "light" : "dark",
        },
      }),
    [isLight]
  );

  const [step, setStep] = useState(1);

  const [selected, setSelected] = useState("backhoe");

  const [make, setMake] = useState("JCB");
  const [model, setModel] = useState("JCB 3DX");
  const [year, setYear] = useState("2023");

  // STEP 2
  const [fleetNo, setFleetNo] = useState("");
  const [engineHours, setEngineHours] = useState("0");
  const [hourlyRate, setHourlyRate] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [site, setSite] = useState("");

  const MAKES = ["JCB", "Caterpillar", "Komatsu"];

  const YEARS = ["2025", "2024", "2023", "2022"];

  const EQUIPMENT_TYPES = [
    { id: "backhoe", label: "Backhoe", icon: "🟡" },
    { id: "hydraulic1", label: "Hydraulic", icon: "🦾" },
    { id: "mini", label: "Mini", icon: "🔶" },
    { id: "vibratory", label: "Vibratory", icon: "🔵" },
    { id: "hydraulic2", label: "Hydraulic", icon: "🏗" },
    { id: "telehandler", label: "Telehandler", icon: "🔧" },
    { id: "motor", label: "Motor", icon: "⚙️" },
    { id: "concrete", label: "Concrete", icon: "⬜" },
    { id: "transit", label: "Transit", icon: "🔵" },
  ];

  const handleClose = () => {
    onClose?.();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: {
              xs: "95vw",
              sm: 580,
            },

            bgcolor: "var(--bgCard)",

            borderRadius: "18px",

            overflow: "hidden",

            border: "1px solid var(--border)",

            boxShadow: isLight
              ? "0 10px 40px rgba(0,0,0,0.08)"
              : "0 10px 40px rgba(0,0,0,0.45)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              px: 3,
              py: 2,

              borderBottom: "1px solid var(--border)",
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              Add Equipment — Step {step}/2
            </Typography>

            <IconButton
              onClick={handleClose}
              sx={{
                background: "var(--bgPanel)",

                "&:hover": {
                  background: "var(--accentDim)",
                },
              }}
            >
              <CloseIcon
                sx={{
                  color: "var(--text)",
                }}
              />
            </IconButton>
          </Box>

          {/* BODY */}
          <Box
            sx={{
              p: 3,

              "& .MuiOutlinedInput-root": {
                background: "var(--bgPanel)",
                color: "var(--text)",
                borderRadius: "10px",

                "& fieldset": {
                  borderColor: "var(--border)",
                },

                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "var(--accent)",
                },
              },

              "& .MuiInputLabel-root": {
                color: "var(--textSub)",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--accent)",
              },

              "& .MuiSvgIcon-root": {
                color: "var(--textSub)",
              },

              "& .MuiInputBase-input": {
                color: "var(--text)",
              },
            }}
          >
            {/* STEP 1 */}
            {step === 1 && (
              <>
                {/* TYPE GRID */}
                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "repeat(2,1fr)",
                      sm: "repeat(4,1fr)",
                    },

                    gap: 1.2,
                    mb: 3,
                  }}
                >
                  {EQUIPMENT_TYPES.map((item) => (
                    <TypeTile
                      key={item.id}
                      item={item}
                      selected={selected === item.id}
                      onClick={() => setSelected(item.id)}
                    />
                  ))}
                </Box>

                {/* FORM */}
                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                    },

                    gap: 2,
                  }}
                >
                  {/* MAKE */}
                  <FormControl fullWidth size="small">
                    <InputLabel>Make</InputLabel>

                    <Select
                      value={make}
                      label="Make"
                      onChange={(e) =>
                        setMake(e.target.value)
                      }
                    >
                      {MAKES.map((m) => (
                        <MenuItem key={m} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* MODEL */}
                  <TextField
                    label="Model"
                    size="small"
                    value={model}
                    onChange={(e) =>
                      setModel(e.target.value)
                    }
                  />

                  {/* YEAR */}
                  <FormControl fullWidth size="small">
                    <InputLabel>Year</InputLabel>

                    <Select
                      value={year}
                      label="Year"
                      onChange={(e) =>
                        setYear(e.target.value)
                      }
                    >
                      {YEARS.map((y) => (
                        <MenuItem key={y} value={y}>
                          {y}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },

                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    label="Fleet No / Reg"
                    size="small"
                    value={fleetNo}
                    onChange={(e) =>
                      setFleetNo(e.target.value)
                    }
                  />

                  <TextField
                    label="Current Engine Hrs"
                    size="small"
                    value={engineHours}
                    onChange={(e) =>
                      setEngineHours(e.target.value)
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                    },

                    gap: 2,
                  }}
                >
                  <TextField
                    label="Hourly Rate (₹)"
                    size="small"
                    value={hourlyRate}
                    onChange={(e) =>
                      setHourlyRate(e.target.value)
                    }
                  />

                  <TextField
                    label="Purchase Cost"
                    size="small"
                    value={purchaseCost}
                    onChange={(e) =>
                      setPurchaseCost(e.target.value)
                    }
                  />

                  <TextField
                    label="Deployment Site"
                    size="small"
                    value={site}
                    onChange={(e) =>
                      setSite(e.target.value)
                    }
                  />
                </Box>
              </>
            )}
          </Box>

          {/* FOOTER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",

              px: 3,
              py: 2,

              borderTop: "1px solid var(--border)",
            }}
          >
            {/* LEFT BUTTON */}
            {step === 1 ? (
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderColor: "var(--borderHi)",
                  color: "var(--text)",

                  "&:hover": {
                    borderColor: "var(--accent)",
                    background: "var(--accentDim)",
                  },
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setStep(1)}
                sx={{
                  borderColor: "var(--borderHi)",
                  color: "var(--text)",

                  "&:hover": {
                    borderColor: "var(--accent)",
                    background: "var(--accentDim)",
                  },
                }}
              >
                ← Back
              </Button>
            )}

            {/* RIGHT BUTTON */}
            {step === 1 ? (
              <Button
                variant="contained"
                onClick={() => setStep(2)}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: "var(--accent)",
                  color: "#000",
                  fontWeight: 700,
                  px: 3,

                  "&:hover": {
                    background: "var(--accentSoft)",
                  },
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, #d97706 100%)",

                  color: "#000",

                  fontWeight: 700,

                  px: 3,

                  "&:hover": {
                    opacity: 0.95,
                  },
                }}
              >
                🚜 Add Equipment
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}