import { Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileService from "../../service/ProfileService";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

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
        </div>
    );
};

export default UserProfile;
