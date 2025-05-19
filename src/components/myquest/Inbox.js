import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

// Define smart state transitions by role
const statusTransitions = {
    PENDING: [{ to: 'IN_PROGRESS', role: 'creator' }],
    IN_PROGRESS: [{ to: 'DELIVERED', role: 'acceptor' }],
    DELIVERED: [{ to: 'COMPLETED', role: 'creator' }],
    COMPLETED: [],
};

const stepLabels = ["PENDING", "IN_PROGRESS", "DELIVERED", "COMPLETED"];

const getStepIndex = (status) => {
    switch (status) {
        case "PENDING": return 0;
        case "IN_PROGRESS": return 1;
        case "DELIVERED": return 2;
        case "COMPLETED": return 3;
        default: return 0;
    }
};

const getAllowedTransitions = (currentStatus, role) => {
    return (statusTransitions[currentStatus] || [])
        .filter(t => t.role === role)
        .map(t => t.to);
};

const Inbox = ({
    messages,
    user,
    selectedSession,
    selectedQuest,
    chatSessions,
    newMessage,
    setNewMessage,
    handleSendMessage,
    getChatRecipientName,
    handleUpdateStatus
}) => {
    const chatEndRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const [selectedStatus, setSelectedStatus] = React.useState("");
    const [showProgress, setShowProgress] = React.useState(true);

    // Determine user role
    const userRole = selectedQuest && selectedQuest.questCreatorId
        ? (user.id === selectedQuest.questCreatorId ? 'creator' : 'acceptor')
        : null;


    const currentStatus = selectedQuest && selectedQuest.questStatus
        ? selectedQuest.questStatus.toUpperCase()
        : null;

    const allowedStatusOptions = currentStatus && userRole
        ? getAllowedTransitions(currentStatus, userRole)
        : [];



    // DEBUG LOGS
    useEffect(() => {
        console.log("Inbox Debug:");
        console.log("User role:", userRole);
        console.log("Current quest status:", selectedQuest?.questStatus);
        console.log("Allowed status options:", allowedStatusOptions);
    }, [userRole, selectedQuest, allowedStatusOptions]);

    const handleSubmit = () => {
        if (!selectedSession || !selectedQuest) return;

        if (!allowedStatusOptions.includes(selectedStatus)) {
            alert("Invalid status transition.");
            return;
        }

        handleUpdateStatus(selectedSession, selectedStatus);
        setSelectedStatus("");  // reset select after submit
    };

    return (
        <div className="inbox" style={{ marginTop: "20px" }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ color: '#90caf9', margin: 0 }}>
                    Inbox - {selectedSession ? getChatRecipientName(chatSessions[selectedQuest.id]?.find(session => session.id === selectedSession)) : "Unknown"}
                </h2>
                <IconButton
                    size="small"
                    onClick={() => setShowProgress((prev) => !prev)}
                    sx={{ color: '#90caf9', ml: 1 }}
                    aria-label={showProgress ? 'Hide Progress Bar' : 'Show Progress Bar'}
                >
                    {showProgress ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            </div>

            {/* Stepper Progress Bar */}
            {showProgress && selectedQuest && selectedSession && (
                <div style={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
                    <Typography variant="h6" style={{ color: "White ", marginBottom: "12px" }}>
                        Delivery Progress
                    </Typography>
                    <Stepper activeStep={getStepIndex(selectedQuest.questStatus)} alternativeLabel>
                        {stepLabels.map((label) => (
                            <Step key={label}>
                                <StepLabel sx={{ color: "white", '& .MuiStepLabel-label': { color: 'white' } }}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {selectedQuest && allowedStatusOptions.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                style={{
                                    marginRight: "10px",
                                    padding: "5px",
                                    borderRadius: "4px",
                                    background: "#222",
                                    color: "white",
                                    border: "1px solid white",
                                }}
                            >
                                <option value="">Select Status</option>
                                {allowedStatusOptions.map((label) => (
                                    <option key={label} value={label} style={{ color: "white" }}>
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

                </div>
            )
            }

            {/* Status Update Controls */}

            {/* Acceptors quick delivered button */}
            {
                selectedQuest &&
                user.id === selectedQuest.questAcceptorId &&
                selectedQuest.questStatus === "IN_PROGRESS" && (
                    <button
                        onClick={() => handleUpdateStatus(selectedSession, "DELIVERED")}
                        style={{
                            marginBottom: "10px",
                            padding: "10px 16px",
                            background: "#128c7e",
                            color: "white",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Mark as Delivered
                    </button>
                )
            }


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
                                backgroundColor: msg.sender === user.id.toString() ? '#128c7e' : '#303030',
                                alignSelf: msg.sender === user.id.toString() ? 'flex-end' : 'flex-start',
                                color: 'white',
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
                        style: { color: '#90caf9' },
                    }}
                />
            </div>
        </div >
    );
};

export default Inbox;
