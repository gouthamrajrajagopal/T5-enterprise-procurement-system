import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                <Navbar />

                <div className="dashboard-content">
                    <h1>Dashboard</h1>
                    <p>Welcome to Enterprise Procurement System</p>

                    <div className="cards">

                        <div className="card">
                            <h3>Total Suppliers</h3>
                            <h2>25</h2>
                        </div>

                        <div className="card">
                            <h3>Departments</h3>
                            <h2>8</h2>
                        </div>

                        <div className="card">
                            <h3>Categories</h3>
                            <h2>14</h2>
                        </div>

                        <div className="card">
                            <h3>Purchase Orders</h3>
                            <h2>12</h2>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;