import { Box } from "@mui/material";
import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerTopbar from "../components/manager/ManagerTopbar";

function ManagerLayout({ children }) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <ManagerSidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: "#f5f7fb",
                    minHeight: "100vh",
                }}
            >
                <ManagerTopbar />

                <Box
                    sx={{
                        p: 3,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default ManagerLayout;