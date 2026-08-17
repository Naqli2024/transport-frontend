import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

/* ══════════════════════════════════════
   MUI DARK THEME
══════════════════════════════════════ */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#080b10", paper: "#0d1525" },
    primary: { main: "#10b981" },
    text: {
      primary:   "#e8f0ff",
      secondary: "#4a6888",
    },
  },
  typography: { fontFamily: '"Outfit", "JetBrains Mono", sans-serif' },
  components: {
    MuiModal: { styleOverrides: { root: { backdropFilter: "blur(8px)" } } },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 700,
          borderRadius: 8,
          fontSize: 13,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: "rgba(255,255,255,0.4)" },
        select: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: 13,
          color: "#e8f0ff",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: 13,
          "&.Mui-selected": { background: "rgba(16,185,129,0.12)" },
          "&.Mui-selected:hover": { background: "rgba(16,185,129,0.18)" },
        },
      },
    },
  },
});

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const PM_TASKS = [
  "Engine Oil Change + Oil Filter",
  "Front Wheel Hub Bearing — Re-pack",
  "Rear Hub Bearing — Re-pack (Drive Axle)",
  "Front Leaf Spring — Graphite Grease",
  "Rear Leaf Spring — Graphite Grease",
  "Steering Linkage Nipples (All Points)",
  "King Pin & Stub Axle Grease",
  "Propeller Shaft Universal Joints",
  "Fifth Wheel Plate — Trailer Coupling",
  "Chassis Nipple Points — Full Set",
  "Bogie Suspension — Centre Bearing Grease",
  "Gearbox Oil Change",
  "Front Axle Differential Oil",
  "Air Filter Replacement",
  "Coolant Flush & Refill",
];

/* ══════════════════════════════════════
   FIELD LABEL COMPONENT
══════════════════════════════════════ */
function FieldLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#4a6888",
        fontFamily: '"JetBrains Mono", monospace',
        mb: 0.8,
        display: "block",
      }}
    >
      {children}
    </Typography>
  );
}

/* ══════════════════════════════════════
   SHARED INPUT STYLES
══════════════════════════════════════ */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "rgba(255,255,255,0.04)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(16,185,129,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#10b981" },
  },
  "& .MuiInputBase-input": {
    fontSize: 13,
    color: "#e8f0ff",
    fontFamily: '"Outfit", sans-serif',
    "&::placeholder": { color: "rgba(255,255,255,0.18)", opacity: 1 },
  },
};

const selectSx = {
  borderRadius: "8px",
  background: "rgba(255,255,255,0.04)",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(16,185,129,0.4)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#10b981 !important" },
  "& .MuiSelect-icon": { color: "rgba(255,255,255,0.35)" },
  fontSize: 13,
  fontFamily: '"Outfit", sans-serif',
  color: "#e8f0ff",
};

const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#0d1525",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "10px",
      mt: 0.5,
      maxHeight: 260,
      boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
      "&::-webkit-scrollbar": { width: 4 },
      "&::-webkit-scrollbar-thumb": { background: "rgba(16,185,129,0.3)", borderRadius: 2 },
    },
  },
};

export default function LogPmDoneModal({ open = true, onClose }) {
  const [isOpen, setIsOpen] = useState(open);

  const [task,       setTask]       = useState("Engine Oil Change + Oil Filter");
  const [odometer,   setOdometer]   = useState("74875");
  const [technician, setTechnician] = useState("");
  const [cost,       setCost]       = useState("");
  const [partsUsed,  setPartsUsed]  = useState("");

  const handleClose  = () => { setIsOpen(false); onClose?.(); };
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Modal Modal open={open} onClose={onClose} aria-labelledby="pm-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95vw", sm: 480 },
            bgcolor: "#0d1525",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "16px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04) inset",
            outline: "none",
            background: "linear-gradient(160deg, #0f1e30 0%, #0d1525 60%, #0a1220 100%)",
            overflow: "hidden",
          }}
        >
          {/* ── HEADER ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(6,182,212,0.07) 100%)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box
                sx={{
                  width: 28, height: 28,
                  borderRadius: "7px",
                  background: "rgba(16,185,129,0.2)",
                  border: "1px solid rgba(16,185,129,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <CheckBoxRoundedIcon sx={{ fontSize: 16, color: "#10b981" }} />
              </Box>
              <Typography
                id="pm-modal-title"
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#10b981",
                  fontFamily: '"Outfit", sans-serif',
                  letterSpacing: "0.02em",
                }}
              >
                Log PM Task
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: "rgba(255,255,255,0.35)",
                "&:hover": { color: "#fff", background: "rgba(255,255,255,0.08)" },
              }}
            >
              <CloseIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>

          {/* ── BODY ── */}
          <Box sx={{ px: 3, pt: 2.5, pb: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Task + Odometer */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1.4fr 1fr" },
                gap: 2,
              }}
            >
              {/* Task selector */}
              <Box>
                <FieldLabel>Task</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  MenuProps={menuProps}
                  sx={selectSx}
                >
                  {PM_TASKS.map(t => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Odometer */}
              <Box>
                <FieldLabel>Odometer (KM)</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={odometer}
                  onChange={e => setOdometer(e.target.value)}
                  variant="outlined"
                  sx={inputSx}
                />
              </Box>
            </Box>

            {/* Technician + Cost */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box>
                <FieldLabel>Technician</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={technician}
                  onChange={e => setTechnician(e.target.value)}
                  variant="outlined"
                  sx={inputSx}
                />
              </Box>

              <Box>
                <FieldLabel>Cost (₹)</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={cost}
                  onChange={e => setCost(e.target.value)}
                  variant="outlined"
                  sx={{
                    ...inputSx,
                    "& .MuiInputBase-input": {
                      ...inputSx["& .MuiInputBase-input"],
                      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": { display: "none" },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Parts Used — full width */}
            <Box>
              <FieldLabel>Parts Used</FieldLabel>
              <TextField
                fullWidth
                size="small"
                value={partsUsed}
                onChange={e => setPartsUsed(e.target.value)}
                variant="outlined"
                sx={inputSx}
              />
            </Box>

          </Box>

          {/* ── FOOTER ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1.5,
              px: 3,
              py: 2,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.5)",
                px: 2.5,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.35)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!task}
              sx={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#000",
                fontWeight: 700,
                px: 3,
                boxShadow: "0 4px 14px rgba(16,185,129,0.45)",
                "&:hover": {
                  background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                  boxShadow: "0 6px 20px rgba(16,185,129,0.6)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": {
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.2)",
                  boxShadow: "none",
                },
              }}
            >
              Log Done
            </Button>
          </Box>

        </Box>
      </Modal>
    </ThemeProvider>
  );
}