import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    getEmployeeDisplayStatus,
    getInternalStatus,
} from "../../utils/purchaseRequestStatus";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import EmployeeLayout from "../../layouts/EmployeeLayout";

import {
    cancelPurchaseRequest,
    getMyPurchaseRequests,
} from "../../api/purchaseRequestApi";

const statusOptions = [
    "ALL",
    "PENDING",
    "IN_APPROVAL",
    "APPROVED",
    "PO_GENERATED",
    "REJECTED",
    "CANCELLED",
];

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

const getPurpose = (request) =>
    request?.purpose ??
    request?.justification ??
    "No purpose provided";

// const getStatus = (request) =>
//     String(request?.status ?? "PENDING").toUpperCase();

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

const getItemCount = (request) => {
    const items = getItems(request);

    if (items.length > 0) {
        return items.length;
    }

    return request?.itemCount ?? 0;
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
        return value;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const getStatusStyle = (status) => {
    const styles = {
        PENDING: {
            backgroundColor: "#fff7ed",
            color: "#c2410c",
        },
        IN_APPROVAL: {
            backgroundColor: "#eff6ff",
            color: "#2563eb",
        },
        APPROVED: {
            backgroundColor: "#ecfdf5",
            color: "#059669",
        },
        PO_GENERATED: {
            backgroundColor: "#f5f3ff",
            color: "#7c3aed",
        },
        REJECTED: {
            backgroundColor: "#fef2f2",
            color: "#dc2626",
        },
        CANCELLED: {
            backgroundColor: "#f1f5f9",
            color: "#475569",
        },
    };

    return styles[status] ?? styles.PENDING;
};

function MyRequisitions() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    const [message, setMessage] = useState({
        open: false,
        type: "success",
        text: "",
    });

    const loadRequests = useCallback(async () => {
        setLoading(true);

        try {
            const data = await getMyPurchaseRequests();

            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(
                "My requisitions error:",
                error.response?.status,
                error.response?.data
            );

            setMessage({
                open: true,
                type: "error",
                text:
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Unable to load your purchase requisitions",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    const filteredRequests = useMemo(() => {
        const searchValue = searchText
            .trim()
            .toLowerCase();

        return requests.filter((request) => {
            const requestStatus =
    getEmployeeDisplayStatus(request);

            const matchesStatus =
                statusFilter === "ALL" ||
                requestStatus === statusFilter;

            const searchableValue = [
                getRequestNumber(request),
                getPurpose(request),
                request?.department?.departmentName,
                request?.department?.deptName,
                request?.department?.name,
                ...getItems(request).map(
                    (item) => item?.itemName
                ),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                searchValue === "" ||
                searchableValue.includes(searchValue);

            return matchesStatus && matchesSearch;
        });
    }, [requests, searchText, statusFilter]);

    const canCancel = (request) => {
    const status = getInternalStatus(request);

    return [
        "PENDING_MANAGER_APPROVAL",
        "PENDING_DIRECTOR_APPROVAL",
        "PENDING_FINANCE_APPROVAL"
    ].includes(status);
};

    const openCancelDialog = (request) => {
        setSelectedRequest(request);
        setCancelDialogOpen(true);
    };

    const closeCancelDialog = () => {
        if (!cancelling) {
            setCancelDialogOpen(false);
            setSelectedRequest(null);
        }
    };

    const handleCancel = async () => {
        const requestId = getRequestId(selectedRequest);

        if (!requestId) {
            setMessage({
                open: true,
                type: "error",
                text: "Purchase request ID is missing",
            });

            return;
        }

        setCancelling(true);

        try {
            await cancelPurchaseRequest(requestId);

            setMessage({
                open: true,
                type: "success",
                text: "Purchase requisition cancelled successfully",
            });

            setCancelDialogOpen(false);
            setSelectedRequest(null);

            await loadRequests();
        } catch (error) {
            setMessage({
                open: true,
                type: "error",
                text:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to cancel the purchase requisition",
            });
        } finally {
            setCancelling(false);
        }
    };

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
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#111827",
                                fontWeight: 900,
                            }}
                        >
                            My Purchase Requisitions
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.5,
                                color: "#64748b",
                            }}
                        >
                            Track and manage all purchase requests
                            raised by you.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Tooltip title="Refresh">
                            <IconButton
                                onClick={loadRequests}
                                sx={{
                                    width: 46,
                                    height: 46,
                                    border:
                                        "1px solid #e2e8f0",
                                    backgroundColor: "#ffffff",

                                    "&:hover": {
                                        backgroundColor: "#f8fafc",
                                    },
                                }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                                navigate(
                                    "/employee/raise-request"
                                )
                            }
                            sx={{
                                px: 2.5,
                                py: 1.25,
                                borderRadius: 2.5,
                                fontWeight: 850,
                                textTransform: "none",
                                background:
                                    "linear-gradient(135deg, #6366f1, #9333ea)",
                            }}
                        >
                            Raise New PR
                        </Button>
                    </Box>
                </Box>

                <Card
                    elevation={0}
                    sx={{
                        mb: 3,
                        p: {
                            xs: 2,
                            md: 2.5,
                        },
                        borderRadius: 4,
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        boxShadow:
                            "0 10px 28px rgba(15,23,42,0.05)",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "minmax(0, 1fr)",
                                md:
                                    "minmax(0, 1fr) 250px",
                            },
                            gap: 2,
                            alignItems: "stretch",
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search PR number, purpose or item..."
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(
                                    event.target.value
                                )
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            sx={{
                                                color:
                                                    "#64748b",
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 56,
                                    borderRadius: 2.5,
                                    backgroundColor: "#ffffff",
                                },
                            }}
                        />

                        <Select
                            fullWidth
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                            sx={{
                                height: 56,
                                borderRadius: 2.5,
                                backgroundColor: "#ffffff",
                            }}
                        >
                            {statusOptions.map((status) => (
                                <MenuItem
                                    key={status}
                                    value={status}
                                >
                                    {status === "ALL"
                                        ? "All Statuses"
                                        : status.replaceAll(
                                              "_",
                                              " "
                                          )}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Card>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#ffffff",
                        boxShadow:
                            "0 12px 32px rgba(15,23,42,0.05)",
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                minHeight: 380,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <CircularProgress />

                            <Typography
                                sx={{
                                    color: "#64748b",
                                }}
                            >
                                Loading your purchase requisitions...
                            </Typography>
                        </Box>
                    ) : filteredRequests.length === 0 ? (
                        <Box
                            sx={{
                                minHeight: 380,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                textAlign: "center",
                                px: 3,
                            }}
                        >
                            <ReceiptLongIcon
                                sx={{
                                    fontSize: 72,
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
                                No purchase requisitions found
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    mb: 3,
                                    color: "#64748b",
                                }}
                            >
                                Raise your first purchase
                                requisition or change the selected
                                filters.
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() =>
                                    navigate(
                                        "/employee/raise-request"
                                    )
                                }
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 2.5,
                                    fontWeight: 850,
                                    textTransform: "none",
                                }}
                            >
                                Raise Purchase Request
                            </Button>
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor:
                                                "#f8fafc",
                                        }}
                                    >
                                        {[
                                            "PR Number",
                                            "Purpose",
                                            "Items",
                                            "Total Amount",
                                            "Created Date",
                                            "Status",
                                        ].map((heading) => (
                                            <TableCell
                                                key={heading}
                                                sx={{
                                                    fontWeight: 850,
                                                    color: "#334155",
                                                    whiteSpace:
                                                        "nowrap",
                                                }}
                                            >
                                                {heading}
                                            </TableCell>
                                        ))}

                                        <TableCell
                                            align="right"
                                            sx={{
                                                fontWeight: 850,
                                                color: "#334155",
                                            }}
                                        >
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {filteredRequests.map(
                                        (request) => {
                                            const requestId =
                                                getRequestId(
                                                    request
                                                );

                                            const status = getEmployeeDisplayStatus(request);

                                            return (
                                                <TableRow
                                                    key={
                                                        requestId ??
                                                        getRequestNumber(
                                                            request
                                                        )
                                                    }
                                                    hover
                                                >
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    "#4338ca",
                                                                fontWeight:
                                                                    900,
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {getRequestNumber(
                                                                request
                                                            )}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                maxWidth:
                                                                    310,
                                                                color:
                                                                    "#334155",
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {getPurpose(
                                                                request
                                                            )}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    "#334155",
                                                                fontWeight:
                                                                    750,
                                                            }}
                                                        >
                                                            {getItemCount(
                                                                request
                                                            )}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    "#111827",
                                                                fontWeight:
                                                                    850,
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {formatCurrency(
                                                                getTotalAmount(
                                                                    request
                                                                )
                                                            )}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    "#64748b",
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {formatDate(
                                                                getCreatedDate(
                                                                    request
                                                                )
                                                            )}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            label={status.replaceAll(
                                                                "_",
                                                                " "
                                                            )}
                                                            sx={{
                                                                px: 1,
                                                                fontWeight:
                                                                    850,
                                                                ...getStatusStyle(
                                                                    status
                                                                ),
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <Tooltip title="View details">
                                                            <IconButton
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/employee/request/${requestId}`
                                                                    )
                                                                }
                                                                sx={{
                                                                    color:
                                                                        "#4338ca",
                                                                }}
                                                            >
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        {canCancel(
                                                            request
                                                        ) && (
                                                            <Tooltip title="Cancel request">
                                                                <IconButton
                                                                    color="error"
                                                                    onClick={() =>
                                                                        openCancelDialog(
                                                                            request
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Card>

                <Dialog
                    open={cancelDialogOpen}
                    onClose={closeCancelDialog}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>
                        Cancel Purchase Requisition?
                    </DialogTitle>

                    <DialogContent>
                        <Typography
                            sx={{
                                color: "#64748b",
                            }}
                        >
                            Are you sure you want to cancel{" "}
                            <strong>
                                {selectedRequest
                                    ? getRequestNumber(
                                          selectedRequest
                                      )
                                    : ""}
                            </strong>
                            ?
                        </Typography>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            p: 2.5,
                        }}
                    >
                        <Button
                            onClick={closeCancelDialog}
                            disabled={cancelling}
                        >
                            Keep Request
                        </Button>

                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleCancel}
                            disabled={cancelling}
                        >
                            {cancelling
                                ? "Cancelling..."
                                : "Cancel Request"}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={message.open}
                    autoHideDuration={4500}
                    onClose={() =>
                        setMessage((previous) => ({
                            ...previous,
                            open: false,
                        }))
                    }
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <Alert
                        severity={message.type}
                        variant="filled"
                        onClose={() =>
                            setMessage((previous) => ({
                                ...previous,
                                open: false,
                            }))
                        }
                    >
                        {message.text}
                    </Alert>
                </Snackbar>
            </Box>
        </EmployeeLayout>
    );
}

export default MyRequisitions;