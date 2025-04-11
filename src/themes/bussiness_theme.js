import { createTheme, alpha } from "@mui/material/styles";

const businessTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#4e50a7",
      light: "#7f81d9",
      dark: "#1e2377",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1",
      light: "#5eb8ff",
      dark: "#005b9f",
    },
    success: {
      main: "#2e7d32",
      light: "#60ad5e",
      dark: "#005005",
    },
    error: {
      main: "#d32f2f",
      light: "#ff6659",
      dark: "#9a0007",
    },
    warning: {
      main: "#ed6c02",
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
  },
});

export const getThemeWithMode = (mode) => {
  return createTheme({
    ...businessTheme,
    palette: {
      ...businessTheme.palette,
      mode,
      background: {
        default: businessTheme.palette.background.default[mode],
        paper: businessTheme.palette.background.paper[mode]
      },
      text: {
        primary: businessTheme.palette.text.primary[mode],
        secondary: businessTheme.palette.text.secondary[mode],
        disabled: businessTheme.palette.text.disabled[mode]
      },
      divider: businessTheme.palette.divider[mode]
    }
  });
};

export default businessTheme;