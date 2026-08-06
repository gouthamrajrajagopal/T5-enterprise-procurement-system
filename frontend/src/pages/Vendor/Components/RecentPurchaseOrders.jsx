import React from "react";
import {
    Paper,
    Typography,
    Box,
    Chip,
    Button,
} from "@mui/material";

const orders = [
    {
        id: "PO-201",
        item: "Office Chairs",
        amount: "₹1,20,000",
        status: "Approved",
    },
    {
        id: "PO-202",
        item: "Desktop Computers",
        amount: "₹4,80,000",
        status: "Processing",
    },
    {
        id: "PO-203",
        item: "Printers",
        amount: "₹90,000",
        status: "Delivered",
    },
];

const RecentPurchaseOrders = () => {
    return (
        <Paper className="premium-panel">
            <Typography variant="h6" fontWeight={700} mb={3}>
                Recent Purchase Orders
            </Typography>

            {orders.map((order) => (
                <Box
                    key={order.id}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 0",
                        borderBottom: "1px solid #e5e7eb",
                    }}
                >
                    <Box>
                        <Typography fontWeight={700}>{order.id}</Typography>
                        <Typography variant="body2">
                            {order.item}
                        </Typography>
                    </Box>

                    <Typography fontWeight={700}>
                        {order.amount}
                    </Typography>

                    <Chip
                        label={order.status}
                        color={
                            order.status === "Approved"
                                ? "success"
                                : order.status === "Processing"
                                    ? "warning"
                                    : "primary"
                        }
                    />

                    <Button variant="outlined" size="small">
                        View
                    </Button>
                </Box>
            ))}
        </Paper>
    );
};

export default RecentPurchaseOrders;