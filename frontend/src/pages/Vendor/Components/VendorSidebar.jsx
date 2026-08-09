import React from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Box,
    Chip,
    Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

// available: false items have no backend/page behind them yet
// (RFQ, Quotation, Payment, Profile modules don't exist). They're
// shown greyed-out with a "Coming soon" tag instead of pretending
// to be clickable.
const buildMenuItems = (onPurchaseOrdersClick) => [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        available: true,
        selected: true,
    },
    {
        text: "Purchase Orders",
        icon: <ShoppingCartIcon />,
        available: true,
        onClick: onPurchaseOrdersClick,
    },
    { text: "RFQs", icon: <DescriptionIcon />, available: false },
    { text: "Quotations", icon: <RequestQuoteIcon />, available: false },
    { text: "Deliveries", icon: <LocalShippingIcon />, available: false },
    { text: "Payments", icon: <PaymentsIcon />, available: false },
    { text: "Profile", icon: <PersonIcon />, available: false },
];

const VendorSidebar = ({ onPurchaseOrdersClick }) => {
    const navigate = useNavigate();
    const menuItems = buildMenuItems(onPurchaseOrdersClick);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Drawer
            variant="permanent"
            className="desktop-sidebar"
            PaperProps={{
                className: "employee-sidebar",
            }}
        >
            <Box className="brand-wrap">
                <Box className="brand-icon">🏢</Box>

                <Box>
                    <Typography className="brand-title">
                        Vendor Portal
                    </Typography>

                    <Typography className="brand-subtitle">
                        Enterprise Procurement
                    </Typography>
                </Box>
            </Box>

            <Divider className="sidebar-divider" />

            <List>
                {menuItems.map((item) => {
                    const button = (
                        <ListItemButton
                            key={item.text}
                            className="sidebar-item"
                            selected={item.selected}
                            disabled={!item.available}
                            onClick={
                                item.available ? item.onClick : undefined
                            }
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>

                            <ListItemText primary={item.text} />

                            {!item.available && (
                                <Chip
                                    label="Soon"
                                    size="small"
                                    sx={{ ml: 1 }}
                                />
                            )}
                        </ListItemButton>
                    );

                    if (item.available) {
                        return button;
                    }

                    return (
                        <Tooltip
                            key={item.text}
                            title="This module isn't built yet - it's not part of the current project scope."
                        >
                            <span>{button}</span>
                        </Tooltip>
                    );
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <List>
                <ListItemButton
                    onClick={logout}
                    className="sidebar-item logout-item"
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>

                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default VendorSidebar;
