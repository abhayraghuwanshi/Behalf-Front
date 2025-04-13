import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageService from "../../service/FileService";
import PostService from "../../service/PostService";

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

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
                <Typography variant="body1" sx={{ color: "#cccccc" }}>
                    <strong>Status:</strong> {post.questStatus || 'PENDING'}
                </Typography>
            </Card>

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
