import { createTheme, alpha } from "@mui/material/styles";

// Tema empresarial para agencia de transporte
// Paleta: Azules, blancos y grises
const transportTheme = createTheme({
  palette: {
    mode: 'light', // esto será cambiado por el ThemeContext
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
      default: {
        light: '#f5f7fa',
        dark: '#121212'
      },
      paper: {
        light: '#ffffff',
        dark: '#1e1e1e'
      }
    },
    text: {
      primary: {
        light: '#2c3e50',
        dark: '#e0e0e0'
      },
      secondary: {
        light: '#546e7a',
        dark: '#a0a0a0'
      },
      disabled: {
        light: '#90a4ae',
        dark: '#6c6c6c'
      }
    },
    divider: {
      light: 'rgba(0, 0, 0, 0.08)',
      dark: 'rgba(255, 255, 255, 0.08)'
    }
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
      borderRadius: 50,
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
        body: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f7fa',
          color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#2c3e50',
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f1f1f1',
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#bdbdbd',
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.mode === 'dark' ? '#616161' : '#9e9e9e',
          },
        }),
      },
    },
    MuiBox: {
      variants: [
        {
          props: { variant: 'listView' },
          style: {
            margin: { xs: '5px', md: '30px' },
            padding: '20px',
            borderRadius: '8px',
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 40,
          minWidth: 120,
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: ({ theme }) => 
              `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        },
        containedPrimary: {
          background: ({ theme }) => theme.palette.mode === 'dark' 
            ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`
            : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: ({ theme }) => alpha(theme.palette.secondary.main, 0.05),
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.12)
            : theme.palette.background.paper,
          borderRadius: 10,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 2px 12px rgba(0, 0, 0, 0.2)'
            : '0 2px 12px rgba(0, 0, 0, 0.05)',
        }),
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
          backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.default, 0.9)
            : alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(8px)',
          borderBottom: ({ theme }) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: ({ theme }) => `0 1px 3px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.default, 0.95)
            : alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(10px)',
          borderRight: ({ theme }) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: ({ theme }) => theme.palette.mode === 'dark'
            ? '4px 0 24px rgba(0, 0, 0, 0.3)'
            : '4px 0 24px rgba(0, 0, 0, 0.1)',
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
            borderRadius: 8,
            backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.1)
              : alpha(theme.palette.background.paper, 0.8),
            "&:hover": {
              backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.15)
                : alpha(theme.palette.background.paper, 0.9),
            },
            "&.Mui-focused": {
              backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.2)
                : theme.palette.background.paper,
            },
          },
        },
      },
      variants: [
        {
          props: { variant: 'search' },
          style: {
            minWidth: 250,
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              backgroundColor: ({ theme }) => alpha(theme.palette.background.paper, 0.8),
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.1)
            : alpha(theme.palette.background.paper, 0.8),
          transition: 'all 0.2s ease',
          // Asegura que el borde sea visible siempre
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.divider, 0.3)
              : alpha(theme.palette.divider, 0.23),
            transition: 'border-color 0.2s ease'
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.15)
              : alpha(theme.palette.background.paper, 0.9),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.4)
                : alpha(theme.palette.primary.main, 0.3)
            }
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.2)
              : theme.palette.background.paper,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: 2
            }
          }
        })
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 16px",
          borderColor: "rgba(0, 0, 0, 0.08)",
          borderBottom: ({ theme }) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        },
        head: {
          fontWeight: 600,
          backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.15)
            : alpha(theme.palette.primary.main, 0.1),
          color: ({ theme }) => theme.palette.mode === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          margin: '4px 8px',
          borderRadius: 8,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: ({ theme }) => alpha(theme.palette.primary.main, 0.08),
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: ({ theme }) => alpha(theme.palette.primary.main, 0.12),
            '&:hover': {
              backgroundColor: ({ theme }) => alpha(theme.palette.primary.main, 0.16),
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: ({ theme }) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.2)
            : theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          borderRadius: 12,
          border: ({ theme }) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: ({ theme }) => theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: ({ theme }) => alpha(theme.palette.divider, 0.1),
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            backgroundColor: ({ theme }) => alpha(theme.palette.primary.main, 0.08),
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'listViewTitle' },
          style: {
            position: 'relative',
            fontWeight: 700,
            letterSpacing: '0.5px',
            display: 'inline-block',
            paddingBottom: 1,
            marginBlock: 2,
            color: ({ theme }) => theme.palette.primary.main,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '40%',
              height: '2px',
              backgroundColor: 'currentColor',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
              opacity: 0.7,
            },
            '&:hover::after': {
              width: '100%',
            },
          },
        },
      ],
    },
  },
});

// Función para modificar el tema según el modo
export const getThemeWithMode = (mode) => {
  return createTheme({
    ...transportTheme,
    palette: {
      ...transportTheme.palette,
      mode,
      background: {
        default: transportTheme.palette.background.default[mode],
        paper: transportTheme.palette.background.paper[mode]
      },
      text: {
        primary: transportTheme.palette.text.primary[mode],
        secondary: transportTheme.palette.text.secondary[mode],
        disabled: transportTheme.palette.text.disabled[mode]
      },
      divider: transportTheme.palette.divider[mode]
    }
  });
};

export default transportTheme;