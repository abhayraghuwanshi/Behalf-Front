import {
    Button,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import CommentSection from "./CommentSection"; // Import the nested comment component

const TravelRequestPage = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            category: "traveler",
            fromLocation: "Montreal",
            toLocation: "India",
            travelDate: "2025-03-01",
            price: "300",
            comments: [
                {
                    id: 1,
                    text: "When are you traveling?",
                    replies: [{ id: 2, text: "March 1st!", replies: [] }]
                }
            ],
            showComments: false // Initially hidden
        },
        {
            id: 2,
            category: "seeker",
            fromLocation: "India",
            toLocation: "Montreal",
            travelDate: "2025-04-15",
            price: "250",
            comments: [],
            showComments: false // Initially hidden
        }
    ]);

    const [filterCategory, setFilterCategory] = useState("all");
    const [filterDate, setFilterDate] = useState("");

    // Toggle comment visibility for a request
    const toggleComments = (id) => {
        setRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === id ? { ...req, showComments: !req.showComments } : req
            )
        );
    };

    // Function to add a comment to a specific request
    const addCommentToRequest = (requestId, commentText) => {
        setRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === requestId
                    ? { ...req, comments: [...req.comments, { id: Date.now(), text: commentText, replies: [] }] }
                    : req
            )
        );
    };

    // Function to add a reply to a specific comment in a request
    const addReplyToRequest = (requestId, commentId, replyText) => {
        const addNestedReply = (commentsList) => {
            return commentsList.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, replies: [...comment.replies, { id: Date.now(), text: replyText, replies: [] }] };
                } else {
                    return { ...comment, replies: addNestedReply(comment.replies) };
                }
            });
        };

        setRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === requestId ? { ...req, comments: addNestedReply(req.comments) } : req
            )
        );
    };

    const filteredRequests = requests.filter((request) => {
        return (
            (filterCategory === "all" || request.category === filterCategory) &&
            (filterDate === "" || request.travelDate === filterDate)
        );
    });

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "white", padding: "20px" }}>
            <Typography variant="h4">Travel Requests</Typography>

            {/* Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px" }}>
                <TextField
                    select
                    fullWidth
                    label="Filter by Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    margin="dense"
                    sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, color: "white" },
                        "& .MuiSvgIcon-root": { color: "white" },
                    }}
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
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, color: "white" },
                    }}
                />
            </div>

            {/* Travel Requests List */}
            <List>
                {filteredRequests.map((request) => (
                    <ListItem key={request.id} sx={{ display: "block", paddingBottom: "20px", marginBottom: "20px" }}>
                        <ListItemText
                            primary={`${request.category} from ${request.fromLocation} to ${request.toLocation}`}
                            secondary={`Date: ${request.travelDate}, Price: $${request.price}`}
                            primaryTypographyProps={{ color: "white" }}
                            secondaryTypographyProps={{ color: "#bbbbbb" }}
                        />

                        {/* Toggle Comments Button */}
                        <Button
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                "&:hover": { borderColor: "gray" },
                            }}
                            onClick={() => toggleComments(request.id)}
                        >
                            {request.showComments ? "Hide Comments" : "Show Comments"}
                        </Button>

                        {/* Show Comments Section only when clicked */}
                        {request.showComments && (
                            <CommentSection
                                comments={request.comments}
                                addComment={(text) => addCommentToRequest(request.id, text)}
                                addReply={(commentId, replyText) => addReplyToRequest(request.id, commentId, replyText)}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TravelRequestPage;
