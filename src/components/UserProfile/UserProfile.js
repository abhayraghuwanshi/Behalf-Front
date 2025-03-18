import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileService from "../../service/ProfileService";
import QuestSessionService from "../../service/QuestSessionService";
import TravelRequestPage from '../FindPeople/TravelRequestPage';
import MyOrders from "../QuestStore/MyOrders";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [quests, setQuests] = useState([]);
    const [filteredQuests, setFilteredQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await ProfileService.fetchUser();
                setUserInfo(response);
                fetchQuestData(response.id); // Fetch quest data after user info is fetched
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user info");
            }
        };

        const fetchQuestData = async (userId) => {
            if (!userId) return;

            try {
                setLoading(true);
                const response = await QuestSessionService.fetchChats(userId);
                const { questMetadataList } = response.data;

                setQuests(questMetadataList);
                setFilteredQuests(questMetadataList);
            } catch (error) {
                console.error("Error fetching quest data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

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
        <div>
            <Box
                sx={{
                    color: "white",
                    margin: "auto",
                    borderRadius: "12px",
                    textAlign: "center",
                    marginTop: "100px",
                    marginBottom: "20px",
                    padding: "20px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* Profile Image */}
                    {userInfo.picture && (
                        <Avatar
                            src={userInfo.picture}
                            alt="Profile"
                            sx={{ width: 100, height: 100, border: "2px solid gray" }}
                        />
                    )}

                    {/* Profile Details */}
                    <Box sx={{ textAlign: "left", marginLeft: 2 }}>
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
                                marginTop: 2,
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>

            </Box>
            <Box sx={{ p: 3, backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
                <Tabs value={selectedTab} onChange={handleTabChange} centered style={{ color: "white", marginBottom: 10 }}>
                    <Tab style={{ color: "white" }} label="Travel Requests" />
                    <Tab style={{ color: "white" }} label="My Quests" />
                    <Tab style={{ color: "white" }} label="My Store Orders" />
                </Tabs>

                <div sx={{ marginTop: 2 }}>
                    {selectedTab === 0 && <TravelRequestPage />}
                    {selectedTab === 1 && (
                        <div>
                            {loading ? (
                                <Typography color="white">Loading...</Typography>
                            ) : (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {filteredQuests.map((quest) => (
                                        <Box key={quest.id} sx={{ width: '30%', padding: 2, borderRadius: '8px', background: '#303030', color: 'white' }}>
                                            <Typography variant="h6" gutterBottom>
                                                {quest.questInstructions}
                                            </Typography>
                                            <Typography variant="body2">
                                                Reward: ${quest.questReward}
                                            </Typography>
                                            <Typography variant="body2">
                                                Created: {new Date(quest.creationTimestamp).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="body2">
                                                Quest Progress: {quest.questStatus == null ? 'PENDING' : quest.questStatus}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </div>
                    )}
                    {selectedTab === 2 && <MyOrders />}
                </div>
            </Box>

        </div >
    );
};

export default UserProfile;
