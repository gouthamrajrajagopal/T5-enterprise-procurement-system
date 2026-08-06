import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

function ProcurementTopbar() {
    const name =
        localStorage.getItem("name") ||
        "Procurement Officer";

    const role =
        localStorage.getItem("role") ||
        "PROCUREMENT_OFFICER";

    const initial =
        name.trim().charAt(0).toUpperCase() || "P";

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                color: "#111827",
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "78px !important",
                    px: {
                        xs: 2,
                        md: 3,
                    },
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#111827",
                            fontWeight: 900,
                        }}
                    >
                        Procurement Dashboard
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#64748b",
                        }}
                    >
                        Manage approved requests and supplier selection
                    </Typography>
                </Box>

                <Tooltip title="Notifications">
                    <IconButton
                        sx={{
                            mr: 2,
                            color: "#475569",
                        }}
                    >
                        <Badge
                            color="error"
                            variant="dot"
                        >
                            <NotificationsNoneRoundedIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.3,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 42,
                            height: 42,
                            fontWeight: 900,
                            background:
                                "linear-gradient(135deg, #4f46e5, #9333ea)",
                        }}
                    >
                        {initial}
                    </Avatar>

                    <Box>
                        <Typography
                            sx={{
                                color: "#111827",
                                fontWeight: 850,
                                lineHeight: 1.2,
                            }}
                        >
                            {name}
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "#64748b",
                            }}
                        >
                            {role.replaceAll("_", " ")}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default ProcurementTopbar;