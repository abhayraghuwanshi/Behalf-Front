import axios from "axios";
import { BACKEND_API_URL } from "../env";

const API_URL = `${BACKEND_API_URL}/api/user`;

class ProfileService {

    async fetchUser() {
        const response = await axios.get(`${API_URL}/me`, {
            withCredentials: true, // Important: needed for cookies
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data; // Only return the relevant data
    }

    async fetchUserByEmail() {
        const response = await axios.get(`${API_URL}/info`, {
            withCredentials: true, // Important: needed for cookies
            headers: {
                'Accept': 'application/json'
            }
        });
        return response; // Only return the relevant data
    }


    async logout() {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/api/logout`, {}, { withCredentials: true });

            if (response.data.startsWith("http")) {
                window.location.href = response.data; // ✅ Redirect to OIDC logout
            } else {
                console.log("Logged out successfully.");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }


}



export default new ProfileService();
