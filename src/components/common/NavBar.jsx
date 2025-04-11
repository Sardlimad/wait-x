"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import LogoutBtn from './LogoutBtn';
// import { useAuth } from '../helpers/AuthProvider';
import { APP_NAME } from '../../config/settings';
import { MyDrawer } from './MyDrawer';
import AccountMenu from './AccountMenu';

import { styled, useTheme as useMuiTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext'; // Cambia esta importación
import { AppLogo } from './AppLogo';

// Estilizar el AppBar
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.default, 0.9)
    : alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(8px)',
  boxShadow: `0 1px 3px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  color: theme.palette.text.primary,
}));

// Estilizar el IconButton del menú
const MenuButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  }
}));

export default function NavBar() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const { mode } = useTheme(); // Usa el contexto personalizado
    const theme = useMuiTheme(); // Usa el tema de MUI

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="fixed">
                <Toolbar sx={{ 
                    height: '70px',
                    px: { xs: 2, sm: 4 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <MenuButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </MenuButton>
                        <AppLogo size={30}/> 
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                letterSpacing: '0.5px'
                            }}
                        >
                            {APP_NAME.SHORT}
                        </Typography>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2 
                    }}>
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <Toolbar /> {/* Espaciador para el AppBar fijo */}
            <MyDrawer toggleDrawer={toggleDrawer} open={openDrawer} />
        </Box >
    );
}