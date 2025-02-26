import { Avatar, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileService from "../../service/ProfileService";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await ProfileService.fetchUser();
                setUserInfo(response);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user info");
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = async () => {
        try {
            await ProfileService.logout();
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (!userInfo) {
        return <Typography color="white">Loading...</Typography>;
    }

    return (
        <div
            elevation={6}
            style={{
                color: "white",
                padding: "30px",
                margin: "auto",
                borderRadius: "12px",
                textAlign: "center",
                marginTop: "100px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "400px",
            }}
        >
            {/* Profile Image */}
            {userInfo.picture && (
                <Avatar
                    src={userInfo.picture}
                    alt="Profile"
                    sx={{ width: 100, height: 100, margin: "auto", border: "2px solid gray" }}
                />
            )}

            {/* Profile Details */}
            <Typography variant="h5" gutterBottom>
                User Profile
            </Typography>
            <Typography variant="body1">
                <strong>Email:</strong> {userInfo.email}
            </Typography>
            <Typography variant="body1">
                <strong>First Name:</strong> {userInfo.firstName}
            </Typography>
            <Typography variant="body1">
                <strong>Last Name:</strong> {userInfo.lastName}
            </Typography>

            <Button
                key='logout'
                onClick={handleLogout}
                sx={{
                    color: 'white',
                    fontSize: '14px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    backgroundColor: '#d32f2f',
                    '&:hover': { backgroundColor: '#7b1fa2' },
                    '&.active': { backgroundColor: '#1976d2' },
                }}
            >
                Logout
            </Button>


        </div>
    );
};

export default UserProfile;
