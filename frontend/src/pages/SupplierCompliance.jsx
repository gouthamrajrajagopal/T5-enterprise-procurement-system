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
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

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

        complianceStatus: "",

    });

    useEffect(() => {

        loadCompliance();

        loadSuppliers();

    }, []);

    const loadCompliance = async () => {

        const response = await getAllCompliance();

        setRows(response.data);

    };

    const loadSuppliers = async () => {

        const response = await getAllSuppliers();

        setSuppliers(response.data);

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

        if (editMode) {

            await updateCompliance(selectedId, compliance);

        } else {

            await saveCompliance(compliance);

        }

        loadCompliance();

        setOpen(false);

    };

    const handleDelete = async (id) => {

        if (window.confirm("Delete Compliance?")) {

            await deleteCompliance(id);

            loadCompliance();

        }

    };

    const columns = [

        {
            field: "complianceId",
            headerName: "ID",
            width: 80,
        },

        {
            field: "supplier",
            headerName: "Supplier",
            width: 220,
            valueGetter: (params) =>
                params.row.supplier?.supplierName || "",
        },

        {
            field: "gstVerified",
            headerName: "GST",
            width: 120,
        },

        {
            field: "panVerified",
            headerName: "PAN",
            width: 120,
        },

        {
            field: "isoCertified",
            headerName: "ISO",
            width: 120,
        },

        {
            field: "complianceStatus",
            headerName: "Status",
            width: 150,
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
                        onClick={() => {

                            setCompliance({
                                supplier: {
                                    supplierId: params.row.supplier?.supplierId || "",
                                },
                                gstVerified: params.row.gstVerified,
                                panVerified: params.row.panVerified,
                                isoCertified: params.row.isoCertified,
                                licenseExpiry: params.row.licenseExpiry,
                                complianceStatus: params.row.complianceStatus,
                            });

                            setSelectedId(params.row.complianceId);

                            setEditMode(true);

                            setOpen(true);

                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.complianceId)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const filteredRows = rows.filter((row) =>
        (row.supplier?.supplierName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <Box sx={{ display: "flex", backgroundColor: "#f4f6f9" }}>

            <Sidebar />

            <Box sx={{ flexGrow: 1, ml: "250px" }}>

                <Navbar />

                <Box sx={{ p: 4 }}>

                    <Typography variant="h4" fontWeight="bold" mb={3}>
                        Supplier Compliance
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

                                    setCompliance({
                                        supplier: {
                                            supplierId: "",
                                        },
                                        gstVerified: false,
                                        panVerified: false,
                                        isoCertified: false,
                                        licenseExpiry: "",
                                        complianceStatus: "",
                                    });

                                    setOpen(true);

                                }}
                            >
                                + Add Compliance
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
                                getRowId={(row) => row.complianceId}
                                pageSizeOptions={[5, 10]}
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
                fullWidth
                maxWidth="md"
            >

                <DialogTitle>
                    {editMode ? "Edit Compliance" : "Add Compliance"}
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
                            select
                            fullWidth
                            label="Supplier"
                            value={compliance.supplier.supplierId}
                            onChange={handleSupplier}
                        >
                            {suppliers.map((supplier) => (
                                <MenuItem
                                    key={supplier.supplierId}
                                    value={supplier.supplierId}
                                >
                                    {supplier.supplierName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            type="date"
                            name="licenseExpiry"
                            label="License Expiry"
                            InputLabelProps={{ shrink: true }}
                            value={compliance.licenseExpiry}
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            fullWidth
                            name="complianceStatus"
                            label="Compliance Status"
                            value={compliance.complianceStatus}
                            onChange={handleChange}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>

                        <Box>

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

                </DialogContent>

                <DialogActions>

                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        {editMode ? "Update" : "Save"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>

    );

}

export default SupplierCompliance;