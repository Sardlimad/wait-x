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
import { APP_NAME } from '../../settings/settings';
import { MyDrawer } from './MyDrawer';
import AccountMenu from './AccountMenu';

export default function NavBar() {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    // const { authData } = useAuth();

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ borderRadius: "0px 0px 0px 0px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        {APP_NAME}
                    </Typography>
                    {/* <Typography fontWeight={"bold"} p={"10px"}>Hola, {authData.username}</Typography> */}
                    {/* <LogoutBtn /> */}
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <MyDrawer toggleDrawer={toggleDrawer} open={openDrawer} />
        </Box >
    );
}