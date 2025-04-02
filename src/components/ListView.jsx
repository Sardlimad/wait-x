"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export const ListView = ({ title, children }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

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
      bgcolor={"#fff"}
      m={{ xs: "5px", md: "30px" }}
      p="20px"
      boxShadow={3}
      borderRadius="8px"
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: "bold", color: "primary.main" }}
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
            href="/"
          >
            Regresar
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      {childrenWithProps}
    </Box>
  );
};

export default ListView;
