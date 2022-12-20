import * as React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import axios from 'axios';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Collapse } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import TranslateIcon from '@mui/icons-material/Translate';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import AbcIcon from '@mui/icons-material/Abc';

import Home from './Components/Home/Home';
import KanjiPractice from './Components/KanjiPractice/KanjiPractice';
import NumberPractice from './Components/NumberPractice/NumberPractice';
import VocabularyPractice from './Components/VocabularyPractice/VocabularyPractice';
import Page404 from './Components/Page404/Page404';

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.validateStatus = (status) => {
    return status >= 200 && status <= 403;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/kanji-practice/kanji-vsound",
        element: <KanjiPractice />,
    },
    {
        path: "/kanji-practice/vsound-kanji",
        element: <KanjiPractice />,
    },
    {
        path: "/number-practice",
        element: <NumberPractice />,
    },
    {
        path: "/vocabulary-practice/word-meaning",
        element: <VocabularyPractice />,
    },
    {
        path: "/vocabulary-practice/meaning-word",
        element: <VocabularyPractice />,
    },
]);

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
  }
  
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
  
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
            }),
        },
    }),
);
  
const mdTheme = createTheme();

const MenuListItems = () => {
    const [openKanji, setOpenKanji] = React.useState(false);
    const [openVocabulary, setOpenVocabulary] = React.useState(false);

    return (<React.Fragment>
        <List component="nav" aria-label="main mailbox folders">
            <ListItemButton href="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => setOpenKanji(!openKanji)}>
                <ListItemIcon>
                    <TranslateIcon />
                </ListItemIcon>
                <ListItemText primary="Kanji Practice" />
                {openKanji ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openKanji} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} href="/kanji-practice/kanji-vsound">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Kanji - Vietnamese" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} href="/kanji-practice/vsound-kanji">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Vietnamese - Kanji" />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton href="/number-practice">
                <ListItemIcon>
                    <LooksOneIcon />
                </ListItemIcon>
                <ListItemText primary="Numbers Practice" />
            </ListItemButton>
            <ListItemButton onClick={() => setOpenVocabulary(!openVocabulary)}>
                <ListItemIcon>
                    <AbcIcon />
                </ListItemIcon>
                <ListItemText primary="Vocabulary Practice" />
                {openVocabulary ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openVocabulary} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} href="/vocabulary-practice/word-meaning">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Word - Meaning" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} href="/vocabulary-practice/meaning-word">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Meaning - Word" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    </React.Fragment>);
};

const App = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
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
                    Dashboard
                    </Typography>
                    <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
                </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <MenuListItems></MenuListItems>
                </Drawer>
                <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
                >
                    <Toolbar />
                    <Grid sx={{ mt: 4, mb: 4, pl: 2, pr: 2, display: 'flex', 'flex-direction': 'column' }}>
                        <Grid container>
                            <RouterProvider
                                router={router}
                                fallbackElement={<Page404 />}
                            />
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Grid>
                </Box>
            </Box>
            </ThemeProvider>
    );
};
export default App;