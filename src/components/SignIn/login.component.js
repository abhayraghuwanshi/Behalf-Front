import { Google } from "@mui/icons-material";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { BACKEND_API_URL } from "../../env";
import logo from "./main-7.png"; // Adjust the path as necessary

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            onLogin?.(); // Call parent function if provided
            alert("Login successful!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginGoogle = () => {
        window.location.href = `${BACKEND_API_URL}/oauth2/authorization/google`;
    };

    return (
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                <Grid item xs={12} md={4.5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img
                        src={logo} // Replace with the actual image path
                        alt="Login Illustration"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                </Grid>
                <Grid item xs={12} md={4.5}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            borderRadius: 2,
                            backgroundColor: "#1E1E1E", // Black background
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h4" align="center" sx={{ color: "white", mb: 2 }}>
                            Login
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleLoginGoogle}
                            sx={{
                                backgroundColor: "#333", // Button color for black background
                                color: "white",
                                "&:hover": { backgroundColor: "#555" },
                            }}
                        >
                            <Google sx={{ marginRight: "8px" }} /> Login with Google
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
            </Grid>
        </Container>
    );
};

export default LoginPage;
