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
    getAllApprovalHierarchies,
    saveApprovalHierarchy,
    updateApprovalHierarchy,
    deleteApprovalHierarchy,
} from "../api/approvalHierarchyApi";

function ApprovalHierarchy() {

    const [search, setSearch] = useState("");

    const [rows, setRows] = useState([]);

    const [open, setOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [approval, setApproval] = useState({
        deptId: "",
        approvalLevel: "",
        approverRoleId: "",
        status: "",
    });

    useEffect(() => {
        loadApprovalHierarchy();
    }, []);

    const loadApprovalHierarchy = async () => {
        try {
            const response = await getAllApprovalHierarchies();
            setRows(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setApproval({
            ...approval,
            [e.target.name]: e.target.value,
        });
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
                status: "",
            });

        } catch (error) {

            console.error(error);

        }
    };

    const handleEdit = (row) => {

        setApproval({
            deptId: row.deptId,
            approvalLevel: row.approvalLevel,
            approverRoleId: row.approverRoleId,
            status: row.status,
        });

        setSelectedId(row.hierarchyId);

        setEditMode(true);

        setOpen(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this approval hierarchy?")) return;

        try {

            await deleteApprovalHierarchy(id);

            loadApprovalHierarchy();

        } catch (error) {

            console.error(error);

        }

    };

    const columns = [

        {
            field: "hierarchyId",
            headerName: "ID",
            width: 80,
        },

        {
            field: "deptId",
            headerName: "Department ID",
            width: 150,
        },

        {
            field: "approvalLevel",
            headerName: "Approval Level",
            width: 170,
        },

        {
            field: "approverRoleId",
            headerName: "Approver Role ID",
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
                        onClick={() => handleDelete(params.row.hierarchyId)}
                    >
                        Delete
                    </Button>

                </>

            ),

        },

    ];

    const filteredRows = rows.filter((row) => {

        const deptId = row.deptId?.toString() || "";

        return deptId.includes(search);

    });
    return (

        <Box sx={{ display: "flex", backgroundColor: "#f4f6f9" }}>

            <Sidebar />

            <Box sx={{ flexGrow: 1, ml: "250px" }}>

                <Navbar />

                <Box sx={{ p: 4 }}>

                    <Typography variant="h4" fontWeight="bold" mb={3}>
                        Approval Hierarchy
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

                                    setApproval({
                                        deptId: "",
                                        approvalLevel: "",
                                        approverRoleId: "",
                                        status: "",
                                    });

                                    setOpen(true);

                                }}
                            >
                                + Add Approval Hierarchy
                            </Button>

                            <TextField
                                label="Search Department ID"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </Box>

                        <Box sx={{ height: 550 }}>

                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.hierarchyId}
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
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle>
                    {editMode ? "Edit Approval Hierarchy" : "Add Approval Hierarchy"}
                </DialogTitle>

                <DialogContent>

                    <Box
                        display="grid"
                        gridTemplateColumns="1fr 1fr"
                        gap={2}
                        mt={2}
                    >

                        <TextField
                            label="Department ID"
                            name="deptId"
                            value={approval.deptId}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Approval Level"
                            name="approvalLevel"
                            value={approval.approvalLevel}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Approver Role ID"
                            name="approverRoleId"
                            value={approval.approverRoleId}
                            onChange={handleChange}
                            fullWidth
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

export default ApprovalHierarchy;