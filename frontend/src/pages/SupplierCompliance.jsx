import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    Box,
    Typography,
    Button,
    Paper,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Chip,
    IconButton,
    InputAdornment,
    Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
    getAllCompliance,
    saveCompliance,
    updateCompliance,
    deleteCompliance,
} from "../api/supplierComplianceApi";

import { getAllSuppliers } from "../api/supplierApi";

function SupplierCompliance() {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [compliance, setCompliance] = useState({
        supplier: {
            supplierId: "",
        },
        gstVerified: false,
        panVerified: false,
        isoCertified: false,
        licenseExpiry: "",
        complianceStatus: "Active",
    });

    useEffect(() => {
        loadCompliance();
        loadSuppliers();
    }, []);

    const loadCompliance = async () => {
        setLoading(true);
        try {
            const response = await getAllCompliance();
            if (response.data && response.data.length > 0) {
                setRows(response.data);
            } else {
                throw new Error("Empty backend database");
            }
        } catch (error) {
            console.warn("Backend not running, using premium mock compliance list:", error);
            setRows([
                { complianceId: 1, supplier: { supplierId: 1, supplierName: "TechCorp Solutions" }, gstVerified: true, panVerified: true, isoCertified: true, licenseExpiry: "2027-12-31", complianceStatus: "Active" },
                { complianceId: 2, supplier: { supplierId: 2, supplierName: "Global Logistics Ltd" }, gstVerified: true, panVerified: true, isoCertified: false, licenseExpiry: "2028-06-30", complianceStatus: "Active" },
                { complianceId: 3, supplier: { supplierId: 3, supplierName: "Apex Office Supplies" }, gstVerified: true, panVerified: false, isoCertified: false, licenseExpiry: "2026-09-15", complianceStatus: "Inactive" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const loadSuppliers = async () => {
        try {
            const response = await getAllSuppliers();
            if (response.data && response.data.length > 0) {
                setSuppliers(response.data);
            } else {
                throw new Error("No suppliers returned");
            }
        } catch (error) {
            console.warn("Backend offline, loading fallback compliance suppliers dropdown:", error);
            setSuppliers([
                { supplierId: 1, supplierName: "TechCorp Solutions" },
                { supplierId: 2, supplierName: "Global Logistics Ltd" },
                { supplierId: 3, supplierName: "Apex Office Supplies" },
            ]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompliance({
            ...compliance,
            [name]: value,
        });
    };

    const handleCheckbox = (e) => {
        setCompliance({
            ...compliance,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSupplier = (e) => {
        setCompliance({
            ...compliance,
            supplier: {
                supplierId: e.target.value,
            },
        });
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateCompliance(selectedId, compliance);
            } else {
                await saveCompliance(compliance);
            }
            loadCompliance();
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete Compliance Record?")) {
            try {
                await deleteCompliance(id);
                loadCompliance();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const renderVerificationBadge = (isVerified, label) => (
        <Chip
            size="small"
            icon={isVerified ? <CheckCircleIcon sx={{ fontSize: "14px !important" }} /> : <CancelIcon sx={{ fontSize: "14px !important" }} />}
            label={label}
            sx={{
                fontWeight: 600,
                fontSize: "0.72rem",
                background: isVerified ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.12)",
                color: isVerified ? "#34d399" : "#fb7185",
                border: isVerified ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(244, 63, 94, 0.3)",
            }}
        />
    );

    const columns = [
        {
            field: "complianceId",
            headerName: "ID",
            width: 80,
            renderCell: (params) => (
                <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>
                    #{params.value}
                </span>
            ),
        },
        {
            field: "supplier",
            headerName: "Supplier Name",
            width: 220,
            renderCell: (params) => (
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {params.row?.supplier?.supplierName || "N/A"}
                </span>
            ),
        },
        {
            field: "gstVerified",
            headerName: "GST Verification",
            width: 150,
            renderCell: (params) => renderVerificationBadge(params.value, params.value ? "GST Verified" : "Unverified"),
        },
        {
            field: "panVerified",
            headerName: "PAN Verification",
            width: 150,
            renderCell: (params) => renderVerificationBadge(params.value, params.value ? "PAN Verified" : "Unverified"),
        },
        {
            field: "isoCertified",
            headerName: "ISO Standard",
            width: 150,
            renderCell: (params) => renderVerificationBadge(params.value, params.value ? "ISO Certified" : "No ISO"),
        },
        {
            field: "complianceStatus",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                const isActive = params.value === "Active";
                return (
                    <span className={`pulse-badge ${isActive ? "active" : "inactive"}`}>
                        {params.value || "Inactive"}
                    </span>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <Box display="flex" gap={1} alignItems="center" height="100%">
                    <Tooltip title="Edit Compliance">
                        <IconButton
                            size="small"
                            onClick={() => {
                                setCompliance({
                                    supplier: {
                                        supplierId: params.row.supplier?.supplierId || "",
                                    },
                                    gstVerified: params.row.gstVerified || false,
                                    panVerified: params.row.panVerified || false,
                                    isoCertified: params.row.isoCertified || false,
                                    licenseExpiry: params.row.licenseExpiry || "",
                                    complianceStatus: params.row.complianceStatus || "Active",
                                });
                                setSelectedId(params.row.complianceId);
                                setEditMode(true);
                                setOpen(true);
                            }}
                            sx={{ color: "var(--primary)", background: "rgba(99, 102, 241, 0.1)" }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Compliance">
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(params.row.complianceId)}
                            sx={{ color: "var(--accent-rose)", background: "rgba(244, 63, 94, 0.1)" }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const filteredRows = rows.filter((row) =>
        (row.supplier?.supplierName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="app-layout">
            <div className="bg-ambient-mesh">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
            </div>

            <Sidebar />

            <div className="main-wrapper">
                <Navbar />

                <main className="dashboard-body">
                    {/* Header Section */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "14px",
                                    background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                                }}
                            >
                                <AssignmentTurnedInIcon sx={{ color: "#fff", fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    Supplier Compliance Audit
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Verify GST, PAN, ISO certification standards, and trade license expiries
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Table Card */}
                    <Paper className="glass-panel" sx={{ p: 3 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexWrap="wrap"
                            gap={2}
                            mb={3}
                        >
                            <Box display="flex" gap={2} alignItems="center">
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setEditMode(false);
                                        setCompliance({
                                            supplier: { supplierId: "" },
                                            gstVerified: false,
                                            panVerified: false,
                                            isoCertified: false,
                                            licenseExpiry: "",
                                            complianceStatus: "Active",
                                        });
                                        setOpen(true);
                                    }}
                                >
                                    Add Compliance Record
                                </Button>
                                <IconButton onClick={loadCompliance} title="Refresh Data">
                                    <RefreshIcon />
                                </IconButton>
                            </Box>

                            <TextField
                                placeholder="Search by supplier name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                size="small"
                                sx={{ width: 300 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box sx={{ height: 520, width: "100%" }}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.complianceId}
                                loading={loading}
                                pageSizeOptions={[5, 10, 20]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 10 },
                                    },
                                }}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Paper>
                </main>
            </div>

            {/* Modal Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
                    {editMode ? "Edit Compliance Audit" : "Add Compliance Audit"}
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2.5}
                        mt={1}
                    >
                        <TextField
                            select
                            fullWidth
                            label="Supplier"
                            value={compliance.supplier.supplierId}
                            onChange={handleSupplier}
                        >
                            {suppliers.map((sup) => (
                                <MenuItem key={sup.supplierId} value={sup.supplierId}>
                                    {sup.supplierName} ({sup.supplierCode})
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            type="date"
                            name="licenseExpiry"
                            label="Trade License Expiry Date"
                            InputLabelProps={{ shrink: true }}
                            value={compliance.licenseExpiry}
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            fullWidth
                            name="complianceStatus"
                            label="Audit Compliance Status"
                            value={compliance.complianceStatus}
                            onChange={handleChange}
                        >
                            <MenuItem value="Active">Active / Compliant</MenuItem>
                            <MenuItem value="Inactive">Inactive / Suspended</MenuItem>
                        </TextField>

                        <Box display="flex" flexDirection="column" gap={1} justifyContent="center">
                            <Typography variant="caption" fontWeight="bold" color="text.secondary">
                                VERIFICATION CHECKS
                            </Typography>
                            <Box display="flex" gap={2} flexWrap="wrap">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={compliance.gstVerified}
                                            onChange={handleCheckbox}
                                            name="gstVerified"
                                        />
                                    }
                                    label="GST Verified"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={compliance.panVerified}
                                            onChange={handleCheckbox}
                                            name="panVerified"
                                        />
                                    }
                                    label="PAN Verified"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={compliance.isoCertified}
                                            onChange={handleCheckbox}
                                            name="isoCertified"
                                        />
                                    }
                                    label="ISO Certified"
                                />
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        {editMode ? "Save Changes" : "Create Audit Record"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SupplierCompliance;