import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../service/PostService";
import ProfileService from "../../service/ProfileService";
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
                setPost(response.data);

                const creatorResponse = await ProfileService.fetchUserById(response.data.questCreatorId);
                setCreator(creatorResponse.data);

                const similarPostsResponse = await PostService.getSimilarPosts(response.data.questLabel);
                setSimilarPosts(similarPostsResponse.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (!post) {
        return <Typography color="white">Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, color: "white", marginTop: 300 }}>
            <Button onClick={() => navigate(-1)} sx={{ marginBottom: 2, color: "white" }}>Back</Button>
            <Typography variant="h4" gutterBottom>{post.questInstructions}</Typography>
            <Typography variant="body1">Reward: ${post.questReward}</Typography>
            <Typography variant="body1">Created: {new Date(post.creationTimestamp).toLocaleDateString()}</Typography>
            <Typography variant="body1">Quest Progress: {post.questStatus == null ? 'PENDING' : post.questStatus}</Typography>

            {creator && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h5">Creator Details</Typography>
                    <Typography variant="body1">Name: {creator.firstName} {creator.lastName}</Typography>
                    <Typography variant="body1">Email: {creator.email}</Typography>
                    <Typography variant="body1">Number of Quests Done: {creator.questsDone}</Typography>
                    <Typography variant="body1">Review: {creator.review}</Typography>
                </Box>
            )}

            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h5">Similar Posts</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {similarPosts.map((similarPost) => (
                        <PostCard key={similarPost.id} postData={similarPost} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default PostDetail;
