import React from "react";
import {
    Paper,
    Typography,
    Box,
    Avatar,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const notifications = [
    {
        title: "New RFQ Published",
        message: "RFQ-105 is available for quotation.",
        time: "5 mins ago",
    },
    {
        title: "Quotation Approved",
        message: "Your quotation for RFQ-102 has been shortlisted.",
        time: "30 mins ago",
    },
    {
        title: "Payment Released",
        message: "Payment of ₹2,45,000 has been credited.",
        time: "Today",
    },
];

const NotificationPanel = () => {
    return (
        <Paper className="premium-panel">
            <Typography variant="h6" fontWeight={700} mb={3}>
                Notifications
            </Typography>

            {notifications.map((notification, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        padding: "14px 0",
                        borderBottom:
                            index !== notifications.length - 1
                                ? "1px solid #e5e7eb"
                                : "none",
                    }}
                >
                    <Avatar sx={{ bgcolor: "#6c5ce7" }}>
                        <NotificationsActiveIcon />
                    </Avatar>

                    <Box>
                        <Typography fontWeight={700}>
                            {notification.title}
                        </Typography>

                        <Typography variant="body2">
                            {notification.message}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {notification.time}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Paper>
    );
};

export default NotificationPanel;