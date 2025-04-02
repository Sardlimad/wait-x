import { createTheme } from "@mui/material/styles";

// Tema empresarial para agencia de transporte
// Paleta: Azules, blancos y grises
const transportTheme = createTheme({
  palette: {
    primary: {
      main: "#1e4d8c", // Azul corporativo oscuro
      light: "#4c77ba",
      dark: "#002760",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3878d1", // Azul medio (para acentos)
      light: "#6ca6ff",
      dark: "#004e9f",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1", // Azul informativo
      light: "#5eb8ff",
      dark: "#005b9f",
    },
    success: {
      main: "#2e7d32", // Verde (para confirmaciones)
      light: "#60ad5e",
      dark: "#005005",
    },
    error: {
      main: "#d32f2f", // Rojo (para errores/alertas)
      light: "#ff6659",
      dark: "#9a0007",
    },
    warning: {
      main: "#ed6c02", // Naranja (para advertencias)
      light: "#ff9d3f",
      dark: "#b53d00",
    },
    background: {
      default: "#f5f7fa", // Fondo principal gris muy claro
      paper: "#ffffff", // Fondo de componentes blanco
    },
    text: {
      primary: "#2c3e50", // Texto principal azul oscuro
      secondary: "#546e7a", // Texto secundario gris azulado
      disabled: "#90a4ae", // Texto deshabilitado gris claro
    },
    divider: "rgba(0, 0, 0, 0.08)", // Divisores sutiles
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.00833em",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.00735em",
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.0075em",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.00938em",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      letterSpacing: "0.01071em",
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0.00938em",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.00714em",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      letterSpacing: "0.02857em",
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.03333em",
      lineHeight: 1.5,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.08333em",
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#9e9e9e",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
          boxShadow: "0 2px 4px rgba(30, 77, 140, 0.1)",
          transition: "all 0.2s ease-in-out",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(30, 77, 140, 0.2)",
          },
        },
        containedPrimary: {
          backgroundImage: "linear-gradient(135deg, #1e4d8c 0%, #2a5da3 100%)",
        },
        containedSecondary: {
          backgroundImage: "linear-gradient(135deg, #3878d1 0%, #4b89de 100%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
        },
        elevation1: {
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.06)",
        },
        elevation2: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.08), 0 0 2px rgba(0, 0, 0, 0.10)",
        },
        elevation4: {
          boxShadow: "0 8px 12px rgba(0, 0, 0, 0.10), 0 0 3px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(90deg, #1e4d8c 0%, #2a5da3 100%)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(0, 0, 0, 0.04)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 20px",
        },
        title: {
          fontSize: "1.125rem",
          fontWeight: 600,
        },
        subheader: {
          fontSize: "0.875rem",
          color: "#546e7a",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "20px",
          "&:last-child": {
            paddingBottom: "20px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            transition: "background-color 0.2s ease",
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(56, 120, 209, 0.12)",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 16px",
          borderColor: "rgba(0, 0, 0, 0.08)",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "#f5f7fa",
          color: "#2c3e50",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
          "&:hover": {
            backgroundColor: "rgba(30, 77, 140, 0.02)",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
        indicator: {
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 16px",
          minWidth: 100,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "&.Mui-selected": {
            backgroundColor: "rgba(30, 77, 140, 0.08)",
            "&:hover": {
              backgroundColor: "rgba(30, 77, 140, 0.12)",
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

export default transportTheme; 