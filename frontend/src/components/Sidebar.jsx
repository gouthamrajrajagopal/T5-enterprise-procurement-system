import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DescriptionIcon from "@mui/icons-material/Description";
import "./Sidebar.css";

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/" && (location.pathname === "/" || location.pathname === "/dashboard")) {
            return true;
        }
        return location.pathname === path;
    };

    const mainNav = [
        { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
    ];

    const masterDataNav = [
        { path: "/suppliers", label: "Suppliers", icon: <PeopleIcon fontSize="small" /> },
        { path: "/departments", label: "Departments", icon: <BusinessIcon fontSize="small" /> },
        { path: "/categories", label: "Categories", icon: <CategoryIcon fontSize="small" /> },
        { path: "/approval-hierarchy", label: "Approval Hierarchy", icon: <VerifiedUserIcon fontSize="small" /> },
        { path: "/supplier-compliance", label: "Supplier Compliance", icon: <AssignmentTurnedInIcon fontSize="small" /> },
    ];

    const procurementNav = [
        { path: "/purchase-request", label: "Purchase Request", icon: <DescriptionIcon fontSize="small" /> },
        { path: "/vendor-selection", label: "Vendor Selection", icon: <CompareArrowsIcon fontSize="small" /> },
        { path: "/purchase-order", label: "Purchase Order", icon: <ShoppingCartIcon fontSize="small" /> },
        { path: "/goods-receipt", label: "Goods Receipt", icon: <InventoryIcon fontSize="small" /> },
    ];

    return (
        <aside className="sidebar-container">
            {/* Brand Header */}
            <div className="brand-box">
                <div className="brand-logo-icon">
                    <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 22 }} />
                </div>
                <div className="brand-text">
                    <h2 className="brand-name">Procure<span className="brand-highlight">X</span></h2>
                    <span className="brand-badge">ENTERPRISE v2.4</span>
                </div>
            </div>

            <nav className="nav-wrapper">
                {/* Main Navigation */}
                <div className="nav-section">
                    <ul className="nav-list">
                        {mainNav.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                    {isActive(item.path) && <div className="active-glow" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Master Data Navigation */}
                <div className="nav-section">
                    <h4 className="section-title">MASTER DATA</h4>
                    <ul className="nav-list">
                        {masterDataNav.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                    {isActive(item.path) && <div className="active-glow" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Procurement Navigation */}
                <div className="nav-section">
                    <h4 className="section-title">PROCUREMENT WORKFLOW</h4>
                    <ul className="nav-list">
                        {procurementNav.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                    {isActive(item.path) && <div className="active-glow" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Sidebar Footer / System Status */}
            <div className="sidebar-footer">
                <div className="status-indicator">
                    <span className="status-dot"></span>
                    <div className="status-info">
                        <span className="status-title">System Online</span>
                        <span className="status-sub">AWS Cloud Connected</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;