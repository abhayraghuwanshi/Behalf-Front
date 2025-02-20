import { Box, Button, List, ListItem, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TravelRequestService from "../../service/TravelRequestService";
import { useAuth } from "../SignIn/AuthContext"; // ✅ Import useAuth
import CommentSection from "./CommentSection";

const TravelRequestPage = () => {
    const { user, loading } = useAuth(); // ✅ Get authenticated user
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(false);
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterDate, setFilterDate] = useState("");

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

    // ✅ Fix: Keep comments open after posting
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
            await fetchComments(requestId, true); // ✅ Keep comments open
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
            await fetchComments(requestId, true); // ✅ Keep comments open
        } catch (error) {
            console.error("Failed to add reply:", error);
        }
    };

    const filteredRequests = Array.isArray(requests)
        ? requests.filter((request) =>
            (filterCategory === "all" || request.category === filterCategory) &&
            (filterDate === "" || request.travelDate === filterDate)
        )
        : [];

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#121212", color: "white", padding: "20px", marginTop: "100px" }}>
            {/* Filters */}
            <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
                <TextField
                    select
                    fullWidth
                    label="Filter by Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    sx={{ "& .MuiInputLabel-root": { color: "white" }, "& .MuiOutlinedInput-root": { color: "white" } }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="traveler">Traveler</MenuItem>
                    <MenuItem value="seeker">Seeker</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    type="date"
                    label="Filter by Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ "& .MuiInputLabel-root": { color: "white" }, "& .MuiOutlinedInput-root": { color: "white" } }}
                />
            </Box>

            {/* Show Network Error Message */}
            {error && (
                <Typography sx={{ color: "red", textAlign: "center", fontSize: "18px" }}>
                    ⚠️ Unable to connect to the server. Showing cached data.
                </Typography>
            )}

            {/* Travel Requests */}
            <List sx={{ overflowY: "auto", maxHeight: "80vh" }}>
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
                            <Typography variant="h6" sx={{ color: "#90caf9" }}>✈️ Traveler</Typography>
                        </Box>

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

                        {/* Toggle Comments Button */}
                        <Button
                            variant="outlined"
                            sx={{ marginTop: "15px", color: "white", borderColor: "white" }}
                            onClick={() => fetchComments(request.id)}
                        >
                            {request.showComments ? "Hide Comments" : "Comments"}
                        </Button>

                        {/* Comment Section */}
                        {request.showComments && (
                            <Box sx={{ marginTop: "15px", width: "100%" }}>
                                <CommentSection
                                    comments={request.comments || []}
                                    addComment={(text) => addComment(request.id, text)}
                                    addReply={(commentId, text) => addReply(request.id, commentId, text)}
                                />
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TravelRequestPage;
