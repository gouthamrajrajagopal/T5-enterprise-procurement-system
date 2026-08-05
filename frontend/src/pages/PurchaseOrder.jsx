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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function PurchaseOrder() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const mockOrders = [
        { id: 1, poNumber: "PO-2026-001", supplier: "TechCorp Solutions", date: "2026-08-01", amount: "$14,500", status: "Issued" },
        { id: 2, poNumber: "PO-2026-002", supplier: "Global Logistics", date: "2026-08-03", amount: "$2,800", status: "Draft" },
    ];

    const columns = [
        { field: "poNumber", headerName: "PO Number", width: 150 },
        { field: "supplier", headerName: "Supplier Name", width: 220 },
        { field: "date", headerName: "Order Date", width: 150 },
        { field: "amount", headerName: "Total Amount", width: 150 },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => {
                const status = params.value;
                let badgeClass = "pulse-badge ";
                if (status === "Issued") badgeClass += "active";
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
                                background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                            }}
                        >
                            <ShoppingCartIcon sx={{ color: "#fff", fontSize: 26 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                Purchase Orders
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Issue, dispatch and monitor corporate purchase orders sent to verified suppliers
                            </Typography>
                        </Box>
                    </Box>

                    <Paper className="glass-panel" sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                                Create Purchase Order
                            </Button>

                            <TextField
                                placeholder="Search POs..."
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
                                rows={mockOrders.filter(o => o.poNumber.toLowerCase().includes(search.toLowerCase()) || o.supplier.toLowerCase().includes(search.toLowerCase()))}
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
                <DialogTitle>Issue Purchase Order</DialogTitle>
                <DialogContent dividers>
                    <Box display="grid" gridTemplateColumns="1fr" gap={2} mt={1}>
                        <TextField select label="Select Evaluated Vendor Quote" fullWidth defaultValue="Q1">
                            <MenuItem value="Q1">TechCorp Solutions Quote for Hardware ($14,500)</MenuItem>
                        </TextField>
                        <TextField label="Delivery Deadline" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                        <TextField label="Shipping Address & Special Instructions" multiline rows={3} fullWidth />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpen(false)}>Issue Purchase Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PurchaseOrder;
