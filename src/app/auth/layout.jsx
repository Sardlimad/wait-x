"use client";
import { Inter } from "next/font/google";
import { Box, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import businessTheme from "../../themes/bussiness_theme";
import { APP_NAME } from "../../settings/settings";

const inter = Inter({ subsets: ["latin"] });

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
              // minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              py: 4,
            }}
          >
            <Container maxWidth="sm">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 4,
                  mt: 10
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                  }}
                >
                  Bienvenido a {APP_NAME.SHORT}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                >
                  {APP_NAME.LARGE}
                </Typography>
              </Box>

              {children}
            </Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
