import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useColorMode } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { toggleColorMode, mode } = useColorMode();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const username = localStorage.getItem("name") || "Administrator";
    const role = localStorage.getItem("role") || "Procurement Admin";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header className="navbar-container">
            <div className="navbar-left">
                <div className="search-bar">
                    <SearchIcon className="search-icon" fontSize="small" />
                    <input
                        type="text"
                        placeholder="Search requisitions, vendors, orders... (Ctrl + K)"
                        className="search-input"
                    />
                    <span className="search-kbd">⌘K</span>
                </div>
            </div>

            <div className="navbar-right">
                {/* Notification Icon */}
                <button className="icon-btn" title="Notifications">
                    <NotificationsNoneIcon fontSize="small" />
                    <span className="notification-badge">3</span>
                </button>

                {/* Theme Mode Toggle */}
                <button
                    className="icon-btn theme-toggle"
                    onClick={toggleColorMode}
                    title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
                >
                    {mode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </button>

                {/* User Profile */}
                <div className="profile-wrapper">
                    <button
                        className="profile-btn"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="avatar">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{username}</span>
                            <span className="profile-role">{role}</span>
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="profile-dropdown glass-panel">
                            <div className="dropdown-header">
                                <p className="dd-name">{username}</p>
                                <p className="dd-email">admin@enterprise.com</p>
                            </div>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item" onClick={() => navigate("/dashboard")}>
                                <SettingsIcon fontSize="small" /> Account Settings
                            </button>
                            <button className="dropdown-item logout" onClick={handleLogout}>
                                <LogoutIcon fontSize="small" /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;