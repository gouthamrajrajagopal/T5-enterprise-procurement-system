import React from "react";
import { Paper, Box, Typography, LinearProgress } from "@mui/material";

const stats = [
    { label: "Quotation Acceptance", value: 82 },
    { label: "On-Time Deliveries", value: 94 },
    { label: "Payment Completion", value: 76 },
    { label: "Overall Performance", value: 88 },
];

const VendorPerformance = () => {
    return (
        <Paper className="premium-panel">
            <Typography variant="h6" fontWeight={700} mb={3}>
                Vendor Performance
            </Typography>

            {stats.map((item) => (
                <Box key={item.label} mb={3}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                    >
                        <Typography>{item.label}</Typography>
                        <Typography fontWeight={700}>
                            {item.value}%
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={item.value}
                        className="kpi-progress"
                    />
                </Box>
            ))}
        </Paper>
    );
};

export default VendorPerformance;