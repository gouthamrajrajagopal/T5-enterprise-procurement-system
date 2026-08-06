import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

function ManagerSidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [

        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/manager/dashboard",
        },

        {
            text: "Pending Requests",
            icon: <PendingActionsIcon />,
            path: "/manager/pending",
        },

        {
            text: "Approval History",
            icon: <HistoryIcon />,
            path: "/manager/history",
        },
    ];

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "#1e293b",
                    color: "#fff",
                },
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Manager Panel
                </Typography>

            </Toolbar>

            <Box sx={{ overflow: "auto" }}>

                <List>

                    {menuItems.map((item) => (

                        <ListItemButton

                            key={item.text}

                            selected={
                                location.pathname === item.path
                            }

                            onClick={() =>
                                navigate(item.path)
                            }

                        >

                            <ListItemIcon
                                sx={{ color: "#fff" }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    ))}

                    <ListItemButton
                        onClick={logout}
                    >

                        <ListItemIcon
                            sx={{ color: "#fff" }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Logout"
                        />

                    </ListItemButton>

                </List>

            </Box>

        </Drawer>

    );
}

export default ManagerSidebar;