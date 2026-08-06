import React from "react";
import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

const KPICard = ({
                     title,
                     value,
                     icon,
                     progress,
                     chipLabel,
                     chipColor = "success",
                 }) => {
    return (
        <Paper className="premium-panel kpi-card">

            <Box className="kpi-header">

                <Box className="kpi-icon-wrapper">
                    {icon}
                </Box>

                <Chip
                    label={chipLabel}
                    color={chipColor}
                    size="small"
                    className="kpi-chip"
                />

            </Box>

            <Box>

                <Typography className="kpi-value">
                    {value}
                </Typography>

                <Typography className="kpi-title">
                    {title}
                </Typography>

            </Box>

            <Box className="kpi-footer">

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    className="kpi-progress"
                />

                <Typography className="kpi-subtext">
                    {progress}% Completed
                </Typography>

            </Box>

        </Paper>
    );
};

export default KPICard;