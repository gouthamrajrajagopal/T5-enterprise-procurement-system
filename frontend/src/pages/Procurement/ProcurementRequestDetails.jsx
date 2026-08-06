import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import ProcurementLayout from "../../layouts/ProcurementLayout";

import {
    getAllSuppliers,
    selectVendor,
} from "../../api/procurementApi";

import {
    getPurchaseRequestById,
} from "../../api/purchaseRequestApi";

const getRequestNumber = (request) =>
    request?.requestNumber ??
    request?.prNumber ??
    `PR-${request?.requestId ?? "N/A"}`;

const getEmployeeName = (request) =>
    request?.user?.name ??
    request?.employee?.name ??
    "Employee";

const getDepartmentName = (request) =>
    request?.department?.deptName ??
    request?.department?.departmentName ??
    request?.department?.name ??
    "Not available";

const getItems = (request) =>
    Array.isArray(request?.items)
        ? request.items
        : Array.isArray(request?.purchaseRequestItems)
          ? request.purchaseRequestItems
          : [];

const getSupplierId = (supplier) =>
    supplier?.supplierId ??
    supplier?.id;

const getSupplierName = (supplier) =>
    supplier?.supplierName ??
    supplier?.name ??
    `Supplier ${getSupplierId(supplier)}`;

const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(value || 0));

function ProcurementRequestDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState(null);
    const [suppliers, setSuppliers] = useState([]);

    const [
        selectedSupplierId,
        setSelectedSupplierId,
    ] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadPage = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const [requestData, supplierData] =
                await Promise.all([
                    getPurchaseRequestById(id),
                    getAllSuppliers(),
                ]);

            setRequest(requestData);

            setSuppliers(
                Array.isArray(supplierData)
                    ? supplierData
                    : []
            );
        } catch (requestError) {
            console.error(
                "Procurement details error:",
                requestError.response?.status,
                requestError.response?.data
            );

            setError(
                requestError.response?.data?.message ||
                    requestError.response?.data?.error ||
                    requestError.message ||
                    "Unable to load procurement details"
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadPage();
    }, [loadPage]);

    const items = useMemo(
        () => getItems(request),
        [request]
    );

    const handleSupplierSelection = async () => {
        if (!selectedSupplierId) {
            setError("Please select a supplier");
            return;
        }

        const confirmed = window.confirm(
            "Confirm this supplier for the purchase request?"
        );

        if (!confirmed) {
            return;
        }

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            await selectVendor(
                id,
                selectedSupplierId
            );

            setSuccess(
                "Supplier selected successfully"
            );

            setTimeout(() => {
                navigate("/procurement/pending", {
                    replace: true,
                });
            }, 1000);
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                    requestError.response?.data?.error ||
                    requestError.message ||
                    "Unable to select supplier"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <ProcurementLayout>
                <Box
                    sx={{
                        minHeight: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </ProcurementLayout>
        );
    }

    if (!request) {
        return (
            <ProcurementLayout>
                <Alert severity="warning">
                    Purchase request not found.
                </Alert>
            </ProcurementLayout>
        );
    }

    return (
        <ProcurementLayout>
            <Button
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() =>
                    navigate("/procurement/pending")
                }
                sx={{
                    mb: 3,
                    fontWeight: 800,
                    textTransform: "none",
                }}
            >
                Back to Pending Requests
            </Button>

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

            {success && (
                <Alert
                    severity="success"
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                    }}
                >
                    {success}
                </Alert>
            )}

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
                <Typography
                    variant="overline"
                    sx={{
                        color: "rgba(255,255,255,0.75)",
                        fontWeight: 900,
                        letterSpacing: 1.4,
                    }}
                >
                    APPROVED PURCHASE REQUEST
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        mt: 0.5,
                        color: "#ffffff",
                        fontWeight: 900,
                    }}
                >
                    {getRequestNumber(request)}
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        color: "rgba(255,255,255,0.82)",
                    }}
                >
                    {request?.purpose ||
                        "No purpose provided"}
                </Typography>
            </Paper>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(3, 1fr)",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <InfoCard
                    icon={<PersonRoundedIcon />}
                    label="Employee"
                    value={getEmployeeName(request)}
                />

                <InfoCard
                    icon={<BusinessRoundedIcon />}
                    label="Department"
                    value={getDepartmentName(request)}
                />

                <InfoCard
                    icon={<InventoryRoundedIcon />}
                    label="Estimated Amount"
                    value={formatMoney(
                        request.totalAmount
                    )}
                />
            </Box>

            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 4,
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            color: "#111827",
                            fontWeight: 900,
                        }}
                    >
                        Requested Items
                    </Typography>

                    {items.length === 0 ? (
                        <Alert severity="info">
                            No item information available.
                        </Alert>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gap: 2,
                            }}
                        >
                            {items.map((item, index) => {
                                const quantity = Number(
                                    item?.quantity || 0
                                );

                                const price = Number(
                                    item?.estimatedPrice ??
                                        item?.unitPrice ??
                                        item?.price ??
                                        0
                                );

                                return (
                                    <Paper
                                        key={
                                            item?.itemId ??
                                            item?.id ??
                                            index
                                        }
                                        variant="outlined"
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 3,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 850,
                                            }}
                                        >
                                            {item?.itemName ||
                                                "Unnamed item"}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 0.5,
                                                color: "#64748b",
                                            }}
                                        >
                                            {item?.itemDescription ||
                                                "No description"}
                                        </Typography>

                                        <Divider
                                            sx={{
                                                my: 2,
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: {
                                                    xs: "1fr",
                                                    sm:
                                                        "repeat(3,1fr)",
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
                                                value={formatMoney(
                                                    price
                                                )}
                                            />

                                            <DetailValue
                                                label="Item Total"
                                                value={formatMoney(
                                                    quantity * price
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

            <Card
                elevation={0}
                sx={{
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 4,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.3,
                            mb: 3,
                        }}
                    >
                        <StorefrontRoundedIcon
                            color="primary"
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 900,
                            }}
                        >
                            Select Supplier
                        </Typography>
                    </Box>

                    {suppliers.length === 0 ? (
                        <Alert
                            severity="warning"
                            sx={{
                                mb: 3,
                            }}
                        >
                            No suppliers are available.
                        </Alert>
                    ) : (
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 3,
                            }}
                        >
                            <InputLabel id="supplier-label">
                                Supplier
                            </InputLabel>

                            <Select
                                labelId="supplier-label"
                                label="Supplier"
                                value={selectedSupplierId}
                                onChange={(event) =>
                                    setSelectedSupplierId(
                                        event.target.value
                                    )
                                }
                            >
                                {suppliers.map(
                                    (supplier) => (
                                        <MenuItem
                                            key={getSupplierId(
                                                supplier
                                            )}
                                            value={getSupplierId(
                                                supplier
                                            )}
                                        >
                                            {getSupplierName(
                                                supplier
                                            )}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    )}

                    <Button
                        variant="contained"
                        size="large"
                        disabled={
                            submitting ||
                            !selectedSupplierId ||
                            suppliers.length === 0
                        }
                        onClick={handleSupplierSelection}
                        sx={{
                            px: 4,
                            py: 1.3,
                            fontWeight: 900,
                            textTransform: "none",
                        }}
                    >
                        {submitting
                            ? "Selecting Supplier..."
                            : "Confirm Supplier Selection"}
                    </Button>
                </CardContent>
            </Card>
        </ProcurementLayout>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
            }}
        >
            <Box
                sx={{
                    width: 42,
                    height: 42,
                    mb: 1.5,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4338ca",
                    backgroundColor: "#eef2ff",
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

            <Typography
                sx={{
                    mt: 0.5,
                    color: "#111827",
                    fontWeight: 850,
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

export default ProcurementRequestDetails;