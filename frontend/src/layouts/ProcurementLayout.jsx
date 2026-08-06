import { Box } from "@mui/material";

import ProcurementSidebar from "../components/procurement/ProcurementSidebar";
import ProcurementTopbar from "../components/procurement/ProcurementTopbar";

function ProcurementLayout({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
            }}
        >
            <ProcurementSidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    minHeight: "100vh",
                    backgroundColor: "#f5f7fb",
                }}
            >
                <ProcurementTopbar />

                <Box
                    sx={{
                        p: {
                            xs: 2,
                            md: 3,
                        },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default ProcurementLayout;