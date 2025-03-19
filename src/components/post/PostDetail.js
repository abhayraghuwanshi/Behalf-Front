import { Avatar, Box, Button, Typography } from "@mui/material";
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
        return <Typography color="white">Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 3, color: "white", marginTop: '100px' }}>
            <Button onClick={() => navigate(-1)} sx={{ marginBottom: 2, color: "white" }}>Back</Button>

            {/* Quest Details */}
            <Typography variant="h4" gutterBottom>{post.questInstructions}</Typography>
            <Typography variant="body1">Reward: ${post.questReward}</Typography>
            <Typography variant="body1">Created: {new Date(post.creationTimestamp).toLocaleDateString()}</Typography>
            <Typography variant="body1">Quest Status: {post.questStatus || 'PENDING'}</Typography>

            {/* Creator Details */}
            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h5">Creator Details</Typography>
                <Avatar src={creator.picture} alt={creator.firstName} sx={{ width: 64, height: 64, marginBottom: 1 }} />
                <Typography variant="body1">Name: {creator.firstName} {creator.lastName}</Typography>
                <Typography variant="body1">Email: {creator.email}</Typography>
                <Typography variant="body1">Number of Quests Done: {creator.questsDone || 'N/A'}</Typography>
                <Typography variant="body1">Review: {creator.review || 'No reviews available'}</Typography>
            </Box>

            {/* Similar Posts */}
            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h5">Similar Posts</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {similarPosts.length > 0 ? (
                        similarPosts.map((similarPost) => (
                            <PostCard key={similarPost.id} postData={similarPost} />
                        ))
                    ) : (
                        <Typography>No similar posts found.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default PostDetail;
