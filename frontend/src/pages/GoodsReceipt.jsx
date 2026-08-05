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
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function GoodsReceipt() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const mockReceipts = [
        { id: 1, grnNumber: "GRN-2026-001", poNumber: "PO-2026-001", supplier: "TechCorp Solutions", receivedDate: "2026-08-04", receivedBy: "Alex Chen", status: "Verified" },
    ];

    const columns = [
        { field: "grnNumber", headerName: "GRN Number", width: 150 },
        { field: "poNumber", headerName: "PO Number", width: 150 },
        { field: "supplier", headerName: "Supplier Name", width: 220 },
        { field: "receivedDate", headerName: "Received Date", width: 150 },
        { field: "receivedBy", headerName: "Received By", width: 150 },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
                const status = params.value;
                let badgeClass = "pulse-badge ";
                if (status === "Verified") badgeClass += "active";
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
                                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                            }}
                        >
                            <InventoryIcon sx={{ color: "#fff", fontSize: 26 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Goods Receipt
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Record delivered warehouse materials, perform quality control inspections, and verify orders
                            </Typography>
                        </Box>
                    </Box>

                    <Paper className="glass-panel" sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                                Create Goods Receipt (GRN)
                            </Button>

                            <TextField
                                placeholder="Search GRNs..."
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
                                rows={mockReceipts.filter(r => r.grnNumber.toLowerCase().includes(search.toLowerCase()) || r.supplier.toLowerCase().includes(search.toLowerCase()))}
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
                <DialogTitle>File Goods Receipt Note (GRN)</DialogTitle>
                <DialogContent dividers>
                    <Box display="grid" gridTemplateColumns="1fr" gap={2} mt={1}>
                        <TextField select label="Select Pending Purchase Order" fullWidth defaultValue="PO-001">
                            <MenuItem value="PO-001">PO-2026-001 (TechCorp Solutions)</MenuItem>
                        </TextField>
                        <TextField label="Delivered Quantity Status" placeholder="e.g. All 12 items received in perfect condition" fullWidth />
                        <TextField label="Inspector / Receiver Name" placeholder="Alex Chen" fullWidth />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>Submit GRN</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GoodsReceipt;
