import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Avatar,
    Tooltip,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const VendorTopbar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            className="employee-topbar"
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Vendor Dashboard
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Welcome back! Here's your procurement overview.
                    </Typography>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                >
                    <Tooltip title="Search">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Notifications">
                        <IconButton>
                            <Badge
                                badgeContent={4}
                                color="error"
                            >
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Settings">
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <Avatar
                        sx={{
                            bgcolor: "#6c5ce7",
                            width: 42,
                            height: 42,
                        }}
                    >
                        V
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default VendorTopbar;