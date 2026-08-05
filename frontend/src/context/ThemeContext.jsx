import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

export const useColorMode = () => useContext(ColorModeContext);

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("eps_theme_mode");
    return savedMode || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("eps_theme_mode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary: {
                  main: "#6366f1",
                  light: "#818cf8",
                  dark: "#4f46e5",
                },
                secondary: {
                  main: "#ec4899",
                },
                background: {
                  default: "#0b0f19",
                  paper: "#131b2e",
                },
                text: {
                  primary: "#f8fafc",
                  secondary: "#94a3b8",
                },
              }
            : {
                primary: {
                  main: "#4f46e5",
                  light: "#6366f1",
                  dark: "#4338ca",
                },
                secondary: {
                  main: "#db2777",
                },
                background: {
                  default: "#f8fafc",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#0f172a",
                  secondary: "#475569",
                },
              }),
        },
        typography: {
          fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
          h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
          },
          h5: {
            fontWeight: 600,
            letterSpacing: "-0.01em",
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 16,
                border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: mode === "dark" ? "0 10px 30px -5px rgba(0, 0, 0, 0.5)" : "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(12px)",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                padding: "8px 20px",
                fontWeight: 600,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.3)",
                  transform: "translateY(-1px)",
                },
              },
              containedPrimary: {
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                  transition: "all 0.2s ease",
                  "&:hover fieldset": {
                    borderColor: "#6366f1",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                    borderWidth: 2,
                  },
                },
              },
            },
          },
          MuiDataGrid: {
            styleOverrides: {
              root: {
                border: "none",
                borderRadius: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                "& .MuiDataGrid-cell": {
                  borderBottom: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(226, 232, 240, 0.6)",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: mode === "dark" ? "rgba(30, 41, 59, 0.8)" : "#f1f5f9",
                  borderBottom: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(226, 232, 240, 1)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: mode === "dark" ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.04)",
                },
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 20,
                padding: 12,
                border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
