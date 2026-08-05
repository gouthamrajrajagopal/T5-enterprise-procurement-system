    import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { loginUser } from "../api/authApi";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
    setLogin((previous) => ({
        ...previous,
        [e.target.name]: e.target.value,
    }));
};

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await loginUser(login);
            const data = response?.data;
            if (!data?.token) throw new Error("Login token missing");
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", String(data.userId ?? ""));
            localStorage.setItem("role", data.role ?? "");
            localStorage.setItem("name", data.name || data.username || login.email.split("@")[0]);
            localStorage.setItem("email", login.email);
            const routes = {
                EMPLOYEE: "/employee/dashboard",
                MANAGER: "/manager/dashboard",
                FINANCE: "/finance/dashboard",
                PROCUREMENT_HEAD: "/procurement/dashboard",
                ADMIN: "/admin/dashboard",
            };
            navigate(routes[data.role] || "/login");
        } catch (error) {
            alert(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "var(--bg-primary)",
            }}
        >
            {/* Ambient Background Lights */}
            <div className="bg-ambient-mesh">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />
            </div>

            {/* Split Screen Container */}
            <Paper
                className="glass-panel"
                sx={{
                    width: { xs: "90%", sm: "80%", md: "900px" },
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid var(--border-light)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            >
                {/* Left Enterprise Branding Panel */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(217, 70, 239, 0.15) 100%)",
                        p: { xs: 4, md: 6 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRight: { md: "1px solid var(--border-subtle)" },
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: "12px",
                                background: "var(--gradient-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                            }}
                        >
                            <AutoAwesomeIcon sx={{ color: "#fff" }} />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" letterSpacing="-0.5px">
                            Procure<span className="gradient-text">X</span> Enterprise
                        </Typography>
                    </Box>

                    <Box my={4}>
                        <Typography variant="h3" fontWeight="800" lineHeight={1.2} mb={2}>
                            Next-Gen <br />
                            <span className="gradient-text">Procurement</span> System
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Automate vendor onboarding, compliance tracking, purchase order approvals, and invoice routing with real-time audit trails.
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={1.5}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <CheckCircleIcon sx={{ color: "#10b981", fontSize: 20 }} />
                                <Typography variant="caption" fontWeight="600" color="text.primary">
                                    Instant Vendor Compliance & Tax Audits
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <CheckCircleIcon sx={{ color: "#10b981", fontSize: 20 }} />
                                <Typography variant="caption" fontWeight="600" color="text.primary">
                                    Multi-Level Managerial Sign-off Workflows
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <CheckCircleIcon sx={{ color: "#10b981", fontSize: 20 }} />
                                <Typography variant="caption" fontWeight="600" color="text.primary">
                                    End-to-End Requisition to Goods Receipt
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography variant="caption" color="text.muted">
                        © 2026 ProcureX Enterprise Ltd. All Rights Reserved.
                    </Typography>
                </Box>

                {/* Right Form Panel */}
                <Box
                    sx={{
                        p: { xs: 4, md: 5 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Box mb={3}>
                        <Typography variant="h4" fontWeight="bold" mb={0.5}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to access your procurement dashboard
                        </Typography>
                    </Box>

                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Corporate Email"
                            name="email"
                            type="email"
                            value={login.email}
                            onChange={handleChange}
                            margin="normal"
                            placeholder="admin@enterprise.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={login.password}
                            onChange={handleChange}
                            margin="normal"
                            placeholder="••••••••"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={loading}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background: "var(--gradient-primary)",
                                fontSize: "0.95rem",
                                fontWeight: 700,
                            }}
                        >
                            {loading ? "Authenticating..." : "Sign In to Portal"}
                        </Button>
                    </form>

                    <Typography align="center" variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            style={{
                                color: "var(--primary)",
                                fontWeight: 700,
                                textDecoration: "none",
                            }}
                        >
                            Register Account
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;