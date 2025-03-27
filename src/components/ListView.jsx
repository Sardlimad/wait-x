'use client'
import React from "react";
import { usePathname } from 'next/navigation';
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Link from "next/link";

export const ListView = ({ title, ResultTable }) => {
  const pathname = usePathname();
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
          <Typography fontWeight="bold">{title}</Typography>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Link href={`${pathname}/registrar`}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 1 }}
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
      {/* {<ResultTable />} */}
    </Box>
  );
};

export default ListView;
