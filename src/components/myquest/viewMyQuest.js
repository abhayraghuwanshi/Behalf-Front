import React, { useEffect, useState } from "react";
import QuestSessionService from "../../service/QuestSessionService";
import { useAuth } from '../SignIn/AuthContext';
import "./MyQuest.css";

const MyQuestPage = () => {
    const { user } = useAuth();
    const [quests, setQuests] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [chatSessions, setChatSessions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    // Fetch data from the new combined API
    useEffect(() => {
        const fetchQuestData = async () => {
            if (!user || !user.id) {  // ✅ Check if user and user.id are available
                return;
            }

            try {
                console.log("Fetching quest data for user ID:", user.id);
                const response = await QuestSessionService.fetchChats(user.id);
                console.log("Quest data response:", response.data);
                const { questMetadataList, chatSessionDTOList } = response.data;
                setQuests(questMetadataList);

                // Flatten chat session data for easier access
                const chatSessionsMap = {};
                Object.entries(chatSessionDTOList).forEach(([questId, sessions]) => {
                    chatSessionsMap[questId] = sessions;
                });
                setChatSessions(chatSessionsMap);
            } catch (error) {
                console.error("Error fetching quest data:", error);
            }
        };

        if (user) {  // ✅ Ensure `user` is defined before calling fetchQuestData
            fetchQuestData();
        }
    }, [user]);  // ✅ Removed direct dependency on `user.id`


    // Fetch messages for a selected chat session
    const fetchMessages = async (sessionId) => {
        if (user == null) {
            return;
        }
        try {
            console.log("Fetching messages for session ID:", sessionId);
            const response = await QuestSessionService.fetchMessages(sessionId)
            console.log("Messages response:", response.data);
            setMessages(response.data);
            setSelectedSession(sessionId);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (!user || !selectedQuest || !selectedSession) {  // ✅ Added null checks
            alert("Ensure user, quest, and chat session are selected.");
            return;
        }
        if (!newMessage.trim()) return;

        const messagePayload = {
            sender: user.id.toString(),
            recipient: selectedQuest.questCreatorId?.toString() || "",  // ✅ Handle null safely
            message: newMessage,
        };

        try {
            console.log("Sending message:", messagePayload);
            await QuestSessionService.postMessage(selectedSession, messagePayload);  // ✅ Added `await`
            setMessages((prevMessages) => [...prevMessages, messagePayload]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
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
                                {quest.questInstructions} - Reward: ${quest.questReward}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quest Hunter (Chat Sessions) */}
                <div className="quest-hunter">
                    <h2>Quest Progress</h2>
                    {selectedQuest ? (
                        <ul>
                            {chatSessions[selectedQuest.id]?.map((session) => (
                                <li
                                    key={session.id}
                                    onClick={() => fetchMessages(session.id)}
                                    className={selectedSession === session.id ? "active" : ""}
                                >
                                    Chat Session: {session.id} - Status: {session.questStatus}
                                </li>
                            )) || <p>No Users available for this quest</p>}
                        </ul>
                    ) : (
                        <p>Select a quest to see chat sessions</p>
                    )}
                </div>

                {/* Chat Inbox */}
                <div className="inbox">
                    <h2>Inbox</h2>
                    {messages.length > 0 ? (
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index}>
                                    <strong>{msg.sender === user.id.toString() ? "You" : "Recipient"}:</strong> {msg.message}
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