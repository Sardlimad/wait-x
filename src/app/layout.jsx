"use client";
import { Box, CircularProgress, Backdrop } from "@mui/material";
import React, { useEffect, useState, createContext, useContext } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

//styles
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import transportTheme from "../themes/transport_theme";

//material ui components
import NavBar from "../components/custom/NavBar";

// Loading Context
const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {}
});

export const useLoading = () => useContext(LoadingContext);

// Loading Provider Component
const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset loading state on route change
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const MainLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
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

  // Si estamos en la página de login, no usamos el layout
  if (pathname.includes("/auth")) {
    return <>{children}</>;
  }

  if (authLoading) {
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
          <LoadingProvider>
            <Box>
              <NavBar />
              <Box>
                {children}
              </Box>
            </Box>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default MainLayout;
