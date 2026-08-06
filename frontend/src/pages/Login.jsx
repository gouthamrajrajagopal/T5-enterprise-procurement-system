import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { loginUser } from "../api/authApi";

const roleRoutes = {
    EMPLOYEE: "/employee/dashboard",
    MANAGER: "/manager/dashboard",
    FINANCE: "/finance/dashboard",
    OWNER: "/owner/dashboard",
    DIRECTOR: "/director/dashboard",

    PROCUREMENT: "/procurement/dashboard",
    PROCUREMENT_HEAD: "/procurement/dashboard",
    PROCUREMENT_OFFICER: "/procurement/dashboard",

    ADMIN: "/procurement/dashboard",
};

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setLogin((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = String(
            login.email || ""
        ).trim();

        const password = String(
            login.password || ""
        );

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!password) {
            setError("Password is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await loginUser({
                email,
                password,
            });

            if (!data?.token) {
                throw new Error(
                    "Token was not returned by the server"
                );
            }

            const role = String(
                data.role ??
                data.roleName ??
                data.user?.role?.roleName ??
                ""
            )
                .trim()
                .toUpperCase()
                .replace(/^ROLE_/, "");

            const userId =
                data.userId ??
                data.id ??
                data.user?.userId ??
                data.user?.id;

            const userName =
                data.name ??
                data.userName ??
                data.user?.name ??
                email.split("@")[0];

            if (!userId) {
                throw new Error(
                    "User ID was not returned by the server"
                );
            }

            const destination =
                roleRoutes[role];

            if (!destination) {
                throw new Error(
                    `No dashboard is configured for role: ${
                        role || "UNKNOWN"
                    }`
                );
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "userId",
                String(userId)
            );

            localStorage.setItem(
                "name",
                userName
            );

            localStorage.setItem(
                "role",
                role
            );

            localStorage.setItem(
                "email",
                email
            );

            navigate(destination, {
                replace: true,
            });
        } catch (loginError) {
            console.error(
                "Login error:",
                loginError.response?.status,
                loginError.response?.data,
                loginError
            );

            localStorage.clear();

            setError(
                loginError.response?.data?.message ||
                    loginError.response?.data?.error ||
                    loginError.message ||
                    "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                backgroundColor:
                    "var(--bg-primary)",
                px: 2,
                boxSizing: "border-box",
            }}
        >
            <div className="bg-ambient-mesh">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />
            </div>

            <Paper
                className="glass-panel"
                sx={{
                    width: {
                        xs: "100%",
                        sm: "90%",
                        md: "900px",
                    },
                    maxWidth: "900px",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1.1fr 1fr",
                    },
                    borderRadius: "24px",
                    overflow: "hidden",
                    border:
                        "1px solid var(--border-light)",
                    boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        background:
                            "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(217, 70, 239, 0.15) 100%)",
                        p: {
                            xs: 4,
                            md: 6,
                        },
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                        flexDirection: "column",
                        justifyContent:
                            "space-between",
                        borderRight:
                            "1px solid var(--border-subtle)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: "12px",
                                background:
                                    "var(--gradient-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "center",
                                boxShadow:
                                    "0 0 20px rgba(99, 102, 241, 0.4)",
                            }}
                        >
                            <AutoAwesomeIcon
                                sx={{
                                    color: "#fff",
                                }}
                            />
                        </Box>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                letterSpacing:
                                    "-0.5px",
                            }}
                        >
                            Procure
                            <span className="gradient-text">
                                X
                            </span>{" "}
                            Enterprise
                        </Typography>
                    </Box>

                    <Box sx={{ my: 4 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.2,
                                mb: 2,
                            }}
                        >
                            Next-Gen <br />

                            <span className="gradient-text">
                                Procurement
                            </span>{" "}
                            System
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 3,
                            }}
                        >
                            Automate vendor
                            onboarding, compliance
                            tracking, purchase order
                            approvals and invoice
                            routing with real-time
                            audit trails.
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                gap: 1.5,
                            }}
                        >
                            <FeatureItem text="Instant Vendor Compliance & Tax Audits" />

                            <FeatureItem text="Multi-Level Managerial Sign-off Workflows" />

                            <FeatureItem text="End-to-End Requisition to Goods Receipt" />
                        </Box>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        © 2026 ProcureX Enterprise
                        Ltd. All Rights Reserved.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        p: {
                            xs: 4,
                            md: 5,
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 0.5,
                            }}
                        >
                            Welcome Back
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Sign in to access your
                            procurement dashboard
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        noValidate
                    >
                        <TextField
                            fullWidth
                            required
                            label="Corporate Email"
                            name="email"
                            type="email"
                            value={login.email}
                            onChange={handleChange}
                            margin="normal"
                            placeholder="madhukar@gmail.com"
                            disabled={loading}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon
                                                fontSize="small"
                                                sx={{
                                                    color:
                                                        "text.secondary",
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Password"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={login.password}
                            onChange={handleChange}
                            margin="normal"
                            placeholder="••••••••"
                            disabled={loading}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon
                                                fontSize="small"
                                                sx={{
                                                    color:
                                                        "text.secondary",
                                                }}
                                            />
                                        </InputAdornment>
                                    ),

                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="button"
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                onClick={() =>
                                                    setShowPassword(
                                                        (
                                                            previous
                                                        ) =>
                                                            !previous
                                                    )
                                                }
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={loading}
                            endIcon={
                                <ArrowForwardIcon />
                            }
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background:
                                    "var(--gradient-primary)",
                                fontSize:
                                    "0.95rem",
                                fontWeight: 700,
                            }}
                        >
                            {loading
                                ? "Authenticating..."
                                : "Sign In to Portal"}
                        </Button>
                    </Box>

                    <Typography
                        align="center"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 3 }}
                    >
                        Don&apos;t have an
                        account?{" "}
                        <Link
                            to="/register"
                            style={{
                                color:
                                    "var(--primary)",
                                fontWeight: 700,
                                textDecoration:
                                    "none",
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

function FeatureItem({ text }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
            }}
        >
            <CheckCircleIcon
                sx={{
                    color: "#10b981",
                    fontSize: 20,
                }}
            />

            <Typography
                variant="caption"
                color="text.primary"
                sx={{
                    fontWeight: 600,
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}

export default Login;