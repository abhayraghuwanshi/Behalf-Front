import { Avatar, Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileService from "../../service/ProfileService";
import QuestSessionService from "../../service/QuestSessionService";
import TravelRequestPage from '../FindPeople/TravelRequestPage';
import MyOrders from "../QuestStore/MyOrders";
import RatingView from "../rating/RatingView";

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
                const response = await QuestSessionService.fetchChats();
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
        <Grid container style={{ backgroundColor: "#000", color: "white", minHeight: "100vh" }}>
            <Grid item xs={12} md={12} style={{ padding: "0 12px" }}>
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
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                            <Grid item xs={12} md={9}>
                                <Tabs value={selectedTab} onChange={handleTabChange} style={{ color: "white", marginBottom: 10 }}>
                                    <Tab style={{ color: "white" }} label="User Rating" />
                                    <Tab style={{ color: "white" }} label="Travel Requests" />
                                    <Tab style={{ color: "white" }} label="My Quests" />
                                    <Tab style={{ color: "white" }} label="My Store Orders" />

                                </Tabs>
                            </Grid>
                            <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
                        </Grid>

                        <div>
                            {selectedTab === 0 && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                                    <Grid item xs={12} md={9}>
                                        <Typography variant="h6" gutterBottom>
                                            User Ratings
                                        </Typography>
                                        <RatingView userId={userInfo.id} userType={userInfo.userType} />
                                        {/* Add your rating component here */}
                                    </Grid>
                                    <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
                                </Grid>
                            )}
                        </div>

                        <div sx={{ marginTop: 2 }}>
                            {selectedTab === 1 && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                                    <Grid item xs={12} md={9}> <TravelRequestPage /> </Grid>
                                    <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
                                </Grid>

                            )}


                            {selectedTab === 2 && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                                    <Grid item xs={12} md={9}>
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
                                                            Reward: {quest.questReward} {quest.questCurrency}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            From: {quest.locationFrom} ({quest.locationFromDetail})
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            To: {quest.locationTo} ({quest.locationToDetail})
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Valid Until: {new Date(quest.questValidity).toLocaleDateString()}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Created: {new Date(quest.creationTimestamp).toLocaleDateString()}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Quest Progress: {quest.questStatus || 'PENDING'}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
                                </Grid>
                            )}
                            {selectedTab === 3 && <MyOrders />}
                        </div>
                    </Box>

                </div>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
