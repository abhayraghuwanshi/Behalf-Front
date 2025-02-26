import CommentIcon from '@mui/icons-material/Comment';
import Face5Icon from '@mui/icons-material/Face5';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Collapse, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../SignIn/AuthContext";

const Comment = ({ comment, addReply, level = 0, user, requestCreatedAt }) => {
    const [replyText, setReplyText] = useState("");
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const handleReply = () => {
        if (!replyText.trim()) return;
        addReply(comment.id, replyText);
        setReplyText("");
        setShowReplyInput(false);
    };

    const getCommentDay = () => {
        const commentDate = new Date(comment.creationDate);
        const requestDate = new Date(requestCreatedAt);
        const diffTime = Math.abs(commentDate - requestDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <Box sx={{ marginLeft: `${level * 20}px`, marginTop: 1, paddingLeft: "10px", borderLeft: level > 0 ? "2px solid #90caf9" : "none" }}>
            <Box>
                <Typography>
                    <span style={{ color: "#90caf9", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                        <Face5Icon sx={{ marginRight: "5px" }} />
                        {comment.username || "Anonymous"}
                        <Typography sx={{ color: "", fontSize: "10px", marginLeft: "10px", color: "white" }}>
                            - {getCommentDay()} day ago
                        </Typography>
                    </span>
                    <br />
                    <div style={{ marginLeft: "20px" }}>
                        {comment.text}
                    </div>
                </Typography>
                <br />
                {user && (
                    <Button size="small" sx={{ color: "#90caf9", fontSize: '8px' }} onClick={() => setShowReplyInput(!showReplyInput)}>
                        <CommentIcon sx={{ marginRight: '5px', height: '12px' }} /> Reply
                    </Button>
                )}
                {comment.replies.length > 0 && (
                    <Button size="small" sx={{ color: "#90caf9", fontSize: '8px' }} onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? "Hide Replies" : "Show Replies"}
                    </Button>
                )}
            </Box>

            {/* Reply Input - Only show if user is logged in */}
            {showReplyInput && user && (
                <Box sx={{ marginTop: 1, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        label="Reply"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        margin="dense"
                        sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, color: "white" } }}
                    />
                    <Button onClick={handleReply} variant="contained" sx={{ marginLeft: 1, backgroundColor: "#90caf9" }}>
                        <SendIcon />
                    </Button>
                </Box>
            )}

            {/* Nested Replies */}
            {comment.replies.length > 0 && (
                <Collapse in={showReplies}>
                    <Box>
                        {comment.replies.map((reply) => (
                            <Comment key={reply.id} comment={reply} addReply={addReply} level={level + 1} user={user} requestCreatedAt={requestCreatedAt} />
                        ))}
                    </Box>
                </Collapse>
            )}
        </Box>
    );
};

// Main Comment Section
const CommentSection = ({ comments, addComment, addReply, requestCreatedAt }) => {
    const [newComment, setNewComment] = useState("");
    const { user, loading } = useAuth(); // ✅ Get user authentication state
    const [showAllComments, setShowAllComments] = useState(false);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            await addComment(newComment);
            setNewComment("");
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <Box sx={{ paddingTop: "10px" }}>
            {/* Add New Comment - Only for Logged-In Users */}
            {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        label="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        margin="dense"
                        sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, color: "white" } }}
                    />
                    <Button
                        onClick={handleAddComment} // ✅ Fix Button Click
                        variant="contained"
                        sx={{ marginLeft: 1, backgroundColor: "#90caf9" }}
                    >
                        Add Comment
                    </Button>
                </Box>
            ) : (
                <Typography sx={{ color: "#90caf9", textAlign: "center", fontSize: "16px", marginBottom: "10px" }}>
                    🔒 Log in to post a comment
                </Typography>
            )}

            {/* Show Comments */}
            <Box sx={{ marginTop: "10px" }}>
                {comments.slice(0, showAllComments ? comments.length : 1).map((comment) => (
                    <Comment key={comment.id} comment={comment} addReply={addReply} user={user} requestCreatedAt={requestCreatedAt} />
                ))}
                {comments.length > 1 && (
                    <Button size="small" sx={{ color: "#90caf9", marginTop: "10px" }} onClick={() => setShowAllComments(!showAllComments)}>
                        {showAllComments ? "Show Less" : "Show More"}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default CommentSection;
