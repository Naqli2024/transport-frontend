import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Grid,
  InputLabel,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const vehicleMakes = ["Tata", "Ashok Leyland", "Eicher"];
const years = ["2023", "2022", "2021"];
const axles = ["4x2", "6x4", "8x4"];
const ownerships = ["Owned", "Leased"];


export default function AddVehicleModal({ open, handleClose }) {
  const [step, setStep] =useState(1);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: 560,
          borderRadius: "20px",
          overflow: "hidden",
         background: "var(--bgCard)",
border: "1px solid var(--border)",
color: "var(--text)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        },
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
borderBottom: "1px solid var(--border)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <DirectionsBusIcon sx={{ color: "#4F8CFF", fontSize: 22 }} />

          <Typography
            variant="h6"
            sx={{
           color: "var(--text)",
              fontWeight: 700,
            }}
          >
            Add Vehicle – Step 1/2
          </Typography>
        </Box>

        <IconButton size="small" onClick={handleClose}>
          <CloseIcon sx={{ color: "#f5f5f5" }} />
        </IconButton>
      </Box>

      {/* BODY */}
   <DialogContent sx={{ px: 3, py: 3, background: "var(--bg)" }}>
  {/* STEP 1 */}
  {step === 1 && (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={4}>
        <FieldLabel label="REG NO *" />
        <StyledTextField placeholder="TN69 GH1234" />
      </Grid>

      <Grid item xs={12} md={4}>
        <FieldLabel label="MAKE" />

        <StyledTextField select defaultValue="Tata">
          {vehicleMakes.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>

      <Grid item xs={12} md={4}>
        <FieldLabel label="MODEL" />
        <StyledTextField placeholder="LPT 2518" />
      </Grid>

      <Grid item xs={12} md={3}>
        <FieldLabel label="YEAR" />

        <StyledTextField select defaultValue="2023">
          {years.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>

      <Grid item xs={12} md={3}>
        <FieldLabel label="AXLE" />

        <StyledTextField select defaultValue="6x4">
          {axles.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>

      <Grid item xs={12} md={3}>
        <FieldLabel label="GVW (T)" />
        <StyledTextField placeholder="25" />
      </Grid>

      <Grid item xs={12} md={3}>
        <FieldLabel label="OWNERSHIP" />

        <StyledTextField select defaultValue="Owned">
          {ownerships.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>
    </Grid>
  )}

  {/* STEP 2 */}
  {step === 2 && (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={6}>
        <FieldLabel label="PERMIT TYPE" />
        <StyledTextField placeholder="Saran Kumar" />
      </Grid>

      <Grid item xs={12} md={6}>
        <FieldLabel label="PURCHASE TYPE" />
        <StyledTextField placeholder="+91 9876543210" />
      </Grid>

      <Grid item xs={12} md={6}>
        <FieldLabel label="INSURANCE EXPIRY" />
        <StyledTextField type="date" />
      </Grid>

      <Grid item xs={12} md={6}>
        <FieldLabel label="FC EXPIRY" />
        <StyledTextField type="date" />
      </Grid>
    </Grid>
  )}

  {/* FOOTER */}
  <Box
    sx={{
      mt: 4,
      pt: 2,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Button
      variant="outlined"
      onClick={() => {
        if (step === 1) {
          handleClose();
        } else {
          setStep(1);
        }
      }}
      sx={{
        textTransform: "none",
       color: "var(--text)",
borderColor: "var(--border)",
background: "var(--bgPanel)",
        borderRadius: "12px",
      }}
    >
      {step === 1 ? "Cancel" : "Back"}
    </Button>

    <Button
      variant="contained"
      onClick={() => {
        if (step === 1) {
          setStep(2);
        } else {
          console.log("Submit Form");
          handleClose();
        }
      }}
      sx={{
        textTransform: "none",
        background: "var(--accent)",
        color: "#fff",
        borderRadius: "12px",
        fontWeight: 700,
        "&:hover": {
          background: "#FFCA28",
        },
      }}
    >
      {step === 1 ? "Next →" : "Submit"}
    </Button>
  </Box>
</DialogContent>
    </Dialog>
  );
}

/* ---------- LABEL ---------- */

function FieldLabel({ label }) {
  return (
    <InputLabel
      sx={{
        mb: 1,
       color: "var(--muted)",
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      {label}
    </InputLabel>
  );
}

/* ---------- INPUT ---------- */

function StyledTextField(props) {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      {...props}
     sx={{
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "var(--bgPanel)",
    color: "var(--text)",
    height: 48,

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

  "& .MuiSelect-icon": {
    color: "var(--muted)",
  },

  "& input": {
    color: "var(--text)",
  },

  "& input::placeholder": {
    color: "var(--muted)",
    opacity: 1,
  },
}}
    />
  );
}
