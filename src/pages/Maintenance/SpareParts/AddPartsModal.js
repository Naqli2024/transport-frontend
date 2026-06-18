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
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import SaveIcon from "@mui/icons-material/Save";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#080b10", paper: "#0d1525" },
    primary: { main: "#f59e0b" },
    text: { primary: "#e8f0ff", secondary: "#4a6888" },
  },
  typography: { fontFamily: '"Outfit", "JetBrains Mono", sans-serif' },
  components: {
    MuiModal:  { styleOverrides: { root: { backdropFilter: "blur(8px)" } } },
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
        icon:   { color: "rgba(255,255,255,0.35)" },
        select: { fontFamily: '"Outfit", sans-serif', fontSize: 13, color: "#e8f0ff" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: 13,
          "&.Mui-selected":       { background: "rgba(245,158,11,0.12)" },
          "&.Mui-selected:hover": { background: "rgba(245,158,11,0.18)" },
        },
      },
    },
  },
});


const CATEGORIES = [
  "Engine", "Brake System", "Electrical", "Gearbox",
  "Tyre System", "Suspension", "Body & Frame",
  "Hydraulics", "Fuel System", "Cooling System", "Other",
];

const UNITS = [
  "Pcs", "Set", "Pair", "Litre", "Can",
  "Box", "Kit", "Roll", "Metre", "Kg",
];


const inputSx = (required = false) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "rgba(255,255,255,0.04)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(245,158,11,0.38)" },
    "&.Mui-focused fieldset": {
      borderColor: required ? "#f59e0b" : "rgba(245,158,11,0.6)",
      boxShadow: required ? "0 0 0 2px rgba(245,158,11,0.12)" : "none",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: 13,
    color: "#e8f0ff",
    fontFamily: '"Outfit", sans-serif',
    "&::placeholder": { color: "rgba(255,255,255,0.18)", opacity: 1 },
  },
  "& .MuiInputAdornment-root p": {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
  },
});

const selectSx = {
  borderRadius: "8px",
  background: "rgba(255,255,255,0.04)",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245,158,11,0.38)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f59e0b !important" },
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
      maxHeight: 220,
      boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
      "&::-webkit-scrollbar": { width: 4 },
      "&::-webkit-scrollbar-thumb": { background: "rgba(245,158,11,0.3)", borderRadius: 2 },
    },
  },
};


function Label({ children, required }) {
  return (
    <Typography
      component="label"
      sx={{
        display: "block",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#4a6888",
        fontFamily: '"JetBrains Mono", monospace',
        mb: 0.8,
      }}
    >
      {children}
      {required && <Box component="span" sx={{ color: "#ef4444", ml: 0.4 }}>*</Box>}
    </Typography>
  );
}

