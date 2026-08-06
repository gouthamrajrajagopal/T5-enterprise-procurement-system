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
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

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

const formatDate = (value) => {
    if (!value) {
        return "Not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

function PendingVendorSelection() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
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
            setError(
                requestError.response?.data?.message ||
                    requestError.response?.data?.error ||
                    "Unable to load pending requests"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    const filteredRequests = useMemo(() => {
        const keyword = search
            .trim()
            .toLowerCase();

        if (!keyword) {
            return requests;
        }

        return requests.filter((request) => {
            const text = [
                getRequestNumber(request),
                getEmployeeName(request),
                getDepartmentName(request),
                request?.purpose,
                request?.status,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return text.includes(keyword);
        });
    }, [requests, search]);

    return (
        <ProcurementLayout>
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
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#111827",
                            fontWeight: 900,
                        }}
                    >
                        Pending Vendor Selection
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.7,
                            color: "#64748b",
                        }}
                    >
                        Approved requests waiting for a supplier
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<RefreshRoundedIcon />}
                    onClick={loadRequests}
                    disabled={loading}
                    sx={{
                        fontWeight: 800,
                        textTransform: "none",
                    }}
                >
                    Refresh
                </Button>
            </Box>

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

            <Paper
                elevation={0}
                sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                }}
            >
                <TextField
                    fullWidth
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search by PR number, employee, department or purpose"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            minHeight: 320,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : filteredRequests.length === 0 ? (
                    <Box
                        sx={{
                            minHeight: 250,
                            p: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Alert
                            severity="info"
                            sx={{
                                width: "100%",
                            }}
                        >
                            No pending vendor-selection requests found.
                        </Alert>
                    </Box>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "#f8fafc",
                                }}
                            >
                                <TableCell>
                                    PR Number
                                </TableCell>

                                <TableCell>
                                    Employee
                                </TableCell>

                                <TableCell>
                                    Department
                                </TableCell>

                                <TableCell>
                                    Amount
                                </TableCell>

                                <TableCell>
                                    Created Date
                                </TableCell>

                                <TableCell align="center">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredRequests.map(
                                (request) => {
                                    const requestId =
                                        getRequestId(request);

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
                                                        color: "#111827",
                                                        fontWeight: 850,
                                                    }}
                                                >
                                                    {getRequestNumber(
                                                        request
                                                    )}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                {getEmployeeName(
                                                    request
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {getDepartmentName(
                                                    request
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {formatMoney(
                                                        request.totalAmount
                                                    )}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                {formatDate(
                                                    request.createdDate ??
                                                        request.createdAt
                                                )}
                                            </TableCell>

                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(
                                                            `/procurement/request/${requestId}`
                                                        )
                                                    }
                                                    sx={{
                                                        fontWeight: 800,
                                                        textTransform:
                                                            "none",
                                                    }}
                                                >
                                                    Review
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </ProcurementLayout>
    );
}

export default PendingVendorSelection;