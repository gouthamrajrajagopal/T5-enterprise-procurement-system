import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    InputAdornment,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { registerUser } from "../api/authApi";
import { getAllDepartments } from "../api/departmentApi";

function Register() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        roleId: "",
        departmentId: "",
    });

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const departments = await getAllDepartments();

            if (departments && departments.length > 0) {
                setDepartments(departments);
            }
             else {
                throw new Error("Empty backend database");
            }
        } catch (error) {
            console.warn("Backend offline, loading fallback registration departments dropdown:", error);
            setDepartments([
                { deptId: 1, deptName: "Information Technology" },
                { deptId: 2, deptName: "Human Resources" },
                { deptId: 3, deptName: "Finance & Treasury" },
                { deptId: 4, deptName: "Operations & Facilities" },
            ]);
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const response = await registerUser(user);
            alert(response.data.message || "Registration Successful!");
            navigate("/login");
        }
        catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Registration Failed"
            );
        }         finally {
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
                py: 4,
                backgroundColor: "var(--bg-primary)",
            }}
        >
            {/* Ambient Background Lights */}
            <div className="bg-ambient-mesh">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
            </div>

            <Paper
                className="glass-panel"
                sx={{
                    width: { xs: "90%", sm: "600px" },
                    p: { xs: 3, sm: 5 },
                    borderRadius: "24px",
                    border: "1px solid var(--border-light)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "14px",
                            background: "var(--gradient-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                            mb: 1.5,
                        }}
                    >
                        <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 26 }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold" align="center">
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Register your employee profile for ProcureX Enterprise
                    </Typography>
                </Box>

                <form onSubmit={handleRegister}>
                    <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Corporate Email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="j.doe@enterprise.com"
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
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Organizational Role"
                            name="roleId"
                            value={user.roleId}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value={1}>Employee</MenuItem>
                            <MenuItem value={2}>Manager</MenuItem>
                            <MenuItem value={3}>Finance</MenuItem>
                            <MenuItem value={4}>Admin</MenuItem>
                            <MenuItem value={5}>Owner</MenuItem>
                            <MenuItem value={6}>Vendor</MenuItem>
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Department"
                            name="departmentId"
                            value={user.departmentId}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessIcon fontSize="small" sx={{ color: "var(--text-muted)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {departments.map((department) => (
                                <MenuItem
                                    key={department.deptId}
                                    value={department.deptId}
                                >
                                    {department.deptName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={loading}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            mt: 3.5,
                            py: 1.5,
                            background: "var(--gradient-primary)",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                        }}
                    >
                        {loading ? "Registering..." : "Complete Registration"}
                    </Button>
                </form>

                <Typography align="center" variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "var(--primary)",
                            fontWeight: 700,
                            textDecoration: "none",
                        }}
                    >
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Register;