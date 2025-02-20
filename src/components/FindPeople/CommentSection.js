import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

// Recursive Comment Component
const Comment = ({ comment, addReply, level = 0, isLast }) => {
    const [replyText, setReplyText] = useState("");
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReply = () => {
        if (replyText.trim()) {
            addReply(comment.id, replyText);
            setReplyText("");
            setShowReplyInput(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", marginLeft: level > 0 ? "20px" : "0px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Tree line for replies */}
                {level > 0 && (
                    <Box
                        sx={{
                            width: "10px",
                            height: "100%",
                            borderLeft: "2px solid #90caf9",
                            marginRight: "8px",
                            marginTop: level > 1 ? "-12px" : "0",
                        }}
                    />
                )}

                {/* Comment Text */}
                <Typography variant="body1" sx={{ color: "white" }}>
                    {comment.text}
                </Typography>

                {/* Reply Button */}
                <Button size="small" sx={{ color: "#90caf9", marginLeft: "10px" }} onClick={() => setShowReplyInput(!showReplyInput)}>
                    Reply
                </Button>
            </Box>

            {/* Reply Input Box */}
            {showReplyInput && (
                <Box sx={{ marginLeft: "20px", marginTop: "5px" }}>
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

            {/* Render Replies with Proper Tree Line Alignment */}
            <div style={{ marginLeft: "20px", paddingLeft: "10px", borderLeft: comment.replies.length ? "2px solid #90caf9" : "none" }}>
                {comment.replies.map((reply, index) => (
                    <Comment key={reply.id} comment={reply} addReply={addReply} level={level + 1} isLast={index === comment.replies.length - 1} />
                ))}
            </div>
        </div>
    );
};

// Main Comment Section
const CommentSection = ({ comments, addComment, addReply }) => {
    const [newComment, setNewComment] = useState("");

    return (
        <div style={{ paddingTop: "10px" }}>
            {/* Add New Comment */}
            <TextField
                fullWidth
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                margin="dense"
                sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, color: "white" } }}
            />
            <Button onClick={() => { addComment(newComment); setNewComment(""); }} variant="contained" sx={{ marginTop: 1, backgroundColor: "#90caf9" }}>
                Add Comment
            </Button>

            {/* Show Comments */}
            <div style={{ marginTop: "10px" }}>
                {comments.map((comment, index) => (
                    <Comment key={comment.id} comment={comment} addReply={addReply} isLast={index === comments.length - 1} />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
