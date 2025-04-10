"use client";
import { Box, CircularProgress, Backdrop } from "@mui/material";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import "./globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/custom/NavBar";
import { ThemeProvider } from '../context/ThemeContext';
import { LoadingProvider } from '../context/LoadingContext'; // Mover LoadingProvider a un archivo separado

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Manejar la autenticación
  React.useEffect(() => {
    if (!authLoading) {
      const isAuthPath = pathname.startsWith('/auth');
      const isPublicPath = pathname === '/' || pathname === '/dashboard';

      if (!isAuthenticated && !isAuthPath && !isPublicPath) {
        router.push('/auth/login');
      } else if (isAuthenticated && isAuthPath) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, authLoading, pathname, router]);

  // Si estamos cargando la autenticación
  if (authLoading) {
    return (
      <html lang="es">
        <body>
          <ThemeProvider>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
              <CircularProgress />
            </Box>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  // Si estamos en una ruta de autenticación
  if (pathname.includes("/auth")) {
    return (
          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
    );
  }

  // Layout principal
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <CssBaseline />
          <LoadingProvider>
            <Box 
              // sx={{ 
              //   display: 'flex', 
              //   flexDirection: 'column',
              //   minHeight: '100vh',
              //   margin: 0,
              //   padding: 0,
              //   overflow: 'hidden'
              // }}
            >
              <NavBar />
              <Box 
                component="main" 
                // sx={{ 
                //    flexGrow: 1,
                //   marginTop: '64px', // altura del NavBar
                //   padding: 0,
                //   overflow: 'auto',
                //   height: 'calc(100vh - 64px)'
                // }}
              >
                {children}
              </Box>
            </Box>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
