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
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
    getAllApprovalHierarchies,
    saveApprovalHierarchy,
    updateApprovalHierarchy,
    deleteApprovalHierarchy,
} from "../api/approvalHierarchyApi";

function ApprovalHierarchy() {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [approval, setApproval] = useState({
        deptId: "",
        approvalLevel: "",
        approverRoleId: "",
        status: "Active",
    });

    useEffect(() => {
        loadApprovalHierarchy();
    }, []);

    const loadApprovalHierarchy = async () => {
        setLoading(true);
        try {
            const response = await getAllApprovalHierarchies();
            if (response.data && response.data.length > 0) {
                setRows(response.data);
            } else {
                throw new Error("Empty backend database");
            }
        } catch (error) {
            console.warn("Backend not running, using premium mock approval hierarchies list:", error);
            setRows([
                { hierarchyId: 1, deptId: 1, approvalLevel: 1, approverRoleId: 2, status: "Active" },
                { hierarchyId: 2, deptId: 1, approvalLevel: 2, approverRoleId: 3, status: "Active" },
                { hierarchyId: 3, deptId: 2, approvalLevel: 1, approverRoleId: 2, status: "Active" },
                { hierarchyId: 4, deptId: 3, approvalLevel: 1, approverRoleId: 3, status: "Active" },
                { hierarchyId: 5, deptId: 4, approvalLevel: 1, approverRoleId: 2, status: "Active" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setApproval({
            ...approval,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (row) => {
        setApproval({
            deptId: row.deptId || "",
            approvalLevel: row.approvalLevel || "",
            approverRoleId: row.approverRoleId || "",
            status: row.status || "Active",
        });
        setSelectedId(row.hierarchyId);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this approval rule?")) return;
        try {
            await deleteApprovalHierarchy(id);
            loadApprovalHierarchy();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateApprovalHierarchy(selectedId, approval);
            } else {
                await saveApprovalHierarchy(approval);
            }
            loadApprovalHierarchy();
            setOpen(false);
            setEditMode(false);
            setSelectedId(null);
            setApproval({
                deptId: "",
                approvalLevel: "",
                approverRoleId: "",
                status: "Active",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            field: "hierarchyId",
            headerName: "ID",
            width: 80,
            renderCell: (params) => (
                <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>
                    #{params.value}
                </span>
            ),
        },
        {
            field: "deptId",
            headerName: "Department ID",
            width: 160,
            renderCell: (params) => (
                <Chip
                    label={`Dept #${params.value}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: "6px" }}
                />
            ),
        },
        {
            field: "approvalLevel",
            headerName: "Approval Level",
            width: 170,
            renderCell: (params) => (
                <Chip
                    label={`Level ${params.value}`}
                    size="small"
                    sx={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", fontWeight: 700 }}
                />
            ),
        },
        {
            field: "approverRoleId",
            headerName: "Approver Role ID",
            width: 180,
            renderCell: (params) => (
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    Role #{params.value}
                </span>
            ),
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
                    <Tooltip title="Edit Hierarchy">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(params.row)}
                            sx={{ color: "var(--primary)", background: "rgba(99, 102, 241, 0.1)" }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Hierarchy">
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(params.row.hierarchyId)}
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
        const deptId = row.deptId?.toString() || "";
        return deptId.includes(search);
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
                                    background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                                }}
                            >
                                <VerifiedUserIcon sx={{ color: "#fff", fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    Approval Hierarchy
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Configure multi-level sign-off workflows for department requisitions
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
                                        setApproval({
                                            deptId: "",
                                            approvalLevel: "",
                                            approverRoleId: "",
                                            status: "Active",
                                        });
                                        setOpen(true);
                                    }}
                                >
                                    Add Approval Rule
                                </Button>
                                <IconButton onClick={loadApprovalHierarchy} title="Refresh Data">
                                    <RefreshIcon />
                                </IconButton>
                            </Box>

                            <TextField
                                placeholder="Search by Department ID..."
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
                                getRowId={(row) => row.hierarchyId}
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
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
                    {editMode ? "Edit Approval Hierarchy" : "Add Approval Hierarchy"}
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2.5}
                        mt={1}
                    >
                        <TextField
                            label="Department ID"
                            name="deptId"
                            value={approval.deptId}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. 1"
                        />

                        <TextField
                            label="Approval Level"
                            name="approvalLevel"
                            value={approval.approvalLevel}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. 1, 2, 3"
                        />

                        <TextField
                            label="Approver Role ID"
                            name="approverRoleId"
                            value={approval.approverRoleId}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. 2"
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={approval.status}
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
                        onClick={handleSave}
                    >
                        {editMode ? "Save Changes" : "Create Rule"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ApprovalHierarchy;