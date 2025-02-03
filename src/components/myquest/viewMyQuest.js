import React, { useEffect, useState } from "react";
import '../../service/PostService';
import PostService from '../../service/PostService';
import ProfileService from "../../service/ProfileService";
import QuestSessionService from "../../service/QuestSessionService";
import { useAuth } from "../SignIn/AuthContext";
import '../UserProfile/UserProfile';
import "./MyQuest.css";

const MyQuestPage = () => {
    const { user } = useAuth();
    const [quests, setQuests] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [chatSessions, setChatSessions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [userMap, setUserMap] = useState({});
    const [questFilter, setQuestFilter] = useState("ALL");
    const [loading, setLoading] = useState(true); // Loading state
    const labels = ["PENDING", "REFERRED", "REJECTED", "SUCCESS"];

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
            <div className="my-quest-page">
                {/* Quest List */}
                <div className="quests">
                    <h2>Quests</h2>
                    <ul>
                        {quests.map((quest) => (
                            <li
                                key={quest.id}
                                onClick={() => setSelectedQuest(quest)}
                                className={selectedQuest?.id === quest.id ? "active" : ""}
                            >
                                Instruction: {quest.questInstructions} <br />
                                Reward: ${quest.questReward} <br />
                                Author: {userMap && quest.questCreatorId && userMap[quest.questCreatorId] ? `${userMap[quest.questCreatorId].firstName} ${userMap[quest.questCreatorId].lastName}` : "Unknown"}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quest Hunter (Chat Sessions) */}
                <div className="quest-hunter">
                    <h2>Quest Progress</h2>
                    {selectedQuest ? (
                        <ul>
                            {chatSessions[selectedQuest.id]?.filter(session => session.questStatus === "PENDING")
                                .map((session) => (
                                    <li
                                        key={session.id}
                                        onClick={() => fetchMessages(session.id)}
                                        className={`chat-session ${selectedSession === session.id ? "active" : ""}`}
                                        style={{
                                            color: "white",
                                            border: "1px solid white",
                                            padding: "10px",
                                            marginBottom: "8px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            background: selectedSession === session.id ? "#444" : "transparent",
                                            transition: "background 0.3s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = selectedSession === session.id ? "#444" : "transparent")}
                                    >
                                        Chat with: {getChatRecipientName(session)} - Status: {session.questStatus}

                                        {/* Dropdown for status update (only for quest creator) */}
                                        {user.id === selectedQuest.questCreatorId && (
                                            <select
                                                value={session.questStatus}
                                                onChange={(e) => handleUpdateStatus(session, e.target.value)}
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
                                        )}
                                    </li>

                                )) || <p>No pending users available for this quest</p>}
                        </ul>
                    ) : (
                        <p>Select a quest to see chat sessions</p>
                    )}
                </div>

                {/* Chat Inbox */}
                <div className="inbox">
                    <h2>Inbox - {selectedSession ? getChatRecipientName(chatSessions[selectedQuest.id]?.find(session => session.id === selectedSession)) : "Unknown"}</h2>
                    {messages.length > 0 ? (
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index}>
                                    <strong>{msg.sender === user.id.toString() ? "You" : getChatRecipientName(chatSessions[selectedQuest.id]?.find(session => session.id === selectedSession))}:</strong> {msg.message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Select a chat session to see messages</p>
                    )}

                    {/* Message Input and Send Button */}
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
            </div>
        </div>
    );
};

export default MyQuestPage;