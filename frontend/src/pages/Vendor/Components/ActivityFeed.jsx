import React from "react";
import {
    Paper,
    Typography,
    Box,
    Avatar,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const activities = [
    {
        icon: <DescriptionIcon />,
        title: "Quotation Submitted",
        desc: "Quotation for RFQ-104 submitted successfully.",
        time: "10 mins ago",
    },
    {
        icon: <ShoppingCartIcon />,
        title: "Purchase Order Received",
        desc: "PO-205 has been issued to your company.",
        time: "1 hour ago",
    },
    {
        icon: <PaymentsIcon />,
        title: "Payment Released",
        desc: "₹1,25,000 has been processed.",
        time: "Yesterday",
    },
    {
        icon: <LocalShippingIcon />,
        title: "Delivery Confirmed",
        desc: "Shipment for PO-198 delivered successfully.",
        time: "2 days ago",
    },
];

const ActivityFeed = () => {
    return (
        <Paper className="premium-panel activity-card">

            <Box className="panel-header">
                <Typography variant="h6" fontWeight={700}>
                    Recent Activity
                </Typography>
            </Box>

            <Box className="activity-list">

                {activities.map((activity, index) => (
                    <Box className="activity-item" key={index}>

                        <Avatar className="activity-avatar">
                            {activity.icon}
                        </Avatar>

                        <Box className="activity-details">

                            <Box className="activity-title-row">

                                <Typography variant="subtitle2">
                                    {activity.title}
                                </Typography>

                                <Typography className="act-time">
                                    {activity.time}
                                </Typography>

                            </Box>

                            <Typography className="act-desc">
                                {activity.desc}
                            </Typography>

                        </Box>

                    </Box>
                ))}

            </Box>

        </Paper>
    );
};

export default ActivityFeed;