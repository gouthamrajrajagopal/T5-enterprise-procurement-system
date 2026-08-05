import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeTopbar from "../components/employee/EmployeeTopbar";
import "../styles/employee.css";

export default function EmployeeLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <Box className="employee-shell">
      <Box className="desktop-sidebar"><EmployeeSidebar /></Box>
      <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 280, border: 0 } }}>
        <EmployeeSidebar mobile onNavigate={() => setOpen(false)} />
      </Drawer>
      <Box className="employee-main">
        <EmployeeTopbar onMenu={() => setOpen(true)} />
        <Box component="main" className="employee-content">{children}</Box>
      </Box>
    </Box>
  );
}
