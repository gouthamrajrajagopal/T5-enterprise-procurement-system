import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InventoryIcon from "@mui/icons-material/Inventory";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import { getPurchaseRequestById } from "../../api/purchaseRequestApi";
import { getEmployeeDisplayStatus } from "../../utils/purchaseRequestStatus";

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

const getDepartmentName = (request) =>
    request?.department?.departmentName ??
    request?.department?.deptName ??
    request?.department?.name ??
    request?.departmentName ??
    "Not available";

const getUserName = (request) =>
    request?.user?.name ??
    request?.requester?.name ??
    request?.employee?.name ??
    request?.userName ??
    localStorage.getItem("name") ??
    "Employee";

const getPurpose = (request) =>
    request?.purpose ??
    request?.justification ??
    "No purpose provided";

const getCreatedDate = (request) =>
    request?.createdAt ??
    request?.createdDate ??
    request?.requestDate ??
    request?.updatedAt;

const getItems = (request) => {
    if (Array.isArray(request?.items)) {
        return request.items;
    }

    if (Array.isArray(request?.purchaseRequestItems)) {
        return request.purchaseRequestItems;
    }

    return [];
};

const getItemPrice = (item) =>
    Number(
        item?.estimatedPrice ??
            item?.unitPrice ??
            item?.price ??
            0
    );

const getItemQuantity = (item) =>
    Number(item?.quantity ?? 0);

const getTotalAmount = (request) => {
    if (
        request?.totalAmount !== null &&
        request?.totalAmount !== undefined
    ) {
        return Number(request.totalAmount);
    }

    return getItems(request).reduce((total, item) => {
        return (
            total +
            getItemQuantity(item) * getItemPrice(item)
        );
    }, 0);
};

const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    });

