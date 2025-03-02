import { Email } from "@mui/icons-material";
import { Chip, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import '../../service/PostService';
import PostService from '../../service/PostService';
import ProfileService from "../../service/ProfileService";
import QuestSessionService from "../../service/QuestSessionService";
import { useAuth } from "../SignIn/AuthContext";
import '../UserProfile/UserProfile';
import Inbox from "./Inbox";
import "./MyQuest.css";

const MyQuestPage = () => {
    const { user } = useAuth();
    const [quests, setQuests] = useState([]);
    const [filteredQuests, setFilteredQuests] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [chatSessions, setChatSessions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [userMap, setUserMap] = useState({});
    const [questFilter, setQuestFilter] = useState("ALL");
    const [loading, setLoading] = useState(true); // Loading state
    const labels = ["PENDING", "REJECTED", "SUCCESS"];
    const [selectedStatus, setSelectedStatus] = useState('PENDING');
    const [filterLabel, setFilterLabel] = useState("ALL");
    const [filterDate, setFilterDate] = useState("");

    const handleChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSubmit = (session) => {
        handleUpdateStatus(session, selectedStatus);
    };

    // Fetch user info and populate userMap
    const fetchUserInfo = async () => {
        try {
            const response = await ProfileService.fetchUserByEmail();
            if (response.status === 200) {
                const users = response.data;
                setUserMap(users);
                console.log(userMap);
            }
            console.log("saving user map");
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    // Fetch quest data and chat sessions
    const fetchQuestData = async () => {
        if (!user || !user.id) return;

        try {
            console.log("Fetching quest data for user ID:", user.id);
            const response = await QuestSessionService.fetchChats(user.id);
            console.log("Quest data response:", response.data);
            const { questMetadataList, chatSessionDTOList } = response.data;

            setQuests(questMetadataList);
            setFilteredQuests(questMetadataList);

            const chatSessionsMap = {};
            Object.entries(chatSessionDTOList).forEach(([questId, sessions]) => {
                chatSessionsMap[questId] = sessions;
            });
            setChatSessions(chatSessionsMap);
        } catch (error) {
            console.error("Error fetching quest data:", error);
        }
    };

    // Fetch data concurrently
    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.id) return;

            try {
                setLoading(true); // Set loading to true before fetching
                await Promise.all([fetchUserInfo(), fetchQuestData()]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, [user]);

    // Apply filters
    useEffect(() => {
        const applyFilters = () => {
            let filtered = quests;

            if (filterLabel !== "ALL") {
                filtered = filtered.filter(quest =>
                    filterLabel === "CREATOR" ? quest.questCreatorId === user.id : quest.questCreatorId !== user.id
                );
            }

            if (filterDate) {
                filtered = filtered.filter(quest =>
                    new Date(quest.creationTimestamp).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
                );
            }

            setFilteredQuests(filtered);
        };

        applyFilters();
    }, [quests, filterLabel, filterDate, user]);

    // Render loading state
    if (loading) {
        return <div tex="white">Loading...</div>;
    }

    // Fetch messages for a specific chat session
    const fetchMessages = async (sessionId) => {
        if (!user) return;
        try {
            console.log("Fetching messages for session ID:", sessionId);
            const response = await QuestSessionService.fetchMessages(sessionId);
            console.log("Messages response:", response.data);
            setMessages(response.data);
            setSelectedSession(sessionId);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Send a new message
    const handleSendMessage = async () => {
        if (!user || !selectedQuest || !selectedSession) {
            alert("Ensure user, quest, and chat session are selected.");
            return;
        }
        if (!newMessage.trim()) return;

        const messagePayload = {
            sender: user.id.toString(),
            recipient: selectedQuest.questCreatorId?.toString() || "",
            message: newMessage,
        };

        try {
            console.log("Sending message:", messagePayload);
            await QuestSessionService.postMessage(selectedSession, messagePayload);
            setMessages((prevMessages) => [...prevMessages, messagePayload]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Update quest status
    const handleUpdateStatus = async (session, newStatus) => {
        if (!user || !selectedQuest || !session) return;

        try {
            console.log("Updating status for session ID:", session);
            await PostService.updatePost({ ...session, questStatus: newStatus });
            // Refresh quest data after updating status
            await fetchQuestData();
        } catch (error) {
            console.error("Error updating quest status:", error);
        }
    };

    // Get the name of the user you're chatting with
    const getChatRecipientName = (session) => {
        console.log(session, userMap);
        if (!session || !userMap) return "Unknown";
        const recipientId = session.questCreatorId === user.id ? session.questAcceptorId : session.questCreatorId;
        return userMap[recipientId] ? `${userMap[recipientId].firstName} ${userMap[recipientId].lastName}` : "Unknown";
    };

    return (
        <div>
            <div className="my-quest-page" style={{ marginTop: "100px", marginBottom: "50px" }}>

                <div className="quests">
                    <h2 style={{ color: '#90caf9' }}> Quests</h2>
                    {/* Filters */}
                    <div className="filters" style={{ display: "flex", gap: "20px", marginBottom: "20px", width: "100%", }}>
                        <Select
                            value={filterLabel}
                            onChange={(e) => setFilterLabel(e.target.value)}
                            displayEmpty
                            sx={{ color: "white", border: "1px solid white", width: "150px" }}
                        >
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="CREATOR">Creator</MenuItem>
                            <MenuItem value="ACCEPTOR">Acceptor</MenuItem>
                        </Select>
                        <TextField
                            type="date"
                            label="Filter by Date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ sx: { color: "white" } }}
                            sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" }, width: "150px" } }}
                        />
                    </div>

                    <ul>
                        {filteredQuests.map((quest) => (
                            <li
                                style={{
                                    padding: "10px", marginBottom: "15px", borderRadius: "8px",
                                    cursor: "pointer", background: selectedQuest?.id === quest.id ? "#444" :
                                        "#303030", transition: "background 0.3s",
                                    lineHeight: '24px'
                                }}
                                key={quest.id}
                                onClick={() => setSelectedQuest(quest)}
                                className={selectedQuest?.id === quest.id ? "active" : ""}
                            >
                                Instruction: {quest.questInstructions} <br />
                                Reward: ${quest.questReward} <br />
                                Author: {userMap && quest.questCreatorId && userMap[quest.questCreatorId] ? `${userMap[quest.questCreatorId].firstName} ${userMap[quest.questCreatorId].lastName}` : "Unknown"} <br />
                                Created: {new Date(quest.creationTimestamp).toLocaleDateString()} <br />
                                Quest Progress: {quest.questStatus == null ? 'PENDING' : quest.questStatus} <br />
                                <Chip sx={{
                                    borderRadius: "4px",
                                    margin: "4px",
                                    color: "white",
                                }} label={user.id === quest.questCreatorId ? "Creator" : "Applied"} variant="outlined" size="small"></Chip>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quest Hunter (Chat Sessions) */}
                <div className="quest-hunter">
                    <h2 style={{ color: '#90caf9' }}>Quest Progress</h2>
                    {selectedQuest ? (
                        <ul>
                            {chatSessions[selectedQuest.id]?.filter(session => session.questStatus === "PENDING")
                                .map((session) => (
                                    <li
                                        key={session.id}
                                        className={`chat-session ${selectedSession === session.id ? "active" : ""}`}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            color: "white",
                                            padding: "10px",
                                            marginBottom: "8px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            background: "#303030",
                                            transition: "background 0.3s",
                                        }}
                                    >
                                        {/* Left Side: Chat Info & Status Update */}
                                        <div className="left-content" style={{ display: "flex", flexDirection: "column" }}>
                                            <div>
                                                {getChatRecipientName(session)} - {session.questStatus} Application
                                            </div>
                                            {/* Dropdown for status update (only for quest creator) */}
                                            {user.id === selectedQuest.questCreatorId && (
                                                <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                                                    <select
                                                        value={selectedQuest.questStatus}
                                                        onChange={handleChange}
                                                        style={{
                                                            marginLeft: "10px",
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
                                                        onClick={(session) => handleSubmit(session)}
                                                        style={{
                                                            marginLeft: "10px",
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

                                        {/* Right Side: Inbox Button */}
                                        <div className="right-content">
                                            <button
                                                onClick={() => fetchMessages(session.id)}
                                                style={{
                                                    padding: "8px 12px",
                                                    background: 'transparent',
                                                    color: "white",
                                                    cursor: "pointer",
                                                    transition: "background 0.3s ease",
                                                }}

                                            >
                                                <Email />
                                            </button>
                                        </div>
                                    </li>



                                )) || <p>No pending users available for this quest</p>}
                        </ul>
                    ) : (
                        <p>Select a quest to see chat sessions</p>
                    )}
                </div>

                {/* Chat Inbox
                <div className="inbox">
                    <h2 style={{ color: '#90caf9' }}>Inbox - {selectedSession ? getChatRecipientName(chatSessions[selectedQuest.id]?.find(session => session.id === selectedSession)) : "Unknown"}</h2>
                    {messages.length > 0 ? (
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index}>
                                    <strong>{msg.sender === user.id.toString() ? "You" : getChatRecipientName(chatSessions[selectedQuest.id]?.find(session => session.id === selectedSession))}:</strong> {msg.message}
                                    <div style={{ fontSize: "10px", color: "#90caf9" }}>
                                        {new Date(msg.timestamp).toLocaleString()}  </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Select a chat session to see messages</p>
                    )}


                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div> 
                */}
                <Inbox
                    messages={messages}
                    user={user}
                    selectedSession={selectedSession}
                    selectedQuest={selectedQuest}
                    chatSessions={chatSessions}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSendMessage={handleSendMessage}
                    getChatRecipientName={getChatRecipientName}
                />

            </div>
        </div >
    );
};

export default MyQuestPage;