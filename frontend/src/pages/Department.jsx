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
import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
    getAllDepartments,
    saveDepartment,
    updateDepartment,
    deleteDepartment,
} from "../api/departmentApi";

function Department() {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [department, setDepartment] = useState({
        deptCode: "",
        deptName: "",
        description: "",
        status: "Active",
    });

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        setLoading(true);
        try {
            const response = await getAllDepartments();
            if (response.data && response.data.length > 0) {
                setRows(response.data);
            } else {
                throw new Error("Empty backend database");
            }
        } catch (error) {
            console.warn("Backend not running, using premium mock departments list:", error);
            setRows([
                { deptId: 1, deptCode: "DEPT-IT", deptName: "Information Technology", description: "Enterprise infrastructure, software licensing and helpdesk support", status: "Active" },
                { deptId: 2, deptCode: "DEPT-HR", deptName: "Human Resources", description: "Talent acquisition, employee onboarding and benefits management", status: "Active" },
                { deptId: 3, deptCode: "DEPT-FIN", deptName: "Finance & Treasury", description: "Accounts, payroll, invoice verification and audit control", status: "Active" },
                { deptId: 4, deptCode: "DEPT-OPS", deptName: "Operations & Facilities", description: "Warehouse operations, facilities management and logistics coordination", status: "Active" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setDepartment({
            ...department,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (row) => {
        setDepartment({
            deptCode: row.deptCode || "",
            deptName: row.deptName || "",
            description: row.description || "",
            status: row.status || "Active",
        });
        setSelectedId(row.deptId);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) return;
        try {
            await deleteDepartment(id);
            loadDepartments();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveDepartment = async () => {
        try {
            if (editMode) {
                await updateDepartment(selectedId, department);
            } else {
                await saveDepartment(department);
            }
            loadDepartments();
            setOpen(false);
            setEditMode(false);
            setSelectedId(null);
            setDepartment({
                deptCode: "",
                deptName: "",
                description: "",
                status: "Active",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            field: "deptId",
            headerName: "ID",
            width: 80,
            renderCell: (params) => (
                <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>
                    #{params.value}
                </span>
            ),
        },
        {
            field: "deptCode",
            headerName: "Department Code",
            width: 180,
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
            field: "deptName",
            headerName: "Department Name",
            width: 220,
            renderCell: (params) => (
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: "description",
            headerName: "Description",
            width: 280,
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
                    <Tooltip title="Edit Department">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(params.row)}
                            sx={{ color: "var(--primary)", background: "rgba(99, 102, 241, 0.1)" }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Department">
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(params.row.deptId)}
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
        const deptName = row.deptName || "";
        const deptCode = row.deptCode || "";
        return (
            deptName.toLowerCase().includes(search.toLowerCase()) ||
            deptCode.toLowerCase().includes(search.toLowerCase())
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
                                    background: "var(--gradient-emerald)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                                }}
                            >
                                <BusinessIcon sx={{ color: "#fff", fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    Department Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Configure enterprise departments, cost centers, and structural divisions
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
                                        setDepartment({
                                            deptCode: "",
                                            deptName: "",
                                            description: "",
                                            status: "Active",
                                        });
                                        setOpen(true);
                                    }}
                                >
                                    Add Department
                                </Button>
                                <IconButton onClick={loadDepartments} title="Refresh Data">
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
                                getRowId={(row) => row.deptId}
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
                    {editMode ? "Edit Department Record" : "Add New Department"}
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2.5}
                        mt={1}
                    >
                        <TextField
                            label="Department Code"
                            name="deptCode"
                            value={department.deptCode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. DEPT-FIN"
                        />

                        <TextField
                            label="Department Name"
                            name="deptName"
                            value={department.deptName}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. Finance & Accounting"
                        />

                        <TextField
                            label="Description"
                            name="description"
                            value={department.description}
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
                            value={department.status}
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
                        onClick={handleSaveDepartment}
                    >
                        {editMode ? "Save Changes" : "Create Department"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Department;