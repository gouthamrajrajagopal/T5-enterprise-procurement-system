import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    LinearProgress,
    Avatar,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../styles/dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const statCards = [
        {
            title: "Total Suppliers",
            value: "25",
            change: "+12.4%",
            trend: "up",
            sub: "22 Verified & Active",
            icon: <StorefrontIcon sx={{ fontSize: 28, color: "#6366f1" }} />,
            color: "rgba(99, 102, 241, 0.15)",
            border: "rgba(99, 102, 241, 0.4)",
            progress: 88,
        },
        {
            title: "Active Departments",
            value: "8",
            change: "100%",
            trend: "up",
            sub: "All units connected",
            icon: <CorporateFareIcon sx={{ fontSize: 28, color: "#10b981" }} />,
            color: "rgba(16, 185, 129, 0.15)",
            border: "rgba(16, 185, 129, 0.4)",
            progress: 100,
        },
        {
            title: "Master Categories",
            value: "14",
            change: "+3 New",
            trend: "up",
            sub: "Routing configured",
            icon: <CategoryIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
            color: "rgba(236, 72, 153, 0.15)",
            border: "rgba(236, 72, 153, 0.4)",
            progress: 75,
        },
        {
            title: "Purchase Orders",
            value: "12",
            change: "$450,200",
            trend: "up",
            sub: "8 Delivered, 4 In Transit",
            icon: <ShoppingBagIcon sx={{ fontSize: 28, color: "#06b6d4" }} />,
            color: "rgba(6, 182, 212, 0.15)",
            border: "rgba(6, 182, 212, 0.4)",
            progress: 66,
        },
    ];

    const recentActivities = [
        {
            id: 1,
            title: "Supplier Compliance Approved",
            time: "10 minutes ago",
            desc: "Global Tech Logistics GST and PAN verified by Compliance Team.",
            icon: <VerifiedIcon sx={{ color: "#10b981" }} />,
        },
        {
            id: 2,
            title: "New Purchase Order Created",
            time: "45 minutes ago",
            desc: "PO-2026-089 for IT Hardware Hardware Supplies ($14,500).",
            icon: <ShoppingBagIcon sx={{ color: "#6366f1" }} />,
        },
        {
            id: 3,
            title: "Approval Hierarchy Updated",
            time: "2 hours ago",
            desc: "Finance Dept Level 2 Approver updated to Senior Manager.",
            icon: <CheckCircleIcon sx={{ color: "#ec4899" }} />,
        },
        {
            id: 4,
            title: "Goods Receipt Confirmed",
            time: "5 hours ago",
            desc: "Batch #GR-9902 received at Main Warehouse Facility.",
            icon: <LocalShippingIcon sx={{ color: "#06b6d4" }} />,
        },
    ];

    return (
        <div className="app-layout">
            <div className="bg-ambient-mesh">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />
            </div>

            <Sidebar />

            <div className="main-wrapper">
                <Navbar />

                <main className="dashboard-body">
                    {/* Welcome Banner */}
                    <div className="hero-banner glass-panel">
                        <div className="hero-content">
                            <div className="hero-badge">
                                <span className="pulse-badge active">Live System Status</span>
                                <span className="hero-date">August 4, 2026</span>
                            </div>
                            <h1 className="hero-title">
                                Enterprise <span className="gradient-text">Procurement</span> Hub
                            </h1>
                            <p className="hero-sub">
                                Streamline vendor management, approval workflows, compliance verification, and purchase requisitions in one unified portal.
                            </p>
                        </div>
                        <div className="hero-actions">
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                className="hero-btn-primary"
                                onClick={() => navigate("/suppliers")}
                            >
                                Manage Suppliers
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FileDownloadIcon />}
                                className="hero-btn-secondary"
                            >
                                Export Reports
                            </Button>
                        </div>
                    </div>

                    {/* KPI Stat Cards Grid */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {statCards.map((card, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <div
                                    className="kpi-card glass-card"
                                    style={{ borderColor: card.border }}
                                >
                                    <div className="kpi-header">
                                        <div
                                            className="kpi-icon-wrapper"
                                            style={{ backgroundColor: card.color }}
                                        >
                                            {card.icon}
                                        </div>
                                        <Chip
                                            label={card.change}
                                            size="small"
                                            icon={<TrendingUpIcon />}
                                            className="kpi-chip"
                                        />
                                    </div>

                                    <div className="kpi-body">
                                        <Typography variant="h3" className="kpi-value">
                                            {card.value}
                                        </Typography>
                                        <Typography variant="subtitle2" className="kpi-title">
                                            {card.title}
                                        </Typography>
                                    </div>

                                    <div className="kpi-footer">
                                        <LinearProgress
                                            variant="determinate"
                                            value={card.progress}
                                            className="kpi-progress"
                                        />
                                        <span className="kpi-subtext">{card.sub}</span>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Middle Section: Workflow Stepper & Activity Feed */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {/* Procurement Workflow Pipeline */}
                        <Grid item xs={12} lg={7}>
                            <div className="pipeline-card glass-panel">
                                <div className="panel-header">
                                    <div>
                                        <Typography variant="h6" fontWeight="bold">
                                            End-to-End Procurement Pipeline
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Automated status tracking from requisition to goods arrival
                                        </Typography>
                                    </div>
                                    <Button
                                        size="small"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={() => navigate("/suppliers")}
                                    >
                                        View Pipeline
                                    </Button>
                                </div>

                                <div className="pipeline-steps">
                                    <div className="step-item step-completed">
                                        <div className="step-number">1</div>
                                        <div className="step-content">
                                            <h4>Purchase Request</h4>
                                            <p>Requisition submitted & validated</p>
                                        </div>
                                    </div>

                                    <div className="step-line active" />

                                    <div className="step-item step-completed">
                                        <div className="step-number">2</div>
                                        <div className="step-content">
                                            <h4>Vendor Selection</h4>
                                            <p>Compliance & quote evaluation</p>
                                        </div>
                                    </div>

                                    <div className="step-line active" />

                                    <div className="step-item step-current">
                                        <div className="step-number">3</div>
                                        <div className="step-content">
                                            <h4>Purchase Order</h4>
                                            <p>PO issuance & approval</p>
                                        </div>
                                    </div>

                                    <div className="step-line" />

                                    <div className="step-item">
                                        <div className="step-number">4</div>
                                        <div className="step-content">
                                            <h4>Goods Receipt</h4>
                                            <p>Warehouse inspection & entry</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        {/* Recent Activity Timeline */}
                        <Grid item xs={12} lg={5}>
                            <div className="activity-card glass-panel">
                                <div className="panel-header">
                                    <Typography variant="h6" fontWeight="bold">
                                        System Activity Feed
                                    </Typography>
                                    <span className="pulse-badge active">Real-Time</span>
                                </div>

                                <div className="activity-list">
                                    {recentActivities.map((act) => (
                                        <div className="activity-item" key={act.id}>
                                            <div className="activity-avatar">{act.icon}</div>
                                            <div className="activity-details">
                                                <div className="activity-title-row">
                                                    <h5>{act.title}</h5>
                                                    <span className="act-time">{act.time}</span>
                                                </div>
                                                <p className="act-desc">{act.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    {/* Quick Access Master Modules */}
                    <div className="modules-section">
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Quick Master Data Modules
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <div
                                    className="module-card glass-card"
                                    onClick={() => navigate("/suppliers")}
                                >
                                    <StorefrontIcon className="module-icon" />
                                    <h4>Suppliers Portal</h4>
                                    <p>Register, inspect, and manage vendor records.</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <div
                                    className="module-card glass-card"
                                    onClick={() => navigate("/departments")}
                                >
                                    <CorporateFareIcon className="module-icon" />
                                    <h4>Department Hierarchy</h4>
                                    <p>Organize organizational units and cost centers.</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <div
                                    className="module-card glass-card"
                                    onClick={() => navigate("/categories")}
                                >
                                    <CategoryIcon className="module-icon" />
                                    <h4>Item Categories</h4>
                                    <p>Configure material classifications & routing.</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <div
                                    className="module-card glass-card"
                                    onClick={() => navigate("/supplier-compliance")}
                                >
                                    <VerifiedIcon className="module-icon" />
                                    <h4>Supplier Compliance</h4>
                                    <p>Verify GST, PAN, ISO certification & expiry.</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;