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
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
    getAllCategories,
    saveCategory,
    updateCategory,
    deleteCategory,
} from "../api/categoryApi";

function Category() {
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [category, setCategory] = useState({
        categoryCode: "",
        categoryName: "",
        description: "",
        routingDepartmentId: "",
        status: "Active",
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategories();
            if (response.data && response.data.length > 0) {
                setRows(response.data);
            } else {
                throw new Error("Empty backend database");
            }
        } catch (error) {
            console.warn("Backend not running, using premium mock categories list:", error);
            setRows([
                { categoryId: 1, categoryCode: "CAT-HW", categoryName: "Computer Hardware", description: "Laptops, desktops, workstations and peripheral devices", routingDepartmentId: 1, status: "Active" },
                { categoryId: 2, categoryCode: "CAT-SW", categoryName: "Software Subscriptions", description: "SaaS platforms, cloud subscriptions and developer tools", routingDepartmentId: 1, status: "Active" },
                { categoryId: 3, categoryCode: "CAT-OFF", categoryName: "Office Supplies", description: "Stationery, whiteboards, paper products and office desks", routingDepartmentId: 4, status: "Active" },
                { categoryId: 4, categoryCode: "CAT-TR", categoryName: "Travel & Logistical Services", description: "Business travel expenses and logistics dispatch agents", routingDepartmentId: 3, status: "Active" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (row) => {
        setCategory({
            categoryCode: row.categoryCode || "",
            categoryName: row.categoryName || "",
            description: row.description || "",
            routingDepartmentId: row.routingDepartmentId || "",
            status: row.status || "Active",
        });
        setSelectedId(row.categoryId);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await deleteCategory(id);
            loadCategories();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveCategory = async () => {
        try {
            if (editMode) {
                await updateCategory(selectedId, category);
            } else {
                await saveCategory(category);
            }
            loadCategories();
            setOpen(false);
            setEditMode(false);
            setSelectedId(null);
            setCategory({
                categoryCode: "",
                categoryName: "",
                description: "",
                routingDepartmentId: "",
                status: "Active",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        {
            field: "categoryId",
            headerName: "ID",
            width: 80,
            renderCell: (params) => (
                <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>
                    #{params.value}
                </span>
            ),
        },
        {
            field: "categoryCode",
            headerName: "Category Code",
            width: 170,
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
            field: "categoryName",
            headerName: "Category Name",
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
            width: 240,
        },
        {
            field: "routingDepartmentId",
            headerName: "Routing Dept ID",
            width: 160,
            renderCell: (params) => (
                <Chip
                    label={`Dept #${params.value || "N/A"}`}
                    size="small"
                    sx={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", fontWeight: 600 }}
                />
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
                    <Tooltip title="Edit Category">
                        <IconButton
                            size="small"
                            onClick={() => handleEdit(params.row)}
                            sx={{ color: "var(--primary)", background: "rgba(99, 102, 241, 0.1)" }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Category">
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(params.row.categoryId)}
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
        const categoryName = row.categoryName || "";
        const categoryCode = row.categoryCode || "";
        return (
            categoryName.toLowerCase().includes(search.toLowerCase()) ||
            categoryCode.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="app-layout">
            <div className="bg-ambient-mesh">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-3" />
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
                                    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
                                }}
                            >
                                <CategoryIcon sx={{ color: "#fff", fontSize: 26 }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                    Item Category Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Classify procurement items and set up automatic department routing rules
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
                                        setCategory({
                                            categoryCode: "",
                                            categoryName: "",
                                            description: "",
                                            routingDepartmentId: "",
                                            status: "Active",
                                        });
                                        setOpen(true);
                                    }}
                                >
                                    Add Category
                                </Button>
                                <IconButton onClick={loadCategories} title="Refresh Data">
                                    <RefreshIcon />
                                </IconButton>
                            </Box>

                            <TextField
                                placeholder="Search category..."
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
                                getRowId={(row) => row.categoryId}
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
                    {editMode ? "Edit Category Record" : "Add New Category"}
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2.5}
                        mt={1}
                    >
                        <TextField
                            label="Category Code"
                            name="categoryCode"
                            value={category.categoryCode}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. CAT-HW"
                        />

                        <TextField
                            label="Category Name"
                            name="categoryName"
                            value={category.categoryName}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. Computer Hardware"
                        />

                        <TextField
                            label="Routing Department ID"
                            name="routingDepartmentId"
                            value={category.routingDepartmentId}
                            onChange={handleChange}
                            fullWidth
                            placeholder="e.g. 1"
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={category.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>

                        <TextField
                            label="Description"
                            name="description"
                            value={category.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            sx={{ gridColumn: "1 / span 2" }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveCategory}
                    >
                        {editMode ? "Save Changes" : "Create Category"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Category;