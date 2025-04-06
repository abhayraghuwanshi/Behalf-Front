import axios from 'axios';
import { BACKEND_API_URL } from '../env';

const API_URL = `${BACKEND_API_URL}/api/travel-requests`;

class TravelRequestService {
    async getAllTravelRequests() {
        try {
            const response = await axios.get(`${API_URL}/fetch`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching travel requests:", error.message);
            return [];
        }
    }

    async createTravelRequest(requestData) {
        try {
            const response = await axios.post(`${API_URL}`, requestData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error creating travel request:", error.response?.data || error.message);
            return null;
        }
    }

    // async getCommentsByRequestId(travelRequestId) {
    //     try {
    //         const response = await axios.get(`${API_URL}/${travelRequestId}/comments`, { withCredentials: true });
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Error fetching comments for request ${travelRequestId}:`, error.message);
    //         return [];
    //     }
    // }

    // async addComment(travelRequestId, commentText, username) {
    //     if (!username) {
    //         console.error("No username provided. Cannot post comment.");
    //         return null;
    //     }

    //     try {
    //         const response = await axios.post(`${API_URL}/${travelRequestId}/comments`, {
    //             text: commentText,
    //             username: username  // ✅ Correct property format
    //         }, { withCredentials: true });

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error adding comment:", error.response?.data || error.message);
    //         return null;
    //     }
    // }

    // async replyToComment(commentId, replyText, username) {
    //     if (!username) {
    //         console.error("No username provided. Cannot reply to comment.");
    //         return null;
    //     }

    //     try {
    //         const response = await axios.post(`${API_URL}/comments/${commentId}/reply`, {
    //             text: replyText,
    //             username: username  // ✅ Correct property format
    //         }, { withCredentials: true });

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error replying to comment:", error.response?.data || error.message);
    //         return null;
    //     }
    // }

}

export default new TravelRequestService();
