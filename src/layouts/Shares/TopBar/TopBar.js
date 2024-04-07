import * as React from 'react';
import { styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Button} from "@mui/material";
import { Link } from "react-router-dom";
import {AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE} from "../../../const/SpotifyConst";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function TopBar({open, toggleDrawer}) {



    return (
        <>
            <AppBar position="absolute" open={open} >
                <Toolbar
                    sx={{
                        backgroundColor: 'black',
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                    
                    </Typography>
                    <Button
                        size="large"
                        sx={{
                            color : '#dadada',
                            borderRadius: '20px',
                            ':hover': {
                                backgroundColor: 'black',
                                color: 'white',
                            }
                        }}
                        variant="text">
                        Đăng ký
                    </Button>
                    <Link to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        <Button
                            size="large"
                            sx={{   borderRadius: '20px',
                                backgroundColor: 'white',
                                color: "black",
                                ':hover': {
                                    bgcolor: '#dadada', // theme.palette.primary.main
                                    color: 'black',
                                },
                            }}
                            variant="contained">
                            Đăng nhập
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default TopBar;