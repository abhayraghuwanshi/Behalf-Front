import { Box, Button, Collapse, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../SignIn/AuthContext";

const Comment = ({ comment, addReply, level = 0, user }) => {
    const [replyText, setReplyText] = useState("");
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(true);

    const handleReply = () => {
        if (!replyText.trim()) return;
        addReply(comment.id, replyText);
        setReplyText("");
        setShowReplyInput(false);
    };

    return (
        <Box sx={{ marginLeft: `${level * 20}px`, marginTop: 1, paddingLeft: "10px", borderLeft: level > 0 ? "2px solid #90caf9" : "none" }}>
            {/* ✅ Ensure Username is Displayed */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "white", fontWeight: level === 0 ? "bold" : "normal" }}>
                    <span style={{ color: "#90caf9", fontWeight: "bold", marginRight: "8px" }}>
                        {comment.username || "Anonymous"} {/* ✅ Display the username */}
                    </span>
                    {comment.text}
                </Typography>
                {user && (
                    <Button size="small" sx={{ color: "#90caf9", marginLeft: "10px" }} onClick={() => setShowReplyInput(!showReplyInput)}>
                        Reply
                    </Button>
                )}
                {comment.replies.length > 0 && (
                    <Button size="small" sx={{ color: "#90caf9", marginLeft: "10px" }} onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? "Hide Replies" : "Show Replies"}
                    </Button>
                )}
            </Box>

            {/* Reply Input - Only show if user is logged in */}
            {showReplyInput && user && (
                <Box sx={{ marginTop: 1 }}>
                    <TextField
                        fullWidth
                        label="Reply"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        margin="dense"
                        sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, color: "white" } }}
                    />
                    <Button onClick={handleReply} variant="contained" sx={{ marginTop: 1, backgroundColor: "#90caf9" }}>
                        Add Reply
                    </Button>
                </Box>
            )}

            {/* Nested Replies */}
            {comment.replies.length > 0 && (
                <Collapse in={showReplies}>
                    <Box>
                        {comment.replies.map((reply) => (
                            <Comment key={reply.id} comment={reply} addReply={addReply} level={level + 1} user={user} />
                        ))}
                    </Box>
                </Collapse>
            )}
        </Box>
    );
};

// Main Comment Section
const CommentSection = ({ comments, addComment, addReply }) => {
    const [newComment, setNewComment] = useState("");
    const { user, loading } = useAuth(); // ✅ Get user authentication state

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
                <>
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
                        sx={{ marginTop: 1, backgroundColor: "#90caf9" }}
                    >
                        Add Comment
                    </Button>
                </>
            ) : (
                <Typography sx={{ color: "#90caf9", textAlign: "center", fontSize: "16px", marginBottom: "10px" }}>
                    🔒 Log in to post a comment
                </Typography>
            )}

            {/* Show Comments */}
            <Box sx={{ marginTop: "10px" }}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} addReply={addReply} user={user} />
                ))}
            </Box>
        </Box>
    );
};

export default CommentSection;
