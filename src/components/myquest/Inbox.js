import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const Inbox = ({ messages, user, selectedSession, selectedQuest, chatSessions, newMessage, setNewMessage, handleSendMessage, getChatRecipientName, handleUpdateStatus }) => {
    const chatEndRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const labels = ["PENDING", "REJECTED", "SUCCESS"];
    const [selectedStatus, setSelectedStatus] = React.useState("PENDING");

    const handleChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedSession) {
            handleUpdateStatus(selectedSession, selectedStatus);
        }
    };

    return (
        <div className="inbox">
            {/* Header */}
            <h2 style={{ color: '#90caf9' }}>
                Inbox - {selectedSession ? getChatRecipientName(chatSessions[selectedQuest.id]?.find(session => session.id === selectedSession)) : "Unknown"}
            </h2>

            {/* Status Dropdown and Submit Button */}
            {selectedQuest && user.id === selectedQuest.questCreatorId && (
                <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
                    <select
                        value={selectedStatus}
                        onChange={handleChange}
                        style={{
                            marginRight: "10px",
                            padding: "5px",
                            borderRadius: "4px",
                            background: "#222",
                            color: "white",
                            border: "1px solid white",
                        }}
                    >
                        {labels.map((label) => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            background: "#444",
                            color: "white",
                            border: "1px solid #90caf9",
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "#555")}
                        onMouseOut={(e) => (e.target.style.background = "#444")}
                    >
                        Submit
                    </button>
                </div>
            )}

            {/* Messages */}
            <div style={{ overflowY: 'auto', maxHeight: '60vh', padding: '10px' }}>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                maxWidth: '75%',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                marginBottom: '8px',
                                backgroundColor: msg.sender === user.id.toString() ? '#128c7e' : '#303030', // Green for "You", Dark Gray for Others
                                alignSelf: msg.sender === user.id.toString() ? 'flex-end' : 'flex-start',
                                color: 'white', // Ensure white text for visibility
                            }}
                            style={{
                                textAlign: msg.sender === user.id.toString() ? 'right' : 'left',
                                marginLeft: msg.sender === user.id.toString() ? 'auto' : '0',
                            }}
                        >
                            <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                                {msg.message}
                            </Typography>
                            <Typography variant="caption" style={{ display: 'block', marginTop: '5px', color: '#90caf9' }}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body2" style={{ color: '#90caf9' }}>
                        Select a chat session to see messages
                    </Typography>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="message-input" style={{ display: 'flex', marginTop: '16px' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSendMessage} color="primary">
                                    <SendIcon style={{ color: '#90caf9' }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: {
                            borderRadius: '20px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '1px solid white',
                        },
                    }}
                    InputLabelProps={{
                        style: { color: '#90caf9' }, // Placeholder and label color
                    }}
                />
            </div>
        </div>
    );
};

export default Inbox;
