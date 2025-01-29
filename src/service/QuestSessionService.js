import axios from 'axios';

const API_URL = 'http://localhost:8080/api/quests/sessions';

class QuestSession {

    async createSession(session) {
        return await axios.post(API_URL, session, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    async fetchMessages(sessionId) {
        return await axios.get(API_URL + "/" + sessionId + "/messages", {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    async postMessage(sessionId, message) {
        return await axios.post(API_URL + "/" + sessionId + "/messages", message, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    async fetchChats(userID) {
        return await axios.get(API_URL + "/" + userID, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        });
    }

}

export default new QuestSession();
