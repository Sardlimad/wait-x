"use client";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

//styles
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import transportTheme from "../themes/transport_theme";

//material ui components
import NavBar from "../components/custom/NavBar";

export const MainLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const isAuthPath = pathname.startsWith('/auth');
      const isPublicPath = pathname === '/' || pathname === '/dashboard';

      if (!isAuthenticated && !isAuthPath && !isPublicPath) {
        router.push('/auth/login');
      } else if (isAuthenticated && isAuthPath) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Si estamos en la página de login, no usamos el layout
  if (pathname.includes("/auth")) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <html lang="es">
        <body>
          <ThemeProvider theme={transportTheme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
              }}
            >
              <CircularProgress />
            </Box>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={transportTheme}>
          <CssBaseline />
          <Box>
            <NavBar />
            <Box>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default MainLayout;
