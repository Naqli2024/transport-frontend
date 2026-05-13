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

const years = ["2023", "2022", "2021"];

export default function AddVehicleModal({
  open,
  handleClose,
}) {
  const [step, setStep] = useState(1);

  const isLight =
    document.documentElement.getAttribute(
      "data-theme"
    ) === "light";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: 560,

          borderRadius: "24px",

          overflow: "hidden",

          background: "var(--bgCard)",

          border:
            "1px solid var(--border)",

          boxShadow: isLight
            ? "0 20px 60px rgba(0,0,0,0.08)"
            : "0 20px 60px rgba(0,0,0,0.6)",
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

          justifyContent:
            "space-between",

          background: isLight
            ? "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(99,102,241,0.04))"
            : "linear-gradient(135deg, #0c1220, #1e3a5f)",

          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <DirectionsBusIcon
            sx={{
              color: "var(--blue)",
              fontSize: 22,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "var(--text)",

              fontWeight: 700,
            }}
          >
            Add Driver – Step {step}/2
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={handleClose}
        >
          <CloseIcon
            sx={{
              color: "var(--textSub)",
            }}
          />
        </IconButton>
      </Box>

      {/* BODY */}
      <DialogContent
        sx={{
          px: 3,
          py: 3,

          background: "var(--bgPanel)",
        }}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <FieldLabel label="FULL NAME" />

              <StyledTextField placeholder="Driver full name" />
            </Grid>

            <Grid item xs={12} md={6}>
              <FieldLabel label="AADHAAR NUMBER" />

              <StyledTextField placeholder="XXXX XXXX 1234" />
            </Grid>

            <Grid item xs={12} md={6}>
              <FieldLabel label="EXPERIENCE YEAR" />

              <StyledTextField
                select
                defaultValue="2023"
              >
                {years.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
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
              <FieldLabel label="DL NUMBER" />

              <StyledTextField />
            </Grid>

            <Grid item xs={12} md={6}>
              <FieldLabel label="DL CLASS" />

              <StyledTextField placeholder="PSV / HMV" />
            </Grid>

            <Grid item xs={12} md={6}>
              <FieldLabel label="LICENSE EXPIRY" />

              <StyledTextField type="date" />
            </Grid>
          </Grid>
        )}

        {/* FOOTER */}
        <Box
          sx={{
            mt: 4,
            pt: 2,

            borderTop:
              "1px solid var(--border)",

            display: "flex",

            justifyContent:
              "space-between",
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

              color: "var(--textSub)",

              borderColor:
                "var(--borderHi)",

              borderRadius: "12px",

              px: 3,

              "&:hover": {
                borderColor:
                  "var(--blue)",

                background:
                  "var(--blueGlow)",
              },
            }}
          >
            {step === 1
              ? "Cancel"
              : "Back"}
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                console.log("Submit");

                handleClose();
              }
            }}
            sx={{
              textTransform: "none",

              background:
                "var(--accent)",

              color: "#111",

              borderRadius: "12px",

              px: 3,

              fontWeight: 700,

              boxShadow:
                "0 10px 30px var(--accentGlow)",

              "&:hover": {
                background:
                  "var(--accentSoft)",
              },
            }}
          >
            {step === 1
              ? "Next →"
              : "Submit"}
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

        color: "var(--textSub)",

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
          borderRadius: "14px",

          backgroundColor: "var(--bgPanel)",

          color: "var(--text)",

          height: 48,

          "& fieldset": {
            borderColor: "var(--border)",
          },

          "&:hover fieldset": {
            borderColor: "var(--blue)",
          },

          "&.Mui-focused fieldset": {
            borderColor: "var(--blue)",
          },
        },

        "& .MuiInputBase-input": {
          color: "var(--text)",
        },

        "& .MuiSelect-icon": {
          color: "var(--textSub)",
        },

        "& input::placeholder": {
          color: "var(--textMuted)",
          opacity: 1,
        },
      }}
    />
  );
}