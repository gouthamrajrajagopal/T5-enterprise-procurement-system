import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";

import { registerUser } from "../api/authApi";
import { getAllDepartments } from "../api/departmentApi";

function Register() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

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
            const response = await getAllDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {

        try {

            const response = await registerUser(user);

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message || "Registration Failed");
            } else {
                alert("Unable to connect to server");
            }

        }

    };

    return (

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: "#f4f6f9" }}
        >

            <Paper
                elevation={4}
                sx={{
                    width: 500,
                    p: 4,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    mb={3}
                >
                    Register
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    select
                    fullWidth
                    label="Role"
                    name="roleId"
                    value={user.roleId}
                    onChange={handleChange}
                    margin="normal"
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
                    margin="normal"
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

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>

                <Typography
                    align="center"
                    sx={{ mt: 2 }}
                >
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </Typography>

            </Paper>

        </Box>

    );

}

export default Register;