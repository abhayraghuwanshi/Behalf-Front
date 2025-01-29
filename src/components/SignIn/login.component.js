import React, { useState } from "react";
import './loginComponent.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginGoogle = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Replace this block with your actual authentication API call
        const mockApiLogin = (username, password) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === "admin" && password === "password") {
                        resolve({ success: true });
                    } else {
                        reject({ success: false, message: "Invalid credentials" });
                    }
                }, 1000);
            });

        try {
            const response = await mockApiLogin(username, password);
            if (response.success) {
                setError("");
                if (onLogin) onLogin(); // Call a parent-provided callback on successful login
                alert("Login successful!");
            }
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button onClick={handleLoginGoogle}>Login with Google</button>
            </form>


        </div>

    );
};

export default LoginPage;
