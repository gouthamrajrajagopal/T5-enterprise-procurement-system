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
    Chip,
    IconButton,
    InputAdornment,
    Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";

import {
    getAllSuppliers,
    saveSupplier,
    updateSupplier,
    deleteSupplier,
} from "../api/supplierApi";

function Supplier() {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [supplier, setSupplier] = useState({
        supplierCode: "",
        supplierName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        status: "Active",
    });

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        setLoading(true);
        try {
            const response = await getAllSuppliers();
            if (response.data && response.data.length > 0) {
                setRows(response.data);
            } else {
                throw new Error("Empty backend database");
            }
        } catch (error) {
            console.warn("Backend not running, using premium mock suppliers list:", error);
            setRows([
                { supplierId: 1, supplierCode: "SUP-001", supplierName: "TechCorp Solutions", contactPerson: "John Doe", email: "john@techcorp.com", phone: "+1-555-0199", address: "123 Technology Way, Silicon Valley, CA", gstNumber: "12AAAAA1111A1Z1", status: "Active" },
                { supplierId: 2, supplierCode: "SUP-002", supplierName: "Global Logistics Ltd", contactPerson: "Jane Smith", email: "jane@globallogistics.com", phone: "+1-555-0188", address: "789 Freight Terminal Blvd, Houston, TX", gstNumber: "45BBBBB2222B2Z2", status: "Active" },
                { supplierId: 3, supplierCode: "SUP-003", supplierName: "Apex Office Supplies", contactPerson: "Bob Johnson", email: "bob@apexsupplies.com", phone: "+1-555-0177", address: "456 Commerce St, New York, NY", gstNumber: "78CCCCC3333C3Z3", status: "Inactive" },
                { supplierId: 4, supplierCode: "SUP-004", supplierName: "Industrial Materials Inc", contactPerson: "Sarah Connor", email: "s.connor@indmaterials.com", phone: "+1-555-0166", address: "101 Forge Lane, Pittsburgh, PA", gstNumber: "99DDDDD4444D4Z4", status: "Active" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSupplier({
            ...supplier,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (row) => {
        setSupplier({
            supplierCode: row.supplierCode || "",
            supplierName: row.supplierName || "",
            contactPerson: row.contactPerson || "",
            email: row.email || "",
            phone: row.phone || "",
            address: row.address || "",
            gstNumber: row.gstNumber || "",
            status: row.status || "Active",
        });
        setSelectedId(row.supplierId);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this supplier?")) return;
        try {
            await deleteSupplier(id);
            loadSuppliers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveSupplier = async () => {
        try {
            if (editMode) {
                await updateSupplier(selectedId, supplier);
            } else {
                await saveSupplier(supplier);
            }
            loadSuppliers();
            setOpen(false);
            setEditMode(false);
            setSelectedId(null);
            setSupplier({
                supplierCode: "",
                supplierName: "",
                contactPerson: "",
                email: "",
                phone: "",
                address: "",
                gstNumber: "",
                status: "Active",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            field: "supplierId",
            headerName: "ID",
            width: 80,
            renderCell: (params) => (
                <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>
                    #{params.value}
                </span>
            ),
        },
        {
            field: "supplierCode",
            headerName: "Supplier Code",
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: "6px" }}
                />
            ),
        },
        {
            field: "supplierName",
            headerName: "Supplier Name",
            width: 220,
            renderCell: (params) => (
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: "contactPerson",
            headerName: "Contact Person",
            width: 180,
        },
        {
            field: "email",
            headerName: "Email",
            width: 220,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },
        {
            field: "gstNumber",
            headerName: "GST Number",
            width: 180,
        },
        {
            field: "status",
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
                    <Tooltip title="Edit Supplier">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(params.row)}
                            sx={{ color: "var(--primary)", background: "rgba(99, 102, 241, 0.1)" }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Supplier">
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(params.row.supplierId)}
                            sx={{ color: "var(--accent-rose)", background: "rgba(244, 63, 94, 0.1)" }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const filteredRows = rows.filter((row) => {
        const supplierName = row.supplierName || "";
        const supplierCode = row.supplierCode || "";
        return (
            supplierName.toLowerCase().includes(search.toLowerCase()) ||
            supplierCode.toLowerCase().includes(search.toLowerCase())
        );
    });

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
                                    background: "var(--gradient-primary)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                                }}
                            >
                                <StorefrontIcon sx={{ color: "#fff", fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    Supplier Directory
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Manage vendor partnerships, contact profiles, and tax compliance details
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
                                        setSelectedId(null);
                                        setSupplier({
                                            supplierCode: "",
                                            supplierName: "",
                                            contactPerson: "",
                                            email: "",
                                            phone: "",
                                            address: "",
                                            gstNumber: "",
                                            status: "Active",
                                        });
                                        setOpen(true);
                                    }}
                                >
                                    Add New Supplier
                                </Button>
                                <IconButton onClick={loadSuppliers} title="Refresh Data">
                                    <RefreshIcon />
                                </IconButton>
                            </Box>

                            <TextField
                                placeholder="Search by name or code..."
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
                                getRowId={(row) => row.supplierId}
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
                    {editMode ? "Edit Supplier Record" : "Add New Supplier"}
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2.5}
                        mt={1}
                    >
                        <TextField
                            label="Supplier Code"
                            name="supplierCode"
                            value={supplier.supplierCode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. SUP-1002"
                        />

                        <TextField
                            label="Supplier Name"
                            name="supplierName"
                            value={supplier.supplierName}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. Acme Logistics Pvt Ltd"
                        />

                        <TextField
                            label="Contact Person"
                            name="contactPerson"
                            value={supplier.contactPerson}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={supplier.email}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Phone Number"
                            name="phone"
                            value={supplier.phone}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="GST Number"
                            name="gstNumber"
                            value={supplier.gstNumber}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Office Address"
                            name="address"
                            value={supplier.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            sx={{ gridColumn: "1 / span 2" }}
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={supplier.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveSupplier}
                    >
                        {editMode ? "Save Changes" : "Create Supplier"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Supplier;