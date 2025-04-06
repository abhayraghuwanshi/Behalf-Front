import { Box, Button, Dialog, DialogContent, List, ListItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TravelRequestService from "../../service/TravelRequestService";
import { useAuth } from "../SignIn/AuthContext";
import TravelRequestForm from "./TravelRequestForm";

const TravelRequestPage = () => {
    const { user, loading } = useAuth();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(false);
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterDate, setFilterDate] = useState("");
    const [isCreatingPeopleQuest, setIsCreatingPeopleQuest] = useState(false);

    useEffect(() => {
        async function fetchRequests() {
            const data = await TravelRequestService.getAllTravelRequests();
            if (data.length === 0) {
                setError(true);
            } else {
                setRequests(data);
            }
        }
        fetchRequests();
    }, []);


    const handleTravelCreation = async (payload) => {
        try {
            const response = await TravelRequestService.createTravelRequest({
                ...payload,
                creatorId: user?.id
            });

            if (response) {
                console.log("Travel request created successfully:", response);
                alert("Travel request created successfully!");
                setIsCreatingPeopleQuest(false);
            } else {
                console.error("Failed to create travel request");
                alert("Failed to create travel request.");
            }
        } catch (error) {
            console.error("An error occurred during travel request creation:", error);
            alert("Error creating travel request. Please try again.");
        }
    };

    const filteredRequests = Array.isArray(requests)
        ? requests.filter((request) =>
            (filterCategory === "all" || request.category === filterCategory) &&
            (filterDate === "" || request.travelDate === filterDate)
        )
        : [];

    return (
        <Box sx={{ minHeight: "80vh", padding: "20px", width: "100%" }}>
            <Box sx={{ color: "white", padding: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                    <Typography variant="h4" sx={{ textAlign: "left", flexGrow: 1 }}> My Journey</Typography>
                    <Button
                        variant="outlined"
                        sx={{ color: "white", borderColor: "white", marginLeft: "auto", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                        onClick={() => setIsCreatingPeopleQuest(true)}
                    >
                        Add Manually
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: "white", borderColor: "white", marginLeft: "auto", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                        onClick={() => setIsCreatingPeopleQuest(true)}
                    >
                        Auto Import (Gmail)
                    </Button>
                </Box>
                {/* Filters */}
                <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Filter by Date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        InputLabelProps={{ shrink: true, sx: { color: "white" }, disableAnimation: true }}
                        InputProps={{ sx: { color: "white" } }}
                        sx={{ backgroundColor: "#343434" }} />
                </Box>

                {/* Show Network Error Message */}
                {error && (
                    <Typography sx={{ color: "red", textAlign: "center", fontSize: "18px" }}>
                        ⚠️ Unable to connect to the server. Showing cached data.
                    </Typography>
                )}

                {/* Travel Requests */}
                <List>
                    {filteredRequests.map((request) => (
                        <ListItem
                            key={request.id}
                            sx={{
                                flexDirection: "column",
                                backgroundColor: "#1E1E1E",
                                padding: "20px",
                                borderRadius: "10px",
                                marginBottom: "20px",
                                border: "1px solid transparent",
                            }}
                        >
                            {/* Travel Request Details */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>

                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>
                                    <Box sx={{ textAlign: "left" }}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{request.fromLocation}</Typography>
                                        <Typography variant="body2" sx={{ color: "#bbbbbb" }}>Departure: {request.travelDate}</Typography>
                                    </Box>

                                    <Typography variant="body1" sx={{ color: "#90caf9" }}>➝</Typography>

                                    <Box sx={{ textAlign: "right" }}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{request.toLocation}</Typography>
                                        <Typography variant="body2" sx={{ color: "#bbbbbb" }}>Arrival: Next Day</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </ListItem>
                    ))}
                </List>

                {/* Dialog for People Quest Creation */}
                <Dialog open={isCreatingPeopleQuest} onClose={() => setIsCreatingPeopleQuest(false)} fullWidth maxWidth="sm">
                    <DialogContent>
                        <TravelRequestForm
                            open={isCreatingPeopleQuest}
                            handleClose={() => setIsCreatingPeopleQuest(false)}
                            handleSubmit={(data) => handleTravelCreation(data)}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    );
};

export default TravelRequestPage;
