import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
} from "@mui/material";
import {
    getEmployeeDisplayStatus,
    isEmployeeRequestPending,
} from "../../utils/purchaseRequestStatus";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import { getMyPurchaseRequests } from "../../api/purchaseRequestApi";
import StatusBadge from "../../components/employee/StatusBadge";

const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));

const getRequestId = (request) =>
    request?.requestId ??
    request?.purchaseRequestId ??
    request?.prId ??
    request?.id;

const getRequestNumber = (request) =>
    request?.requestNumber ??
    request?.prNumber ??
    request?.purchaseRequestNumber ??
    `PR-${getRequestId(request) ?? "N/A"}`;

// const getStatus = (request) =>
//     String(request?.status ?? "PENDING").toUpperCase();

const getItems = (request) => {
    if (Array.isArray(request?.items)) {
        return request.items;
    }

    if (Array.isArray(request?.purchaseRequestItems)) {
        return request.purchaseRequestItems;
    }

    return [];
};

const getTotalAmount = (request) => {
    if (
        request?.totalAmount !== null &&
        request?.totalAmount !== undefined
    ) {
        return Number(request.totalAmount);
    }

    return getItems(request).reduce((total, item) => {
        const quantity = Number(item?.quantity) || 0;

        const price =
            Number(
                item?.estimatedPrice ??
                    item?.unitPrice ??
                    item?.price
            ) || 0;

        return total + quantity * price;
    }, 0);
};

const getItemSummary = (request) => {
    const items = getItems(request);

    if (items.length === 0) {
        return request?.purpose || "Purchase requisition";
    }

    if (items.length === 1) {
        return items[0]?.itemName || "Requested item";
    }

    return `${items[0]?.itemName || "Requested item"} + ${
        items.length - 1
    } more`;
};

const statCardStyles = {
    violet: {
        iconBackground: "#ede9fe",
        iconColor: "#6d5dfc",
    },
    blue: {
        iconBackground: "#e0f2fe",
        iconColor: "#0284c7",
    },
    green: {
        iconBackground: "#dcfce7",
        iconColor: "#059669",
    },
    red: {
        iconBackground: "#ffe4e6",
        iconColor: "#e11d48",
    },
};

