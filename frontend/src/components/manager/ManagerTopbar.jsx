import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    IconButton,
    Tooltip
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

function ManagerTopbar() {

    const managerName =
        localStorage.getItem("name") || "Manager";

    const role =
        localStorage.getItem("role") || "MANAGER";

    return (

        <AppBar
            position="static"
            elevation={1}
            sx={{
                backgroundColor: "#ffffff",
                color: "#000",
            }}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ flexGrow: 1 }}
                >
                    Manager Dashboard
                </Typography>

                <Tooltip title="Notifications">

                    <IconButton>

                        <NotificationsIcon />

                    </IconButton>

                </Tooltip>

                <Box
                    display="flex"
                    alignItems="center"
                    ml={3}
                >

                    <Avatar
                        sx={{
                            bgcolor: "#1976d2",
                            mr: 2
                        }}
                    >
                        {managerName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>

                        <Typography
                            fontWeight="bold"
                        >
                            {managerName}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {role}
                        </Typography>

                    </Box>

                </Box>

            </Toolbar>

        </AppBar>

    );
}

export default ManagerTopbar;