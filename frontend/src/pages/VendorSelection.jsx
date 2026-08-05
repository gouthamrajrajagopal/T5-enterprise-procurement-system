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
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function VendorSelection() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const mockSelections = [
        { id: 1, prCode: "PR-2026-001", category: "Hardware", selectedVendor: "TechCorp Solutions", score: "96/100", status: "Completed" },
        { id: 2, prCode: "PR-2026-002", category: "Software Licensing", selectedVendor: "Pending Selection", score: "N/A", status: "In Evaluation" },
    ];

    const columns = [
        { field: "prCode", headerName: "PR Code", width: 150 },
        { field: "category", headerName: "Material Category", width: 200 },
        { field: "selectedVendor", headerName: "Selected Vendor", width: 220 },
        { field: "score", headerName: "Compliance Score", width: 180 },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
                const status = params.value;
                let badgeClass = "pulse-badge ";
                if (status === "Completed") badgeClass += "active";
                else badgeClass += "pending";
                return <span className={badgeClass}>{status}</span>;
            }
        }
    ];

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
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
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
                            <CompareArrowsIcon sx={{ color: "#fff", fontSize: 26 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Vendor Selection
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Evaluate supplier bids, pricing matrices, compliance scoring, and vendor assignments
                            </Typography>
                        </Box>
                    </Box>

                    <Paper className="glass-panel" sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                                Start Vendor Evaluation
                            </Button>

                            <TextField
                                placeholder="Search selections..."
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
                                rows={mockSelections.filter(s => s.prCode.toLowerCase().includes(search.toLowerCase()))}
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
                <DialogTitle>Evaluate Vendor Quotes</DialogTitle>
                <DialogContent dividers>
                    <Box display="grid" gridTemplateColumns="1fr" gap={2} mt={1}>
                        <TextField select label="Select Purchase Request" fullWidth defaultValue="PR-002">
                            <MenuItem value="PR-001">PR-2026-001 ($14,500)</MenuItem>
                            <MenuItem value="PR-002">PR-2026-002 ($3,200)</MenuItem>
                        </TextField>
                        <TextField select label="Recommended Vendor" fullWidth defaultValue="V1">
                            <MenuItem value="V1">TechCorp Solutions (Score: 96)</MenuItem>
                            <MenuItem value="V2">Global Logistics (Score: 84)</MenuItem>
                        </TextField>
                        <TextField label="Evaluation Comments & Negotiation Summary" multiline rows={3} fullWidth />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>Select Vendor</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default VendorSelection;