export default function EmployeeDashboard() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRequests = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getMyPurchaseRequests();

                setRequests(Array.isArray(data) ? data : []);
            } catch (requestError) {
                console.error(
                    "Dashboard API error:",
                    requestError.response?.status,
                    requestError.response?.data
                );

                setError(
                    requestError.response?.data?.message ||
                        requestError.response?.data?.error ||
                        "Could not load your purchase requisitions"
                );
            } finally {
                setLoading(false);
            }
        };

        loadRequests();
    }, []);

  const stats = useMemo(() => {
    return {
        total: requests.length,

        active: requests.filter((request) =>
            isEmployeeRequestPending(request)
        ).length,

        approved: requests.filter(
            (request) =>
                getEmployeeDisplayStatus(request) ===
                "APPROVED"
        ).length,

        rejected: requests.filter(
            (request) =>
                getEmployeeDisplayStatus(request) ===
                "REJECTED"
        ).length,
    };
}, [requests]);

    const cards = [
        {
            label: "Total requests",
            value: stats.total,
            icon: <ReceiptLongRoundedIcon />,
            tone: "violet",
        },
        {
            label: "In progress",
            value: stats.active,
            icon: <PendingActionsRoundedIcon />,
            tone: "blue",
        },
        {
            label: "Approved",
            value: stats.approved,
            icon: <TaskAltRoundedIcon />,
            tone: "green",
        },
        {
            label: "Rejected",
            value: stats.rejected,
            icon: <CancelRoundedIcon />,
            tone: "red",
        },
    ];

    return (
        <EmployeeLayout>
            <Box
                sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    p: {
                        xs: 2,
                        md: 3,
                        lg: 4,
                    },
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 3,
                            md: 5,
                        },
                        mb: 3,
                        borderRadius: 5,
                        color: "#ffffff",
                        background:
                            "linear-gradient(135deg, #181830 0%, #33287e 55%, #6c55e8 100%)",
                        boxShadow:
                            "0 18px 45px rgba(62, 49, 149, 0.24)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            justifyContent: "space-between",
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: 3,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: "#d9d3ff",
                                    letterSpacing: 1.7,
                                    fontWeight: 900,
                                }}
                            >
                                EMPLOYEE WORKSPACE
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    mt: 0.5,
                                    fontWeight: 900,
                                    color: "#ffffff",
                                    fontSize: {
                                        xs: "2.2rem",
                                        md: "3.4rem",
                                    },
                                }}
                            >
                                Welcome back 👋
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1.2,
                                    color:
                                        "rgba(255,255,255,0.85)",
                                    fontSize: {
                                        xs: "0.95rem",
                                        md: "1.05rem",
                                    },
                                }}
                            >
                                Raise, track and manage your purchase
                                requisitions in one place.
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddRoundedIcon />}
                            onClick={() =>
                                navigate(
                                    "/employee/raise-request"
                                )
                            }
                            sx={{
                                px: 3,
                                py: 1.5,
                                borderRadius: 3,
                                backgroundColor: "#ffffff",
                                color: "#4338ca",
                                fontWeight: 900,
                                textTransform: "none",
                                whiteSpace: "nowrap",

                                "&:hover": {
                                    backgroundColor: "#f4f2ff",
                                },
                            }}
                        >
                            Raise new PR
                        </Button>
                    </Box>
                </Paper>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                            borderRadius: 3,
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 2.5,
                        mb: 3,
                    }}
                >
                    {cards.map((card) => {
                        const style =
                            statCardStyles[card.tone];

                        return (
                            <Paper
                                key={card.label}
                                elevation={0}
                                sx={{
                                    minHeight: 170,
                                    p: 3,
                                    borderRadius: 4,
                                    backgroundColor: "#ffffff",
                                    border:
                                        "1px solid #e8eaf1",
                                    boxShadow:
                                        "0 12px 30px rgba(15,23,42,0.06)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent:
                                        "space-between",
                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-4px)",
                                        boxShadow:
                                            "0 18px 38px rgba(15,23,42,0.10)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor:
                                            style.iconBackground,
                                        color: style.iconColor,

                                        "& svg": {
                                            fontSize: 29,
                                        },
                                    }}
                                >
                                    {card.icon}
                                </Box>

                                <Box sx={{ mt: 3 }}>
                                    <Typography
                                        sx={{
                                            color: "#111827",
                                            fontSize: "2.3rem",
                                            fontWeight: 900,
                                            lineHeight: 1,
                                        }}
                                    >
                                        {card.value}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            color: "#64748b",
                                            fontWeight: 750,
                                        }}
                                    >
                                        {card.label}
                                    </Typography>
                                </Box>
                            </Paper>
                        );
                    })}
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 3.5,
                        },
                        borderRadius: 4,
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8eaf1",
                        boxShadow:
                            "0 12px 32px rgba(15,23,42,0.06)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },
                            justifyContent: "space-between",
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: "#111827",
                                    fontWeight: 900,
                                }}
                            >
                                Recent requisitions
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.5,
                                    color: "#64748b",
                                }}
                            >
                                Your latest purchase requests and
                                their current status
                            </Typography>
                        </Box>

                        <Button
                            endIcon={
                                <ArrowForwardRoundedIcon />
                            }
                            onClick={() =>
                                navigate(
                                    "/employee/my-requests"
                                )
                            }
                            sx={{
                                fontWeight: 800,
                                textTransform: "none",
                            }}
                        >
                            View all
                        </Button>
                    </Box>

                    {loading ? (
                        <Box
                            sx={{
                                minHeight: 220,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : requests.length === 0 ? (
                        <Box
                            sx={{
                                minHeight: 260,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                textAlign: "center",
                                px: 2,
                            }}
                        >
                            <ReceiptLongRoundedIcon
                                sx={{
                                    fontSize: 66,
                                    color: "#94a3b8",
                                    mb: 2,
                                }}
                            />

                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#111827",
                                    fontWeight: 850,
                                }}
                            >
                                No requisitions yet
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    mb: 3,
                                    color: "#64748b",
                                }}
                            >
                                Create your first purchase request
                                to start the approval workflow.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<AddRoundedIcon />}
                                onClick={() =>
                                    navigate(
                                        "/employee/raise-request"
                                    )
                                }
                                sx={{
                                    borderRadius: 2.5,
                                    px: 3,
                                    py: 1.2,
                                    fontWeight: 800,
                                    textTransform: "none",
                                }}
                            >
                                Raise requisition
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gap: 1,
                            }}
                        >
                            {requests
                                .slice(0, 5)
                                .map((request) => {
                                    const requestId =
                                        getRequestId(request);

                                    return (
                                        <Box
                                            key={
                                                requestId ??
                                                getRequestNumber(
                                                    request
                                                )
                                            }
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    {
                                                        xs:
                                                            "1fr",
                                                        md:
                                                            "minmax(220px, 1.5fr) minmax(120px, 0.7fr) minmax(130px, 0.7fr) 80px",
                                                    },
                                                alignItems: "center",
                                                gap: 2,
                                                p: 2,
                                                borderRadius: 3,
                                                border:
                                                    "1px solid transparent",
                                                transition:
                                                    "all 0.2s ease",

                                                "&:hover": {
                                                    backgroundColor:
                                                        "#f8fafc",
                                                    borderColor:
                                                        "#e2e8f0",
                                                },
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color:
                                                            "#111827",
                                                        fontWeight:
                                                            900,
                                                    }}
                                                >
                                                    {getRequestNumber(
                                                        request
                                                    )}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mt: 0.3,
                                                        color:
                                                            "#64748b",
                                                    }}
                                                >
                                                    {getItemSummary(
                                                        request
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    color: "#111827",
                                                    fontWeight: 850,
                                                }}
                                            >
                                                {formatMoney(
                                                    getTotalAmount(
                                                        request
                                                    )
                                                )}
                                            </Typography>

                                            <StatusBadge
    status={getEmployeeDisplayStatus(request)}
/>

                                            <Button
                                                onClick={() =>
                                                    navigate(
                                                        `/employee/request/${requestId}`
                                                    )
                                                }
                                                sx={{
                                                    fontWeight: 800,
                                                    textTransform:
                                                        "none",
                                                }}
                                            >
                                                View
                                            </Button>
                                        </Box>
                                    );
                                })}
                        </Box>
                    )}
                </Paper>
            </Box>
        </EmployeeLayout>
    );
}