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
    getAllDepartments,
    saveDepartment,
    updateDepartment,
    deleteDepartment,
} from "../api/departmentApi";

function Department() {

    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [department, setDepartment] = useState({
        deptCode: "",
        deptName: "",
        description: "",
        status: "",
    });

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await getAllDepartments();
            setRows(response.data);
        } catch (error) {
            console.error(error);
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
            deptCode: row.deptCode,
            deptName: row.deptName,
            description: row.description,
            status: row.status,
        });

        setSelectedId(row.deptId);

        setEditMode(true);

        setOpen(true);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this department?")) return;

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
                status: "",
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
        },
        {
            field: "deptCode",
            headerName: "Department Code",
            width: 180,
        },
        {
            field: "deptName",
            headerName: "Department Name",
            width: 220,
        },
        {
            field: "description",
            headerName: "Description",
            width: 250,
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
                        onClick={() => handleDelete(params.row.deptId)}
                    >
                        Delete
                    </Button>
                </>
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
        <Box sx={{ display: "flex", backgroundColor: "#f4f6f9" }}>

            <Sidebar />

            <Box sx={{ flexGrow: 1, ml: "250px" }}>

                <Navbar />

                <Box sx={{ p: 4 }}>

                    <Typography variant="h4" fontWeight="bold" mb={3}>
                        Department Management
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

                                    setDepartment({
                                        deptCode: "",
                                        deptName: "",
                                        description: "",
                                        status: "",
                                    });

                                    setOpen(true);

                                }}
                            >
                                + Add Department
                            </Button>

                            <TextField
                                label="Search Department"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </Box>

                        <Box sx={{ height: 550 }}>

                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.deptId}
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
                    {editMode ? "Edit Department" : "Add Department"}
                </DialogTitle>

                <DialogContent>

                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2}
                        mt={2}
                    >

                        <TextField
                            label="Department Code"
                            name="deptCode"
                            value={department.deptCode}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Department Name"
                            name="deptName"
                            value={department.deptName}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Description"
                            name="description"
                            value={department.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            sx={{ gridColumn: "1 / span 2" }}
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={department.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>

                    </Box>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSaveDepartment}
                    >
                        {editMode ? "Update Department" : "Save Department"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

export default Department;