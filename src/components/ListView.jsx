"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export const ListView = ({ title, children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  // Clonar los children y pasar searchTerm como prop sólo a componentes React, no a elementos DOM
  const childrenWithProps = React.Children.map(children, (child) => {
    // Verificar si el child es un elemento válido de React y NO es un elemento DOM nativo
    if (React.isValidElement(child) && typeof child.type !== "string") {
      return React.cloneElement(child, { searchTerm });
    }
    return child;
  });

  return (
    <Box
      // bgcolor={"#fff"}
      m={{ xs: "5px", md: "30px" }}
      p="20px"
      // boxShadow={3}
      borderRadius="8px"
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              position: 'relative',
              fontWeight: 700,
              color: theme.palette.primary.main,
              letterSpacing: '0.5px',
              display: 'inline-block',
              pb: 1,
              my: 2,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40%',
                height: '2px',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '2px',
                transition: 'width 0.3s ease',
                opacity: 0.7,
              },
              '&:hover::after': {
                width: '100%',
              }
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs />
        <Grid item>
          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Link href={`${pathname}/registrar`}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 1, marginLeft: 1 }}
              startIcon={<AddIcon />}
            >
              Registrar
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<KeyboardReturnIcon />}
            onClick={() => router.back()}
          >
            Regresar
          </Button>
        </Grid>
      </Grid>
      {/* <Divider sx={{ my: 2 }} /> */}
      {childrenWithProps}
    </Box>
  );
};

export default ListView;
