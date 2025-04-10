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
import { useRouter } from "next/navigation";
import { useLoading } from "../../app/layout";

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
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { styled } from '@mui/material/styles';
import { APP_NAME } from "../../settings/settings";

// Actualiza el StyledDrawer
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? '#1a1a1a' 
      : 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.5)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 24px 24px 0',
    width: 300,
  },
}));

// Agrega estos estilos personalizados para los items
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 12px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateX(4px)',
  },
}));

export const MyDrawer = ({ open, toggleDrawer }) => {
  // const { authData } = useAuth();
  const theme = useTheme();
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (route) => {
    setIsLoading(true);
    toggleDrawer(false)();
    router.push(route);
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
    // {
    //   key: 4,
    //   name: "Localidades",
    //   route: "/localidades",
    //   icon: <PlaceIcon sx={{ color: theme.palette.primary.main }} />,
    // },
    // {
    //   key: 5,
    //   name: "Fallos",
    //   route: "/fallos",
    //   icon: <AssignmentLateIcon sx={{ color: theme.palette.primary.main }} />,
    // },
  ];

  return (
    <StyledDrawer
      open={open}
      onClose={toggleDrawer(false)}
    >
      <Box
        sx={{
          width: '100%',
          pt: 2,
          pb: 4,
          px: 3,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.98) 100%)',
        }}
        role="presentation"
      >
        {/* Logo y nombre de la app */}
        <Box sx={{ 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #304FFE, #0026CA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            {APP_NAME.SHORT}
          </Typography>
          
          {/* Línea decorativa */}
          <Box sx={{
            width: '60%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #304FFE, transparent)',
            borderRadius: '2px',
            mb: 3
          }} />

          {/* Indicador de estado del sistema */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            borderRadius: '20px',
            py: 1,
            px: 2,
          }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#4CAF50',
                boxShadow: '0 0 10px #4CAF50'
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
                fontWeight: 500,
              }}
            >
              Sistema Activo
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ 
          my: 2,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)'
        }} />

        {/* Lista de opciones del menú */}
        <List sx={{ 
          width: "100%", 
          bgcolor: 'transparent',
          '& .MuiListItemIcon-root': {
            minWidth: 40
          }
        }}>
          {options.map((option) => (
            <React.Fragment key={option.key}>
              {option.subItems ? (
                <>
                  <StyledListItemButton onClick={() => handleToggle(option.key)} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.name} />
                    {openMenus[option.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </StyledListItemButton>
                  <Collapse in={openMenus[option.key]} timeout="auto" unmountOnExit>
                    <List component="div">
                      {option.subItems.map((subItem) => (
                        <StyledListItemButton
                          key={subItem.key}
                          sx={{ pl: 6, '&:hover': { backgroundColor: theme.palette.action.hover } }}
                          onClick={() => handleNavigation(subItem.route)}
                        >
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <FiberManualRecordIcon sx={{ fontSize: 8, color: "gray" }} />
                          </ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </StyledListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <StyledListItemButton
                  onClick={() => handleNavigation(option.route)}
                  sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.name} />
                </StyledListItemButton>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </StyledDrawer>
  );
};
