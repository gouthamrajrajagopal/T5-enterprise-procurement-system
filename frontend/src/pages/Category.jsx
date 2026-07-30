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
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
    getAllCategories,
    saveCategory,
    updateCategory,
    deleteCategory,
} from "../api/categoryApi";

function Category() {

    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [category, setCategory] = useState({
        categoryCode: "",
        categoryName: "",
        description: "",
        routingDepartmentId: "",
        status: "",
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await getAllCategories();
            setRows(response.data);
        } catch (error) {
            console.error(error);
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
            categoryCode: row.categoryCode,
            categoryName: row.categoryName,
            description: row.description,
            routingDepartmentId: row.routingDepartmentId,
            status: row.status,
        });

        setSelectedId(row.categoryId);

        setEditMode(true);

        setOpen(true);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this category?")) return;

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
                status: "",
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
        },
        {
            field: "categoryCode",
            headerName: "Category Code",
            width: 170,
        },
        {
            field: "categoryName",
            headerName: "Category Name",
            width: 220,
        },
        {
            field: "description",
            headerName: "Description",
            width: 220,
        },
        {
            field: "routingDepartmentId",
            headerName: "Routing Dept",
            width: 160,
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.categoryId)}
                    >
                        Delete
                    </Button>
                </>
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
        <Box sx={{ display: "flex", backgroundColor: "#f4f6f9" }}>

            <Sidebar />

            <Box sx={{ flexGrow: 1, ml: "250px" }}>

                <Navbar />

                <Box sx={{ p: 4 }}>

                    <Typography variant="h4" fontWeight="bold" mb={3}>
                        Category Management
                    </Typography>

                    <Paper sx={{ p: 3 }}>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                        >

                            <Button
                                variant="contained"
                                onClick={() => {

                                    setEditMode(false);

                                    setSelectedId(null);

                                    setCategory({
                                        categoryCode: "",
                                        categoryName: "",
                                        description: "",
                                        routingDepartmentId: "",
                                        status: "",
                                    });

                                    setOpen(true);

                                }}
                            >
                                + Add Category
                            </Button>

                            <TextField
                                label="Search Category"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </Box>

                        <Box sx={{ height: 550 }}>

                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.categoryId}
                                pageSizeOptions={[5, 10, 20]}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                            />

                        </Box>

                    </Paper>

                </Box>

            </Box>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
            >

                <DialogTitle>
                    {editMode ? "Edit Category" : "Add Category"}
                </DialogTitle>

                <DialogContent>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: 2,
                            mt: 2,
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Category Code"
                            name="categoryCode"
                            value={category.categoryCode}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Category Name"
                            name="categoryName"
                            value={category.categoryName}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Routing Department ID"
                            name="routingDepartmentId"
                            value={category.routingDepartmentId}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="status"
                            value={category.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={category.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            sx={{ gridColumn: "1 / span 2" }}
                        />

                    </Box>

                </DialogContent>

                <DialogActions>

                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSaveCategory}
                    >
                        {editMode ? "Update Category" : "Save Category"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

export default Category;