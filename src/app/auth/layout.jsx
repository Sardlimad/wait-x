"use client";
import { Inter } from 'next/font/google';
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import businessTheme from "../../themes/bussiness_theme";

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Autenticación - WaitX',
//   description: 'Página de autenticación para WaitX',
// };

export default function AuthLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider theme={businessTheme}>
          <CssBaseline />
          <Box 
            sx={{ 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              p: 2
            }}
          >
            <Box 
              sx={{ 
                width: '100%',
                maxWidth: 400,
                textAlign: 'center',
                mb: 4
              }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900">
                Bienvenido a WaitX
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sistema de Gestión de Lista de Espera
              </p>
            </Box>

            <Box 
              sx={{ 
                width: '100%',
                maxWidth: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                p: 4
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
