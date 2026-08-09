import React, { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Box,
    Chip,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";

import {
    getAllPurchaseOrders,
    updatePurchaseOrderStatus,
} from "../../../api/purchaseOrderApi";

const STATUS_COLOR_MAP = {
    CREATED: "default",
    SENT_TO_VENDOR: "info",
    VENDOR_ACCEPTED: "info",
    PROCESSING: "warning",
    IN_TRANSIT: "warning",
    DELIVERED: "success",
    GOODS_VERIFIED: "success",
    CANCELLED: "error",
};

// The stages a vendor is actually responsible for moving a PO
// through. CREATED (not yet sent) and GOODS_VERIFIED (buyer-side
// confirmation) are intentionally outside the vendor's control.
const VENDOR_STATUS_FLOW = [
    "SENT_TO_VENDOR",
    "VENDOR_ACCEPTED",
    "PROCESSING",
    "IN_TRANSIT",
    "DELIVERED",
];

const getNextStatus = (currentStatus) => {
    const currentIndex = VENDOR_STATUS_FLOW.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex === VENDOR_STATUS_FLOW.length - 1) {
        return null;
    }

    return VENDOR_STATUS_FLOW[currentIndex + 1];
};

const canCancel = (currentStatus) =>
    VENDOR_STATUS_FLOW.includes(currentStatus) &&
    currentStatus !== "DELIVERED";

const formatCurrency = (amount) => {
    const value = Number(amount) || 0;

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
};

const RecentPurchaseOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actioningId, setActioningId] = useState(null);
    const [actionError, setActionError] = useState("");

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllPurchaseOrders();

            // Show only the most recent few on the dashboard
            setOrders((data || []).slice(0, 5));
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to load purchase orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = async (poId, newStatus) => {
        try {
            setActioningId(poId);
            setActionError("");

            await updatePurchaseOrderStatus(poId, newStatus);

            // Refresh from the server rather than guessing at the
            // new shape of the order locally.
            await loadOrders();
        } catch (err) {
            setActionError(
                err?.response?.data?.message ||
                `Failed to update status for PO #${poId}`
            );
        } finally {
            setActioningId(null);
        }
    };

    return (
        <Paper className="premium-panel">
            <Typography variant="h6" fontWeight={700} mb={3}>
                Recent Purchase Orders
            </Typography>

            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 3,
                    }}
                >
                    <CircularProgress size={28} />
                </Box>
            )}

            {!loading && error && (
                <Alert severity="error">{error}</Alert>
            )}

            {!loading && actionError && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    onClose={() => setActionError("")}
                >
                    {actionError}
                </Alert>
            )}

            {!loading && !error && orders.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                    No purchase orders yet.
                </Typography>
            )}

            {!loading &&
                !error &&
                orders.map((order) => {
                    const primaryItem =
                        order.items && order.items.length > 0
                            ? order.items[0].itemName
                            : "—";

                    const nextStatus = getNextStatus(order.status);
                    const isActioning = actioningId === order.poId;

                    return (
                        <Box
                            key={order.poId}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1,
                                padding: "14px 0",
                                borderBottom: "1px solid #e5e7eb",
                            }}
                        >
                            <Box>
                                <Typography fontWeight={700}>
                                    {order.poNumber}
                                </Typography>
                                <Typography variant="body2">
                                    {primaryItem}
                                    {order.items &&
                                        order.items.length > 1 &&
                                        ` +${order.items.length - 1} more`}
                                </Typography>
                            </Box>

                            <Typography fontWeight={700}>
                                {formatCurrency(order.totalAmount)}
                            </Typography>

                            <Chip
                                label={order.status}
                                color={
                                    STATUS_COLOR_MAP[order.status] ||
                                    "default"
                                }
                            />

                            <Box display="flex" gap={1}>
                                {nextStatus && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        disabled={isActioning}
                                        onClick={() =>
                                            handleStatusChange(
                                                order.poId,
                                                nextStatus
                                            )
                                        }
                                    >
                                        {isActioning
                                            ? "Updating…"
                                            : `Mark ${nextStatus.replace(
                                                /_/g,
                                                " "
                                            )}`}
                                    </Button>
                                )}

                                {canCancel(order.status) && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        disabled={isActioning}
                                        onClick={() =>
                                            handleStatusChange(
                                                order.poId,
                                                "CANCELLED"
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                )}

                                {!nextStatus &&
                                    !canCancel(order.status) && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            No further action
                                        </Typography>
                                    )}
                            </Box>
                        </Box>
                    );
                })}
        </Paper>
    );
};

export default RecentPurchaseOrders;