const formatDate = (value) => {
    if (!value) {
        return "Not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getStatusStyle = (status) => {
    const styles = {
        PENDING: {
            backgroundColor: "rgba(245, 158, 11, 0.16)",
            color: "#d97706",
        },
        APPROVED: {
            backgroundColor: "rgba(16, 185, 129, 0.16)",
            color: "#059669",
        },
        REJECTED: {
            backgroundColor: "rgba(239, 68, 68, 0.16)",
            color: "#dc2626",
        },
        CANCELLED: {
            backgroundColor: "rgba(100, 116, 139, 0.16)",
            color: "#475569",
        },
    };

    return styles[status] ?? styles.PENDING;
};

function RequisitionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRequest = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getPurchaseRequestById(id);
                setRequest(data);
            } catch (requestError) {
                console.error(
                    "Requisition details error:",
                    requestError.response?.status,
                    requestError.response?.data
                );

                setError(
                    requestError.response?.data?.message ||
                        requestError.response?.data?.error ||
                        "Could not load requisition"
                );
            } finally {
                setLoading(false);
            }
        };

        loadRequest();
    }, [id]);

    const items = useMemo(
        () => getItems(request),
        [request]
    );

    const totalAmount = useMemo(
        () => getTotalAmount(request),
        [request]
    );

    if (loading) {
        return (
            <EmployeeLayout>
                <Box
                    minHeight="70vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    gap={2}
                >
                    <CircularProgress />

                    <Typography color="text.secondary">
                        Loading requisition details...
                    </Typography>
                </Box>
            </EmployeeLayout>
        );
    }

    if (error) {
        return (
            <EmployeeLayout>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() =>
                            navigate("/employee/my-requests")
                        }
                        sx={{ mb: 3 }}
                    >
                        Back
                    </Button>

                    <Alert severity="error">
                        {error}
                    </Alert>
                </Box>
            </EmployeeLayout>
        );
    }

    if (!request) {
        return (
            <EmployeeLayout>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Alert severity="warning">
                        Requisition not found
                    </Alert>
                </Box>
            </EmployeeLayout>
        );
    }

    const status = getEmployeeDisplayStatus(request);
    const statusStyle = getStatusStyle(status);

    return (
        <EmployeeLayout>
            <Box
                sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    p: {
                        xs: 2,
                        md: 4,
                    },
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() =>
                        navigate("/employee/my-requests")
                    }
                    sx={{
                        mb: 3,
                        textTransform: "none",
                        fontWeight: 700,
                    }}
                >
                    Back to My Requisitions
                </Button>

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 4,
                        },
                        mb: 3,
                        borderRadius: 4,
                        color: "#ffffff",
                        background:
                            "linear-gradient(135deg, #17172f 0%, #4f3fc9 55%, #7658f4 100%)",
                        boxShadow:
                            "0 18px 40px rgba(79, 63, 201, 0.22)",
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
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: 1.5,
                                    color:
                                        "rgba(255,255,255,0.75)",
                                }}
                            >
                                PURCHASE REQUISITION
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    mt: 0.5,
                                    fontWeight: 900,
                                    color: "#ffffff",
                                    fontSize: {
                                        xs: "2rem",
                                        md: "3rem",
                                    },
                                }}
                            >
                                {getRequestNumber(request)}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    color:
                                        "rgba(255,255,255,0.82)",
                                }}
                            >
                                {getPurpose(request)}
                            </Typography>
                        </Box>

                        <Chip
                            label={status.replaceAll("_", " ")}
                            sx={{
                                px: 1.5,
                                py: 2.4,
                                fontSize: "0.9rem",
                                fontWeight: 800,
                                backgroundColor: "#ffffff",
                                color: statusStyle.color,
                            }}
                        />
                    </Box>
                </Paper>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <InfoCard
                        icon={<ReceiptLongIcon />}
                        label="Requester"
                        value={getUserName(request)}
                    />

                    <InfoCard
                        icon={<BusinessIcon />}
                        label="Department"
                        value={getDepartmentName(request)}
                    />

                    <InfoCard
                        icon={<CalendarMonthIcon />}
                        label="Created Date"
                        value={formatDate(
                            getCreatedDate(request)
                        )}
                    />

                    <InfoCard
                        icon={<CurrencyRupeeIcon />}
                        label="Estimated Total"
                        value={formatCurrency(totalAmount)}
                    />
                </Box>

                <Card
                    elevation={0}
                    sx={{
                        mb: 3,
                        borderRadius: 4,
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <CardContent
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },
                            "&:last-child": {
                                pb: {
                                    xs: 2.5,
                                    md: 4,
                                },
                            },
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={1.5}
                            mb={2.5}
                        >
                            <DescriptionIcon color="primary" />

                            <Typography
                                variant="h5"
                                sx={{
                                    color: "#111827",
                                    fontWeight: 850,
                                }}
                            >
                                Request Purpose
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                color: "#64748b",
                                lineHeight: 1.8,
                            }}
                        >
                            {getPurpose(request)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <CardContent
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },
                            "&:last-child": {
                                pb: {
                                    xs: 2.5,
                                    md: 4,
                                },
                            },
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
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1.5}
                            >
                                <InventoryIcon color="primary" />

                                <Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "#111827",
                                            fontWeight: 850,
                                        }}
                                    >
                                        Requested Items
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#64748b",
                                        }}
                                    >
                                        {items.length} item
                                        {items.length === 1
                                            ? ""
                                            : "s"}{" "}
                                        included
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography
                                variant="h5"
                                sx={{
                                    color: "#4338ca",
                                    fontWeight: 900,
                                }}
                            >
                                {formatCurrency(totalAmount)}
                            </Typography>
                        </Box>

                        {items.length === 0 ? (
                            <Alert severity="info">
                                No item information available
                            </Alert>
                        ) : (
                            <Box
                                sx={{
                                    display: "grid",
                                    gap: 2,
                                }}
                            >
                                {items.map((item, index) => {
                                    const quantity =
                                        getItemQuantity(item);

                                    const price =
                                        getItemPrice(item);

                                    const itemTotal =
                                        quantity * price;

                                    const categoryName =
                                        item?.category
                                            ?.categoryName ??
                                        item?.category
                                            ?.name ??
                                        item?.categoryName ??
                                        `Category ${
                                            item?.categoryId ??
                                            "N/A"
                                        }`;

                                    return (
                                        <Paper
                                            key={
                                                item?.itemId ??
                                                item?.id ??
                                                index
                                            }
                                            variant="outlined"
                                            sx={{
                                                p: {
                                                    xs: 2,
                                                    md: 3,
                                                },
                                                borderRadius: 3,
                                                borderColor:
                                                    "#e2e8f0",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: {
                                                        xs:
                                                            "flex-start",
                                                        md:
                                                            "center",
                                                    },
                                                    flexDirection: {
                                                        xs:
                                                            "column",
                                                        md:
                                                            "row",
                                                    },
                                                    gap: 2,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            color:
                                                                "#111827",
                                                            fontWeight:
                                                                850,
                                                        }}
                                                    >
                                                        {item?.itemName ??
                                                            "Unnamed item"}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            mt: 0.5,
                                                            color:
                                                                "#64748b",
                                                        }}
                                                    >
                                                        {categoryName}
                                                    </Typography>
                                                </Box>

                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        color:
                                                            "#4338ca",
                                                        fontWeight:
                                                            900,
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        itemTotal
                                                    )}
                                                </Typography>
                                            </Box>

                                            {item?.itemDescription && (
                                                <Typography
                                                    sx={{
                                                        mt: 2,
                                                        color:
                                                            "#64748b",
                                                    }}
                                                >
                                                    {
                                                        item.itemDescription
                                                    }
                                                </Typography>
                                            )}

                                            <Divider sx={{ my: 2 }} />

                                            <Box
                                                sx={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        {
                                                            xs:
                                                                "1fr",
                                                            sm:
                                                                "repeat(3, 1fr)",
                                                        },
                                                    gap: 2,
                                                }}
                                            >
                                                <DetailValue
                                                    label="Quantity"
                                                    value={quantity}
                                                />

                                                <DetailValue
                                                    label="Estimated Price"
                                                    value={formatCurrency(
                                                        price
                                                    )}
                                                />

                                                <DetailValue
                                                    label="Item Total"
                                                    value={formatCurrency(
                                                        itemTotal
                                                    )}
                                                />
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </EmployeeLayout>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                mb={1.5}
            >
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4338ca",
                        backgroundColor:
                            "rgba(99,102,241,0.12)",
                    }}
                >
                    {icon}
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#64748b",
                        fontWeight: 700,
                    }}
                >
                    {label}
                </Typography>
            </Box>

            <Typography
                sx={{
                    color: "#111827",
                    fontWeight: 850,
                    wordBreak: "break-word",
                }}
            >
                {value}
            </Typography>
        </Paper>
    );
}

function DetailValue({ label, value }) {
    return (
        <Box>
            <Typography
                variant="caption"
                sx={{
                    color: "#64748b",
                    fontWeight: 700,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    mt: 0.5,
                    color: "#111827",
                    fontWeight: 850,
                }}
            >
                {value}
            </Typography>
        </Box>
    );
}

export default RequisitionDetails;