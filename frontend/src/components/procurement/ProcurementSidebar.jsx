import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

function ProcurementSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            label: "Dashboard",
            icon: <DashboardRoundedIcon />,
            path: "/procurement/dashboard",
        },
        {
            label: "Pending Vendor Selection",
            icon: <StorefrontRoundedIcon />,
            path: "/procurement/pending",
        },
        {
            label: "Processed Requests",
            icon: <HistoryRoundedIcon />,
            path: "/procurement/history",
        },
    ];

    const isSelected = (path) => {
        if (path === "/procurement/dashboard") {
            return location.pathname === path;
        }

        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        localStorage.clear();

        navigate("/login", {
            replace: true,
        });
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
                    borderRight: "none",
                    color: "#ffffff",
                    background:
                        "linear-gradient(180deg, #111827 0%, #172554 55%, #312e81 100%)",
                },
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "78px !important",
                    px: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(135deg, #818cf8, #a855f7)",
                        }}
                    >
                        <ShoppingCartRoundedIcon />
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 900,
                            }}
                        >
                            ProcureX
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "rgba(255,255,255,0.70)",
                            }}
                        >
                            Procurement Team
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,0.10)",
                }}
            />

            <List
                sx={{
                    px: 2,
                    py: 2,
                }}
            >
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        selected={isSelected(item.path)}
                        onClick={() => navigate(item.path)}
                        sx={{
                            mb: 1,
                            px: 2,
                            py: 1.4,
                            borderRadius: 2.5,
                            color: "rgba(255,255,255,0.80)",

                            "& .MuiListItemIcon-root": {
                                minWidth: 42,
                                color: "rgba(255,255,255,0.75)",
                            },

                            "&.Mui-selected": {
                                color: "#ffffff",
                                backgroundColor:
                                    "rgba(129,140,248,0.24)",

                                "& .MuiListItemIcon-root": {
                                    color: "#c7d2fe",
                                },
                            },

                            "&.Mui-selected:hover": {
                                backgroundColor:
                                    "rgba(129,140,248,0.30)",
                            },

                            "&:hover": {
                                color: "#ffffff",
                                backgroundColor:
                                    "rgba(255,255,255,0.08)",
                            },
                        }}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontWeight: 750,
                                fontSize: "0.92rem",
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ p: 2 }}>
                <Divider
                    sx={{
                        mb: 2,
                        borderColor: "rgba(255,255,255,0.10)",
                    }}
                />

                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        px: 2,
                        py: 1.4,
                        borderRadius: 2.5,
                        color: "#fecaca",

                        "& .MuiListItemIcon-root": {
                            minWidth: 42,
                            color: "#fca5a5",
                        },

                        "&:hover": {
                            backgroundColor:
                                "rgba(239,68,68,0.13)",
                        },
                    }}
                >
                    <ListItemIcon>
                        <LogoutRoundedIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{
                            fontWeight: 800,
                        }}
                    />
                </ListItemButton>
            </Box>
        </Drawer>
    );
}

export default ProcurementSidebar;