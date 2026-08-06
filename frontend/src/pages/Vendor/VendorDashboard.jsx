import React from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
} from "@mui/material";

import "./VendorDashboard.css";

// Components
import VendorSidebar from "./Components/VendorSidebar";
import VendorTopbar from "./Components/VendorTopbar";
import KPICard from "./Components/KPICard";
import ProcurementPipeline from "./Components/ProcurementPipeline";
import ActivityFeed from "./Components/ActivityFeed";
import RFQTable from "./Components/RFQTable";
import VendorPerformance from "./Components/VendorPerformance";
import RecentPurchaseOrders from "./Components/RecentPurchaseOrders";
import NotificationPanel from "./Components/NotificationPanel";
import QuickModuleCard from "./Components/QuickModuleCard";

// Icons
import DescriptionIcon from "@mui/icons-material/Description";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";

const VendorDashboard = () => {
    return (
        <Box className="app-layout">
            {/* Sidebar */}
            <VendorSidebar />

            {/* Main Content */}
            <Box className="main-wrapper">
                <VendorTopbar />

                <Box className="dashboard-body">
                    {/* Hero Banner */}
                    <Paper className="hero-banner">
                        <Box className="hero-content">
                            <Typography className="hero-title">
                                Welcome Back, Vendor 👋
                            </Typography>

                            <Typography className="hero-sub">
                                Manage RFQs, Quotations, Purchase Orders, Deliveries and
                                Payments from one place.
                            </Typography>
                        </Box>

                        <Box className="hero-actions">
                            <Button
                                variant="contained"
                                className="hero-btn-primary"
                            >
                                Submit Quotation
                            </Button>

                            <Button
                                variant="outlined"
                                className="hero-btn-secondary"
                            >
                                View RFQs
                            </Button>
                        </Box>
                    </Paper>

                    {/* KPI Cards */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Active RFQs"
                                value="18"
                                progress={75}
                                chipLabel="+4 Today"
                                icon={<DescriptionIcon color="primary" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Quotations"
                                value="12"
                                progress={60}
                                chipLabel="Submitted"
                                icon={<RequestQuoteIcon color="success" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Purchase Orders"
                                value="8"
                                progress={80}
                                chipLabel="Approved"
                                icon={<ShoppingCartIcon color="warning" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Pending Payments"
                                value="₹2.4L"
                                progress={45}
                                chipLabel="Awaiting"
                                icon={<PaymentsIcon color="secondary" />}
                            />
                        </Grid>
                    </Grid>

                    {/* Pipeline + Activity */}
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} lg={8}>
                            <ProcurementPipeline />
                        </Grid>

                        <Grid item xs={12} lg={4}>
                            <ActivityFeed />
                        </Grid>
                    </Grid>

                    {/* RFQ Table */}
                    <Box sx={{ mt: 3 }}>
                        <RFQTable />
                    </Box>

                    {/* Vendor Performance + Purchase Orders */}
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} lg={6}>
                            <VendorPerformance />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <RecentPurchaseOrders />
                        </Grid>
                    </Grid>

                    {/* Notifications */}
                    <Box sx={{ mt: 3 }}>
                        <NotificationPanel />
                    </Box>

                    {/* Quick Modules */}
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={4}>
                            <QuickModuleCard
                                icon={
                                    <DescriptionIcon
                                        fontSize="large"
                                        color="primary"
                                    />
                                }
                                title="RFQs"
                                description="Browse and respond to available Requests for Quotation."
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <QuickModuleCard
                                icon={
                                    <RequestQuoteIcon
                                        fontSize="large"
                                        color="success"
                                    />
                                }
                                title="Quotations"
                                description="Manage all submitted quotations."
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <QuickModuleCard
                                icon={
                                    <PaymentsIcon
                                        fontSize="large"
                                        color="secondary"
                                    />
                                }
                                title="Payments"
                                description="Track invoices and payment history."
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default VendorDashboard;