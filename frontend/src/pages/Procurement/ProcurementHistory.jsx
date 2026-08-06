import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import ProcurementLayout from "../../layouts/ProcurementLayout";

import {
    getProcessedVendorSelections,
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

const getSupplierName = (request) =>
    request?.selectedSupplier?.supplierName ??
    request?.selectedSupplier?.name ??
    "Not available";

const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));

const formatStatus = (status) =>
    String(status || "UNKNOWN")
        .replaceAll("_", " ");

function ProcurementHistory() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadHistory = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data =
                await getProcessedVendorSelections();

            setRequests(
                Array.isArray(data) ? data : []
            );
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                    requestError.response?.data?.error ||
                    "Unable to load processed requests"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

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
                        Processed Procurement Requests
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.7,
                            color: "#64748b",
                        }}
                    >
                        Purchase requests with selected suppliers
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<RefreshRoundedIcon />}
                    onClick={loadHistory}
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
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box
                    sx={{
                        minHeight: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : requests.length === 0 ? (
                <Alert severity="info">
                    No processed procurement requests found.
                </Alert>
            ) : (
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                    }}
                >
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
                                    Selected Supplier
                                </TableCell>

                                <TableCell>
                                    Amount
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {requests.map((request) => (
                                <TableRow
                                    key={getRequestId(request)}
                                    hover
                                >
                                    <TableCell>
                                        <Typography
                                            sx={{
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
                                        {getSupplierName(
                                            request
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {formatMoney(
                                            request.totalAmount
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {formatStatus(
                                            request.status
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </ProcurementLayout>
    );
}

export default ProcurementHistory;