import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Tooltip,
} from "@mui/material";

import "./VendorDashboard.css";

// These two stylesheets define classes this page's components rely
// on (employee-sidebar, sidebar-item, premium-panel, kpi-progress,
// etc.) but they were previously only ever loaded when a user
// visited an Employee page first. Importing them directly here
// guarantees they're always present, regardless of navigation
// order - fixes the invisible sidebar text/icons bug.
import "../../styles/employee.css";
import "../../styles/dashboard.css";

// Components
import VendorSidebar from "./Components/VendorSidebar";
import VendorTopbar from "./Components/VendorTopbar";
import KPICard from "./Components/KPICard";
import RecentPurchaseOrders from "./Components/RecentPurchaseOrders";
import NotificationPanel from "./Components/NotificationPanel";
import QuickModuleCard from "./Components/QuickModuleCard";

// API (just for the one KPI card backed by real data)
import { getAllPurchaseOrders } from "../../api/purchaseOrderApi";

// Icons
import DescriptionIcon from "@mui/icons-material/Description";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";

const VendorDashboard = () => {
    const [poCount, setPoCount] = useState(null);

    useEffect(() => {
        let isMounted = true;

        getAllPurchaseOrders()
            .then((data) => {
                if (isMounted) {
                    setPoCount((data || []).length);
                }
            })
            .catch(() => {
                // RecentPurchaseOrders below already surfaces a
                // detailed error for this same data, so this KPI
                // card just falls back to "—" instead of a second
                // duplicate error.
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const scrollToPurchaseOrders = () => {
        document
            .getElementById("recent-purchase-orders")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Box className="app-layout">
            {/* Sidebar */}
            <VendorSidebar onPurchaseOrdersClick={scrollToPurchaseOrders} />

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
                                Track and update your purchase orders from
                                one place.
                            </Typography>
                        </Box>

                        <Box className="hero-actions">
                            <Tooltip title="Quotations aren't part of the current project scope yet.">
                                <span>
                                    <Button
                                        variant="contained"
                                        className="hero-btn-primary"
                                        disabled
                                    >
                                        Submit Quotation
                                    </Button>
                                </span>
                            </Tooltip>

                            <Button
                                variant="outlined"
                                className="hero-btn-secondary"
                                onClick={scrollToPurchaseOrders}
                            >
                                View Purchase Orders
                            </Button>
                        </Box>
                    </Paper>

                    {/* KPI Cards */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Purchase Orders"
                                value={poCount ?? "—"}
                                chipLabel="Live"
                                chipColor="success"
                                icon={<ShoppingCartIcon color="warning" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Active RFQs"
                                value="—"
                                chipLabel="Not tracked yet"
                                chipColor="default"
                                icon={<DescriptionIcon color="primary" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Quotations"
                                value="—"
                                chipLabel="Not tracked yet"
                                chipColor="default"
                                icon={<RequestQuoteIcon color="success" />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <KPICard
                                title="Pending Payments"
                                value="—"
                                chipLabel="Not tracked yet"
                                chipColor="default"
                                icon={<PaymentsIcon color="secondary" />}
                            />
                        </Grid>
                    </Grid>

                    {/* Purchase Orders - the one panel backed by real data */}
                    <Box id="recent-purchase-orders" sx={{ mt: 1 }}>
                        <RecentPurchaseOrders />
                    </Box>

                    {/* Notifications */}
                    <Box sx={{ mt: 3 }}>
                        <NotificationPanel />
                    </Box>

                    {/* Quick Modules */}
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={4}>
                            <QuickModuleCard
                                icon={
                                    <ShoppingCartIcon
                                        fontSize="large"
                                        color="warning"
                                    />
                                }
                                title="Purchase Orders"
                                description="View and update the status of orders assigned to you."
                                available
                                onClick={scrollToPurchaseOrders}
                            />
                        </Grid>

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
                                available={false}
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
                                available={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default VendorDashboard;