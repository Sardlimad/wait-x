import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
// import { useAuth } from "../helpers/AuthProvider";

import Link from "next/link";

//material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import RouteIcon from "@mui/icons-material/Route";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaceIcon from '@mui/icons-material/Place';

export const MyDrawer = ({ open, toggleDrawer }) => {
  // const { authData } = useAuth();
  const theme = useTheme();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    {
      key: 0,
      name: "Inicio",
      route: "/",
      icon: <HomeIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      key: 2,
      name: "Inscripciones",
      route: "/rutas",
      icon: <FactCheckIcon sx={{ color: theme.palette.primary.main }} />,
      subItems: [
        {
          key: 0,
          name: "Regulares",
          route: "/inscripciones/regulares",
        },
        {
          key: 1,
          name: "Priorizadas",
          route: "/inscripciones/priorizadas",
        },
      ],
    },
    {
      key: 1,
      name: "Clientes",
      route: "/clientes",
      icon: <PeopleIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      key: 3,
      name: "Rutas",
      route: "/rutas",
      icon: <RouteIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      key: 4,
      name: "Localidades",
      route: "/localidades",
      icon: <PlaceIcon sx={{ color: theme.palette.primary.main }} />,
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          borderRadius: "0 8px 8px 0",
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box
        sx={{
          width: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          textAlign: "center",
        }}
        role="presentation"
      >
        <AccountCircleIcon
          sx={{
            width: 90,
            height: 90,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.dark,
            mb: 1,
          }}
        >
          {/* {authData.username} */}
        </Typography>
        <Divider sx={{ width: "80%", my: 2 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          >
            Menú Principal
          </Typography>
        </Divider>
        <List sx={{ width: "100%", bgcolor: theme.palette.background.paper }}>
          {options.map((option) => (
            <React.Fragment key={option.key}>
              {option.subItems ? (
                <>
                  <ListItemButton onClick={() => handleToggle(option.key)}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.name} />
                    {openMenus[option.key] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={openMenus[option.key]}
                    timeout="auto"
                    unmountOnExit
                    // sx={{pl: 10}}
                  >
                    <List component="div">
                      {option.subItems.map((subItem) => (
                        <Link key={subItem.key} href={subItem.route}>
                          <ListItemButton
                            key={subItem.key}
                            // href={subItem.route}
                            sx={{ pl: 6 }}
                            onClick={toggleDrawer(false)}
                          >
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: 8, color: "gray" }}
                              />
                            </ListItemIcon>
                            <ListItemText primary={subItem.name} />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link href={option.route}>
                  <ListItemButton
                    // href={option.route}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.name} />
                  </ListItemButton>
                </Link>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
