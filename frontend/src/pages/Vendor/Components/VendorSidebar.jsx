import React from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "RFQs", icon: <DescriptionIcon /> },
    { text: "Quotations", icon: <RequestQuoteIcon /> },
    { text: "Purchase Orders", icon: <ShoppingCartIcon /> },
    { text: "Deliveries", icon: <LocalShippingIcon /> },
    { text: "Payments", icon: <PaymentsIcon /> },
    { text: "Profile", icon: <PersonIcon /> },
];

const VendorSidebar = () => {

    return (
        <Drawer
            variant="permanent"
            className="desktop-sidebar"
            PaperProps={{
                className: "employee-sidebar",
            }}
        >

            <Box className="brand-wrap">

                <Box className="brand-icon">
                    🏢
                </Box>

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

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.text}
                        className="sidebar-item"
                    >

                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                        />

                    </ListItemButton>

                ))}

            </List>

            <Box sx={{ flexGrow: 1 }} />

            <List>

                <ListItemButton className="sidebar-item logout-item">

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