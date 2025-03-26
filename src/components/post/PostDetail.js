import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../service/PostService";
import PostCard from "./PostCard";

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [creator, setCreator] = useState(null);
    const [similarPosts, setSimilarPosts] = useState([]);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await PostService.getPostById(postId);
                setPost(response);
                setCreator(response.userInformation);

                const similarPostsResponse = await PostService.getSimilarPosts(response.id);
                setSimilarPosts(similarPostsResponse);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPostDetails();
    }, []);

    if (!post || !creator) {
        return <Typography color="white" sx={{ textAlign: "center", marginTop: "100px" }}>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, color: "white", marginTop: '100px', maxWidth: "1200px", margin: "auto" }}>
            <Button onClick={() => navigate(-1)} sx={{ marginBottom: 2, color: "white" }}>Back</Button>

            {/* Quest Details */}
            <Card sx={{ backgroundColor: "#1E1E1E", padding: 3, borderRadius: "12px", marginBottom: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ color: "#90caf9", fontWeight: "bold" }}>
                    {post.questInstructions}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    Reward: {post.questReward} {post.questCurrency}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    Valid Until: {new Date(post.questValidity).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    Created: {new Date(post.creationTimestamp).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    From: {post.locationFrom}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc", marginBottom: 1 }}>
                    To: {post.locationTo}
                </Typography>
                <Typography variant="body1" sx={{ color: "#cccccc" }}>
                    Status: {post.questStatus || 'PENDING'}
                </Typography>
            </Card>

            {/* Creator Details */}
            <Card sx={{ backgroundColor: "#1E1E1E", padding: 3, borderRadius: "12px", marginBottom: 3 }}>
                <Typography variant="h5" sx={{ color: "#90caf9", fontWeight: "bold", marginBottom: 2 }}>
                    Creator Details
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={creator.picture} alt={creator.firstName} sx={{ width: 64, height: 64 }} />
                    <Box>
                        <Typography variant="body1" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                            {creator.firstName} {creator.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            Email: {creator.email}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            Quests Done: {creator.questsDone || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cccccc" }}>
                            Review: {creator.review || 'No reviews available'}
                        </Typography>
                    </Box>
                </Box>
            </Card>

            {/* Similar Posts */}
            <Box>
                <Typography variant="h5" sx={{ color: "#90caf9", fontWeight: "bold", marginBottom: 2 }}>
                    Similar Quests
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {similarPosts.length > 0 ? (
                        similarPosts.map((similarPost) => (
                            <PostCard key={similarPost.id} postData={similarPost} />
                        ))
                    ) : (
                        <Typography sx={{ color: "#cccccc" }}>No similar posts found.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default PostDetail;
