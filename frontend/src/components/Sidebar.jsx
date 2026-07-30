import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="logo">EPS</h2>

            <ul>

                <li>
                    <Link to="/">🏠 Dashboard</Link>
                </li>

                <h4>Master Data</h4>

                <li>
                    <Link to="/suppliers">👤 Suppliers</Link>
                </li>

                <li>
                    <Link to="/departments">🏢 Departments</Link>
                </li>

                <li>
                    <Link to="/categories">📂 Categories</Link>
                </li>

                <li>
                    <Link to="/approval-hierarchy">✅ Approval Hierarchy</Link>
                </li>

                <li>
                    <Link to="/supplier-compliance">📋 Supplier Compliance</Link>
                </li>

                <h4>Procurement</h4>

                <li>
                    <Link to="/purchase-request">📝 Purchase Request</Link>
                </li>

                <li>
                    <Link to="/vendor-selection">🤝 Vendor Selection</Link>
                </li>

                <li>
                    <Link to="/purchase-order">🛒 Purchase Order</Link>
                </li>

                <li>
                    <Link to="/goods-receipt">📦 Goods Receipt</Link>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;