export default function AddPartsModal({ open = true, onClose }) {
  const [isOpen, setIsOpen] = useState(open);

  /* form state */
  const [partName,  setPartName]  = useState("");
  const [sku,       setSku]       = useState("");
  const [category,  setCategory]  = useState("");
  const [unit,      setUnit]      = useState("");
  const [qty,       setQty]       = useState("");
  const [reorder,   setReorder]   = useState("");
  const [unitCost,  setUnitCost]  = useState("");
  const [supplier,  setSupplier]  = useState("");
  const [storage,   setStorage]   = useState("");
  const [desc,      setDesc]      = useState("");

  const handleClose = () => { setIsOpen(false); onClose?.(); };

  const isValid = partName.trim() && sku.trim() && category && unit &&
                  qty !== "" && reorder !== "" && unitCost !== "";

  const handleSave = () => {
    if (!isValid) return;
    alert(`✅ Spare Part Saved!\nPart: ${partName}\nSKU: ${sku}\nCategory: ${category}\nQty: ${qty} ${unit}\nUnit Cost: ₹${unitCost}`);
    handleClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>

      {!open && (
        <Box sx={{ p: 4 }}>
          <Button
            variant="outlined"
            onClick={() => setIsOpen(true)}
            sx={{
              borderColor: "rgba(245,158,11,0.4)",
              color: "#f59e0b",
              "&:hover": { borderColor: "#f59e0b", background: "rgba(245,158,11,0.08)" },
            }}
          >
            + Add Spare Part
          </Button>
        </Box>
      )}

      <Modal open={isOpen} onClose={handleClose} aria-labelledby="spare-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "96vw", sm: 560 },
            maxHeight: "92vh",
            overflowY: "auto",
            bgcolor: "#0d1525",
            border: "1px solid rgba(245,158,11,0.18)",
            borderRadius: "16px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04) inset",
            outline: "none",
            background: "linear-gradient(160deg, #111d35 0%, #0d1525 60%, #0a1020 100%)",
            "&::-webkit-scrollbar": { width: 4 },
            "&::-webkit-scrollbar-thumb": { background: "rgba(245,158,11,0.25)", borderRadius: 2 },
          }}
        >

     
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3, py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(249,115,22,0.06) 100%)",
              position: "sticky", top: 0, zIndex: 1,
              backdropFilter: "blur(8px)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 32, height: 32, borderRadius: "8px",
                  background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <BuildCircleIcon sx={{ fontSize: 17, color: "#f59e0b" }} />
              </Box>
              <Typography
                id="spare-modal-title"
                sx={{ fontSize: 16, fontWeight: 700, color: "#f59e0b", fontFamily: '"Outfit", sans-serif', letterSpacing: "0.02em" }}
              >
                Add Spare Part
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{ color: "rgba(255,255,255,0.35)", "&:hover": { color: "#fff", background: "rgba(255,255,255,0.08)" } }}
            >
              <CloseIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>

         
          <Box sx={{ px: 3, pt: 2.5, pb: 1, display: "flex", flexDirection: "column", gap: 2.2 }}>

           
            <Typography sx={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", fontFamily: '"JetBrains Mono", monospace' }}>
              Basic Information
            </Typography>

      
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box>
                <Label required>Part Name</Label>
                <TextField fullWidth size="small" placeholder="e.g. Engine Oil Filter" value={partName}
                  onChange={e => setPartName(e.target.value)} variant="outlined" sx={inputSx(true)} />
              </Box>
              <Box>
                <Label required>SKU / Part Code</Label>
                <TextField fullWidth size="small" placeholder="e.g. FLT-OIL-001" value={sku}
                  onChange={e => setSku(e.target.value)} variant="outlined" sx={inputSx(true)} />
              </Box>
            </Box>


            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box>
                <Label required>Category</Label>
                <Select fullWidth size="small" value={category} onChange={e => setCategory(e.target.value)}
                  displayEmpty MenuProps={menuProps}
                  renderValue={v => v || <Box component="span" sx={{ color: "rgba(255,255,255,0.2)" }}>Select</Box>}
                  sx={selectSx}
                >
                  {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </Box>
              <Box>
                <Label required>Unit</Label>
                <Select fullWidth size="small" value={unit} onChange={e => setUnit(e.target.value)}
                  displayEmpty MenuProps={menuProps}
                  renderValue={v => v || <Box component="span" sx={{ color: "rgba(255,255,255,0.2)" }}>Select</Box>}
                  sx={selectSx}
                >
                  {UNITS.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                </Select>
              </Box>
            </Box>

      
            <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.06)", pt: 0.5 }}>
              <Typography sx={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", fontFamily: '"JetBrains Mono", monospace' }}>
                Stock & Pricing
              </Typography>
            </Box>

          
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
              <Box>
                <Label required>Current Quantity</Label>
                <TextField fullWidth size="small" type="number" placeholder="0" value={qty}
                  onChange={e => setQty(e.target.value)} variant="outlined"
                  sx={{ ...inputSx(true), "& input": { MozAppearance: "textfield" }, "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" } }}
                />
              </Box>
              <Box>
                <Label required>Reorder Level</Label>
                <TextField fullWidth size="small" type="number" placeholder="0" value={reorder}
                  onChange={e => setReorder(e.target.value)} variant="outlined"
                  sx={{ ...inputSx(true), "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" } }}
                />
              </Box>
              <Box>
                <Label required>Unit Cost (₹)</Label>
                <TextField fullWidth size="small" type="number" placeholder="0" value={unitCost}
                  onChange={e => setUnitCost(e.target.value)} variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  sx={{ ...inputSx(true), "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" } }}
                />
              </Box>
            </Box>

   
            <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.06)", pt: 0.5 }}>
              <Typography sx={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: '"JetBrains Mono", monospace' }}>
                Optional Details
              </Typography>
            </Box>

    
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <Box>
                <Label>Supplier</Label>
                <TextField fullWidth size="small" placeholder="e.g. Bosch India" value={supplier}
                  onChange={e => setSupplier(e.target.value)} variant="outlined" sx={inputSx()} />
              </Box>
              <Box>
                <Label>Storage Location</Label>
                <TextField fullWidth size="small" placeholder="e.g. Rack A-3" value={storage}
                  onChange={e => setStorage(e.target.value)} variant="outlined" sx={inputSx()} />
              </Box>
            </Box>

            <Box>
              <Label>Description</Label>
              <TextField fullWidth multiline rows={3}
                placeholder="Optional notes about this part..."
                value={desc} onChange={e => setDesc(e.target.value)}
                variant="outlined"
                sx={{
                  ...inputSx(),
                  "& .MuiInputBase-input": {
                    fontSize: 13,
                    color: "#e8f0ff",
                    fontFamily: '"Outfit", sans-serif',
                    "&::placeholder": { color: "rgba(255,255,255,0.18)", opacity: 1 },
                  },
                }}
              />
            </Box>

          </Box>

     
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1.5,
              px: 3, py: 2,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              position: "sticky", bottom: 0,
              background: "rgba(13,21,37,0.95)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderColor: "rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.45)",
                px: 2.5,
                "&:hover": { borderColor: "rgba(255,255,255,0.32)", color: "#fff", background: "rgba(255,255,255,0.05)" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!isValid}
              startIcon={<SaveIcon sx={{ fontSize: "15px !important" }} />}
              sx={{
                background: isValid
                  ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  : "rgba(255,255,255,0.06)",
                color: isValid ? "#000" : "rgba(255,255,255,0.2)",
                fontWeight: 700,
                px: 3,
                boxShadow: isValid ? "0 4px 14px rgba(245,158,11,0.4)" : "none",
                "&:hover": {
                  background: isValid ? "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)" : "rgba(255,255,255,0.06)",
                  boxShadow: isValid ? "0 6px 20px rgba(245,158,11,0.55)" : "none",
                  transform: isValid ? "translateY(-1px)" : "none",
                },
                "&.Mui-disabled": { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)", boxShadow: "none" },
                transition: "all 0.2s ease",
              }}
            >
              Save Part
            </Button>
          </Box>

        </Box>
      </Modal>
    </ThemeProvider>
  );
}