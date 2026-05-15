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
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import BuildIcon from "@mui/icons-material/Build";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

/* ══════════════════════════════════════
   MUI DARK THEME
══════════════════════════════════════ */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#080b10", paper: "#0d1525" },
    primary: { main: "#f59e0b" },
    error:   { main: "#ef4444" },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: "rgba(255,255,255,0.04)",
          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
          "&:hover fieldset": { borderColor: "rgba(245,158,11,0.4) !important" },
          "&.Mui-focused fieldset": { borderColor: "#f59e0b !important" },
        },
        input: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: 13,
          color: "#e8f0ff",
          "&::placeholder": { color: "rgba(255,255,255,0.25)", opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#4a6888",
          "&.Mui-focused": { color: "#f59e0b" },
          transform: "translate(0, -22px) scale(1)",
        },
        shrink: { transform: "translate(0, -22px) scale(1)" },
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
          "&.Mui-selected": { background: "rgba(245,158,11,0.12)" },
          "&.Mui-selected:hover": { background: "rgba(245,158,11,0.18)" },
        },
      },
    },
  },
});

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const VEHICLES = [
  "TN69 GH4789 — JCB 3DX",
  "TN59 AB1234 — Ashok Leyland",
  "TN45 CD5678 — Tata Prima",
  "TN38 EF9012 — BharatBenz",
  "TN71 GH3456 — VECV",
  "TN22 IJ7890 — Tata 2021",
];

const CATEGORIES = [
  "Engine", "Electrical", "Brake System",
  "Gearbox", "Tyre System", "Body",
  "Preventive Maintenance", "Other",
];

/* ══════════════════════════════════════
   SHARED FIELD LABEL
══════════════════════════════════════ */
function FieldLabel({ children, required }) {
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
      {required && (
        <Box component="span" sx={{ color: "#ef4444", ml: 0.4 }}>*</Box>
      )}
    </Typography>
  );
}

/* ══════════════════════════════════════
   MAIN MODAL COMPONENT
══════════════════════════════════════ */
export default function CreateWorkOrderModal({ open , onClose }) {
  const [isOpen, setIsOpen] = useState(open);

  /* Form state */
  const [vehicle,   setVehicle]   = useState("");
  const [category,  setCategory]  = useState("Engine");
  const [issue,     setIssue]     = useState("");
  const [workshop,  setWorkshop]  = useState("");
  const [estCost,   setEstCost]   = useState("");

  const handleClose = () => {
  onClose?.();
};
  const handleSubmit = () => {
    if (!vehicle || !issue.trim()) return;
    alert(`✅ Work Order Created!\nVehicle: ${vehicle}\nCategory: ${category}\nIssue: ${issue}`);
    handleClose();
  };

  const menuProps = {
    PaperProps: {
      sx: {
        bgcolor: "#0d1525",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        mt: 0.5,
        boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Modal open={open} onClose={handleClose} aria-labelledby="wo-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95vw", sm: 520 },
            bgcolor: "#0d1525",
            border: "1px solid rgba(239,68,68,0.18)",
            borderRadius: "16px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04) inset",
            outline: "none",
            background: "linear-gradient(160deg, #111d35 0%, #0d1525 60%, #0a1020 100%)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(249,115,22,0.07) 100%)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box
                sx={{
                  width: 30, height: 30,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, rgba(239,68,68,0.22), rgba(249,115,22,0.12))",
                  border: "1px solid rgba(239,68,68,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <BuildIcon sx={{ fontSize: 15, color: "#f97316" }} />
              </Box>
              <Typography
                id="wo-modal-title"
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#f97316",
                  fontFamily: '"Outfit", sans-serif',
                  letterSpacing: "0.02em",
                }}
              >
                Create Work Order
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
          <Box sx={{ px: 3, pt: 3, pb: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Vehicle + Category row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {/* Vehicle */}
              <Box>
                <FieldLabel>Vehicle</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value={vehicle}
                  onChange={e => setVehicle(e.target.value)}
                  displayEmpty
                  MenuProps={menuProps}
                  renderValue={v => v || <Box component="span" sx={{ color: "rgba(255,255,255,0.3)" }}>Select</Box>}
                  sx={{
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245,158,11,0.4)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f59e0b" },
                    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.35)" },
                    fontSize: 13,
                    fontFamily: '"Outfit", sans-serif',
                    color: "#e8f0ff",
                  }}
                >
                  {VEHICLES.map(v => (
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Category */}
              <Box>
                <FieldLabel>Category</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  MenuProps={menuProps}
                  sx={{
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245,158,11,0.4)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f59e0b" },
                    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.35)" },
                    fontSize: 13,
                    fontFamily: '"Outfit", sans-serif',
                    color: "#e8f0ff",
                  }}
                >
                  {CATEGORIES.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            {/* Issue textarea */}
            <Box>
              <FieldLabel required>Issue</FieldLabel>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Describe the problem..."
                value={issue}
                onChange={e => setIssue(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    alignItems: "flex-start",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                    "&:hover fieldset": { borderColor: "rgba(245,158,11,0.4)" },
                    "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: 13,
                    color: "#e8f0ff",
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: 1.6,
                    "&::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1 },
                  },
                  "& textarea": {
                    resize: "vertical",
                  },
                }}
              />
            </Box>

            {/* Workshop + Est. Cost row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {/* Workshop */}
              <Box>
                <FieldLabel>Workshop</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder=""
                  value={workshop}
                  onChange={e => setWorkshop(e.target.value)}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                      "&:hover fieldset": { borderColor: "rgba(245,158,11,0.4)" },
                      "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: 13, color: "#e8f0ff",
                      fontFamily: '"Outfit", sans-serif',
                    },
                  }}
                />
              </Box>

              {/* Est. Cost */}
              <Box>
                <FieldLabel>Est. Cost (₹)</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  placeholder=""
                  value={estCost}
                  onChange={e => setEstCost(e.target.value)}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                      "&:hover fieldset": { borderColor: "rgba(245,158,11,0.4)" },
                      "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: 13, color: "#e8f0ff",
                      fontFamily: '"Outfit", sans-serif',
                      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": { display: "none" },
                    },
                  }}
                />
              </Box>
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
              disabled={!vehicle || !issue.trim()}
              startIcon={<CheckBoxIcon sx={{ fontSize: "16px !important" }} />}
              sx={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#000",
                fontWeight: 700,
                px: 3,
                boxShadow: "0 4px 14px rgba(245,158,11,0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
                  boxShadow: "0 6px 20px rgba(245,158,11,0.55)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": {
                 background: "#F59E0B",
                  color: "#0F1F3D",
                  boxShadow: "none",
                },
              }}
            >
              Create WO
            </Button>
          </Box>

        </Box>
      </Modal>
    </ThemeProvider>
  );
}