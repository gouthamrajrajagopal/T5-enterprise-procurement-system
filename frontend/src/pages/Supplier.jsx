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
    getAllSuppliers,
    saveSupplier,
    updateSupplier,
    deleteSupplier,
} from "../api/supplierApi";

function Supplier() {

    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);

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
        status: "",
    });

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        try {
            const response = await getAllSuppliers();
            setRows(response.data);
        } catch (error) {
            console.error(error);
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
            supplierCode: row.supplierCode,
            supplierName: row.supplierName,
            contactPerson: row.contactPerson,
            email: row.email,
            phone: row.phone,
            address: row.address,
            gstNumber: row.gstNumber,
            status: row.status,
        });

        setSelectedId(row.supplierId);

        setEditMode(true);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this supplier?")) return;

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
                status: "",
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
        },
        {
            field: "supplierCode",
            headerName: "Supplier Code",
            width: 150,
        },
        {
            field: "supplierName",
            headerName: "Supplier Name",
            width: 220,
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
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 190,

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
                        onClick={() => handleDelete(params.row.supplierId)}
                    >
                        Delete
                    </Button>
                </>
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
        <Box sx={{ display: "flex", backgroundColor: "#f4f6f9" }}>

            <Sidebar />

            <Box sx={{ flexGrow: 1, ml: "250px" }}>

                <Navbar />

                <Box sx={{ p: 4 }}>

                    <Typography variant="h4" fontWeight="bold" mb={3}>
                        Supplier Management
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

                                    setSupplier({
                                        supplierCode: "",
                                        supplierName: "",
                                        contactPerson: "",
                                        email: "",
                                        phone: "",
                                        address: "",
                                        gstNumber: "",
                                        status: "",
                                    });

                                    setOpen(true);

                                }}
                            >
                                + Add Supplier
                            </Button>

                            <TextField
                                label="Search Supplier"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </Box>

                        <Box sx={{ height: 550 }}>

                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.supplierId}
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
                    {editMode ? "Edit Supplier" : "Add Supplier"}
                </DialogTitle>

                <DialogContent>

                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2}
                        mt={2}
                    >

                        <TextField
                            label="Supplier Code"
                            name="supplierCode"
                            value={supplier.supplierCode}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Supplier Name"
                            name="supplierName"
                            value={supplier.supplierName}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Contact Person"
                            name="contactPerson"
                            value={supplier.contactPerson}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            value={supplier.email}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Phone"
                            name="phone"
                            value={supplier.phone}
                            onChange={handleChange}
                        />

                        <TextField
                            label="GST Number"
                            name="gstNumber"
                            value={supplier.gstNumber}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Address"
                            name="address"
                            value={supplier.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            sx={{ gridColumn: "1 / span 2" }}
                        />

                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={supplier.status}
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
                        onClick={handleSaveSupplier}
                    >
                        {editMode ? "Update Supplier" : "Save Supplier"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

export default Supplier;