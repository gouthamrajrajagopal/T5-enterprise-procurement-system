import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
} from "@mui/material";

import { loginUser } from "../api/authApi";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {

        try {

            const response = await loginUser(login);

            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("role", response.data.role);

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message || "Invalid Email or Password");
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
                    p: 5,
                    width: 400,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    mb={3}
                >
                    Enterprise Procurement
                </Typography>

                <Typography
                    variant="h6"
                    align="center"
                    mb={3}
                >
                    Login
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={login.email}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={login.password}
                    onChange={handleChange}
                    margin="normal"
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                <Typography
                    align="center"
                    sx={{ mt: 2 }}
                >
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </Typography>

            </Paper>

        </Box>

    );
}

export default Login;