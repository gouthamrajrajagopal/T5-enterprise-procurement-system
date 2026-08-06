import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const QuickModuleCard = ({ icon, title, description }) => {
    return (
        <Paper className="premium-panel module-card">

            <Box className="module-icon">
                {icon}
            </Box>

            <Typography variant="h6" fontWeight={700}>
                {title}
            </Typography>

            <Typography variant="body2">
                {description}
            </Typography>

        </Paper>
    );
};

export default QuickModuleCard;