import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

export default function EmployeeTopbar({ onMenu }) {
  const name = localStorage.getItem("name") || localStorage.getItem("email") || "Employee";
  return (
    <AppBar position="sticky" elevation={0} className="employee-topbar">
      <Toolbar>
        <IconButton onClick={onMenu} className="mobile-menu-button"><MenuRoundedIcon /></IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={800}>Employee Portal</Typography>
          <Typography variant="caption" color="text.secondary">Manage your purchase requisitions</Typography>
        </Box>
        <IconButton className="topbar-icon"><NotificationsNoneRoundedIcon /></IconButton>
        <Box className="profile-pill">
          <Avatar sx={{ width: 36, height: 36 }}>{name.charAt(0).toUpperCase()}</Avatar>
          <Box className="profile-copy"><Typography fontWeight={800} fontSize={14}>{name}</Typography><Typography variant="caption">EMPLOYEE</Typography></Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
