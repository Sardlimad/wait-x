"use client";
import { Box } from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";

//styles
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import businessTheme from "../themes/bussiness_theme";

//material ui components
import NavBar from "../components/custom/NavBar";

export const MainLayout = ({ children }) => {
  const pathname = usePathname(); // Obtiene la URL actual

  // Si estamos en la página de login, no usamos el layout
  if (pathname.includes("/auth")) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={businessTheme}>
          <CssBaseline /> {/* Aplica los estilos base de Material UI */}
          <Box>
            <NavBar />
            <Box>
              {children} {/* Aquí va toda tu aplicación */}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default MainLayout;
