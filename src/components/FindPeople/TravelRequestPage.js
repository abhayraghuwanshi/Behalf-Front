import { Box, Button, Dialog, DialogContent, List, ListItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TravelRequestService from "../../service/TravelRequestService";
import { useAuth } from "../SignIn/AuthContext";
import CommentSection from "./CommentSection";
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

    const fetchComments = async (requestId, keepOpen = false) => {
        const comments = await TravelRequestService.getCommentsByRequestId(requestId);
        setRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === requestId
                    ? { ...req, comments, showComments: keepOpen ? true : !req.showComments }
                    : req
            )
        );
    };

    const addComment = async (requestId, text) => {
        if (!text.trim()) return;

        if (!user || !user.firstName) {
            console.error("User not found! Cannot add comment.");
            return;
        }

        try {
            await TravelRequestService.addComment(requestId, text, user.firstName);
            await fetchComments(requestId, true);
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    const addReply = async (requestId, commentId, text) => {
        if (!text.trim()) return;

        if (!user || !user.firstName) {
            console.error("User not found! Cannot add reply.");
            return;
        }

        try {
            await TravelRequestService.replyToComment(commentId, text, user.firstName);
            await fetchComments(requestId, true);
        } catch (error) {
            console.error("Failed to add reply:", error);
        }
    };

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
        <Box sx={{ minHeight: "100vh", color: "white", padding: "20px", marginTop: "100px", marginLeft: '40px', marginRight: '40px' }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                <Typography variant="h4" sx={{ textAlign: "left", flexGrow: 1 }}>🌍 Travel Requests</Typography>
                <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white", marginLeft: "auto", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                    onClick={() => setIsCreatingPeopleQuest(true)}
                >
                    Create Post
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
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ sx: { color: "white" } }}
                    sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } } }}
                />
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
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#1E1E1E",
                            padding: "20px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            border: "1px solid #90caf9",
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

                        {/* Toggle Comments Button */}
                        <Button
                            variant="outlined"
                            sx={{ marginTop: "15px", color: "purple", borderColor: "purple", alignItems: 'left', "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                            onClick={() => fetchComments(request.id)}
                        >
                            {request.showComments ? "Hide Comments" : "Comments"}
                        </Button>

                        {/* Comment Section */}
                        {
                            request.showComments && (
                                <Box sx={{ marginTop: "15px", width: "100%" }}>
                                    <CommentSection
                                        comments={request.comments || []}
                                        addComment={(text) => addComment(request.id, text)}
                                        addReply={(commentId, text) => addReply(request.id, commentId, text)}
                                        requestCreatedAt={request.createdAt}
                                    />
                                </Box>
                            )
                        }

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
    );
};

export default TravelRequestPage;
