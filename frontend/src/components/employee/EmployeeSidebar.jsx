import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  { label: "Dashboard", path: "/employee/dashboard", icon: <DashboardRoundedIcon /> },
  { label: "Raise requisition", path: "/employee/raise-request", icon: <AddCircleRoundedIcon /> },
  { label: "My requisitions", path: "/employee/my-requests", icon: <ReceiptLongRoundedIcon /> },
];

export default function EmployeeSidebar({ mobile, onNavigate }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const go = (path) => { navigate(path); onNavigate?.(); };
  const logout = () => { localStorage.clear(); navigate("/login"); };

  return (
    <Box className="employee-sidebar">
      <Box className="brand-wrap">
        <Box className="brand-icon"><AutoAwesomeRoundedIcon /></Box>
        <Box><Typography className="brand-title">ProcureX</Typography><Typography className="brand-subtitle">Employee workspace</Typography></Box>
      </Box>
      <Divider className="sidebar-divider" />
      <List sx={{ px: 1.5, flex: 1 }}>
        {items.map((item) => (
          <ListItemButton key={item.path} onClick={() => go(item.path)} selected={pathname === item.path} className="sidebar-item">
            <ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 1.5 }}>
        <ListItemButton onClick={logout} className="sidebar-item logout-item">
          <ListItemIcon><LogoutRoundedIcon /></ListItemIcon><ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
