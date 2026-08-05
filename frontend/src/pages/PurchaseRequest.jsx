import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function PurchaseRequest() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const mockRequests = [
        { id: 1, code: "PR-2026-001", requester: "Jane Doe", dept: "IT Department", category: "Hardware", amount: "$14,500", status: "Approved" },
        { id: 2, code: "PR-2026-002", requester: "John Smith", dept: "Finance", category: "Software Licensing", amount: "$3,200", status: "Pending Approval" },
        { id: 3, code: "PR-2026-003", requester: "Bob Johnson", dept: "HR", category: "Office Supplies", amount: "$850", status: "Draft" },
    ];

    const columns = [
        { field: "code", headerName: "Request ID", width: 150 },
        { field: "requester", headerName: "Requester Name", width: 180 },
        { field: "dept", headerName: "Department", width: 180 },
        { field: "category", headerName: "Category", width: 180 },
        { field: "amount", headerName: "Estimated Cost", width: 150 },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
                const status = params.value;
                let badgeClass = "pulse-badge ";
                if (status === "Approved") badgeClass += "active";
                else if (status === "Draft") badgeClass += "inactive";
                else badgeClass += "pending";
                return <span className={badgeClass}>{status}</span>;
            }
        }
    ];

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
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
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
                            <DescriptionIcon sx={{ color: "#fff", fontSize: 26 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Purchase Requests
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Submit and monitor corporate purchase requisitions and budgetary clearance
                            </Typography>
                        </Box>
                    </Box>

                    <Paper className="glass-panel" sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                                Create Purchase Request
                            </Button>

                            <TextField
                                placeholder="Search requests..."
                                size="small"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                }}
                            />
                        </Box>

                        <Box sx={{ height: 450, width: "100%" }}>
                            <DataGrid
                                rows={mockRequests.filter(r => r.code.toLowerCase().includes(search.toLowerCase()))}
                                columns={columns}
                                pageSizeOptions={[5, 10]}
                                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Paper>
                </main>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>New Purchase Requisition</DialogTitle>
                <DialogContent dividers>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={1}>
                        <TextField label="Requester Name" fullWidth placeholder="Jane Doe" />
                        <TextField select label="Department" fullWidth defaultValue="IT">
                            <MenuItem value="IT">IT Department</MenuItem>
                            <MenuItem value="HR">Human Resources</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                        </TextField>
                        <TextField select label="Item Category" fullWidth defaultValue="HW">
                            <MenuItem value="HW">Hardware</MenuItem>
                            <MenuItem value="SW">Software Licensing</MenuItem>
                            <MenuItem value="OFF">Office Supplies</MenuItem>
                        </TextField>
                        <TextField label="Estimated Amount ($)" type="number" fullWidth />
                        <TextField label="Justification / Business Need" multiline rows={3} fullWidth sx={{ gridColumn: "1 / span 2" }} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>Submit Requisition</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PurchaseRequest;
