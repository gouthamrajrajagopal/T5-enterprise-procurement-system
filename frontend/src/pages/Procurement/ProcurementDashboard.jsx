import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
} from "@mui/material";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import ProcurementLayout from "../../layouts/ProcurementLayout";

import {
    getPendingVendorSelections,
} from "../../api/procurementApi";

const getRequestId = (request) =>
    request?.requestId ??
    request?.purchaseRequestId ??
    request?.id;

const getRequestNumber = (request) =>
    request?.requestNumber ??
    request?.prNumber ??
    `PR-${getRequestId(request) ?? "N/A"}`;

const getEmployeeName = (request) =>
    request?.user?.name ??
    request?.employee?.name ??
    "Employee";

const getDepartmentName = (request) =>
    request?.department?.deptName ??
    request?.department?.departmentName ??
    request?.department?.name ??
    "Not available";

const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));

function ProcurementDashboard() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadRequests = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data =
                await getPendingVendorSelections();

            setRequests(
                Array.isArray(data) ? data : []
            );
        } catch (requestError) {
            console.error(
                "Procurement dashboard error:",
                requestError.response?.status,
                requestError.response?.data
            );

            setError(
                requestError.response?.data?.message ||
                    requestError.response?.data?.error ||
                    "Unable to load procurement requests"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRequests();

        const refreshOnFocus = () => {
            loadRequests();
        };

        window.addEventListener(
            "focus",
            refreshOnFocus
        );

        return () => {
            window.removeEventListener(
                "focus",
                refreshOnFocus
            );
        };
    }, [loadRequests]);

    const totalQuantity = useMemo(() => {
        return requests.reduce(
            (total, request) =>
                total +
                Number(request?.totalQuantity || 0),
            0
        );
    }, [requests]);

    const totalValue = useMemo(() => {
        return requests.reduce(
            (total, request) =>
                total +
                Number(request?.totalAmount || 0),
            0
        );
    }, [requests]);

    const cards = [
        {
            label: "Pending Vendor Selection",
            value: requests.length,
            icon: <StorefrontRoundedIcon />,
        },
        {
            label: "Pending Items",
            value: totalQuantity,
            icon: <InventoryRoundedIcon />,
        },
        {
            label: "Pending PR Value",
            value: formatMoney(totalValue),
            icon: <CurrencyRupeeRoundedIcon />,
        },
    ];

    return (
        <ProcurementLayout>
            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        md: 4,
                    },
                    mb: 3,
                    borderRadius: 4,
                    color: "#ffffff",
                    background:
                        "linear-gradient(135deg, #111827 0%, #3730a3 55%, #7c3aed 100%)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },
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
                                color: "rgba(255,255,255,0.75)",
                                fontWeight: 900,
                                letterSpacing: 1.6,
                            }}
                        >
                            PROCUREMENT WORKSPACE
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                mt: 0.5,
                                color: "#ffffff",
                                fontWeight: 900,
                            }}
                        >
                            Vendor Selection
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                color: "rgba(255,255,255,0.82)",
                            }}
                        >
                            Review approved purchase requests and assign suppliers.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate("/procurement/pending")
                        }
                        sx={{
                            px: 3,
                            py: 1.3,
                            color: "#4338ca",
                            backgroundColor: "#ffffff",
                            fontWeight: 900,
                            textTransform: "none",

                            "&:hover": {
                                backgroundColor: "#f5f3ff",
                            },
                        }}
                    >
                        View pending requests
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
                        md: "repeat(3, 1fr)",
                    },
                    gap: 2.5,
                    mb: 3,
                }}
            >
                {cards.map((card) => (
                    <Paper
                        key={card.label}
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                mb: 2.5,
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#4f46e5",
                                backgroundColor: "#eef2ff",
                            }}
                        >
                            {card.icon}
                        </Box>

                        <Typography
                            sx={{
                                color: "#111827",
                                fontSize:
                                    typeof card.value === "string"
                                        ? "1.6rem"
                                        : "2.25rem",
                                fontWeight: 900,
                            }}
                        >
                            {card.value}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                color: "#64748b",
                                fontWeight: 750,
                            }}
                        >
                            {card.label}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2.5,
                        md: 3.5,
                    },
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                            Recent approved requests
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                color: "#64748b",
                            }}
                        >
                            Requests waiting for supplier selection
                        </Typography>
                    </Box>

                    <Button
                        endIcon={<ArrowForwardRoundedIcon />}
                        onClick={() =>
                            navigate("/procurement/pending")
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
                    <Alert severity="info">
                        No purchase requests are waiting for supplier selection.
                    </Alert>
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
                                        key={requestId}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                md:
                                                    "1fr 1fr 160px 90px",
                                            },
                                            alignItems: "center",
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 3,

                                            "&:hover": {
                                                backgroundColor: "#f8fafc",
                                            },
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "#111827",
                                                    fontWeight: 900,
                                                }}
                                            >
                                                {getRequestNumber(request)}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#64748b",
                                                }}
                                            >
                                                {getEmployeeName(request)}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                color: "#475569",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {getDepartmentName(request)}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#111827",
                                                fontWeight: 850,
                                            }}
                                        >
                                            {formatMoney(
                                                request.totalAmount
                                            )}
                                        </Typography>

                                        <Button
                                            onClick={() =>
                                                navigate(
                                                    `/procurement/request/${requestId}`
                                                )
                                            }
                                            sx={{
                                                fontWeight: 800,
                                                textTransform: "none",
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
        </ProcurementLayout>
    );
}

export default ProcurementDashboard;