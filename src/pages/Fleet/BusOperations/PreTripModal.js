import React, { useState, useMemo } from "react";

import {
  Box,
  Modal,
  Typography,
  IconButton,
  LinearProgress,
  Button,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const CHECKLIST = [
  {
    category: "Safety Critical",
    icon: "🚨",
    color: "var(--red)",

    items: [
      {
        label: "Brake system — foot + hand",
        checked: true,
        critical: true,
      },

      {
        label: "Tyre pressure all 6 wheels",
        checked: false,
        critical: true,
      },

      {
        label: "Tyre tread & sidewall condition",
        checked: false,
        critical: true,
      },

      {
        label: "All passenger doors open/close",
        checked: true,
        critical: true,
      },

      {
        label: "Emergency exit — clear & marked",
        checked: true,
        critical: true,
      },

      {
        label: "Fire extinguisher — charged",
        checked: true,
        critical: true,
      },

      {
        label: "First aid kit — complete",
        checked: true,
        critical: true,
      },

      {
        label: "Sample seat belt test (3 seats)",
        checked: false,
        critical: true,
      },
    ],
  },

  {
    category: "Electrical & Lights",
    icon: "⚡",
    color: "var(--accent)",

    items: [
      {
        label: "Headlights + high beam",
        checked: false,
        critical: true,
      },

      {
        label: "Indicators (all 4)",
        checked: false,
        critical: true,
      },

      {
        label: "Brake lights",
        checked: false,
        critical: true,
      },

      {
        label: "Horn",
        checked: false,
        critical: false,
      },

      {
        label: "Windshield wipers",
        checked: false,
        critical: false,
      },
    ],
  },
];

function CheckRow({ item, onToggle }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        p: 1.5,
        mb: 1,

        borderRadius: "14px",

        border: item.checked
          ? "1px solid rgba(16,185,129,0.35)"
          : "1px solid var(--border)",

        background: item.checked
          ? "var(--greenGlow)"
          : "var(--bgPanel)",

        cursor: "pointer",

        transition: "all 0.2s ease",

        "&:hover": {
          borderColor: "var(--accent)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* CHECKBOX */}
        <Box
          sx={{
            width: 28,
            height: 28,

            borderRadius: "9px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            border: item.checked
              ? "1px solid var(--green)"
              : "1px solid var(--borderHi)",

            background: item.checked
              ? "var(--green)"
              : "transparent",

            transition: "0.2s ease",
          }}
        >
          {item.checked && (
            <CheckIcon
              sx={{
                fontSize: 18,
                color: "#000",
              }}
            />
          )}
        </Box>

        {/* LABEL */}
        <Typography
          sx={{
            fontSize: 14,

            fontWeight: item.checked ? 700 : 500,

            color: item.checked
              ? "var(--text)"
              : "var(--textSub)",
          }}
        >
          {item.label}
        </Typography>
      </Box>

      {/* RIGHT */}
      {item.critical && (
        <Box
          sx={{
            px: 1,
            py: 0.4,

            borderRadius: "6px",

            background: "var(--redGlow)",

            border:
              "1px solid rgba(239,68,68,0.35)",
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,

              color: "var(--red)",
            }}
          >
            CRITICAL
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function SafetyChecklistModal({
  open = true,
  onClose,
}) {
  const isLight =
    document.documentElement.dataset.theme === "light";

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isLight ? "light" : "dark",
        },
      }),
    [isLight]
  );

  const [data, setData] = useState(CHECKLIST);

  const allItems = data.flatMap((c) => c.items);

  const checkedCount = allItems.filter(
    (i) => i.checked
  ).length;

  const totalCount = allItems.length;

  const remainingCritical = allItems.filter(
    (i) => i.critical && !i.checked
  ).length;

  const progress =
    (checkedCount / totalCount) * 100;

  const toggleItem = (catIndex, itemIndex) => {
    const cloned = [...data];

    cloned[catIndex].items[itemIndex].checked =
      !cloned[catIndex].items[itemIndex].checked;

    setData(cloned);
  };

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
              sm: 520,
            },

            maxHeight: "92vh",

            overflow: "hidden",

            borderRadius: "22px",

            background: "var(--bgCard)",

            border: "1px solid var(--border)",

            boxShadow: isLight
              ? "0 20px 60px rgba(0,0,0,0.08)"
              : "0 30px 80px rgba(0,0,0,0.55)",

            color: "var(--text)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 2.5,

              borderBottom:
                "1px solid var(--border)",

              background:
                "linear-gradient(180deg, var(--greenGlow) 0%, transparent 100%)",
            }}
          >
            {/* TOP */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 24,
                    },

                    fontWeight: 800,

                    color: "var(--green)",

                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  🔍 Pre-Trip Safety Check —
                  TN22JJ7890
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,

                    fontSize: 13,

                    color: "var(--textMuted)",

                    fontWeight: 600,
                  }}
                >
                  28 checks across 4 categories ·
                  All Safety Critical items must
                  pass
                </Typography>
              </Box>

              <IconButton
                onClick={onClose}
                sx={{
                  color: "var(--textMuted)",

                  background: "var(--bgPanel)",

                  "&:hover": {
                    background:
                      "var(--accentDim)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* PROGRESS */}
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  mb: 0.7,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "var(--textMuted)",
                  }}
                >
                  Progress
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,

                    color: "var(--textMuted)",

                    fontWeight: 700,
                  }}
                >
                  {checkedCount}/{totalCount}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,

                  borderRadius: 20,

                  background:
                    "rgba(255,255,255,0.08)",

                  "& .MuiLinearProgress-bar": {
                    borderRadius: 20,

                    background:
                      "linear-gradient(90deg,var(--blue),var(--cyan))",
                  },
                }}
              />
            </Box>
          </Box>

          {/* BODY */}
          <Box
            sx={{
              p: 2,

              maxHeight: "60vh",

              overflowY: "auto",

              "&::-webkit-scrollbar": {
                width: 6,
              },

              "&::-webkit-scrollbar-thumb": {
                background:
                  "rgba(255,255,255,0.1)",

                borderRadius: 20,
              },
            }}
          >
            {data.map((category, catIndex) => {
              const passed = category.items.filter(
                (i) => i.checked
              ).length;

              return (
                <Box
                  key={category.category}
                  sx={{ mb: 3 }}
                >
                  {/* CATEGORY HEADER */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",

                      justifyContent:
                        "space-between",

                      mb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,

                        fontWeight: 800,

                        color: category.color,

                        display: "flex",
                        alignItems: "center",

                        gap: 1,
                      }}
                    >
                      {category.icon}
                      {category.category}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,

                        color:
                          "var(--textMuted)",

                        fontWeight: 700,
                      }}
                    >
                      {passed}/
                      {category.items.length}{" "}
                      passed
                    </Typography>
                  </Box>

                  {/* CATEGORY BAR */}
                  <Box
                    sx={{
                      height: 3,

                      borderRadius: 20,

                      background:
                        "rgba(255,255,255,0.06)",

                      mb: 1.8,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${
                          (passed /
                            category.items
                              .length) *
                          100
                        }%`,

                        height: "100%",

                        borderRadius: 20,

                        background:
                          category.color,
                      }}
                    />
                  </Box>

                  {/* ITEMS */}
                  {category.items.map(
                    (item, itemIndex) => (
                      <CheckRow
                        key={item.label}
                        item={item}
                        onToggle={() =>
                          toggleItem(
                            catIndex,
                            itemIndex
                          )
                        }
                      />
                    )
                  )}
                </Box>
              );
            })}
          </Box>

          {/* FOOTER */}
          <Box
            sx={{
              p: 2,

              borderTop:
                "1px solid var(--border)",

              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",

              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)",
            }}
          >
            {/* LEFT */}
            <Typography
              sx={{
                fontSize: 13,

                color: "var(--red)",

                fontWeight: 700,
              }}
            >
              ● {remainingCritical} critical
              checks remaining
            </Typography>

            {/* RIGHT */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {/* CANCEL */}
              <Button
                variant="outlined"
                sx={{
                  borderColor:
                    "var(--borderHi)",

                  color: "var(--text)",

                  "&:hover": {
                    borderColor:
                      "var(--accent)",

                    background:
                      "var(--accentDim)",
                  },
                }}
              >
                Cancel
              </Button>

              {/* SUBMIT */}
              <Button
                variant="contained"
                disabled={
                  remainingCritical > 0
                }
                sx={{
                  background:
                    "linear-gradient(135deg,var(--green),var(--blue))",

                  color: "#fff",

                  fontWeight: 800,

                  "&:hover": {
                    opacity: 0.92,
                  },

                  "&.Mui-disabled": {
                    background:
                      "rgba(255,255,255,0.08)",

                    color:
                      "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Submit Check ✓
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}