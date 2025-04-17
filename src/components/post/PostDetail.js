import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageService from "../../service/FileService";
import PostService from "../../service/PostService";

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false); // Added for dialog
    const [questMessage, setQuestMessage] = useState(""); // Added for message input

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await PostService.getPostById(postId);
                setPost(response);

                // Fetch the image
                if (response.imageUrl) {
                    const [bucketName, imageId] = response.imageUrl.split('/');
                    const fetchedImageUrl = await imageService.fetchImage(`${bucketName}/file/${imageId}`);
                    setImageUrl(fetchedImageUrl);
                }
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPostDetails();
    }, [postId]);

    const openInterestedDialog = () => setIsPopUpOpen(true); // Open dialog
    const closeInterestedDialog = () => { setIsPopUpOpen(false); setQuestMessage(""); }; // Close dialog

    const handleAccept = () => {
        if (!questMessage) {
            alert("Error: Missing required quest message");
            return;
        }
        alert(`Interested with message: ${questMessage}`); // Replace with actual functionality
        closeInterestedDialog();
    };

    if (!post) {
        return <Typography color="white" sx={{ textAlign: "center", marginTop: "100px" }}>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, color: "white", marginTop: '20px', maxWidth: "1200px", margin: "auto" }}>
            <Button
                onClick={() => navigate(-1)}
                sx={{
                    color: "white",
                    marginBottom: 2,
                    marginTop: 8,
                    backgroundColor: "#333",
                    "&:hover": { backgroundColor: "#555" },
                }}
            >
                Back
            </Button>


            {/* Quest Details */}
            <Card sx={{ backgroundColor: "#1E1E1E", padding: 3, borderRadius: "12px", marginBottom: 3, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
                <Typography variant="h4" gutterBottom sx={{ color: "#90caf9", fontWeight: "bold" }}>
                    {post.questInstructions}
                </Typography>
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Quest"
                            style={{ width: '100%', height: '300px', borderRadius: '8px', objectFit: 'cover', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                        />
                    ) : (
                        <Typography variant="body2" sx={{ color: "#cccccc" }}>No image available</Typography>
                    )}
                </Box>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    <strong>Reward:</strong> {post.questReward} {post.questCurrency}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    <strong>Valid Until:</strong> {new Date(post.questValidity).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    <strong>Created:</strong> {new Date(post.creationTimestamp).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    <strong>From:</strong> {post.locationFrom}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    <strong>To:</strong> {post.locationTo}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 2 }}>
                    <strong>Status:</strong> {post.questStatus || 'PENDING'}
                </Typography>

                {/* Buttons Inline */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        sx={{
                            color: "#ffffff",
                            backgroundColor: "#333",
                            "&:hover": { backgroundColor: "#555" },
                        }}
                        onClick={() => {
                            const shareUrl = `${window.location.origin}/post/${postId}`;
                            navigator.clipboard.writeText(shareUrl).then(() => {
                                alert("Share link copied to clipboard!");
                            });
                        }}
                    >
                        Share
                        <ShareIcon sx={{ marginLeft: '5px' }} />
                    </Button>

                    <Button
                        sx={{
                            color: "#ffffff",
                            backgroundColor: "#333",
                            "&:hover": { backgroundColor: "#555" },
                        }}
                        onClick={openInterestedDialog} // Open dialog on click
                    >
                        <FavoriteIcon sx={{ marginRight: '5px' }} />
                        Interested
                    </Button>
                </Box>
            </Card>

            {/* Interested Dialog */}
            <Dialog
                open={isPopUpOpen}
                onClose={closeInterestedDialog}
                fullWidth
                maxWidth="sm"
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "& .MuiPaper-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        overflowY: "hidden",
                    }
                }}
            >
                <DialogContent>
                    <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
                        {post.questInstructions}
                    </Typography>
                    <input
                        type="text"
                        value={questMessage}
                        onChange={(e) => setQuestMessage(e.target.value)}
                        placeholder="Enter Message"
                        required
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            border: "1px solid white",
                            padding: "8px",
                            width: "100%",
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleAccept} sx={{ color: "white" }}>
                        Send
                    </Button>
                    <Button onClick={closeInterestedDialog} sx={{ color: "white" }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Creator Details */}
            <Card sx={{ backgroundColor: "#1E1E1E", padding: 3, borderRadius: "12px", marginBottom: 3, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
                <Typography variant="h5" sx={{ color: "#90caf9", fontWeight: "bold", marginBottom: 2 }}>
                    Creator Details
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={post.userInformation.picture} alt={post.userInformation.firstName} sx={{ width: 64, height: 64, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }} />
                    <Box>
                        <Typography variant="body1" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                            {post.userInformation.firstName} {post.userInformation.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            <strong>Email:</strong> {post.userInformation.email}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default PostDetail;
