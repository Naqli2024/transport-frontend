import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const driverData = {
  name: "Arjun D",
  id: "DRV-004",
  license: "—",
  phone: "+91 65432 10987",
  experience: "—",
  status: "Available",
  vehicle: "Unassigned",
  trips: "28",
  score: "94%",
};

const rows = [
  { label: "ID", value: driverData.id },
  { label: "License No", value: driverData.license },
  { label: "Phone", value: driverData.phone },
  { label: "Experience", value: driverData.experience },
  { label: "Status", value: driverData.status },
  { label: "Current Vehicle", value: driverData.vehicle },
  { label: "Total Trips", value: driverData.trips },
  { label: "Performance Score", value: driverData.score },
];

export default function DriverDetailsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", sm: 480 },
          bgcolor: "#071327",
          borderRadius: "18px",
          overflow: "hidden",
          border: "1px solid rgba(80,120,255,0.18)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#f4f7ff",
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            {driverData.name}
          </Typography>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.5)",
              "&:hover": {
                color: "#fff",
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box sx={{ px: 3 }}>
          {rows.map((row, index) => (
            <Box key={row.label}>
              <Box
                sx={{
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#8ea4c7",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {row.label}
                </Typography>

                <Typography
                  sx={{
                    color: "#f3f6ff",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {row.value}
                </Typography>
              </Box>

              {index !== rows.length - 1 && (
                <Divider
                  sx={{
                    borderColor: "rgba(255,255,255,0.05)",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            px: 3,
            py: 3,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: "none",
              color: "#a5b4d6",
              borderColor: "rgba(255,255,255,0.12)",
              px: 3,
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#5ea2ff",
                background: "rgba(94,162,255,0.05)",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}