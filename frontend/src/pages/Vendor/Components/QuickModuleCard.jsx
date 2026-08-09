import React from "react";
import { Paper, Typography, Box, Chip, Tooltip } from "@mui/material";

// available=false means there is no backend/page behind this card
// yet (e.g. no RFQ/Quotation/Payment module exists). Rather than
// showing a card that looks clickable but silently does nothing,
// it's visibly marked "Coming soon" and not clickable at all.
const QuickModuleCard = ({
                             icon,
                             title,
                             description,
                             available = true,
                             onClick,
                         }) => {
    const content = (
        <Paper
            className={`premium-panel module-card${
                available ? "" : " module-card-disabled"
            }`}
            onClick={available ? onClick : undefined}
            sx={{
                cursor: available ? "pointer" : "not-allowed",
                opacity: available ? 1 : 0.55,
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Box className="module-icon">{icon}</Box>

                {!available && (
                    <Chip
                        label="Coming soon"
                        size="small"
                        color="default"
                    />
                )}
            </Box>

            <Typography variant="h6" fontWeight={700}>
                {title}
            </Typography>

            <Typography variant="body2">{description}</Typography>
        </Paper>
    );

    if (available) {
        return content;
    }

    return (
        <Tooltip title="This module isn't built yet - it's not part of the current project scope.">
            <span>{content}</span>
        </Tooltip>
    );
};

export default QuickModuleCard;
